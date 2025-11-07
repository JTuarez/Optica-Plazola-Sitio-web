import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { createReserva, getDisponibilidad } from "../services/api";
import { Card, Button } from "react-bootstrap";
import "dayjs/locale/es";

dayjs.locale("es");

const schema = z.object({
  nombre_cliente: z.string().min(2, "Ingresa el nombre"),
  email: z.string().email("Email inválido"),
  slot: z.string().min(1, "Selecciona un horario"),
});

const TZ = import.meta.env.VITE_TZ || "America/Santiago";

export default function ReservasForm({ onCreated }) {
  // -------- Calendario --------
  const [viewMonth, setViewMonth] = useState(dayjs().startOf("month"));
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("day"));

  const firstOfMonth = viewMonth.startOf("month");
  const dow = firstOfMonth.day(); // 0=dom
  const offsetToMonday = (dow + 6) % 7;
  const start = firstOfMonth.subtract(offsetToMonday, "day").startOf("day");

  const days = useMemo(
    () => Array.from({ length: 42 }, (_, i) => start.add(i, "day")),
    [start]
  );

  const isPast = (d) => d.isBefore(dayjs().startOf("day"), "day");
  const isToday = (d) => d.isSame(dayjs(), "day");
  const isSelected = (d) => d.isSame(selectedDate, "day");
  const inCurrentMonth = (d) => d.isSame(viewMonth, "month");
  const nextMonth = () => setViewMonth((m) => m.add(1, "month"));
  const prevMonth = () => setViewMonth((m) => m.subtract(1, "month"));

  // -------- Form (declarado ANTES de fetchSlots) --------
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

  // -------- Slots --------
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const fetchSlots = async (dateObj) => {
    setLoadingSlots(true);
    try {
      const fecha = dateObj.format("YYYY-MM-DD");

      // horas ocupadas desde el backend
      const { data: horasReservadas } = await getDisponibilidad(fecha);

      // horario base del día
      const base = [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ];

      // marca como no disponible las reservadas
      const data = base.map((t) => ({
        time: t,
        disponible: !horasReservadas.includes(t),
      }));

      setSlots(data);
      setValue("slot", "");
    } catch (err) {
      console.error("❌ Error al cargar disponibilidad:", err);
      toast.error("No se pudo cargar la disponibilidad");
      setSlots([]);
      setValue("slot", "");
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchSlots(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const selectedSlot = watch("slot");

  const onSubmit = async (values) => {
    // construye fecha local simple
    const fechaStr = `${selectedDate.format("YYYY-MM-DD")} ${values.slot}`;
    const fechaFinal = dayjs(fechaStr, "YYYY-MM-DD HH:mm");

    const payload = {
      nombre_cliente: values.nombre_cliente.replace(/\s+/g, " ").trim(),
      email: values.email.trim().toLowerCase(),
      fecha_hora: fechaFinal.format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      await createReserva(payload);
      toast.success("Reserva creada y correo enviado ✅");
      reset({ nombre_cliente: "", email: "", slot: "" });
      onCreated?.();
      fetchSlots(selectedDate); // refresca para marcar ocupado
    } catch (e) {
      if (e?.response?.status === 409) {
        toast.error("Ese horario ya fue reservado. Elige otro.");
        fetchSlots(selectedDate);
        return;
      }
      console.error("Error al crear reserva:", e?.response?.data || e.message);
      toast.error(e?.response?.data?.error || "No se pudo crear la reserva");
    }
  };

  return (
    <>
      {/* Banner */}
      <section
        className="hero-agenda position-relative w-100"
        style={{
          background: "linear-gradient(180deg, #d6a04e, #b97d3e)",
          color: "white",
        }}
      >
        <div className="container text-center py-5">
          <p
            className="text-uppercase fw-bold mb-3"
            style={{ color: "#fff3e0", letterSpacing: "1px" }}
          >
            Porque sabemos lo importante que es la calidad visual
          </p>
          <h1 className="fw-bold display-6 mb-2 text-white">
            Contarás con un asesoramiento personalizado
          </h1>
          <h3>Porque hacemos arte para tus ojos</h3>
        </div>
      </section>

      <div className="container my-4">
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
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={prevMonth}
                >
                  ‹
                </Button>
                <div className="fw-semibold">
                  {viewMonth.format("MMMM YYYY")}
                </div>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={nextMonth}
                >
                  ›
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="calendar-grid">
                  {["lun", "mar", "mié", "jue", "vie", "sáb", "dom"].map(
                    (w) => (
                      <div key={w} className="calendar-week">
                        {w}
                      </div>
                    )
                  )}
                  {days.map((d) => (
                    <button
                      key={d.format("YYYY-MM-DD")}
                      className={[
                        "calendar-btn",
                        isSelected(d) ? "selected" : "",
                        isToday(d) ? "today" : "",
                        !inCurrentMonth(d) ? "text-muted" : "",
                        isPast(d) ? "disabled" : "",
                      ].join(" ")}
                      onClick={() => !isPast(d) && setSelectedDate(d)}
                      disabled={isPast(d)}
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
                  <div className="text-center text-muted py-4">
                    Sin horarios.
                  </div>
                ) : (
                  <div className="d-flex flex-wrap gap-2">
                    {slots.map((s) => (
                      <button
                        key={s.time}
                        type="button"
                        className={`slot-btn ${
                          selectedSlot === s.time ? "active" : ""
                        }`}
                        disabled={!s.disponible || isSubmitting}
                        onClick={() =>
                          setValue("slot", s.time, { shouldValidate: true })
                        }
                        title={!s.disponible ? "Horario ocupado" : ""}
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
    </>
  );
}
