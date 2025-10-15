import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import fpesclerales from "../assets/img/f-escleral.png";
import Lentesmultifocales from "../assets/img/lentes-multifocales.png";
import { Link } from "react-router-dom";

function Servicios() {
  return (
    <section className="container my-5" id="servicios">
      <h2 className="text-center mb-2 fw-bold fs-1">
        Servicios Especializados
      </h2>
      <p className="text-center mt-1 mb-5 fs-5">
        Porque buscamos claridad en tus ojos
      </p>

      <div className="row g-4 justify-content-center">
        {/* Lentes Esclerales */}
        <div className="col-md-6 col-sm-12">
          <Link
            to="/queratocono"
            className="text-decoration-none text-dark d-block"
          >
            <article className="service-card service-card--glow h-100">
              <div className="service-media">
                <img
                  src={fpesclerales}
                  className="service-img"
                  alt="Lentes Esclerales y Gas Permeable"
                  loading="lazy"
                />
                <span className="service-badge">Queratocono</span>
              </div>
              <div className="service-body text-center">
                <h5 className="service-title">
                  Esclerales y Gas Permeable para Queratocono
                </h5>
                <p className="service-text">
                  Tratamiento especializado para queratocono y otras
                  irregularidades corneales.
                </p>
                <span className="service-cta">
                  Ver detalles
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 5l8 7-8 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </div>
            </article>
          </Link>
        </div>

        {/* Lentes Multifocales */}
        <div className="col-md-6 col-sm-12">
          <Link
            to="/multifocales"
            className="text-decoration-none text-dark d-block"
          >
            <article className="service-card service-card--glow h-100">
              <div className="service-media">
                <img
                  src={Lentesmultifocales}
                  className="service-img"
                  alt="Lentes Multifocales"
                  loading="lazy"
                />
                <span className="service-badge">Presbicia</span>
              </div>
              <div className="service-body text-center">
                <h5 className="service-title">Lentes Multifocales</h5>
                <p className="service-text">
                  Visión clara de lejos y cerca con lentes de última generación.
                </p>
                <span className="service-cta">
                  Ver detalles
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 5l8 7-8 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </div>
            </article>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Servicios;
