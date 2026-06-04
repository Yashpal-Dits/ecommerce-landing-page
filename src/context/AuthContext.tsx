import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { ToastItem, User, AuthContextValue } from '@/types';


const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [impersonatedAdmin, setImpersonatedAdmin] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    const impersonated = localStorage.getItem('impersonatedAdmin');
    if (impersonated) {
      setImpersonatedAdmin(JSON.parse(impersonated));
    }
  }, []);

  const handleAddToCart = useCallback(() => setCartCount((count) => count + 1), []);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const value: AuthContextValue = {
    currentUser,
    setCurrentUser,
    cartCount,
    setCartCount,
    toasts,
    setToasts,
    addToast,
    removeToast,
    impersonatedAdmin,
    setImpersonatedAdmin,
    handleAddToCart,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
