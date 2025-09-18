import "./App.css";
import Navbar from "./componentes/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "./componentes/carousel";
import Servicios from "./componentes/servicios";
import Footer from "./componentes/footer";

function App() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Servicios />
      <Footer />
    </>
  );
}

export default App;
