import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { FiTag, FiX } from 'react-icons/fi';
import Button from '../common/Button';

export default function CartSummary({ onCheckout }) {
  const {
    subtotal,
    discount,
    shipping,
    tax,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useContext(CartContext);

  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setError('');
    if (!couponCode.trim()) return;
    try {
      applyCoupon(couponCode);
      toast.success(`Coupon "${couponCode.toUpperCase()}" applied!`);
      setCouponCode('');
    } catch (err) {
      setError(err.message || 'Invalid coupon code');
      toast.error(err.message || 'Failed to apply coupon');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.info('Coupon code removed');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700/80 shadow-sm space-y-6 text-left">
      <h3 className="font-heading font-bold text-lg text-slate-850 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-750">
        Order Summary
      </h3>

      {/* Pricing breakdown */}
      <div className="space-y-3.5 text-sm text-slate-600 dark:text-slate-350">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-850 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-rose-500 font-medium">
            <span>Discount {appliedCoupon && `(${appliedCoupon.code})`}</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping Cost</span>
          <span className="font-semibold text-slate-850 dark:text-white">
            {shipping === 0 ? (
              <span className="text-emerald-500 font-bold uppercase text-xs">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Sales Tax (8%)</span>
          <span className="font-semibold text-slate-850 dark:text-white">${tax.toFixed(2)}</span>
        </div>

        {shipping > 0 && subtotal < 100 && (
          <p className="text-[10px] bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-105 dark:border-slate-750 text-slate-450 leading-relaxed">
            💡 Add <span className="font-bold text-slate-700 dark:text-white">${(100 - subtotal).toFixed(2)}</span> more to qualify for <span className="text-emerald-500 font-semibold">Free Shipping</span>.
          </p>
        )}

        <div className="h-px bg-slate-100 dark:bg-slate-700 my-4" />

        <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
          <span>Estimated Total</span>
          <span className="text-lg text-primary-600 dark:text-primary-400">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Coupon input */}
      <div className="pt-2">
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg text-emerald-800 dark:text-emerald-350 text-xs font-semibold">
            <span className="flex items-center gap-1.5"><FiTag className="w-3.5 h-3.5" /> Active: {appliedCoupon.code}</span>
            <button
              onClick={handleRemoveCoupon}
              className="text-slate-400 hover:text-slate-650 cursor-pointer"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code (e.g. WELCOME10)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-700 rounded-lg focus:border-primary-500 focus:bg-white dark:text-white"
            />
            <Button type="submit" variant="secondary" className="px-4 py-2">
              Apply
            </Button>
          </form>
        )}
        {error && <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>}
      </div>

      {/* Checkout button */}
      <Button
        onClick={onCheckout}
        className="w-full py-3 text-sm font-semibold tracking-wide"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
