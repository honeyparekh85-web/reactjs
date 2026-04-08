import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const nasaStarsUrl = "https://science.nasa.gov/universe/stars/";
  const nasaTypesUrl = "https://science.nasa.gov/universe/stars/types/";
  const nasaMultipleUrl = "https://science.nasa.gov/universe/stars/multiple-star-systems/";
  const nasaPlanetaryUrl = "https://science.nasa.gov/universe/stars/planetary-system/";

  const majorConstellations = [
    {
      name: "Orion",
      mythology: "The Hunter - One of the most recognizable constellations in the night sky",
      brightest: "Rigel",
      visibility: "Best viewed in winter"
    },
    {
      name: "Ursa Major",
      mythology: "The Great Bear - Contains the famous Big Dipper asterism",
      brightest: "Alkaid",
      visibility: "Visible year-round in Northern Hemisphere"
    },
    {
      name: "Cassiopeia",
      mythology: "The Queen - Known for her distinctive W-shaped pattern",
      brightest: "Shedar",
      visibility: "Circumpolar in Northern Hemisphere"
    },
    {
      name: "Andromeda",
      mythology: "The Chained Maiden - Home to the Andromeda Galaxy",
      brightest: "Alpheratz",
      visibility: "Best in autumn and early winter"
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Explore the<br />Universe&apos;s</h1>
          <p className="hero-subtitle">Stellar wonders with <span>Astopia</span></p>
          <p className="hero-description">Discover the science of stars, constellations, and cosmic phenomena through cutting-edge astronomical insights</p>
          <button className="download-btn" onClick={() => setSelectedInfo({
            title: "Ready to Explore?",
            content: "NASA explains that stars form in clouds of gas and dust, spend most of their lives fusing hydrogen, and return material to space when they die. Start here for the full life-cycle overview.",
            sourceUrl: nasaStarsUrl,
            sourceLabel: "Read NASA Stars Overview"
          })}>Explore Stars</button>
        </div>
        <div className="hero-image">
          <div className="planet"></div>
          <div className="planet-ring"></div>
          <div className="star-cluster"></div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Astronomical Discoveries</h2>
        <div className="features-grid">
          <div className="feature-card" onClick={() => setSelectedInfo({
            title: "Star Formation",
            content: "NASA says stars are born inside large clouds of gas and dust called molecular clouds. Gravity pulls this material together until the growing protostar becomes hot enough for fusion to begin.",
            sourceUrl: nasaStarsUrl,
            sourceLabel: "Read NASA on star birth"
          })}>
            <div className="feature-icon">🌌</div>
            <h3>Star Formation</h3>
            <p>Learn how stars are born from massive clouds of gas and dust in stellar nurseries</p>
          </div>
          <div className="feature-card" onClick={() => setSelectedInfo({
            title: "Stellar Evolution",
            content: "NASA explains that a star’s mass shapes its full life story. Smaller stars can end as white dwarfs, while larger ones may collapse into neutron stars or black holes after violent supernova explosions.",
            sourceUrl: nasaTypesUrl,
            sourceLabel: "Read NASA Star Types"
          })}>
            <div className="feature-icon">⚛️</div>
            <h3>Stellar Evolution</h3>
            <p>Explore the life cycles of stars from birth to death, understanding fusion and supernovae</p>
          </div>
          <div className="feature-card" onClick={() => setSelectedInfo({
            title: "Galactic Structures",
            content: "NASA’s stars pages connect stars to larger systems too, including planetary systems built from gas and dust around young stars. These systems can include planets, moons, asteroids, and comets.",
            sourceUrl: nasaPlanetaryUrl,
            sourceLabel: "Read NASA Planetary Systems"
          })}>
            <div className="feature-icon">🌀</div>
            <h3>Galactic Structures</h3>
            <p>Discover galaxies, nebulae, and other deep sky objects within famous constellations</p>
          </div>
          <div className="feature-card" onClick={() => setSelectedInfo({
            title: "Observing Guide",
            content: "NASA highlights that stars appear in many forms and systems, from single stars to binaries and larger groups. Learning these categories helps observers recognize what kind of object they are looking at in the night sky.",
            sourceUrl: nasaTypesUrl,
            sourceLabel: "Read NASA observing basics"
          })}>
            <div className="feature-icon">🔭</div>
            <h3>Observing Guide</h3>
            <p>Get tips for viewing constellations and understanding astronomical coordinates</p>
          </div>
          <div className="feature-card" onClick={() => setSelectedInfo({
            title: "Latest Discoveries",
            content: "NASA’s current stars resources highlight how observatories keep expanding our understanding of star birth, star types, and planetary systems around other stars.",
            sourceUrl: nasaStarsUrl,
            sourceLabel: "Read NASA Stars updates"
          })}>
            <div className="feature-icon">📡</div>
            <h3>Latest Discoveries</h3>
            <p>Stay updated with recent findings from telescopes like Hubble and James Webb</p>
          </div>
          <div className="feature-card" onClick={() => setSelectedInfo({
            title: "Constellation Science",
            content: "Constellations help us organize the sky, but NASA’s stars pages focus on the real physics behind those points of light: how stars form, evolve, and sometimes orbit each other in multi-star systems.",
            sourceUrl: nasaMultipleUrl,
            sourceLabel: "Read NASA Multiple Star Systems"
          })}>
            <div className="feature-icon">⭐</div>
            <h3>Constellation Science</h3>
            <p>Understand the scientific significance of star patterns and their astronomical properties</p>
          </div>
        </div>
      </section>

      <section className="zodiac-section">
        <h2 className="section-title">Star Basics</h2>
        <p className="section-subtitle">Understanding the life cycle of stars</p>
        <div className="zodiac-grid">
          <div className="zodiac-card" onClick={() => setSelectedInfo({
            title: "The Birth of a Star",
            content: "NASA explains that stars begin in molecular clouds. Gravity gathers gas and dust into dense clumps, forming protostars that eventually ignite fusion.",
            sourceUrl: nasaStarsUrl,
            sourceLabel: "Read NASA star birth"
          })}>
            <div className="zodiac-symbol">🌌</div>
            <h3>Birth</h3>
            <p className="zodiac-desc">Stars form in massive clouds of gas and dust. Gravity causes collapse, heating material until nuclear fusion begins.</p>
          </div>
          <div className="zodiac-card" onClick={() => setSelectedInfo({
            title: "The Life of a Star",
            content: "NASA says roughly 90% of stars are main sequence stars. In this long stage, they steadily fuse hydrogen into helium, and mass determines how fast they burn through fuel.",
            sourceUrl: nasaTypesUrl,
            sourceLabel: "Read NASA main sequence stars"
          })}>
            <div className="zodiac-symbol">⚡</div>
            <h3>Life</h3>
            <p className="zodiac-desc">Main sequence stars fuse hydrogen into helium, releasing energy. Mass determines lifespan and evolution path.</p>
          </div>
          <div className="zodiac-card" onClick={() => setSelectedInfo({
            title: "The Death of a Star",
            content: "NASA explains that low-mass stars can leave behind white dwarfs, while massive stars may explode as supernovae and collapse into neutron stars or black holes.",
            sourceUrl: nasaTypesUrl,
            sourceLabel: "Read NASA stellar end states"
          })}>
            <div className="zodiac-symbol">💥</div>
            <h3>Death</h3>
            <p className="zodiac-desc">Low-mass stars become white dwarfs, massive stars explode as supernovae, creating neutron stars or black holes.</p>
          </div>
        </div>
      </section>

      <section className="constellation-section">
        <h2 className="section-title">Major Constellations</h2>
        <p className="section-subtitle">Explore spectacular star patterns visible from Earth</p>
        <div className="constellation-cards">
          {majorConstellations.map((constItem) => (
            <Link
              key={constItem.name}
              to={`/constellation/${constItem.name.toLowerCase().replace(/ /g, "-")}`}
              className="constellation-card-link"
            >
              <div className="constellation-card">
                <div className="constellation-image">🌟</div>
                <h3>{constItem.name}</h3>
                <p className="mythology">{constItem.mythology}</p>
                <div className="const-info">
                  <div className="info-item">
                    <span className="label">Brightest Star:</span>
                    <span className="value">{constItem.brightest}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Visibility:</span>
                    <span className="value">{constItem.visibility}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cosmic-alerts">
        <div className="alerts-content">
          <h2>Latest Discoveries 🔭</h2>
          <p>Stay informed about groundbreaking astronomical discoveries and missions exploring the universe.</p>
        </div>
        <div className="alerts-grid">
          <div className="alert-card" onClick={() => setSelectedInfo({
            title: "James Webb Telescope",
            content: "NASA’s stars resources connect modern observing to the study of stellar nurseries, evolved stars, and planetary systems around distant suns.",
            sourceUrl: nasaStarsUrl,
            sourceLabel: "Read NASA Stars Overview"
          })}>
            <div className="alert-header">
              <span className="alert-symbol">🚀</span>
              <h4>James Webb Telescope</h4>
            </div>
            <p className="date">📅 Ongoing Mission</p>
            <p className="desc">Revealing unprecedented views of the early universe and exoplanet atmospheres.</p>
          </div>
          <div className="alert-card" onClick={() => setSelectedInfo({
            title: "Star Formation",
            content: "NASA says star formation begins inside molecular clouds, where collapsing material forms protostars before fusion starts in the core.",
            sourceUrl: nasaStarsUrl,
            sourceLabel: "Read NASA star formation"
          })}>
            <div className="alert-header">
              <span className="alert-symbol">⭐</span>
              <h4>Star Formation Studies</h4>
            </div>
            <p className="date">📅 Recent Research</p>
            <p className="desc">New insights into how stars form in molecular clouds and stellar nurseries.</p>
          </div>
          <div className="alert-card" onClick={() => setSelectedInfo({
            title: "Black Hole Evolution",
            content: "NASA notes that the most massive stars can end in dramatic collapses that produce neutron stars or black holes, linking stellar life cycles to some of the universe’s most extreme objects.",
            sourceUrl: nasaTypesUrl,
            sourceLabel: "Read NASA star remnants"
          })}>
            <div className="alert-header">
              <span className="alert-symbol">🌀</span>
              <h4>Black Hole Discoveries</h4>
            </div>
            <p className="date">📅 2024 Findings</p>
            <p className="desc">Detection of supermassive black holes and their role in galaxy evolution.</p>
          </div>
          <div className="alert-card" onClick={() => setSelectedInfo({
            title: "Exoplanets",
            content: "NASA’s planetary systems guide explains how stars can host planets, moons, asteroids, and comets that form from the same material left around a young star.",
            sourceUrl: nasaPlanetaryUrl,
            sourceLabel: "Read NASA planetary systems"
          })}>
            <div className="alert-header">
              <span className="alert-symbol">🌌</span>
              <h4>Exoplanet Exploration</h4>
            </div>
            <p className="date">📅 Current Research</p>
            <p className="desc">Thousands of planets discovered orbiting other stars, some in habitable zones.</p>
          </div>
        </div>
      </section>

      <section className="blueprint-section">
        <div className="blueprint-content">
          <h2>Explore the <span>Universe</span></h2>
          <p>Discover the wonders of astronomy and the scientific secrets of the cosmos</p>
          <div className="blueprint-features">
            <div className="bp-feature">
              <span className="bp-icon">🌟</span>
              <span>Star Systems</span>
            </div>
            <div className="bp-feature">
              <span className="bp-icon">🌀</span>
              <span>Galaxies</span>
            </div>
            <div className="bp-feature">
              <span className="bp-icon">🔭</span>
              <span>Telescopes</span>
            </div>
          </div>
          <button className="show-details-btn" onClick={() => setSelectedInfo({
            title: "Universe Exploration",
            content: "NASA’s stars hub is the best starting point for exploring how stars are born, how they spend most of their lives, and what remains after they die.",
            sourceUrl: nasaStarsUrl,
            sourceLabel: "Open NASA Stars Hub"
          })}>Start Exploring</button>
        </div>
      </section>

      <section className="transform-section">
        <div className="transform-content">
          <h2>Transform your understanding of<br />the universe with <span>Astopia</span></h2>
          <p>Join astronomers and stargazers exploring the scientific wonders of the cosmos</p>
          <div className="app-buttons">
            <button className="app-store" onClick={() => setSelectedInfo({
              title: "Telescope View",
              content: "NASA’s star guides help you understand what telescopes reveal: newborn stars, red giants, white dwarfs, multi-star systems, and planets orbiting distant stars.",
              sourceUrl: nasaTypesUrl,
              sourceLabel: "Read NASA Star Types"
            })}>🔭 Explore Now</button>
            <button className="play-store" onClick={() => setSelectedInfo({
              title: "Scientific Knowledge",
              content: "NASA explains that stars are central to understanding the universe because they create light, structure, and many of the heavy elements that later build planets and life.",
              sourceUrl: nasaStarsUrl,
              sourceLabel: "Read NASA Stars Overview"
            })}>🌌 Learn More</button>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2 className="section-title">Astronomical Questions Answered</h2>
        <div className="faq-grid">
          <div className="faq-card" onClick={() => setSelectedInfo({
            title: "What is a Constellation?",
            content: "Constellations are sky patterns, but NASA’s stars pages emphasize that the science lies in the individual stars themselves: their birth, class, companions, and life cycle.",
            sourceUrl: nasaStarsUrl,
            sourceLabel: "Read NASA Stars Overview"
          })}>
            <h4>What is a Constellation?</h4>
            <p>A constellation is a group of stars that appear to form a pattern when viewed from Earth. Ancient cultures connected these patterns with myths, while modern astronomy studies their scientific properties.</p>
          </div>
          <div className="faq-card" onClick={() => setSelectedInfo({
            title: "How Do Stars Form?",
            content: "NASA says stars begin in giant clouds of gas and dust. As gravity pulls material inward, it forms a protostar that eventually becomes hot and dense enough to begin fusion.",
            sourceUrl: nasaStarsUrl,
            sourceLabel: "Read NASA on star formation"
          })}>
            <h4>How Do Stars Form?</h4>
            <p>Stars form in massive clouds of gas and dust called nebulae. Gravity causes the material to collapse, heating up until nuclear fusion begins, creating a new star.</p>
          </div>
          <div className="faq-card" onClick={() => setSelectedInfo({
            title: "What Happens When Stars Die?",
            content: "NASA explains that a star’s mass decides its ending. Sun-like stars can become white dwarfs, while very massive stars may leave neutron stars or black holes behind.",
            sourceUrl: nasaTypesUrl,
            sourceLabel: "Read NASA stellar deaths"
          })}>
            <h4>What Happens When Stars Die?</h4>
            <p>Stars end their lives differently based on mass. Small stars become white dwarfs, while massive stars explode as supernovae, creating neutron stars or black holes.</p>
          </div>
        </div>
      </section>

      {selectedInfo && (
        <div className="info-modal-overlay" onClick={() => setSelectedInfo(null)}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedInfo(null)}>&times;</button>
            <h2>{selectedInfo.title}</h2>
            <div className="modal-body">
              <p>{selectedInfo.content}</p>
            </div>
            {selectedInfo.sourceUrl && (
              <a
                href={selectedInfo.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="modal-source-link"
              >
                {selectedInfo.sourceLabel || "Read NASA source"} →
              </a>
            )}
            <button className="modal-ok-btn" onClick={() => setSelectedInfo(null)}>Got it!</button>
          </div>
        </div>
      )}
    </div>
  );
}
