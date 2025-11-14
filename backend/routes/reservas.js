// routes/reservas.js
const router = require("express").Router();
const pool = require("../db");
const axios = require("axios");

// Normaliza a 'YYYY-MM-DD HH:mm:00' (sin segundos/milisegundos)
const toSQLDateTime = (input) => {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  d.setSeconds(0, 0);
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:00`;
};

// Log para confirmar que el router se montó
console.log("✅ Router /api/reservas montado");

/** --------- DIAGNÓSTICOS --------- */

// GET /api/reservas/ping-db -> prueba conexión simple
router.get("/ping-db", async (_req, res) => {
  try {
    const [r] = await pool.query("SELECT 1 AS ok");
    return res.json({ ok: r[0]?.ok === 1 });
  } catch (e) {
    console.error("❌ ping-db:", e.code, e.message);
    return res
      .status(500)
      .json({ error: "DB fail", code: e.code, message: e.message });
  }
});

// GET /api/reservas/diag -> usuario/BD/tabla existe
router.get("/diag", async (_req, res) => {
  try {
    const [u] = await pool.query(
      "SELECT CURRENT_USER() AS user, DATABASE() AS db"
    );
    const [t] = await pool.query("SHOW TABLES LIKE 'reservas'");
    return res.json({
      user: u[0]?.user,
      db: u[0]?.db,
      tablaExiste: t.length > 0,
    });
  } catch (e) {
    console.error("❌ diag:", e.code, e.message);
    return res
      .status(500)
      .json({ error: "diag fail", code: e.code, message: e.message });
  }
});

/** --------- ENDPOINTS REALES --------- */

// GET /api/reservas -> listado
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre_cliente, email, fecha_hora FROM reservas ORDER BY fecha_hora DESC"
    );
    return res.json(rows);
  } catch (e) {
    console.error("❌ GET /reservas:", e.code, e.message);
    return res.status(500).json({
      error: "Error al obtener reservas",
      code: e.code,
      message: e.message,
    });
  }
});

// GET /api/reservas/disponibilidad?date=YYYY-MM-DD -> horas OCUPADAS
router.get("/disponibilidad", async (req, res) => {
  const { date } = req.query;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res
      .status(400)
      .json({ error: "Parámetro 'date' inválido. Usa YYYY-MM-DD" });
  }
  try {
    const [rows] = await pool.query(
      "SELECT DATE_FORMAT(fecha_hora, '%H:%i') AS hora FROM reservas WHERE DATE(fecha_hora) = ?",
      [date]
    );
    const horasOcupadas = rows.map((r) => r.hora);
    return res.json(horasOcupadas);
  } catch (e) {
    console.error("❌ GET /reservas/disponibilidad:", e.code, e.message);
    return res.status(500).json({
      error: "Error al obtener disponibilidad",
      code: e.code,
      message: e.message,
    });
  }
});

// POST /api/reservas -> crea reserva + emails (Brevo API HTTP)
router.post("/", async (req, res) => {
  const { nombre_cliente, email, fecha_hora } = req.body;
  if (!nombre_cliente || !email || !fecha_hora) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  //  Normaliza la fecha
  const fh = toSQLDateTime(fecha_hora);
  if (!fh) {
    return res.status(400).json({ error: "fecha_hora inválida" });
  }

  //  Verifica ocupación exacta ANTES de insertar
  try {
    const [existe] = await pool.query(
      "SELECT id FROM reservas WHERE fecha_hora = ? LIMIT 1",
      [fh]
    );
    if (existe.length) {
      return res.status(409).json({
        error: "Ese horario ya fue reservado. Elige otro.",
        conflict_at: fh,
      });
    }
  } catch (e) {
    console.error("❌ CHECK slot:", e.code, e.message);
    return res
      .status(500)
      .json({ error: "Error verificando disponibilidad", code: e.code });
  }

  // Inserta en BD
  try {
    await pool.query(
      "INSERT INTO reservas (nombre_cliente, email, fecha_hora) VALUES (?, ?, ?)",
      [nombre_cliente, email, fh]
    );
  } catch (dbErr) {
    if (dbErr?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Ese horario ya fue reservado. Elige otro.",
        conflict_at: fh,
      });
    }
    console.error("❌ INSERT BD:", dbErr.code, dbErr.message);
    return res.status(500).json({
      error: "Error al crear reserva (BD)",
      code: dbErr.code,
      message: dbErr.message,
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Envío de correos por Brevo API HTTP (no SMTP)
  // ─────────────────────────────────────────────────────────────
  const SEND_MAIL =
    String(process.env.SEND_AUTOREPLY || "").toLowerCase() === "true";

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail =
    process.env.BREVO_SENDER || process.env.BREVO_USER || "no-reply@localhost";
  const senderName = process.env.BREVO_SENDER_NAME || "Óptica Plazola";
  const url = "https://api.brevo.com/v3/smtp/email";

  const sendBrevo = async ({ to, subject, html }) => {
    if (!apiKey) throw new Error("Falta BREVO_API_KEY");
    return axios.post(
      url,
      {
        sender: { email: senderEmail, name: senderName },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: { "api-key": apiKey, "Content-Type": "application/json" },
        timeout: 15000,
      }
    );
  };

  try {
    if (!SEND_MAIL) {
      console.log("[RESERVA] envío de correo DESACTIVADO");
      return res.status(201).json({
        message: "Reserva creada ✅ (email desactivado)",
        email_sent: false,
      });
    }

    // Email al cliente
    await sendBrevo({
      to: email,
      subject: "✅ Confirmación de reserva - Óptica Plazola",
      html: `<p>Hola <strong>${nombre_cliente}</strong>, tu reserva fue registrada para <strong>${fh}</strong>.</p>`,
    });

    // Email al admin
    await sendBrevo({
      to: process.env.ADMIN_EMAIL || process.env.CONTACT_TO || senderEmail,
      subject: "🔔 Nueva reserva recibida",
      html: `<p>Cliente: <strong>${nombre_cliente}</strong> (${email})</p><p>Fecha y hora: <strong>${fh}</strong></p>`,
    });

    console.log("📨 Correos enviados vía Brevo API correctamente");
    return res.status(201).json({
      message: "Reserva creada y correos enviados ✅",
      email_sent: true,
    });
  } catch (mailErr) {
    console.error("❌ Mail(API):", mailErr.message || String(mailErr));
    // No fallar la reserva por correo
    return res.status(201).json({
      message: "Reserva creada, pero error al enviar correos",
      email_sent: false,
      mail_error: mailErr.message || String(mailErr),
    });
  }
});

module.exports = router;
