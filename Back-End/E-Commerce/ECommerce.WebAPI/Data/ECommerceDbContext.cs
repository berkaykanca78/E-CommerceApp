using ECommerce.WebAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.WebAPI.Data
{
    public class ECommerceDbContext : DbContext
    {
        public ECommerceDbContext(DbContextOptions<ECommerceDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ECommerce schema'sını varsayılan olarak ayarla
            modelBuilder.HasDefaultSchema("ECommerce");

            // Product entity konfigürasyonu
            modelBuilder.Entity<Product>(entity =>
            {     
                // Tablo ismini açıkça belirle (çoğul)
                entity.ToTable("Products", "ECommerce");
                
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();
                
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);
                
                entity.Property(e => e.Description)
                    .HasMaxLength(1000);
                
                entity.Property(e => e.Price)
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");
                
                entity.Property(e => e.Stock)
                    .IsRequired();
                
                entity.Property(e => e.Category)
                    .HasMaxLength(100);
                
                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(500);
                
                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValue(true);
                
                entity.Property(e => e.CreatedDate)
                    .IsRequired()
                    .HasDefaultValueSql("GETDATE()");
                
                entity.Property(e => e.UpdatedDate);

                // Seed Data
                entity.HasData(
                    new Product
                    {
                        Id = 1,
                        Name = "iPhone 15 Pro",
                        Description = "Apple iPhone 15 Pro 256GB Titanium Blue",
                        Price = 45999.99m,
                        Stock = 50,
                        Category = "Electronics",
                        ImageUrl = "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 15, 10, 0, 0)
                    },
                    new Product
                    {
                        Id = 2,
                        Name = "Samsung Galaxy S24 Ultra",
                        Description = "Samsung Galaxy S24 Ultra 512GB Phantom Black",
                        Price = 42999.99m,
                        Stock = 30,
                        Category = "Electronics",
                        ImageUrl = "https://www.walmart.com/blocked?url=L2lwL1Zlcml6b24tU2Ftc3VuZy1HYWxheHktUzI0LVVsdHJhLVRpdGFuaXVtLUJsYWNrLTI1NkdCLzUzMzAxMjQ4NzY=&uuid=5f0fcf1a-48a1-11f0-99d1-cc61e3098599&vid=&g=b",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 16, 14, 30, 0)
                    },
                    new Product
                    {
                        Id = 3,
                        Name = "MacBook Pro M3",
                        Description = "Apple MacBook Pro 14-inch M3 16GB RAM 512GB SSD",
                        Price = 69999.99m,
                        Stock = 15,
                        Category = "Computers",
                        ImageUrl = "https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 17, 9, 15, 0)
                    },
                    new Product
                    {
                        Id = 4,
                        Name = "AirPods Pro 2",
                        Description = "Apple AirPods Pro 2nd Generation with MagSafe Case",
                        Price = 8999.99m,
                        Stock = 100,
                        Category = "Audio",
                        ImageUrl = "https://www.bare-cases.com/products/the-bare-case-for-iphone-15-pro-max",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 18, 11, 45, 0)
                    },
                    new Product
                    {
                        Id = 5,
                        Name = "Sony PlayStation 5",
                        Description = "Sony PlayStation 5 Console with DualSense Controller",
                        Price = 18999.99m,
                        Stock = 25,
                        Category = "Gaming",
                        ImageUrl = "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 19, 16, 20, 0)
                    },
                    new Product
                    {
                        Id = 6,
                        Name = "Nike Air Max 270",
                        Description = "Nike Air Max 270 Erkek Spor Ayakkabı - Siyah/Beyaz",
                        Price = 3499.99m,
                        Stock = 75,
                        Category = "Fashion",
                        ImageUrl = "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 20, 13, 10, 0)
                    },
                    new Product
                    {
                        Id = 7,
                        Name = "Samsung 55\" QLED TV",
                        Description = "Samsung 55-inch QLED 4K Smart TV QE55Q70C",
                        Price = 24999.99m,
                        Stock = 12,
                        Category = "Electronics",
                        ImageUrl = "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 21, 8, 30, 0)
                    },
                    new Product
                    {
                        Id = 8,
                        Name = "Bose QuietComfort 45",
                        Description = "Bose QuietComfort 45 Kablosuz Gürültü Önleyici Kulaklık",
                        Price = 12999.99m,
                        Stock = 40,
                        Category = "Audio",
                        ImageUrl = "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 22, 15, 0, 0)
                    },
                    new Product
                    {
                        Id = 9,
                        Name = "Levi's 501 Original Jeans",
                        Description = "Levi's 501 Original Straight Fit Erkek Jean Pantolon",
                        Price = 1299.99m,
                        Stock = 200,
                        Category = "Fashion",
                        ImageUrl = "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 23, 12, 0, 0)
                    },
                    new Product
                    {
                        Id = 10,
                        Name = "Dyson V15 Detect",
                        Description = "Dyson V15 Detect Kablosuz Süpürge - Lazer Teknolojisi",
                        Price = 15999.99m,
                        Stock = 8,
                        Category = "Home & Garden",
                        ImageUrl = "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 24, 10, 30, 0)
                    },
                    new Product
                    {
                        Id = 11,
                        Name = "Canon EOS R6 Mark II",
                        Description = "Canon EOS R6 Mark II Aynasız Fotoğraf Makinesi Body",
                        Price = 89999.99m,
                        Stock = 5,
                        Category = "Cameras",
                        ImageUrl = "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 25, 14, 15, 0)
                    },
                    new Product
                    {
                        Id = 12,
                        Name = "Adidas Ultraboost 23",
                        Description = "Adidas Ultraboost 23 Erkek Koşu Ayakkabısı - Beyaz",
                        Price = 4999.99m,
                        Stock = 60,
                        Category = "Fashion",
                        ImageUrl = "https://www.amazon.com/Apple-iPhone-15-Pro-Titanium/dp/B0CMYXFK3R",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 26, 9, 45, 0)
                    }
                );

            });
        }
    }
} 