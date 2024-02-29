using CajeroAutomaticoAPI.Models;
using Microsoft.AspNetCore.Components.Web;

namespace CajeroAutomaticoAPI.Repositories.Interfaces
{

    public interface ITarjetaRepository
    {
        TarjetaResponse ValidateTarjeta(long num, int? pin);

        TarjetaResponse GetTarjetaById(int id);

        TarjetaResponse BloquearTarjeta(int id);

        TarjetaResponse UpdateBalance(int id, decimal amount);

        void SaveChanges();
    }
}
