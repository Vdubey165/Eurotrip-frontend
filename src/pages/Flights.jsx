import React, { useState, useMemo, useEffect } from 'react';
import { mockFlights } from '../data/MockFlights';
import { useTripContext } from '../context/TripContext';
import DaySelector from '../Components/common/DaySelector';
import { generateFlightLink, openAffiliateLink } from '../utils/affiliateLinks';
import { useCurrency } from '../context/CurrencyContext';
import { 
  FaPlane, 
  FaExchangeAlt,
  FaFilter,
  FaBullseye,
  FaClock,
  FaSun,
  FaMoon,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';
import '../styles/Flights.css';

const Flights = () => {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [showDaySelector, setShowDaySelector] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedClasses, setSelectedClasses] = useState({});
  
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 200000 },
    maxStops: 'any',
    departureTime: 'any',
    airlines: [],
    sortBy: 'recommended'
  });
  
  const { addFlight, isInPlan, getMaxDay } = useTripContext();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const initialClasses = {};
    mockFlights.forEach(flight => {
      initialClasses[flight.id] = 'economy';
    });
    setSelectedClasses(initialClasses);
  }, []);

  const allAirlines = useMemo(() => {
    const airlines = new Set(mockFlights.map(f => f.airline));
    return Array.from(airlines).sort();
  }, []);

  const handleClassChange = (flightId, className) => {
    setSelectedClasses(prev => ({
      ...prev,
      [flightId]: className
    }));
  };

  const getSelectedPrice = (flight) => {
    const selectedClass = selectedClasses[flight.id] || 'economy';
    return flight.classes?.[selectedClass]?.price || 0;
  };

  const filteredFlights = useMemo(() => {
    let filtered = mockFlights;

    if (searchFrom.trim()) {
      filtered = filtered.filter(flight =>
        flight.from.toLowerCase().includes(searchFrom.toLowerCase())
      );
    }

    if (searchTo.trim()) {
      filtered = filtered.filter(flight =>
        flight.to.toLowerCase().includes(searchTo.toLowerCase())
      );
    }

    filtered = filtered.filter(flight => {
      const price = getSelectedPrice(flight);
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    });

    if (filters.maxStops === 'nonstop') {
      filtered = filtered.filter(flight => 
        flight.stops === 'Non-stop' || flight.stops === 0 || !flight.stops
      );
    } else if (filters.maxStops === 'one-stop') {
      filtered = filtered.filter(flight => 
        flight.stops === 'Non-stop' || flight.stops === '1 stop' || (flight.stops || 0) <= 1
      );
    }

    if (filters.departureTime !== 'any' && filters.departureTime) {
      filtered = filtered.filter(flight => {
        const hour = parseInt(flight.departure?.split(':')[0] || 0);
        if (filters.departureTime === 'morning') return hour >= 6 && hour < 12;
        if (filters.departureTime === 'afternoon') return hour >= 12 && hour < 18;
        if (filters.departureTime === 'evening') return hour >= 18 || hour < 6;
        return true;
      });
    }

    if (filters.airlines.length > 0) {
      filtered = filtered.filter(flight =>
        filters.airlines.includes(flight.airline)
      );
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => getSelectedPrice(a) - getSelectedPrice(b));
        break;
      case 'price-high':
        filtered.sort((a, b) => getSelectedPrice(b) - getSelectedPrice(a));
        break;
      case 'duration':
        filtered.sort((a, b) => {
          const aDur = parseInt(a.duration?.split('h')[0] || 0);
          const bDur = parseInt(b.duration?.split('h')[0] || 0);
          return aDur - bDur;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [searchFrom, searchTo, filters, selectedClasses]);

  const handleReset = () => {
    setSearchFrom('');
    setSearchTo('');
    setFilters({
      priceRange: { min: 0, max: 200000 },
      maxStops: 'any',
      departureTime: 'any',
      airlines: [],
      sortBy: 'recommended'
    });
    const resetClasses = {};
    mockFlights.forEach(flight => {
      resetClasses[flight.id] = 'economy';
    });
    setSelectedClasses(resetClasses);
  };

  const handleAddClick = (flight) => {
    setSelectedFlight(flight);
    setShowDaySelector(true);
  };

  const handleDaySelect = (day) => {
    if (selectedFlight) {
      const selectedClass = selectedClasses[selectedFlight.id] || 'economy';
      addFlight(selectedFlight, day, selectedClass);
      setShowDaySelector(false);
      setSelectedFlight(null);
    }
  };

  const handleBookFlight = (flight) => {
    const flightWithClass = {
      ...flight,
      selectedClass: selectedClasses[flight.id] || 'economy'
    };
    const affiliateUrl = generateFlightLink(flightWithClass);
    openAffiliateLink(affiliateUrl, 'flight', flight);
  };

  const toggleAirline = (airline) => {
    setFilters(prev => ({
      ...prev,
      airlines: prev.airlines.includes(airline)
        ? prev.airlines.filter(a => a !== airline)
        : [...prev.airlines, airline]
    }));
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 200000) count++;
    if (filters.maxStops !== 'any') count++;
    if (filters.departureTime !== 'any') count++;
    if (filters.airlines.length > 0) count += filters.airlines.length;
    return count;
  }, [filters]);

  return (
    <div className="flights-page">
      <div className="search-section">
        <h2><MdFlightTakeoff className="page-title-icon" /> Find Your Flight to Europe</h2>
        <div className="search-controls">
          <div className="search-inputs">
            <input
              type="text"
              placeholder="From (e.g., Delhi, Mumbai)"
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
              className="search-input"
            />
            <div className="swap-icon"><FaExchangeAlt /></div>
            <input
              type="text"
              placeholder="To (e.g., Paris, London)"
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3><FaBullseye /> Refine Your Search</h3>
            <button onClick={handleReset} className="reset-filters-btn">
              Reset All
            </button>
          </div>

          <div className="filters-content">
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select 
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                className="filter-select"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Shortest Duration</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                Price Range: {formatPrice(filters.priceRange.min)} - {formatPrice(filters.priceRange.max)}
              </label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters({
                    ...filters, 
                    priceRange: {...filters.priceRange, min: Number(e.target.value)}
                  })}
                  className="price-input"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters({
                    ...filters, 
                    priceRange: {...filters.priceRange, max: Number(e.target.value)}
                  })}
                  className="price-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Stops</label>
              <div className="stops-filters">
                {[
                  { value: 'any', label: 'Any' },
                  { value: 'nonstop', label: 'Nonstop' },
                  { value: 'one-stop', label: '1 Stop Max' }
                ].map(option => (
                  <button
                    key={option.value}
                    className={`filter-btn ${filters.maxStops === option.value ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, maxStops: option.value})}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Departure Time</label>
              <div className="time-filters">
                {[
                  { value: 'any', label: 'Any Time', icon: <FaClock /> },
                  { value: 'morning', label: 'Morning', icon: <FaSun /> },
                  { value: 'afternoon', label: 'Afternoon', icon: <FaSun /> },
                  { value: 'evening', label: 'Evening', icon: <FaMoon /> }
                ].map(option => (
                  <button
                    key={option.value}
                    className={`filter-btn ${filters.departureTime === option.value ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, departureTime: option.value})}
                  >
                    {option.icon} {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Airlines</label>
              <div className="airlines-filters">
                {allAirlines.map(airline => (
                  <button
                    key={airline}
                    className={`airline-filter-btn ${
                      filters.airlines.includes(airline) ? 'active' : ''
                    }`}
                    onClick={() => toggleAirline(airline)}
                  >
                    {airline}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flights-results">
        <div className="results-header">
          <h3>
            Available Flights
            <span className="results-count">({filteredFlights.length})</span>
          </h3>
          {activeFiltersCount > 0 && (
            <button onClick={handleReset} className="clear-filters-link">
              Clear all filters
            </button>
          )}
        </div>

        {filteredFlights.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon"><FaPlane /></div>
            <h4>No flights found</h4>
            <p>Try adjusting your filters or search criteria</p>
            <button onClick={handleReset} className="reset-btn">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="flights-grid">
            {filteredFlights.map(flight => {
              const isAdded = isInPlan('flights', flight.id);
              const selectedClass = selectedClasses[flight.id] || 'economy';
              const selectedPrice = getSelectedPrice(flight);
              
              return (
                <div key={flight.id} className={`flight-card ${isAdded ? 'added-to-plan' : ''}`}>
                  {isAdded && (
                    <div className="added-badge"><FaCheck /> In Your Plan</div>
                  )}
                  
                  <div className="flight-header">
                    <span className="airline">{flight.airline}</span>
                    <span className="price">{formatPrice(selectedPrice)}</span>
                  </div>
                  
                  <div className="flight-route">
                    <div className="route-info">
                      <p className="city">{flight.from}</p>
                      <p className="time">{flight.departure}</p>
                    </div>
                    <div className="route-middle">
                      <p className="duration">{flight.duration}</p>
                      <div className="route-line">
                        <FaPlane className="route-icon" />
                      </div>
                      {flight.stops && flight.stops !== 'Non-stop' && (
                        <p className="stops">{flight.stops}</p>
                      )}
                    </div>
                    <div className="route-info">
                      <p className="city">{flight.to}</p>
                      <p className="time">{flight.arrival}</p>
                    </div>
                  </div>

                  <div className="flight-classes">
                    <label className="class-label">Select Class:</label>
                    <div className="class-options">
                      {Object.entries(flight.classes).map(([className, classInfo]) => (
                        <label 
                          key={className}
                          className={`class-option ${!classInfo.available ? 'unavailable' : ''}`}
                        >
                          <input
                            type="radio"
                            name={`flight-${flight.id}-class`}
                            value={className}
                            checked={selectedClass === className}
                            onChange={() => handleClassChange(flight.id, className)}
                            disabled={!classInfo.available}
                          />
                          <span className="class-details">
                            <span className="class-name">
                              {className.charAt(0).toUpperCase() + className.slice(1)}
                            </span>
                            <span className="class-price">
                              {classInfo.available 
                                ? formatPrice(classInfo.price)
                                : 'Sold Out'
                              }
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flight-footer">
                    <span className="date"><FaCalendarAlt /> {flight.date}</span>
                    <div className="flight-actions">
                      <button 
                        className="book-btn"
                        onClick={() => handleBookFlight(flight)}
                        title="Search and book this flight on Skyscanner"
                      >
                        <FaExternalLinkAlt /> Book on Skyscanner
                      </button>
                      <button 
                        className={`add-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAddClick(flight)}
                        disabled={isAdded}
                      >
                        {isAdded ? <><FaCheck /> Added</> : 'Add to Plan'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <DaySelector
        isOpen={showDaySelector}
        onClose={() => {
          setShowDaySelector(false);
          setSelectedFlight(null);
        }}
        onSelect={handleDaySelect}
        currentMaxDay={getMaxDay()}
        itemName={selectedFlight ? `${selectedFlight.from} → ${selectedFlight.to}` : ''}
      />
    </div>
  );
};

export default Flights;