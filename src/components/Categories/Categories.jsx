import "./Categories.css";

const categories = ["Streetwear", "Sneakers", "Oversized", "Ethnic Fusion", "Accessories", "Denim"];

export default function Categories() {
  return (
    <section className="categories reveal" id="categories">
      <div className="categories__inner">
        <p className="categories__eyebrow">Style Focus</p>
        <h2 className="categories__title">Discover your fashion lane</h2>
        <div className="categories__list" role="list">
          {categories.map((category) => (
            <a key={category} className="categories__item" href="#products" role="listitem">
              {category}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
