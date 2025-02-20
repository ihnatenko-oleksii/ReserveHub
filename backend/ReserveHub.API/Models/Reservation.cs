namespace ReserveHub.API.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string ServiceName { get; set; }
        public DateTime ReservationDate { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
} 