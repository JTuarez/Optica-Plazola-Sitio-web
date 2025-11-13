// routes/contacto.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { nombre, correo, mensaje } = req.body || {};
  console.log("📨 /api/contacto payload:", {
    nombre,
    correo,
    len: mensaje?.length,
  });

  if (!nombre?.trim() || !correo?.trim() || !mensaje?.trim()) {
    return res.status(400).json({ error: "Campos incompletos" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // smtp-relay.brevo.com
      port: Number(process.env.MAIL_PORT || 587), // 587
      secure: String(process.env.MAIL_SECURE) === "true", // false
      auth: {
        user: process.env.EMAIL_USER, // optica.fp@gmail.com
        pass: process.env.EMAIL_PASS, // xsmtpsib-...
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000, // 10s
      greetingTimeout: 10000,
      socketTimeout: 20000, // 20s
    });

    const fromAddress =
      process.env.MAIL_FROM || `Óptica Plazola <${process.env.EMAIL_USER}>`;

    // 1) Email para ti
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

    // 2) Auto-respuesta al usuario
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

    console.log("✅ /api/contacto enviado OK");
    return res.json({ ok: true });
  } catch (err) {
    console.error("❌ /api/contacto error:", err?.code, err?.message);
    return res.status(500).json({
      error: "No se pudo enviar el mensaje",
      code: err?.code || "SMTP_ERROR",
      msg: err?.message,
    });
  }
});

module.exports = router;
