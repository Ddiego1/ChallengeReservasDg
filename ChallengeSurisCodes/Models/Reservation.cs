using System.ComponentModel.DataAnnotations;

namespace reservas_backend.Models
{
    public class Reservation
    {
        [Required]
        public string ClientName { get; set; }

        [Required]
        public string Service { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime DateTime { get; set; }
    }
}