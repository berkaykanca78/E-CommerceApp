using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ECommerce.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "ECommerce");

            migrationBuilder.CreateTable(
                name: "Products",
                schema: "ECommerce",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                schema: "ECommerce",
                table: "Products",
                columns: new[] { "Id", "Category", "CreatedDate", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, "Electronics", new DateTime(2024, 1, 15, 10, 0, 0, 0, DateTimeKind.Unspecified), "Apple iPhone 15 Pro 256GB Titanium Blue", "https://example.com/images/iphone15pro.jpg", true, "iPhone 15 Pro", 45999.99m, 50, null },
                    { 2, "Electronics", new DateTime(2024, 1, 16, 14, 30, 0, 0, DateTimeKind.Unspecified), "Samsung Galaxy S24 Ultra 512GB Phantom Black", "https://example.com/images/galaxys24ultra.jpg", true, "Samsung Galaxy S24 Ultra", 42999.99m, 30, null },
                    { 3, "Computers", new DateTime(2024, 1, 17, 9, 15, 0, 0, DateTimeKind.Unspecified), "Apple MacBook Pro 14-inch M3 16GB RAM 512GB SSD", "https://example.com/images/macbookprom3.jpg", true, "MacBook Pro M3", 69999.99m, 15, null },
                    { 4, "Audio", new DateTime(2024, 1, 18, 11, 45, 0, 0, DateTimeKind.Unspecified), "Apple AirPods Pro 2nd Generation with MagSafe Case", "https://example.com/images/airpodspro2.jpg", true, "AirPods Pro 2", 8999.99m, 100, null },
                    { 5, "Gaming", new DateTime(2024, 1, 19, 16, 20, 0, 0, DateTimeKind.Unspecified), "Sony PlayStation 5 Console with DualSense Controller", "https://example.com/images/ps5.jpg", true, "Sony PlayStation 5", 18999.99m, 25, null },
                    { 6, "Fashion", new DateTime(2024, 1, 20, 13, 10, 0, 0, DateTimeKind.Unspecified), "Nike Air Max 270 Erkek Spor Ayakkabı - Siyah/Beyaz", "https://example.com/images/nikeairmax270.jpg", true, "Nike Air Max 270", 3499.99m, 75, null },
                    { 7, "Electronics", new DateTime(2024, 1, 21, 8, 30, 0, 0, DateTimeKind.Unspecified), "Samsung 55-inch QLED 4K Smart TV QE55Q70C", "https://example.com/images/samsungqledtv.jpg", true, "Samsung 55\" QLED TV", 24999.99m, 12, null },
                    { 8, "Audio", new DateTime(2024, 1, 22, 15, 0, 0, 0, DateTimeKind.Unspecified), "Bose QuietComfort 45 Kablosuz Gürültü Önleyici Kulaklık", "https://example.com/images/bosequietcomfort45.jpg", true, "Bose QuietComfort 45", 12999.99m, 40, null },
                    { 9, "Fashion", new DateTime(2024, 1, 23, 12, 0, 0, 0, DateTimeKind.Unspecified), "Levi's 501 Original Straight Fit Erkek Jean Pantolon", "https://example.com/images/levis501.jpg", true, "Levi's 501 Original Jeans", 1299.99m, 200, null },
                    { 10, "Home & Garden", new DateTime(2024, 1, 24, 10, 30, 0, 0, DateTimeKind.Unspecified), "Dyson V15 Detect Kablosuz Süpürge - Lazer Teknolojisi", "https://example.com/images/dysonv15.jpg", true, "Dyson V15 Detect", 15999.99m, 8, null },
                    { 11, "Cameras", new DateTime(2024, 1, 25, 14, 15, 0, 0, DateTimeKind.Unspecified), "Canon EOS R6 Mark II Aynasız Fotoğraf Makinesi Body", "https://example.com/images/canoneosr6.jpg", true, "Canon EOS R6 Mark II", 89999.99m, 5, null },
                    { 12, "Fashion", new DateTime(2024, 1, 26, 9, 45, 0, 0, DateTimeKind.Unspecified), "Adidas Ultraboost 23 Erkek Koşu Ayakkabısı - Beyaz", "https://example.com/images/adidasultraboost.jpg", true, "Adidas Ultraboost 23", 4999.99m, 60, null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products",
                schema: "ECommerce");
        }
    }
}
