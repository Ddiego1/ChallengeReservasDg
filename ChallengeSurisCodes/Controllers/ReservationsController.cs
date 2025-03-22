using ChallengeSurisCodes.Models;
using ChallengeSurisCodes.Services;
using Microsoft.AspNetCore.Mvc;
using reservas_backend.Models;

namespace reservas_backend.Controllers
{
    [Route("api/reservations")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationService _reservationService;
        private readonly ServiceService _serviceService;

        public ReservationController()
        {
            _reservationService = new ReservationService();
            _serviceService = new ServiceService();
        }

        [HttpGet("services")] 
        public ActionResult<List<Service>> GetServices()
        {
            var services = _serviceService.GetServices();
            return Ok(services);
        }

        [HttpGet("")] 
        public ActionResult<List<Reservation>> GetReservations()
        {
            var reservations = _reservationService.GetReservations();
            return Ok(reservations);
        }

        [HttpPost]
        public IActionResult CreateReservation([FromBody] Reservation reservation)
        {
            if (reservation == null)
                return BadRequest(new { message = "Datos de reserva inválidos." });

            if (!_reservationService.AddReservation(reservation, out string errorMessage))
            {
                return BadRequest(new { message = errorMessage }); 
            }

            return Ok(new { message = "Reserva creada exitosamente." });
        }
    }
}