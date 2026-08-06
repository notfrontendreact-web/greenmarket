import React from 'react';
import { ShoppingBag, Eye, Star, Leaf, Check, Flame } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isCompact?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isCompact = false,
}: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Badges */}
      <div className="absolute top-2.5 right-2.5 left-2.5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.discount > 0 && (
            <span className="bg-rose-500 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
              <Flame className="w-3 h-3" />
              ٪{product.discount}
            </span>
          )}

          {product.isOrganic && (
            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
              <Leaf className="w-3 h-3" />
              ارگانیک
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
          title="مشاهده سریع و اطلاعات سئو"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Image Box */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative bg-slate-50 p-4 cursor-pointer overflow-hidden flex items-center justify-center h-44 sm:h-48"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Box */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1">
            <span>{product.brand}</span>
            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{product.unit}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-extrabold text-xs sm:text-sm text-slate-800 line-clamp-2 hover:text-emerald-600 cursor-pointer leading-snug transition-colors"
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Add To Cart Button */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            {product.discount > 0 && (
              <span className="block text-[11px] text-slate-400 line-through font-medium leading-none">
                {product.originalPrice.toLocaleString('fa-IR')}
              </span>
            )}
            <span className="text-sm sm:text-base font-black text-emerald-700">
              {product.price.toLocaleString('fa-IR')} <span className="text-[10px] font-semibold text-slate-500">تومان</span>
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl flex items-center justify-center shadow-md shadow-emerald-600/20 active:scale-90 transition-all"
            title="افزودن به سبد خرید"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
