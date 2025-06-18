using ECommerce.WebAPI.Data;
using ECommerce.WebAPI.Entities;
using ECommerce.WebAPI.Helpers;
using ECommerce.WebAPI.Models;
using ECommerce.WebAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.WebAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly ECommerceDbContext _context;

        public ProductService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<PaginatedResult<ProductDto>> GetProductsAsync(int page, int pageSize, string searchTerm = "")
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Where(p => p.IsActive);

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(p => 
                    p.Name.Contains(searchTerm) || 
                    p.Description.Contains(searchTerm));
            }

            query = query.OrderByDescending(p => p.CreatedDate);

            var paginatedQuery = query.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Stock = p.Stock,
                CategoryId = p.CategoryId,
                Category = p.Category != null ? new CategoryDto
                {
                    Id = p.Category.Id,
                    Name = p.Category.Name,
                    Description = p.Category.Description
                } : null,
                ImageUrl = p.ImageUrl,
                IsActive = p.IsActive,
                CreatedDate = p.CreatedDate,
                UpdatedDate = p.UpdatedDate
            });

            return await PaginationHelper.CreatePaginatedResult(paginatedQuery, page, pageSize);
        }

        public async Task<PaginatedResult<ProductDto>> GetProductsByCategoryAsync(int categoryId, int page, int pageSize)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Where(p => p.CategoryId == categoryId && p.IsActive);

            var paginatedQuery = query.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Stock = p.Stock,
                CategoryId = p.CategoryId,
                Category = p.Category != null ? new CategoryDto
                {
                    Id = p.Category.Id,
                    Name = p.Category.Name,
                    Description = p.Category.Description
                } : null,
                ImageUrl = p.ImageUrl,
                IsActive = p.IsActive,
                CreatedDate = p.CreatedDate,
                UpdatedDate = p.UpdatedDate
            });

            return await PaginationHelper.CreatePaginatedResult(paginatedQuery, page, pageSize);
        }

        public async Task<List<Product>> SearchProductsAsync(string query)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Where(p => p.IsActive && 
                    (p.Name.Contains(query) || p.Description.Contains(query)))
                .ToListAsync();
        }

        public async Task<Product> GetProductAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
        }
    }
} 