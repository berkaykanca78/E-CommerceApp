using ECommerce.WebAPI.Entities;
using ECommerce.WebAPI.Models;

namespace ECommerce.WebAPI.Services
{
    public interface ICategoryService
    {
        Task<PaginationModel<Category>> GetPaginatedCategoriesAsync(int pageNumber, int pageSize);
    }
} 