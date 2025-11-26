import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import '../styles/SaveTripModal.css';

const SaveTripModal = ({ isOpen, onClose }) => {
  const { tripName, setTripName, saveTrip, isSaving, currentTripId } = useTripContext();
  const { isAuthenticated } = useAuth();
  const [localTripName, setLocalTripName] = useState(tripName);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    // Validation
    if (!localTripName.trim()) {
      setError('Please enter a trip name');
      return;
    }

    if (!isAuthenticated) {
      setError('Please login to save trips');
      return;
    }

    setError(null);
    const result = await saveTrip(localTripName);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  const handleClose = () => {
    setError(null);
    setShowSuccess(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{currentTripId ? 'Update Trip' : 'Save Your Trip'}</h2>
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {showSuccess ? (
            <div className="success-animation">
              <div className="success-icon">✓</div>
              <p>Trip saved successfully!</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="tripName">Trip Name</label>
                <input
                  type="text"
                  id="tripName"
                  value={localTripName}
                  onChange={(e) => setLocalTripName(e.target.value)}
                  placeholder="e.g., My Paris Adventure"
                  disabled={isSaving}
                  autoFocus
                />
                <small className="hint">
                  Give your trip a memorable name
                </small>
              </div>

              {error && (
                <div className="error-message">
                  <span>⚠️</span> {error}
                </div>
              )}

              {!isAuthenticated && (
                <div className="info-message">
                  <span>ℹ️</span> Please login to save your trips
                </div>
              )}
            </>
          )}
        </div>

        {!showSuccess && (
          <div className="modal-footer">
            <button 
              className="cancel-button" 
              onClick={handleClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button 
              className="save-button" 
              onClick={handleSave}
              disabled={isSaving || !isAuthenticated}
            >
              {isSaving ? 'Saving...' : currentTripId ? 'Update Trip' : 'Save Trip'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveTripModal;