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
          {/* 🔹 Cambié el <a> por un <Link> para dirigir a /queratocono */}
          <Link
            to="/queratocono"
            className="text-decoration-none text-dark"
            style={{ display: "block" }}
          >
            <div className="card h-100 shadow fs-4">
              <div className="img-container p-2">
                <img
                  src={fpesclerales}
                  className="card-img-top img-servicios"
                  alt="Lentes Esclerales"
                />
                <div className="card-body text-center">
                  <h5 className="card-title fs-3">
                    Esclerales y Gas Permeable para Queratocono
                  </h5>
                  <p className="card-text">
                    Tratamiento especializado para queratocono y otras
                    irregularidades corneales.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Lentes Multifocales */}
        <div className="col-md-6 col-sm-12">
          <a
            href="#"
            className="text-decoration-none text-dark"
            style={{ display: "block" }}
          >
            <div className="card h-100 shadow fs-4">
              <div className="img-container p-2">
                <img
                  src={Lentesmultifocales}
                  className="card-img-top img-servicios"
                  alt="Lentes Multifocales"
                />
                <div className="card-body text-center">
                  <h5 className="card-title fs-3">Lentes multifocales</h5>
                  <p className="card-text">
                    Visión clara de lejos y cerca con lentes de última
                    generación.
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Servicios;
