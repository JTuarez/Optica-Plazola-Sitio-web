// src/componentes/ReservasForm.jsx
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createReserva } from "../services/api";
import { Card, Button } from "react-bootstrap";

dayjs.extend(utc);
dayjs.extend(timezone);

const schema = z.object({
  nombre_cliente: z.string().min(2, "Ingresa el nombre"),
  email: z.string().email("Email inválido"),
  slot: z.string().min(1, "Selecciona un horario"),
});

const TZ = import.meta.env.VITE_TZ || "America/Santiago";

// Fallback simple para disponibilidad (cámbialo luego por tu endpoint real)
const mockDisponibilidad = (fechaISO) => {
  const base = [
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];
  return base.map((t, i) => ({ time: t, disponible: !(i % 3 === 0) }));
};

export default function ReservasForm({ onCreated }) {
  // -------- Calendario --------
  const [viewMonth, setViewMonth] = useState(dayjs().tz(TZ).startOf("month"));
  const [selectedDate, setSelectedDate] = useState(
    dayjs().tz(TZ).startOf("day")
  );

  const start = viewMonth.startOf("week");
  const days = useMemo(
    () => Array.from({ length: 42 }, (_, i) => start.add(i, "day")),
    [start]
  );
  const isToday = (d) => d.isSame(dayjs().tz(TZ), "day");
  const isSelected = (d) => d.isSame(selectedDate, "day");
  const inCurrentMonth = (d) => d.isSame(viewMonth, "month");

  const nextMonth = () => setViewMonth((m) => m.add(1, "month"));
  const prevMonth = () => setViewMonth((m) => m.subtract(1, "month"));

  // -------- Slots --------
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const fetchSlots = (dateObj) => {
    setLoadingSlots(true);
    try {
      const fechaISO = dateObj.format("YYYY-MM-DD");
      const data = mockDisponibilidad(fechaISO); // sin await
      setSlots(data || []);
      setValue("slot", ""); // limpia selección al cambiar día
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  // -------- Form --------
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { nombre_cliente: "", email: "", slot: "" },
  });

  const selectedSlot = watch("slot");

  const onSubmit = async (values) => {
    const fechaFinal = dayjs.tz(
      `${selectedDate.format("YYYY-MM-DD")} ${values.slot}`,
      "YYYY-MM-DD HH:mm",
      TZ
    );

    const payload = {
      nombre_cliente: values.nombre_cliente.trim(),
      email: values.email.trim(),
      fecha_hora: fechaFinal.format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      await createReserva(payload);
      toast.success("Reserva creada y correo enviado ✅");
      reset({ nombre_cliente: "", email: "", slot: "" });
      onCreated?.();
      fetchSlots(selectedDate); // refresca disponibilidad (deja ocupado si corresponde)
    } catch (e) {
      console.error(e);
      toast.error("No se pudo crear la reserva");
    }
  };

  return (
    <div className="container my-4">
      {/* Hero */}
      <Card className="booking-hero border-0 mb-4">
        <Card.Body className="p-4">
          <h1 className="booking-title display-6 mb-2">Reserva tu hora</h1>
          <p className="booking-sub mb-0 fs-5">
            Revisa la disponibilidad y reserva el día y horario que más te
            convenga.
          </p>
        </Card.Body>
      </Card>

      <div className="row g-4">
        {/* Calendario */}
        <div className="col-12 col-lg-4">
          <Card className="calendar-card">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <Button size="sm" variant="outline-secondary" onClick={prevMonth}>
                ‹
              </Button>
              <div className="fw-semibold">{viewMonth.format("MMMM YYYY")}</div>
              <Button size="sm" variant="outline-secondary" onClick={nextMonth}>
                ›
              </Button>
            </Card.Header>

            <Card.Body>
              <div className="calendar-grid">
                {["lun", "mar", "mié", "jue", "vie", "sáb", "dom"].map((w) => (
                  <div key={w} className="calendar-week">
                    {w}
                  </div>
                ))}
                {days.map((d) => (
                  <button
                    key={d.format("YYYY-MM-DD")}
                    className={[
                      "calendar-btn",
                      isSelected(d) ? "selected" : "",
                      isToday(d) ? "today" : "",
                      !inCurrentMonth(d) ? "text-muted" : "",
                    ].join(" ")}
                    onClick={() => setSelectedDate(d)}
                  >
                    <div className="calendar-day">{d.date()}</div>
                  </button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Horarios */}
        <div className="col-12 col-lg-4">
          <Card className="slots-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">
                  Disponibilidad:{" "}
                  <span className="summary-badge">
                    {selectedDate.format("dddd, D [de] MMMM")}
                  </span>
                </h5>
                <span className="text-muted small">hora de {TZ}</span>
              </div>

              {loadingSlots ? (
                <div className="text-center py-4">
                  <div className="spinner-border" role="status" />
                </div>
              ) : !slots.length ? (
                <div className="text-center text-muted py-4">Sin horarios.</div>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <button
                      key={s.time}
                      type="button"
                      className={`slot-btn ${
                        selectedSlot === s.time ? "active" : ""
                      }`}
                      disabled={!s.disponible}
                      onClick={() =>
                        setValue("slot", s.time, { shouldValidate: true })
                      }
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              )}
              {errors.slot && (
                <div className="text-danger small mt-2">
                  {errors.slot.message}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Detalle + Form */}
        <div className="col-12 col-lg-4">
          <Card className="summary-card">
            <Card.Body>
              <h5 className="mb-3">Detalle del servicio</h5>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="summary-badge">
                  Sesión Orientación hasta 1 hora
                </span>
                {selectedSlot && (
                  <span className="summary-badge">
                    {selectedDate.format("DD/MM/YYYY")} · {selectedSlot}
                  </span>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label className="form-label">Nombre del cliente</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.nombre_cliente ? "is-invalid" : ""
                    }`}
                    placeholder="Ej: Jordy Tuarez"
                    {...register("nombre_cliente")}
                  />
                  {errors.nombre_cliente && (
                    <div className="invalid-feedback">
                      {errors.nombre_cliente.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="cliente@correo.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Campo oculto para zod */}
                <input type="hidden" {...register("slot")} />

                <Button
                  className="btn-plazola w-100"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Reservando..." : "Reservar"}
                </Button>
              </form>

              <p className="text-muted small mt-3 mb-0">
                Recibirás confirmación por correo.
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
