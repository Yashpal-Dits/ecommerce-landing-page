import { Link } from 'react-router-dom';
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <p className="footer__logo">GENZ.STORE</p>
          </Link>
          <p className="footer__text">India-based fashion storefront for trend-first streetwear and statement looks.</p>
        </div>

        <nav className="footer__links" aria-label="Footer links">
          <Link to="/#shipping">Pan-India Shipping</Link>
          <Link to="/#returns">Returns</Link>
          <Link to="/#terms">Terms</Link>
          <Link to="/#contact">Contact</Link>
        </nav>

        <p className="footer__copyright">© 2026 GENZ.STORE</p>
      </div>
    </footer>
  );
}