import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';
import Rating from '../common/Rating';

export default function ProductCard({ product }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const { id, name, price, discountPrice, image, rating, reviewCount, stock, sellerName, flashSale } = product;

  const isLiked = isInWishlist(id);
  const activePrice = discountPrice || price;
  const originalPrice = discountPrice ? price : null;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(id);
      toast.info(`${name} removed from Wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${name} added to Wishlist`);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (stock <= 0) {
      toast.error('Out of stock');
      return;
    }
    addToCart(product, 1);
    toast.success(`${name} added to Cart`);
  };

  const isLowStock = stock > 0 && stock <= 15;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 dark:border-slate-700/80 transition-all duration-300">

      {/* Product Image & Overlays */}
      <Link to={`/products/${id}`} className="block relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Wishlist Button Overlay */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-750 backdrop-blur-xs rounded-full shadow-xs text-slate-700 dark:text-slate-200 transition-all cursor-pointer z-10"
          title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {isLiked ? (
            <FaHeart className="w-4 h-4 text-rose-500" />
          ) : (
            <FiHeart className="w-4 h-4 hover:text-rose-500 transition-colors" />
          )}
        </button>

        {/* Sale/Low Stock Badge Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {flashSale && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded-md shadow-xs">
              Sale
            </span>
          )}
          {isLowStock && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white rounded-md shadow-xs">
              Only {stock} Left
            </span>
          )}
          {stock === 0 && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-500 text-white rounded-md shadow-xs">
              Out of stock
            </span>
          )}
        </div>
      </Link>

      {/* Product Metadata Details */}
      <div className="p-4 flex flex-col flex-1 text-left">
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1 truncate">{sellerName}</p>

        <Link to={`/products/${id}`} className="block mb-1.5 flex-1">
          <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 hover:text-primary-600 line-clamp-2 leading-tight">
            {name}
          </h3>
        </Link>

        {/* Rating Stars */}
        <Rating value={rating} text={`(${reviewCount})`} className="mb-3" />

        {/* Footer Pricing & Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50 dark:border-slate-700/50">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              ${activePrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className={`
              p-2.5 rounded-lg transition-all flex items-center justify-center cursor-pointer
              ${stock <= 0
                ? 'bg-slate-150 text-slate-405 cursor-not-allowed dark:bg-slate-750 dark:text-slate-500'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-200/50 dark:shadow-none'
              }
            `}
            title={stock <= 0 ? 'Out of stock' : 'Add to Cart'}
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
