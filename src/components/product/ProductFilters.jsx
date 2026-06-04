import React from 'react';
import { CATEGORIES } from '../../services/mockData';
import { FiFilter, FiRefreshCw, FiStar } from 'react-icons/fi';

export default function ProductFilters({ filters, onChange, onReset }) {
  const handleCategoryChange = (category) => {
    onChange({ ...filters, category });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const handleRatingChange = (rating) => {
    onChange({
      ...filters,
      rating: filters.rating === rating ? '' : rating, // Toggle rating
    });
  };

  const ratingsOptions = [4, 3, 2];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700/80 shadow-sm space-y-6 text-left">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/80">
        <h4 className="font-heading font-bold text-base flex items-center gap-2 text-slate-850 dark:text-white">
          <FiFilter className="text-primary-500 w-4 h-4" /> Filters
        </h4>
        <button
          onClick={onReset}
          className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <FiRefreshCw className="w-3 h-3 animate-hover-spin" /> Clear All
        </button>
      </div>

      {/* Category List */}
      <div>
        <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Categories</h5>
        <div className="space-y-1.5">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`
              w-full text-left px-3 py-2 rounded-lg text-sm transition-all cursor-pointer
              ${filters.category === 'all' || !filters.category
                ? 'bg-primary-50 text-primary-600 font-semibold dark:bg-slate-750 dark:text-primary-400'
                : 'text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-750/50'
              }
            `}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`
                w-full text-left px-3 py-2 rounded-lg text-sm transition-all cursor-pointer
                ${filters.category === cat.id
                  ? 'bg-primary-50 text-primary-600 font-semibold dark:bg-slate-750 dark:text-primary-400'
                  : 'text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-750/50'
                }
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Price Range ($)</h5>
        <div className="flex items-center gap-2.5">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={handlePriceChange}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:border-primary-500 focus:bg-white"
          />
          <span className="text-slate-450 text-xs">to</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={handlePriceChange}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:border-primary-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Customer Rating</h5>
        <div className="space-y-1.5">
          {ratingsOptions.map((stars) => (
            <button
              key={stars}
              onClick={() => handleRatingChange(stars)}
              className={`
                w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 cursor-pointer
                ${Number(filters.rating) === stars
                  ? 'bg-primary-50 text-primary-600 font-semibold dark:bg-slate-750 dark:text-primary-400'
                  : 'text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-750/50'
                }
              `}
            >
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} className={`w-3.5 h-3.5 ${i < stars ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`} />
                ))}
              </div>
              <span className="text-xs">& Up</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
