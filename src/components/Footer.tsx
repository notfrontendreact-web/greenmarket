import React from 'react';
import { Leaf, Phone, Mail, MapPin, Download, ShieldCheck, Truck, RefreshCw, Clock, Globe2 } from 'lucide-react';

interface FooterProps {
  onOpenZipModal: () => void;
  onOpenCSharpModal: () => void;
  onOpenSeoModal: () => void;
}

export default function Footer({ onOpenZipModal, onOpenCSharpModal, onOpenSeoModal }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      
      {/* Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-10 border-b border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center">
          <Truck className="w-8 h-8 text-emerald-400 mb-2" />
          <h5 className="font-extrabold text-sm text-white">ارسال سریع کمتر از ۴۵ دقیقه</h5>
          <p className="text-xs text-slate-400 mt-0.5">تحویل اکسپرس سوپرمارکتی</p>
        </div>

        <div className="flex flex-col items-center">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
          <h5 className="font-extrabold text-sm text-white">تضمین ۱۰۰٪ تازگی کالا</h5>
          <p className="text-xs text-slate-400 mt-0.5">مستقیم از تولیدکننده و دامداری</p>
        </div>

        <div className="flex flex-col items-center">
          <RefreshCw className="w-8 h-8 text-emerald-400 mb-2" />
          <h5 className="font-extrabold text-sm text-white">۷ روز ضمانت بازگشت وجه</h5>
          <p className="text-xs text-slate-400 mt-0.5">بدون قید و شرط در صورت عدم رضایت</p>
        </div>

        <div className="flex flex-col items-center">
          <Clock className="w-8 h-8 text-emerald-400 mb-2" />
          <h5 className="font-extrabold text-sm text-white">پشتیبانی ۲۴ ساعته</h5>
          <p className="text-xs text-slate-400 mt-0.5">۷ روز هفته آماده پاسخگویی</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Col 1: About */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-lg font-black text-white">فروشگاه آنلاین گرین‌مارکت</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-md">
            گرین‌مارکت مدرن‌ترین سوپرمارکت آنلاین مواد غذایی، میوه و سبزیجات تازه با معماری فرانت‌اند Next.js و بک‌اند سی‌شارپ (C# ASP.NET Core 8) می‌باشد.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={onOpenZipModal}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition"
            >
              <Download className="w-4 h-4" />
              دانلود پروژه Next.js + C# (ZIP)
            </button>

            <button
              onClick={onOpenCSharpModal}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
            >
              سورس C# API
            </button>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="md:col-span-3 space-y-2 text-xs">
          <h5 className="font-bold text-white text-sm mb-3">دسترسی سریع</h5>
          <ul className="space-y-2 text-slate-400">
            <li><button onClick={onOpenSeoModal} className="hover:text-emerald-400 transition">آنالیز سئو و کدهای Schema.org</button></li>
            <li><button onClick={onOpenCSharpModal} className="hover:text-emerald-400 transition">مشاهده Swagger API بک‌اند C#</button></li>
            <li><span className="hover:text-emerald-400 cursor-pointer">دسته‌بندی میوه‌ها و صیفی‌جات</span></li>
            <li><span className="hover:text-emerald-400 cursor-pointer">لبنیات تازه کاله و پگاه</span></li>
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div className="md:col-span-4 space-y-3 text-xs text-slate-400">
          <h5 className="font-bold text-white text-sm mb-3">ارتباط با ما</h5>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>تلفن پشتیبانی: ۰۲۱-۹۱۰۰۸۸۸۸</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>ایمیل: info@greenmarket.ir</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>تهران، خیابان ولیعصر، برج نوآوری گرین‌مارکت</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
        کلیه حقوق این فروشگاه آنلاین مواد غذایی (طراحی شده با Next.js 14 و C# API) محفوظ است. ۱۴۰۳ - ۲۰۲۶ ©
      </div>
    </footer>
  );
}
