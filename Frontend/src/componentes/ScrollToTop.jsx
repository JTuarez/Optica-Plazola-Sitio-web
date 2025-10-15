import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // useLayoutEffect evita el “parpadeo” abajo antes de subir
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" }); // o "smooth" si quieres animado
  }, [pathname]);

  return null;
}
