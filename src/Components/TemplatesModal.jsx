// src/components/TemplatesModal.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { tripTemplates } from '../data/TripTemplates';
import { mockFlights } from '../data/MockFlights';
import { mockHotels } from '../data/MockHotels';
import { mockDestinations } from '../data/MockDestinations';
import TemplateCard from './TemplateCard';
import { FaTimes } from 'react-icons/fa';
import '../styles/TemplatesModal.css';

const TemplatesModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { loadTemplateTrip } = useTripContext();
  const [loadedTemplates, setLoadedTemplates] = useState([]);

  // Load full template data when component mounts
  useEffect(() => {
    const templatesWithFullData = tripTemplates.map(template => {
      // Load flights by matching IDs
      const flights = template.flightIds
        .map(id => mockFlights.find(flight => flight.id === id))
        .filter(Boolean); // Remove any undefined values

      // Load hotels by matching IDs
      const hotels = template.hotelIds
        .map(id => mockHotels.find(hotel => hotel.id === id))
        .filter(Boolean);

      // Load destinations by matching IDs
      const destinations = template.destinationIds
        .map(id => mockDestinations.find(dest => dest.id === id))
        .filter(Boolean);

      // Return template with full data objects
      return {
        ...template,
        flights,
        hotels,
        destinations
      };
    });

    setLoadedTemplates(templatesWithFullData);
  }, []);

  const handleLoadTemplate = (template) => {
    try {
      loadTemplateTrip(template);
      alert(`✨ "${template.name}" template loaded! Now customize it to your preferences.`);
      onClose();
      navigate('/flights');
    } catch (error) {
      console.error('Error loading template:', error);
      alert('Failed to load template. Please try again.');
    }
  };

  return (
    <div className="templates-modal-overlay" onClick={onClose}>
      <div className="templates-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="templates-modal-header">
          <h2>Choose Your Trip Template</h2>
          <p>Select a template and customize it to create your perfect trip</p>
          <button className="modal-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="templates-modal-content">
          <div className="templates-grid-modal">
            {loadedTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onLoadTemplate={handleLoadTemplate}
              />
            ))}
          </div>
        </div>

        <div className="templates-modal-footer">
          <p>💡 <strong>Tip:</strong> You can fully customize any template after loading. Add, remove, or change flights, hotels, destinations, and budget.</p>
        </div>
      </div>
    </div>
  );
};

export default TemplatesModal;