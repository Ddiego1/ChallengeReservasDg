using ChallengeSurisCodes.Models;

namespace ChallengeSurisCodes.Services
{
    public class ServiceService
    {
        private readonly List<Service> _services = new()
        {
            new Service { Name = "Servicio A" },
            new Service { Name = "Servicio B" },
            new Service { Name = "Servicio C" },
            new Service { Name = "Servicio D" },
            new Service { Name = "Servicio E" }
        };

        public List<Service> GetServices()
        {
            return _services;
        }
    }
}