using ECommerce.WebAPI.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet("getall")]
        public ApiResponse<Users> GetAll()
        {
            IEnumerable<Users> result = Enumerable.Range(1, 5).Select(index => new Users(
                Id: index,
                Name: $"User {index}",
                Email: $"user{index}@hotmail.com",
                CreatedAt: DateTime.Now
            ));
            return new ApiResponse<Users>
            {
                Success = true,
                Data = result.ToList(),
                Message = "Users retrieved successfully."
             }; ;
        }
    }
}
