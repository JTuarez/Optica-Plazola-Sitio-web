// src/services/api.js
import axios from "axios";

//  URL del backend (Render) o desde variable de entorno
const fromEnv =
  import.meta.env.VITE_API_URL ||
  "https://optica-plazola-sitio-web.onrender.com";

//  Limpieza por si alguien deja "/" o "/api" al final
const normalized = fromEnv.replace(/\/+$/, "").replace(/\/api$/, "");

// Útil para depurar en producción
if (typeof window !== "undefined") {
  console.log("[API] BaseURL:", `${normalized}/api`);
}

//  Instancia principal de Axios
const api = axios.create({
  baseURL: `${normalized}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ===================================================
//  INTERCEPTOR: Reintento automático si Render “duerme”
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
      console.warn(" Reintentando conexión con backend...");
      error.config.__retried = true;

      // “Despierta” Render haciendo un ping
      try {
        await fetch(`${normalized}/api/health`, { cache: "no-store" });
      } catch {}

      // Espera breve y reintenta
      await new Promise((r) => setTimeout(r, 1500));
      return api.request(error.config);
    }

    return Promise.reject(error);
  }
);

// ========================
//  Endpoints de reservas
// ========================
export const getReservas = () => api.get("/reservas");
export const createReserva = (payload) => api.post("/reservas", payload);
export const getDisponibilidad = (fecha) =>
  api.get("/reservas/disponibilidad", { params: { date: fecha } });

// ========================
//  Endpoint de contacto
// ========================
export const enviarContacto = (payload) => api.post("/contacto", payload);

// ========================
// Exportar instancia y URL
// ========================
export const API_URL = `${normalized}/api`;
export default api;
