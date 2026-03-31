import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../Data/products";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="page">
        <h2>Product not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page product-detail">
      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="price">₹ {product.price} / {product.unit}</p>
          <p className="description">Fresh, high-quality {product.name} sourced locally where possible. Great for daily use and recipes.</p>
          <div className="detail-actions">
            <button className="primary">Add to Cart</button>
            <Link to={`/category/${product.category}`} className="secondary">More in {product.category}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
