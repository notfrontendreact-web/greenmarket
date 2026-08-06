import JSZip from 'jszip';

export async function generateProjectZip(onProgress?: (percent: number) => void): Promise<Blob> {
  const zip = new JSZip();

  // Root README
  zip.file('README.md', `# پروژه کامل فروشگاه مواد غذایی (Next.js 14 + C# ASP.NET Core 8 API)

این پروژه شامل فرانت‌اند **Next.js 14** با رندرینگ سریع و سئوی بالا، و بک‌اند **C# Web API** به همراه دیتابیس SQL می‌باشد.

## 🚀 راهنمای راه‌اندازی فرانت‌اند (Next.js)
\`\`\`bash
cd nextjs-frontend
npm install
npm run dev
\`\`\`
سپس مرورگر خود را روی \`http://localhost:3000\` باز کنید.

## ⚡ راهنمای راه‌اندازی بک‌اند (C# ASP.NET Core 8)
\`\`\`bash
cd csharp-backend
dotnet restore
dotnet run
\`\`\`
آدرس API سوئیگر: \`http://localhost:5000/swagger\`

## 🗄️ راه‌اندازی دیتابیس (SQL Server / PostgreSQL)
اسکریپت موجود در پوشه \`database/schema.sql\` را در SQL Server یا PostgreSQL اجرا کنید.
`);

  // 1. Next.js Frontend Folder
  const nextFolder = zip.folder('nextjs-frontend');

  if (nextFolder) {
    nextFolder.file('package.json', JSON.stringify({
      name: 'greenmarket-nextjs-grocery',
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        next: '^14.2.0',
        react: '^18.3.0',
        'react-dom': '^18.3.0',
        'lucide-react': '^0.378.0',
        'framer-motion': '^11.2.0',
        tailwindcss: '^3.4.0',
        autoprefixer: '^10.4.0',
        postcss: '^8.4.0'
      }
    }, null, 2));

    nextFolder.file('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:5000/api/v1/:path*', // C# API Proxy
      },
    ];
  },
};
module.exports = nextConfig;`);

    nextFolder.file('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        }
      },
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],
      }
    },
  },
  plugins: [],
};`);

    // app/layout.tsx
    const appFolder = nextFolder.folder('app');
    if (appFolder) {
      appFolder.file('layout.tsx', `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'فروشگاه مواد غذایی گرین‌مارکت | خرید آنلاین مواد غذایی تازه',
  description: 'خرید آنلاین انواع مواد غذایی، میوه تازه، لبنیات، گوشت و خواربار با بهترین قیمت و سئوی فوق‌العاده',
  keywords: ['فروشگاه مواد غذایی', 'سوپرمارکت آنلاین', 'Next.js', 'C# API', 'ارسال سریع'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body class="bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}`);

      appFolder.file('page.tsx', `import React from 'react';
import MegaMenu from '../components/MegaMenu';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <MegaMenu />
      <HeroSlider />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">محصولات تازه مواد غذایی</h1>
        <ProductGrid />
      </div>
    </main>
  );
}`);
    }

    // components/
    const compFolder = nextFolder.folder('components');
    if (compFolder) {
      compFolder.file('MegaMenu.tsx', `// Hover Mega Menu Component for Next.js
import React from 'react';
import { Apple, Milk, Beef, Wheat, Cookie, Coffee } from 'lucide-react';

export default function MegaMenu() {
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-[#10b981] space-x-reverse space-x-6 py-3 font-semibold">
          <div className="group relative cursor-pointer py-2">
            <span className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition">
              <Apple className="w-5 h-5 text-emerald-600" />
              میوه و سبزیجات
            </span>
            {/* Hover SubMenu */}
            <div className="hidden group-hover:block absolute top-full right-0 w-[500px] bg-white border border-slate-200 shadow-xl rounded-b-xl p-6 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-emerald-700 mb-2">میوه‌های تازه</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li className="hover:text-emerald-600">سیب و گلابی</li>
                  <li className="hover:text-emerald-600">موز و مرکبات</li>
                  <li className="hover:text-emerald-600">توت فرنگی نوبرانه</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-emerald-700 mb-2">سبزیجات و صیفی‌جات</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li className="hover:text-emerald-600">کاهو و اسفناج ارگانیک</li>
                  <li className="hover:text-emerald-600">گوجه و خیار بوته‌ای</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}`);

      compFolder.file('ProductGrid.tsx', `import React from 'react';

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Dynamic Products render */}
    </div>
  );
}`);
    }
  }

  // 2. C# ASP.NET Core Backend Folder
  const csharpFolder = zip.folder('csharp-backend');
  if (csharpFolder) {
    csharpFolder.file('GreenMarketApi.csproj', `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>
</Project>`);

    csharpFolder.file('Program.cs', `using Microsoft.EntityFrameworkCore;
using GreenMarketApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS for Next.js frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextFrontend",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// Configure Entity Framework Core with SQL Server
builder.Services.AddDbContext<GroceryDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowNextFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();`);

    csharpFolder.file('appsettings.json', JSON.stringify({
      Logging: {
        LogLevel: {
          Default: "Information",
          "Microsoft.AspNetCore": "Warning"
        }
      },
      AllowedHosts: "*",
      ConnectionStrings: {
        DefaultConnection: "Server=(localdb)\\mssqllocaldb;Database=GreenMarketDb;Trusted_Connection=True;MultipleActiveResultSets=true"
      }
    }, null, 2));

    // Controllers
    const controllers = csharpFolder.folder('Controllers');
    if (controllers) {
      controllers.file('ProductsController.cs', `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenMarketApi.Data;
using GreenMarketApi.Models;

namespace GreenMarketApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly GroceryDbContext _context;

        public ProductsController(GroceryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? category, [FromQuery] int page = 1)
        {
            var query = _context.Products.AsQueryable();
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(p => p.CategorySlug == category);
            }
            var products = await query.Skip((page - 1) * 24).Take(24).ToListAsync();
            return Ok(new { success = true, page, data = products });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }
    }
}`);
    }

    // Models
    const models = csharpFolder.folder('Models');
    if (models) {
      models.file('Product.cs', `namespace GreenMarketApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string EnglishTitle { get; set; } = string.Empty;
        public string CategorySlug { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal OriginalPrice { get; set; }
        public int DiscountPercentage { get; set; }
        public string Unit { get; set; } = string.Empty;
        public bool IsOrganic { get; set; }
        public int Stock { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}`);
    }

    // Data
    const dataFolder = csharpFolder.folder('Data');
    if (dataFolder) {
      dataFolder.file('GroceryDbContext.cs', `using Microsoft.EntityFrameworkCore;
using GreenMarketApi.Models;

namespace GreenMarketApi.Data
{
    public class GroceryDbContext : DbContext
    {
        public GroceryDbContext(DbContextOptions<GroceryDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; } = null!;
    }
}`);
    }
  }

  // 3. Database Schema Folder
  const dbFolder = zip.folder('database');
  if (dbFolder) {
    dbFolder.file('schema.sql', `-- GreenMarket Grocery Database DDL
CREATE TABLE Categories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Slug NVARCHAR(100) UNIQUE NOT NULL,
    BgGradient NVARCHAR(100)
);

CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    EnglishTitle VARCHAR(200),
    Slug VARCHAR(200) UNIQUE NOT NULL,
    CategoryId INT FOREIGN KEY REFERENCES Categories(Id),
    Price DECIMAL(18,2) NOT NULL,
    OriginalPrice DECIMAL(18,2) NOT NULL,
    Discount INT DEFAULT 0,
    Unit NVARCHAR(50) NOT NULL,
    Stock INT DEFAULT 100,
    IsOrganic BIT DEFAULT 0,
    ImageUrl VARCHAR(500),
    CreatedAt DATETIME DEFAULT GETUTCDATE()
);

-- Seed Data
INSERT INTO Categories (Name, Slug) VALUES (N'میوه و سبزیجات', 'fruits-vegetables'), (N'لبنیات', 'dairy-icecream');
INSERT INTO Products (Title, EnglishTitle, Slug, CategoryId, Price, OriginalPrice, Discount, Unit, IsOrganic, ImageUrl)
VALUES (N'سیب سرخ دماوند', 'Damavand Red Apple', 'damavand-red-apple', 1, 45000, 60000, 25, N'کیلوگرم', 1, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6');
`);
  }

  if (onProgress) onProgress(100);
  return await zip.generateAsync({ type: 'blob' });
}
