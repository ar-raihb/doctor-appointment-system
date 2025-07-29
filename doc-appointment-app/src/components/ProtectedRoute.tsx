
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, clearCurrentUser } from '@/data/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'doctor';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      navigate('/login');
      return;
    }

    // Prevent back navigation by clearing history
    const handlePopState = () => {
      clearCurrentUser();
      navigate('/login', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, requiredRole]);

  const user = getCurrentUser();
  
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
