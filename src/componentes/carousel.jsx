import React from "react";
import img1 from "../assets/img/david.png";
import img2 from "../assets/img/fp-1.jpg";
import img3 from "../assets/img/logo-fp2.png";

function Carousel() {
  return (
    <div
      id="mainCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ height: "80vh" }}
    >
      <div className="carousel-inner" style={{ height: "100%" }}>
        <div className="carousel-item active" style={{ height: "100%" }}>
          <img src={img1} className="d-block w-100 banner-img" alt="Banner 1" />
        </div>
        <div className="carousel-item" style={{ height: "100%" }}>
          <img src={img2} className="d-block w-100 banner-img" alt="Banner 2" />
        </div>
        <div className="carousel-item" style={{ height: "100%" }}>
          <img src={img3} className="d-block w-100 banner-img" alt="Banner 3" />
        </div>
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
