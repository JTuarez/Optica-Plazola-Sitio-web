// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Puerto asignado por Render o 4000 local
const PORT = process.env.PORT || 4000;

// ✅ Configurar CORS correctamente para producción
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "*";

const allowedOrigins = [
  ALLOW_ORIGIN,
  "http://localhost:5173", // para desarrollo local
  "http://localhost:3000",
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir sin origin (ej: Postman o curl)
    if (!origin) return callback(null, true);
    if (ALLOW_ORIGIN === "*" || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn("❌ Bloqueado por CORS:", origin);
    return callback(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// Aceptar preflight OPTIONS
app.options("*", cors(corsOptions));

// ✅ Middleware para JSON
app.use(express.json());

// ✅ Ruta de salud (Render la usa para verificar que el servidor está vivo)
app.get("/api/health", (req, res) => {
  res.json({ ok: true, origin: ALLOW_ORIGIN });
});

// ✅ Rutas reales de tu API
app.use("/api/reservas", require("./routes/reservas"));
app.use("/api/contacto", require("./routes/contacto"));

// ✅ Ruta base
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// ✅ Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`🌐 CORS permitido desde: ${ALLOW_ORIGIN}`);
});
