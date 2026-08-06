import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../data/mockData';
import { Apple, Milk, Beef, Wheat, Cookie, Coffee, Sparkles } from 'lucide-react';

interface CategorySliderProps {
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Apple: <Apple className="w-6 h-6 text-emerald-600" />,
  Milk: <Milk className="w-6 h-6 text-blue-600" />,
  Beef: <Beef className="w-6 h-6 text-rose-600" />,
  Wheat: <Wheat className="w-6 h-6 text-amber-600" />,
  Cookie: <Cookie className="w-6 h-6 text-purple-600" />,
  Coffee: <Coffee className="w-6 h-6 text-teal-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-cyan-600" />,
};

export default function CategorySlider({ selectedCategory, onSelectCategory }: CategorySliderProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            دسته‌بندی‌های محبوب مواد غذایی
          </h3>
          <p className="text-xs text-slate-500 font-medium">انتخاب بر اساس دسته‌بندی با محصولات فراوان</p>
        </div>

        <button
          onClick={() => onSelectCategory('all')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
            selectedCategory === 'all'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          نمایش همه دسته‌ها
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`p-3.5 rounded-2xl border text-right transition-all transform hover:-translate-y-1 ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/25'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800 shadow-sm'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100'
              }`}>
                {ICON_MAP[cat.icon] || <Apple className="w-6 h-6" />}
              </div>

              <h4 className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                {cat.name}
              </h4>
              <span className={`text-[11px] font-medium block mt-1 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                {cat.itemCount} محصول
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
