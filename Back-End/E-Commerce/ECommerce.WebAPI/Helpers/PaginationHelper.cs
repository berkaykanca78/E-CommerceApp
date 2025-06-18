using ECommerce.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.WebAPI.Helpers
{
    public static class PaginationHelper
    {
        public static async Task<PaginatedResult<T>> CreatePaginatedResult<T>(
            IQueryable<T> query,
            int page,
            int pageSize)
        {
            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PaginatedResult<T>
            {
                Items = items,
                TotalItems = totalItems,
                TotalPages = totalPages,
                CurrentPage = page,
                PageSize = pageSize,
                HasNextPage = page < totalPages,
                HasPreviousPage = page > 1
            };
        }
    }
} 