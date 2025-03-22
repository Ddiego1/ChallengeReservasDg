import React, { useState } from "react";
import ReservationMain from "./components/ReservationMain";
import ReservationList from "./components/ReservationList";

function App() {
  const [updateList, setUpdateList] = useState(false);

  const refreshReservations = () => {
    setUpdateList(!updateList);
  };

  return (
    <div>
      <h1>Sistema de Reservas</h1>
      <ReservationMain onReservationCreated={refreshReservations} />
      <ReservationList key={updateList} />
    </div>
  );
}

export default App;
