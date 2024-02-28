using CajeroAutomaticoAPI.Models;

namespace CajeroAutomaticoAPI.Repositories.Interfaces
{

    public interface ITarjetaRepository
    {
        IEnumerable<Tarjeta> GetAll();
        Tarjeta GetByNum(long num);

        /*Tarjeta Update(Tarjeta t);*/
        void SaveChanges();
    }
}
