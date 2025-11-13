// src/componentes/SobreMi.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";
import imgs from "../assets/img/sobre_mi.jpg";
import imgs2 from "../assets/img/atencion.jpg";

// ✅ Puedes pasar una imagen secundaria por props si quieres
//    <SobreMi secondaryImage={otraImg} />
export default function SobreMi({
  title = "Evaluación con nuestro especialista",
  subtitle = "Fernando Plazola · Optómetra especializado",
  description = (
    <>
      Me especializo especialmente en la adaptacion de lentes tanto de contacto
      como lentes multifocales. Evaluamos tu caso de forma personalizada para
      ofrecerte la mejor solución visual. Diseñamos{" "}
      <strong>lentes esclerales</strong>, <strong>RGP a medida</strong>. Así
      como lentes <strong>Multifocales</strong> priorizando tu comodidad, salud
      ocular y la claridad de tu visión. Agenda tu evaluación sin costo y da el
      primer paso hacia una mejor calidad visual.
    </>
  ),
  bullets = [],
  imagePosition = "50% 45%",
  onPrimaryCtaHref = "/agendar",
  onPrimaryCtaText = "Agendar Evaluación",
  onSecondaryCtaHref = "",
  onSecondaryCtaText = "",
  // nuevos (opcionales)
  secondaryImage,
  secondaryAlt = "Atención optométrica",
}) {
  const palette = {
    cream: "#FBF7F2",
    gold: "#CFA24A",
    goldHover: "#B98933",
    text: "#4B5563",
    chipBg: "#FFF3D6",
    shadow: "0 12px 28px rgba(0,0,0,.08)",
    border: "rgba(0,0,0,.06)",
    white: "#FFFFFF",
  };

  return (
    <section
      id="sobre-mi"
      className="py-5"
      style={{ background: palette.cream }}
    >
      {/* estilos locales para asegurar colores/hover de los botones */}
      <style>{`
        .btn-gold {
          background: ${palette.gold};
          color: ${palette.white};
          border: 1px solid ${palette.gold};
          border-radius: 999px;
          padding-inline: 22px;
          box-shadow: ${palette.shadow};
        }
        .btn-gold:hover, .btn-gold:focus {
          background: ${palette.goldHover};
          border-color: ${palette.goldHover};
          color: ${palette.white};
        }
        .btn-gold-outline {
          background: transparent;
          color: ${palette.gold};
          border: 1.5px solid ${palette.gold};
          border-radius: 999px;
          padding-inline: 22px;
        }
        .btn-gold-outline:hover, .btn-gold-outline:focus {
          background: ${palette.chipBg};
          color: ${palette.goldHover};
          border-color: ${palette.goldHover};
        }
      `}</style>

      <div className="container">
        {/* Fila principal */}
        <div className="row align-items-center g-4 g-lg-5">
          {/* Imagen */}
          <div className="col-lg-6">
            <div
              className="position-relative rounded-4 overflow-hidden"
              style={{
                height: 660,
                maxHeight: "70vh",
                border: `1px solid ${palette.border}`,
                boxShadow: palette.shadow,
              }}
            >
              <img
                src={imgs}
                alt="Foto del especialista"
                loading="lazy"
                className="w-100 h-100"
                style={{ objectFit: "cover", objectPosition: imagePosition }}
              />
            </div>

            {/* ✅ Texto/badges justo debajo de la foto */}
            <div className="mt-3 d-flex flex-wrap gap-4">
              <span
                className="px-4 py-2 rounded-pill fw-semibold"
                style={{
                  background: palette.chipBg,
                  color: palette.gold,
                  border: `1px solid ${palette.border}`,
                  fontSize: 16,
                }}
              >
                Más de 13 años de experiencia
              </span>
              <span
                className="px-3 py-2 rounded-pill fw-semibold"
                style={{
                  background: palette.chipBg,
                  color: palette.gold,
                  border: `1px solid ${palette.border}`,
                  fontSize: 16,
                }}
              >
                4 generaciones dedicadas a la óptica
              </span>
            </div>
          </div>

          {/* Texto */}
          <div className="col-lg-6">
            <span
              className="d-inline-block mb-3 px-3 py-1 rounded-pill fw-semibold"
              style={{
                background: palette.chipBg,
                color: palette.gold,
                fontSize: 13,
                border: `1px solid ${palette.border}`,
              }}
            >
              Atención personalizada
            </span>

            {/* ✅ Títulos más grandes y legibles */}
            <h2
              className="fw-bold mb-3"
              style={{
                color: palette.gold,
                lineHeight: 1.12,
                fontSize: "clamp(28px, 3.2vw, 44px)",
              }}
            >
              {title}
            </h2>

            <p
              className="mb-3"
              style={{
                color: palette.text,
                fontWeight: 600,
                fontSize: "clamp(16px, 1.4vw, 20px)",
              }}
            >
              {subtitle}
            </p>

            <p
              className="mb-4"
              style={{
                color: palette.text,
                fontSize: "clamp(15px, 1.2vw, 18px)",
              }}
            >
              {description}
            </p>

            {bullets?.length > 0 && (
              <ul
                className="mb-4"
                style={{
                  color: palette.text,
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                }}
              >
                {bullets.map((b, i) => (
                  <li key={i} className="mb-2">
                    {b}
                  </li>
                ))}
              </ul>
            )}

            <div className="d-flex flex-wrap gap-3">
              {/* Botón principal dorado */}
              {onPrimaryCtaHref &&
                (onPrimaryCtaHref.startsWith("/") ? (
                  <Link to={onPrimaryCtaHref} className="btn btn-lg btn-gold">
                    {onPrimaryCtaText}
                  </Link>
                ) : (
                  <a href={onPrimaryCtaHref} className="btn btn-lg btn-gold">
                    {onPrimaryCtaText}
                  </a>
                ))}

              {/* Botón secundario (opcional) */}
              {onSecondaryCtaHref &&
                (onSecondaryCtaHref.startsWith("/") ? (
                  <Link
                    to={onSecondaryCtaHref}
                    className="btn btn-lg btn-gold-outline"
                  >
                    {onSecondaryCtaText}
                  </Link>
                ) : (
                  <a
                    href={onSecondaryCtaHref}
                    className="btn btn-lg btn-gold-outline"
                  >
                    {onSecondaryCtaText}
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* ✅ Apartado informativo del contactólogo/optometrista */}
        <div className="row align-items-start g-4 g-lg-5 mt-5">
          <div className="col-lg-7">
            <h3
              className="fw-bold mb-3"
              style={{
                color: palette.gold,
                fontSize: "clamp(24px, 2.6vw, 36px)",
                lineHeight: 1.15,
              }}
            >
              Optometría con tradición y tecnología
            </h3>
            <p
              className="mb-3"
              style={{
                color: palette.text,
                fontSize: "clamp(16px, 1.4vw, 20px)",
              }}
            >
              Estudie en la universidad de en Caracas Venuezuela.. Con más de{" "}
              <strong>13 años</strong> de práctica y una herencia de{" "}
              <strong>4 generaciones</strong> dedicadas a la óptica, evaluamos
              tu salud visual con enfoque clínico y humano. Integramos la
              adaptación de <strong>lentes esclerales</strong> y{" "}
              <strong>RGP a medida</strong> para lograr la mejor agudeza visual
              y comodidad a largo plazo. Ademas de entregar la mejor asesoria
              para mejorar la calidad visual mediante lentes multifocales de
              última tecnologpia
            </p>
            <p
              className="mb-0"
              style={{
                color: palette.text,
                fontSize: "clamp(16px, 1.4vw, 20px)",
              }}
            >
              Nuestro objetivo es que vuelvas a disfrutar de tus actividades con
              una visión nítida y estable, cuidando siempre la{" "}
              <strong>salud de tu superficie ocular</strong>.
            </p>
          </div>

          {/* Imagen lateral del apartado */}
          <div className="col-lg-5">
            <div
              className="rounded-4 overflow-hidden"
              style={{
                minHeight: 220, // 🔽 reducido de 260 a 220
                height: "auto", // evita que se estire al 100%
                border: `1px solid ${palette.border}`,
                boxShadow: palette.shadow,
                background: palette.white,
              }}
            >
              <img
                src={imgs2} // 👉 cambia la ruta según tu imagen
                alt="atención"
                className="w-100"
                loading="lazy"
                style={{
                  height: "600px", // 🔽 controla directamente el alto visible de la imagen
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
