using ECommerce.WebAPI.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Environment-specific configuration loading
var environment = builder.Environment.EnvironmentName;
builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

Console.WriteLine($"🚀 Application starting in {environment} environment");
Console.WriteLine($"📁 Configuration files: appsettings.json, appsettings.{environment}.json");

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Configure JSON serialization to use camelCase naming policy
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.WriteIndented = builder.Environment.IsDevelopment();
    });

// Entity Framework DbContext - Environment-specific connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($"🔗 Database connection: {(string.IsNullOrEmpty(connectionString) ? "❌ NOT CONFIGURED" : "✅ Configured")}");

builder.Services.AddDbContext<ECommerceDbContext>(options =>
{
    options.UseSqlServer(connectionString,
        sqlOptions => sqlOptions.MigrationsHistoryTable("__EFMigrationsHistory", "ECommerce"));
    
    // Development-specific Entity Framework settings
    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging();
        options.EnableDetailedErrors();
        options.LogTo(Console.WriteLine, LogLevel.Information);
    }
});

// CORS configuration - Environment-specific origins
var corsOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() 
    ?? new[] { "http://localhost:4200" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins(corsOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

Console.WriteLine($"🌐 CORS Origins: {string.Join(", ", corsOrigins)}");

// OpenAPI / Swagger - Only in Development
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    Console.WriteLine("🔧 Development mode: Enabling detailed error pages and API documentation");
    
    app.UseDeveloperExceptionPage();
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options
            .WithTitle("ECommerce API - Development")
            .WithTheme(ScalarTheme.Purple)
            .WithSidebar(true)
            .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
    });
}
else
{
    Console.WriteLine("🚀 Production mode: Using standard error handling");
    app.UseExceptionHandler("/Error");
    
    // Security headers for production
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

// Environment info endpoint
app.MapGet("/api/info", () => new
{
    Environment = app.Environment.EnvironmentName,
    ApplicationName = builder.Configuration["ApplicationSettings:ApplicationName"],
    Version = builder.Configuration["ApplicationSettings:Version"],
    IsProduction = app.Environment.IsProduction(),
    IsDevelopment = app.Environment.IsDevelopment()
}).WithTags("System").WithSummary("Get application environment information");

Console.WriteLine($"🎯 Application configured successfully for {environment}");
Console.WriteLine($"📋 Available endpoints:");
Console.WriteLine($"   - API Controllers: /api/*");
if (app.Environment.IsDevelopment())
{
    Console.WriteLine($"   - API Documentation: /scalar");
    Console.WriteLine($"   - OpenAPI Schema: /openapi/v1.json");
}
Console.WriteLine($"   - Environment Info: /api/info");

app.Run();

