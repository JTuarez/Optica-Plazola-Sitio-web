// src/componentes/SobreMi.jsx
import React from "react";
import fotoPerfil from "../assets/img/fp-1.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

export default function SobreMi() {
  return (
    <section className="sobre-mi container my-5">
      <div className="sobre-mi-contenedor">
        <div className="sobre-mi-imagen">
          <img src={fotoPerfil} alt="Tu nombre" />
        </div>
        <div className="sobre-mi-texto">
          <h2>¡Hola!</h2>
          <p className="subtitulo">
            Soy Fernando Plazola Óptico Contactólogo y Especialista en
            Queratocono Cuento con más de 13 años de experiencia en el rubro de
            la óptica y la contactología. Me especializo en la adaptación y
            desarrollo de lentes de contacto personalizados para pacientes con
            Queratocono, así como en soluciones de lentes multifocales para una
            visión clara a todas las distancias.
          </p>
          <p>
            Mi mision es encontrar la solucion visual personalizada a cada
            paciente
          </p>
          <div className="d-flex align-items-center gap-4 mt-3">
            <Link to="/sobremidos" className="btn-saber-mas">
              Saber más &gt;
            </Link>

            <div className="sobre-mi-redes">
              <i className="fab fa-instagram"></i>
              <a
                href="https://www.instagram.com/optica.plazola"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Optica.Plazola
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
