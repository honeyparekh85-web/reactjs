import React from "react";
import Hero from "../components/Hero";
import categories from "../Data/categories";
import products from "../Data/products";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Hero />

      <div className="page">
        <h2>Categories</h2>

        <div className="category-grid">
          {categories.map((item) => (
            <Link to={`/category/${item.id}`} key={item.name}>
              <div className="category-card">
                <img src={item.image} alt={item.name} />
                <p className="category-cta">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 style={{ marginTop: 30 }}>Featured Products</h2>
        <div className="card-grid featured-grid">
          {products.slice(0, 6).map((item) => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹ {item.price} / {item.unit}</p>
              <div className="card-actions">
                <Link className="view-btn" to={`/product/${item.id}`}>View More</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
