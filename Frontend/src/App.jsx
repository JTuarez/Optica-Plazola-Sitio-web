import "./App.css";
import Navbar from "./componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "./componentes/carousel";
import Servicios from "./componentes/servicios";
import Footer from "./componentes/footer";
import ReservasForm from "./componentes/ReservasForm";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import SobreMi from "./componentes/sobremi";
import SobreMiDos from "./componentes/sobremidos";
import Contacto from "./componentes/contacto";
import QueratoCono from "./componentes/queratocono";
import Multifocales from "./componentes/multifocales";
import ScrollToTop from "./componentes/ScrollToTop"; // ✅ Asegúrate de que el nombre del archivo sea "scrolltop.jsx" o "ScrollToTop.jsx"

function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <SobreMi />
      <Servicios />
      <Footer />
    </>
  );
}

// Página Agendar (solo el calendario bonito)
function AgendarPage() {
  return (
    <>
      <Navbar />
      <main>
        <ReservasForm />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      {/* ✅ Aquí el componente ScrollToTop */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendar" element={<AgendarPage />} />

        <Route
          path="/sobremidos"
          element={
            <>
              <Navbar />
              <main>
                <SobreMiDos />
              </main>
              <Footer />
            </>
          }
        />

        {/* Ruta Contacto */}
        <Route
          path="/contacto"
          element={
            <>
              <Navbar />
              <Contacto />
              <Footer />
            </>
          }
        />

        {/* Ruta Queratocono */}
        <Route
          path="/queratocono"
          element={
            <>
              <Navbar />
              <QueratoCono />
              <Footer />
            </>
          }
        />

        {/* Ruta Multifocales */}
        <Route
          path="/multifocales"
          element={
            <>
              <Navbar />
              <Multifocales />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}
