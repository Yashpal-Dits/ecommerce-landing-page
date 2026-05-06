import { Link } from 'react-router-dom';
import "./Categories.css";

const categories = ["Streetwear", "Sneakers", "Oversized", "Ethnic Fusion", "Accessories", "Denim"];

export default function Categories() {
  return (
    <section className="categories reveal" id="categories">
      <div className="categories__inner">
        <p className="categories__eyebrow">Style Focus</p>
        <h2 className="categories__title">Discover your fashion lane</h2>
        <div className="categories__list" role="list">
          {categories.map((category) => {
            
          
            let destination = "/#products";
            if (category === "Sneakers") destination = "/sneakers";
            if (category === "Streetwear") destination = "/streetwear";

            return (
              <Link 
                key={category} 
                className="categories__item" 
                to={destination}
                role="listitem"
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}