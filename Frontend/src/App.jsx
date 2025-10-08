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
import Contacto from "./componentes/contacto";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendar" element={<AgendarPage />} />

        {/* Nueva ruta Contacto */}
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
      </Routes>
    </>
  );
}
