import React from 'react';
import '../styles/PageLayout.css';

export default function About() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">About Astopia</h1>
        <p className="page-subtitle">
          Your portal to the cosmic mysteries. We're dedicated to bringing the wonders of the night sky closer to you through technology and passion.
        </p>
      </div>

      <div className="content-section">
        <h2>Our Mission</h2>
        <p className="page-subtitle">
          Astopia aims to simplify astronomical exploration for enthusiasts of all levels. Whether you're a casual stargazer or a serious astronomer, our platform provides tools and information to enhance your cosmic journey.
        </p>
        
        <div className="card-grid">
          <div className="info-card">
            <h3>Star Mapping</h3>
            <p>Advanced algorithms to map every known constellation with precision and beauty.</p>
          </div>
          <div className="info-card">
            <h3>Cosmic Insights</h3>
            <p>Real-time updates on planetary movements, meteor showers, and celestial events.</p>
          </div>
          <div className="info-card">
            <h3>Global Community</h3>
            <p>Connecting stargazers worldwide to share sightings and astronomical discoveries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
