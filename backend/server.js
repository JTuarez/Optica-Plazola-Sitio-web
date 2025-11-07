// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔢 PORT (Render define process.env.PORT)
const PORT = process.env.PORT || 4000;

// 🌍 CORS
const allowFromEnv = process.env.ALLOW_ORIGIN || "*";

// Si quieres permitir varios (prod + local), usa un arreglo:
const allowedOrigins = [
  allowFromEnv,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

// Función para validar origen dinámicamente
const corsOptions = {
  origin: function (origin, callback) {
    // Requests sin origin (ej. curl, Postman) se permiten
    if (!origin) return callback(null, true);
    // Permite todos si es "*"
    if (allowFromEnv === "*" || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS: " + origin), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // cámbialo a true sólo si usas cookies/sesiones cruzadas
};

app.use(cors(corsOptions));
// Preflight para todos
app.options("*", cors(corsOptions));

// 🧩 Middlewares
app.use(express.json());

// 🩺 Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ ok: true, origin: allowFromEnv });
});

// 🔗 Rutas
app.use("/api/reservas", require("./routes/reservas"));
app.use("/api/contacto", require("./routes/contacto"));

// 🏠 Raíz
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// ▶️ Start
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`CORS allow origin: ${allowFromEnv}`);
});
