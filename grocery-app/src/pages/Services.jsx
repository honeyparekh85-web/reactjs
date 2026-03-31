import React from "react";
import { Link } from "react-router-dom";

function Services() {
  return (
    <div className="page">
      <h1>Our Services</h1>
      <div className="services-grid">
        <div className="service-card">
          <h3>Home Delivery</h3>
          <p>Fast same-day delivery across your city with contactless options.</p>
          <button className="primary">Order Now</button>
        </div>

        <div className="service-card">
          <h3>Subscription Boxes</h3>
          <p>Weekly or monthly curated boxes with fresh seasonal produce.</p>
          <button className="primary">Subscribe</button>
        </div>

        <div className="service-card">
          <h3>Pickup</h3>
          <p>Place your order online and collect it from our store.</p>
          <button className="primary">Reserve</button>
        </div>
      </div>
    </div>
  );
}

export default Services;
