import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">ASTOPIA</Link>
      <div className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/for-you">For You</Link>
        <Link to="/blog">Blog</Link>
      </div>
      <div className="nav-icons">
        <Link to="/notifications" className="icon-btn">🔔</Link>
        <Link to="/settings" className="icon-btn">⚙️</Link>
      </div>
    </nav>
  );
}
