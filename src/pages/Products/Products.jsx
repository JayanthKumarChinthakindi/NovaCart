import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiSliders, FiX, FiInbox } from 'react-icons/fi';
import { productService } from '../../services/productService';
import ProductCard from '../../components/product/ProductCard';
import ProductFilters from '../../components/product/ProductFilters';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Modal from '../../components/common/Modal';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state filters with search params
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || '',
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || 'popular',
  });

  // Keep internal filter state synced when URL changes
  useEffect(() => {
    setFilters({
      category: searchParams.get('category') || 'all',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      rating: searchParams.get('rating') || '',
      search: searchParams.get('search') || '',
      sortBy: searchParams.get('sortBy') || 'popular',
    });
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts(filters);
        setProducts(data);
      } catch (err) {
        console.error('Error loading catalog products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  const updateFilters = (newFilters) => {
    const params = {};
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) {
        params[key] = newFilters[key];
      }
    });
    setSearchParams(params);
  };

  const handleFilterChange = (updatedFilters) => {
    updateFilters(updatedFilters);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchVal = e.target.elements.searchInput.value;
    updateFilters({ ...filters, search: searchVal });
  };

  const handleResetFilters = () => {
    updateFilters({ sortBy: 'popular' });
  };

  const removeFilterTag = (key) => {
    const nextFilters = { ...filters };
    if (key === 'category') nextFilters.category = 'all';
    else if (key === 'price') {
      delete nextFilters.minPrice;
      delete nextFilters.maxPrice;
    } else delete nextFilters[key];

    updateFilters(nextFilters);
  };

  const sortingOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest Arrivals' },
  ];

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.minPrice || 
    filters.maxPrice || 
    filters.rating || 
    filters.search;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Search and Sort Header Panel */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8 text-left">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-905 dark:text-white leading-none">
            Product Catalog
          </h1>
          <p className="text-xs text-slate-450 mt-1.5">
            {loading ? 'Searching...' : `${products.length} products found`}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex w-full md:w-auto items-center gap-3">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-205 cursor-pointer"
          >
            <FiSliders className="w-4 h-4" /> Filters
          </button>

          {/* Search Input inside Catalog */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 md:w-64">
            <input
              type="text"
              name="searchInput"
              defaultValue={filters.search}
              placeholder="Search in results..."
              className="w-full pl-3 pr-9 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-slate-400 cursor-pointer">
              <FiSearch className="w-4 h-4" />
            </button>
          </form>

          {/* Sort Selector */}
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-205 outline-hidden"
          >
            {sortingOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block">
          <ProductFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Catalog List */}
        <div className="lg:col-span-3 space-y-6 text-left">
          
          {/* Filter Chips Row */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400 font-semibold mr-1">Active Filters:</span>
              
              {filters.search && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 dark:bg-slate-800 border border-primary-200 dark:border-slate-700 text-xs font-semibold text-primary-700 dark:text-primary-400 rounded-full">
                  Query: {filters.search}
                  <button onClick={() => removeFilterTag('search')} className="hover:text-rose-500 cursor-pointer"><FiX className="w-3.5 h-3.5" /></button>
                </span>
              )}

              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 dark:bg-slate-800 border border-primary-200 dark:border-slate-700 text-xs font-semibold text-primary-700 dark:text-primary-400 rounded-full capitalize">
                  Category: {filters.category}
                  <button onClick={() => removeFilterTag('category')} className="hover:text-rose-500 cursor-pointer"><FiX className="w-3.5 h-3.5" /></button>
                </span>
              )}

              {(filters.minPrice || filters.maxPrice) && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 dark:bg-slate-800 border border-primary-200 dark:border-slate-700 text-xs font-semibold text-primary-700 dark:text-primary-400 rounded-full">
                  Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                  <button onClick={() => removeFilterTag('price')} className="hover:text-rose-500 cursor-pointer"><FiX className="w-3.5 h-3.5" /></button>
                </span>
              )}

              {filters.rating && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 dark:bg-slate-800 border border-primary-200 dark:border-slate-700 text-xs font-semibold text-primary-700 dark:text-primary-400 rounded-full">
                  Rating: {filters.rating}★ & Up
                  <button onClick={() => removeFilterTag('rating')} className="hover:text-rose-500 cursor-pointer"><FiX className="w-3.5 h-3.5" /></button>
                </span>
              )}
            </div>
          )}

          {/* Products Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <SkeletonLoader type="product-card" count={6} />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl p-16 text-center max-w-lg mx-auto flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 text-slate-400 rounded-full flex items-center justify-center mb-4">
                <FiInbox className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-800 dark:text-white">
                No products found
              </h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                We couldn't find matches for your selection. Try relaxing your filters, widening the price range, or searching for other keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-5 py-2.5 bg-primary-600 hover:bg-primary-750 text-white rounded-lg text-sm font-semibold shadow-md shadow-primary-200/50 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Mobile filter slider overlay */}
      <Modal
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        title="Filter & Sort"
        size="sm"
      >
        <ProductFilters
          filters={filters}
          onChange={(f) => {
            handleFilterChange(f);
            setIsMobileFiltersOpen(false);
          }}
          onReset={() => {
            handleResetFilters();
            setIsMobileFiltersOpen(false);
          }}
        />
      </Modal>

    </div>
  );
}
