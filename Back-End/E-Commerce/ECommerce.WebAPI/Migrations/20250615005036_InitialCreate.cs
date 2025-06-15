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
                    { 1, "Electronics", new DateTime(2024, 1, 15, 10, 0, 0, 0, DateTimeKind.Unspecified), "Apple iPhone 15 Pro 256GB Titanium Blue", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R", true, "iPhone 15 Pro", 45999.99m, 50, null },
                    { 2, "Electronics", new DateTime(2024, 1, 16, 14, 30, 0, 0, DateTimeKind.Unspecified), "Samsung Galaxy S24 Ultra 512GB Phantom Black", "https://www.walmart.com/blocked?url=L2lwL1Zlcml6b24tU2Ftc3VuZy1HYWxheHktUzI0LVVsdHJhLVRpdGFuaXVtLUJsYWNrLTI1NkdCLzUzMzAxMjQ4NzY=&uuid=5f0fcf1a-48a1-11f0-99d1-cc61e3098599&vid=&g=b", true, "Samsung Galaxy S24 Ultra", 42999.99m, 30, null },
                    { 3, "Computers", new DateTime(2024, 1, 17, 9, 15, 0, 0, DateTimeKind.Unspecified), "Apple MacBook Pro 14-inch M3 16GB RAM 512GB SSD", "https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/", true, "MacBook Pro M3", 69999.99m, 15, null },
                    { 4, "Audio", new DateTime(2024, 1, 18, 11, 45, 0, 0, DateTimeKind.Unspecified), "Apple AirPods Pro 2nd Generation with MagSafe Case", "https://www.bare-cases.com/products/the-bare-case-for-iphone-15-pro-max", true, "AirPods Pro 2", 8999.99m, 100, null },
                    { 5, "Gaming", new DateTime(2024, 1, 19, 16, 20, 0, 0, DateTimeKind.Unspecified), "Sony PlayStation 5 Console with DualSense Controller", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R", true, "Sony PlayStation 5", 18999.99m, 25, null },
                    { 6, "Fashion", new DateTime(2024, 1, 20, 13, 10, 0, 0, DateTimeKind.Unspecified), "Nike Air Max 270 Erkek Spor Ayakkabı - Siyah/Beyaz", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R", true, "Nike Air Max 270", 3499.99m, 75, null },
                    { 7, "Electronics", new DateTime(2024, 1, 21, 8, 30, 0, 0, DateTimeKind.Unspecified), "Samsung 55-inch QLED 4K Smart TV QE55Q70C", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R", true, "Samsung 55\" QLED TV", 24999.99m, 12, null },
                    { 8, "Audio", new DateTime(2024, 1, 22, 15, 0, 0, 0, DateTimeKind.Unspecified), "Bose QuietComfort 45 Kablosuz Gürültü Önleyici Kulaklık", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R", true, "Bose QuietComfort 45", 12999.99m, 40, null },
                    { 9, "Fashion", new DateTime(2024, 1, 23, 12, 0, 0, 0, DateTimeKind.Unspecified), "Levi's 501 Original Straight Fit Erkek Jean Pantolon", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R", true, "Levi's 501 Original Jeans", 1299.99m, 200, null },
                    { 10, "Home & Garden", new DateTime(2024, 1, 24, 10, 30, 0, 0, DateTimeKind.Unspecified), "Dyson V15 Detect Kablosuz Süpürge - Lazer Teknolojisi", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R", true, "Dyson V15 Detect", 15999.99m, 8, null },
                    { 11, "Cameras", new DateTime(2024, 1, 25, 14, 15, 0, 0, DateTimeKind.Unspecified), "Canon EOS R6 Mark II Aynasız Fotoğraf Makinesi Body", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R", true, "Canon EOS R6 Mark II", 89999.99m, 5, null },
                    { 12, "Fashion", new DateTime(2024, 1, 26, 9, 45, 0, 0, DateTimeKind.Unspecified), "Adidas Ultraboost 23 Erkek Koşu Ayakkabısı - Beyaz", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R", true, "Adidas Ultraboost 23", 4999.99m, 60, null }
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
