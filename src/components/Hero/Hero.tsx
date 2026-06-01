import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="py-20 md:py-24 bg-gray-100">
    <div className="w-11/12 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="flex flex-col gap-5 md:gap-6">
          <p className="uppercase font-black text-xs md:text-sm text-red-500 tracking-widest">
            India's Gen-Z Fashion Destination
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-black">
            GENZ.STORE
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Trend-first streetwear, dailywear, and statement looks curated for India's next generation. Limited drops and fast pan-India delivery.
          </p>
          <div className="flex flex-col md:flex-row gap-4 flex-wrap pt-2">
            <Link 
              className="px-7 py-3.5 bg-black text-white font-bold uppercase text-sm text-center rounded transition-all duration-200 hover:bg-gray-800"
              to="/#products"
            >
              Shop Looks
            </Link>
            <Link 
              className="px-7 py-3.5 border-2 border-black text-black font-bold uppercase text-sm text-center rounded transition-all duration-200 hover:bg-black hover:text-white"
              to="/#categories"
            >
              Explore Styles
            </Link>
          </div>
        </div>
        <div 
          className="h-80 md:h-96 rounded-lg bg-gray-300 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80')"
          }}
          role="img" 
          aria-label="Gen Z fashion styles and streetwear collection"
        />
      </div>
    </div>
  </section>
);

export default Hero;
