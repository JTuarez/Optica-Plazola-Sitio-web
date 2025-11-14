// routes/contacto.js
const express = require("express");
const router = express.Router();

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

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("❌ Falta BREVO_API_KEY en variables de entorno");
    return res
      .status(500)
      .json({ error: "Config de correo incompleta (API key)" });
  }

  const senderEmail =
    process.env.BREVO_SENDER ||
    process.env.EMAIL_USER ||
    "no-reply@example.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Óptica Plazola";
  const contactTo =
    process.env.CONTACT_TO || process.env.EMAIL_USER || senderEmail;

  const basePayload = {
    sender: {
      email: senderEmail,
      name: senderName,
    },
    replyTo: {
      email: correo,
      name: nombre,
    },
  };

  try {
    // 1) Email para (Óptica)
    const adminResp = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        ...basePayload,
        to: [
          {
            email: contactTo,
            name: "Óptica Plazola",
          },
        ],
        subject: `Nuevo contacto: ${nombre}`,
        htmlContent: `
          <h2>Nuevo mensaje desde el sitio</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Correo:</strong> ${correo}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space:pre-wrap">${mensaje}</p>
          <hr/>
          <small>Óptica Plazola</small>
        `,
      }),
    });

    const adminText = await adminResp.text();
    if (!adminResp.ok) {
      console.error(
        "❌ Error Brevo (admin):",
        adminResp.status,
        adminResp.statusText,
        adminText
      );
      return res.status(500).json({
        error: "No se pudo enviar el mensaje (admin)",
        code: "BREVO_ADMIN_ERROR",
      });
    }

    // 2) Auto-respuesta al usuario
    if (process.env.SEND_AUTOREPLY === "true") {
      const userResp = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          ...basePayload,
          to: [
            {
              email: correo,
              name: nombre,
            },
          ],
          subject: "Hemos recibido tu mensaje ✅",
          htmlContent: `
            <p>Hola ${nombre}, gracias por escribirnos. Hemos recibido tu mensaje y te responderemos pronto.</p>
            <p>—Fernando Plazola</p>
          `,
        }),
      });

      const userText = await userResp.text();
      if (!userResp.ok) {
        console.error(
          "❌ Error Brevo (usuario):",
          userResp.status,
          userResp.statusText,
          userText
        );
        // No rompemos la respuesta al cliente si falla solo el auto-reply
      }
    }

    console.log("✅ /api/contacto enviado OK vía Brevo API");
    return res.json({ ok: true });
  } catch (err) {
    console.error("❌ /api/contacto error:", err?.message || err);
    return res.status(500).json({
      error: "No se pudo enviar el mensaje",
      code: "BREVO_API_ERROR",
      msg: err?.message,
    });
  }
});

module.exports = router;
