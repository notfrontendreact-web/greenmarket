import React, { useState } from 'react';
import { X, Download, FileArchive, CheckCircle2, Sparkles, FolderTree, ArrowLeft } from 'lucide-react';
import { generateProjectZip } from '../utils/zipGenerator';

interface ZipDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ZipDownloadModal({ isOpen, onClose }: ZipDownloadModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setIsGenerating(true);
      setProgress(20);
      
      const blob = await generateProjectZip((pct) => setProgress(pct));
      
      // Trigger browser download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'GreenMarket_Nextjs_CSharp_Project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsGenerating(false);
      setProgress(100);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
      alert('خطا در ساخت فایل زیپ');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative bg-white text-slate-900 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-200">
        
        <button onClick={onClose} className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200">
          <X className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <FileArchive className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">دانلود کامل سورس کد پروژه (ZIP)</h3>
            <p className="text-xs text-slate-500">پکیج آماده اجرای Next.js 14 + C# ASP.NET Core 8 API + SQL</p>
          </div>
        </div>

        {/* Contents Checklist */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs text-slate-700 mb-6">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
            <FolderTree className="w-4 h-4 text-emerald-600" />
            محتویات درون فایل زیپ:
          </h4>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>پوشه فرانت‌اند (nextjs-frontend):</strong> شامل Next.js 14, Tailwind CSS, MegaMenu, Sliders</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>پوشه بک‌اند (csharp-backend):</strong> پروژه C# ASP.NET Core 8, Controllers, Models, DbContext</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>پوشه دیتابیس (database/schema.sql):</strong> کدهای DDL ساخت جداول محصولات و دسته‌بندی‌ها</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>فایل README.md:</strong> راهنمای خط به خط دستورات اجرا در محیط توسعه</span>
          </div>
        </div>

        {/* Progress Bar if generating */}
        {isGenerating && (
          <div className="mb-4">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>در حال فشرده‌سازی فایل‌های Next.js و C#...</span>
              <span>٪{progress}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={handleDownloadZip}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm py-4 rounded-2xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition transform active:scale-95 disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>{isGenerating ? 'در حال دریافت فایل زیپ...' : 'دانلود فایل زیپ پروژه (ZIP)'}</span>
        </button>

      </div>
    </div>
  );
}
