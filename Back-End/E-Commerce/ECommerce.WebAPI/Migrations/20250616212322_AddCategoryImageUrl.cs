using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerce.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                schema: "ECommerce",
                table: "Categories",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000");

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000");

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1000");

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000");

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000");

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageUrl",
                value: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000");

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7,
                column: "ImageUrl",
                value: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                schema: "ECommerce",
                table: "Categories");
        }
    }
}
