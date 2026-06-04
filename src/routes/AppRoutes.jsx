import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { BiLoaderAlt } from 'react-icons/bi';

// Loading fallback spinner component
function PageLoader() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-3.5">
      <BiLoaderAlt className="animate-spin text-primary-600 w-10 h-10" />
      <span className="text-sm text-slate-400 font-semibold">Loading Page...</span>
    </div>
  );
}

// Lazy loaded page components
const Home = lazy(() => import('../pages/Home/Home'));
const Products = lazy(() => import('../pages/Products/Products'));
const ProductDetails = lazy(() => import('../pages/Products/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Wishlist = lazy(() => import('../pages/Wishlist/Wishlist'));
const Checkout = lazy(() => import('../pages/Checkout/Checkout'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const Orders = lazy(() => import('../pages/Profile/Orders'));

// Seller lazy loaded page components
const SellerDashboard = lazy(() => import('../pages/Seller/SellerDashboard'));
const SellerProducts = lazy(() => import('../pages/Seller/SellerProducts'));
const SellerAddProduct = lazy(() => import('../pages/Seller/SellerAddProduct'));
const SellerAnalytics = lazy(() => import('../pages/Seller/SellerAnalytics'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        
        {/* Public Buyer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Buyer Routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute requiredRole="buyer">
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute requiredRole="buyer">
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Protected Seller Routes */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute requiredRole="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/products"
          element={
            <ProtectedRoute requiredRole="seller">
              <SellerProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/add-product"
          element={
            <ProtectedRoute requiredRole="seller">
              <SellerAddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/analytics"
          element={
            <ProtectedRoute requiredRole="seller">
              <SellerAnalytics />
            </ProtectedRoute>
          }
        />

        {/* Catch-all Wildcard Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
}
