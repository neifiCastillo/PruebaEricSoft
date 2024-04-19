using back.Dto;
using back.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public ProductsController(AplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var listProduct = await _context.Products.ToListAsync();
                var productDtoList = listProduct.Select(product => new ProductsDto
                {
                    ProductNo = product.ProductNo,
                    ProductName = product.ProductName,
                    Quantity = product.Quantity,
                    Price = product.Price,

                }).ToList();
                return Ok(productDtoList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{ProductNo}")]
        public async Task<IActionResult> PutProducts(int productNo, ProductsDto producto)
        {
            try
            {
                if (productNo != producto.ProductNo)
                {
                    return BadRequest();
                }
                var productItem = await _context.Products.FindAsync(productNo);

                if (productItem == null)
                {
                    return NotFound();
                }
                productItem.Quantity = producto.Quantity;
                productItem.Price = producto.Price;

               await _context.SaveChangesAsync();

               return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
