import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ToastContainer from "./components/Toast/ToastContainer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CustomerLayout from "./components/Layouts/CustomerLayout";
import AdminLayout, { AdminDashboardStats } from "./components/Layouts/AdminLayout";
import SuperAdminLayout, { SuperAdminDashboardStats } from "./components/Layouts/SuperAdminLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SettingsPage from "./pages/Settings";
import CustomerRoutes from "./routes/customerRoutes";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminUsers from "./pages/AdminUsers";
import SuperAdminAnalytics from "./pages/SuperAdminAnalytics";
import SuperAdminUsers from "./pages/SuperAdminUsers";
import { useAppStore } from "./store/useAppStore";
import { fetchUserById } from "./api";

const AppRoutes = () => {
  const { currentUser, setCurrentUser, addToast, impersonatedAdmin, logout } = useAppStore();
  const navigate = useNavigate();
  const [isVerifyingUser, setIsVerifyingUser] = useState(true);
  const hasVerifiedRef = useRef(false);

  // ── Verify current user against API on app load ──
  useEffect(() => {
    // StrictMode double-mounts in dev — skip the second run
    if (hasVerifiedRef.current) return;
    hasVerifiedRef.current = true;

    const verifyUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

      if (!storedUser || !storedUser.id) {
        setCurrentUser(null);
        setIsVerifyingUser(false);
        return;
      }

      try {
        const freshUser = await fetchUserById(storedUser.id);

        if (freshUser) {
          const userData = {
            id: freshUser.id,
            firstName: freshUser.firstName,
            lastName: freshUser.lastName,
            email: freshUser.email,
            username: freshUser.username,
            image: freshUser.image,
            role: freshUser.role,
            tokenVerified: freshUser.tokenVerified,
          };
          setCurrentUser(userData);
        } else {
          // User no longer exists in API
          logout();
          navigate('/login');
          addToast('Session expired. Please login again.', 'info');
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        // If API is down, use cached data as fallback
        setCurrentUser(storedUser);
      } finally {
        setIsVerifyingUser(false);
      }
    };

    verifyUser();
  }, []);

  if (isVerifyingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const getLayoutComponent = () => {
    const userRole = currentUser?.role || 'customer';
    
    if (impersonatedAdmin && userRole === 'super_admin') {
      return AdminLayout;
    }
    
    if (userRole === 'admin') {
      return AdminLayout;
    } else if (userRole === 'super_admin') {
      return SuperAdminLayout;
    }
    return CustomerLayout;
  };

  const LayoutComponent = getLayoutComponent();
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';

  return (
    <>
      {!currentUser ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : isAdmin ? (
        <LayoutComponent>
          <Routes>
            {/* ── Admin Routes ── */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['admin', 'super_admin']}>
                  <AdminDashboardStats />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['admin', 'super_admin']}>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['admin', 'super_admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['admin', 'super_admin']}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* ── Super Admin Routes ── */}
            <Route
              path="/super-admin/dashboard"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['super_admin']}>
                  <SuperAdminDashboardStats />
                </ProtectedRoute>
              }
            />

            <Route
              path="/super-admin/analytics"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['super_admin']}>
                  <SuperAdminAnalytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/super-admin/users"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['super_admin']}>
                  <SuperAdminUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/super-admin/settings"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['super_admin']}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            <Route 
              path="*" 
              element={
                <Navigate 
                  to={
                    impersonatedAdmin 
                      ? '/admin/dashboard' 
                      : (currentUser?.role === 'super_admin' ? '/super-admin/dashboard' : '/admin/dashboard')
                  } 
                  replace 
                />
              } 
            />
          </Routes>
        </LayoutComponent>
      ) : (
        <LayoutComponent>
          <CustomerRoutes />
        </LayoutComponent>
      )}
    </>
  );
};

const App = () => {
  const { toasts, removeToast } = useAppStore();
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </BrowserRouter>
  );
};

export default App;