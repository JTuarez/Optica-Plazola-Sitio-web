import axios from "axios";

// ✅ Usa la URL de Render directamente o desde entorno local si estás en desarrollo
const fromEnv =
  import.meta.env.VITE_API_URL ||
  "https://optica-plazola-sitio-web.onrender.com"; // backend en Render

// 🔧 Limpieza de URL por si alguien deja "/" o "/api" al final
const normalized = fromEnv.replace(/\/+$/, "").replace(/\/api$/, "");

// 🚀 Instancia principal de Axios
const api = axios.create({
  baseURL: `${normalized}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ===================================================
// 🧠 INTERCEPTOR: Reintento automático si Render “duerme”
// ===================================================
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const isTimeout = error?.code === "ECONNABORTED";
    const shouldRetry =
      (status === 502 || status === 504 || isTimeout) &&
      !error.config.__retried;

    if (shouldRetry) {
      console.warn("🔁 Reintentando conexión con backend...");
      error.config.__retried = true;

      // “Despierta” Render haciendo un ping
      try {
        await fetch(`${normalized}/api/diag`, { cache: "no-store" });
      } catch {}

      // Espera breve y reintenta
      await new Promise((r) => setTimeout(r, 1500));
      return api.request(error.config);
    }

    return Promise.reject(error);
  }
);

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
