// routes/reservas.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const nodemailer = require("nodemailer");

// Función para formatear fecha en texto legible
const formatearFecha = (fecha) => {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(fecha));
};

/**
 * GET /api/reservas
 * Lista todas las reservas ordenadas por fecha
 */
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM reservas ORDER BY fecha_hora DESC"
    );
    res.json(rows);
  } catch (e) {
    console.error("❌ Error al obtener reservas:", e.code, e.message);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
});

/**
 * GET /api/reservas/disponibilidad?date=YYYY-MM-DD
 * Devuelve un array de horas YA OCUPADAS del día indicado
 * Ejemplo: ["11:00","15:00"]
 */
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
    res.json(horasOcupadas);
  } catch (e) {
    console.error("❌ Error al obtener disponibilidad:", e);
    res.status(500).json({ error: "Error al obtener disponibilidad" });
  }
});

/**
 * POST /api/reservas
 * Crea una nueva reserva + correos al cliente y al administrador
 */
router.post("/", async (req, res) => {
  const { nombre_cliente, email, fecha_hora } = req.body;

  if (!nombre_cliente || !email || !fecha_hora) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // 1️⃣ Inserta la reserva en la BD
  try {
    await pool.query(
      "INSERT INTO reservas (nombre_cliente, email, fecha_hora) VALUES (?, ?, ?)",
      [nombre_cliente, email, fecha_hora]
    );
  } catch (dbErr) {
    if (dbErr?.code === "ER_DUP_ENTRY") {
      console.warn("❌ Intento de reserva duplicada:", fecha_hora);
      return res
        .status(409)
        .json({ error: "Ese horario ya fue reservado. Elige otro." });
    }
    console.error("❌ Error al insertar en BD:", dbErr);
    return res.status(500).json({
      error: "Error al crear reserva (BD)",
      code: dbErr.code,
      message: dbErr.message,
    });
  }

  // 2️⃣ Enviar correos (cliente + admin)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Fecha formateada
    const fechaLegible = formatearFecha(fecha_hora);

    // 📩 Correo al cliente
    await transporter.sendMail({
      from: `"Fernando Plazola" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Confirmación de reserva - Fernando Plazola",
      html: `
        <p>Hola <strong>${nombre_cliente}</strong>,</p>
        <p>Tu reserva fue registrada correctamente para:</p>
        <p style="font-size:16px;"><strong>${fechaLegible}</strong></p>
        <p>Si necesitas reprogramar, contáctanos respondiendo este correo.</p>
        <br>
        <p>Gracias por confiar en nosotros 👓</p>
        <p><em>Fernando Plazola</em></p>
      `,
    });

    // 📬 Correo al administrador (tú)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "🔔 Nueva reserva recibida - Óptica Plazola",
      html: `
        <h2 style="margin-bottom:8px;">Nueva reserva confirmada</h2>
        <p><strong>Cliente:</strong> ${nombre_cliente}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Fecha y hora:</strong> ${fechaLegible}</p>
      `,
    });

    res.status(201).json({
      message: "Reserva creada y correos enviados ✅",
    });
  } catch (mailErr) {
    console.error("❌ Error al enviar correos:", mailErr);
    res.status(201).json({
      message: "Reserva creada, pero hubo un error al enviar los correos",
      mail_error: mailErr.code || mailErr.message,
    });
  }
});

/**
 * GET /api/reservas/ping
 * Endpoint de prueba
 */
router.get("/ping", (_req, res) => {
  res.json({ ok: true, where: "/api/reservas/ping" });
});

module.exports = router;
