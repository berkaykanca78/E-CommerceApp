using ECommerce.WebAPI.Entities;
using ECommerce.WebAPI.Models;

namespace ECommerce.WebAPI.Services
{
    public interface IProductService
    {
        Task<PaginationModel<Product>> GetPaginatedProductsAsync(int pageNumber, int pageSize, string? searchTerm = null);
    }
} 