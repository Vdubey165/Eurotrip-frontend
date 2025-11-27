import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlane, 
  FaHotel, 
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBullseye,
  FaBolt,
  FaFlag,
  FaGift,
  FaTimes
} from 'react-icons/fa';
import TemplatesModal from '../Components/TemplatesModal';

import '../styles/Home.css';

const Home = () => {
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  return (
    <div className="home">
      {/* Hero Section with Banner */}
      <div className="hero-section">
        <div className="banner-container">
          <img 
            src="/euro-banner.avif" 
            alt="Europe Banner" 
            className="europe-banner"
          />
          <div className="banner-overlay">
            <h1 className="hero-title">
              <FaPlane className="hero-icon" /> Plan Your Perfect European Adventure
            </h1>
          </div>
        </div>
      </div>

      {/* Four Options in Row */}
      <div className="options-section">
       
        <div className="options-grid">
          <Link to="/flights" className="option-card">
            <div className="card-icon-wrapper">
              <FaPlane className="option-icon" />
            </div>
            <h3 className="option-title">Find Flights</h3>
            <p className="option-description">
              Search flights from India to any European city. Compare prices and airlines.
            </p>
            <span className="card-arrow">→</span>
          </Link>
          
          <Link to="/hotels" className="option-card">
            <div className="card-icon-wrapper">
              <FaHotel className="option-icon" />
            </div>
            <h3 className="option-title">Book Hotels</h3>
            <p className="option-description">
              Discover the best hotels in European cities. From budget to luxury options.
            </p>
            <span className="card-arrow">→</span>
          </Link>
          
          <Link to="/destinations" className="option-card">
            <div className="card-icon-wrapper">
              <FaMapMarkerAlt className="option-icon" />
            </div>
            <h3 className="option-title">Explore Destinations</h3>
            <p className="option-description">
              Find top attractions and must-visit places in every European city.
            </p>
            <span className="card-arrow">→</span>
          </Link>

          <button 
            onClick={() => setShowTemplatesModal(true)}
            className="option-card option-card-button"
          >
            <div className="card-icon-wrapper">
              <FaGift className="option-icon" />
            </div>
            <h3 className="option-title">Use Templates</h3>
            <p className="option-description">
              Start with pre-planned trips. Customize to match your style and budget.
            </p>
            <span className="card-arrow">→</span>
          </button>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="features-section">
        <h2 className="section-title">Why Plan With Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <FaMoneyBillWave className="feature-icon" />
            <h4>Best Prices</h4>
            <p>Compare prices across multiple platforms</p>
          </div>
          <div className="feature-item">
            <FaBullseye className="feature-icon" />
            <h4>All in One</h4>
            <p>Flights, hotels, and attractions together</p>
          </div>
          <div className="feature-item">
            <FaFlag className="feature-icon" />
            <h4>India Focused</h4>
            <p>Specially designed for Indian travelers</p>
          </div>
          <div className="feature-item">
            <FaBolt className="feature-icon" />
            <h4>Easy Planning</h4>
            <p>Create your itinerary in minutes</p>
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      {showTemplatesModal && (
        <TemplatesModal onClose={() => setShowTemplatesModal(false)} />
      )}
    </div>
  );
};

export default Home;