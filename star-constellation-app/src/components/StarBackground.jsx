// Generate star positions once at module level
const generateStars = () => {
  return Array.from({ length: 120 }, () => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    animationDelay: Math.random() * 2 + "s"
  }));
};

const starData = generateStars();

export default function StarBackground() {
  return (
    <div className="star-bg">
      {starData.map((star, i) => (
        <div
          key={i}
          className="star"
          style={star}
        />
      ))}
    </div>
  );
}