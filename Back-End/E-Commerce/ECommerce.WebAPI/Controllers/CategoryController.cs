using ECommerce.WebAPI.Entities;
using ECommerce.WebAPI.Models;
using ECommerce.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<PaginationModel<Category>>> GetCategories(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 4)
        {
            var result = await _categoryService.GetPaginatedCategoriesAsync(pageNumber, pageSize);
            return Ok(result);
        }
    }
} 