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

// POST: nueva reserva + correo (con logs separados para depurar)
router.post("/", async (req, res) => {
  const { nombre_cliente, email, fecha_hora } = req.body;

  if (!nombre_cliente || !email || !fecha_hora) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // 1) Insertar en BD
    await pool.query(
      "INSERT INTO reservas (nombre_cliente, email, fecha_hora) VALUES (?, ?, ?)",
      [nombre_cliente, email, fecha_hora]
    );

    // 2) Enviar correo (si falla, igual confirmamos la reserva)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        // Alternativa explícita:
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false,
        // auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"Óptica Plazola" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Confirmación de reserva",
        text: `Hola ${nombre_cliente}, tu reserva fue registrada para el ${fecha_hora}.`,
      });

      return res.json({ message: "Reserva creada y correo enviado ✅" });
    } catch (mailErr) {
      console.error("❌ Error al enviar correo:", mailErr);
      return res.json({
        message: "Reserva creada, pero el correo no se pudo enviar",
        mail_error: mailErr.code || mailErr.message,
      });
    }
  } catch (dbErr) {
    console.error("❌ Error al insertar en BD:", dbErr);
    return res.status(500).json({
      error: "Error al crear reserva (BD)",
      code: dbErr.code,
      message: dbErr.message,
    });
  }
});

module.exports = router;
