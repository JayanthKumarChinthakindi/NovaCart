import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { id, name, price, discountPrice, image, quantity, stock } = item;
  const activePrice = discountPrice || price;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-xl gap-4 text-left">
      
      {/* Image & Title Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link to={`/products/${id}`} className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </Link>
        <div className="min-w-0 flex-1 sm:max-w-xs">
          <Link to={`/products/${id}`} className="font-semibold text-sm text-slate-850 dark:text-slate-100 hover:text-primary-600 line-clamp-2">
            {name}
          </Link>
          <p className="text-xs text-slate-400 mt-1">In Stock: {stock}</p>
        </div>
      </div>

      {/* Adjuster Controls */}
      <div className="flex items-center justify-between sm:justify-start gap-8 w-full sm:w-auto">
        
        {/* Quantity buttons */}
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <button
            onClick={() => onDecrease(id)}
            disabled={quantity <= 1}
            className="p-2 bg-slate-50 dark:bg-slate-905 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-all cursor-pointer"
          >
            <FiMinus className="w-3.5 h-3.5" />
          </button>
          <span className="px-4 text-sm font-semibold text-slate-800 dark:text-white bg-white dark:bg-slate-900">
            {quantity}
          </span>
          <button
            onClick={() => onIncrease(id)}
            disabled={quantity >= stock}
            className="p-2 bg-slate-50 dark:bg-slate-905 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-all cursor-pointer"
          >
            <FiPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Price calc */}
        <div className="text-right min-w-[70px]">
          <p className="font-extrabold text-sm text-slate-900 dark:text-white">
            ${(activePrice * quantity).toFixed(2)}
          </p>
          {quantity > 1 && (
            <p className="text-[10px] text-slate-400 mt-0.5">
              ${activePrice.toFixed(2)} each
            </p>
          )}
        </div>

        {/* Delete */}
        <button
          onClick={() => onRemove(id)}
          className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
          title="Remove item"
        >
          <FiTrash2 className="w-4.5 h-4.5" />
        </button>

      </div>
    </div>
  );
}
