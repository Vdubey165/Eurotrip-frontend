// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Europe Travel Planner</h3>
          <p className="footer-description">
            Plan your perfect European adventure with ease. Compare flights, hotels, 
            and attractions all in one place.
          </p>
          <div className="footer-social">
            <a href="https://github.com/vdubey165" target="_blank" rel="noopener noreferrer" className="social-link">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/flights">Flights</Link></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Popular Destinations</h4>
          <ul className="footer-links">
            <li><a href="#paris">Paris, France</a></li>
            <li><a href="#rome">Rome, Italy</a></li>
            <li><a href="#london">London, UK</a></li>
            <li><a href="#berlin">Berlin, Germany</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">About</h4>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Europe Travel Planner. Built with ❤️ for travelers.
        </p>
        <p className="footer-note">
          Note: This is a planning tool. Actual bookings happen on partner sites.
        </p>
      </div>
    </footer>
  );
};

export default Footer;