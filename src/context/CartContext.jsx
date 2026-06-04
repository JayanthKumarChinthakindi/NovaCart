import React, { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { COUPONS } from '../services/mockData';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('nc_cart', []);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Computations
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const applyCoupon = (code) => {
    const cleanCode = code.toUpperCase().trim();
    const coupon = COUPONS.find((c) => c.code === cleanCode);
    if (!coupon) {
      throw new Error('Invalid coupon code');
    }
    if (subtotal < coupon.minSpend) {
      throw new Error(`Minimum spend of $${coupon.minSpend} required for this coupon`);
    }
    setAppliedCoupon(coupon);
    return coupon;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const discount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? (subtotal * appliedCoupon.value) / 100
      : appliedCoupon.value
    : 0;

  // Free shipping over $100 or if FREESHIP coupon is applied
  const shipping = subtotal > 100 || (appliedCoupon && appliedCoupon.code === 'FREESHIP') ? 0 : 15;
  const tax = Math.max(0, (subtotal - discount) * 0.08); // 8% Tax
  const total = Math.max(0, subtotal - discount + shipping + tax);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        itemsCount,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
