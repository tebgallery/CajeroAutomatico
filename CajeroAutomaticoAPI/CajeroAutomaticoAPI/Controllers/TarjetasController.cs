using CajeroAutomaticoAPI.Models;
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
        public IActionResult ValidateTarjeta(long numero, int? pin)
        {
            try
            {
                TarjetaResponse response = _tarjetaRepository.ValidateTarjeta(numero, pin);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Ocurrió un error al validar la tarjeta: {ex.Message}" });
            }
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetTarjetaById(int id)
        {
            try
            {
                TarjetaResponse response = _tarjetaRepository.GetTarjetaById(id);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al buscar la tarjeta: {ex.Message}");
            }
        }


        [HttpPut("Bloquear/{id}")]
        public IActionResult BloquearTarjeta(int id)
        {
            try
            {
                _tarjetaRepository.UpdateBloqueada(id, true); // Cambio en la llamada al repositorio
                return Ok(new { message = "La tarjeta ha sido bloqueada exitosamente" });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Ocurrió un error al bloquear la tarjeta: {ex.Message}" });
            }
        }

    }
}
