import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar({ cartCount, currentUser, setCurrentUser, addToast }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    
    setCurrentUser(null);
    addToast('Logged out successfully!', 'success');
    navigate('/login');
  };

  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isContactPage = location.pathname === '/contact';

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
          <Link className="navbar__link" to="/contact">
            Contact
          </Link>
        

        
          {!isAuthPage && (
            currentUser ? (
              <>
                <span className="navbar__user-info">
                  Hi, {currentUser.firstName}!
                </span>
                <button 
                  className="navbar__logout-btn" 
                  onClick={handleLogout}
                >
                  log out
                </button>
              </>
            ) : (
              <Link className="navbar__login-btn" to="/login">
                Login
              </Link>
            )
          )}

          
          {!isAuthPage && !isContactPage && (
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