import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logofp2 from "../assets/img/logo-fp.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="text-white pt-5 pb-4"
      style={{ backgroundColor: "#644F3D" }}
    >
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          {/* Columna Logo y Descripción */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <Link to="/">
              <img
                src={logofp2}
                alt="Óptica Plazola"
                style={{ maxWidth: "180px", marginBottom: "1rem" }}
              />
            </Link>
            <p>
              Cuidamos tu visión con lentes especializados: esclerales,
              semirrígidos y multifocales. Claridad y confort para tus ojos.
            </p>
          </div>

          {/* Columna Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5
              className="text-uppercase mb-4 fw-bold"
              style={{ color: "#E0A059" }}
            >
              Enlaces
            </h5>
            <p>
              {/* 🔗 Enlace actualizado para ir al componente sobremidos.jsx */}
              <Link
                to="/multifocales"
                className="text-white text-decoration-none"
              >
                Presbicia
              </Link>
            </p>
            <p>
              {/* 🔗 Enlace actualizado para ir al componente sobremidos.jsx */}
              <Link
                to="/queratocono"
                className="text-white text-decoration-none"
              >
                Queratocono
              </Link>
            </p>
            <p>
              {/* 🔗 Enlace actualizado para ir al componente sobremidos.jsx */}
              <Link
                to="/sobremidos"
                className="text-white text-decoration-none"
              >
                Sobre mí
              </Link>
            </p>
            <p>
              <Link to="/contacto" className="text-white text-decoration-none">
                Contacto
              </Link>
            </p>
          </div>

          {/* Columna Contacto */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5
              className="text-uppercase mb-4 fw-bold"
              style={{ color: "#E0A059" }}
            >
              Contacto
            </h5>
            <p>
              <a
                href="https://www.google.com/maps/place/Fernando+Plazola+Salazar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-underline"
              >
                Nueva Providencia 1881 Oficina 2109. Santiago
              </a>
            </p>
            <p>
              <a
                href="mailto:contacto@opticafp.cl"
                className="text-white text-decoration-underline"
              >
                contacto@opticafp.cl
              </a>
            </p>
            <p>
              <a
                href="tel:+56920211535"
                className="text-white text-decoration-underline"
              >
                +56 9 2021 1535
              </a>
            </p>
          </div>

          {/* Columna Redes Sociales */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3 text-center">
            <h5
              className="text-uppercase mb-4 fw-bold"
              style={{ color: "#E0A059" }}
            >
              Síguenos
            </h5>

            <div className="d-flex justify-content-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/OpticaPlazola"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-3 social-icon"
              >
                <i className="fab fa-facebook"></i>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/optica.plazola"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-3 social-icon"
              >
                <i className="fab fa-instagram"></i>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/56920211535"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-3 social-icon"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-3" style={{ borderColor: "#E0A059" }} />
        <div className="text-center">
          <p className="mb-0">
            © 2025 Óptica Plazola | Todos los derechos reservados | Desarrollado
            por{" "}
            <a
              href="https://www.smeiby.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-underline"
            >
              Smeiby
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
