import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({ children, addToast }) {
 
  const [authState, setAuthState] = useState('checking');

  useEffect(() => {
    const verifySession = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setAuthState('invalid');
        addToast?.('Please login to access this page.', 'error');
        return;
      }

      try {
       
        const res = await fetch('https://dummyjson.com/user/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include',
        });

        if (res.ok) {
        
          setAuthState('valid');
        } else {
         
          throw new Error('Token invalid or expired');
        }
      } catch (err) {
        console.warn('ProtectedRoute – token check failed:', err.message);

       
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
      <div className="auth-checking">
        <div className="spinner" />
        <p>Verifying your session…</p>
      </div>
    );
  }

  
  if (authState === 'invalid') {
    return <Navigate to="/login" replace />;
  }

  
  return children;
}