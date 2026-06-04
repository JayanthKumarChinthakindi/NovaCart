import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../common/Input';
import Button from '../common/Button';

export default function AddressForm({ onSubmit, savedAddresses = [], defaultValues }) {
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
    return defaultAddr ? defaultAddr.id : 'new';
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'India',
    },
  });

  const onFormSubmit = (data) => {
    if (selectedAddressId !== 'new') {
      const selected = savedAddresses.find((a) => a.id === selectedAddressId);
      onSubmit(selected);
    } else {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-left">
      
      {/* Saved Addresses list */}
      {savedAddresses.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-350">Choose a Shipping Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {savedAddresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddressId(addr.id)}
                className={`
                  border rounded-xl p-4 cursor-pointer transition-all flex flex-col text-xs leading-normal
                  ${selectedAddressId === addr.id
                    ? 'border-primary-500 bg-primary-50/20 ring-2 ring-primary-500/10'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold uppercase tracking-wider text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-650 dark:text-slate-300">
                    {addr.type}
                  </span>
                  {addr.isDefault && <span className="text-[10px] text-emerald-500 font-bold">Default</span>}
                </div>
                <p className="font-semibold text-slate-800 dark:text-white mb-0.5">{addr.street}</p>
                <p className="text-slate-500 dark:text-slate-400">{addr.city}, {addr.state} - {addr.zip}</p>
                <p className="text-slate-500 dark:text-slate-400 font-semibold">{addr.country}</p>
              </div>
            ))}
            
            <div
              onClick={() => setSelectedAddressId('new')}
              className={`
                border border-dashed rounded-xl p-4 cursor-pointer transition-all flex items-center justify-center text-xs font-semibold
                ${selectedAddressId === 'new'
                  ? 'border-primary-500 bg-primary-50/20 text-primary-600'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:border-slate-405'
                }
              `}
            >
              + Ship to a New Address
            </div>
          </div>
        </div>
      )}

      {/* New Address Form Fields */}
      {selectedAddressId === 'new' && (
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/80">
          <h4 className="font-semibold text-sm text-slate-800 dark:text-white">Shipping Address Details</h4>
          
          <Input
            label="Street Address"
            id="street"
            placeholder="123 Main St, Apartment 4B"
            error={errors.street}
            {...register('street', { required: 'Street address is required' })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              id="city"
              placeholder="e.g. Bengaluru"
              error={errors.city}
              {...register('city', { required: 'City is required' })}
            />
            <Input
              label="State / Province"
              id="state"
              placeholder="e.g. Karnataka"
              error={errors.state}
              {...register('state', { required: 'State is required' })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Zip / Postal Code"
              id="zip"
              placeholder="e.g. 560001"
              error={errors.zip}
              {...register('zip', { 
                required: 'Zip code is required',
                pattern: { value: /^\d{5,6}$/, message: 'Please enter a valid zip code' }
              })}
            />
            <Input
              label="Country"
              id="country"
              placeholder="e.g. India"
              error={errors.country}
              {...register('country', { required: 'Country is required' })}
            />
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <Button type="submit" className="px-6 py-2.5">
          Continue to Payment
        </Button>
      </div>

    </form>
  );
}
