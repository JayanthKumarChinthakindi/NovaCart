import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FiUser, FiBriefcase, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [roleTab, setRoleTab] = useState('buyer');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync tab with role query param if present
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'seller') {
      setRoleTab('seller');
    } else {
      setRoleTab('buyer');
    }
  }, [searchParams]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      storeName: '',
      description: '',
    }
  });

  const watchPassword = watch('password');

  const onSubmit = async (data) => {
    setApiError('');
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: roleTab,
        storeName: roleTab === 'seller' ? data.storeName : undefined,
        description: roleTab === 'seller' ? data.description : undefined,
      };
      
      const newUser = await registerUser(payload);
      toast.success(`Account created successfully! Welcome, ${newUser.name}`);
      
      if (roleTab === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setApiError(err.message || 'Registration failed. Email might be in use.');
      toast.error(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-md w-full space-y-7 bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-md">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading font-extrabold text-3xl text-slate-905 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
              Log in instead
            </Link>
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-105 dark:bg-slate-900 rounded-xl">
          <button
            type="button"
            onClick={() => setRoleTab('buyer')}
            className={`
              flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer
              ${roleTab === 'buyer'
                ? 'bg-white dark:bg-slate-800 text-slate-905 dark:text-white shadow-xs'
                : 'text-slate-505 hover:text-slate-800 dark:hover:text-slate-205'
              }
            `}
          >
            <FiUser className="w-4 h-4" /> Buyer Portal
          </button>
          <button
            type="button"
            onClick={() => setRoleTab('seller')}
            className={`
              flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer
              ${roleTab === 'seller'
                ? 'bg-white dark:bg-slate-800 text-slate-905 dark:text-white shadow-xs'
                : 'text-slate-505 hover:text-slate-800 dark:hover:text-slate-205'
              }
            `}
          >
            <FiBriefcase className="w-4 h-4" /> Seller Portal
          </button>
        </div>

        {/* Error Banners */}
        {apiError && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl text-left text-xs font-semibold text-rose-600 dark:text-rose-455">
            ⚠️ {apiError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <Input
            label="Full Name"
            id="name"
            placeholder="e.g. Jayanth Kumar"
            error={errors.name}
            {...register('name', { required: 'Full name is required' })}
          />

          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="name@example.com"
            error={errors.email}
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />

          {/* Conditional Seller Fields */}
          {roleTab === 'seller' && (
            <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-750">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left">Store Setup Details</h4>
              <Input
                label="Store Name"
                id="storeName"
                placeholder="e.g. AeroSound Devices Store"
                error={errors.storeName}
                {...register('storeName', { required: roleTab === 'seller' ? 'Store name is required' : false })}
              />
              <div className="flex flex-col text-left">
                <label htmlFor="description" className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Store Description
                </label>
                <textarea
                  id="description"
                  placeholder="Tell customers about your brand..."
                  rows={2}
                  className="px-3.5 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-hidden"
                  {...register('description')}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              error={errors.password}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Must be at least 6 characters' }
              })}
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword}
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: (value) => value === watchPassword || 'Passwords do not match'
              })}
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            icon={FiCheckCircle}
            className="w-full py-3 mt-4 text-sm font-semibold tracking-wide"
          >
            Create Free Account
          </Button>

        </form>

      </div>
    </div>
  );
}
