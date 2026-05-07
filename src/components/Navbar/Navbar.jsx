import { Link } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar({ cartCount }) {
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
          <Link className="navbar__login-btn" to="/login">
            Login
          </Link>
          
          <button className="navbar__cart" type="button" aria-label="Cart">
            Cart
            <span className="navbar__cart-count">{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}