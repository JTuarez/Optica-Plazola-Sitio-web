import React from "react";
import img1 from "../assets/img/david.png";

function Carousel() {
  return (
    <div
      id="mainCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ height: "80vh" }}
    >
      <div className="carousel-texto">
        <h2 className="arte">Hacemos arte para tus ojos</h2>
      </div>
      <div className="carousel-inner" style={{ height: "100%" }}>
        <div className="carousel-item active" style={{ height: "100%" }}>
          <img
            src={img1}
            className="d-block w-100 banner-img"
            alt="Arte con Fernando Plazola"
          />
        </div>
        <div className="carousel-item" style={{ height: "100%" }}>
          <img src={img1} className="d-block w-100 banner-img" alt="Banner 2" />
        </div>
        <div className="carousel-item" style={{ height: "100%" }}>
          <img src={img1} className="d-block w-100 banner-img" alt="Banner 3" />
        </div>

        {/* Botón Contactar */}
        <a href="#contacto" className="btn-contactar">
          <span>Agendar sesión sin costo</span>
        </a>
      </div>

      {/* Flechas */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Carousel;
