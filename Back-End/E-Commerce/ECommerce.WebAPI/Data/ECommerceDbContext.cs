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
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ECommerce schema'sını varsayılan olarak ayarla
            modelBuilder.HasDefaultSchema("ECommerce");

            // Category entity konfigürasyonu
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Categories", "ECommerce");
                
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();
                
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
                
                entity.Property(e => e.Description)
                    .HasMaxLength(500);
                
                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValue(true);
                
                entity.Property(e => e.CreatedDate)
                    .IsRequired()
                    .HasDefaultValueSql("GETDATE()");
                
                entity.Property(e => e.UpdatedDate);

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(500);

                // Seed Data for Categories
                entity.HasData(
                    new Category
                    {
                        Id = 1,
                        Name = "Electronics",
                        Description = "Electronic devices and gadgets",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 1),
                        ImageUrl = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000"
                    },
                    new Category
                    {
                        Id = 2,
                        Name = "Computers",
                        Description = "Computers and accessories",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 1),
                        ImageUrl = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000"
                    },
                    new Category
                    {
                        Id = 3,
                        Name = "Audio",
                        Description = "Audio devices and accessories",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 1),
                        ImageUrl = "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1000"
                    },
                    new Category
                    {
                        Id = 4,
                        Name = "Gaming",
                        Description = "Gaming consoles and accessories",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 1),
                        ImageUrl = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000"
                    },
                    new Category
                    {
                        Id = 5,
                        Name = "Fashion",
                        Description = "Clothing and fashion accessories",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 1),
                        ImageUrl = "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000"
                    },
                    new Category
                    {
                        Id = 6,
                        Name = "Home & Garden",
                        Description = "Home and garden products",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 1),
                        ImageUrl = "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000"
                    },
                    new Category
                    {
                        Id = 7,
                        Name = "Cameras",
                        Description = "Cameras and photography equipment",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 1),
                        ImageUrl = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000"
                    }
                );
            });

            // Product entity konfigürasyonu
            modelBuilder.Entity<Product>(entity =>
            {     
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
                
                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(500);
                
                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValue(true);
                
                entity.Property(e => e.CreatedDate)
                    .IsRequired()
                    .HasDefaultValueSql("GETDATE()");
                
                entity.Property(e => e.UpdatedDate);

                // Configure relationship with Category
                entity.HasOne(p => p.Category)
                    .WithMany(c => c.Products)
                    .HasForeignKey(p => p.CategoryId)
                    .OnDelete(DeleteBehavior.SetNull);

                // Seed Data
                entity.HasData(
                    new Product
                    {
                        Id = 1,
                        Name = "iPhone 15 Pro",
                        Description = "Apple iPhone 15 Pro 256GB Titanium Blue",
                        Price = 45999.99m,
                        Stock = 50,
                        CategoryId = 1,
                        ImageUrl = "https://www.buseterim.com.tr/upload/default/2023/9/13/680.png",
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
                        CategoryId = 1,
                        ImageUrl = "https://images.samsung.com/is/image/samsung/assets/tr/smartphones/galaxy-s24-ultra/buy/01_S24Ultra-Group-KV_MO_0527_final.jpg?imbypass=true",
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
                        CategoryId = 2,
                        ImageUrl = "https://www.notebookcheck-tr.com/fileadmin/_processed_/a/3/csm_IMG_1008_47c6b245b1.jpg",
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
                        CategoryId = 3,
                        ImageUrl = "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83",
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
                        CategoryId = 4,
                        ImageUrl = "https://cdn03.ciceksepeti.com/cicek/kcm69709524-1/XL/sony-playstation-5-slim-cdli-2.-pembedualsense-oyun-konsolu-kcm69709524-1-ebf5b4b58f924c3596c35c40ce35c862.jpg",
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
                        CategoryId = 5,
                        ImageUrl = "https://cdn03.ciceksepeti.com/cicek/kcm21428437-1/XL/nike-air-max-270-g.-s.-white-pink-sneaker-gunluk-spor-ayakkabi-beyaz-pembe-kcm21428437-2-5c72511cbf2e4a31bb3edee4d9f699cb.jpg",
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
                        CategoryId = 1,
                        ImageUrl = "https://images.samsung.com/is/image/samsung/p6pim/tr/qe55q60dauxtk/gallery/tr-qled-q60d-504767-qe55q60dauxtk-541172747?$684_547_PNG$",
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
                        CategoryId = 3,
                        ImageUrl = "https://static.ticimax.cloud/79/uploads/urunresimleri/buyuk/bose-quietcomfort-45-beyaz-gurultu-onl-2624-8.jpg",
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
                        CategoryId = 5,
                        ImageUrl = "https://lsco.scene7.com/is/image/lsco/005010114-front-pdp",
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
                        CategoryId = 6,
                        ImageUrl = "https://cdn.dsmcdn.com/ty1579/prod/QC/20241004/11/29ae1021-584f-3599-8dec-ddeccf7a0efc/1_org_zoom.jpg",
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
                        CategoryId = 7,
                        ImageUrl = "https://i1.adis.ws/i/canon/09_frontback-pro_0c048afdc81c488eb9e5592f9cccc06e",
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
                        CategoryId = 5,
                        ImageUrl = "https://cdn.modalite.net/img/bf/2f/bf2fa929-2d11-aeac-6a5d-ecbc9e83ea55.jpg",
                        IsActive = true,
                        CreatedDate = new DateTime(2024, 1, 26, 9, 45, 0)
                    }
                );
            });
        }
    }
} 