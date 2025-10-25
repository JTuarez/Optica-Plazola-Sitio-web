// routes/reservas.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const nodemailer = require("nodemailer");

// GET: listado
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
 * Devuelve un array de horas YA OCUPADAS del día indicado, por ej: ["11:00","15:00"]
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

// POST: nueva reserva + correo (manejo de duplicados)
router.post("/", async (req, res) => {
  const { nombre_cliente, email, fecha_hora } = req.body;

  if (!nombre_cliente || !email || !fecha_hora) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // 1) Insertar en BD (fallará con ER_DUP_ENTRY si ese slot ya está tomado)
    await pool.query(
      "INSERT INTO reservas (nombre_cliente, email, fecha_hora) VALUES (?, ?, ?)",
      [nombre_cliente, email, fecha_hora]
    );
  } catch (dbErr) {
    if (dbErr?.code === "ER_DUP_ENTRY") {
      console.warn("❌ Intento de reserva duplicada:", fecha_hora);
      return res.status(409).json({
        error: "Ese horario ya fue reservado. Por favor, elige otro.",
      });
    }
    console.error("❌ Error al insertar en BD:", dbErr);
    return res.status(500).json({
      error: "Error al crear reserva (BD)",
      code: dbErr.code,
      message: dbErr.message,
    });
  }

  // 2) Enviar correo (si falla, igual confirmamos la reserva)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Fernando Plazola" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmación de reserva",
      text: `Hola ${nombre_cliente}, tu reserva fue registrada para el ${fecha_hora}. Nos vemos!.`,
    });

    return res
      .status(201)
      .json({ message: "Reserva creada y correo enviado ✅" });
  } catch (mailErr) {
    console.error("❌ Error al enviar correo:", mailErr);
    return res.status(201).json({
      message: "Reserva creada, pero el correo no se pudo enviar",
      mail_error: mailErr.code || mailErr.message,
    });
  }
});
router.get("/ping", (_req, res) => {
  res.json({ ok: true, where: "/api/reservas/ping" });
});
// GET /api/reservas/disponibilidad?date=YYYY-MM-DD
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
    const horasOcupadas = rows.map((r) => r.hora); // ej: ["11:00","15:00"]
    res.json(horasOcupadas);
  } catch (e) {
    console.error("❌ Error al obtener disponibilidad:", e);
    res.status(500).json({ error: "Error al obtener disponibilidad" });
  }
});
// GET /api/reservas/disponibilidad?date=YYYY-MM-DD
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
    const horasOcupadas = rows.map((r) => r.hora); // ej: ["11:00","15:00"]
    res.json(horasOcupadas);
  } catch (e) {
    console.error("❌ Error al obtener disponibilidad:", e);
    res.status(500).json({ error: "Error al obtener disponibilidad" });
  }
});
// GET /api/reservas/disponibilidad?date=YYYY-MM-DD
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
    const horasOcupadas = rows.map((r) => r.hora); // ej: ["11:00","15:00"]
    res.json(horasOcupadas);
  } catch (e) {
    console.error("❌ Error al obtener disponibilidad:", e);
    res.status(500).json({ error: "Error al obtener disponibilidad" });
  }
});
// GET /api/reservas/disponibilidad?date=YYYY-MM-DD
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
    const horasOcupadas = rows.map((r) => r.hora); // ej: ["11:00","15:00"]
    res.json(horasOcupadas);
  } catch (e) {
    console.error("❌ Error al obtener disponibilidad:", e);
    res.status(500).json({ error: "Error al obtener disponibilidad" });
  }
});

module.exports = router;
