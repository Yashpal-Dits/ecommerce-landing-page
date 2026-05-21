import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
export default function Navbar({ cartCount, currentUser, setCurrentUser, addToast }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-black tracking-wider text-black hover:text-gray-700 transition-colors duration-200 flex-shrink-0"
          >
            GENZ.STORE
          </Link>
       
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              className="text-xs sm:text-sm font-semibold uppercase text-gray-700 hover:text-black transition-colors duration-200" 
              to="/"
            >
              Home
            </Link>
            <Link 
              className="text-xs sm:text-sm font-semibold uppercase text-gray-700 hover:text-black transition-colors duration-200" 
              to="/#products"
            >
              Shop
            </Link>
            <Link 
              className="text-xs sm:text-sm font-semibold uppercase text-gray-700 hover:text-black transition-colors duration-200" 
              to="/#categories"
            >
              Categories
            </Link>
            <Link 
              className="text-xs sm:text-sm font-semibold uppercase text-gray-700 hover:text-black transition-colors duration-200" 
              to="/contact"
            >
              Contact
            </Link>
            {!isAuthPage && (
              currentUser ? (
                <>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    Hi, {currentUser.firstName}!
                  </span>
                  <button 
                    className="px-3 sm:px-5 py-2 bg-red-500 text-white text-xs sm:text-sm font-semibold uppercase rounded transition-colors duration-200 hover:bg-red-600 whitespace-nowrap"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link 
                  className="px-4 sm:px-6 py-2 bg-black text-white text-xs sm:text-sm font-semibold uppercase rounded transition-colors duration-200 hover:bg-gray-800 whitespace-nowrap" 
                  to="/login"
                >
                  Login
                </Link>
              )
            )}
            {!isAuthPage && !isContactPage && (
              <button 
                className="relative px-4 sm:px-5 py-2 border-2 border-black font-semibold text-xs sm:text-sm uppercase rounded transition-all duration-200 hover:bg-black hover:text-white" 
                type="button" 
                aria-label="Cart"
              >
                Cart
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </button>
            )}
          </nav>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 py-2 space-y-1">
            <Link 
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm font-semibold uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-colors rounded-md"
            >
              Home
            </Link>
            <Link 
              to="/#products"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm font-semibold uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-colors rounded-md"
            >
              Shop
            </Link>
            <Link 
              to="/#categories"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm font-semibold uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-colors rounded-md"
            >
              Categories
            </Link>
            <Link 
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm font-semibold uppercase text-gray-700 hover:text-black hover:bg-gray-50 transition-colors rounded-md"
            >
              Contact
            </Link>
            {!isAuthPage && (
              <>
                {currentUser ? (
                  <>
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700">
                      Hi, {currentUser.firstName}!
                    </div>
                    <button 
                      className="w-full text-left px-4 py-2 bg-red-500 text-white text-sm font-semibold uppercase rounded transition-colors duration-200 hover:bg-red-600"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 bg-black text-white text-sm font-semibold uppercase rounded transition-colors duration-200 hover:bg-gray-800 text-center"
                  >
                    Login
                  </Link>
                )
                }
              </>
            )}
            {!isAuthPage && !isContactPage && (
              <button 
                className="w-full relative px-4 py-2 border-2 border-black font-semibold text-sm uppercase rounded transition-all duration-200 hover:bg-black hover:text-white" 
                type="button" 
                aria-label="Cart"
              >
                Cart ({cartCount})
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
