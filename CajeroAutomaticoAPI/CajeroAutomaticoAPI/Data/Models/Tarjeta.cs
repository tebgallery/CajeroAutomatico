using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CajeroAutomaticoAPI.Data.Models;

public class Tarjeta
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ID_Tarjeta { get; set; }

    [Required]
    public long Numero { get; set; }

    [Required]
    public int PIN { get; set; }

    public bool Bloqueada { get; set; } = false;

    [Range(0, 4)]
    public int Intentos { get; set; } = 4;

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Balance { get; set; }

    [Required]
    public DateOnly FechaVencimiento { get; set; }

    public ICollection<Operacion> Operaciones { get; set; }
}
