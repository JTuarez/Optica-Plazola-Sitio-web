// src/services/api.js
import axios from "axios";

// ✅ Usa la URL de Render directamente o desde entorno local si estás en desarrollo
const fromEnv =
  import.meta.env.VITE_API_URL ||
  "https://optica-plazola-sitio-web.onrender.com"; // tu backend en Render

// 🔧 Limpieza de URL por si alguien deja "/" o "/api" al final
const normalized = fromEnv.replace(/\/+$/, "").replace(/\/api$/, "");

// 🚀 Instancia principal de Axios
const api = axios.create({
  baseURL: `${normalized}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ========================
// 🧾 Endpoints de reservas
// ========================

// Obtener todas las reservas
export const getReservas = () => api.get("/reservas");

// Crear una nueva reserva
export const createReserva = (payload) => api.post("/reservas", payload);

// Obtener disponibilidad por fecha
export const getDisponibilidad = (fecha) =>
  api.get("/reservas/disponibilidad", { params: { date: fecha } });

// ========================
// 📩 Endpoint de contacto
// ========================
export const enviarContacto = (payload) => api.post("/contacto", payload);

// ========================
// Exportar instancia y URL
// ========================
export const API_URL = `${normalized}/api`;
export default api;
