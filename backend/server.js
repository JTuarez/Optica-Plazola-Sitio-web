// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Configurar CORS correctamente para Render
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "*";
app.use(cors({ origin: ALLOW_ORIGIN }));

// Middleware para JSON
app.use(express.json());

// ✅ Ruta de salud (Render la usa para verificar que el servidor está vivo)
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// ✅ Rutas reales de tu API
app.use("/api/reservas", require("./routes/reservas"));
app.use("/api/contacto", require("./routes/contacto"));

// ✅ Respuesta por defecto
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// ✅ Render asigna su propio puerto en process.env.PORT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
