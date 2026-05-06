import "./ProductCard.css";

const inrCurrency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card__media-wrap">
        <img src={product.image} alt={product.name} className="product-card__media" loading="lazy" />
      </div>
      <div className="product-card__content">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__row">
          <p className="product-card__price">{inrCurrency.format(product.price)}</p>
          <button className="product-card__button" type="button" onClick={() => onAddToCart(product)}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
