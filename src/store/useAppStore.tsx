import {create} from "zustand";
import { persist } from "zustand/middleware";
import { AppState} from "../types/index";


export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
     
      currentUser: null,
      impersonatedAdmin: null,
      cartCount: 0,
      cartItems: [],
      toasts: [],

      // -----Auth Actions-----
      setCurrentUser: (user) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('currentUser');
        }
        set({ currentUser: user });
      },

      setImpersonatedAdmin: (admin) => {
        if (admin) {
          localStorage.setItem('impersonatedAdmin', JSON.stringify(admin));
        } else {
          localStorage.removeItem('impersonatedAdmin');
        }
        set({ impersonatedAdmin: admin });
      },

      // ------Cart Actions------
      addToCart: (product) => {
        set((state) => ({
          cartCount: state.cartCount + 1,
          cartItems: product ? [...state.cartItems, product] : state.cartItems,
        }));
      },

      clearCart: () => set({ cartCount: 0, cartItems: [] }),

      // ------Toast Actions -----
      addToast: (message, type = 'success') => {
        const id = Date.now();
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

     
      logout: () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('impersonatedAdmin');
        set({
          currentUser: null,
          impersonatedAdmin: null,
          cartCount: 0,
          cartItems: [],
        });
      },

      isLoggedIn: () => !!get().currentUser,

      getEffectiveRole: () => {
        const { currentUser, impersonatedAdmin } = get();
        if (!currentUser) return 'guest';
        if (impersonatedAdmin && currentUser.role === 'super_admin') {
          return 'admin';
        }
        return currentUser.role;
      },
    }),
    {
      name: 'genz-store', 
      partialize: (state) => ({
        currentUser: state.currentUser,
        impersonatedAdmin: state.impersonatedAdmin,
        cartCount: state.cartCount,
      }),
    }
  )
);


export const useAuth = () => {
  const store = useAppStore();
  return {
    currentUser: store.currentUser,
    impersonatedAdmin: store.impersonatedAdmin,
    setCurrentUser: store.setCurrentUser,
    setImpersonatedAdmin: store.setImpersonatedAdmin,
    addToast: store.addToast,
    logout: store.logout,
    isLoggedIn: store.isLoggedIn,
    getEffectiveRole: store.getEffectiveRole,
  };
};