import { FiHome, FiBarChart2, FiUsers, FiSettings, FiLogOut, FiEye, FiArrowLeft, FiPackage, FiTrendingUp, FiDollarSign, FiShoppingBag, FiClock, FiAlertCircle, FiActivity } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { type ReactNode, useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { fetchUsersByRole, fetchProducts } from '../../api';
import { User, Product } from '@/types';

// ──────────────────────────────────────────────────────
// Super Admin Dashboard Stats (self-contained, no props needed)
// ──────────────────────────────────────────────────────

export const SuperAdminDashboardStats = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allUsers, allProducts] = await Promise.all([
          fetchUsersByRole('customer'),
          fetchProducts(),
        ]);
        setUsers(allUsers);
        setProducts(allProducts);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalCatalogValue = products.reduce((sum, p) => sum + p.price, 0);
  const totalOrders = 2847;

  const categoryStats = ['Streetwear', 'Denim', 'Sneakers', 'Outerwear', 'Accessories']
    .map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
      percentage: totalProducts > 0 ? ((products.filter((p) => p.category === cat).length / totalProducts) * 100).toFixed(0) : '0',
    }));

  const barColors: Record<string, string> = {
    Streetwear: 'bg-amber-500',
    Denim: 'bg-blue-500',
    Sneakers: 'bg-green-500',
    Outerwear: 'bg-purple-500',
    Accessories: 'bg-pink-500',
  };

  const recentProducts = products.slice(-6).reverse();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900">System Dashboard</h1>
      <p className="text-gray-500 mb-8">Overview of system-wide metrics and activity</p>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="backdrop-blur-sm bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-white/40 rounded-3xl p-6 shadow-lg shadow-blue-100/40">
          <div className="flex items-center justify-between mb-3">
            <FiUsers className="w-6 h-6 text-blue-600" />
            <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
              <FiTrendingUp className="w-3 h-3" /> +2.5%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{totalUsers}</p>
          <p className="text-sm text-gray-600">Total Customers</p>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-green-500/20 to-green-600/20 border border-white/40 rounded-3xl p-6 shadow-lg shadow-green-100/40">
          <div className="flex items-center justify-between mb-3">
            <FiPackage className="w-6 h-6 text-green-600" />
            <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
              <FiTrendingUp className="w-3 h-3" /> +5
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{totalProducts}</p>
          <p className="text-sm text-gray-600">Total Products</p>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-white/40 rounded-3xl p-6 shadow-lg shadow-purple-100/40">
          <div className="flex items-center justify-between mb-3">
            <FiDollarSign className="w-6 h-6 text-purple-600" />
            <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
              <FiTrendingUp className="w-3 h-3" /> +12.5%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">₹{totalCatalogValue.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Catalog Value</p>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-white/40 rounded-3xl p-6 shadow-lg shadow-amber-100/40">
          <div className="flex items-center justify-between mb-3">
            <FiShoppingBag className="w-6 h-6 text-amber-600" />
            <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
              <FiTrendingUp className="w-3 h-3" /> +8
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{totalOrders.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
      </div>

      {/* ── Two Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Products by Category */}
        <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiPackage className="w-5 h-5 text-gray-400" />
            Products by Category
          </h2>
          <div className="space-y-4">
            {categoryStats.map((cat) => {
              const maxCount = Math.max(...categoryStats.map((c) => c.count));
              const percentage = maxCount > 0 ? (cat.count / maxCount) * 100 : 0;
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    <span className="text-sm font-bold text-gray-900">{cat.count} products ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${barColors[cat.name] || 'bg-gray-500'} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Products */}
        <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiClock className="w-5 h-5 text-gray-400" />
            Recent Products
          </h2>
          <div className="space-y-3">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e5e7eb" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="%239ca3af" font-size="12">No Image</text></svg>';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── System Health ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiActivity className="w-4 h-4 text-gray-400" />
            System Health
          </h2>
          <div className="space-y-4">
            {[
              { label: 'API Server', status: 'Online', color: 'text-green-600', bg: 'bg-green-100' },
              { label: 'Database', status: 'Connected', color: 'text-green-600', bg: 'bg-green-100' },
              { label: 'Cache', status: 'Active', color: 'text-green-600', bg: 'bg-green-100' },
              { label: 'CDN', status: 'Operational', color: 'text-green-600', bg: 'bg-green-100' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${item.bg} ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiBarChart2 className="w-4 h-4 text-gray-400" />
            Quick Stats
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Avg. Order Value', value: '₹3,245', icon: FiDollarSign },
              { label: 'Conversion Rate', value: '2.4%', icon: FiTrendingUp },
              { label: 'Active Sessions', value: '847', icon: FiActivity },
              { label: 'Page Load Time', value: '1.2s', icon: FiClock },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <stat.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4 text-gray-400" />
            Recent Alerts
          </h2>
          <div className="space-y-3">
            {[
              { message: 'New product batch uploaded', time: '5 min ago', type: 'info', color: 'bg-blue-100 text-blue-700' },
              { message: 'User registration spike detected', time: '2 hrs ago', type: 'warning', color: 'bg-amber-100 text-amber-700' },
              { message: 'System backup completed', time: '6 hrs ago', type: 'success', color: 'bg-green-100 text-green-700' },
              { message: 'API rate limit increased', time: '1 day ago', type: 'info', color: 'bg-blue-100 text-blue-700' },
            ].map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-xl">
                <FiAlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${alert.color.split(' ')[1]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
interface SuperAdminLayoutProps {
  children: ReactNode;
}

const SuperAdminLayout = ({ children }: SuperAdminLayoutProps) => {
  const navigate = useNavigate();
  const { currentUser, addToast, impersonatedAdmin, setImpersonatedAdmin, logout } = useAppStore();
  const [admins, setAdmins] = useState<User[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedAdmins, fetchedCustomers, fetchedProducts] = await Promise.all([
          fetchUsersByRole('admin'),
          fetchUsersByRole('customer'),
          fetchProducts(),
        ]);
        setAdmins(fetchedAdmins);
        setCustomers(fetchedCustomers);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading sidebar data:', error);
      }
    };

    loadData();
  }, []);

  const handleImpersonate = (admin: User) => {
    setImpersonatedAdmin(admin);
    addToast(`Viewing as ${admin.firstName} ${admin.lastName}`, 'info');
    navigate('/admin/dashboard');
  };

  const handleStopImpersonate = () => {
    setImpersonatedAdmin(null);
    addToast('Stopped impersonating', 'success');
    navigate('/super-admin/dashboard');
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'success');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-linear-to-r from-purple-700 to-purple-900 border-b border-purple-500/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="font-bold text-xl text-white">
                GENZ.STORE
              </Link>
              <span className="px-3 py-1 text-xs font-bold text-white bg-red-600 rounded-full shadow-md">
                SUPER ADMIN
              </span>
              {impersonatedAdmin && (
                <span className="px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-full shadow-md flex items-center gap-1">
                  <FiEye className="w-3 h-3" />
                  VIEWING: {impersonatedAdmin.firstName.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/super-admin/settings"
                className="flex items-center gap-2 hover:opacity-95 transition-opacity group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20 flex items-center justify-center border border-purple-400/50 shadow-sm">
                  {currentUser?.image ? (
                    <img src={currentUser.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-white">{currentUser?.firstName?.charAt(0)?.toUpperCase()}</span>
                  )}
                </div>
                <span className="text-sm text-purple-100 group-hover:text-white transition-colors">
                  <span className="font-semibold text-white">{currentUser?.firstName}</span> (Super Admin)
                </span>
              </Link>
              {impersonatedAdmin && (
                <button
                  onClick={handleStopImpersonate}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Stop Viewing
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex w-full gap-6 p-6">
        <aside className="w-56 h-fit sticky top-24">
          <nav className="space-y-2 backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6 shadow-md mb-6">
            <Link
              to="/super-admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiHome className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/super-admin/analytics"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiBarChart2 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
            <Link
              to="/super-admin/users"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiUsers className="w-5 h-5" />
              <span>All Users</span>
            </Link>
            <Link
              to="/super-admin/settings"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiSettings className="w-5 h-5" />
              <span>System Settings</span>
            </Link>
          </nav>

          <div className="backdrop-blur-sm bg-linear-to-br from-purple-50/60 to-pink-50/60 border border-purple-200/50 rounded-2xl p-4 shadow-md mb-6">
            <p className="text-xs uppercase font-bold text-purple-900 mb-2">Role</p>
            <p className="text-sm font-semibold text-purple-900 capitalize">
              {currentUser?.role?.replace('_', ' ')}
            </p>
            <p className="text-xs text-purple-700 mt-3"> Complete system access</p>
          </div>

          <div className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4 shadow-md mb-6">
            <h3 className="text-xs uppercase font-bold text-gray-700 mb-3 flex items-center gap-2">
              <FiEye className="w-4 h-4" />
              View Admins ({admins.length})
            </h3>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {admins.length > 0 ? (
                admins.map((admin, index) => (
                  <button
                    key={index}
                    onClick={() => handleImpersonate(admin)}
                    className="w-full text-left px-3 py-2 bg-linear-to-r from-purple-100/50 to-transparent rounded-lg hover:from-purple-200/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{admin.firstName} {admin.lastName}</p>
                        <p className="text-xs text-gray-600 truncate">{admin.email}</p>
                      </div>
                      <FiEye className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-xs text-gray-500 py-2 text-center">No admins found</p>
              )}
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4 shadow-md">
            <h3 className="text-xs uppercase font-bold text-gray-700 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="bg-linear-to-r from-purple-100/50 to-transparent rounded-lg p-2">
                <p className="text-xs text-gray-600">Total Admins</p>
                <p className="text-lg font-bold text-purple-700">{admins.length}</p>
              </div>
              <div className="bg-linear-to-r from-blue-100/50 to-transparent rounded-lg p-2">
                <p className="text-xs text-gray-600">Total Customers</p>
                <p className="text-lg font-bold text-blue-700">{customers.length}</p>
              </div>
              <div className="bg-linear-to-r from-green-100/50 to-transparent rounded-lg p-2">
                <p className="text-xs text-gray-600">Total Products</p>
                <p className="text-lg font-bold text-green-700">{products.length}</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto backdrop-blur-sm bg-white/80 border border-white/50 rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 transition-all duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;