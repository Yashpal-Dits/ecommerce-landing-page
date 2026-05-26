import { FiHome, FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CustomerLayout({ children, currentUser, setCurrentUser, addToast }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    setCurrentUser?.(null);
    addToast?.('Logged out successfully', 'success');
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: FiHome, label: 'Home' },
    { to: '/sneakers', icon: FiShoppingCart, label: 'Sneakers' },
    { to: '/streetwear', icon: FiShoppingCart, label: 'Streetwear' },
    { to: '/contact', icon: FiUser, label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/60 shadow-sm shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-bold text-xl">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">GENZ.STORE</span>
            </Link>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200/60">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{currentUser?.firstName?.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Welcome, {currentUser?.firstName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 hover:shadow-md transition-all duration-200"
              >
                <FiLogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
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
                      ? 'text-black bg-gray-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{currentUser?.firstName?.charAt(0)}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{currentUser?.firstName}</span>
              </div>
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

      {/* Sidebar Navigation */}
      <div className="flex w-full">
        <aside className="hidden md:block w-48 bg-white border-r border-gray-200 p-6 sticky top-16 h-[calc(100vh-4rem)]">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    location.pathname === item.to
                      ? 'text-black bg-gray-100 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Profile Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
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
