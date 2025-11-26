import React, { useState, useEffect, useMemo } from 'react';
import { mockHotels } from '../data/MockHotels';
import { useTripContext } from '../context/TripContext';
import DaySelector from '../Components/common/DaySelector';
import ImageCarousel from '../Components/common/ImageCarousel';
import { generateHotelLink, openAffiliateLink } from '../utils/affiliateLinks';
import { useCurrency } from '../context/CurrencyContext';
import { 
  FaHotel, 
  FaTimes,
  FaFilter,
  FaBullseye,
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
  FaComments,
  FaSearch,
  FaExternalLinkAlt
} from 'react-icons/fa';
import '../styles/Hotels.css';

const Hotels = () => {
  const [searchCity, setSearchCity] = useState('');
  const [showDaySelector, setShowDaySelector] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [hotelSelections, setHotelSelections] = useState({});
  
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 300000 },
    minRating: 0,
    amenities: [],
    sortBy: 'recommended'
  });
  
  const { addHotel, isInPlan, getMaxDay } = useTripContext();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const initialSelections = {};
    mockHotels.forEach(hotel => {
      initialSelections[hotel.id] = {
        roomTypeIndex: 0,
        nights: 1,
        guests: 2
      };
    });
    setHotelSelections(initialSelections);
  }, []);

  const allAmenities = useMemo(() => {
    const amenitiesSet = new Set();
    mockHotels.forEach(hotel => {
      hotel.amenities?.forEach(amenity => amenitiesSet.add(amenity));
    });
    return Array.from(amenitiesSet).sort();
  }, []);

  const updateHotelSelection = (hotelId, field, value) => {
    setHotelSelections(prev => ({
      ...prev,
      [hotelId]: {
        ...prev[hotelId],
        [field]: value
      }
    }));
  };

  const getHotelTotalPrice = (hotel) => {
    const selection = hotelSelections[hotel.id] || { roomTypeIndex: 0, nights: 1, guests: 2 };
    const roomType = hotel.roomTypes?.[selection.roomTypeIndex];
    const roomPrice = roomType?.price || hotel.price || 0;
    return roomPrice * selection.nights;
  };

  const filteredHotels = useMemo(() => {
    let filtered = mockHotels;

    if (searchCity.trim()) {
      const searchTerm = searchCity.toLowerCase();
      filtered = filtered.filter(hotel => 
        hotel.city?.toLowerCase().includes(searchTerm) ||
        hotel.country?.toLowerCase().includes(searchTerm) ||
        hotel.location?.toLowerCase().includes(searchTerm) ||
        hotel.name?.toLowerCase().includes(searchTerm)
      );
    }

    filtered = filtered.filter(hotel => {
      const totalPrice = getHotelTotalPrice(hotel);
      return totalPrice >= filters.priceRange.min && totalPrice <= filters.priceRange.max;
    });

    if (filters.minRating > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= filters.minRating);
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.amenities.every(amenity => 
          hotel.amenities?.includes(amenity)
        )
      );
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => getHotelTotalPrice(a) - getHotelTotalPrice(b));
        break;
      case 'price-high':
        filtered.sort((a, b) => getHotelTotalPrice(b) - getHotelTotalPrice(a));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchCity, filters, hotelSelections]);

  const handleReset = () => {
    setSearchCity('');
    setFilters({
      priceRange: { min: 0, max: 300000 },
      minRating: 0,
      amenities: [],
      sortBy: 'recommended'
    });
    const resetSelections = {};
    mockHotels.forEach(hotel => {
      resetSelections[hotel.id] = {
        roomTypeIndex: 0,
        nights: 1,
        guests: 2
      };
    });
    setHotelSelections(resetSelections);
  };

  const handleAddClick = (hotel) => {
    setSelectedHotel(hotel);
    setShowDaySelector(true);
  };

  const handleDaySelect = (day) => {
    if (selectedHotel) {
      const selection = hotelSelections[selectedHotel.id];
      const roomType = selectedHotel.roomTypes?.[selection.roomTypeIndex];
      
      addHotel(
        selectedHotel, 
        day, 
        roomType,
        selection.nights,
        selection.guests
      );
      
      setShowDaySelector(false);
      setSelectedHotel(null);
    }
  };

  const handleBookHotel = (hotel) => {
    const selection = hotelSelections[hotel.id] || { nights: 1, guests: 2 };
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkin = tomorrow.toISOString().split('T')[0];
    
    const checkoutDate = new Date(tomorrow);
    checkoutDate.setDate(checkoutDate.getDate() + selection.nights);
    const checkout = checkoutDate.toISOString().split('T')[0];
    
    const affiliateUrl = generateHotelLink(hotel, checkin, checkout, selection.guests);
    openAffiliateLink(affiliateUrl, 'hotel', hotel);
  };

  const toggleAmenity = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 300000) count++;
    if (filters.minRating > 0) count++;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    return count;
  }, [filters]);

  return (
    <div className="hotels-page">
      <div className="search-section">
        <h2><FaHotel className="page-title-icon" /> Find Your Perfect Stay in Europe</h2>
        <div className="search-controls">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search by city, country, or hotel name..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="search-input"
              aria-label="Search hotels by location or name"
            />
            {searchCity && (
              <button 
                onClick={() => setSearchCity('')} 
                className="clear-search-btn"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
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
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                Total Price Range: {formatPrice(filters.priceRange.min)} - {formatPrice(filters.priceRange.max)}
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
              <label className="filter-label">Minimum Rating</label>
              <div className="rating-filters">
                {[0, 3, 4, 4.5].map(rating => (
                  <button
                    key={rating}
                    className={`rating-btn ${filters.minRating === rating ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, minRating: rating})}
                  >
                    {rating === 0 ? 'Any' : `${rating}+ `}<FaStar />
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Amenities</label>
              <div className="amenities-filters">
                {allAmenities.slice(0, 8).map(amenity => (
                  <button
                    key={amenity}
                    className={`amenity-filter-btn ${
                      filters.amenities.includes(amenity) ? 'active' : ''
                    }`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hotels-results">
        <div className="results-header">
          <h3>
            {searchCity 
              ? `Hotels in "${searchCity}"` 
              : `All Available Hotels`
            }
            <span className="results-count">({filteredHotels.length})</span>
          </h3>
          {activeFiltersCount > 0 && (
            <button onClick={handleReset} className="clear-filters-link">
              Clear all filters
            </button>
          )}
        </div>
        
        {filteredHotels.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon"><FaSearch /></div>
            <h4>No hotels found</h4>
            <p>Try adjusting your filters or search criteria</p>
            <button onClick={handleReset} className="reset-btn">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="hotels-grid">
            {filteredHotels.map(hotel => {
              const isAdded = isInPlan('hotels', hotel.id);
              const selection = hotelSelections[hotel.id] || { roomTypeIndex: 0, nights: 1, guests: 2 };
              const selectedRoomType = hotel.roomTypes?.[selection.roomTypeIndex];
              const totalPrice = getHotelTotalPrice(hotel);
              
              return (
                <div key={hotel.id} className={`hotel-card ${isAdded ? 'added-to-plan' : ''}`}>
                  <div className="hotel-image-container">
                    {hotel.images && hotel.images.length > 0 ? (
                      <ImageCarousel 
                        images={hotel.images} 
                        altText={hotel.name}
                      />
                    ) : (
                      <div className="hotel-image">
                        <img 
                          src={hotel.image || 'https://via.placeholder.com/400x250?text=Hotel+Image'} 
                          alt={`${hotel.name} in ${hotel.location}`}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="hotel-rating">
                      <FaStar /> {hotel.rating}
                    </div>
                    {isAdded && (
                      <div className="added-badge">
                        <FaCheck /> In Your Plan
                      </div>
                    )}
                  </div>
                  
                  <div className="hotel-content">
                    <h3 className="hotel-name">{hotel.name}</h3>
                    <p className="hotel-location"><FaMapMarkerAlt /> {hotel.location}</p>
                    
                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="hotel-amenities">
                        {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="amenity-tag">
                            {amenity}
                          </span>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <span className="amenity-tag more-amenities">
                            +{hotel.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <p className="hotel-description">{hotel.description}</p>

                    {hotel.roomTypes && hotel.roomTypes.length > 0 && (
                      <div className="room-selection">
                        <label className="selection-label">Room Type:</label>
                        <select
                          value={selection.roomTypeIndex}
                          onChange={(e) => updateHotelSelection(hotel.id, 'roomTypeIndex', Number(e.target.value))}
                          className="room-select"
                        >
                          {hotel.roomTypes.map((roomType, index) => (
                            <option key={index} value={index}>
                              {roomType.type} - {formatPrice(roomType.price)}/night
                            </option>
                          ))}
                        </select>
                        
                        {selectedRoomType && (
                          <div className="room-features">
                            {selectedRoomType.features.map((feature, idx) => (
                              <span key={idx} className="feature-tag">{feature}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="booking-options">
                      <div className="option-group">
                        <label className="option-label">Nights:</label>
                        <div className="number-input">
                          <button 
                            onClick={() => updateHotelSelection(hotel.id, 'nights', Math.max(1, selection.nights - 1))}
                            className="qty-btn"
                          >
                            -
                          </button>
                          <span className="qty-value">{selection.nights}</span>
                          <button 
                            onClick={() => updateHotelSelection(hotel.id, 'nights', selection.nights + 1)}
                            className="qty-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="option-group">
                        <label className="option-label">Guests:</label>
                        <div className="number-input">
                          <button 
                            onClick={() => updateHotelSelection(hotel.id, 'guests', Math.max(1, selection.guests - 1))}
                            className="qty-btn"
                          >
                            -
                          </button>
                          <span className="qty-value">{selection.guests}</span>
                          <button 
                            onClick={() => updateHotelSelection(hotel.id, 'guests', Math.min(selectedRoomType?.maxGuests || 10, selection.guests + 1))}
                            className="qty-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hotel-footer">
                      <div className="hotel-price">
                        <div className="hotel-price-info">
                          <span className="price-label">Total ({selection.nights} night{selection.nights > 1 ? 's' : ''})</span>
                          <span className="price-amount">{formatPrice(totalPrice)}</span>
                        </div>
                      </div>
                      <div className="hotel-actions">
                        <button 
                          className="book-btn"
                          onClick={() => handleBookHotel(hotel)}
                          title="Search and book this hotel on Booking.com"
                        >
                          <FaExternalLinkAlt /> Book on Booking.com
                        </button>
                        <button 
                          className={`add-btn ${isAdded ? 'added' : ''}`}
                          onClick={() => handleAddClick(hotel)}
                          disabled={isAdded}
                          aria-label={isAdded 
                            ? `${hotel.name} already added to plan` 
                            : `Add ${hotel.name} to your plan`
                          }
                        >
                          {isAdded ? <><FaCheck /> Added</> : 'Add to Plan'}
                        </button>
                      </div>
                    </div>
                    
                    {hotel.reviews && (
                      <div className="hotel-reviews">
                        <FaComments /> {hotel.reviews.toLocaleString()} reviews
                      </div>
                    )}
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
          setSelectedHotel(null);
        }}
        onSelect={handleDaySelect}
        currentMaxDay={getMaxDay()}
        itemName={selectedHotel ? selectedHotel.name : ''}
      />
    </div>
  );
};

export default Hotels;