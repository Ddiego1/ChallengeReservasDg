import React, { useState, useEffect } from "react";
import { getReservations } from "../services/api";

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      const data = await getReservations();
      setReservations(data);
    }
    fetchReservations();
  }, []);

  return (
    <div>
      <h2>Lista de Reservas</h2>
      <ul>
        {reservations.map((res, index) => (
          <li key={index}>
            {res.clientName} - {res.service} - {new Date(res.dateTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsList;
