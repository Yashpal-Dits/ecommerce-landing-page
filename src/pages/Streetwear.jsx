import { Link } from 'react-router-dom';

export default function Streetwear() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white">
      <div className="text-center px-4">
     
        <h1 className="text-4xl md:text-5xl font-black text-black mb-3">
          Coming Soon
        </h1>

        <p className="text-gray-600 text-lg md:text-xl mb-3 max-w-md mx-auto">
          Something amazing is in the works. Stay tuned for our streetwear collection!
        </p>
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-black text-white font-black text-sm md:text-base rounded transition-all duration-200 hover:bg-gray-800 active:scale-95"
        >
          Explore Categories
        </Link>
      </div>
    </div>
  );
}