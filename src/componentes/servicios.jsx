import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import fpesclerales from "../assets/img/fp-esclerales.jpg";

function Servicios() {
  return (
    <section className="container my-5" id="servicios">
      <h2 className="text-center mb-5 fw-bold fs-1">
        Servicios Especializados
      </h2>
      <div className="row g-4 justify-content-center">
        {/* Lentes Esclerales */}
        <div className="col-md-6 col-sm-12">
          <a
            href="#"
            className="text-decoration-none text-dark"
            style={{ display: "block" }}
          >
            <div className="card h-100 shadow">
              <img
                src={fpesclerales}
                className="card-img-top"
                alt="Lentes Esclerales"
                style={{ height: "550px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">
                  Lentes esclerales y Gas Permeable para queratocono
                </h5>
                <p className="card-text">
                  Tratamiento especializado para queratocono y otras
                  irregularidades corneales.
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Lentes Multifocales */}
        <div className="col-md-6 col-sm-12">
          <a
            href="#"
            className="text-decoration-none text-dark"
            style={{ display: "block" }}
          >
            <div className="card h-100 shadow">
              <img
                src={fpesclerales}
                className="card-img-top"
                alt="Lentes Multifocales"
                style={{ height: "550px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Lentes multifocales</h5>
                <p className="card-text">
                  Visión clara de lejos y cerca con lentes de última generación.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Servicios;
