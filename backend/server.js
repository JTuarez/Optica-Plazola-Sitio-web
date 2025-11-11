// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==============================
// 🔧 Configuración de CORS
// ==============================
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "*";
const allowedOrigins = [
  ALLOW_ORIGIN,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // permite Postman / curl
    if (ALLOW_ORIGIN === "*" || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS: " + origin), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// ==============================
// ✅ Rutas principales
// ==============================
app.use("/api/reservas", require("./routes/reservas"));
app.use("/api/contacto", require("./routes/contacto"));

// ==============================
// 🩺 Healthcheck para Render
// ==============================
// Importante: no debe consultar la base de datos, solo responder rápido
app.get("/api/health", (_req, res) => res.status(200).send("OK"));

// ==============================
// 🏠 Ruta raíz (prueba manual)
// ==============================
app.get("/", (_req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// ==============================
// 🚀 Iniciar servidor
// ==============================
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`🌐 CORS permitido desde: ${ALLOW_ORIGIN}`);
});
