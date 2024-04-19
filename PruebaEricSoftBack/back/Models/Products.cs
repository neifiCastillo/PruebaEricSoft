using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace back.Models
{
    public class Products
    {
         [Key]
         public int ProductNo { get; set; }
         public string? ProductName { get; set; }
         public int Quantity { get; set; }
         public int Price { get; set; }
         public DateTime FechaCreacion { get; set; }

    }
}
