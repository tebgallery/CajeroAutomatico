using CajeroAutomaticoAPI.Models;
using CajeroAutomaticoAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CajeroAutomaticoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperacionesController : ControllerBase
    {
        private readonly IOperacionRepository _operacionRepository;

        public OperacionesController(IOperacionRepository operacionRepository)
        {
            _operacionRepository = operacionRepository;
        }

        [HttpPost]
        public IActionResult AddOperation(Operacion operacion)
        {
            try
            {
                OperacionResponse response = _operacionRepository.AddOperation(operacion);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al buscar la tarjeta: {ex.Message}");
            }
        }

    }
}
