import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page and preserve original path to return to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Render feedback and redirect unauthorized users to landing page
    toast.error(`Access denied. This page is restricted to ${requiredRole}s.`);
    return <Navigate to={user.role === 'seller' ? '/seller/dashboard' : '/'} replace />;
  }

  return children;
}
