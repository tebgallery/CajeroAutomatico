using System;
using System.Collections.Generic;

namespace CajeroAutomaticoAPI.Models;

public partial class Tarjeta
{
    public int IdTarjeta { get; set; }

    public long Numero { get; set; }

    public int Pin { get; set; }

    public bool Bloqueada { get; set; }

    public decimal Balance { get; set; }

    public DateOnly FechaVencimiento { get; set; }
}
