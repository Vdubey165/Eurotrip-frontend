// src/data/MockFlights.js
export const mockFlights = [
  // ===== EXISTING FLIGHTS (IDs 1-5) =====
  {
    id: 1,
    from: "Delhi (DEL)",
    to: "Paris (CDG)",
    airline: "Air France",
    classes: {
      economy: { price: 45000, available: true },
      business: { price: 95000, available: true },
      first: { price: 165000, available: true }
    },
    duration: "9h 30m",
    departure: "10:00 AM",
    arrival: "2:30 PM",
    date: "2025-12-15",
    stops: "Non-stop"
  },
  {
    id: 2,
    from: "Mumbai (BOM)",
    to: "Paris (CDG)",
    airline: "Lufthansa",
    classes: {
      economy: { price: 42000, available: true },
      business: { price: 88000, available: true },
      first: { price: 155000, available: false }
    },
    duration: "10h 15m",
    departure: "11:30 PM",
    arrival: "8:45 AM",
    date: "2025-12-15",
    stops: "1 stop"
  },
  {
    id: 3,
    from: "Delhi (DEL)",
    to: "London (LHR)",
    airline: "British Airways",
    classes: {
      economy: { price: 38000, available: true },
      business: { price: 82000, available: true },
      first: { price: 145000, available: true }
    },
    duration: "8h 45m",
    departure: "2:00 AM",
    arrival: "7:45 AM",
    date: "2025-12-16",
    stops: "Non-stop"
  },
  {
    id: 4,
    from: "Bangalore (BLR)",
    to: "Berlin (BER)",
    airline: "Emirates",
    classes: {
      economy: { price: 48000, available: true },
      business: { price: 105000, available: true },
      first: { price: 180000, available: true }
    },
    duration: "11h 20m",
    departure: "3:30 AM",
    arrival: "1:50 PM",
    date: "2025-12-18",
    stops: "1 stop"
  },
  {
    id: 5,
    from: "Mumbai (BOM)",
    to: "Rome (FCO)",
    airline: "Etihad",
    classes: {
      economy: { price: 51000, available: true },
      business: { price: 112000, available: true },
      first: { price: 195000, available: false }
    },
    duration: "10h 50m",
    departure: "9:00 PM",
    arrival: "6:50 AM",
    date: "2025-12-20",
    stops: "1 stop"
  },

  // ===== NEW FLIGHTS FOR TEMPLATES (IDs 6-10) =====
  {
    id: 6,
    from: "Delhi (DEL)",
    to: "Barcelona (BCN)",
    airline: "IndiGo",
    classes: {
      economy: { price: 35000, available: true },
      business: { price: 75000, available: true },
      first: { price: 130000, available: false }
    },
    duration: "10h 15m",
    departure: "11:00 PM",
    arrival: "8:15 AM",
    date: "2025-12-22",
    stops: "1 stop"
  },
  {
    id: 7,
    from: "Mumbai (BOM)",
    to: "Barcelona (BCN)",
    airline: "Qatar Airways",
    classes: {
      economy: { price: 37000, available: true },
      business: { price: 80000, available: true },
      first: { price: 140000, available: true }
    },
    duration: "11h 30m",
    departure: "1:00 AM",
    arrival: "11:30 AM",
    date: "2025-12-22",
    stops: "1 stop"
  },
  {
    id: 8,
    from: "Delhi (DEL)",
    to: "Munich (MUC)",
    airline: "Lufthansa",
    classes: {
      economy: { price: 40000, available: true },
      business: { price: 85000, available: true },
      first: { price: 150000, available: true }
    },
    duration: "9h 45m",
    departure: "11:00 AM",
    arrival: "4:00 PM",
    date: "2025-12-25",
    stops: "Non-stop"
  },
  {
    id: 9,
    from: "Delhi (DEL)",
    to: "Amsterdam (AMS)",
    airline: "KLM Royal Dutch Airlines",
    classes: {
      economy: { price: 43000, available: true },
      business: { price: 90000, available: true },
      first: { price: 160000, available: true }
    },
    duration: "9h 20m",
    departure: "9:00 AM",
    arrival: "2:00 PM",
    date: "2025-12-28",
    stops: "Non-stop"
  },
  {
    id: 10,
    from: "Bangalore (BLR)",
    to: "Amsterdam (AMS)",
    airline: "Emirates",
    classes: {
      economy: { price: 46000, available: true },
      business: { price: 98000, available: true },
      first: { price: 175000, available: false }
    },
    duration: "10h 45m",
    departure: "4:00 AM",
    arrival: "1:45 PM",
    date: "2025-12-28",
    stops: "1 stop"
  }
];