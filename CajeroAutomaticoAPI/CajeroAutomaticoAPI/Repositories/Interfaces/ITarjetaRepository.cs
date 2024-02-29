using CajeroAutomaticoAPI.Models;

namespace CajeroAutomaticoAPI.Repositories.Interfaces
{

    public interface ITarjetaRepository
    {
        TarjetaResponse ValidateTarjeta(long num, int? pin);

        TarjetaResponse GetTarjetaById(int id);

        void UpdateBloqueada(int id, bool bloqueada);

        void SaveChanges();
    }
}
