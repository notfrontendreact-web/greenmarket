import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Truck, ShoppingBag, ArrowLeft, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const rawTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const finalTotal = Math.max(0, rawTotal - voucherDiscount);
  const freeShippingThreshold = 400000;
  const freeShippingProgress = Math.min(100, (rawTotal / freeShippingThreshold) * 100);

  const applyVoucher = () => {
    if (voucherCode.trim().toUpperCase() === 'GREEN' || voucherCode.trim() === 'گرین') {
      setVoucherDiscount(50000);
      setVoucherApplied(true);
    } else {
      alert('کد تخفیف معتبر نیست. کد تست: GREEN');
    }
  };

  const handleCheckout = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    setIsOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="font-extrabold text-sm">سبد خرید شما ({items.length} کالا)</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-emerald-800 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {isOrdered ? (
            <div className="p-8 text-center flex-1 flex flex-col justify-center items-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-3 animate-bounce" />
              <h3 className="font-black text-xl text-slate-800">سفارش شما با موفقیت ثبت شد!</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                کد پیگیری سفارش: <span className="font-mono font-bold text-slate-800">#GRN-9842</span>
                <br />
                پیک اکسپرس تا ۳۰ دقیقه آینده با شما تماس خواهد گرفت.
              </p>
              <button
                onClick={() => {
                  onClearCart();
                  setIsOrdered(false);
                  onClose();
                }}
                className="mt-6 bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-lg"
              >
                بازگشت به فروشگاه
              </button>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              <div className="p-3 bg-emerald-50 border-b border-emerald-100 text-xs">
                <div className="flex justify-between font-bold text-emerald-900 mb-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    {rawTotal >= freeShippingThreshold
                      ? 'تبریک! ارسال سفارش شما رایگان شد'
                      : `فقط ${(freeShippingThreshold - rawTotal).toLocaleString('fa-IR')} تومان تا ارسال رایگان`}
                  </span>
                </div>
                <div className="w-full bg-emerald-200/80 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                    <ShoppingBag className="w-12 h-12 stroke-1 mb-2 text-slate-300" />
                    <p className="text-xs font-semibold">سبد خرید شما خالی است</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.product.id} className="py-3 flex items-center justify-between gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-100 shrink-0"
                      />

                      <div className="flex-1">
                        <h4 className="font-bold text-xs text-slate-800 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 block">{item.product.unit}</span>
                        <span className="text-xs font-black text-emerald-700">
                          {(item.product.price * item.quantity).toLocaleString('fa-IR')} تومان
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg bg-slate-50 px-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-slate-600 font-bold hover:text-rose-600"
                        >
                          -
                        </button>
                        <span className="font-bold text-xs text-slate-800 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-slate-600 font-bold hover:text-emerald-600"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Voucher & Checkout */}
              {items.length > 0 && (
                <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                  {/* Voucher Input */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="کد تخفیف (مثال: GREEN)"
                        disabled={voucherApplied}
                        className="w-full bg-white text-xs p-2.5 pr-8 rounded-xl border border-slate-200 outline-none uppercase font-mono"
                      />
                      <Tag className="w-4 h-4 text-slate-400 absolute right-2.5 top-3" />
                    </div>
                    <button
                      onClick={applyVoucher}
                      disabled={voucherApplied}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl disabled:opacity-50"
                    >
                      {voucherApplied ? 'اعمال شد' : 'ثبت'}
                    </button>
                  </div>

                  {/* Summary Rows */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>مجموع کالاها:</span>
                      <span className="font-bold">{rawTotal.toLocaleString('fa-IR')} تومان</span>
                    </div>

                    {voucherDiscount > 0 && (
                      <div className="flex justify-between text-rose-600 font-bold">
                        <span>سود شما از کد تخفیف:</span>
                        <span>-{voucherDiscount.toLocaleString('fa-IR')} تومان</span>
                      </div>
                    )}

                    <div className="flex justify-between text-emerald-800 font-black text-sm pt-2 border-t border-slate-200">
                      <span>مبلغ قابل پرداخت:</span>
                      <span className="text-base text-emerald-700">{finalTotal.toLocaleString('fa-IR')} تومان</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
                  >
                    <span>تکمیل و ثبت نهایی سفارش</span>
                    <ArrowLeft className="w-4 h-4" />
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
