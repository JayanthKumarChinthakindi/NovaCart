import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowRight, FiInfo } from 'react-icons/fi';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/common/Button';

export default function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, total } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckoutRedirect = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      // Save cart path to redirect back after signing in
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <FiShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-905 dark:text-white">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-sm leading-relaxed">
          Looks like you haven't added anything to your cart yet. Head back to the store to find amazing items!
        </p>
        <Link to="/products" className="mt-8">
          <Button icon={FiArrowRight} iconPosition="right" className="px-6 py-3 font-semibold text-sm">
            Start Shopping
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
          Shopping Cart
        </h1>
        <p className="text-xs text-slate-400 mt-1.5">
          Review your items and adjust quantities before checking out.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Cart list (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* Pricing Summary (1/3 width) */}
        <div className="lg:col-span-1">
          <CartSummary onCheckout={handleCheckoutRedirect} />
        </div>

      </div>

    </div>
  );
}
