using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ECommerce.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                schema: "ECommerce",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                schema: "ECommerce",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Categories",
                schema: "ECommerce",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.InsertData(
                schema: "ECommerce",
                table: "Categories",
                columns: new[] { "Id", "CreatedDate", "Description", "IsActive", "Name", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Electronic devices and gadgets", true, "Electronics", null },
                    { 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Computers and accessories", true, "Computers", null },
                    { 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Audio devices and accessories", true, "Audio", null },
                    { 4, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gaming consoles and accessories", true, "Gaming", null },
                    { 5, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Clothing and fashion accessories", true, "Fashion", null },
                    { 6, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Home and garden products", true, "Home & Garden", null },
                    { 7, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Cameras and photography equipment", true, "Cameras", null }
                });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 1, "https://www.buseterim.com.tr/upload/default/2023/9/13/680.png" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 1, "https://images.samsung.com/is/image/samsung/assets/tr/smartphones/galaxy-s24-ultra/buy/01_S24Ultra-Group-KV_MO_0527_final.jpg?imbypass=true" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 2, "https://www.notebookcheck-tr.com/fileadmin/_processed_/a/3/csm_IMG_1008_47c6b245b1.jpg" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 3, "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 4, "https://cdn03.ciceksepeti.com/cicek/kcm69709524-1/XL/sony-playstation-5-slim-cdli-2.-pembedualsense-oyun-konsolu-kcm69709524-1-ebf5b4b58f924c3596c35c40ce35c862.jpg" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 5, "https://cdn03.ciceksepeti.com/cicek/kcm21428437-1/XL/nike-air-max-270-g.-s.-white-pink-sneaker-gunluk-spor-ayakkabi-beyaz-pembe-kcm21428437-2-5c72511cbf2e4a31bb3edee4d9f699cb.jpg" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 1, "https://images.samsung.com/is/image/samsung/p6pim/tr/qe55q60dauxtk/gallery/tr-qled-q60d-504767-qe55q60dauxtk-541172747?$684_547_PNG$" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 3, "https://static.ticimax.cloud/79/uploads/urunresimleri/buyuk/bose-quietcomfort-45-beyaz-gurultu-onl-2624-8.jpg" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 5, "https://lsco.scene7.com/is/image/lsco/005010114-front-pdp" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 6, "https://cdn.dsmcdn.com/ty1579/prod/QC/20241004/11/29ae1021-584f-3599-8dec-ddeccf7a0efc/1_org_zoom.jpg" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 7, "https://i1.adis.ws/i/canon/09_frontback-pro_0c048afdc81c488eb9e5592f9cccc06e" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "CategoryId", "ImageUrl" },
                values: new object[] { 5, "https://cdn.modalite.net/img/bf/2f/bf2fa929-2d11-aeac-6a5d-ecbc9e83ea55.jpg" });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                schema: "ECommerce",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                schema: "ECommerce",
                table: "Products",
                column: "CategoryId",
                principalSchema: "ECommerce",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                schema: "ECommerce",
                table: "Products");

            migrationBuilder.DropTable(
                name: "Categories",
                schema: "ECommerce");

            migrationBuilder.DropIndex(
                name: "IX_Products_CategoryId",
                schema: "ECommerce",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                schema: "ECommerce",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                schema: "ECommerce",
                table: "Products",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Electronics", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Electronics", "https://www.walmart.com/blocked?url=L2lwL1Zlcml6b24tU2Ftc3VuZy1HYWxheHktUzI0LVVsdHJhLVRpdGFuaXVtLUJsYWNrLTI1NkdCLzUzMzAxMjQ4NzY=&uuid=5f0fcf1a-48a1-11f0-99d1-cc61e3098599&vid=&g=b" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Computers", "https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Audio", "https://www.bare-cases.com/products/the-bare-case-for-iphone-15-pro-max" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Gaming", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Fashion", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Electronics", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Audio", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Fashion", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Home & Garden", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Cameras", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R" });

            migrationBuilder.UpdateData(
                schema: "ECommerce",
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "Category", "ImageUrl" },
                values: new object[] { "Fashion", "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R" });
        }
    }
}
