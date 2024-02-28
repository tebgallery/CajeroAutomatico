using CajeroAutomaticoAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CajeroAutomaticoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetasController : Controller
    {
        private readonly ITarjetaRepository _tarjetaRepository;

        public TarjetasController(ITarjetaRepository tarjetaRepository)
        {
            _tarjetaRepository = tarjetaRepository;
        }

        [HttpGet("{numero}")]
        public IActionResult GetTarjetasByNum(long numero)
        {
            try
            {
                var tarjeta = _tarjetaRepository.GetByNum(numero);

                if (tarjeta == null)
                {
                    return StatusCode(200,new { message = "No se encontró la tarjeta" });
                }

                if (tarjeta.Bloqueada)
                {
                    return StatusCode(200, new { message = "La tarjeta se encuentra bloqueada" });
                }

                return Ok(tarjeta);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Ocurrió un error al buscar la tarjeta: {ex.Message}" });
            }
        }


    }
}
