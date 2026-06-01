import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToastContainer from "./components/Toast/ToastContainer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CustomerLayout from "./components/Layouts/CustomerLayout";
import AdminLayout, { AdminDashboardStats } from "./components/Layouts/AdminLayout";
import SuperAdminLayout, { SuperAdminDashboardStats } from "./components/Layouts/SuperAdminLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerRoutes from "./routes/customerRoutes";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppRoutes = () => {
  const { currentUser, addToast, impersonatedAdmin } = useAuth();

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
    <BrowserRouter>
      {!currentUser ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : isAdmin ? (
        <LayoutComponent>
          <Routes>
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
                  <div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">Admin Analytics</h1>
                    <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-2xl p-6">
                      <p className="text-gray-600">Analytics dashboard coming soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['admin', 'super_admin']}>
                  <div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">Manage Users</h1>
                    <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-2xl p-6">
                      <p className="text-gray-600">User management dashboard coming soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['admin', 'super_admin']}>
                  <div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">Admin Settings</h1>
                    <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-2xl p-6">
                      <p className="text-gray-600">Settings panel coming soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

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
                  <div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">System Analytics</h1>
                    <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-2xl p-6">
                      <p className="text-gray-600">System analytics dashboard coming soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/super-admin/users"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['super_admin']}>
                  <div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">All Users</h1>
                    <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-2xl p-6">
                      <p className="text-gray-600">All users management dashboard coming soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/super-admin/settings"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['super_admin']}>
                  <div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">System Settings</h1>
                    <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-2xl p-6">
                      <p className="text-gray-600">System settings panel coming soon...</p>
                    </div>
                  </div>
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
    </BrowserRouter>
  );
};

const App = () => (
  <AuthProvider>
    <AppRoutes />
    <ToastContainerWrapper />
  </AuthProvider>
);

const ToastContainerWrapper = () => {
  const { toasts, removeToast } = useAuth();
  return <ToastContainer toasts={toasts} removeToast={removeToast} />;
};

export default App;