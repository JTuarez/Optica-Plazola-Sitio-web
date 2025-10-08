// routes/contacto.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST: formulario de contacto
router.post("/", async (req, res) => {
  const { nombre, correo, mensaje } = req.body || {};

  if (!nombre?.trim() || !correo?.trim() || !mensaje?.trim()) {
    return res.status(400).json({ error: "Campos incompletos" });
  }

  try {
    // Transporter SMTP (Gmail u Outlook). Recomendado: Gmail con contraseña de aplicación
    const transporter = nodemailer.createTransport({
      // Opción Gmail
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.MAIL_PORT || 465), // 465 SSL
      secure: process.env.MAIL_SECURE
        ? process.env.MAIL_SECURE === "true"
        : true,
      auth: {
        user: process.env.EMAIL_USER, // tu correo emisor
        pass: process.env.EMAIL_PASS, // contraseña de aplicación o password SMTP
      },
    });

    // Email que te llega a ti
    await transporter.sendMail({
      from: `"Formulario Web" <${
        process.env.MAIL_FROM || process.env.EMAIL_USER
      }>`,
      to: process.env.CONTACT_TO || process.env.EMAIL_USER, // destino (tu correo)
      replyTo: correo, // para que puedas responder directo al cliente
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

    // (Opcional) auto-respuesta al usuario
    if (process.env.SEND_AUTOREPLY === "true") {
      await transporter.sendMail({
        from: `"Óptica Plazola" <${
          process.env.MAIL_FROM || process.env.EMAIL_USER
        }>`,
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
    console.error("❌ Error al enviar contacto:", err);
    return res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
});

module.exports = router;
