using ECommerce.WebAPI.Entities;
using ECommerce.WebAPI.Models;

namespace ECommerce.WebAPI.Services
{
    public interface IProductService
    {
        Task<PaginationModel<Product>> GetPaginatedProductsAsync(int pageNumber, int pageSize, string? searchTerm = null);
        Task<List<Product>> SearchProductsAsync(string query);
        Task<Product> GetProductAsync(int id);
    }
} 