using Azure;
using CajeroAutomaticoAPI.Data.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Runtime;

namespace CajeroAutomaticoAPI.Data.Repositories
{
    public interface ITarjetaRepository
    {
        Task<TarjetaResponse> ValidateTarjetaAsync(long num, int? pin);

        Task<TarjetaResponse> GetTarjetaByIdAsync(int id);

        Task<TarjetaResponse> UpdateIntentosAsync(int id, int intentos);

        Task<TarjetaResponse> UpdateBalanceAsync(int id, decimal amount);

        Task<IEnumerable<LastOperation>> GetLastOperationAsync(int idTarjeta);

        Task SaveChangesAsync();
    }
    public class TarjetaRepository : ITarjetaRepository
    {
        private readonly CajeroAutomaticoDbContext _context;

        public TarjetaRepository(CajeroAutomaticoDbContext context)
        {
            _context = context;
        }

        public async Task<TarjetaResponse> ValidateTarjetaAsync(long num, int? pin)
        {
            TarjetaResponse response = new TarjetaResponse();

            var tarjeta = await _context.Tarjetas.FirstOrDefaultAsync(t => t.Numero == num);

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
                response.Id = tarjeta.IdTarjeta;
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

        public async Task<TarjetaResponse> GetTarjetaByIdAsync(int id)
        {
            var response = new TarjetaResponse();

            var tarjeta = await _context.Tarjetas
                .Where(t => t.IdTarjeta == id)
                .Select(t => new
                {
                    t.IdTarjeta,
                    t.Numero,
                    t.FechaVencimiento,
                    t.Balance
                })
                .FirstOrDefaultAsync();

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

        public async Task<TarjetaResponse> UpdateIntentosAsync(int id, int intentos)
        {
            var response = new TarjetaResponse();
            var tarjeta = await _context.Tarjetas.FindAsync(id);
            if (tarjeta != null)
            {
                if (!tarjeta.Bloqueada)
                {
                    if (intentos != 0)
                    {
                        tarjeta.Intentos = intentos;
                        response.status.Code = 0;
                        response.status.Message = $"Pin Incorrecto, le quedan {intentos} intentos";
                    }
                    else
                    {
                        tarjeta.Intentos = intentos;
                        tarjeta.Bloqueada = true;

                        response.status.Code = 1;
                        response.status.Message = "La tarjeta se bloqueó debido a muchos intentos fallidos";

                    }
                }
                else
                 {
                     response.status.Code = 2;
                     response.status.Message = "La tarjeta se encuentra bloqueada";
                }
            }
            else
            {
                response.status.Code = 3;
                response.status.Message = "No se encontró la tarjeta";
            }
            _context.SaveChanges();

            return response;
        }

        public async Task<TarjetaResponse> UpdateBalanceAsync(int id, decimal amount)
        {
            TarjetaResponse response = new TarjetaResponse();
            var tarjeta = await _context.Tarjetas.FindAsync(id);
            if (tarjeta != null)
            {
                if (amount <= tarjeta.Balance)
                {
                    tarjeta.Balance -= amount;
                    _context.SaveChanges();
                    response.status = new Status { Message = "Saldo de la tarjeta Actualizado", Code = 0 };
                }
                else
                {
                    response.status = new Status { Message = "El monto del retiro excede el saldo disponible", Code = 1 };
                }
            }
            else
            {
                response.status = new Status { Message = "No se encontró la tarjeta", Code = 1 };
            }
            return response;
        }

        public async Task<IEnumerable<LastOperation>> GetLastOperationAsync(int idTarjeta)
        {
            var id = new SqlParameter("@CardId", idTarjeta);
            var response = await _context.LastOperation
                .FromSqlRaw("EXEC sp_ObtenerUltimaOperacion @CardId", id).ToListAsync();

            return response;
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
