namespace ECommerce.WebAPI.Entities
{
    public sealed record Users(
     int Id,
     string Name,
     string Email,
     DateTime? CreatedAt
 );
}
