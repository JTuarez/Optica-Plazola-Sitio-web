const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD set?:", !!process.env.DB_PASSWORD);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
