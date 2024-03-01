using CajeroAutomaticoAPI.Data.Models;
using CajeroAutomaticoAPI.Data.Repositories;
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
        public async Task<IActionResult> AddOperation(Operacion operacion)
        {
            try
            {
                var response = await _operacionRepository.AddOperationAsync(operacion);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al buscar la tarjeta: {ex.Message}");
            }
        }

    }
}
