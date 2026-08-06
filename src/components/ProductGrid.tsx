import React, { useState } from 'react';
import { Product, FilterState } from '../types';
import ProductCard from './ProductCard';
import { 
  SlidersHorizontal, LayoutGrid, Grid3x3, ArrowUpDown, 
  Check, X, RotateCcw, Filter, Flame, Leaf, Sparkles 
} from 'lucide-react';
import { BRANDS } from '../data/mockData';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  selectedCategoryName: string;
  selectedSubCategoryName: string;
}

export default function ProductGrid({
  products,
  onAddToCart,
  onQuickView,
  selectedCategoryName,
  selectedSubCategoryName,
}: ProductGridProps) {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    subCategory: 'all',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 2000000,
    organicOnly: false,
    specialOfferOnly: false,
    inStockOnly: false,
    brand: 'all',
    sortBy: 'popular',
    densityPerPage: 24, // High density items per page
    currentPage: 1,
  });

  // Apply filters
  let filtered = products.filter((p) => {
    if (filterState.organicOnly && !p.isOrganic) return false;
    if (filterState.specialOfferOnly && p.discount === 0) return false;
    if (filterState.inStockOnly && p.stock <= 0) return false;
    if (filterState.brand !== 'all' && p.brand !== filterState.brand) return false;
    if (p.price < filterState.minPrice || p.price > filterState.maxPrice) return false;
    return true;
  });

  // Apply sorting
  filtered.sort((a, b) => {
    if (filterState.sortBy === 'cheapest') return a.price - b.price;
    if (filterState.sortBy === 'expensive') return b.price - a.price;
    if (filterState.sortBy === 'discount') return b.discount - a.discount;
    if (filterState.sortBy === 'newest') return b.id.localeCompare(a.id);
    return b.rating - a.rating; // popular
  });

  // Pagination slice
  const totalItems = filtered.length;
  const paginated = filtered.slice(0, filterState.densityPerPage * filterState.currentPage);

  const resetFilters = () => {
    setFilterState((prev) => ({
      ...prev,
      organicOnly: false,
      specialOfferOnly: false,
      inStockOnly: false,
      brand: 'all',
      minPrice: 0,
      maxPrice: 2000000,
      sortBy: 'popular',
      currentPage: 1,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* Top Header Bar for Grid Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <span>{selectedCategoryName}</span>
            {selectedSubCategoryName !== 'همه' && (
              <span className="text-sm font-normal text-slate-500">/ {selectedSubCategoryName}</span>
            )}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            نمایش <span className="font-bold text-emerald-700">{paginated.length.toLocaleString('fa-IR')}</span> کالا از مجموع {totalItems.toLocaleString('fa-IR')} محصول پرفروش
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          {/* Density Items Per Page Controls */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <span className="px-2 text-slate-500">تعداد در صفحه:</span>
            {[12, 24, 48].map((density) => (
              <button
                key={density}
                onClick={() => setFilterState((prev) => ({ ...prev, densityPerPage: density, currentPage: 1 }))}
                className={`px-2.5 py-1 rounded-lg transition ${
                  filterState.densityPerPage === density
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {density.toLocaleString('fa-IR')}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">مرتب‌سازی:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState((prev) => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="popular">محبوب‌ترین و پرفروش‌ترین</option>
              <option value="discount">بیشترین تخفیف</option>
              <option value="cheapest">ارزان‌ترین</option>
              <option value="expensive">گران‌ترین</option>
            </select>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setShowMobileFilter(true)}
            className="lg:hidden bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Filter className="w-4 h-4" />
            فیلترها
          </button>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* DESKTOP SIDEBAR FILTER */}
        <div className="hidden lg:block lg:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                فیلترهای پیشرفته
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-rose-500 hover:text-rose-700 flex items-center gap-0.5"
              >
                <RotateCcw className="w-3 h-3" />
                حذف فیلترها
              </button>
            </div>

            {/* Quick Toggles */}
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  فقط محصولات ارگانیک
                </span>
                <input
                  type="checkbox"
                  checked={filterState.organicOnly}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, organicOnly: e.target.checked }))}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  فقط تخفیف‌دارها
                </span>
                <input
                  type="checkbox"
                  checked={filterState.specialOfferOnly}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, specialOfferOnly: e.target.checked }))}
                  className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Brand Selector */}
            <div>
              <h4 className="text-xs font-extrabold text-slate-800 mb-2.5">برندهای معتبر ایرانی</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setFilterState((prev) => ({ ...prev, brand: 'all' }))}
                  className={`w-full text-right text-xs px-3 py-1.5 rounded-lg transition ${
                    filterState.brand === 'all'
                      ? 'bg-emerald-100 text-emerald-800 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  همه برندها
                </button>
                {BRANDS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setFilterState((prev) => ({ ...prev, brand: b.name }))}
                    className={`w-full text-right text-xs px-3 py-1.5 rounded-lg flex items-center justify-between transition ${
                      filterState.brand === b.name
                        ? 'bg-emerald-100 text-emerald-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{b.logo} {b.name}</span>
                    <span className="text-[10px] text-slate-400">({b.productCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="text-xs font-extrabold text-slate-800 mb-2">محدوده قیمت (تومان)</h4>
              <input
                type="range"
                min="0"
                max="1500000"
                step="50000"
                value={filterState.maxPrice}
                onChange={(e) => setFilterState((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold mt-1">
                <span>تا: {filterState.maxPrice.toLocaleString('fa-IR')} تومان</span>
                <span>رایگان</span>
              </div>
            </div>

          </div>
        </div>

        {/* PRODUCTS GRID (High Density Layout) */}
        <div className="col-span-1 lg:col-span-9">
          
          {paginated.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-extrabold text-base text-slate-800">هیچ کالایی با این مشخصات یافت نشد</h3>
              <p className="text-xs text-slate-500 mt-1">لطفاً فیلترها را تغییر داده یا جستجو را بازنشانی کنید.</p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
              >
                حذف همه فیلترها
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {paginated.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>

              {/* Load More Pagination */}
              {paginated.length < totalItems && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setFilterState((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                    className="bg-slate-900 hover:bg-emerald-600 text-white font-extrabold text-xs px-8 py-3.5 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5"
                  >
                    بارگذاری محصولات بیشتر (باقی‌مانده: {(totalItems - paginated.length).toLocaleString('fa-IR')})
                  </button>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}
