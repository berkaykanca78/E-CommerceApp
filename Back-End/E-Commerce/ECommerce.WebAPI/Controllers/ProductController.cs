using ECommerce.WebAPI.Data;
using ECommerce.WebAPI.Entities;
using ECommerce.WebAPI.Models;
using ECommerce.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ECommerceDbContext _context;
        private readonly IProductService _productService;

        public ProductController(ECommerceDbContext context, IProductService productService)
        {
            _context = context;
            _productService = productService;
        }

        // GET: api/Product/search?query=keyword
        [HttpGet("search")]
        public async Task<ActionResult<ApiResponse<List<Product>>>> Search([FromQuery] string? query)
        {
            try
            {
                var products = await _productService.SearchProductsAsync(query ?? string.Empty);
                return Ok(new ApiResponse<List<Product>>
                {
                    Success = true,
                    Data = products,
                    Message = "Products retrieved successfully."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<List<Product>>
                {
                    Success = false,
                    Error = "An error occurred while searching products: " + ex.Message
                });
            }
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<PaginationModel<Product>>> GetProducts(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 4,
            [FromQuery] string? searchTerm = null)
        {
            PaginationModel<Product> result = await _productService.GetPaginatedProductsAsync(pageNumber, pageSize, searchTerm);
            return Ok(result);
        }

        // GET: api/Product/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            Product result = await _productService.GetProductAsync(id);
            return Ok(result);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            product.CreatedDate = DateTime.Now;
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // PUT: api/Product/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            product.UpdatedDate = DateTime.Now;
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Product/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            // Soft delete - sadece IsActive'i false yap
            product.IsActive = false;
            product.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
} 