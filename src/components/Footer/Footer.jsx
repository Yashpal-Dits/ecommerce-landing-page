import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="py-14 md:py-16 lg:py-20 border-t border-gray-200 bg-white">
    <div className="w-11/12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10 lg:gap-12 flex-wrap mb-10 md:mb-12 lg:mb-14">
        <div className="flex-1 min-w-0 md:min-w-64">
          <Link to="/" className="no-underline">
            <p className="font-bold text-lg md:text-xl text-black mb-4">
              GENZ.STORE
            </p>
          </Link>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            India-based fashion storefront for trend-first streetwear and statement looks.
          </p>
        </div>
        <nav className="flex flex-col sm:flex-row gap-3 sm:gap-5 md:gap-6 flex-wrap" aria-label="Footer links">
          <Link 
            to="/#shipping" 
            className="text-gray-700 text-xs sm:text-sm transition-colors duration-200 hover:text-black"
          >
            Pan-India Shipping
          </Link>
          <Link 
            to="/#returns" 
            className="text-gray-700 text-xs sm:text-sm transition-colors duration-200 hover:text-black"
          >
            Returns
          </Link>
          <Link 
            to="/#terms" 
            className="text-gray-700 text-xs sm:text-sm transition-colors duration-200 hover:text-black"
          >
            Terms
          </Link>
          <Link 
            to="/#contact" 
            className="text-gray-700 text-xs sm:text-sm transition-colors duration-200 hover:text-black"
          >
            Contact
          </Link>
        </nav>
      </div>
      <p className="w-full text-center text-gray-500 text-xs sm:text-sm mt-10 md:mt-12 lg:mt-14 pt-8 md:pt-10 border-t border-gray-200">
        © 2026 GENZ.STORE
      </p>
    </div>
  </footer>
);

export default Footer;
