import React from "react";
import img1 from "../assets/img/david.png";
import img2 from "../assets/img/banner_esclerales.png";
import img3 from "../assets/img/multifocal_banner.png";
import { Link } from "react-router-dom";

function Carousel() {
  return (
    <div
      id="mainCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ height: "60vh" }}
    >
      <div className="carousel-inner" style={{ height: "100%" }}>
        {/*  Primer banner con texto */}
        <div
          className="carousel-item active position-relative"
          style={{ height: "100%" }}
        >
          <img
            src={img1}
            className="d-block w-100 banner-img"
            alt="Arte con Fernando Plazola"
          />
          <div className="carousel-texto text-center ">
            <h2 className="arte fw-bold">Hacemos arte para tus ojos</h2>
          </div>
        </div>

        {/*  Segundo banner sin texto */}
        <div className="carousel-item" style={{ height: "100%" }}>
          <img src={img2} className="d-block w-100 banner-img" alt="Banner 2" />
        </div>

        {/*  Tercer banner sin texto */}
        <div className="carousel-item" style={{ height: "100%" }}>
          <img src={img3} className="d-block w-100 banner-img" alt="Banner 3" />
        </div>

        {/*  Botón Contactar */}
        <Link to="/agendar" className="btn-contactar">
          <span>Agendar sesión sin costo</span>
        </Link>
      </div>

      {/*  Flechas */}
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
