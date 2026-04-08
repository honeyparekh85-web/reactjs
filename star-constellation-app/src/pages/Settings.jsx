import React from 'react';
import '../styles/PageLayout.css';

export default function Settings() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Cosmic Settings</h1>
        <p className="page-subtitle">Personalize your journey through the stars and manage your account.</p>
      </div>

      <div className="content-section">
        <div className="info-card" style={{ marginBottom: '20px' }}>
          <h3>Account Preferences</h3>
          <p>Update your email, password, and communication settings.</p>
        </div>
        <div className="info-card" style={{ marginBottom: '20px' }}>
          <h3>Stargazing Notifications</h3>
          <p>Toggle alerts for meteor showers,ISS overpasses, and cosmic events.</p>
        </div>
        <div className="info-card">
          <h3>Display Theme</h3>
          <p>Switch between Starry Night (Dark) and Milky Way (Deep Blue) themes.</p>
        </div>
      </div>
    </div>
  );
}
