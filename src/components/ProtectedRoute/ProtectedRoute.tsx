import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  addToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, addToast, allowedRoles }: ProtectedRouteProps) {
  const [authState, setAuthState] = useState<'checking' | 'valid' | 'invalid' | 'forbidden'>('checking');

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    const impersonatedAdmin = localStorage.getItem('impersonatedAdmin');

    if (!currentUser) {
      setAuthState('invalid');
      return;
    }

    const user = JSON.parse(currentUser);
    const userRole = user.role || 'customer';
    const effectiveRole = impersonatedAdmin && userRole === 'super_admin' ? 'admin' : userRole;

    if (allowedRoles && !allowedRoles.includes(userRole) && !allowedRoles.includes(effectiveRole)) {
      addToast?.('You do not have permission to access this page.', 'error');
      setAuthState('forbidden');
      return;
    }

    setAuthState('valid');
  }, [allowedRoles]);

  if (authState === 'checking') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        <p className="text-gray-600 font-medium animate-pulse text-sm">Verifying session…</p>
      </div>
    );
  }

  if (authState === 'invalid' || authState === 'forbidden') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
