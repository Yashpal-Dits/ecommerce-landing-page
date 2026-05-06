import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">GENZ.STORE</p>
          <p className="footer__text">India-based fashion storefront for trend-first streetwear and statement looks.</p>
        </div>

        <nav className="footer__links" aria-label="Footer links">
          <a href="#">Pan-India Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </nav>

        <p className="footer__copyright">© 2026 GENZ.STORE</p>
      </div>
    </footer>
  );
}
