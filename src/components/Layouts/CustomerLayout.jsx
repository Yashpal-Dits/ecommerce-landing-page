import { FiHome, FiGrid, FiTrendingUp, FiMail, FiLogOut, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CustomerLayout({ children, currentUser, setCurrentUser, addToast }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
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
    { to: '/', icon: FiHome, label: 'Home', exact: true },
    { 
      to: '/categories', 
      icon: FiGrid, 
      label: 'Categories',
      hasDropdown: true,
      dropdownItems: [
        { to: '/categories/sneakers', label: 'Sneakers' },
        { to: '/categories/denim', label: 'Denim' },
        { to: '/categories/streetwear', label: 'Streetwear' },
        { to: '/categories/accessories', label: 'Accessories' },
        { to: '/categories/outerwear', label: 'Outerwear' },
      ]
    },
    { to: '/trending', icon: FiTrendingUp, label: 'Trending' },
    { to: '/contact', icon: FiMail, label: 'Contact' },
  ];

  const isActiveRoute = (to, exact = false) => {
    if (exact) {
      return location.pathname === to;
    }
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/60 shadow-sm shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <Link to="/" className="font-bold text-xl">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                GENZ.STORE
              </span>
            </Link>

           
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.to, item.exact);

                if (item.hasDropdown) {
                  return (
                    <div key={item.to} className="relative group">
                      <Link
                        to={item.to}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-gray-900 bg-gray-100'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                        <FiChevronDown className="w-3 h-3" />
                      </Link>
                      <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="py-2">
                          {item.dropdownItems.map((dropItem) => (
                            <Link
                              key={dropItem.to}
                              to={dropItem.to}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                              {dropItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-gray-900 bg-gray-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

           
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200/60">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {currentUser?.firstName?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {currentUser?.firstName}
                </span>
              </div>
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

       
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.to, item.exact);

              if (item.hasDropdown) {
                return (
                  <div key={item.to}>
                    <button
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-black bg-gray-100'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </div>
                      <FiChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {categoriesOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdownItems.map((dropItem) => (
                          <Link
                            key={dropItem.to}
                            to={dropItem.to}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
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
                  <span className="text-sm font-bold text-white">
                    {currentUser?.firstName?.charAt(0)?.toUpperCase()}
                  </span>
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

     
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}