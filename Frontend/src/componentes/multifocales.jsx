import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import multifocal from "../assets/img/lentes_multifocales.jpg";
import imgsobremi from "../assets/img/fernando_sobremi.png";

export default function Multifocales() {
  return (
    <section className="querato-section py-5">
      {/* reutiliza el mismo estilo */}
      <Container>
        {/* Hero */}
        <Row className="mb-5 text-center">
          <Col lg={{ span: 10, offset: 1 }}>
            <h1 className="fw-bold mb-3 gradient-title">
              Lentes Multifocales: Visión Clara a Todas las Distancias
            </h1>
            <p className="fs-5 text-muted hero-subtitle">
              Diseñados para corregir la <strong>presbicia</strong> sin cambiar
              de lentes. Los multifocales te ofrecen una transición suave entre
              cerca, intermedia y lejos, con comodidad durante todo el día.
            </p>
          </Col>
        </Row>

        {/* ¿Qué son los multifocales? + Imagen */}
        <div className="querato-box my-5 py-4 px-5 rounded-4 shadow-lg">
          <Row className="align-items-center g-1">
            <Col md={6}>
              <img
                src={multifocal}
                alt="Lentes de contacto multifocales"
                className="img-fluid rounded shadow querato-hero-img"
              />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold mb-3">
                ¿Qué son los lentes multifocales?
              </h2>
              <p className="fs-5">
                Son lentes de contacto con{" "}
                <strong>múltiples zonas ópticas</strong>
                que te permiten ver{" "}
                <strong>de cerca, intermedio y lejos</strong>
                sin cambiar de anteojos. Ideales para personas con presbicia que
                buscan practicidad y una visión continua.
              </p>
              <ul className="fs-5 mb-0 brand-list">
                <li>Transición suave entre distancias</li>
                <li>Menos dependencia de anteojos para leer</li>
                <li>Confort y visión estable durante el día</li>
              </ul>
            </Col>
          </Row>
        </div>

        {/* Tipos de Lentes Multifocales */}
        <Row className="mb-4 text-center">
          <Col>
            <h2 className="fw-bold">Tipos de Lentes Multifocales</h2>
            <p className="text-muted mb-0">
              Dos soluciones adaptadas a tu estilo de vida:{" "}
              <strong>lentes multifocales de armazón</strong> y{" "}
              <strong>lentes de contacto multifocales</strong>.
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {/* Lentes de Armazón */}
          <Col md={6}>
            <Card className="h-100 shadow-sm info-card">
              <Card.Body>
                <Card.Title className="fw-bold">
                  Multifocales de Armazón
                </Card.Title>
                <Card.Text className="fs-6">
                  Ideales para quienes prefieren la comodidad de los anteojos
                  tradicionales con una <strong>visión continua</strong> sin
                  necesidad de quitarlos.
                </Card.Text>
                <ul className="mb-0 brand-list-sm">
                  <li>
                    Transición natural entre visión de cerca, intermedia y lejos
                  </li>
                  <li>Diseños personalizados para tus hábitos visuales</li>
                  <li>Monturas modernas y livianas</li>
                  <li>Excelente opción para lectura y trabajo en oficina</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Lentes de Contacto */}
          <Col md={6}>
            <Card className="h-100 shadow-sm info-card alt">
              <Card.Body>
                <Card.Title className="fw-bold">
                  Multifocales con Lentes de Contacto
                </Card.Title>
                <Card.Text className="fs-6">
                  Pensados para quienes buscan <strong>libertad visual</strong>{" "}
                  sin anteojos, combinando tecnología óptica avanzada y confort
                  prolongado.
                </Card.Text>
                <ul className="mb-0 brand-list-sm">
                  <li>Visión clara y estable a todas las distancias</li>
                  <li>
                    Alta oxigenación y materiales cómodos para uso prolongado
                  </li>
                  <li>Ideal para actividades al aire libre o deportivas</li>
                  <li>Adaptación personalizada por nuestro especialista</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Por qué elegir Óptica Plazola */}
        <Row className="mb-4 text-center">
          <Col>
            <h2 className="fw-bold">¿Por qué elegir Óptica Plazola?</h2>
          </Col>
        </Row>
        <Row className="g-4 mb-5">
          <Col md={4}>
            <div className="p-4 bg-white rounded shadow-sm h-100 feature-box">
              <h5 className="fw-bold mb-2">Evaluación Experta</h5>
              <p className="mb-0">
                Medición de prescripción para{" "}
                <strong>cerca/intermedia/lejos</strong> y selección de diseño
                multifocal óptimo.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 bg-white rounded shadow-sm h-100 feature-box">
              <h5 className="fw-bold mb-2">Personalización Real</h5>
              <p className="mb-0">
                Ajustes finos según tus <strong>hábitos visuales</strong>{" "}
                (pantalla, lectura, conducción) para máxima nitidez.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 bg-white rounded shadow-sm h-100 feature-box">
              <h5 className="fw-bold mb-2">Acompañamiento</h5>
              <p className="mb-0">
                Seguimiento y <strong>garantía de adaptación</strong> hasta
                lograr la visión esperada con el mejor confort.
              </p>
            </div>
          </Col>
        </Row>

        {/* Especialista + CTA */}
        <Row className="align-items-center g-4 querato-contacto">
          <Col md={5} className="text-center">
            <img
              src={imgsobremi}
              alt="Especialista en lentes multifocales"
              className="img-fluid contactologo-img"
            />
          </Col>
          <Col md={7}>
            <h3 className="fw-bold mb-2" style={{ color: "#B47E36" }}>
              Evaluación y Adaptación Personalizada
            </h3>
            <p className="fs-5">
              Nuestro especialista evalúa tus necesidades visuales para
              determinar si los <strong>lentes multifocales de armazón</strong>{" "}
              o los <strong>lentes de contacto multifocales</strong> son la
              mejor opción para ti. Ambos ofrecen una{" "}
              <strong>visión clara a todas las distancias</strong>, con
              comodidad y naturalidad en la transición entre cerca, intermedio y
              lejos.
            </p>
            <p className="fs-5 mb-4">
              Te acompañamos en cada etapa del proceso, desde la elección del
              diseño ideal hasta la adaptación final, asegurando una experiencia
              visual confortable y adaptada a tu estilo de vida.
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
