import { FiHome, FiBarChart2, FiUsers, FiSettings, FiLock, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function SuperAdminLayout({ children, currentUser, setCurrentUser, addToast }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    setCurrentUser?.(null);
    addToast?.('Logged out successfully', 'success');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-r from-purple-700 to-purple-900 border-b border-purple-500/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="font-bold text-xl text-white">
                GENZ.STORE
              </Link>
              <span className="px-3 py-1 text-xs font-bold text-white bg-red-600 rounded-full shadow-md">
                SUPER ADMIN
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-purple-100">
                <span className="font-semibold text-white">{currentUser?.firstName}</span> (Super Admin)
              </span>
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

      {/* Main Content Area */}
      <div className="flex w-full gap-6 p-6">
        {/* Sidebar Navigation */}
        <aside className="w-56 h-fit sticky top-24">
          <nav className="space-y-2 backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6 shadow-md mb-6">
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
              to="/super-admin/admins"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiLock className="w-5 h-5" />
              <span>Manage Admins</span>
            </Link>
            <Link
              to="/super-admin/settings"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiSettings className="w-5 h-5" />
              <span>System Settings</span>
            </Link>
          </nav>

          {/* Super Admin Badge */}
          <div className="backdrop-blur-sm bg-gradient-to-br from-purple-50/60 to-pink-50/60 border border-purple-200/50 rounded-2xl p-4 shadow-md mb-6">
            <p className="text-xs uppercase font-bold text-purple-900 mb-2">Role</p>
            <p className="text-sm font-semibold text-purple-900 capitalize">
              {currentUser?.role?.replace('_', ' ')}
            </p>
            <p className="text-xs text-purple-700 mt-3">⭐ Complete system access</p>
          </div>

          {/* System Status Card */}
          <div className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4 shadow-md mb-6">
            <h3 className="text-xs uppercase font-bold text-gray-700 mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Database</span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">API Server</span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Cache</span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4 shadow-md">
            <h3 className="text-xs uppercase font-bold text-gray-700 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-purple-100/50 to-transparent rounded-lg p-2">
                <p className="text-xs text-gray-600">Active Admins</p>
                <p className="text-lg font-bold text-purple-700">8</p>
              </div>
              <div className="bg-gradient-to-r from-blue-100/50 to-transparent rounded-lg p-2">
                <p className="text-xs text-gray-600">Total Users</p>
                <p className="text-lg font-bold text-blue-700">15,234</p>
              </div>
              <div className="bg-gradient-to-r from-green-100/50 to-transparent rounded-lg p-2">
                <p className="text-xs text-gray-600">Uptime</p>
                <p className="text-lg font-bold text-green-700">99.9%</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-2xl p-8 shadow-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}