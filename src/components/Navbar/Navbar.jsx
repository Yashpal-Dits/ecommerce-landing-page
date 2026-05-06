import "./Navbar.css";

export default function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          GENZ.STORE
        </a>

        <nav className="navbar__menu" aria-label="Main navigation">
          <a className="navbar__link" href="">
            New Drops
          </a>
          <a className="navbar__link" href="#categories">
            Style Edits
          </a>
          <a className="navbar__link" href="#testimonials">
            Community
          </a>
          <a className="navbar__link" href="#cta">
            Club
          </a>
        </nav>

        <button className="navbar__cart" type="button" aria-label="Cart">
          Cart
          <span className="navbar__cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
