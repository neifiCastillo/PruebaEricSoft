using Microsoft.EntityFrameworkCore;

namespace back.Models
{
    public class AplicationDbContext: DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Products> Products { get; set; }
    }
}
