import "../styles/ShootingStars.css";

export default function ShootingStars() {
  return (
    <div className="shooting-stars-container">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="shooting-star" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 50}%`,
          animationDelay: `${i * 2}s`,
          animationDuration: `${3 + Math.random() * 2}s`
        }}></div>
      ))}
    </div>
  );
}
