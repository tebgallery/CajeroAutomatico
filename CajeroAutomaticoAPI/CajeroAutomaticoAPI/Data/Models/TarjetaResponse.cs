namespace CajeroAutomaticoAPI.Data.Models
{
    public class TarjetaResponse
    {
        public int? Id { get; set; }
        public long? Numero { get; set; }
        public DateOnly? FechaVencimiento { get; set; }
        public decimal? Balance { get; set; }
        public Status status { get; set; } = new Status();
    }

    public class Status
    {
        public string Message { get; set; }
        public int Code { get; set; }
    }
}
