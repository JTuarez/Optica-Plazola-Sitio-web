import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

export default function SobreMi({
  title = "Evaluación con nuestro especialista",
  subtitle = "Fernando Plazola · Optómetra especializado",
  description = (
    <>
      Evaluamos tu caso de forma personalizada para ofrecerte la mejor solución
      visual. Diseñamos <strong>lentes esclerales</strong> o{" "}
      <strong>RGP a medida</strong>, priorizando tu comodidad, salud ocular y la
      claridad de tu visión. Agenda tu evaluación sin costo y da el primer paso
      hacia una mejor calidad visual.
    </>
  ),
  bullets = [],
  photoSrc,
  photoAlt = "Profesional de la óptica",
  imagePosition = "50% 45%",
  onPrimaryCtaHref = "/agendar",
  onPrimaryCtaText = "Agendar Evaluación",
  onSecondaryCtaHref = "",
  onSecondaryCtaText = "",
}) {
  const palette = {
    cream: "#FBF7F2", // fondo
    gold: "#CFA24A", // dorado principal
    goldHover: "#B98933", // dorado hover
    text: "#4B5563", // gris texto
    chipBg: "#FFF3D6", // chip claro
    shadow: "0 12px 28px rgba(0,0,0,.08)",
    border: "rgba(0,0,0,.06)",
  };

  return (
    <section
      id="sobre-mi"
      className="py-5"
      style={{ background: palette.cream }}
    >
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Imagen */}
          <div className="col-lg-6">
            <div
              className="position-relative rounded-4 overflow-hidden"
              style={{
                height: 460,
                maxHeight: "70vh",
                background: "#0A66C2", // solo se ve si no hay foto
                border: `1px solid ${palette.border}`,
                boxShadow: palette.shadow,
              }}
            >
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt={photoAlt}
                  loading="lazy"
                  className="w-100 h-100"
                  style={{ objectFit: "cover", objectPosition: imagePosition }}
                />
              ) : (
                <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-white">
                  <span className="text-muted">
                    Agrega la prop <code>photoSrc</code> con tu imagen
                  </span>
                </div>
              )}
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

            <h2
              className="fw-bold mb-3"
              style={{ color: palette.gold, lineHeight: 1.15 }}
            >
              {title}
            </h2>

            <p
              className="mb-3"
              style={{ color: palette.text, fontWeight: 600 }}
            >
              {subtitle}
            </p>

            <p className="mb-4" style={{ color: palette.text }}>
              {description}
            </p>

            {bullets?.length > 0 && (
              <ul className="mb-4" style={{ color: palette.text }}>
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

              {/* Botón secundario contorno dorado (opcional) */}
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
      </div>
    </section>
  );
}
