import { FiHome, FiBarChart2, FiUsers, FiSettings, FiLock, FiLogOut, FiEye, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SuperAdminLayout({ children, currentUser, setCurrentUser, addToast, impersonatedAdmin, setImpersonatedAdmin }) {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = () => {
    try {
      const admins = JSON.parse(localStorage.getItem('admins')) || [];
      setAdmins(admins);
    } catch (error) {
      console.error('Error loading admins:', error);
    }
  };

  const handleImpersonate = (admin) => {
    localStorage.setItem('impersonatedAdmin', JSON.stringify(admin));
    setImpersonatedAdmin?.(admin);
    addToast?.(`Viewing as ${admin.firstName} ${admin.lastName}`, 'info');
    navigate('/admin/dashboard');
    window.location.reload(); 
  };

  const handleStopImpersonate = () => {
    localStorage.removeItem('impersonatedAdmin');
    setImpersonatedAdmin?.(null);
    addToast?.('Stopped impersonating', 'success');
    window.location.reload(); 
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('impersonatedAdmin');
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
              {impersonatedAdmin && (
                <span className="px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-full shadow-md flex items-center gap-1">
                  <FiEye className="w-3 h-3" />
                  VIEWING: {impersonatedAdmin.firstName.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-purple-100">
                <span className="font-semibold text-white">{currentUser?.firstName}</span> (Super Admin)
              </span>
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

      {/* Main Content Area */}
      <div className="flex w-full gap-6 p-6">
        {/* Sidebar Navigation */}
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

          {/* View Admins Card */}
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
                    className="w-full text-left px-3 py-2 bg-gradient-to-r from-purple-100/50 to-transparent rounded-lg hover:from-purple-200/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{admin.firstName} {admin.lastName}</p>
                        <p className="text-xs text-gray-600 truncate">{admin.email}</p>
                      </div>
                      <FiEye className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-xs text-gray-500 py-2 text-center">No admins found</p>
              )}
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-4 shadow-md">
            <h3 className="text-xs uppercase font-bold text-gray-700 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-purple-100/50 to-transparent rounded-lg p-2">
                <p className="text-xs text-gray-600">Total Admins</p>
                <p className="text-lg font-bold text-purple-700">{admins.length}</p>
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