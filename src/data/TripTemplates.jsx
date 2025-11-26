// src/data/TripTemplates.js
export const tripTemplates = [
  {
    id: 1,
    name: 'Budget Explorer',
    description: 'Perfect for budget-conscious travelers seeking authentic experiences',
    icon: 'backpack',
    color: '#27ae60',
    budget: 80000,
    duration: 7,
    style: 'Budget-Friendly',
    highlights: ['Hostels', 'Street Food', 'Free Attractions', 'Local Transport'],
    targetAudience: 'Solo Travelers, Students, Backpackers',
    overview: 'Experience Europe without breaking the bank. Stay in hostels, eat like locals, and discover hidden gems.',
    flightIds: [6], // Delhi to Barcelona
    hotelIds: [7], // Barcelona Hostel Central
    destinationIds: [5, 6, 7], // Sagrada Família, Park Güell, Gothic Quarter
    customExpenses: [
      { category: 'Food', description: 'Street food & local restaurants', amount: 2000 },
      { category: 'Transport', description: 'Metro pass 7 days', amount: 600 }
    ]
  },

  {
    id: 2,
    name: 'Romantic Getaway',
    description: 'Ideal for couples seeking intimate and luxurious European experiences',
    icon: 'heart',
    color: '#e74c3c',
    budget: 300000,
    duration: 5,
    style: 'Luxury & Intimate',
    highlights: ['5-Star Hotels', 'Fine Dining', 'Couple Activities', 'Spa & Wellness'],
    targetAudience: 'Couples, Honeymooners, Anniversary Travelers',
    overview: 'Create unforgettable memories with candlelit dinners, luxury hotels, and romantic experiences.',
    flightIds: [1], // Delhi to Paris (Air France)
    hotelIds: [8], // Le Marais Luxury Hotel
    destinationIds: [1, 8, 9, 10], // Eiffel Tower, Seine Cruise, Versailles, Louvre
    customExpenses: [
      { category: 'Entertainment', description: 'Michelin-star dinner reservation', amount: 12000 },
      { category: 'Entertainment', description: 'Spa couples massage', amount: 8000 },
      { category: 'Transport', description: 'Private car service', amount: 5000 }
    ]
  },

  {
    id: 3,
    name: 'Adventure Seeker',
    description: 'For thrill-seekers and outdoor enthusiasts looking for active experiences',
    icon: 'mountain',
    color: '#f39c12',
    budget: 200000,
    duration: 10,
    style: 'Adventure & Active',
    highlights: ['Hiking', 'Water Sports', 'Skiing', 'Extreme Activities'],
    targetAudience: 'Adventure Lovers, Fitness Enthusiasts, Young Travelers',
    overview: 'Conquer mountains, dive into alpine lakes, and experience Europe\'s thrilling outdoor adventures.',
    flightIds: [8], // Delhi to Munich
    hotelIds: [9], // Alpine Lodge Bavarian
    destinationIds: [11, 12, 13], // Zugspitze, Neuschwanstein, White Water Rafting
    customExpenses: [
      { category: 'Entertainment', description: 'Paragliding experience', amount: 8000 },
      { category: 'Entertainment', description: 'Rock climbing course', amount: 5000 },
      { category: 'Food', description: 'High-energy meal packs', amount: 1500 }
    ]
  },

  {
    id: 4,
    name: 'Culture Buff',
    description: 'Perfect for history enthusiasts and art lovers exploring European heritage',
    icon: 'landmark',
    color: '#9b59b6',
    budget: 250000,
    duration: 8,
    style: 'Culture & Heritage',
    highlights: ['Museums', 'Historical Sites', 'Art Galleries', 'Local Culture'],
    targetAudience: 'Culture Enthusiasts, Historians, Art Lovers, Academics',
    overview: 'Immerse yourself in centuries of history, art, and culture across Europe\'s most iconic destinations.',
    flightIds: [5], // Mumbai to Rome (Etihad)
    hotelIds: [10], // Historic Centro Hotel
    destinationIds: [2, 14, 15, 16], // Colosseum, Forum Tour, Vatican, Renaissance Walk
    customExpenses: [
      { category: 'Entertainment', description: 'Private museum guide', amount: 6000 },
      { category: 'Entertainment', description: 'Opera ticket', amount: 4000 },
      { category: 'Food', description: 'Food history tour with tastings', amount: 3000 }
    ]
  },

  {
    id: 5,
    name: 'Family Fun',
    description: 'Designed for families with activities suitable for all ages',
    icon: 'users',
    color: '#3498db',
    budget: 350000,
    duration: 9,
    style: 'Family-Friendly',
    highlights: ['Theme Parks', 'Family Hotels', 'Kid-Friendly Activities', 'Safe Destinations'],
    targetAudience: 'Families with Kids, Extended Families, Parents',
    overview: 'Create magical memories with family-friendly attractions, comfortable accommodations, and activities for all ages.',
    flightIds: [9], // Delhi to Amsterdam
    hotelIds: [11], // Family Resort Amsterdam
    destinationIds: [17, 18, 19], // Keukenhof Gardens, Bike Tour, Anne Frank House
    customExpenses: [
      { category: 'Entertainment', description: 'Mini golf and arcade', amount: 2000 },
      { category: 'Entertainment', description: 'Boat tour with family', amount: 4000 },
      { category: 'Food', description: 'Family dining experiences', amount: 5000 },
      { category: 'Shopping', description: 'Souvenirs & gifts', amount: 3000 }
    ]
  }
];