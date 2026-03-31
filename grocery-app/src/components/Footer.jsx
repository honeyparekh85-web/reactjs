import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col footer-about">
          <h3><span style={{fontSize: '20px'}}>&#127807;</span> Fresh & Fresh</h3>
          <p>
            Fresh groceries delivered to your door. We partner with local
            farmers to bring high-quality produce and pantry staples to your
            kitchen.
          </p>
          <div className="socials">
            <a href="https://github.com/honey-js/forever-fresh-grocery" aria-label="github" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
            <a href="#" aria-label="facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="twitter"><i className="fa-brands fa-twitter"></i></a>
          </div>
        </div>

        <div className="footer-col footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col footer-contact">
          <h4>Contact</h4>
          <p>Email: support@foreverfresh.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123 Fresh Lane, YourCity</p>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>Newsletter</h4>
          <p>Get seasonal offers and fresh picks straight to your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button className="primary">Submit</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026  Fresh & Fresh. All rights reserved.</span>
        <span className="made-by">Made with  for fresh food lovers.</span>
      </div>
    </footer>
  );
}
