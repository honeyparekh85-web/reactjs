import React from 'react';
import '../styles/PageLayout.css';

export default function ForYou() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Personalized Sky</h1>
        <p className="page-subtitle">Tailored cosmic recommendations based on your location, time, and astronomical interests.</p>
      </div>

      <div className="content-section">
        <h2>Recommended Tonight</h2>
        <div className="card-grid">
          <div className="info-card">
            <h3>Orion Rising</h3>
            <p>Orion is at its peak tonight. Look for the three belt stars in the southern sky at around 9:00 PM.</p>
          </div>
          <div className="info-card">
            <h3>Mars Observation</h3>
            <p>Mars is exceptionally bright this week. It will appear as a reddish star near the constellation Taurus.</p>
          </div>
          <div className="info-card">
            <h3>Lyrid Meteor Shower</h3>
            <p>A minor meteor shower is expected early tomorrow morning. Best viewed from a dark location away from city lights.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
