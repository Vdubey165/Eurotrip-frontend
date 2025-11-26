// src/utils/affiliateLinks.js

// Replace these with your actual affiliate IDs once you sign up
const AFFILIATE_IDS = {
  skyscanner: 'your-skyscanner-id',
  booking: 'your-booking-id',
  agoda: 'your-agoda-id',
  getyourguide: 'your-getyourguide-id'
};

/**
 * Generate Skyscanner flight search link
 * @param {Object} flight - Flight object from mock data
 * @returns {string} Affiliate link
 */
export const generateFlightLink = (flight) => {
  // Extract airport codes (e.g., "Delhi (DEL)" -> "del")
  const fromCode = flight.from.match(/\(([^)]+)\)/)?.[1]?.toLowerCase() || 'del';
  const toCode = flight.to.match(/\(([^)]+)\)/)?.[1]?.toLowerCase() || 'cdg';
  
  // Format date as YYMMDD (e.g., "2025-12-15" -> "251215")
  const date = flight.date ? 
    flight.date.replace(/20(\d{2})-(\d{2})-(\d{2})/, '$1$2$3') : 
    '';
  
  // Build Skyscanner URL
  const baseUrl = 'https://www.skyscanner.com/transport/flights';
  const params = new URLSearchParams({
    adultsv2: '1',
    cabinclass: flight.selectedClass || 'economy',
    rtn: '0', // one-way
    preferdirects: 'false',
    outboundaltsenabled: 'false',
    inboundaltsenabled: 'false',
    ref: AFFILIATE_IDS.skyscanner
  });
  
  return `${baseUrl}/${fromCode}/${toCode}/${date}/?${params.toString()}`;
};

/**
 * Generate Booking.com hotel search link
 * @param {Object} hotel - Hotel object from mock data
 * @param {string} checkin - Check-in date (YYYY-MM-DD)
 * @param {string} checkout - Check-out date (YYYY-MM-DD)
 * @param {number} guests - Number of guests
 * @returns {string} Affiliate link
 */
export const generateHotelLink = (hotel, checkin = null, checkout = null, guests = 2) => {
  // Use hotel city or fallback to location
  const city = hotel.city || hotel.location || 'Paris';
  
  // Calculate dates if not provided (default: tomorrow for 3 nights)
  if (!checkin) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkin = tomorrow.toISOString().split('T')[0];
  }
  
  if (!checkout) {
    const checkoutDate = new Date(checkin);
    checkoutDate.setDate(checkoutDate.getDate() + 3);
    checkout = checkoutDate.toISOString().split('T')[0];
  }
  
  // Build Booking.com URL
  const params = new URLSearchParams({
    ss: city,
    checkin: checkin,
    checkout: checkout,
    group_adults: guests.toString(),
    no_rooms: '1',
    group_children: '0',
    aid: AFFILIATE_IDS.booking
  });
  
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
};

/**
 * Generate GetYourGuide tours/attractions link
 * @param {Object} destination - Destination object from mock data
 * @returns {string} Affiliate link
 */
export const generateAttractionLink = (destination) => {
  const city = destination.city || 'Paris';
  const attractionName = destination.name || '';
  
  // GetYourGuide search URL
  const searchQuery = encodeURIComponent(`${attractionName} ${city}`);
  return `https://www.getyourguide.com/s/?q=${searchQuery}&partner_id=${AFFILIATE_IDS.getyourguide}`;
};

/**
 * Generate Agoda hotel search link (alternative to Booking.com)
 * @param {Object} hotel - Hotel object
 * @param {string} checkin 
 * @param {string} checkout 
 * @returns {string} Affiliate link
 */
export const generateAgodaLink = (hotel, checkin, checkout) => {
  const city = hotel.city || 'Paris';
  
  const params = new URLSearchParams({
    city: city,
    checkIn: checkin,
    checkOut: checkout,
    rooms: '1',
    adults: '2',
    children: '0',
    cid: AFFILIATE_IDS.agoda
  });
  
  return `https://www.agoda.com/search?${params.toString()}`;
};

/**
 * Track affiliate click (optional analytics)
 * @param {string} type - 'flight', 'hotel', or 'attraction'
 * @param {Object} item - The item being clicked
 */
export const trackAffiliateClick = (type, item) => {
  // You can send analytics to your backend
  console.log('Affiliate click:', type, item.name || item.airline);
  
  // Example: Send to your backend for tracking
  // fetch('/api/analytics/affiliate-click', {
  //   method: 'POST',
  //   body: JSON.stringify({ type, itemId: item.id })
  // });
};

/**
 * Open affiliate link in new tab
 * @param {string} url - Affiliate URL
 * @param {string} type - Type of link
 * @param {Object} item - Item data
 */
export const openAffiliateLink = (url, type, item) => {
  trackAffiliateClick(type, item);
  window.open(url, '_blank', 'noopener,noreferrer');
};