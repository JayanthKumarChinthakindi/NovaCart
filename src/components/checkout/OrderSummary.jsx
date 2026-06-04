import React from 'react';
import Button from '../common/Button';

export default function OrderSummary({
  cartItems,
  shippingAddress,
  paymentMethod,
  pricing,
  onPlaceOrder,
  onBack,
  isLoading,
}) {
  const { subtotal, discount, shipping, tax, total } = pricing;

  return (
    <div className="space-y-6 text-left">
      
      {/* Items List Summary */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-slate-805 dark:text-slate-300">Items in Order</h4>
        <div className="divide-y divide-slate-100 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl overflow-hidden">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3.5 gap-4">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded bg-slate-100" />
                <div>
                  <p className="text-xs font-semibold text-slate-850 dark:text-white line-clamp-1">{item.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Quantity: {item.quantity} × ${(item.discountPrice || item.price).toFixed(2)}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-850 dark:text-white">
                ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Address */}
        <div className="border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800 rounded-xl p-4">
          <h5 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Shipping Destination</h5>
          {shippingAddress.street ? (
            <div className="text-xs space-y-0.5 text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">{shippingAddress.street}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zip}</p>
              <p className="font-semibold">{shippingAddress.country}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Default shipping destination</p>
          )}
        </div>

        {/* Payment */}
        <div className="border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800 rounded-xl p-4">
          <h5 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Payment Details</h5>
          <div className="text-xs space-y-0.5 text-slate-700 dark:text-slate-300 capitalize">
            <p className="font-bold text-slate-905 dark:text-white">
              {paymentMethod.method === 'card' ? 'Credit / Debit Card' : paymentMethod.method}
            </p>
            {paymentMethod.method === 'card' && (
              <p className="text-slate-400">Card ending in **** {paymentMethod.details.cardNumber?.slice(-4) || 'XXXX'}</p>
            )}
            {paymentMethod.method === 'upi' && (
              <p className="text-slate-400">VPA: {paymentMethod.details.upiId}</p>
            )}
            {paymentMethod.method === 'cod' && (
              <p className="text-slate-400">Pay cash on arrival</p>
            )}
          </div>
        </div>

      </div>

      {/* Review Costs */}
      <div className="border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800 rounded-xl p-5 space-y-3.5 text-sm">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Items Subtotal</span>
          <span className="font-semibold text-slate-800 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-rose-500 font-medium">
            <span>Coupon Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Shipping Charge</span>
          <span className="font-semibold text-slate-850 dark:text-white">
            {shipping === 0 ? <span className="text-emerald-500 font-bold uppercase text-xs">Free</span> : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Estimated Sales Tax</span>
          <span className="font-semibold text-slate-850 dark:text-white">${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-slate-100 dark:bg-slate-700 my-2" />
        <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
          <span>Grand Total</span>
          <span className="text-lg text-primary-600 dark:text-primary-400">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex justify-between items-center">
        <button
          type="button"
          disabled={isLoading}
          onClick={onBack}
          className="text-sm font-semibold text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white disabled:opacity-50 transition-colors cursor-pointer"
        >
          Go Back
        </button>
        <Button
          onClick={onPlaceOrder}
          isLoading={isLoading}
          className="px-6 py-2.5"
        >
          Place Order
        </Button>
      </div>

    </div>
  );
}
