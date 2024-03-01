using System;
using System.Collections.Generic;

namespace CajeroAutomaticoAPI.Data.Models;

public partial class Operacion
{
    public int IdOperacion { get; set; }

    public int IdTarjeta { get; set; }

    public DateTime FechaHora { get; set; }

    public int CodigoOperacion { get; set; }

    public decimal CantidadRetirada { get; set; }
}
