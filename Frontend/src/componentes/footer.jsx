import "bootstrap/dist/css/bootstrap.min.css";
import logofp2 from "../assets/img/logo-fp.png";

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
            <img
              src={logofp2} // <-- pon aquí tu imagen, por ejemplo en /public/logo.png
              alt="Óptica Plazola"
              style={{ maxWidth: "180px", marginBottom: "1rem" }}
            />
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
              <a href="#servicios" className="text-white text-decoration-none">
                Servicios
              </a>
            </p>
            <p>
              <a href="#nosotros" className="text-white text-decoration-none">
                Nosotros
              </a>
            </p>
            <p>
              <a href="#contacto" className="text-white text-decoration-none">
                Contacto
              </a>
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
                href="https://www.google.com/maps/place/Fernando+Plazola+Salazar/@-33.425656,-70.6166181,17z/data=!3m1!4b1!4m6!3m5!1s0x9662cf0e40ca3a05:0xc0699802abd6f384!8m2!3d-33.4256605!4d-70.6140432!16s%2Fg%2F11xrdc_pg_?entry=ttu&g_ep=EgoyMDI1MDkxNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-underline"
              >
                <i className="bi bi-geo-alt-fill me-0"></i> Nueva Providencia
                1881 Oficina 2109. Santiago
              </a>
            </p>

            <p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contacto@opticafp.cl"
                className="text-white text-decoration-underline"
              >
                <i className="bi bi-envelope-fill me-0"></i>{" "}
                contacto@opticafp.cl
              </a>
            </p>

            <p>
              <a
                href="tel:+56920211535"
                className="text-white text-decoration-underline"
              >
                <i className="bi bi-telephone-fill me-0"></i> +56 9 2021 1535
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
            <a
              href="#"
              className="btn btn-outline-light btn-floating m-1"
              style={{ borderRadius: "50%" }}
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-light btn-floating m-1"
              style={{ borderRadius: "50%" }}
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-light btn-floating m-1"
              style={{ borderRadius: "50%" }}
            >
              <i className="bi bi-whatsapp"></i>
            </a>
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
