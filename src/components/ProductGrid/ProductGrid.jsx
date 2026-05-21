import ProductCard from "../ProductCard/ProductCard";
export default function ProductGrid({ products, onAddToCart }) {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-white" id="products">
      <div className="w-11/12 max-w-5xl mx-auto">
      
        <p className="uppercase text-red-500 font-black text-xs md:text-sm mb-3">
          Trending Drop
        </p>
       
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-3 md:mb-4 leading-tight">
          Built for bold fashion moods
        </h2>
        
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-12 md:mb-14 leading-relaxed">
          Shop new outfits, sneakers, and accessories curated for Gen-Z street style.
        </p>
    
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}