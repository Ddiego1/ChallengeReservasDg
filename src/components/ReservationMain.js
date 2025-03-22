import React, { useState, useEffect } from "react";
import { getServices, createReservation } from "../services/api";

const ReservationMain = ({ onReservationCreated }) => {
  const [services, setServices] = useState([]); 
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getServices();
        console.log("Servicios recibidos:", data);
        
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          console.error("Error: La API no devolvió un array", data);
          setServices([]); 
        }
      } catch (error) {
        console.error("Error al obtener servicios:", error);
        setServices([]); 
      }
    }
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!clientName || !service || !dateTime) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    try {
      // Esperar a que el backend devuelva la respuesta antes de continuar
      const response = await createReservation({ clientName, service, dateTime });
      if (response && response.data) {
        alert(response.data.message || "Reserva creada exitosamente.");
      } else {
        alert("Reserva creada exitosamente.");
      }
  
      onReservationCreated();
      setClientName("");
      setService("");
      setDateTime("");
  
    } catch (error) {
      const errorMessage = error || "Error al crear la reserva.";
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Reserva</h2>
      <input
        type="text"
        placeholder="Nombre del Cliente"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
      />
      <select value={service} onChange={(e) => setService(e.target.value)} required>
        <option value="">Seleccione un servicio</option>
        {services.length > 0 ? (
        services.map((s, index) => (
          <option key={index} value={s.name}>{s.name}</option>  // Acceder a la propiedad 'name' del objeto
        ))
      ) : (
        <option disabled>Cargando servicios...</option> 
      )}
      </select>
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        required
      />
      <button type="submit">Reservar</button>
    </form>
  );
};

export default ReservationMain;