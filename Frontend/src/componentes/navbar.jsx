import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logofp2 from "../assets/img/logo-fp.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top w-100 py-3"
      style={{ backgroundColor: "#F9F6EF" }}
    >
      <div className="container">
        {/* 🔹 Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logofp2} alt="Fernando-Plazola" height="70" />
        </Link>

        {/* 🔹 Botón responsive */}
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

        {/* 🔹 Menú principal */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/sobremidos">
                Sobre mí
              </Link>
            </li>

            {/* 🔽 Dropdown Lentes con hover */}
            <li className="nav-item dropdown dropdown-hover">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="lentesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Lentes
              </a>
              <ul className="dropdown-menu" aria-labelledby="lentesDropdown">
                <li>
                  <Link className="dropdown-item" to="/queratocono">
                    Lentes para Queratocono
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/multifocales">
                    Lentes Multifocales
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
