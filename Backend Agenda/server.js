// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors()); // permite que React (frontend) hable con este backend
app.use(express.json()); // para poder recibir JSON en las peticiones

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
