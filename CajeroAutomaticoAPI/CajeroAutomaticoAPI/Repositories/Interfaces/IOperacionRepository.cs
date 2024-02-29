using CajeroAutomaticoAPI.Models;

namespace CajeroAutomaticoAPI.Repositories.Interfaces
{
    public interface IOperacionRepository
    {
        OperacionResponse AddOperation(Operacion operacion);
        void SaveChanges();
    }
}
