import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FiMail, FiLock, FiArrowRight, FiBriefcase, FiUser } from 'react-icons/fi';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [roleTab, setRoleTab] = useState('buyer'); // 'buyer' or 'seller'
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Retrieve matching redirect path from routing state
  const from = location.state?.from?.pathname || (roleTab === 'seller' ? '/seller/dashboard' : '/');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    setApiError('');
    setLoading(true);
    try {
      const loggedUser = await login(data.email, data.password);
      
      // Verification check on role consistency
      if (loggedUser.role !== roleTab) {
        toast.warning(`Logged in successfully, but redirecting to your appropriate ${loggedUser.role} panel.`);
        if (loggedUser.role === 'seller') {
          navigate('/seller/dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.success(`Welcome back, ${loggedUser.name}!`);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setApiError(err.message || 'Incorrect email or password.');
      toast.error(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-md">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading font-extrabold text-3xl text-slate-905 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
              Sign up free
            </Link>
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
          <button
            type="button"
            onClick={() => setRoleTab('buyer')}
            className={`
              flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer
              ${roleTab === 'buyer'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-205'
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
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-205'
              }
            `}
          >
            <FiBriefcase className="w-4 h-4" /> Seller Portal
          </button>
        </div>

        {/* Form Error Notification */}
        {apiError && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl text-left text-xs font-semibold text-rose-600 dark:text-rose-450 leading-relaxed">
            ⚠️ {apiError}
          </div>
        )}

        {/* Demo Credentials Tip */}
        <div className="p-3 bg-indigo-50 dark:bg-slate-750/30 rounded-xl text-left text-xs text-slate-600 dark:text-slate-400 leading-normal">
          💡 <span className="font-semibold text-primary-700 dark:text-primary-400">Demo Login:</span> Use <span className="font-mono font-bold">{roleTab === 'buyer' ? 'buyer@novacart.com' : 'seller@novacart.com'}</span> and password <span className="font-mono font-bold">password123</span>.
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="name@company.com"
            error={errors.email}
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            error={errors.password}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />

          <div className="flex items-center justify-between text-xs font-medium">
            <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              Remember me
            </label>
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            icon={FiArrowRight}
            iconPosition="right"
            className="w-full py-3 text-sm font-semibold tracking-wide"
          >
            Access Account
          </Button>

        </form>

      </div>
    </div>
  );
}
