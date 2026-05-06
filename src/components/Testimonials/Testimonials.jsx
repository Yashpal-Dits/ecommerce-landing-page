import "./Testimonials.css";

const testimonials = [
  {
    quote: "The fits are exactly what I see on trend pages. Delivery was quick and sizing was spot on.",
    name: "Rhea S.",
    role: "Fashion Creator",
  },
  {
    quote: "GENZ.STORE has become my go-to for weekend outfits. Quality feels premium for the price.",
    name: "Arjun M.",
    role: "College Student",
  },
  {
    quote: "From oversized tees to sneakers, every drop feels curated for Indian street style.",
    name: "Kiara N.",
    role: "Stylist",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials reveal" id="testimonials">
      <div className="testimonials__inner">
        <p className="testimonials__eyebrow">Style Community</p>
        <h2 className="testimonials__title">What fashion buyers are saying</h2>

        <div className="testimonials__grid">
          {testimonials.map((item) => (
            <article className="testimonials__item" key={item.name}>
              <p className="testimonials__quote">"{item.quote}"</p>
              <p className="testimonials__name">{item.name}</p>
              <p className="testimonials__role">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
