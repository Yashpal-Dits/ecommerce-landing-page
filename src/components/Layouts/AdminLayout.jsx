import { FiHome, FiBarChart2, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLayout({ children, currentUser, setCurrentUser, addToast }) {
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
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="font-bold text-xl text-gray-900">
                GENZ.STORE
              </Link>
              <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-md">
                ADMIN
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">{currentUser?.firstName}</span> (Admin)
              </span>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex w-full">
        {/* Sidebar Navigation */}
        <aside className="w-56 p-6">
          <nav className="space-y-2 backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6 shadow-md">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-amber-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiHome className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/analytics"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-amber-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiBarChart2 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-amber-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiUsers className="w-5 h-5" />
              <span>Users</span>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-amber-50 transition-all duration-300 font-medium hover:text-gray-900"
            >
              <FiSettings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </nav>

          {/* Admin Badge */}
          <div className="mt-6 backdrop-blur-sm bg-gradient-to-br from-amber-50/60 to-amber-100/60 border border-amber-200/50 rounded-2xl p-4 shadow-md">
            <p className="text-xs uppercase font-bold text-amber-900 mb-2">Role</p>
            <p className="text-sm font-semibold text-amber-900 capitalize">
              {currentUser?.role?.replace('_', ' ')}
            </p>
            <p className="text-xs text-amber-700 mt-3">Full access to admin features</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-2xl p-8 shadow-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}