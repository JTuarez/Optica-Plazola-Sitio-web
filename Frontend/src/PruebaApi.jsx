import { useEffect } from "react";
import { getReservas } from "./services/api";
import toast from "react-hot-toast";

export default function PruebaAPI() {
  useEffect(() => {
    (async () => {
      try {
        const res = await getReservas();
        console.log("Reservas:", res.data);
        toast.success(`API OK — ${res.data.length} reservas`);
      } catch (e) {
        console.error(e);
        toast.error("No pude conectar con el backend");
      }
    })();
  }, []);

  return null;
}
