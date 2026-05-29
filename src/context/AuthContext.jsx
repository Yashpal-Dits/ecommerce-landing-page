import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [impersonatedAdmin, setImpersonatedAdmin] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    const impersonated = localStorage.getItem("impersonatedAdmin");
    if (impersonated) {
      setImpersonatedAdmin(JSON.parse(impersonated));
    }
  }, []);

  const handleAddToCart = () => setCartCount((count) => count + 1);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const value = {
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
