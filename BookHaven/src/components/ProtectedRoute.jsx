import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'rwgn1.jayanti.rt@gmail.com';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const reduxUser = useSelector((state) => state.user.user);
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('auth-user'));
    } catch {
      return null;
    }
  })();
  const user = reduxUser || storedUser;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.email !== ADMIN_EMAIL && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
