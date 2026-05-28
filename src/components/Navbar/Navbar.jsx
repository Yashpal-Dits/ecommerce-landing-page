import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';

export default function Navbar({ cartCount, currentUser, setCurrentUser, addToast }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    addToast('Logged out successfully!', 'success');
    navigate('/login');
    setIsMenuOpen(false);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isContactPage = location.pathname === '/contact';
  const currentPath = location.pathname;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/#products', label: 'Shop' },
    { to: '/#categories', label: 'Categories' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/80'
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-black tracking-wider text-black hover:text-gray-700 transition-colors duration-200 shrink-0"
          >
            <span className="bg-linear
            -to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              GENZ.STORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to || (link.to.startsWith('/#') && currentPath === '/');
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold uppercase tracking-wide rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-black bg-gray-100'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                  aria-label={link.label}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-black rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!isAuthPage && (
              currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200/60">
                    <div className="w-7 h-7 rounded-full bg-linear
                    -to-br from-gray-800 to-gray-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {currentUser.firstName?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {currentUser.firstName}
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-xs font-semibold uppercase rounded-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  className="px-5 py-2 bg-gray-900 text-white text-xs font-semibold uppercase rounded-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
                  to="/login"
                >
                  Login
                </Link>
              )
            )}
            {!isAuthPage && !isContactPage && (
              <button
                className="relative flex items-center gap-2 px-4 py-2 border-2 border-gray-900 font-semibold text-xs uppercase rounded-lg transition-all duration-200 hover:bg-gray-900 hover:text-white group"
                type="button"
                aria-label="Cart"
              >
                <FiShoppingBag className="w-4 h-4" />
                <span className="hidden lg:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center font-bold px-1 shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-5 h-5 transition-transform duration-200" />
            ) : (
              <FiMenu className="w-5 h-5 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-xl shadow-black/5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-sm font-semibold uppercase tracking-wide rounded-lg transition-all duration-200 ${
                location.pathname === link.to
                  ? 'text-black bg-gray-100'
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!isAuthPage && (
            <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-linear
                    -to-br from-gray-800 to-gray-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {currentUser.firstName?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {currentUser.firstName}
                    </span>
                  </div>
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white text-sm font-semibold uppercase rounded-lg transition-all duration-200 hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="w-4 h-4" />
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-gray-900 text-white text-sm font-semibold uppercase rounded-lg transition-all duration-200 hover:bg-gray-800"
                >
                  Login
                </Link>
              )}
            </div>
          )}

          {!isAuthPage && !isContactPage && (
            <div className="pt-2">
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-900 font-semibold text-sm uppercase rounded-lg transition-all duration-200 hover:bg-gray-900 hover:text-white"
                type="button"
                aria-label="Cart"
              >
                <FiShoppingBag className="w-4 h-4" />
                Cart ({cartCount})
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
