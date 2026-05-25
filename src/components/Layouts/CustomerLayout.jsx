import { FiHome, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function CustomerLayout({ children, currentUser, setCurrentUser, addToast }) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold text-xl text-black">
              GENZ.STORE
            </Link>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-700">
                Welcome, <span className="font-semibold">{currentUser?.firstName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className="flex w-full">
        <aside className="w-48 bg-white border-r border-gray-200 p-6">
          <nav className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded hover:bg-gray-100 transition"
            >
              <FiHome className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/sneakers"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded hover:bg-gray-100 transition"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span>Sneakers</span>
            </Link>
            <Link
              to="/streetwear"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded hover:bg-gray-100 transition"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span>Streetwear</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded hover:bg-gray-100 transition"
            >
              <FiUser className="w-5 h-5" />
              <span>Contact</span>
            </Link>
          </nav>

          {/* Profile Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
            <p className="text-xs uppercase font-bold text-blue-900 mb-2">Role</p>
            <p className="text-sm font-semibold text-blue-900 capitalize">
              {currentUser?.role?.replace('_', ' ')}
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
