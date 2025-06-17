using ECommerce.WebAPI.Data;
using ECommerce.WebAPI.Entities;
using ECommerce.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.WebAPI.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ECommerceDbContext _context;

        public CategoryService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<PaginationModel<Category>> GetPaginatedCategoriesAsync(int pageNumber, int pageSize)
        {
            var totalItems = await _context.Categories.CountAsync();
            var items = await _context.Categories
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginationModel<Category>
            {
                Items = items,
                TotalItems = totalItems,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize)
            };
        }
    }
} 