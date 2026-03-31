import React from "react";
import { useParams } from "react-router-dom";
import products from "../Data/products";

function CategoryPage() {
  const { category } = useParams();

  const filtered = products.filter((p) => p.category === category);

  return (
    <div className="page">
      <h1>{category.toUpperCase()}</h1>

      <div className="card-grid">
        {filtered.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹ {item.price} / {item.unit}</p>
            <div className="card-actions">
              <a className="view-btn" href={`/product/${item.id}`}>View More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
