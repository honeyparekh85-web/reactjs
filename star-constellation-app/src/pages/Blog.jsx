import React, { useState } from 'react';
import '../styles/PageLayout.css';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      title: 'How Stars Are Born',
      date: 'NASA Stars Overview',
      summary:
        'See how stars begin inside huge molecular clouds, where gravity pulls gas and dust together until nuclear fusion turns a protostar into a star.',
      details:
        'NASA explains that stars form in large clouds of gas and dust called molecular clouds. As clumps inside those clouds gain mass, gravity makes them collapse and heat up until fusion starts in the core.',
      sourceLabel: 'Read NASA Stars',
      sourceUrl: 'https://science.nasa.gov/universe/stars/'
    },
    {
      title: 'Main Sequence and Star Types',
      date: 'NASA Star Types',
      summary:
        'Learn why most stars spend most of their lives on the main sequence and how NASA classifies red giants, white dwarfs, neutron stars, red dwarfs, and brown dwarfs.',
      details:
        'NASA says main sequence stars make up around 90% of the universe\'s stellar population. The star types page also explains how stars change into red giants, leave behind white dwarfs, or collapse into neutron stars depending on their mass.',
      sourceLabel: 'Read NASA Star Types',
      sourceUrl: 'https://science.nasa.gov/universe/stars/types/'
    },
    {
      title: 'Multiple Star Systems',
      date: 'NASA Multiple Star Systems',
      summary:
        'Explore binary stars, X-ray binaries, and more complex systems where multiple stars orbit one another.',
      details:
        'NASA notes that more than half of all stars in the sky have one or more partners. These systems can include binaries, planet-hosting double stars, X-ray binaries, and even systems with as many as seven stars.',
      sourceLabel: 'Read NASA Multiple Systems',
      sourceUrl: 'https://science.nasa.gov/universe/stars/multiple-star-systems/'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Cosmic Chronicles</h1>
        <p className="page-subtitle">Stories, discoveries, and articles from the vast universe of astronomy.</p>
      </div>

      <div className="card-grid">
        {articles.map((article) => (
          <div key={article.title} className="info-card">
            <h3>{article.title}</h3>
            <p className="date">{article.date}</p>
            <p>{article.summary}</p>
            <button
              className="download-btn"
              style={{ marginTop: '15px' }}
              onClick={() => setSelectedArticle(article)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <div className="page-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="page-modal" onClick={(event) => event.stopPropagation()}>
            <button className="page-modal-close" onClick={() => setSelectedArticle(null)}>
              &times;
            </button>
            <h2>{selectedArticle.title}</h2>
            <p className="date">{selectedArticle.date}</p>
            <p>{selectedArticle.details}</p>
            <a href={selectedArticle.sourceUrl} target="_blank" rel="noreferrer" className="page-modal-link">
              {selectedArticle.sourceLabel} →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
