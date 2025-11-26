// src/components/TemplateCard.jsx
import React, { useState } from 'react';
import {
  FaSuitcaseRolling,
  FaHeart,
  FaMountain,
  FaLandmark,
  FaUsers,
  FaEye,
  FaDownload,
  FaTimes,
  FaCheckCircle,
  FaCalendarAlt,
  FaWallet
} from 'react-icons/fa';
import '../styles/TemplateCard.css';

const TemplateCard = ({ template, onLoadTemplate }) => {
  const [showModal, setShowModal] = useState(false);

  // Icon mapping - using icons that exist in react-icons/fa
  const iconMap = {
    backpack: FaSuitcaseRolling,
    heart: FaHeart,
    mountain: FaMountain,
    landmark: FaLandmark,
    users: FaUsers
  };

  const IconComponent = iconMap[template.icon];

  const handleLoadTemplate = () => {
    onLoadTemplate(template);
    setShowModal(false);
  };

  // Safe helper function to get flight price
  const getFlightPrice = (flight) => {
    if (!flight) return 0;
    // Check for nested structure first
    if (flight.classes?.economy?.price) {
      return flight.classes.economy.price;
    }
    // Fall back to direct price property
    return flight.price || 0;
  };

  // Safe helper function to get hotel price
  const getHotelPrice = (hotel) => {
    if (!hotel) return 0;
    return hotel.price || hotel.pricePerNight || 0;
  };

  return (
    <>
      <div className="template-card" style={{ borderLeftColor: template.color }}>
        <div className="template-header" style={{ backgroundColor: template.color }}>
          <div className="template-icon-wrapper">
            {IconComponent && <IconComponent className="template-icon" />}
          </div>
          <span className="template-badge">{template.style}</span>
        </div>

        <div className="template-content">
          <h3 className="template-name">{template.name}</h3>
          <p className="template-description">{template.description}</p>

          <div className="template-highlights">
            {template.highlights?.slice(0, 3).map((highlight, idx) => (
              <span key={idx} className="highlight-tag">{highlight}</span>
            ))}
          </div>

          <div className="template-meta">
            <div className="meta-item">
              <FaCalendarAlt className="meta-icon" />
              <span>{template.duration} Days</span>
            </div>
            <div className="meta-item">
              <FaWallet className="meta-icon" />
              <span>₹{template.budget?.toLocaleString() || 0}</span>
            </div>
          </div>

          <p className="template-audience">
            <strong>Best For:</strong> {template.targetAudience}
          </p>

          <div className="template-actions">
            <button
              className="template-preview-btn"
              onClick={() => setShowModal(true)}
            >
              <FaEye /> Preview
            </button>
            <button
              className="template-load-btn"
              onClick={handleLoadTemplate}
              style={{ backgroundColor: template.color }}
            >
              <FaDownload /> Load Template
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showModal && (
        <div className="template-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="template-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ backgroundColor: template.color }}>
              <h2>
                {IconComponent && <IconComponent className="modal-icon" />}
                {template.name}
              </h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-overview">
                <h4>Trip Overview</h4>
                <p>{template.overview}</p>
              </div>

              <div className="modal-details">
                <div className="detail-section">
                  <h5>✈️ Flights Included</h5>
                  {template.flights && template.flights.length > 0 ? (
                    template.flights.map((flight, idx) => (
                      <div key={idx} className="detail-item">
                        <p>
                          <strong>{flight.from || flight.departure || 'N/A'}</strong> → <strong>{flight.to || flight.arrival || 'N/A'}</strong>
                        </p>
                        <p>₹{getFlightPrice(flight).toLocaleString()} (Economy)</p>
                      </div>
                    ))
                  ) : (
                    <p>No flights included</p>
                  )}
                </div>

                <div className="detail-section">
                  <h5>🏨 Hotels Included</h5>
                  {template.hotels && template.hotels.length > 0 ? (
                    template.hotels.map((hotel, idx) => (
                      <div key={idx} className="detail-item">
                        <p>
                          <strong>{hotel.name || 'Unknown Hotel'}</strong> - {hotel.city || hotel.location || 'N/A'}, {hotel.country || ''}
                        </p>
                        <p>⭐ {hotel.rating || 'N/A'}/5 | From ₹{getHotelPrice(hotel).toLocaleString()}/night</p>
                        {hotel.amenities && hotel.amenities.length > 0 && (
                          <p className="amenities">
                            Amenities: {hotel.amenities.slice(0, 3).join(', ')}...
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No hotels included</p>
                  )}
                </div>

                <div className="detail-section">
                  <h5>📍 Attractions & Activities</h5>
                  {template.destinations && template.destinations.length > 0 ? (
                    template.destinations.map((dest, idx) => (
                      <div key={idx} className="detail-item">
                        <p>
                          <strong>{dest.name || 'Unknown Destination'}</strong> - {dest.city || 'N/A'}, {dest.country || ''}
                        </p>
                        <p>
                          {dest.entryFee === 0 ? (
                            <span className="free-badge">FREE</span>
                          ) : (
                            <span>₹{(dest.entryFee || 0).toLocaleString()}</span>
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No destinations included</p>
                  )}
                </div>

                <div className="detail-section">
                  <h5>💰 Budget Breakdown</h5>
                  <div className="budget-breakdown">
                    <div className="budget-item">
                      <span>Total Budget</span>
                      <strong>₹{(template.budget || 0).toLocaleString()}</strong>
                    </div>
                    <div className="budget-item">
                      <span>Duration</span>
                      <strong>{template.duration || 0} Days</strong>
                    </div>
                    <div className="budget-item">
                      <span>Per Day</span>
                      <strong>₹{template.duration ? ((template.budget || 0) / template.duration).toLocaleString() : 0}</strong>
                    </div>
                  </div>
                </div>

                {template.highlights && template.highlights.length > 0 && (
                  <div className="detail-section highlights-included">
                    <h5>✨ What's Included</h5>
                    <div className="highlights-grid">
                      {template.highlights.map((highlight, idx) => (
                        <div key={idx} className="highlight-item">
                          <FaCheckCircle className="check-icon" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="modal-load-btn"
                  onClick={handleLoadTemplate}
                  style={{ backgroundColor: template.color }}
                >
                  <FaDownload /> Load This Template & Start Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateCard;