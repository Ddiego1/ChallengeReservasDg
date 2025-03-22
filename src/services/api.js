import axios from "axios";

const API_URL = "https://localhost:44327/api";

export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservations/services`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicios:", error);
  }
};

export const getReservations = async () => {
  try{
    const response = await axios.get(`${API_URL}/reservations`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener reservaciones:", error);
  }
};

export const createReservation = async (reservation) => {
  try{
    const response = await axios.post(`${API_URL}/reservations`, reservation);
    console.log(response);
    return response;
  } catch (error) {

    console.log(error);
    throw error.response?.data?.message || "Error al crear la reserva.";
  }
};
