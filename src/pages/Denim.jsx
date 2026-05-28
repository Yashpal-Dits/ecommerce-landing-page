import ProductCard from '../components/ProductCard/ProductCard';

export default function Denim({ products, onAddToCart }) {
  const denimProducts = [
    {
      id: 101,
      name: "Classic Blue Jeans",
      category: "Denim",
      price: 3499,
      image: "https://unsplash.com/photos/a-pile-of-jeans-laying-on-top-of-each-other-XdXk39Bj3B0",
    },
    {
      id: 102,
      name: "Black Denim Jacket",
      category: "Denim",
      price: 4299,
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 103,
      name: "Ripped Skinny Jeans",
      category: "Denim",
      price: 2999,
      image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 104,
      name: "Oversized Denim Shirt",
      category: "Denim",
      price: 2499,
      image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 105,
      name: "Light Wash Bootcut",
      category: "Denim",
      price: 3199,
      image: "https://images.unsplash.com/photo-1542272454315-7f6fabf89029?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 106,
      name: "Distressed Crop Denim",
      category: "Denim",
      price: 2699,
      image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-black mb-2">
          Denim Collection
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Premium quality denim for every style
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {denimProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}