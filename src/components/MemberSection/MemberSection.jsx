import "./MemberSection.css";

export default function MemberSection() {
  return (
    <section className="cta reveal" id="cta">
      <div className="cta__inner">
        <p className="cta__eyebrow">GENZ Club</p>
        <h2 className="cta__title">Get first access to every fashion drop</h2>
        <p className="cta__subtitle">Join for member-only pricing, early outfit previews, and exclusive style edits.</p>

        <form className="cta__form" onSubmit={(event) => event.preventDefault()}>
          <input className="cta__input" type="email" placeholder="Enter your email" aria-label="Email" required />
          <button className="cta__button" type="submit">
            Join Now
          </button>
        </form>
      </div>
    </section>
  );
}