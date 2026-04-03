
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=50&q=80" alt="Logo" className="logo-img" />
        <span className="logo-text">Coffee House</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">HOME</a></li>
        <li><a href="#order">ORDER ONLINE</a></li>
        <li><a href="#book">BOOK A TABLE</a></li>
        <li><a href="#serve">WE SERVE</a></li>
      </ul>
      <div className="navbar-auth">
        <a href="#login" className="login-link">Log In / Sign Up</a>
      </div>
    </nav>
  );
};

export default Navbar;
