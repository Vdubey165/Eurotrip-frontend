import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tripAPI } from '../services/api';
import TripCard from '../Components/TripCard';
import '../styles/MyTrips.css';

const MyTrips = () => {
  const { isAuthenticated } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trips on component mount
  useEffect(() => {
    const fetchTrips = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await tripAPI.getTrips();
        setTrips(response.data || []);
      } catch (err) {
        console.error('Fetch trips error:', err);
        setError(err.response?.data?.message || 'Failed to load trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [isAuthenticated]);

  // Handle trip deletion
  const handleTripDelete = (tripId) => {
    setTrips(trips.filter(trip => trip._id !== tripId));
  };

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="my-trips-page">
        <div className="not-authenticated">
          <div className="auth-prompt">
            <span className="lock-icon">🔒</span>
            <h2>Login Required</h2>
            <p>Please login to view your saved trips</p>
            <div className="auth-buttons">
              <Link to="/login" className="login-link-btn">Login</Link>
              <Link to="/register" className="register-link-btn">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="my-trips-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your trips...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="my-trips-page">
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <h2>Error Loading Trips</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (trips.length === 0) {
    return (
      <div className="my-trips-page">
        <div className="page-header">
          <h1>My Trips</h1>
        </div>
        <div className="empty-state">
          <span className="empty-icon">✈️</span>
          <h2>No Trips Yet</h2>
          <p>Start planning your dream Europe adventure!</p>
          <Link to="/flights" className="start-planning-btn">
            Start Planning
          </Link>
        </div>
      </div>
    );
  }

  // Trips list
  return (
    <div className="my-trips-page">
      <div className="page-header">
        <div>
          <h1>My Trips</h1>
          <p className="trips-count">{trips.length} {trips.length === 1 ? 'trip' : 'trips'} saved</p>
        </div>
        <Link to="/flights" className="new-trip-btn">
          + New Trip
        </Link>
      </div>

      <div className="trips-grid">
        {trips.map(trip => (
          <TripCard 
            key={trip._id} 
            trip={trip}
            onDelete={handleTripDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTrips;