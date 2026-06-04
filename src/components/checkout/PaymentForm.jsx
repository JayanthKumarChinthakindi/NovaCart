import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCreditCard, FiSmartphone, FiDollarSign } from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';

export default function PaymentForm({ onSubmit, onBack, defaultValues }) {
  const [method, setMethod] = useState(defaultValues?.method || 'card');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues?.details || {
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      upiId: '',
    },
  });

  const onFormSubmit = (data) => {
    onSubmit({ method, details: data });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-left">
      
      {/* Payment Methods Toggles */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-350">Select Payment Method</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Card */}
          <div
            onClick={() => setMethod('card')}
            className={`
              border rounded-xl p-4 cursor-pointer transition-all flex items-center gap-3
              ${method === 'card'
                ? 'border-primary-500 bg-primary-50/20'
                : 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-805 hover:border-slate-300'
              }
            `}
          >
            <FiCreditCard className={`w-5 h-5 ${method === 'card' ? 'text-primary-600' : 'text-slate-400'}`} />
            <span className="text-sm font-semibold dark:text-white">Credit/Debit Card</span>
          </div>

          {/* UPI */}
          <div
            onClick={() => setMethod('upi')}
            className={`
              border rounded-xl p-4 cursor-pointer transition-all flex items-center gap-3
              ${method === 'upi'
                ? 'border-primary-500 bg-primary-50/20'
                : 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-850 hover:border-slate-300'
              }
            `}
          >
            <FiSmartphone className={`w-5 h-5 ${method === 'upi' ? 'text-primary-600' : 'text-slate-400'}`} />
            <span className="text-sm font-semibold dark:text-white">UPI / Instant Pay</span>
          </div>

          {/* COD */}
          <div
            onClick={() => setMethod('cod')}
            className={`
              border rounded-xl p-4 cursor-pointer transition-all flex items-center gap-3
              ${method === 'cod'
                ? 'border-primary-500 bg-primary-50/20'
                : 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-850 hover:border-slate-300'
              }
            `}
          >
            <FiDollarSign className={`w-5 h-5 ${method === 'cod' ? 'text-primary-600' : 'text-slate-400'}`} />
            <span className="text-sm font-semibold dark:text-white">Cash on Delivery</span>
          </div>

        </div>
      </div>

      {/* Credit Card Inputs */}
      {method === 'card' && (
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/80">
          <Input
            label="Name on Card"
            id="cardName"
            placeholder="John Doe"
            error={errors.cardName}
            {...register('cardName', { required: method === 'card' ? 'Cardholder name is required' : false })}
          />

          <Input
            label="Card Number"
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            error={errors.cardNumber}
            {...register('cardNumber', { 
              required: method === 'card' ? 'Card number is required' : false,
              pattern: { value: /^\d{16}$/, message: 'Please enter a valid 16-digit card number' }
            })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              id="cardExpiry"
              placeholder="MM/YY"
              error={errors.cardExpiry}
              {...register('cardExpiry', { 
                required: method === 'card' ? 'Expiry date is required' : false,
                pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Expiry must be in MM/YY format' }
              })}
            />
            <Input
              label="CVV"
              id="cardCvv"
              type="password"
              placeholder="123"
              maxLength={3}
              error={errors.cardCvv}
              {...register('cardCvv', { 
                required: method === 'card' ? 'CVV is required' : false,
                pattern: { value: /^\d{3}$/, message: 'Please enter a 3-digit CVV' }
              })}
            />
          </div>
        </div>
      )}

      {/* UPI Inputs */}
      {method === 'upi' && (
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/80">
          <Input
            label="UPI Address"
            id="upiId"
            placeholder="e.g. jayanth@upi"
            error={errors.upiId}
            {...register('upiId', { 
              required: method === 'upi' ? 'UPI Address is required' : false,
              pattern: { value: /^[\w.-]+@[\w.-]+$/, message: 'Please enter a valid UPI address' }
            })}
          />
        </div>
      )}

      {/* COD Message */}
      {method === 'cod' && (
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-xl leading-relaxed text-xs text-slate-500">
          🔔 <span className="font-semibold text-slate-700 dark:text-slate-350">Cash on Delivery Info:</span> You will pay the carrier with cash when they deliver your parcel. Please ensure you have the exact cash amount ready.
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-4 flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
        >
          Go Back
        </button>
        <Button type="submit" className="px-6 py-2.5">
          Continue to Review
        </Button>
      </div>

    </form>
  );
}
