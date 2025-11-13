import { useState } from "react";
import toast from "react-hot-toast";
import { enviarContacto, API_URL } from "../services/api"; // 👈 usa tu api.js

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validar = () => {
    if (!form.nombre.trim()) return "Ingresa tu nombre.";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo);
    if (!emailOk) return "Ingresa un correo válido.";
    if (form.mensaje.trim().length < 10) return "Mínimo 10 caracteres.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = validar();
    if (error) return toast.error(error);

    setLoading(true);
    try {
      console.log("[Contacto] usando API:", API_URL); // debe mostrar Render
      const { data } = await enviarContacto(form); // 👈 AHORA SÍ
      if (data?.ok) {
        toast.success("¡Mensaje enviado! Te responderemos pronto.");
        setForm({ nombre: "", correo: "", mensaje: "" });
      } else {
        toast.error("No se pudo enviar el mensaje.");
      }
    } catch (err) {
      toast.error(err?.message || "Ocurrió un error al enviar el mensaje.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contacto-hero py-5">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5">
            <div className="contacto-panel h-100 p-4 p-md-5">
              <h2 className="contacto-title mb-3">Hablemos de tu visión</h2>
              <p className="mb-4 contacto-sub">
                ¿Tienes preguntas sobre lentes esclerales, semirrígidos o
                multifocales? Escríbenos y te ayudaremos a encontrar la mejor
                solución para tus ojos.
              </p>
              <ul className="list-unstyled contacto-datos">
                <li className="mb-3">
                  <i className="bi bi-geo-alt-fill me-2"></i>Nueva Providencia
                  1881, oficina 2109.
                </li>
                <li className="mb-3">
                  <i className="bi bi-envelope-fill me-2"></i>
                  contacto@opticafp.cl
                </li>
                <li>
                  <i className="bi bi-telephone-fill me-2"></i>+56 9 2021 1535
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="contacto-card h-100 p-4 p-md-5">
              <h3 className="mb-4">Formulario de contacto</h3>
              <form onSubmit={onSubmit} noValidate>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control contacto-input"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={onChange}
                    disabled={loading}
                  />
                  <label htmlFor="nombre">Nombre</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control contacto-input"
                    id="correo"
                    name="correo"
                    placeholder="tunombre@correo.com"
                    value={form.correo}
                    onChange={onChange}
                    disabled={loading}
                  />
                  <label htmlFor="correo">Correo</label>
                </div>

                <div className="form-floating mb-4">
                  <textarea
                    className="form-control contacto-input"
                    placeholder="Escribe tu mensaje"
                    id="mensaje"
                    name="mensaje"
                    style={{ height: "160px" }}
                    value={form.mensaje}
                    onChange={onChange}
                    disabled={loading}
                  />
                  <label htmlFor="mensaje">Mensaje</label>
                </div>

                <button
                  type="submit"
                  className="btn contacto-btn w-100 py-3"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar mensaje"}
                </button>

                <p className="text-center small text-muted mt-3">
                  Al enviar aceptas nuestras políticas de privacidad.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
