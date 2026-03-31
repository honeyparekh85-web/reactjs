import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Fresh & Healthy Groceries</h1>
        <p>Your daily needs delivered fresh and on time.</p>

        <Link to="/about">
          <button>About Us</button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
