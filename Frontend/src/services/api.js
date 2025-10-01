// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ej: http://localhost:4000/api
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Endpoints de reservas
export const getReservas = () => api.get("/reservas");
export const createReserva = (payload) => api.post("/reservas", payload);

export default api;
