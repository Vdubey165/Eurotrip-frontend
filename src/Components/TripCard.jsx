import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { tripAPI } from '../services/api';
import { 
  FaCalendarAlt, 
  FaPlane, 
  FaHotel, 
  FaMapMarkerAlt, 
  FaFolderOpen, 
  FaTrashAlt,
  FaDownload,
  FaSpinner
} from 'react-icons/fa';
import { generateTripPDF } from '../services/pdfGenerator';
import '../styles/TripCard.css';

const TripCard = ({ trip, onDelete }) => {
  const navigate = useNavigate();
  const { loadTrip } = useTripContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Calculate trip stats
  const totalFlights = trip.flights?.length || 0;
  const totalHotels = trip.hotels?.length || 0;
  const totalDestinations = trip.destinations?.length || 0;
  const totalDays = Math.max(
    ...trip.flights?.map(f => f.day || 1) || [0],
    ...trip.hotels?.map(h => h.day || 1) || [0],
    ...trip.destinations?.map(d => d.day || 1) || [0]
  );

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Handle load trip
  const handleLoadTrip = () => {
    loadTrip(trip);
    navigate('/flights'); // Redirect to flights page after loading
  };

  // Handle export PDF
  const handleExportPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await generateTripPDF(trip);
      setIsGeneratingPDF(false);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('Failed to generate PDF');
      setIsGeneratingPDF(false);
    }
  };

  // Handle delete trip
  const handleDeleteTrip = async () => {
    try {
      setIsDeleting(true);
      await tripAPI.deleteTrip(trip._id);
      onDelete(trip._id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete trip');
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="trip-card">
        <div className="trip-card-header">
          <h3 className="trip-name">{trip.tripName}</h3>
          <div className="trip-budget">
            <span className="budget-label">Budget</span>
            <span className="budget-amount">
              ₹{(trip.totalBudget || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="trip-card-body">
          <div className="trip-info">
            <div className="info-item">
              <span className="info-icon">
                <FaCalendarAlt />
              </span>
              <span className="info-text">{totalDays} {totalDays === 1 ? 'Day' : 'Days'}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">
                <FaPlane />
              </span>
              <span className="info-text">{totalFlights} {totalFlights === 1 ? 'Flight' : 'Flights'}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">
                <FaHotel />
              </span>
              <span className="info-text">{totalHotels} {totalHotels === 1 ? 'Hotel' : 'Hotels'}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">
                <FaMapMarkerAlt />
              </span>
              <span className="info-text">{totalDestinations} {totalDestinations === 1 ? 'Place' : 'Places'}</span>
            </div>
          </div>

          <div className="trip-meta">
            <span className="trip-date">
              Created: {formatDate(trip.createdAt)}
            </span>
            {trip.updatedAt !== trip.createdAt && (
              <span className="trip-date">
                Updated: {formatDate(trip.updatedAt)}
              </span>
            )}
          </div>
        </div>

        <div className="trip-card-footer">
          <button 
            className="load-trip-btn"
            onClick={handleLoadTrip}
          >
            <FaFolderOpen style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Load Trip
          </button>
          <button 
            className="export-trip-btn"
            onClick={handleExportPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <FaSpinner style={{ marginRight: '6px', verticalAlign: 'middle', animation: 'spin 1s linear infinite' }} />
                Generating...
              </>
            ) : (
              <>
                <FaDownload style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Export PDF
              </>
            )}
          </button>
          <button 
            className="delete-trip-btn"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <FaTrashAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Trip?</h3>
            <p>Are you sure you want to delete <strong>{trip.tripName}</strong>?</p>
            <p className="warning-text">This action cannot be undone.</p>
            
            <div className="delete-modal-actions">
              <button 
                className="cancel-delete-btn"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={handleDeleteTrip}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TripCard;