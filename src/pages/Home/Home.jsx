import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPercent, FiTruck, FiShield, FiClock, FiActivity } from 'react-icons/fi';
import { productService } from '../../services/productService';
import { CATEGORIES } from '../../services/mockData';
import ProductCard from '../../components/product/ProductCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Button from '../../components/common/Button';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 12 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await productService.getProducts();
        setFeaturedProducts(allProducts.filter((p) => p.featured).slice(0, 4));
        setFlashSales(allProducts.filter((p) => p.flashSale).slice(0, 4));
      } catch (err) {
        console.error('Error fetching homepage products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Simple countdown timer for flash deals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (t) => String(t).padStart(2, '0');

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-955 dark:from-slate-950 dark:to-indigo-950 text-white rounded-3xl mt-4 mx-4 px-8 py-16 sm:px-12 md:py-24 text-left">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Floating circles */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/25 border border-indigo-400/30 text-indigo-300">
            <FiPercent className="w-3.5 h-3.5" /> Special Season Launch
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl leading-tight text-white tracking-tight">
            Curated Tech & Styles for You.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Discover verified seller products, exclusive flash discounts, and enjoy free shipping on orders over $100.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/products">
              <Button size="lg" icon={FiArrowRight} iconPosition="right" className="px-6 font-semibold py-3">
                Shop Collection
              </Button>
            </Link>
            <Link to="/register?role=seller">
              <Button size="lg" variant="outline" className="px-6 py-3 border-white/20 text-white hover:bg-white/10 dark:hover:bg-white/5 font-semibold">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Value Props */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs text-left">
          <div className="p-3 bg-indigo-50 dark:bg-slate-750 text-primary-600 dark:text-primary-400 rounded-xl">
            <FiTruck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-850 dark:text-white text-sm">Free Global Shipping</h4>
            <p className="text-xs text-slate-400 mt-0.5">Complimentary express shipping on all orders over $100.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs text-left">
          <div className="p-3 bg-emerald-50 dark:bg-slate-750 text-emerald-600 dark:text-emerald-450 rounded-xl">
            <FiShield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-850 dark:text-white text-sm">Secure Payment Gateway</h4>
            <p className="text-xs text-slate-400 mt-0.5">Shop with confidence using SSL-protected card, UPI, or cash payment processing.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-xs text-left">
          <div className="p-3 bg-amber-50 dark:bg-slate-750 text-amber-500 dark:text-amber-400 rounded-xl">
            <FiClock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-850 dark:text-white text-sm">24/7 Dedicated Support</h4>
            <p className="text-xs text-slate-400 mt-0.5">Get round-the-clock help with your orders or merchant dashboards.</p>
          </div>
        </div>
      </section>

      {/* 3. Categories List */}
      <section className="max-w-7xl mx-auto px-6 text-left">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-slate-905 dark:text-white">Shop by Category</h2>
            <p className="text-xs text-slate-400 mt-0.5">Find whatever you need organized by niche departments.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-primary-650 hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-5/6 shadow-xs border border-slate-100 dark:border-slate-800"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-colors" />
              <div className="absolute bottom-4 left-4 text-white z-10">
                <span className="font-heading font-bold text-base block">{cat.name}</span>
                <span className="text-[10px] text-slate-205 flex items-center gap-1 mt-0.5 font-semibold group-hover:translate-x-1 transition-transform">
                  Explore <FiArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Flash Deals Section */}
      <section className="bg-amber-500/10 dark:bg-amber-500/5 py-12 px-6 border-y border-amber-500/20 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-heading font-extrabold text-2xl text-amber-600 dark:text-amber-400 flex items-center gap-2">
                ⚡ Flash Deals
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">High-quality items heavily discounted for a limited window.</p>
            </div>
            
            {/* Timer */}
            <div className="flex items-center gap-2 text-sm font-semibold bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-amber-550/20 shadow-xs">
              <span className="text-slate-400 text-xs">Ending in:</span>
              <div className="flex gap-1.5 font-mono text-amber-500 font-extrabold">
                <span className="bg-amber-50 dark:bg-slate-900 px-2 py-0.5 rounded">{formatTime(timeLeft.hours)}</span>:
                <span className="bg-amber-50 dark:bg-slate-900 px-2 py-0.5 rounded">{formatTime(timeLeft.minutes)}</span>:
                <span className="bg-amber-50 dark:bg-slate-900 px-2 py-0.5 rounded">{formatTime(timeLeft.seconds)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <SkeletonLoader type="product-card" count={4} />
            ) : (
              flashSales.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. Featured/Trending Products */}
      <section className="max-w-7xl mx-auto px-6 text-left">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-slate-905 dark:text-white">Featured Products</h2>
            <p className="text-xs text-slate-400 mt-0.5">Top picks handpicked by our curators for quality and value.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-primary-650 hover:underline">
            View Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <SkeletonLoader type="product-card" count={4} />
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

    </div>
  );
}
