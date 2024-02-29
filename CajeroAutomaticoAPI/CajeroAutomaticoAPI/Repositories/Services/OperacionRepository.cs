using CajeroAutomaticoAPI.Models;
using CajeroAutomaticoAPI.Repositories.Interfaces;

namespace CajeroAutomaticoAPI.Repositories.Services
{
    public class OperacionRepository : IOperacionRepository
    {
        private readonly CajeroAutomaticoDbContext _context;
        private readonly ITarjetaRepository _tarjetaRepository;

        public OperacionRepository(CajeroAutomaticoDbContext context, ITarjetaRepository tarjetaRepository)
        {
            _context = context;
            _tarjetaRepository = tarjetaRepository;
        }

        public OperacionResponse AddOperation(Operacion operacion)
        {
            OperacionResponse response = new OperacionResponse();

            if (operacion.CodigoOperacion == 2)
            {
                TarjetaResponse tarjetaResponse = _tarjetaRepository.GetTarjetaById(operacion.IdTarjeta);

                if (operacion.CantidadRetirada > tarjetaResponse.Balance)
                {
                    response.status.Code = 1; 
                    response.status.Message = "El monto del retiro excede el saldo disponible";
                }
                else
                {
                    _context.Operaciones.Add(operacion);
                    _context.SaveChanges();

                    response.status.Code = 0;
                    response.status.Message = "Operacion creada correctamente";
                }
            }
            else
            {
                _context.Operaciones.Add(operacion);
                _context.SaveChanges();

                response.status.Code = 0; 
                response.status.Message = "Operacion creada correctamente";
            }
            return response;
        }


        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
