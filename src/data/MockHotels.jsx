// src/data/MockHotels.js
export const mockHotels = [
  // ===== EXISTING HOTELS (IDs 1-6) =====
  {
    id: 1,
    name: "The Grand Paris Hotel",
    location: "Champs-Élysées, Paris",
    city: "Paris",
    country: "France",
    rating: 4.8,
    reviews: 328,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    amenities: ["Free WiFi", "Pool", "Restaurant", "Gym", "Spa"],
    description: "Luxury hotel in the heart of Paris with stunning views of the Eiffel Tower.",
    roomTypes: [
      {
        type: "Standard Room",
        price: 12000,
        features: ["Queen Bed", "City View", "25 sqm"],
        maxGuests: 2
      },
      {
        type: "Deluxe Room",
        price: 18000,
        features: ["King Bed", "Eiffel Tower View", "35 sqm", "Balcony"],
        maxGuests: 2
      },
      {
        type: "Family Suite",
        price: 28000,
        features: ["2 Bedrooms", "Living Room", "City View", "55 sqm"],
        maxGuests: 4
      },
      {
        type: "Presidential Suite",
        price: 45000,
        features: ["Master Bedroom", "Panoramic View", "80 sqm", "Butler Service"],
        maxGuests: 3
      }
    ]
  },
  {
    id: 2,
    name: "Rome Boutique Suites",
    location: "Trastevere, Rome",
    city: "Rome",
    country: "Italy",
    rating: 4.6,
    reviews: 215,
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    ],
    amenities: ["Free WiFi", "Breakfast", "Airport Shuttle", "Concierge"],
    description: "Charming boutique hotel near the Colosseum with authentic Italian hospitality.",
    roomTypes: [
      {
        type: "Classic Room",
        price: 8500,
        features: ["Double Bed", "Garden View", "20 sqm"],
        maxGuests: 2
      },
      {
        type: "Superior Room",
        price: 12500,
        features: ["King Bed", "Historic View", "28 sqm", "Bathtub"],
        maxGuests: 2
      },
      {
        type: "Junior Suite",
        price: 19000,
        features: ["Sitting Area", "Terrace", "40 sqm"],
        maxGuests: 3
      }
    ]
  },
  {
    id: 3,
    name: "London Thames View",
    location: "Westminster, London",
    city: "London",
    country: "UK",
    rating: 4.9,
    reviews: 442,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800"
    ],
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Bar", "Gym"],
    description: "5-star luxury hotel with panoramic views of the Thames and Big Ben.",
    roomTypes: [
      {
        type: "Standard Room",
        price: 15000,
        features: ["Queen Bed", "City View", "30 sqm"],
        maxGuests: 2
      },
      {
        type: "Thames View Room",
        price: 22000,
        features: ["King Bed", "River View", "35 sqm", "Nespresso Machine"],
        maxGuests: 2
      },
      {
        type: "Executive Suite",
        price: 35000,
        features: ["Separate Living Room", "Thames View", "60 sqm"],
        maxGuests: 3
      },
      {
        type: "Royal Suite",
        price: 55000,
        features: ["2 Bedrooms", "Big Ben View", "100 sqm", "Private Butler"],
        maxGuests: 4
      }
    ]
  },
  {
    id: 4,
    name: "Berlin Modern Lofts",
    location: "Mitte, Berlin",
    city: "Berlin",
    country: "Germany",
    rating: 4.5,
    reviews: 189,
    images: [
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
      "https://images.unsplash.com/photo-1631049552240-59c37f563fd3?w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800"
    ],
    amenities: ["Free WiFi", "Kitchen", "Workspace", "Laundry"],
    description: "Contemporary lofts in central Berlin, perfect for business and leisure.",
    roomTypes: [
      {
        type: "Studio Loft",
        price: 7000,
        features: ["Double Bed", "Kitchenette", "30 sqm", "Work Desk"],
        maxGuests: 2
      },
      {
        type: "One Bedroom Loft",
        price: 11000,
        features: ["King Bed", "Full Kitchen", "45 sqm", "Living Area"],
        maxGuests: 2
      },
      {
        type: "Two Bedroom Loft",
        price: 17000,
        features: ["2 Bedrooms", "Full Kitchen", "65 sqm", "Balcony"],
        maxGuests: 4
      }
    ]
  },
  {
    id: 5,
    name: "Barcelona Beach Resort",
    location: "Barceloneta, Barcelona",
    city: "Barcelona",
    country: "Spain",
    rating: 4.7,
    reviews: 356,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    amenities: ["Free WiFi", "Beach Access", "Pool", "Restaurant", "Beach Bar"],
    description: "Beachfront resort with Mediterranean views and world-class dining.",
    roomTypes: [
      {
        type: "Standard Room",
        price: 10500,
        features: ["Double Bed", "Garden View", "28 sqm"],
        maxGuests: 2
      },
      {
        type: "Sea View Room",
        price: 16000,
        features: ["King Bed", "Ocean View", "32 sqm", "Balcony"],
        maxGuests: 2
      },
      {
        type: "Beach Suite",
        price: 25000,
        features: ["Living Area", "Direct Beach Access", "50 sqm", "Terrace"],
        maxGuests: 3
      },
      {
        type: "Family Villa",
        price: 38000,
        features: ["2 Bedrooms", "Private Pool", "85 sqm", "Beach Access"],
        maxGuests: 5
      }
    ]
  },
  {
    id: 6,
    name: "Amsterdam Canal House",
    location: "Jordaan, Amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    rating: 4.6,
    reviews: 267,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"
    ],
    amenities: ["Free WiFi", "Bike Rental", "Breakfast", "Canal Views"],
    description: "Historic canal house hotel with Dutch charm and modern comforts.",
    roomTypes: [
      {
        type: "Cozy Room",
        price: 9500,
        features: ["Double Bed", "Canal Glimpse", "22 sqm"],
        maxGuests: 2
      },
      {
        type: "Canal View Room",
        price: 14500,
        features: ["King Bed", "Full Canal View", "30 sqm", "Historic Features"],
        maxGuests: 2
      },
      {
        type: "Canal Suite",
        price: 22000,
        features: ["Master Bedroom", "Panoramic Canal View", "45 sqm", "Sitting Area"],
        maxGuests: 3
      }
    ]
  },

  // ===== NEW HOTELS FOR TEMPLATES (IDs 7-11) - UNIQUE IMAGES =====
  {
    id: 7,
    name: "Barcelona Hostel Central",
    location: "Gothic Quarter, Barcelona",
    city: "Barcelona",
    country: "Spain",
    rating: 4.2,
    reviews: 584,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800",
      "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800",
      "https://images.unsplash.com/photo-1576675466770-e1e8e4e5f5e5?w=800"
    ],
    amenities: ["Free WiFi", "Kitchen", "Common Area", "Laundry", "Lockers"],
    description: "Budget hostel in the heart of Barcelona with great social atmosphere",
    roomTypes: [
      {
        type: "Dorm Bed",
        price: 800,
        features: ["Shared Room", "WiFi", "Locker", "Shared Bath"],
        maxGuests: 1
      },
      {
        type: "Private Room",
        price: 2000,
        features: ["Double Bed", "WiFi", "Private Bath", "AC"],
        maxGuests: 2
      }
    ]
  },
  {
    id: 8,
    name: "Le Marais Luxury Hotel",
    location: "Le Marais District, Paris",
    city: "Paris",
    country: "France",
    rating: 4.8,
    reviews: 412,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1578774204375-3e2f8e9d4f48?w=800",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?w=800"
    ],
    amenities: ["Spa", "Fine Dining", "Concierge", "Champagne Service", "WiFi"],
    description: "Luxury boutique hotel perfect for romantic getaways in the heart of Paris",
    roomTypes: [
      {
        type: "Deluxe Suite",
        price: 15000,
        features: ["King Bed", "Jacuzzi", "City View", "Minibar"],
        maxGuests: 2
      },
      {
        type: "Penthouse",
        price: 35000,
        features: ["Master Suite", "Private Terrace", "Spa Bath", "Premium Service"],
        maxGuests: 2
      }
    ]
  },
  {
    id: 9,
    name: "Alpine Lodge Bavarian",
    location: "Near Bavarian Alps, Munich",
    city: "Munich",
    country: "Germany",
    rating: 4.5,
    reviews: 298,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800"
    ],
    amenities: ["Mountain Guides", "Equipment Rental", "Fitness Center", "Restaurant", "WiFi"],
    description: "Perfect base for alpine adventures and outdoor activities",
    roomTypes: [
      {
        type: "Comfort Room",
        price: 4500,
        features: ["Double Bed", "Mountain View", "WiFi", "Heater"],
        maxGuests: 2
      },
      {
        type: "Suite",
        price: 8000,
        features: ["King Bed", "Balcony", "Hot Tub", "Premium Bedding"],
        maxGuests: 2
      }
    ]
  },
  {
    id: 10,
    name: "Historic Centro Hotel",
    location: "Near Colosseum, Rome",
    city: "Rome",
    country: "Italy",
    rating: 4.6,
    reviews: 336,
    images: [
      "https://images.unsplash.com/photo-1587265002619-abdf6c40e8d6?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800",
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
    ],
    amenities: ["Library", "Art Gallery", "Museum Pass", "Cultural Tours", "WiFi"],
    description: "Historic hotel in a Renaissance building surrounded by cultural landmarks",
    roomTypes: [
      {
        type: "Classic Room",
        price: 8000,
        features: ["Double Bed", "Historic Building", "WiFi", "AC"],
        maxGuests: 2
      },
      {
        type: "Suite",
        price: 15000,
        features: ["King Bed", "Balcony", "Heritage Décor", "Minibar"],
        maxGuests: 2
      }
    ]
  },
  {
    id: 11,
    name: "Family Resort Amsterdam",
    location: "Canal Area, Amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    rating: 4.4,
    reviews: 523,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800"
    ],
    amenities: ["Kids Club", "Swimming Pool", "Safe Playground", "Bike Rentals", "Family Restaurant"],
    description: "Perfect family resort with activities and amenities for children of all ages",
    roomTypes: [
      {
        type: "Family Room (2 kids)",
        price: 10000,
        features: ["2 Double Beds", "Kitchenette", "Playground Access", "WiFi"],
        maxGuests: 4
      },
      {
        type: "Suite (4 kids)",
        price: 18000,
        features: ["2 Bedrooms", "Kitchen", "Game Room", "Balcony"],
        maxGuests: 6
      }
    ]
  }
];