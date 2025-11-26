import React, { useState, useEffect } from 'react';
import { mockDestinations, destinationCities } from '../data/MockDestinations';
import { useTripContext } from '../context/TripContext';
import DaySelector from '../Components/common/DaySelector';
import ImageCarousel from '../Components/common/ImageCarousel';
import WeatherWidget from '../Components/WeatherWidget'; // ADD THIS
import { useCurrency } from '../context/CurrencyContext';
import { 
  FaMapMarkerAlt, 
  FaStar,
  FaCheck,
  FaFrown
} from 'react-icons/fa';
import '../styles/Destinations.css';

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [filteredDestinations, setFilteredDestinations] = useState(mockDestinations);
  const [showDaySelector, setShowDaySelector] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  const { addDestination, isInPlan, getMaxDay } = useTripContext();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = mockDestinations;

      if (selectedCity !== 'all') {
        filtered = filtered.filter(dest => dest.city === selectedCity);
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(dest =>
          dest.name?.toLowerCase().includes(query) ||
          dest.city?.toLowerCase().includes(query) ||
          dest.country?.toLowerCase().includes(query) ||
          dest.category?.toLowerCase().includes(query) ||
          dest.description?.toLowerCase().includes(query)
        );
      }

      setFilteredDestinations(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCity]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setFilteredDestinations(mockDestinations);
  };

  const handleAddClick = (destination) => {
    setSelectedDestination(destination);
    setShowDaySelector(true);
  };

  const handleDaySelect = (day) => {
    if (selectedDestination) {
      addDestination(selectedDestination, day);
      setShowDaySelector(false);
      setSelectedDestination(null);
    }
  };

  return (
    <div className="destinations-page">
      <div className="search-section">
        <h2><FaMapMarkerAlt className="page-title-icon" /> Explore Popular European Destinations</h2>
        
        <div className="search-form">
          <input
            type="text"
            placeholder="Search attractions, cities, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search destinations"
          />
          {(searchQuery || selectedCity !== 'all') && (
            <button 
              onClick={handleReset} 
              className="reset-button"
              aria-label="Clear all filters"
            >
              Clear
            </button>
          )}
        </div>

        <div className="city-filters">
          <button
            className={`city-btn ${selectedCity === 'all' ? 'active' : ''}`}
            onClick={() => handleCityChange('all')}
            aria-label="Show all cities"
          >
            All Cities
          </button>
          {destinationCities.map(city => (
            <button
              key={city.name}
              className={`city-btn ${selectedCity === city.name ? 'active' : ''}`}
              onClick={() => handleCityChange(city.name)}
              aria-label={`Filter by ${city.name}`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      <DaySelector
        isOpen={showDaySelector}
        onClose={() => {
          setShowDaySelector(false);
          setSelectedDestination(null);
        }}
        onSelect={handleDaySelect}
        currentMaxDay={getMaxDay()}
        itemName={selectedDestination ? selectedDestination.name : ''}
      />

      <div className="destinations-results">
        <h3>
          {selectedCity === 'all' 
            ? `All Destinations (${filteredDestinations.length})`
            : `Destinations in ${selectedCity} (${filteredDestinations.length})`
          }
        </h3>

        {filteredDestinations.length === 0 ? (
          <div className="no-results">
            <p><FaFrown /> No destinations found</p>
            {searchQuery && (
              <p>Try searching for: Eiffel Tower, Colosseum, Big Ben, Sagrada Familia</p>
            )}
            <button onClick={handleReset} className="reset-button">
              Show All Destinations
            </button>
          </div>
        ) : (
          <div className="destinations-grid">
            {filteredDestinations.map(destination => {
              const inPlan = isInPlan('destinations', destination.id);
              
              return (
                <div 
                  key={destination.id} 
                  className={`destination-card ${inPlan ? 'in-plan' : ''}`}
                >
                  {inPlan && (
                    <div className="in-plan-badge">
                      <FaCheck /> In Your Plan
                    </div>
                  )}

                  <div className="destination-image-container">
                    {destination.images && destination.images.length > 0 ? (
                      <ImageCarousel 
                        images={destination.images} 
                        altText={destination.name}
                      />
                    ) : (
                      <div className="destination-image">
                        <img 
                          src={destination.image || 'https://via.placeholder.com/400x250?text=Destination+Image'} 
                          alt={`${destination.name} in ${destination.city}`}
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    {destination.mustSee && (
                      <div className="must-see-badge"><FaStar /> Must See</div>
                    )}
                    {destination.entryFee === 0 && (
                      <div className="free-badge">FREE</div>
                    )}
                  </div>

                  <div className="destination-content">
                    <div className="destination-header">
                      <h3 className="destination-name">{destination.name}</h3>
                      <span className="destination-category">{destination.category}</span>
                    </div>

                    <p className="destination-location">
                      <FaMapMarkerAlt /> {destination.city}, {destination.country}
                    </p>

                    {/* ADD WEATHER WIDGET HERE */}
                    <WeatherWidget city={destination.city} compact={true} />

                    <p className="destination-description">
                      {destination.description}
                    </p>

                    <div className="destination-info">
                      {destination.visitDuration && (
                        <div className="info-item">
                          <span className="info-label">Duration:</span>
                          <span className="info-value">{destination.visitDuration}</span>
                        </div>
                      )}
                      {destination.bestTimeToVisit && (
                        <div className="info-item">
                          <span className="info-label">Best Time:</span>
                          <span className="info-value">{destination.bestTimeToVisit}</span>
                        </div>
                      )}
                      {destination.visitors && (
                        <div className="info-item">
                          <span className="info-label">Visitors:</span>
                          <span className="info-value">{destination.visitors}</span>
                        </div>
                      )}
                    </div>

                    <div className="destination-footer">
                      <div className="destination-price">
                        <span className="price-label">Entry Fee</span>
                        <span className="price-amount">
                          {destination.entryFee === 0 
                            ? 'FREE' 
                            : formatPrice(destination.entryFee)
                          }
                        </span>
                      </div>
                      <button 
                        className={`add-btn ${inPlan ? 'added' : ''}`}
                        onClick={() => handleAddClick(destination)}
                        disabled={inPlan}
                        aria-label={inPlan 
                          ? `${destination.name} already added to itinerary` 
                          : `Add ${destination.name} to your itinerary`
                        }
                      >
                        {inPlan ? <><FaCheck /> Added</> : 'Add to Itinerary'}
                      </button>
                    </div>

                    {destination.rating && (
                      <div className="destination-rating">
                        <FaStar /> {destination.rating} Rating
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;