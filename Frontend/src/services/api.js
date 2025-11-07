import axios from "axios";

// ✅ Usa directamente la URL de Render (o la del entorno local si estás en desarrollo)
const fromEnv =
  import.meta.env.VITE_API_URL ||
  "https://optica-plazola-sitio-web.onrender.com";

const normalized = fromEnv.replace(/\/+$/, "").replace(/\/api$/, ""); // limpia el /api final

// ✅ Crea la instancia principal de Axios
const api = axios.create({
  baseURL: `${normalized}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ✅ Endpoints de reservas
export const getReservas = () => api.get("/reservas");
export const createReserva = (payload) => api.post("/reservas", payload);
export const getDisponibilidad = (fecha) =>
  api.get("/reservas/disponibilidad", { params: { date: fecha } });

// ✅ Exporta también por si lo usas en otros archivos
export const API_URL = `${normalized}/api`;

export default api;
