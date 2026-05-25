import { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children, addToast, allowedRoles }) {
  const [authState, setAuthState] = useState('checking');
  const [userRole, setUserRole] = useState(null);
  const hasChecked = useRef(false); 
  useEffect(() => {
  
    if (hasChecked.current) return;
    hasChecked.current = true;
    const verifySession = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const currentUser = localStorage.getItem('currentUser');
      
      if (!accessToken) {
        setAuthState('invalid');
        addToast?.('Please login to access this page.', 'error');
        return;
      }

      // Check role if allowedRoles is specified
      if (allowedRoles && currentUser) {
        const user = JSON.parse(currentUser);
        const userRole = user.role || 'customer';
        setUserRole(userRole);
        
        if (!allowedRoles.includes(userRole)) {
          setAuthState('forbidden');
          addToast?.('You do not have permission to access this page.', 'error');
          return;
        }
      }

      try {
        const res = await fetch('https://dummyjson.com/user/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          setAuthState('valid');
        } else {
          throw new Error('Token invalid');
        }
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser');
        addToast?.('Session expired. Please login again.', 'error');
        setAuthState('invalid');
      }
    };
    verifySession();
  }, []); 
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
  return children;
}