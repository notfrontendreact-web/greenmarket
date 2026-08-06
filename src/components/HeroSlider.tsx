import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, Timer, Sparkles, Percent } from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';

interface HeroSliderProps {
  onSelectCategory: (categorySlug: string) => void;
}

export default function HeroSlider({ onSelectCategory }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 20 });

  // Auto advance slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 3, minutes: 45, seconds: 20 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative max-w-7xl mx-auto px-4 pt-4 pb-2">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${slide.bgGradient} text-white min-h-[340px] md:min-h-[380px] flex items-center shadow-xl transition-all duration-700 border border-white/10`}>
        
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-organic-pattern opacity-10 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full p-6 sm:p-10 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Text Content */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-slate-900 font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Percent className="w-3.5 h-3.5" />
                {slide.discountTag}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white font-medium text-xs px-3 py-1 rounded-full border border-white/20">
                {slide.badgeText}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-white drop-shadow-md">
              {slide.title}
            </h2>

            <p className="text-emerald-100 text-sm md:text-base font-light max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Countdown timer for special deal */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10">
                <Timer className="w-4 h-4 text-amber-300 animate-spin-slow" />
                <span className="text-xs text-emerald-100 font-semibold">زمان باقی‌مانده تخفیف:</span>
                <div className="flex items-center gap-1 font-mono font-bold text-amber-300 text-sm dir-ltr">
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                  <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
                  <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Call to Action Button */}
              <button
                onClick={() => onSelectCategory(slide.linkCategory)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{slide.buttonText}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:col-span-5 relative flex justify-center items-center">
            <div className="relative group w-full max-w-sm">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <img
                src={slide.image}
                alt={slide.title}
                className="relative z-10 w-full h-56 md:h-64 object-cover rounded-3xl shadow-2xl border-2 border-white/20 transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                کیفیت درجه یک
              </div>
            </div>
          </div>

        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2.5 rounded-full backdrop-blur-md transition z-20 border border-white/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2.5 rounded-full backdrop-blur-md transition z-20 border border-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-3 right-1/2 translate-x-1/2 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
