using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CajeroAutomaticoAPI.Data.Models;

public class Operacion
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID_Operacion { get; set; }

    [Required]
    public int ID_Tarjeta { get; set; }

    [Required]
    public DateTime FechaHora { get; set; }

    [Required]
    public int CodigoOperacion { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal CantidadRetirada { get; set; }

}
