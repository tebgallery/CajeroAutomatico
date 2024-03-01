using CajeroAutomaticoAPI.Data.Models;
using CajeroAutomaticoAPI.Data.Repositories;
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
            public async Task<IActionResult> ValidateTarjeta(long numero, int? pin)
            {
                try
                {
                    var response = await _tarjetaRepository.ValidateTarjetaAsync(numero, pin);
                    return Ok(response);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = $"Ocurrió un error al validar la tarjeta: {ex.Message}" });
                }
            }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetTarjetaById(int id)
        {
            try
            {
                var response = await _tarjetaRepository.GetTarjetaByIdAsync(id);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al buscar la tarjeta: {ex.Message}");
            }
        }

        [HttpPut("UpdateIntentos/{id}")]
        public async Task<IActionResult> UpdateIntentos(int id,int intentos)
        {

            try
            {
                if (intentos >= 0 && intentos <= 4) {
                    var response = await _tarjetaRepository.UpdateIntentosAsync(id, intentos);
                    return Ok(response);
                }
                else
                {
                    return BadRequest("Intentos Invalidos");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar los intentos y bloquear la tarjeta: {ex.Message}");
            }
        }

        [HttpPut("UpdateBalance/{id}")]
        public async Task<IActionResult> UpdateBalance(int id,decimal amount)
        {
            try
            {
                var response = await _tarjetaRepository.UpdateBalanceAsync(id, amount);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error al actualizar el estado de bloqueo de la tarjeta: {ex.Message}" });
            }
        }

        [HttpGet("UltimaOperacion/{idTarjeta}")]
        public async Task<IActionResult> GetLastOperation(int idTarjeta)
        {
            var lastOperation = await _tarjetaRepository.GetLastOperationAsync(idTarjeta);
            if (lastOperation.Count() == 0)
            {
                return NotFound();
            }

            return Ok(lastOperation);
        }
    }
}
