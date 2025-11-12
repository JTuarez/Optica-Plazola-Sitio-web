/// routes/contacto.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { nombre, correo, mensaje } = req.body || {};

  if (!nombre?.trim() || !correo?.trim() || !mensaje?.trim()) {
    return res.status(400).json({ error: "Campos incompletos" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // Brevo
      port: Number(process.env.MAIL_PORT || 587),
      secure: String(process.env.MAIL_SECURE) === "true", // false para 587 (STARTTLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // opcional: validar conexión SMTP
    await transporter.verify();

    const fromAddress =
      process.env.MAIL_FROM || `Óptica Plazola <${process.env.EMAIL_USER}>`;

    // Email para ti
    await transporter.sendMail({
      from: fromAddress,
      to: process.env.CONTACT_TO || process.env.EMAIL_USER,
      replyTo: correo,
      subject: `Nuevo contacto: ${nombre}`,
      html: `
        <h2>Nuevo mensaje desde el sitio</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${mensaje}</p>
        <hr/>
        <small>Óptica Plazola</small>
      `,
    });

    if (process.env.SEND_AUTOREPLY === "true") {
      await transporter.sendMail({
        from: fromAddress,
        to: correo,
        subject: "Hemos recibido tu mensaje ✅",
        html: `
          <p>Hola ${nombre}, gracias por escribirnos. Hemos recibido tu mensaje y te responderemos pronto.</p>
          <p>— Equipo Óptica Plazola</p>
        `,
      });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("❌ Error al enviar contacto:", err?.message, err);
    return res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
});

module.exports = router;
