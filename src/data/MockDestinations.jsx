// src/data/MockDestinations.js
export const mockDestinations = [
  // ===== EXISTING DESTINATIONS (IDs 1-5) =====
  {
    id: 1,
    name: "Eiffel Tower",
    city: "Paris",
    country: "France",
    description: "Iconic iron lattice tower and symbol of Paris. Offers breathtaking views of the city from multiple observation decks.",
    images: [
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800"
    ],
    entryFee: 1800,
    category: "Landmark",
    visitDuration: "2-3 hours",
    bestTimeToVisit: "Early morning or sunset",
    mustSee: true,
    rating: 4.8,
    visitors: "7M annually"
  },
  {
    id: 2,
    name: "Colosseum",
    city: "Rome",
    country: "Italy",
    description: "Ancient amphitheater and one of the greatest works of Roman architecture. A UNESCO World Heritage site.",
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
      "https://images.unsplash.com/photo-1548585744-4afaa4836dbd?w=800",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800",
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800"
    ],
    entryFee: 1200,
    category: "Historical",
    visitDuration: "2-3 hours",
    bestTimeToVisit: "Early morning",
    mustSee: true,
    rating: 4.9,
    visitors: "6M annually"
  },
  {
    id: 3,
    name: "Big Ben & Parliament",
    city: "London",
    country: "UK",
    description: "Iconic clock tower and the Houses of Parliament. A symbol of London and British democracy.",
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800",
      "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800"
    ],
    entryFee: 2000,
    category: "Landmark",
    visitDuration: "1-2 hours",
    bestTimeToVisit: "Afternoon",
    mustSee: true,
    rating: 4.7,
    visitors: "5M annually"
  },
  {
    id: 4,
    name: "Brandenburg Gate",
    city: "Berlin",
    country: "Germany",
    description: "Neoclassical monument and symbol of German reunification. One of Berlin's most famous landmarks.",
    images: [
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800",
      "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800",
      "https://images.unsplash.com/photo-1587330979470-3595ac045ab3?w=800",
      "https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=800",
      "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=800"
    ],
    entryFee: 0,
    category: "Landmark",
    visitDuration: "30 mins - 1 hour",
    bestTimeToVisit: "Evening for photos",
    mustSee: true,
    rating: 4.6,
    visitors: "4M annually"
  },
  {
    id: 5,
    name: "Sagrada Família",
    city: "Barcelona",
    country: "Spain",
    description: "Gaudí's unfinished masterpiece. A stunning basilica combining Gothic and Art Nouveau architecture.",
    images: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800",
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800",
      "https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=800",
      "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=800"
    ],
    entryFee: 2200,
    category: "Religious",
    visitDuration: "2-3 hours",
    bestTimeToVisit: "Morning light",
    mustSee: true,
    rating: 4.9,
    visitors: "4.5M annually"
  },

  // ===== NEW DESTINATIONS FOR TEMPLATES (IDs 6-19) - UNIQUE LOCATION-SPECIFIC IMAGES =====
  
  // Barcelona Destinations (Budget Template)
  {
    id: 6,
    name: "Park Güell",
    city: "Barcelona",
    country: "Spain",
    description: "Colorful mosaic park designed by Gaudí with stunning city views.",
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
      "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1579282240050-352db0a14c21?w=800",
      "https://images.unsplash.com/photo-1581970498724-134df8ba6046?w=800"
    ],
    entryFee: 1400,
    category: "Park",
    visitDuration: "2-3 hours",
    bestTimeToVisit: "Morning",
    mustSee: true,
    rating: 4.7,
    visitors: "3M annually"
  },
  {
    id: 7,
    name: "Gothic Quarter Walk",
    city: "Barcelona",
    country: "Spain",
    description: "Historic medieval neighborhood with narrow streets and charming plazas.",
    images: [
      "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800",
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
      "https://images.unsplash.com/photo-1579282240050-352db0a14c21?w=800",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
      "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=800"
    ],
    entryFee: 0,
    category: "Walking Tour",
    visitDuration: "2-4 hours",
    bestTimeToVisit: "Afternoon",
    mustSee: true,
    rating: 4.6,
    visitors: "Free access"
  },

  // Paris Destinations (Romantic Template)
  {
    id: 8,
    name: "Eiffel Tower Seine Cruise",
    city: "Paris",
    country: "France",
    description: "Romantic river cruise along the Seine with views of iconic landmarks.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800",
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800"
    ],
    entryFee: 2500,
    category: "Experience",
    visitDuration: "1-2 hours",
    bestTimeToVisit: "Evening",
    mustSee: true,
    rating: 4.8,
    visitors: "2M annually"
  },
  {
    id: 9,
    name: "Versailles Palace Tour",
    city: "Paris",
    country: "France",
    description: "Magnificent royal palace with opulent rooms and stunning gardens.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1566679352865-f96c6e2f8c08?w=800",
      "https://images.unsplash.com/photo-1601991687005-f8e9e15e2e5e?w=800",
      "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800"
    ],
    entryFee: 3000,
    category: "Palace",
    visitDuration: "Half day",
    bestTimeToVisit: "Morning",
    mustSee: true,
    rating: 4.9,
    visitors: "7.5M annually"
  },
  {
    id: 10,
    name: "Louvre Museum",
    city: "Paris",
    country: "France",
    description: "World's largest art museum, home to the Mona Lisa and thousands of masterpieces.",
    images: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800",
      "https://images.unsplash.com/photo-1564504860457-7c36661e1b6e?w=800",
      "https://images.unsplash.com/photo-1581970498724-134df8ba6046?w=800",
      "https://images.unsplash.com/photo-1571847154307-1e8b82d3d78d?w=800"
    ],
    entryFee: 1700,
    category: "Museum",
    visitDuration: "3-4 hours",
    bestTimeToVisit: "Weekday morning",
    mustSee: true,
    rating: 4.8,
    visitors: "9.6M annually"
  },

  // Munich Destinations (Adventure Template)
  {
    id: 11,
    name: "Zugspitze Peak Climb",
    city: "Munich",
    country: "Germany",
    description: "Germany's highest peak with breathtaking alpine views and hiking trails.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=800"
    ],
    entryFee: 2000,
    category: "Hiking",
    visitDuration: "Full day",
    bestTimeToVisit: "Summer months",
    mustSee: true,
    rating: 4.8,
    visitors: "500K annually"
  },
  {
    id: 12,
    name: "Neuschwanstein Hike",
    city: "Munich",
    country: "Germany",
    description: "Scenic hike to the fairytale castle nestled in the Bavarian Alps.",
    images: [
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
      "https://images.unsplash.com/photo-1533213878891-b5e6b95aeb71?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    ],
    entryFee: 1000,
    category: "Hiking",
    visitDuration: "Half day",
    bestTimeToVisit: "Spring/Fall",
    mustSee: true,
    rating: 4.9,
    visitors: "1.5M annually"
  },
  {
    id: 13,
    name: "White Water Rafting",
    city: "Munich",
    country: "Germany",
    description: "Thrilling rafting experience on alpine rivers with expert guides.",
    images: [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1533213878891-b5e6b95aeb71?w=800"
    ],
    entryFee: 3500,
    category: "Water Sports",
    visitDuration: "3-4 hours",
    bestTimeToVisit: "Summer",
    mustSee: false,
    rating: 4.7,
    visitors: "Adventure sport"
  },

  // Rome Destinations (Culture Template)
  {
    id: 14,
    name: "Colosseum & Forum Tour",
    city: "Rome",
    country: "Italy",
    description: "Comprehensive tour of ancient Roman ruins and gladiator arena.",
    images: [
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
      "https://images.unsplash.com/photo-1548585744-4afaa4836dbd?w=800",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800",
      "https://images.unsplash.com/photo-1587141955899-5a82e0b22915?w=800"
    ],
    entryFee: 2500,
    category: "Historical",
    visitDuration: "3-4 hours",
    bestTimeToVisit: "Morning",
    mustSee: true,
    rating: 4.9,
    visitors: "6M annually"
  },
  {
    id: 15,
    name: "Vatican Museums",
    city: "Rome",
    country: "Italy",
    description: "World-renowned museums featuring the Sistine Chapel and Renaissance art.",
    images: [
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
      "https://images.unsplash.com/photo-1587141955899-5a82e0b22915?w=800",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800"
    ],
    entryFee: 4500,
    category: "Museum",
    visitDuration: "3-5 hours",
    bestTimeToVisit: "Early morning",
    mustSee: true,
    rating: 4.8,
    visitors: "6.9M annually"
  },
  {
    id: 16,
    name: "Renaissance Art Walk",
    city: "Rome",
    country: "Italy",
    description: "Guided walking tour through Rome's historic art districts and galleries.",
    images: [
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
      "https://images.unsplash.com/photo-1587141955899-5a82e0b22915?w=800",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800",
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800"
    ],
    entryFee: 1800,
    category: "Cultural Tour",
    visitDuration: "2-3 hours",
    bestTimeToVisit: "Afternoon",
    mustSee: false,
    rating: 4.6,
    visitors: "Cultural experience"
  },

  // Amsterdam Destinations (Family Template)
  {
    id: 17,
    name: "Keukenhof Gardens",
    city: "Amsterdam",
    country: "Netherlands",
    description: "World's largest flower garden with millions of tulips in bloom.",
    images: [
      "https://images.unsplash.com/photo-1498857205048-ed46a5dc3163?w=800",
      "https://images.unsplash.com/photo-1523699289804-94707a14e5c0?w=800",
      "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
      "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=800"
    ],
    entryFee: 2000,
    category: "Park",
    visitDuration: "2-3 hours",
    bestTimeToVisit: "Spring (April-May)",
    mustSee: true,
    rating: 4.8,
    visitors: "1.5M annually"
  },
  {
    id: 18,
    name: "Bike Tour Amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    description: "Family-friendly bike tour through canals and historic neighborhoods.",
    images: [
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800",
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800",
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800"
    ],
    entryFee: 1200,
    category: "Activity",
    visitDuration: "2-3 hours",
    bestTimeToVisit: "Anytime",
    mustSee: true,
    rating: 4.7,
    visitors: "Popular activity"
  },
  {
    id: 19,
    name: "Anne Frank House",
    city: "Amsterdam",
    country: "Netherlands",
    description: "Historic house and museum dedicated to Anne Frank's story.",
    images: [
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800",
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800",
      "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800"
    ],
    entryFee: 1400,
    category: "Museum",
    visitDuration: "1-2 hours",
    bestTimeToVisit: "Weekday morning",
    mustSee: true,
    rating: 4.9,
    visitors: "1.3M annually"
  }
];

// Export cities for filtering
export const destinationCities = [
  { name: "Paris", country: "France", count: 4 },
  { name: "Rome", country: "Italy", count: 4 },
  { name: "London", country: "UK", count: 1 },
  { name: "Berlin", country: "Germany", count: 1 },
  { name: "Barcelona", country: "Spain", count: 3 },
  { name: "Munich", country: "Germany", count: 3 },
  { name: "Amsterdam", country: "Netherlands", count: 3 }
];