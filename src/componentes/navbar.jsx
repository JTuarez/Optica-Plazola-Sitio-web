import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logofp2 from "../assets/img/logo-fp.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top w-100 py-3">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logofp2} alt="Fernando-Plazola" height="70" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sobre mí
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Lentes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
