import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Download, Code2, Globe2, Sparkles, 
  ChevronDown, PhoneCall, Truck, ShieldCheck, Flame, Leaf, Star, X
} from 'lucide-react';
import { Category, Product } from '../types';
import { CATEGORIES } from '../data/mockData';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenZipModal: () => void;
  onOpenCSharpModal: () => void;
  onOpenSeoModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (catSlug: string) => void;
  setSelectedSubCategory: (subSlug: string) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function Header({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenZipModal,
  onOpenCSharpModal,
  onOpenSeoModal,
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  setSelectedSubCategory,
  allProducts,
  onSelectProduct,
}: HeaderProps) {
  const [activeHoverCategory, setActiveHoverCategory] = useState<Category | null>(null);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  // Filter search suggestions
  const searchSuggestions = searchQuery.trim()
    ? allProducts.filter(p => 
        p.title.includes(searchQuery) || 
        p.brand.includes(searchQuery) || 
        p.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-4 h-4 text-emerald-300" />
              ارسال اکسپرس و رایگان سفارش‌های بالای ۴۰۰ هزار تومان
            </span>
            <span className="hidden md:inline text-emerald-300">•</span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              تضمین ۱۰۰٪ تازگی و کیفیت مواد غذایی
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Download Zip CTA */}
            <button
              onClick={onOpenZipModal}
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm transition-all text-[11px] animate-pulse"
            >
              <Download className="w-3.5 h-3.5" />
              دانلود فایل زیپ (Next.js + C#)
            </button>

            <div className="hidden sm:flex items-center gap-1 text-emerald-100">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>پشتیبانی: ۰۲۱-۹۱۰۰۸۸۸۸</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Middle Section */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); setSearchQuery(''); }}
          className="cursor-pointer flex items-center gap-3 shrink-0 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Leaf className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">گرین‌مارکت</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Next.js & C#
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">سوپرمارکت آنلاین ارگانیک</p>
          </div>
        </div>

        {/* Search Bar with Autocomplete */}
        <div className="flex-1 max-w-2xl relative hidden sm:block">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchSuggestions(true);
              }}
              onFocus={() => setShowSearchSuggestions(true)}
              placeholder="جستجو در ۵۰+ کالا (سیب دماوند، شیر کاله، برنج هاشمی، پسته...)"
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 text-sm rounded-2xl py-2.5 pr-11 pl-10 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 outline-none transition-all placeholder:text-slate-400"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 pointer-events-none" />
            
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {showSearchSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="p-2 text-xs font-semibold text-slate-400 bg-slate-50 border-b border-slate-100">
                نتایج پیشنهادی سریع
              </div>
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setShowSearchSuggestions(false);
                    }}
                    className="p-2.5 hover:bg-emerald-50/70 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.title} className="w-10 h-10 object-cover rounded-xl border border-slate-100" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">{product.title}</h5>
                        <p className="text-[11px] text-slate-500">{product.brand} • {product.unit}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-emerald-700">{product.price.toLocaleString('fa-IR')} تومان</span>
                      {product.discount > 0 && (
                        <span className="block text-[10px] text-rose-500 line-through">
                          {product.originalPrice.toLocaleString('fa-IR')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Header */}
        <div className="flex items-center gap-2">
          {/* SEO Inspection Tool */}
          <button
            onClick={onOpenSeoModal}
            title="بررسی سئو پیشرفته و اسکیما"
            className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 flex items-center gap-1.5 text-xs font-medium transition-colors"
          >
            <Globe2 className="w-4 h-4 text-emerald-600" />
            <span className="hidden lg:inline">آنالیز سئو</span>
          </button>

          {/* C# API Sandbox */}
          <button
            onClick={onOpenCSharpModal}
            title="مشاهده کدهای C# API و سورس کد"
            className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-center gap-1.5 text-xs font-medium transition-colors"
          >
            <Code2 className="w-4 h-4 text-blue-600" />
            <span className="hidden lg:inline">C# API Sandbox</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-md shadow-emerald-600/25 transition-all transform active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            <div className="text-right hidden sm:block">
              <span className="block text-[10px] text-emerald-100">سبد خرید</span>
              <span className="block text-xs font-extrabold leading-none">
                {cartTotal > 0 ? `${cartTotal.toLocaleString('fa-IR')} تومان` : 'خالی'}
              </span>
            </div>

            {cartCount > 0 && (
              <span className="bg-amber-400 text-slate-900 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-600 shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* HOVER MEGA MENU BAR */}
      <div className="border-t border-slate-100 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none relative">
            
            {/* All Products Trigger */}
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); }}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              همه محصولات
            </button>

            {/* Hover Mega Menu Categories */}
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                onMouseEnter={() => setActiveHoverCategory(category)}
                onMouseLeave={() => setActiveHoverCategory(null)}
                className="mega-menu-trigger relative"
              >
                <button
                  onClick={() => {
                    setSelectedCategory(category.slug);
                    setSelectedSubCategory('all');
                  }}
                  className="px-3 py-2.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1 rounded-xl hover:bg-white transition-all whitespace-nowrap"
                >
                  <span>{category.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                </button>
              </div>
            ))}
          </nav>

          {/* Quick Filter Highlights */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-600 border-r border-slate-200 pr-4">
            <button 
              onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); }} 
              className="flex items-center gap-1 hover:text-rose-600 transition"
            >
              <Flame className="w-4 h-4 text-rose-500" />
              پیشنهادهای شگفت‌انگیز
            </button>
            <button 
              onClick={() => { setSelectedCategory('fruits-vegetables'); setSelectedSubCategory('organic-produce'); }}
              className="flex items-center gap-1 hover:text-emerald-600 transition"
            >
              <Leaf className="w-4 h-4 text-emerald-500" />
              ارگانیک
            </button>
          </div>
        </div>

        {/* Dynamic Multi-Tier Hover Mega-Menu Box */}
        {activeHoverCategory && (
          <div
            onMouseEnter={() => setActiveHoverCategory(activeHoverCategory)}
            onMouseLeave={() => setActiveHoverCategory(null)}
            className="absolute top-full right-0 left-0 bg-white border-b border-slate-200 shadow-2xl transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-2"
          >
            <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
              
              {/* Left 9 Columns: Subcategories List */}
              <div className="col-span-8 md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-6 border-l border-slate-100 pl-6">
                {activeHoverCategory.subCategories.map((sub) => (
                  <div key={sub.id} className="group/sub">
                    <button
                      onClick={() => {
                        setSelectedCategory(activeHoverCategory.slug);
                        setSelectedSubCategory(sub.slug);
                        setActiveHoverCategory(null);
                      }}
                      className="text-right w-full"
                    >
                      <h4 className="font-extrabold text-sm text-slate-900 group-hover/sub:text-emerald-600 transition-colors flex items-center gap-1.5 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {sub.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-2 font-normal">
                        {sub.description}
                      </p>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {sub.itemCount} محصول
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Right 3 Columns: Featured Offer inside MegaMenu */}
              <div className="col-span-4 md:col-span-3 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl p-4 border border-emerald-100 flex flex-col justify-between">
                <div>
                  <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    پیشنهاد ویژه این دسته
                  </span>
                  {activeHoverCategory.featuredProduct && (
                    <div className="mt-3">
                      <img 
                        src={activeHoverCategory.featuredProduct.image} 
                        alt={activeHoverCategory.featuredProduct.title}
                        className="w-full h-28 object-cover rounded-xl shadow-sm mb-2" 
                      />
                      <h5 className="font-bold text-xs text-slate-800 line-clamp-1">
                        {activeHoverCategory.featuredProduct.title}
                      </h5>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-black text-emerald-700">
                          {activeHoverCategory.featuredProduct.price.toLocaleString('fa-IR')} تومان
                        </span>
                        <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                          ٪{activeHoverCategory.featuredProduct.discount} تخفیف
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory(activeHoverCategory.slug);
                    setSelectedSubCategory('all');
                    setActiveHoverCategory(null);
                  }}
                  className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl transition"
                >
                  مشاهده همه محصولات {activeHoverCategory.name}
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
}
