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
          <Link className="navbar__link" to="/#products">
            New Drops
          </Link>
          <Link className="navbar__link" to="/#categories">
            Style Edits
          </Link>
          <Link className="navbar__link" to="/#testimonials">
            Community
          </Link>
          <Link className="navbar__link" to="/#cta">
            Club
          </Link>
        </nav>

        <button className="navbar__cart" type="button" aria-label="Cart">
          Cart
          <span className="navbar__cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}