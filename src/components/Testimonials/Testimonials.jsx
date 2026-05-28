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
    <section className="py-16 md:py-20 bg-black text-white" id="testimonials">
      <div className="w-11/12 max-w-7xl mx-auto px-4">
        {/* Eyebrow */}
        <p className="uppercase font-bold text-xs md:text-sm text-gray-500 tracking-widest mb-3">
          Style Community
        </p>
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-10 md:mb-12 leading-tight">
          What fashion buyers are saying
        </h2>
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((item) => (
            <article 
              className="p-8 md:p-10 bg-[#1a1a1a] rounded-lg transition-transform duration-300 ease-out hover:-translate-y-1.5" 
              key={item.name}
            >
              {/* Quote */}
              <p className="text-base md:text-lg italic text-gray-300 mb-6 leading-relaxed">
                "{item.quote}"
              </p>
              
              {/* Meta */}
              <div>
                <p className="font-bold text-white text-base md:text-lg">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {item.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}