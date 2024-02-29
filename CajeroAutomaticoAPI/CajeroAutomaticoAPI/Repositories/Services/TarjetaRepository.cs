using Azure;
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

        public TarjetaResponse ValidateTarjeta(long num, int? pin)
        {
            TarjetaResponse response = new TarjetaResponse();

            var tarjeta = _context.Tarjetas.FirstOrDefault(t => t.Numero == num);

            if (tarjeta == null)
            {
                response.status.Message = "La tarjeta no existe";
                response.status.Code = 1;
            }
            else if (tarjeta.Bloqueada)
            {
                response.status.Message = "La tarjeta está bloqueada";
                response.status.Code = 3;
            }
            else if (pin != null && tarjeta.Pin != pin)
            {
                response.status.Message = "PIN incorrecto";
                response.status.Code = 2;
            }
            else
            {
                response.Id = tarjeta.IdTarjeta;
                response.status.Message = "La tarjeta existe";
                response.status.Code = 0;
            }

            return response;
        }

        public TarjetaResponse GetTarjetaById(int id)
        {
            var response = new TarjetaResponse();

            var tarjeta = _context.Tarjetas
                .Where(t => t.IdTarjeta == id)
                .Select(t => new
                {
                    t.IdTarjeta,
                    t.Numero,
                    t.FechaVencimiento,
                    t.Balance
                })
                .FirstOrDefault();

            if (tarjeta == null)
            {
                response.status = new Status { Message = "No se encontró la tarjeta", Code = 1 };
            }
            else
            {
                response.Id = tarjeta.IdTarjeta;
                response.Numero = tarjeta.Numero;
                response.FechaVencimiento = tarjeta.FechaVencimiento;
                response.Balance = tarjeta.Balance;
                response.status = new Status { Message = "Tarjeta encontrada", Code = 0 };
            }

            return response;
        }

        public void UpdateBloqueada(int id, bool bloqueada) 
        {
            var tarjeta = _context.Tarjetas.FirstOrDefault(t => t.IdTarjeta == id);
            if (tarjeta != null)
            {
                tarjeta.Bloqueada = bloqueada;
                _context.SaveChanges();
            }
            else
            {
                throw new ArgumentException($"No se encontró la tarjeta con el ID: {id}");
            }
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
