import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShieldCheck, Truck, ShoppingBag, Leaf, Code, Flame, Check } from 'lucide-react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductQuickView({
  product,
  onClose,
  onAddToCart,
}: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showJsonLd, setShowJsonLd] = useState(false);

  if (!product) return null;

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Schema.org JSON-LD Microdata simulation
  const jsonLdSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": [product.image],
    "description": product.description,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://greenmarket.ir/products/${product.categorySlug}/${product.slug}`,
      "priceCurrency": "IRT",
      "price": product.price,
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewsCount
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 md:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Gallery Column */}
          <div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 overflow-hidden mb-3 h-64 md:h-72 flex items-center justify-center">
              <img
                src={images[activeImage]}
                alt={product.title}
                className="max-h-full object-contain rounded-xl"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden ${
                      activeImage === idx ? 'border-emerald-600 shadow-md' : 'border-slate-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Nutrition Box if present */}
            {product.nutrition && (
              <div className="mt-4 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs">
                <h5 className="font-extrabold text-emerald-800 mb-1.5 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  ارزش غذایی (در هر ۱۰۰ گرم)
                </h5>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-100">
                    <span className="block text-slate-400">کالری</span>
                    <span className="font-bold text-slate-800">{product.nutrition.calories}</span>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-100">
                    <span className="block text-slate-400">پروتئین</span>
                    <span className="font-bold text-slate-800">{product.nutrition.protein}</span>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-100">
                    <span className="block text-slate-400">چربی</span>
                    <span className="font-bold text-slate-800">{product.nutrition.fat}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Info Column */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
                <span className="text-xs text-slate-400">شناسه: {product.sku}</span>
              </div>

              <h2 className="text-lg font-black text-slate-900 leading-snug">
                {product.title}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{product.englishTitle}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="font-extrabold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount} نظر خریداران)</span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {product.description}
            </p>

            {/* Price Box */}
            <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-slate-400 font-medium">قیمت نهایی:</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-emerald-400">
                    {product.price.toLocaleString('fa-IR')}
                  </span>
                  <span className="text-xs text-slate-300">تومان</span>
                </div>
              </div>

              {product.discount > 0 && (
                <div className="text-left">
                  <span className="bg-rose-500 text-white text-xs font-black px-2 py-1 rounded-lg">
                    ٪{product.discount} تخفیف
                  </span>
                  <span className="block text-xs text-slate-400 line-through mt-0.5">
                    {product.originalPrice.toLocaleString('fa-IR')}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity and Add Button */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 font-bold text-slate-700 hover:bg-slate-200 rounded-r-xl"
                >
                  -
                </button>
                <span className="px-4 font-black text-sm text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 font-bold text-slate-700 hover:bg-slate-200 rounded-l-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm py-3 px-4 rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                افزودن به سبد خرید
              </button>
            </div>

            {/* SEO JSON-LD Toggle */}
            <div className="pt-2">
              <button
                onClick={() => setShowJsonLd(!showJsonLd)}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Code className="w-3.5 h-3.5" />
                {showJsonLd ? 'بستن کد اسکیما سئو' : 'مشاهده کد Schema.org JSON-LD (SEO)'}
              </button>

              {showJsonLd && (
                <pre className="mt-2 p-3 bg-slate-900 text-emerald-400 text-[10px] font-mono rounded-xl overflow-x-auto max-h-40 border border-slate-800">
                  {JSON.stringify(jsonLdSchema, null, 2)}
                </pre>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
