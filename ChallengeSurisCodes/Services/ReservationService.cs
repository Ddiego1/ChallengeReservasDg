using Newtonsoft.Json;
using reservas_backend.Models;
using System.Xml;

namespace ChallengeSurisCodes.Services
{
    public class ReservationService
    {
        private readonly string filePath = "reservations.json";  // Ruta del archivo donde se almacenan las reservas
        private List<Reservation> _reservations;

        public ReservationService()
        {
            // Cargar las reservas desde el archivo al iniciar la aplicación
            if (File.Exists(filePath))
            {
                var json = File.ReadAllText(filePath);
                _reservations = JsonConvert.DeserializeObject<List<Reservation>>(json) ?? new List<Reservation>();
            }
            else
            {
                _reservations = new List<Reservation>();  // Si el archivo no existe, inicializar la lista vacía
            }
        }

        // Obtener todas las reservas
        public List<Reservation> GetReservations()
        {
            return _reservations;
        }

        // Agregar reserva
        public bool AddReservation(Reservation reservation, out string errorMessage)
        {
            // Validar que el horario este disponible
            if (_reservations.Any(r => r.DateTime == reservation.DateTime))
            {
                errorMessage = "Ya existe una reserva en ese horario.";
            }

            // Validar que el mismo cliente no tenga 2 reservas el mismo dia
            if (_reservations.Any(r => r.ClientName == reservation.ClientName && r.DateTime.Date == reservation.DateTime.Date))
            {
                errorMessage = "El cliente ya tiene una reserva en este día.";
                return false;  
            }

            // Si no hay errores, agrega la reserva
            _reservations.Add(reservation);
            SaveReservationsToFile();  // Guardar las reservas al archivo
            errorMessage = ""; 
            return true;
        }

        // Guardar las reservas en el archivo
        private void SaveReservationsToFile()
        {
            var json = JsonConvert.SerializeObject(_reservations, Newtonsoft.Json.Formatting.Indented);
            File.WriteAllText(filePath, json);
        }
    }
}