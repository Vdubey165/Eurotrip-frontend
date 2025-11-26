import React, { useMemo, useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  FaCalendarAlt, 
  FaTimes, 
  FaPlus, 
  FaPlane, 
  FaHotel, 
  FaMapMarkerAlt, 
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaTheaterMasks,
  FaBullseye,
  FaUsers,
  FaFileAlt,
  FaClock,
  FaTag,
  FaStar,
  FaWallet,
  FaMap
} from 'react-icons/fa';
import '../../styles/ItineraryPlanner.css';
import WeatherWidget from '../WeatherWidget';

const ItineraryPlanner = () => {
  const { 
    tripPlan, 
    removeFlight, 
    removeHotel, 
    removeDestination,
    updateItemDay,
    getMaxDay,
    customActivities,
    addCustomActivity,
    removeCustomActivity
  } = useTripContext();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    day: 1,
    title: '',
    description: '',
    time: '',
    category: ''
  });

  const totalDays = getMaxDay();

  // Organize items by days with useMemo for performance
  const itinerary = useMemo(() => {
    const maxDay = Math.max(totalDays, 1);
    const days = {};

    // Initialize all days
    for (let i = 1; i <= maxDay; i++) {
      days[i] = [];
    }

    // Add items to their respective days
    tripPlan.flights?.forEach(flight => {
      const day = flight.day || 1;
      if (!days[day]) days[day] = [];
      days[day].push({ type: 'flight', item: flight });
    });

    tripPlan.hotels?.forEach(hotel => {
      const day = hotel.day || 1;
      if (!days[day]) days[day] = [];
      days[day].push({ type: 'hotel', item: hotel });
    });

    tripPlan.destinations?.forEach(dest => {
      const day = dest.day || 1;
      if (!days[day]) days[day] = [];
      days[day].push({ type: 'destination', item: dest });
    });

    customActivities?.forEach(activity => {
      const day = activity.day || 1;
      if (!days[day]) days[day] = [];
      days[day].push({ type: 'custom', item: activity });
    });

    return days;
  }, [tripPlan, customActivities, totalDays]);

  const handleDayChange = (type, id, newDay) => {
    const dayNumber = parseInt(newDay, 10);
    if (type === 'custom') {
      // Handle custom activity day change
      const activity = customActivities.find(a => a.id === id);
      if (activity) {
        removeCustomActivity(id);
        addCustomActivity({ ...activity, day: dayNumber });
      }
    } else {
      updateItemDay(type, id, dayNumber);
    }
  };

  const handleRemove = (type, id, itemName) => {
    if (window.confirm(`Are you sure you want to remove "${itemName}" from your itinerary?`)) {
      switch(type) {
        case 'flight':
          removeFlight(id);
          break;
        case 'hotel':
          removeHotel(id);
          break;
        case 'destination':
          removeDestination(id);
          break;
        case 'custom':
          removeCustomActivity(id);
          break;
        default:
          break;
      }
    }
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (newActivity.title && newActivity.day) {
      addCustomActivity({
        ...newActivity,
        day: parseInt(newActivity.day, 10)
      });
      setNewActivity({
        day: 1,
        title: '',
        description: '',
        time: '',
        category: ''
      });
      setShowAddForm(false);
    }
  };

  // Calculate trip summary
  const tripSummary = useMemo(() => {
    const summary = {
      totalFlights: tripPlan.flights?.length || 0,
      totalHotels: tripPlan.hotels?.length || 0,
      totalDestinations: tripPlan.destinations?.length || 0,
      totalCustom: customActivities?.length || 0,
      totalCost: 0
    };

    tripPlan.hotels?.forEach(hotel => {
      summary.totalCost += hotel.price || 0;
    });

    return summary;
  }, [tripPlan, customActivities]);

  const hasItems = tripSummary.totalFlights > 0 || 
                   tripSummary.totalHotels > 0 || 
                   tripSummary.totalDestinations > 0 ||
                   tripSummary.totalCustom > 0;

  const getCategoryIcon = (category) => {
    const icons = {
      'Food': FaUtensils,
      'Transport': FaCar,
      'Shopping': FaShoppingBag,
      'Entertainment': FaTheaterMasks,
      'Activity': FaBullseye,
      'Meeting': FaUsers,
      'Other': FaFileAlt
    };
    return icons[category] || FaFileAlt;
  };

  return (
    <div className="itinerary-planner">
      <div className="itinerary-header">
        <h2 className="itinerary-title">
          <FaCalendarAlt style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Your Itinerary
        </h2>
        <button 
          className="add-activity-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          title="Add custom activity"
        >
          {showAddForm ? (
            <>
              <FaTimes /> Cancel
            </>
          ) : (
            <>
              <FaPlus /> Add Activity
            </>
          )}
        </button>
      </div>

      {showAddForm && (
        <form className="add-activity-form" onSubmit={handleAddActivity}>
          <div className="form-row">
            <select
              value={newActivity.day}
              onChange={(e) => setNewActivity({...newActivity, day: e.target.value})}
              required
              className="activity-input"
            >
              <option value="">Select Day</option>
              {Array.from({ length: Math.max(totalDays + 2, 5) }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>Day {d}</option>
              ))}
            </select>
            <select
              value={newActivity.category}
              onChange={(e) => setNewActivity({...newActivity, category: e.target.value})}
              required
              className="activity-input"
            >
              <option value="">Category</option>
              <option value="Food">Food & Dining</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Activity">Activity</option>
              <option value="Meeting">Meeting</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="time"
              placeholder="Time"
              value={newActivity.time}
              onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
              className="activity-input"
            />
          </div>
          <input
            type="text"
            placeholder="Activity title (e.g., Lunch at Cafe Rouge)"
            value={newActivity.title}
            onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
            required
            className="activity-input activity-input-full"
          />
          <textarea
            placeholder="Description or notes (optional)"
            value={newActivity.description}
            onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
            className="activity-input activity-textarea"
            rows="2"
          />
          <button type="submit" className="submit-activity-btn">
            Add to Itinerary
          </button>
        </form>
      )}

      {hasItems && (
        <div className="trip-summary">
          <span className="summary-item">
            <FaPlane style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {tripSummary.totalFlights} {tripSummary.totalFlights === 1 ? 'Flight' : 'Flights'}
          </span>
          <span className="summary-item">
            <FaHotel style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {tripSummary.totalHotels} {tripSummary.totalHotels === 1 ? 'Hotel' : 'Hotels'}
          </span>
          <span className="summary-item">
            <FaMapMarkerAlt style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {tripSummary.totalDestinations} {tripSummary.totalDestinations === 1 ? 'Destination' : 'Destinations'}
          </span>
          {tripSummary.totalCustom > 0 && (
            <span className="summary-item">
              <FaFileAlt style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              {tripSummary.totalCustom} {tripSummary.totalCustom === 1 ? 'Activity' : 'Activities'}
            </span>
          )}
          {tripSummary.totalCost > 0 && (
            <span className="summary-item total-cost">
              <FaWallet style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              ₹{tripSummary.totalCost.toLocaleString()}
            </span>
          )}
        </div>
      )}

      <div className="itinerary-content">
        {!hasItems ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FaMap size={48} />
            </div>
            <h3>Your itinerary is empty</h3>
            <p>Start planning your trip by adding:</p>
            <ul className="empty-state-list">
              <li>
                <FaPlane style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Flights to your destinations
              </li>
              <li>
                <FaHotel style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Hotels for comfortable stays
              </li>
              <li>
                <FaMapMarkerAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Destinations to explore
              </li>
              <li>
                <FaFileAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Custom activities and plans
              </li>
            </ul>
            <button 
              className="add-activity-btn-large"
              onClick={() => setShowAddForm(true)}
            >
              <FaPlus /> Add Your First Activity
            </button>
          </div>
        ) : (
          <div className="itinerary-timeline">
            {Object.entries(itinerary)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([day, items]) => (
                <div key={day} className="itinerary-day">
                  <div className="day-marker">
                    <span className="day-number">
                      <FaCalendarAlt style={{ marginRight: '6px', verticalAlign: 'middle', fontSize: '14px' }} />
                      Day {day}
                    </span>
                    <span className="day-items-count">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  
                  <div className="day-content">
                    {items.length === 0 ? (
                      <div className="empty-day">
                        <p>No activities planned for this day</p>
                        <button 
                          className="add-to-day-btn"
                          onClick={() => {
                            setNewActivity({...newActivity, day: parseInt(day)});
                            setShowAddForm(true);
                          }}
                        >
                          <FaPlus /> Add Activity
                        </button>
                      </div>
                    ) : (
                      items
                        .sort((a, b) => {
                          // Sort by time if available
                          if (a.item.time && b.item.time) {
                            return a.item.time.localeCompare(b.item.time);
                          }
                          return 0;
                        })
                        .map((entry, index) => (
                        <div key={`${entry.type}-${entry.item.id}-${index}`}>
                          {entry.type === 'flight' && (
                            <div className="itinerary-item flight-item">
                              <div className="item-icon">
                                <FaPlane />
                              </div>
                              <div className="item-details">
                                <h4>{entry.item.airline || 'Flight'} to {entry.item.to?.split('(')[0] || entry.item.to}</h4>
                                <p className="item-route">
                                  {entry.item.from} → {entry.item.to}
                                </p>
                                <div className="item-meta">
                                  <span className="item-time">
                                    <FaClock style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                    {entry.item.departure || 'TBD'}
                                  </span>
                                  {entry.item.duration && (
                                    <span className="item-duration">
                                      <FaClock style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                      {entry.item.duration}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="item-actions">
                                <select
                                  value={entry.item.day || 1}
                                  onChange={(e) => handleDayChange('flights', entry.item.id, e.target.value)}
                                  className="day-selector-small"
                                  title="Change day"
                                >
                                  {Array.from({ length: Math.max(totalDays + 2, 5) }, (_, i) => i + 1).map(d => (
                                    <option key={d} value={d}>Day {d}</option>
                                  ))}
                                </select>
                                <button 
                                  className="remove-btn-small"
                                  onClick={() => handleRemove('flight', entry.item.id, `Flight to ${entry.item.to}`)}
                                  title="Remove"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            </div>
                          )}

                          {entry.type === 'hotel' && (
                            <div className="itinerary-item hotel-item">
                              <div className="item-icon">
                                <FaHotel />
                              </div>
                              <div className="item-details">
                                <h4>{entry.item.name}</h4>
                                <p className="item-location">
                                  <FaMapMarkerAlt style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                  {entry.item.location}
                                </p>
                                <div className="item-meta">
                                  <span className="item-price">
                                    ₹{entry.item.price?.toLocaleString() || 0}/night
                                  </span>
                                  {entry.item.rating && (
                                    <span className="item-rating">
                                      <FaStar style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                      {entry.item.rating}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="item-actions">
                                <select
                                  value={entry.item.day || 1}
                                  onChange={(e) => handleDayChange('hotels', entry.item.id, e.target.value)}
                                  className="day-selector-small"
                                  title="Change day"
                                >
                                  {Array.from({ length: Math.max(totalDays + 2, 5) }, (_, i) => i + 1).map(d => (
                                    <option key={d} value={d}>Day {d}</option>
                                  ))}
                                </select>
                                <button 
                                  className="remove-btn-small"
                                  onClick={() => handleRemove('hotel', entry.item.id, entry.item.name)}
                                  title="Remove"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            </div>
                          )}

                          {entry.type === 'destination' && (
                            <div className="itinerary-item destination-item">
                              <div className="item-icon">
                                <FaMapMarkerAlt />
                              </div>
                              <div className="item-details">
                                <h4>{entry.item.name}</h4>
                                <p className="item-location">
                                  {entry.item.city}, {entry.item.country}
                                </p>
                                  <WeatherWidget city={entry.item.city} compact={true} />

                                <div className="item-meta">
                                  {entry.item.visitDuration && (
                                    <span className="item-duration">
                                      <FaClock style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                      {entry.item.visitDuration}
                                    </span>
                                  )}
                                  {entry.item.category && (
                                    <span className="item-category">
                                      <FaTag style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                      {entry.item.category}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="item-actions">
                                <select
                                  value={entry.item.day || 1}
                                  onChange={(e) => handleDayChange('destinations', entry.item.id, e.target.value)}
                                  className="day-selector-small"
                                  title="Change day"
                                >
                                  {Array.from({ length: Math.max(totalDays + 2, 5) }, (_, i) => i + 1).map(d => (
                                    <option key={d} value={d}>Day {d}</option>
                                  ))}
                                </select>
                                <button 
                                  className="remove-btn-small"
                                  onClick={() => handleRemove('destination', entry.item.id, entry.item.name)}
                                  title="Remove"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            </div>
                          )}

                          {entry.type === 'custom' && (
                            <div className="itinerary-item custom-item">
                              <div className="item-icon">
                                {React.createElement(getCategoryIcon(entry.item.category))}
                              </div>
                              <div className="item-details">
                                <h4>{entry.item.title}</h4>
                                {entry.item.description && (
                                  <p className="item-description">{entry.item.description}</p>
                                )}
                                <div className="item-meta">
                                  {entry.item.time && (
                                    <span className="item-time">
                                      <FaClock style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                      {entry.item.time}
                                    </span>
                                  )}
                                  {entry.item.category && (
                                    <span className="item-category">
                                      <FaTag style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                      {entry.item.category}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="item-actions">
                                <select
                                  value={entry.item.day || 1}
                                  onChange={(e) => handleDayChange('custom', entry.item.id, e.target.value)}
                                  className="day-selector-small"
                                  title="Change day"
                                >
                                  {Array.from({ length: Math.max(totalDays + 2, 5) }, (_, i) => i + 1).map(d => (
                                    <option key={d} value={d}>Day {d}</option>
                                  ))}
                                </select>
                                <button 
                                  className="remove-btn-small"
                                  onClick={() => handleRemove('custom', entry.item.id, entry.item.title)}
                                  title="Remove"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryPlanner;