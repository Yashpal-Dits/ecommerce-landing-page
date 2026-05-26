import { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ToastContainer from "./components/Toast/ToastContainer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CustomerLayout from "./components/Layouts/CustomerLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import SuperAdminLayout from "./components/Layouts/SuperAdminLayout";
import Home from "./pages/Home";
import Sneakers from "./pages/Sneakers";
import Streetwear from "./pages/Streetwear";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";

const products = [
  {
    id: 1,
    name: "Tokyo Oversized Tee",
    category: "Streetwear",
    price: 2199,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Seoul Cargo Pants",
    category: "Bottomwear",
    price: 2899,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Indie Crop Hoodie",
    category: "Women",
    price: 2499,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Orbit Chunky Sneakers",
    category: "Sneakers",
    price: 4999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Urban Denim Jacket",
    category: "Outerwear",
    price: 3599,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Monsoon Co-ord Set",
    category: "Ethnic Fusion",
    price: 3199,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Retro Varsity Jacket",
    category: "Streetwear",
    price: 4299,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Layered Chain + Ring Set",
    category: "Accessories",
    price: 1499,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
  },
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [impersonatedAdmin, setImpersonatedAdmin] = useState(null);
  const featuredProducts = useMemo(() => products, []);

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
        <>
          <Navbar
            cartCount={cartCount}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            addToast={addToast}
          />

          <Routes>
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} addToast={addToast} />} />
            <Route path="/register" element={<Register addToast={addToast} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>

          <Footer />
        </>
      ) : isAdmin ? (
        <LayoutComponent
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          addToast={addToast}
          impersonatedAdmin={impersonatedAdmin}
          setImpersonatedAdmin={setImpersonatedAdmin}
        >
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['admin', 'super_admin']}>
                  <div>
                    <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <StatCard title="Total Users" value="4534"  color="from-blue-500/20 to-blue-600/20" />
                      <StatCard title="Total Sales" value="543"  color="from-green-500/20 to-green-600/20" />
                      <StatCard title="Revenue" value="₹45,890" color="from-purple-500/20 to-purple-600/20" />
                      <StatCard title="Active Orders" value="68"  color="from-amber-500/20 to-amber-600/20" />
                    </div>
                  </div>
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

            {/* Super Admin Routes */}
            <Route
              path="/super-admin/dashboard"
              element={
                <ProtectedRoute addToast={addToast} allowedRoles={['super_admin']}>
                  <div>
                    <h1 className="text-3xl font-bold mb-8 text-gray-900">System Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <StatCard title="Total Users" value="234" color="from-blue-500/20 to-blue-600/20" />
                      <StatCard title="Total Sales" value="2,543"  color="from-green-500/20 to-green-600/20" />
                      <StatCard title="Revenue" value="₹67,890"  color="from-purple-500/20 to-purple-600/20" />
                      <StatCard title="Active Orders" value="228"  color="from-amber-500/20 to-amber-600/20" />
                      <StatCard title="Active Admins" value={`${JSON.parse(localStorage.getItem('admins') || '[]').length}`} icon="👨‍💼" color="from-red-500/20 to-red-600/20" />
                    </div>
                  </div>
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

            <Route path="*" element={<Navigate to={currentUser?.role === 'super_admin' ? '/super-admin/dashboard' : '/admin/dashboard'} />} />
          </Routes>
        </LayoutComponent>
      ) : (
        <LayoutComponent
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          addToast={addToast}
        >
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute addToast={addToast}>
                  <Home products={featuredProducts} onAddToCart={handleAddToCart} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sneakers"
              element={
                <ProtectedRoute addToast={addToast}>
                  <Sneakers products={featuredProducts} onAddToCart={handleAddToCart} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/streetwear"
              element={
                <ProtectedRoute addToast={addToast}>
                  <Streetwear products={featuredProducts} onAddToCart={handleAddToCart} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute addToast={addToast}>
                  <Contact addToast={addToast} />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </LayoutComponent>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </BrowserRouter>
  );
}


function StatCard({ title, value, icon, color }) {
  return (
    <div className={`backdrop-blur-sm bg-gradient-to-br ${color} border border-white/40 rounded-2xl p-6 shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}