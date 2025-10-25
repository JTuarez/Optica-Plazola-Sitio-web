import axios from "axios";

const fromEnv = import.meta.env.VITE_API_URL || "";
const normalized = fromEnv.replace(/\/+$/, "").replace(/\/api$/, ""); // por si alguien dejó /api

const api = axios.create({
  baseURL: `${normalized}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Endpoints de reservas
export const getReservas = () => api.get("/reservas");
export const createReserva = (payload) => api.post("/reservas", payload);
export const getDisponibilidad = (fecha) =>
  api.get("/reservas/disponibilidad", { params: { date: fecha } });

export default api;
