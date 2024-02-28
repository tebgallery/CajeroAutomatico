using CajeroAutomaticoAPI.Models;
using CajeroAutomaticoAPI.Repositories.Interfaces;

namespace CajeroAutomaticoAPI.Repositories
{
    public class TarjetaRepository : ITarjetaRepository
    {
        private readonly CajeroAutomaticoDbContext _context;

        public TarjetaRepository(CajeroAutomaticoDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Tarjeta> GetAll()
        {
            return _context.Tarjetas.ToList();
        }

        public Tarjeta GetByNum(long num)
        {
            var tarjetas = _context.Tarjetas.ToList();

            var tarjetaEncontrada = tarjetas.FirstOrDefault(t => t.Numero == num);

            return tarjetaEncontrada;

        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
