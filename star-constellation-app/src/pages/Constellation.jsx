import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getConstellationByName } from "../data/constellations";
import "../styles/Constellation.css";

export default function Constellation() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [wikiData, setWikiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;

    setLoading(true);
    setError(null);

    const constData = getConstellationByName(name);
    if (constData) {
      setData(constData);
    }

    const wikiSearchName = name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/Constellation_${wikiSearchName}`)
      .then((res) => {
        if (!res.ok) {
          return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiSearchName}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((wikiResult) => {
        if (wikiResult.type === "standard") {
          setWikiData(wikiResult);
        }
      })
      .catch(() => {
        // Fallback to local data only.
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <div className="constellation-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading cosmic data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="constellation-container">
        <div className="error-section">
          <h2>⚠️ Constellation Not Found</h2>
          <p>This stellar beauty couldn't be located in our cosmic database. Try searching for another constellation!</p>
          <button onClick={() => navigate("/")} className="back-btn">
            ← Return to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="constellation-container">
      <section className="constellation-hero">
        <div className="hero-background">
          <div className="galaxy-bg"></div>
        </div>
        <div className="hero-content">
          <h1 className="constellation-title">{data.symbol} {data.title}</h1>
          {wikiData?.thumbnail && (
            <div className="constellation-image-wrapper">
              <img src={wikiData.thumbnail.source} alt={data.title} className="constellation-image" />
            </div>
          )}
        </div>
      </section>

      <section className="quick-facts">
        <div className="facts-grid">
          <div className="fact-card">
            <span className="fact-icon">🔭</span>
            <h4>Visibility</h4>
            <p>{data.visibility}</p>
          </div>
          <div className="fact-card">
            <span className="fact-icon">📍</span>
            <h4>Area</h4>
            <p>{data.area}</p>
          </div>
          <div className="fact-card">
            <span className="fact-icon">⭐</span>
            <h4>Brightest Star</h4>
            <p>{data.brightest}</p>
          </div>
          <div className="fact-card">
            <span className="fact-icon">🌆</span>
            <h4>Best Viewing</h4>
            <p>{data.bestTime}</p>
          </div>
        </div>
      </section>

      <section className="description-section">
        <div className="content-wrapper">
          <div className="content-article">
            <h2>Overview</h2>
            <p className="description-text">{data.description}</p>
          </div>

          <div className="content-article">
            <h2>Mythology & History</h2>
            <div className="mythology-box">
              <h3>Ancient Legend</h3>
              <p>{data.mythology}</p>
            </div>
            <div className="history-box">
              <h3>Historical Significance</h3>
              <p>{data.history}</p>
            </div>
          </div>

          <div className="content-article">
            <h2>Astronomical Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Right Ascension (RA):</span>
                <span className="detail-value">{data.ra}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Declination (Dec):</span>
                <span className="detail-value">{data.dec}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Brightest Star:</span>
                <span className="detail-value">{data.brightest}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Other Notable Stars:</span>
                <span className="detail-value">{data.notable}</span>
              </div>
            </div>
          </div>

          <div className="content-article">
            <h2>Star Formation</h2>
            <p>Stars form in large clouds of gas and dust called molecular clouds. These cold, dense regions provide the raw materials for star birth. Gravity causes pockets of gas to collapse, heating up and forming protostars. In {data.title}, several stars showcase different stages of this process, from young, hot stars to evolved giants.</p>
            <div className="science-note">
              <strong>Key Fact:</strong> The process can take millions of years, with temperature and pressure building until nuclear fusion ignites in the core.
            </div>
          </div>

          <div className="content-article">
            <h2>Stellar Evolution</h2>
            <p>Once fusion begins, stars enter the main sequence phase, where they stably convert hydrogen to helium. The mass of a star determines its lifespan and evolution path. Low-mass stars like our Sun live for billions of years, while massive stars burn through their fuel quickly. {data.title} contains stars at various evolutionary stages, offering a glimpse into stellar aging.</p>
            <div className="science-note">
              <strong>Key Fact:</strong> A star's color indicates its surface temperature: blue stars are hottest, red stars coolest.
            </div>
          </div>

          <div className="content-article">
            <h2>Stellar Death</h2>
            <p>When a star exhausts its fuel, its fate depends on mass. Low-mass stars swell into red giants, shed their outer layers as planetary nebulae, and leave white dwarf cores. Massive stars end in spectacular supernovae, creating neutron stars or black holes. {data.title} features examples of stellar remnants and the products of stellar death.</p>
            <div className="science-note">
              <strong>Key Fact:</strong> Supernovae enrich the universe with heavy elements, providing building blocks for planets and life.
            </div>
          </div>

          <div className="content-article">
            <h2>Deep Sky Objects</h2>
            <div className="deep-sky-box">
              <p className="deep-sky-text">{data.deepSky}</p>
            </div>
          </div>

          <div className="content-article">
            <h2>Star Stories & Discoveries</h2>
            <p>Modern astronomy continues to reveal secrets about {data.title}. Recent observations with telescopes like Hubble and James Webb have provided new insights into the stars and nebulae within this constellation.</p>
            <div className="nasa-links">
              <a href="https://science.nasa.gov/missions/hubble/" target="_blank" rel="noopener noreferrer" className="nasa-link">
                Learn about Hubble discoveries →
              </a>
              <a href="https://science.nasa.gov/missions/webb/" target="_blank" rel="noopener noreferrer" className="nasa-link">
                Explore James Webb observations →
              </a>
            </div>
          </div>

          <div className="content-article">
            <h2>Observation Tips</h2>
            <div className="tips-box">
              <p>{data.observationTips}</p>
            </div>
          </div>

          {wikiData && (
            <div className="content-article">
              <h2>More Information</h2>
              <p className="wiki-extract">{wikiData.extract}</p>
              {wikiData.content_urls?.desktop && (
                <a href={wikiData.content_urls.desktop.page} target="_blank" rel="noopener noreferrer" className="wiki-link">
                  Read full article on Wikipedia →
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="cta-section">
        <h2>Explore More Constellations</h2>
        <p>Discover the secrets of other celestial patterns</p>
        <button onClick={() => navigate("/")} className="explore-btn">
          ← Back to Constellation List
        </button>
      </section>
    </div>
  );
}
