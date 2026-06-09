import { FiHome, FiBarChart2, FiUsers, FiSettings, FiLogOut, FiEye, FiArrowLeft, FiMenu, FiX, FiPackage, FiTrendingUp, FiDollarSign, FiShoppingBag, FiCheckCircle, FiClock } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { type ReactNode, useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useProducts, useAllUsers } from '../../queries/useProducts';

export const AdminDashboardStats = () => {
  const { data: products = [] } = useProducts();
  const { data: users = [] } = useAllUsers();

  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalCustomers = users.filter((u) => u.role === 'customer').length;
  const totalOrders = 156; // Mock — would come from orders API
  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);

  const categoryStats = ['Streetwear', 'Denim', 'Sneakers', 'Outerwear', 'Accessories']
    .map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
    }));

  const barColors: Record<string, string> = {
    Streetwear: 'bg-amber-500',
    Denim: 'bg-blue-500',
    Sneakers: 'bg-green-500',
    Outerwear: 'bg-purple-500',
    Accessories: 'bg-pink-500',
  };

  const recentProducts = products.slice(-5).reverse();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back! Here's what's happening with your store.</p>

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
          <p className="text-sm text-gray-600">Total Users</p>
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
          <p className="text-3xl font-bold text-gray-900 mb-1">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Catalog Value</p>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-white/40 rounded-3xl p-6 shadow-lg shadow-amber-100/40">
          <div className="flex items-center justify-between mb-3">
            <FiShoppingBag className="w-6 h-6 text-amber-600" />
            <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
              <FiTrendingUp className="w-3 h-3" /> +8
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{totalOrders}</p>
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
                    <span className="text-sm font-bold text-gray-900">{cat.count} products</span>
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

      {/* ── User Breakdown ── */}
      <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiUsers className="w-5 h-5 text-gray-400" />
          User Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Customers</p>
              <p className="text-2xl font-bold text-blue-700">{totalCustomers}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-blue-300" />
          </div>
          <div className="flex items-center justify-between p-4 bg-amber-50/50 rounded-xl">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Admins</p>
              <p className="text-2xl font-bold text-amber-700">{users.filter((u) => u.role === 'admin').length}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-amber-300" />
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-xl">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Super Admins</p>
              <p className="text-2xl font-bold text-purple-700">{users.filter((u) => u.role === 'super_admin').length}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-purple-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, setCurrentUser, addToast, impersonatedAdmin, setImpersonatedAdmin, logout } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleStopImpersonate = () => {
    setImpersonatedAdmin(null);
    addToast('Returned to Super Admin view', 'success');
    navigate('/super-admin/dashboard');
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'success');
    navigate('/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
    { to: '/admin/users', icon: FiUsers, label: 'Users' },
    { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-16">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/60 shadow-sm shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/admin/dashboard" className="font-bold text-xl">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">GENZ.STORE</span>
              </Link>
              <span className="hidden sm:inline-flex px-2.5 py-1 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-sm">
                ADMIN
              </span>
              {impersonatedAdmin && (
                <span className="hidden sm:inline-flex px-2.5 py-1 text-xs font-bold text-white bg-blue-600 rounded-full shadow-sm items-center gap-1">
                  <FiEye className="w-3 h-3" />
                  Viewing as {impersonatedAdmin.firstName}
                </span>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/admin/settings"
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200/60 transition-colors group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center border border-gray-200">
                  {currentUser?.image ? (
                    <img src={currentUser.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-white">{currentUser?.firstName?.charAt(0)?.toUpperCase()}</span>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-black">{currentUser?.firstName}</span>
              </Link>
              {impersonatedAdmin && (
                <button
                  onClick={handleStopImpersonate}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 rounded-lg hover:bg-blue-100 transition-all duration-200"
                >
                  <FiArrowLeft className="w-3.5 h-3.5" />
                  Back to Super Admin
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 hover:shadow-md transition-all duration-200"
              >
                <FiLogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.to
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
              <Link
                to="/admin/settings"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer animate-fade-in"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center border border-gray-200">
                  {currentUser?.image ? (
                    <img src={currentUser.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-white">{currentUser?.firstName?.charAt(0)?.toUpperCase()}</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-800">{currentUser?.firstName}</span>
              </Link>
              {impersonatedAdmin && (
                <button
                  onClick={handleStopImpersonate}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 rounded-lg hover:bg-blue-100 transition-all"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back to Super Admin
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex w-full gap-6 p-4 sm:p-6">
        <aside className="hidden md:block w-56 h-fit sticky top-16 flex-shrink-0">
          <nav className="space-y-1 backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4 shadow-md mb-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === item.to
                      ? 'text-amber-700 bg-amber-50 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-amber-50/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="backdrop-blur-sm bg-gradient-to-br from-amber-50/60 to-amber-100/60 border border-amber-200/50 rounded-2xl p-4 shadow-md mb-6">
            <p className="text-xs uppercase font-bold text-amber-900 mb-2">Role</p>
            <p className="text-sm font-semibold text-amber-900 capitalize">
              {currentUser?.role?.replace('_', ' ')}
            </p>
            <p className="text-xs text-amber-700 mt-3">Full access to admin features</p>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto backdrop-blur-sm bg-white/80 border border-white/50 rounded-[2rem] p-4 sm:p-6 lg:p-8 shadow-xl shadow-slate-200/40 transition-all duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;