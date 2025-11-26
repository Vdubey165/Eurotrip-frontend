// src/components/common/DaySelector.jsx
import React, { useState } from 'react';
import '../../styles/DaySelector.css';

const DaySelector = ({ isOpen, onClose, onSelect, currentMaxDay, itemName }) => {
  const [selectedDay, setSelectedDay] = useState(currentMaxDay > 0 ? currentMaxDay : 1);
  const [createNewDay, setCreateNewDay] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSelect(selectedDay);
    onClose();
  };

  const maxDay = currentMaxDay || 1;
  const days = Array.from({ length: maxDay + 3 }, (_, i) => i + 1); // Show current days + 3 more

  return (
    <div className="day-selector-overlay" onClick={onClose}>
      <div className="day-selector-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📅 Select Day</h3>
          <button className="close-modal" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            When would you like to add <strong>{itemName}</strong> to your itinerary?
          </p>

          <div className="day-options">
            {days.map(day => (
              <button
                key={day}
                className={`day-option ${selectedDay === day ? 'selected' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                <span className="day-number">Day {day}</span>
                {day <= maxDay && <span className="day-badge">Existing</span>}
                {day > maxDay && <span className="day-badge new">New</span>}
              </button>
            ))}
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="confirm-btn" onClick={handleSubmit}>
              Add to Day {selectedDay}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaySelector;