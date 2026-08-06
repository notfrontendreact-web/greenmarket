import React, { useState } from 'react';
import { X, Code2, Terminal, Play, Copy, Check, Server, FileCode, Database } from 'lucide-react';
import { CSHARP_CODE_SAMPLE } from '../data/mockData';

interface CSharpApiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CSharpApiModal({ isOpen, onClose }: CSharpApiModalProps) {
  const [activeFile, setActiveFile] = useState<'controller' | 'model' | 'program' | 'swagger'>('controller');
  const [copied, setCopied] = useState(false);
  const [testResponse, setTestResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(CSHARP_CODE_SAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestApi = () => {
    setTestResponse(JSON.stringify({
      statusCode: 200,
      message: "C# ASP.NET Core 8 API call successful",
      page: 1,
      pageSize: 24,
      totalCount: 50,
      itemsSample: [
        { id: 1, title: "سیب سرخ ارگانیک دماوند", categorySlug: "fruits-vegetables", price: 45000, stock: 85, isOrganic: true },
        { id: 2, title: "ماست یونانی صباح", categorySlug: "dairy-icecream", price: 78000, stock: 70, isOrganic: false }
      ]
    }, null, 2));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative bg-slate-900 text-white rounded-3xl max-w-4xl w-full max-h-[88vh] overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                سورس‌کد کامل بک‌اند C# ASP.NET Core 8 Web API
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
                  .NET 8.0
                </span>
              </h3>
              <p className="text-xs text-slate-400">طراحی شیک Controller، Entity Framework Core و Swagger</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-slate-700 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'کپی شد' : 'کپی کد'}</span>
            </button>

            <button onClick={onClose} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700">
              <X className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>

        {/* Code Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 bg-slate-950 border-b border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveFile('controller')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 transition border-b-2 ${
              activeFile === 'controller' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-slate-400'
            }`}
          >
            <FileCode className="w-4 h-4" />
            ProductsController.cs
          </button>
          <button
            onClick={() => setActiveFile('model')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 transition border-b-2 ${
              activeFile === 'model' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-slate-400'
            }`}
          >
            <Database className="w-4 h-4" />
            Product.cs & DbContext
          </button>
          <button
            onClick={() => setActiveFile('program')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 transition border-b-2 ${
              activeFile === 'program' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-slate-400'
            }`}
          >
            <Server className="w-4 h-4" />
            Program.cs
          </button>
          <button
            onClick={() => setActiveFile('swagger')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 transition border-b-2 ${
              activeFile === 'swagger' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-slate-400'
            }`}
          >
            <Terminal className="w-4 h-4" />
            تست آنلاین Swagger API
          </button>
        </div>

        {/* Code Viewer Body */}
        <div className="flex-1 overflow-y-auto p-5 dir-ltr font-mono text-xs text-slate-300 bg-slate-950/60">
          {activeFile === 'controller' && (
            <pre className="whitespace-pre-wrap leading-relaxed text-blue-300">
              {CSHARP_CODE_SAMPLE}
            </pre>
          )}

          {activeFile === 'model' && (
            <pre className="whitespace-pre-wrap leading-relaxed text-teal-300">
{`// File: Models/Product.cs
namespace GroceryApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string EnglishTitle { get; set; } = string.Empty;
        public string CategorySlug { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal OriginalPrice { get; set; }
        public int Discount { get; set; }
        public string Unit { get; set; } = string.Empty;
        public bool IsOrganic { get; set; }
        public int Stock { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}`}
            </pre>
          )}

          {activeFile === 'program' && (
            <pre className="whitespace-pre-wrap leading-relaxed text-amber-300">
{`// File: Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS for Next.js 14 frontend
builder.Services.AddCors(options => {
    options.AddPolicy("AllowNextFrontend",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowNextFrontend");
app.MapControllers();
app.Run();`}
            </pre>
          )}

          {activeFile === 'swagger' && (
            <div className="space-y-4 dir-rtl text-right">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">تست فراخوانی API شبیه‌سازی‌شده (GET /api/v1/products)</h4>
                  <p className="text-xs text-slate-400">پاسخ متد کنترلر C# ASP.NET Core 8 به صورت JSON استاندارد</p>
                </div>
                <button
                  onClick={handleTestApi}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-blue-600/30"
                >
                  <Play className="w-4 h-4 fill-white" />
                  اجرای Request
                </button>
              </div>

              {testResponse && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl dir-ltr text-left">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-2">
                    HTTP/1.1 200 OK (Response Header: Content-Type: application/json)
                  </span>
                  <pre className="text-xs text-emerald-300 overflow-x-auto max-h-60 font-mono">
                    {testResponse}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
