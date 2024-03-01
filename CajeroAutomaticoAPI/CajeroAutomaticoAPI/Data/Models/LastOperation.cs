namespace CajeroAutomaticoAPI.Data.Models
{
    public class LastOperation
    {
        public int Id_Tarjeta { get; set; }
        public long Numero { get; set; }
        public decimal CantidadRetirada { get; set; }
        public decimal Balance { get; set; }

        public DateTime FechaHora { get; set; }
    }
}
