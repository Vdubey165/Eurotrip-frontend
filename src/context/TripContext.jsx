// src/context/TripContext.js - COMPLETE UPDATED VERSION
import React, { createContext, useState, useContext } from 'react';
import { tripAPI } from '../services/api';

const TripContext = createContext();

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within TripProvider');
  }
  return context;
};

export const TripProvider = ({ children }) => {
  const [tripPlan, setTripPlan] = useState({
    flights: [],
    hotels: [],
    destinations: []
  });

  const [customExpenses, setCustomExpenses] = useState([]);
  const [customActivities, setCustomActivities] = useState([]);
  
  // NEW: Save/Load functionality
  const [currentTripId, setCurrentTripId] = useState(null);
  const [tripName, setTripName] = useState('My Europe Trip');
  const [budgetLimit, setBudgetLimit] = useState(200000);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Add flight with selected class
  const addFlight = (flight, day = null, flightClass = 'economy') => {
    const exists = tripPlan.flights.find(f => f.id === flight.id);
    if (exists) {
      alert('This flight is already in your plan!');
      return false;
    }
    
    const classPrice = flight.classes[flightClass]?.price || flight.price || 0;
    
    const flightWithDay = {
      ...flight,
      day: day || 1,
      selectedClass: flightClass,
      finalPrice: classPrice
    };
    
    setTripPlan(prev => ({
      ...prev,
      flights: [...prev.flights, flightWithDay]
    }));
    return true;
  };

  // Add hotel with selected room type, nights, and guests
  const addHotel = (hotel, day = null, roomType = null, nights = 1, guests = 2) => {
    const exists = tripPlan.hotels.find(h => h.id === hotel.id);
    if (exists) {
      alert('This hotel is already in your plan!');
      return false;
    }
    
    const selectedRoom = roomType || hotel.roomTypes?.[0];
    const roomPrice = selectedRoom?.price || hotel.price || 0;
    const totalPrice = roomPrice * nights;
    
    const hotelWithDay = {
      ...hotel,
      day: day || (tripPlan.flights.length > 0 ? 2 : 1),
      selectedRoomType: selectedRoom,
      nights: nights,
      guests: guests,
      finalPrice: totalPrice
    };
    
    setTripPlan(prev => ({
      ...prev,
      hotels: [...prev.hotels, hotelWithDay]
    }));
    return true;
  };

  // Add destination
  const addDestination = (destination, day = null) => {
    const exists = tripPlan.destinations.find(d => d.id === destination.id);
    if (exists) {
      alert('This destination is already in your itinerary!');
      return false;
    }
    
    const destWithDay = {
      ...destination,
      day: day || (tripPlan.flights.length > 0 ? 2 : 1),
      finalPrice: destination.entryFee || 0
    };
    
    setTripPlan(prev => ({
      ...prev,
      destinations: [...prev.destinations, destWithDay]
    }));
    return true;
  };

  // Remove items
  const removeFlight = (id) => {
    setTripPlan(prev => ({
      ...prev,
      flights: prev.flights.filter(f => f.id !== id)
    }));
  };

  const removeHotel = (id) => {
    setTripPlan(prev => ({
      ...prev,
      hotels: prev.hotels.filter(h => h.id !== id)
    }));
  };

  const removeDestination = (id) => {
    setTripPlan(prev => ({
      ...prev,
      destinations: prev.destinations.filter(d => d.id !== id)
    }));
  };

  // Update day for items
  const updateItemDay = (type, id, newDay) => {
    setTripPlan(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, day: parseInt(newDay) } : item
      )
    }));
  };

  // Custom expenses
  const addCustomExpense = (expense) => {
    const newExpense = {
      id: Date.now(),
      category: expense.category,
      description: expense.description,
      amount: parseFloat(expense.amount)
    };
    setCustomExpenses(prev => [...prev, newExpense]);
    return true;
  };

  const removeCustomExpense = (id) => {
    setCustomExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Custom activities
  const addCustomActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: Date.now() + Math.random(),
      createdAt: new Date().toISOString()
    };
    setCustomActivities([...customActivities, newActivity]);
  };

  const removeCustomActivity = (id) => {
    setCustomActivities(customActivities.filter(a => a.id !== id));
  };

  // Calculate total expenses
  const calculateTotal = () => {
    const flightTotal = tripPlan.flights.reduce((sum, f) => sum + (f.finalPrice || 0), 0);
    const hotelTotal = tripPlan.hotels.reduce((sum, h) => sum + (h.finalPrice || 0), 0);
    const destinationTotal = tripPlan.destinations.reduce((sum, d) => sum + (d.finalPrice || d.entryFee || 0), 0);
    const customTotal = customExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    return {
      flights: flightTotal,
      hotels: hotelTotal,
      destinations: destinationTotal,
      custom: customTotal,
      total: flightTotal + hotelTotal + destinationTotal + customTotal
    };
  };

  // Get max day in plan
  const getMaxDay = () => {
    const allItems = [
      ...tripPlan.flights,
      ...tripPlan.hotels,
      ...tripPlan.destinations
    ];
    
    if (allItems.length === 0) return 0;
    
    return Math.max(...allItems.map(item => item.day || 1));
  };

  // Check if item is in plan
  const isInPlan = (type, id) => {
    return tripPlan[type].some(item => item.id === id);
  };

  // ========== NEW SAVE/LOAD FUNCTIONS ==========
  
  // Save trip to database
  const saveTrip = async (name = tripName) => {
    try {
      setIsSaving(true);
      setSaveError(null);

      const tripData = {
        tripName: name,
        destination: 'Europe',
        budgetLimit,
        flights: tripPlan.flights.map(f => ({
          flightId: f.id,
          from: f.from,
          to: f.to,
          airline: f.airline,
          selectedClass: f.selectedClass,
          price: f.finalPrice,
          duration: f.duration,
          departure: f.departure,
          arrival: f.arrival,
          date: f.date,
          day: f.day
        })),
        hotels: tripPlan.hotels.map(h => ({
          hotelId: h.id,
          name: h.name,
          location: h.location,
          city: h.city,
          country: h.country,
          selectedRoomType: h.selectedRoomType?.type,
          nights: h.nights,
          guests: h.guests,
          pricePerNight: h.selectedRoomType?.price,
          totalPrice: h.finalPrice,
          rating: h.rating,
          amenities: h.amenities,
          day: h.day
        })),
        destinations: tripPlan.destinations.map(d => ({
          destinationId: d.id,
          name: d.name,
          city: d.city,
          country: d.country,
          entryFee: d.entryFee,
          category: d.category,
          visitDuration: d.visitDuration,
          rating: d.rating,
          day: d.day
        })),
        customExpenses: [
          ...customExpenses.map(e => ({
            category: e.category,
            description: e.description,
            amount: e.amount
          })),
          ...customActivities.map(a => ({
            category: a.category || 'Other',
            description: a.description || a.title,
            amount: a.amount || 0
          }))
        ]
      };

      let result;
      
      if (currentTripId) {
        result = await tripAPI.updateTrip(currentTripId, tripData);
      } else {
        result = await tripAPI.createTrip(tripData);
        setCurrentTripId(result.data._id);
      }

      setTripName(name);
      setIsSaving(false);
      
      return { success: true, trip: result.data };
    } catch (error) {
      console.error('Save trip error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to save trip';
      setSaveError(errorMsg);
      setIsSaving(false);
      return { success: false, error: errorMsg };
    }
  };

  // Load trip from database
  const loadTrip = (trip) => {
    setCurrentTripId(trip._id);
    setTripName(trip.tripName || 'My Europe Trip');
    setBudgetLimit(trip.budgetLimit || 200000);
    
    setTripPlan({
      flights: trip.flights?.map(f => ({
        id: f.flightId,
        from: f.from,
        to: f.to,
        airline: f.airline,
        selectedClass: f.selectedClass,
        finalPrice: f.price,
        duration: f.duration,
        departure: f.departure,
        arrival: f.arrival,
        date: f.date,
        day: f.day
      })) || [],
      hotels: trip.hotels?.map(h => ({
        id: h.hotelId,
        name: h.name,
        location: h.location,
        city: h.city,
        country: h.country,
        selectedRoomType: { type: h.selectedRoomType, price: h.pricePerNight },
        nights: h.nights,
        guests: h.guests,
        finalPrice: h.totalPrice,
        rating: h.rating,
        amenities: h.amenities,
        day: h.day
      })) || [],
      destinations: trip.destinations?.map(d => ({
        id: d.destinationId,
        name: d.name,
        city: d.city,
        country: d.country,
        entryFee: d.entryFee,
        finalPrice: d.entryFee,
        category: d.category,
        visitDuration: d.visitDuration,
        rating: d.rating,
        day: d.day
      })) || []
    });

    const expenses = trip.customExpenses?.filter(e => 
      ['Food', 'Transport', 'Shopping', 'Entertainment', 'Other'].includes(e.category)
    ).map((e, idx) => ({
      id: Date.now() + idx,
      category: e.category,
      description: e.description,
      amount: e.amount
    })) || [];
    
    setCustomExpenses(expenses);
  };

  // ========== NEW: Load template into trip context ==========
  // Replace your loadTemplateTrip function with this:

const loadTemplateTrip = (template) => {
  // Clear current trip
  setCurrentTripId(null);
  
  // Set template name and budget
  setTripName(template.name);
  setBudgetLimit(template.budget);
  
  // Load template flights - KEEP ORIGINAL IDs
  const templateFlights = template.flights.map((f) => ({
    ...f,
    // Keep original id from mock data
    day: f.day || 1,
    selectedClass: 'economy',
    finalPrice: f.classes?.economy?.price || f.price || 0
  }));
  
  // Load template hotels - KEEP ORIGINAL IDs
  const templateHotels = template.hotels.map((h) => ({
    ...h,
    // Keep original id from mock data
    day: h.day || 2,
    nights: 3,
    guests: 2,
    selectedRoomType: h.roomTypes?.[0],
    finalPrice: (h.roomTypes?.[0]?.price || h.price || 0) * 3
  }));
  
  // Load template destinations - KEEP ORIGINAL IDs
  const templateDestinations = template.destinations.map((d) => ({
    ...d,
    // Keep original id from mock data
    day: d.day || 2,
    finalPrice: d.entryFee || 0
  }));
  
  // Set trip plan with template data
  setTripPlan({
    flights: templateFlights,
    hotels: templateHotels,
    destinations: templateDestinations
  });
  
  // Set custom expenses from template
  const templateExpenses = template.customExpenses.map((e, idx) => ({
    id: `template-expense-${template.id}-${idx}`,
    category: e.category,
    description: e.description,
    amount: e.amount
  }));
  
  setCustomExpenses(templateExpenses);
  setCustomActivities([]);
};

  // Create new trip
  const createNewTrip = () => {
    setCurrentTripId(null);
    setTripName('My Europe Trip');
    setBudgetLimit(200000);
    setTripPlan({ flights: [], hotels: [], destinations: [] });
    setCustomExpenses([]);
    setCustomActivities([]);
    setSaveError(null);
  };

  // Check if trip has unsaved changes
  const hasUnsavedChanges = () => {
    const hasItems = tripPlan.flights.length > 0 || 
                     tripPlan.hotels.length > 0 || 
                     tripPlan.destinations.length > 0 ||
                     customExpenses.length > 0 ||
                     customActivities.length > 0;
    
    return hasItems && !currentTripId;
  };

  const value = {
    tripPlan,
    customExpenses,
    customActivities,
    currentTripId,
    tripName,
    budgetLimit,
    isSaving,
    saveError,
    addFlight,
    addHotel,
    addDestination,
    removeFlight,
    removeHotel,
    removeDestination,
    updateItemDay,
    calculateTotal,
    isInPlan,
    addCustomExpense,
    removeCustomExpense,
    addCustomActivity,
    removeCustomActivity,
    getMaxDay,
    setTripName,
    setBudgetLimit,
    setSaveError,
    saveTrip,
    loadTrip,
    loadTemplateTrip,
    createNewTrip,
    hasUnsavedChanges
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};