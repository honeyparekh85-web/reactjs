import React from 'react';
import '../styles/PageLayout.css';

export default function Notifications() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Cosmic Alerts</h1>
        <p className="page-subtitle">Stay updated with the latest celestial events and app notifications.</p>
      </div>

      <div className="content-section">
        <div className="info-card" style={{ marginBottom: '15px' }}>
          <h3>Meteor Shower Alert</h3>
          <p>The Lyrid meteor shower starts tomorrow. Get your binoculars ready!</p>
        </div>
        <div className="info-card" style={{ marginBottom: '15px' }}>
          <h3>ISS Overpass</h3>
          <p>The International Space Station will be visible in your area in 15 minutes.</p>
        </div>
        <div className="info-card">
          <h3>New Constellation Added</h3>
          <p>We've updated our database with detailed information on the Lynx constellation.</p>
        </div>
      </div>
    </div>
  );
}
