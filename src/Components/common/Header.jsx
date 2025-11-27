// src/Components/common/Header.jsx - WITH CURRENCY TOGGLE
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTripContext } from '../../context/TripContext';
import { useAuth } from '../../context/AuthContext';
import SaveTripModal from '../SaveTripModal';
import CurrencyToggle from './CurrencyToggle';
import { 
  FaPlane, 
  FaHotel, 
  FaMapMarkerAlt, 
  FaClipboardList,
  FaUser, 
  FaSave,
  FaEdit,
  FaSignOutAlt,
  FaTimes,
  FaBars
} from 'react-icons/fa';
import '../../styles/Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { hasUnsavedChanges, currentTripId } = useTripContext();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-content">
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            
            <h1>Euroma</h1>
          </Link>
          
          <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link 
              to="/flights" 
              className={`nav-link ${location.pathname === '/flights' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaPlane className="nav-icon" />
              <span>Flights</span>
            </Link>
            <Link 
              to="/hotels" 
              className={`nav-link ${location.pathname === '/hotels' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHotel className="nav-icon" />
              <span>Hotels</span>
            </Link>
            <Link 
              to="/destinations" 
              className={`nav-link ${location.pathname === '/destinations' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaMapMarkerAlt className="nav-icon" />
              <span>Destinations</span>
            </Link>
            <Link 
              to="/my-trips" 
              className={`nav-link ${location.pathname === '/my-trips' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaClipboardList className="nav-icon" />
              <span>My Trips</span>
            </Link>

            {/* AUTH SECTION - Added to mobile nav */}
            {mobileMenuOpen && (
              <div className="mobile-auth-section">
                {/* Currency Toggle in Mobile Menu */}
                <div className="mobile-currency-section">
                  <CurrencyToggle />
                </div>
                
                {isAuthenticated ? (
                  <>
                    <div className="mobile-user-info">
                      <FaUser className="user-icon" />
                      <span className="user-name">{user?.name}</span>
                    </div>
                    <button onClick={handleLogout} className="mobile-logout-btn">
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="mobile-auth-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="mobile-auth-link primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </nav>

          {/* AUTH SECTION - Desktop */}
          <div className="auth-section-desktop">
            {/* Currency Toggle Button */}
            <CurrencyToggle />
            
            {isAuthenticated ? (
              <>
                {hasUnsavedChanges() && (
                  <button 
                    className="save-trip-btn"
                    onClick={() => setShowSaveModal(true)}
                  >
                    <FaSave /> Save Trip
                  </button>
                )}
                {currentTripId && (
                  <button 
                    className="update-trip-btn"
                    onClick={() => setShowSaveModal(true)}
                  >
                    <FaEdit /> Update
                  </button>
                )}
                <div className="user-info">
                  <FaUser className="user-icon" />
                  <span className="user-name">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/register" className="register-btn">Register</Link>
              </>
            )}
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      
      {/* Save Trip Modal */}
      <SaveTripModal 
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </header>
  );
};

export default Header;