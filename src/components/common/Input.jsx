import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  className = '',
  id,
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col w-full text-left ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`
          px-3.5 py-2 rounded-lg border text-sm transition-all duration-200 w-full
          bg-white text-slate-900 border-slate-300
          focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
          dark:bg-slate-900 dark:text-white dark:border-slate-700
          dark:focus:border-primary-400 dark:focus:ring-2 dark:focus:ring-primary-500/25
          ${error ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500 dark:border-rose-500 dark:focus:ring-rose-500/20' : ''}
        `}
        {...props}
      />
      {error && (
        <span className="mt-1 text-xs text-rose-500 font-medium">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
