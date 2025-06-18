using ECommerce.WebAPI.Entities;
using ECommerce.WebAPI.Models;
using ECommerce.WebAPI.Models.DTOs;

namespace ECommerce.WebAPI.Services
{
    public interface IProductService
    {
        Task<PaginatedResult<ProductDto>> GetProductsAsync(int page, int pageSize, string searchTerm = "");
        Task<PaginatedResult<ProductDto>> GetProductsByCategoryAsync(int categoryId, int page, int pageSize);
        Task<List<Product>> SearchProductsAsync(string query);
        Task<Product> GetProductAsync(int id);
    }
} 