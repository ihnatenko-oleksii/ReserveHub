using Microsoft.EntityFrameworkCore;
using ReserveHub.API.Models;

namespace ReserveHub.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Reservation> Reservations { get; set; }
    }
} 