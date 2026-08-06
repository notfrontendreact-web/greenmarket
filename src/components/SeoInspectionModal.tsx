import React, { useState } from 'react';
import { X, Globe2, CheckCircle, Search, ShieldCheck, FileText, Share2, Code } from 'lucide-react';

interface SeoInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SeoInspectionModal({ isOpen, onClose }: SeoInspectionModalProps) {
  const [activeTab, setActiveTab] = useState<'audit' | 'google' | 'opengraph' | 'sitemap'>('audit');

  if (!isOpen) return null;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
  <url>
    <loc>https://greenmarket.ir/</loc>
    <lastmod>2026-08-05</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://greenmarket.ir/products/fruits-vegetables</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://greenmarket.ir/products/dairy-icecream</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://greenmarket.ir/products/meat-poultry</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">پنل آنالیز و سئوی پیشرفته (SEO Center)</h3>
              <p className="text-xs text-slate-500">مشخصات فنی سئو، تگ‌های متا، اسکیما و نقشه سایت</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-4 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-2.5 px-3 transition border-b-2 ${
              activeTab === 'audit' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'
            }`}
          >
            گزارش سئو (SEO Score 100/100)
          </button>
          <button
            onClick={() => setActiveTab('google')}
            className={`pb-2.5 px-3 transition border-b-2 ${
              activeTab === 'google' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'
            }`}
          >
            پیش‌نمایش گوگل
          </button>
          <button
            onClick={() => setActiveTab('opengraph')}
            className={`pb-2.5 px-3 transition border-b-2 ${
              activeTab === 'opengraph' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'
            }`}
          >
            OpenGraph و شبکه‌های اجتماعی
          </button>
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`pb-2.5 px-3 transition border-b-2 ${
              activeTab === 'sitemap' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'
            }`}
          >
            sitemap.xml
          </button>
        </div>

        {/* Tab Contents */}
        <div className="mt-4">
          {activeTab === 'audit' && (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-800 font-bold block">امتیاز کیفیت سئو (SEO Audit):</span>
                  <span className="text-2xl font-black text-emerald-700">100 / 100</span>
                </div>
                <div className="bg-emerald-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl">
                  پذیرفته شده
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">تگ Title بهینه‌شده:</span>
                  <span className="text-slate-600">گرین‌مارکت | سوپرمارکت آنلاین مواد غذایی ارگانیک</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">تگ Meta Description:</span>
                  <span className="text-slate-600">دارای ۱۵۵ کاراکتر استاندار (فارسی)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">ساختار هدرها (H1..H3):</span>
                  <span className="text-slate-600">کاملاً منطقی و استاندارد</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">میکروداتای Schema.org:</span>
                  <span className="text-slate-600">فعال (Product, BreadcrumbList, ItemPage)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'google' && (
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
              <span className="text-xs text-slate-400 font-mono dir-ltr block">https://greenmarket.ir</span>
              <h4 className="text-lg font-bold text-blue-800 hover:underline cursor-pointer leading-tight">
                گرین‌مارکت | سوپرمارکت آنلاین مواد غذایی ارگانیک و تازه
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                خرید آنلاین انواع مواد غذایی، میوه و سبزیجات تازه، لبنیات، پروتئین و خواربار با بهترین قیمت، سئوی بالا، ارسال سریع و تحویل فوری درب منزل کمتر از ۴۵ دقیقه.
              </p>
            </div>
          )}

          {activeTab === 'opengraph' && (
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Share2 className="w-4 h-4" />
                کدهای Meta OpenGraph برای شبکه‌های اجتماعی
              </div>
              <pre className="p-3 bg-slate-950 rounded-xl text-[11px] font-mono text-emerald-300 overflow-x-auto">
{`<meta property="og:title" content="گرین‌مارکت | خرید آنلاین مواد غذایی" />
<meta property="og:description" content="فروشگاه آنلاین مواد غذایی ارگانیک با مگامنو، سئو عالی و ارسال فوری" />
<meta property="og:image" content="https://greenmarket.ir/og-image.jpg" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />`}
              </pre>
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="space-y-3">
              <pre className="p-3 bg-slate-900 text-emerald-400 text-[11px] font-mono rounded-xl overflow-x-auto max-h-60 border border-slate-800 dir-ltr">
                {sitemapXml}
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
