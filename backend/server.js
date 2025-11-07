// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Puerto Render / local
const PORT = process.env.PORT || 4000;

// ✅ CORS
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "*";
const allowedOrigins = [
  ALLOW_ORIGIN,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // curl/Postman
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
// ❌ NO usar: app.options("*", cors(corsOptions)) en Express 5

app.use(express.json());

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ ok: true, origin: ALLOW_ORIGIN });
});

// Rutas
app.use("/api/reservas", require("./routes/reservas"));
app.use("/api/contacto", require("./routes/contacto"));

// Root
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// Start
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`🌐 CORS permitido desde: ${ALLOW_ORIGIN}`);
});
