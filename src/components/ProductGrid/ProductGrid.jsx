import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

export default function ProductGrid({ products, onAddToCart }) {
  return (
    <section className="product-grid reveal" id="products">
      <div className="product-grid__inner">
        <p className="product-grid__eyebrow">Trending Drop</p>
        <h2 className="product-grid__title">Built for bold fashion moods</h2>
        <p className="product-grid__subtitle">Shop new outfits, sneakers, and accessories curated for Gen-Z street style.</p>

        <div className="product-grid__masonry">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
