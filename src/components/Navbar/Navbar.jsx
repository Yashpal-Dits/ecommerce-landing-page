import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar({ cartCount }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get current user from localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    // Clear tokens and user data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    
    setCurrentUser(null);
    alert('Logged out successfully!');
    navigate('/');
  };

  // Check if current page is login or register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          GENZ.STORE
        </Link>

        <nav className="navbar__menu" aria-label="Main navigation">
          <Link className="navbar__link" to="/">
            Home
          </Link>
          <Link className="navbar__link" to="/#products">
            Shop
          </Link>
          <Link className="navbar__link" to="/#categories">
            Categories
          </Link>

          {currentUser ? (
            <>
              <span className="navbar__user-info">
                Hi, {currentUser.firstName}!
              </span>
              <button 
                className="navbar__logout-btn" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="navbar__login-btn" to="/login">
              Login
            </Link>
          )}

          {/* Hide cart button on auth pages */}
          {!isAuthPage && (
            <button className="navbar__cart" type="button" aria-label="Cart">
              Cart
              <span className="navbar__cart-count">{cartCount}</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}