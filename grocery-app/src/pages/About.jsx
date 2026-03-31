import React from "react";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-inner">
          <h1>About Forever Fresh</h1>
          <p>Your neighborhood source for fresh, responsibly sourced groceries.</p>
          <a href="/services" className="primary">Explore Our Services</a>
        </div>
      </section>

      <section className="page about-content">
        <h2>Our Mission</h2>
        <p>
          We aim to make fresh, healthy food accessible to everyone by
          connecting local producers with customers through a simple and
          reliable online experience. We prioritize seasonal produce, minimal
          waste, and fair pricing.
        </p>

        <div className="features-grid">
          <div className="feature">
            <h3>Fresh Quality</h3>
            <p>We hand-pick suppliers and inspect produce for peak freshness.</p>
          </div>
          <div className="feature">
            <h3>Fast Delivery</h3>
            <p>Same-day delivery options keep your shopping convenient.</p>
          </div>
          <div className="feature">
            <h3>Sustainable</h3>
            <p>Eco-friendly packaging and partnerships with local farms.</p>
          </div>
        </div>


        <h2>Why Customers Love Us</h2>
        <ul className="about-list">
          <li>Hand-selected produce and reliable fulfillment.</li>
          <li>Flexible subscriptions and easy reorder options.</li>
          <li>Local-first sourcing and reduced food miles.</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
