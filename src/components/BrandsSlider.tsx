import React from 'react';
import { BRANDS } from '../data/mockData';
import { Award } from 'lucide-react';

export default function BrandsSlider() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          برندهای برتر صنایع غذایی کشور
        </h3>
        <span className="text-xs text-slate-500 font-medium">تضمین اصالت و تازگی تمامی برندها</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {BRANDS.map((brand) => (
          <div
            key={brand.id}
            className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md flex flex-col items-center justify-center transition hover:-translate-y-0.5"
          >
            <span className="text-2xl mb-1">{brand.logo}</span>
            <span className="text-xs font-bold text-slate-800">{brand.name}</span>
            <span className="text-[10px] text-slate-400 font-mono">{brand.englishName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
