// routes/reservas.js
const router = require("express").Router();
const pool = require("../db");
const nodemailer = require("nodemailer");

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
    return res
      .status(500)
      .json({
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
    return res
      .status(500)
      .json({
        error: "Error al obtener disponibilidad",
        code: e.code,
        message: e.message,
      });
  }
});

// POST /api/reservas -> crea reserva + emails
router.post("/", async (req, res) => {
  const { nombre_cliente, email, fecha_hora } = req.body;
  if (!nombre_cliente || !email || !fecha_hora) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    await pool.query(
      "INSERT INTO reservas (nombre_cliente, email, fecha_hora) VALUES (?, ?, ?)",
      [nombre_cliente, email, fecha_hora]
    );
  } catch (dbErr) {
    if (dbErr?.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ error: "Ese horario ya fue reservado. Elige otro." });
    }
    console.error("❌ INSERT BD:", dbErr.code, dbErr.message);
    return res
      .status(500)
      .json({
        error: "Error al crear reserva (BD)",
        code: dbErr.code,
        message: dbErr.message,
      });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Fernando Plazola" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Confirmación de reserva - Fernando Plazola",
      html: `<p>Hola <strong>${nombre_cliente}</strong>, tu reserva fue registrada para <strong>${fecha_hora}</strong>.</p>`,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "🔔 Nueva reserva recibida",
      html: `<p>Cliente: ${nombre_cliente} (${email})</p><p>Fecha y hora: ${fecha_hora}</p>`,
    });

    return res
      .status(201)
      .json({ message: "Reserva creada y correos enviados ✅" });
  } catch (mailErr) {
    console.error("❌ Mail:", mailErr.code, mailErr.message);
    return res
      .status(201)
      .json({
        message: "Reserva creada, pero error al enviar correos",
        mail_error: mailErr.code || mailErr.message,
      });
  }
});

module.exports = router;
