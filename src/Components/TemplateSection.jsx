// src/components/TemplatesSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { tripTemplates } from '../data/TripTemplates';
import TemplateCard from '../Components/layout/TemplateCard';
import { FaGift } from 'react-icons/fa';
import '../styles/TemplateSection.css';

const TemplatesSection = () => {
  const navigate = useNavigate();
  const { loadTemplateTrip } = useTripContext();

  const handleLoadTemplate = (template) => {
    try {
      // Load template into trip context
      loadTemplateTrip(template);
      
      // Show success message
      alert(`✨ "${template.name}" template loaded! Now customize it to your preferences.`);
      
      // Navigate to flights page
      navigate('/flights');
    } catch (error) {
      console.error('Error loading template:', error);
      alert('Failed to load template. Please try again.');
    }
  };

  return (
    <section className="templates-section">
      <div className="templates-container">
        <div className="section-header">
          <h2>
            <FaGift className="section-icon" />
            Trip Templates
          </h2>
          <p>Choose from pre-planned itineraries and customize them to your needs</p>
        </div>

        <div className="templates-grid">
          {tripTemplates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              onLoadTemplate={handleLoadTemplate}
            />
          ))}
        </div>

        <div className="templates-info">
          <div className="info-card">
            <h4>🎯 How It Works</h4>
            <ol>
              <li>Browse our curated trip templates</li>
              <li>Click "Load Template" to get started</li>
              <li>Customize flights, hotels, and attractions</li>
              <li>Adjust budget and dates as needed</li>
              <li>Save your personalized trip</li>
            </ol>
          </div>

          <div className="info-card">
            <h4>💡 Template Features</h4>
            <ul>
              <li>Pre-selected flights with pricing</li>
              <li>Curated hotel recommendations</li>
              <li>Hand-picked attractions & activities</li>
              <li>Realistic budget estimates</li>
              <li>Fully editable & customizable</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>🌍 All Templates Include</h4>
            <ul>
              <li>Roundtrip flights from India</li>
              <li>Accommodation in key cities</li>
              <li>Must-see attractions</li>
              <li>Suggested activities</li>
              <li>Estimated expenses</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;