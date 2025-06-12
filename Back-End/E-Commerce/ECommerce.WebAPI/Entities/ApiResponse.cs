namespace ECommerce.WebAPI.Entities
{
    public class ApiResponse<T> where T : class
    {
        public bool Success { get; set; }
        public List<T> Data { get; set; }
        public string? Message { get; set; }
        public string? Error { get; set; }
    }
}
