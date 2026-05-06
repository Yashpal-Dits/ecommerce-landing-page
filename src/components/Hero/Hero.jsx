import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero reveal">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">India's Gen-Z Fashion Destination</p>
          <h1 className="hero__title">GENZ.STORE</h1>
          <p className="hero__subtitle">
            Trend-first streetwear, dailywear, and statement looks curated for India's next generation. Limited drops and fast pan-India delivery.
          </p>
          <div className="hero__actions">
            <a className="hero__button hero__button--primary" href="#products">
              Shop Looks
            </a>
            <a className="hero__button hero__button--ghost" href="#categories">
              Explore Styles
            </a>
          </div>
        </div>

        <div className="hero__media" role="img" aria-label="Gen Z fashion styles and streetwear collection" />
      </div>
    </section>
  );
}