import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowRight, FiInbox } from 'react-icons/fi';
import { WishlistContext } from '../../context/WishlistContext';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, moveToCart } = useContext(WishlistContext);

  const handleMoveToCart = (product) => {
    if (product.stock <= 0) {
      toast.error('This item is currently out of stock.');
      return;
    }
    moveToCart(product);
    toast.success(`${product.name} moved to Cart!`);
  };

  const handleRemove = (productId, name) => {
    removeFromWishlist(productId);
    toast.info(`${name} removed from Wishlist`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <FiHeart className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-905 dark:text-white">
          Your Wishlist is Empty
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-sm leading-relaxed">
          Save your favorite products here to keep track of prices, availability, and quickly purchase them later.
        </p>
        <Link to="/products" className="mt-8">
          <Button icon={FiArrowRight} iconPosition="right" className="px-6 py-3 font-semibold text-sm">
            Explore Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-905 dark:text-white leading-none">
          My Wishlist
        </h1>
        <p className="text-xs text-slate-400 mt-1.5">
          You have {wishlistItems.length} products saved in your wishlist.
        </p>
      </div>

      {/* Grid of Wishlist items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => {
          const activePrice = product.discountPrice || product.price;
          const originalPrice = product.discountPrice ? product.price : null;

          return (
            <div
              key={product.id}
              className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  {product.stock === 0 && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase bg-slate-550 text-white rounded">
                      Out of stock
                    </span>
                  )}
                </Link>

                {/* Info */}
                <div className="p-4 space-y-1.5">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{product.sellerName}</p>
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="font-semibold text-sm text-slate-805 dark:text-slate-100 hover:text-primary-600 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      ${activePrice.toFixed(2)}
                    </span>
                    {originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions row */}
              <div className="p-4 border-t border-slate-50 dark:border-slate-700/50 flex gap-2">
                <Button
                  onClick={() => handleMoveToCart(product)}
                  disabled={product.stock <= 0}
                  variant="outline"
                  size="sm"
                  icon={FiShoppingCart}
                  className="flex-1 py-2 text-xs"
                >
                  Buy Now
                </Button>
                <button
                  onClick={() => handleRemove(product.id, product.name)}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                  title="Remove item"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
