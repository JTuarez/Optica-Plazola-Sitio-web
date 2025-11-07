// db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_SSL:", process.env.DB_SSL);

const sslNeeded = process.env.DB_SSL === "true";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  // Evita problemas de timezone/parse
  dateStrings: true,
  timezone: "Z",
  // SSL para proveedores que lo requieren
  ssl: sslNeeded ? { rejectUnauthorized: false } : undefined,
});

// Verificación al arrancar (aparece en logs de Render)
(async () => {
  try {
    const c = await pool.getConnection();
    await c.ping();
    c.release();
    console.log("✅ MySQL conectado");
  } catch (e) {
    console.error("❌ Error conectando MySQL:", e.code, e.message);
  }
})();

module.exports = pool;
