import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // todo lo que empiece con /api se envía a tu backend
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
