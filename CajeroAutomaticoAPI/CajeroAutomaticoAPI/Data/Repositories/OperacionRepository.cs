using CajeroAutomaticoAPI.Data.DB;
using CajeroAutomaticoAPI.Data.Models;
using System.Runtime.CompilerServices;

namespace CajeroAutomaticoAPI.Data.Repositories
{
    public interface IOperacionRepository
    {
        Task<OperacionResponse> AddOperationAsync(Operacion operacion);
        Task SaveChangesAsync();
    }
    public class OperacionRepository : IOperacionRepository
    {
        private readonly CajeroAutomaticoDbContext _context;
        private readonly ITarjetaRepository _tarjetaRepository;

        public OperacionRepository(CajeroAutomaticoDbContext context, ITarjetaRepository tarjetaRepository)
        {
            _context = context;
            _tarjetaRepository = tarjetaRepository;
        }

        public async Task<OperacionResponse> AddOperationAsync(Operacion operacion)
        {
            OperacionResponse response = new OperacionResponse();

            var tarjetaResponse = await _tarjetaRepository.GetTarjetaByIdAsync(operacion.ID_Tarjeta);

            if (tarjetaResponse.status.Code == 0){

                if (operacion.CodigoOperacion == 2)
                {

                    if (operacion.CantidadRetirada > tarjetaResponse.Balance)
                    {
                        response.status.Code = 2;
                        response.status.Message = "El monto del retiro excede el saldo disponible";
                    }
                    else
                    {
                            await _tarjetaRepository.UpdateBalanceAsync(operacion.ID_Tarjeta, operacion.CantidadRetirada);
                            response.status.Code = 0;
                            response.status.Message = "Operacion creada correctamente";
                    }
                }
                else
                {
                    response.status.Code = 0;
                    response.status.Message = "Operacion creada correctamente";
                }
            }
            else
            {
                response.status.Code = 1;
                response.status.Message = tarjetaResponse.status.Message;
            }

            if (response.status.Code == 0)
            {
                try
                {
                    _context.Operaciones.Add(operacion);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return response;
        }


        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
