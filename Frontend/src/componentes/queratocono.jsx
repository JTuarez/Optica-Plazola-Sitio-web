import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import imglente from "../assets/img/lente_escleral.png";
import imgsobremi from "../assets/img/fernando_sobremi.png";

export default function QueratoCono() {
  return (
    <section className="querato-section py-5">
      <Container>
        {/* Hero */}
        <Row className="mb-5 text-center">
          <Col lg={{ span: 10, offset: 1 }}>
            <h1 className="fw-bold mb-3 gradient-title">
              Queratocono: Recupera tu Calidad Visual
            </h1>
            <p className="fs-5 text-muted hero-subtitle">
              Los <strong>lentes Esclerales</strong> y{" "}
              <strong>lentes Rígidos gas permeables (RGP)</strong> están
              diseñados específicamente para adaptarse a la superficie del ojo,
              creando una nueva forma óptica que mejora drásticamente la calidad
              visual. Estos lentes{" "}
              <strong>corrigen las irregularidades corneales</strong>,
              proporcionan una
              <strong>visión nítida, estable y cómoda</strong> durante todo el
              día, incluso en los casos más avanzados.
            </p>
          </Col>
        </Row>

        {/* ¿Qué es el queratocono? + Imagen */}
        <div className="querato-box my-5 py-4 px-5 rounded-4 shadow-lg">
          <Row className="align-items-center g-5">
            <Col md={6}>
              <img
                src={imglente}
                alt="Lente escleral para queratocono"
                className="img-fluid rounded shadow querato-hero-img"
              />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold mb-3">¿Qué es el queratocono?</h2>
              <p className="fs-5">
                Es una condición en la que la córnea se adelgaza y adopta una
                forma cónica, generando{" "}
                <strong>visión borrosa o distorsionada</strong> y mayor
                sensibilidad a la luz. Con <strong>lentes esclerales</strong> o
                <strong> lentes RGP</strong> es posible recuperar una
                <strong> visión clara y estable</strong>.
              </p>
              <ul className="fs-5 mb-0 brand-list">
                <li>Visión más nítida y estable</li>
                <li>Mayor confort en córneas sensibles</li>
                <li>Menos variaciones en la graduación</li>
              </ul>
            </Col>
          </Row>
        </div>

        {/* Cómo recuperar calidad visual */}
        <Row className="mb-4 text-center">
          <Col>
            <h2 className="fw-bold">¿Cómo recuperar la calidad visual?</h2>
            <p className="text-muted mb-0">
              Dos opciones líderes para queratocono:{" "}
              <strong>lentes esclerales</strong> y
              <strong> lentes rígidos gas permeable (RGP)</strong>.
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col md={6}>
            <Card className="h-100 shadow-sm info-card">
              <Card.Body>
                <Card.Title className="fw-bold">Lentes Esclerales</Card.Title>
                <Card.Text className="fs-6">
                  Descansan sobre la esclera (parte blanca del ojo)...
                </Card.Text>
                <ul className="mb-0 brand-list-sm">
                  <li>Confort superior para córneas sensibles</li>
                  <li>Visión estable y nítida</li>
                  <li>Hidratación constante de la superficie ocular</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm info-card alt">
              <Card.Body>
                <Card.Title className="fw-bold">
                  Lentes Rígidos Gas Permeable (RGP)
                </Card.Title>
                <Card.Text className="fs-6">
                  Corrigen la irregularidad corneal creando una nueva superficie
                  óptica...
                </Card.Text>
                <ul className="mb-0 brand-list-sm">
                  <li>Alta definición visual</li>
                  <li>Diseños personalizados por etapa</li>
                  <li>Buena relación resultado/coste</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Por qué elegir Óptica Plazola */}
        <Row className="mb-4 text-center">
          <Col>
            <h2 className="fw-bold">¿Por qué elegir Fernando Plazola?</h2>
          </Col>
        </Row>
        <Row className="g-4 mb-5">
          <Col md={4}>
            <div className="p-4 bg-white rounded shadow-sm h-100 feature-box">
              <h5 className="fw-bold mb-2">Adaptación Experta</h5>
              <p className="mb-0">
                Estudio topográfico y selección de diseños...
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 bg-white rounded shadow-sm h-100 feature-box">
              <h5 className="fw-bold mb-2">Seguimiento Cercano</h5>
              <p className="mb-0">Controles y educación del paciente...</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 bg-white rounded shadow-sm h-100 feature-box">
              <h5 className="fw-bold mb-2">Tecnología & Calidad</h5>
              <p className="mb-0">
                Trabajamos con laboratorios y materiales...
              </p>
            </div>
          </Col>
        </Row>

        {/* Contactólogo + CTA */}
        <Row className="align-items-center g-5 mb-5 mt-5 querato-contacto">
          <Col md={5} className="text-center">
            <img
              src={imgsobremi}
              alt="Especialista en lentes esclerales"
              className="img-fluid contactologo-img shadow"
            />
          </Col>
          <Col md={7}>
            <h3 className="fw-bold mb-2" style={{ color: "#B47E36" }}>
              Evaluación con nuestro especialista
            </h3>
            <p className="fs-5">
              Evaluamos tu caso de forma personalizada para ofrecerte la mejor
              solución visual. Diseñamos <strong>lentes esclerales</strong> o{" "}
              <strong>RGP a medida</strong>, priorizando tu comodidad, salud
              ocular y la claridad de tu visión. Agenda tu evaluación sin costo
              y da el primer paso hacia una mejor calidad visual.
            </p>
            <Button href="/agendar" size="lg" className="btn-brand">
              Agendar Evaluación
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
