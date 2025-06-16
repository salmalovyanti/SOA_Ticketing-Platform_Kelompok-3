import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />; // arahkan ke home jika bukan admin
  }

  return children;
};

export default PrivateRoute;