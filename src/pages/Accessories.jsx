import ProductCard from '../components/ProductCard/ProductCard';

export default function Accessories({ products, onAddToCart }) {
  const accessoriesProducts = [
    {
      id: 201,
      name: "Layered Chain Set",
      category: "Accessories",
      price: 1499,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 202,
      name: "Leather Crossbody Bag",
      category: "Accessories",
      price: 3999,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 203,
      name: "Vintage Sunglasses",
      category: "Accessories",
      price: 1999,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 204,
      name: "Statement Watch",
      category: "Accessories",
      price: 5999,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 205,
      name: "Pearl Necklace",
      category: "Accessories",
      price: 2499,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 206,
      name: "Canvas Backpack",
      category: "Accessories",
      price: 2899,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-black mb-2">
          Accessories
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Complete your outfit with perfect accessories
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {accessoriesProducts.map((product) => (
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