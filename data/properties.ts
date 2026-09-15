export interface FloorPlan {
  title: string;
  size: string;
  carpetArea: string;
  price: string;
  specs: string;
}

export interface Amenity {
  name: string;
  category: 'Wellness' | 'Leisure' | 'Sports' | 'Convenience';
  icon: string;
}

export interface Property {
  slug: string;
  name: string;
  developer: string;
  location: string;
  sector: string;
  price: string;
  priceNum: number; // in INR (for calculations)
  usdPrice: string;
  configuration: string;
  area: string;
  possession: string;
  category: 'Ultra Luxury' | 'Golf-Side' | 'Island Living' | 'Commercial' | 'Penthouse' | 'Villas';
  type: 'Residential' | 'Commercial';
  investment: string;
  roi: string;
  rera: string;
  image: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  amenities: Amenity[];
  floorPlans: FloorPlan[];
  connectivity: { name: string; time: string }[];
  featured?: boolean;
}

export const properties: Property[] = [
  {
    slug: 'm3m-the-cullinan',
    name: 'M3M The Cullinan',
    developer: 'M3M India',
    location: 'Sector 94, Noida',
    sector: 'Sector 94',
    price: '₹5.40 Cr onwards',
    priceNum: 54000000,
    usdPrice: '$650,000',
    configuration: '3, 4 & 5 Bed Sky Mansions',
    area: '2,850 – 4,600 sq.ft.',
    possession: 'Q4 2028',
    category: 'Ultra Luxury',
    type: 'Residential',
    investment: 'High conviction',
    roi: '14.5% p.a.',
    rera: 'UPRERAPRJ442214',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'Rising as the crowning jewel of Sector 94, M3M The Cullinan is an ultra-exclusive mixed-use enclave directly bridging South Delhi with the Noida Expressway. Offering panoramic Yamuna river vistas, private elevator lobbies, and a 100,000 sq.ft. imperial clubhouse.',
    highlights: [
      '0 km from South Delhi boundary via Kalindi Kunj',
      'Triple-height 32-ft luxury drop-off lobbies',
      'Private plunge pools in signature penthouses',
      '100,000 sq.ft. Imperial Clubhouse with Michelin-inspired dining',
      'LEED Gold Certified green building design'
    ],
    amenities: [
      { name: 'Temperature Controlled Infinity Pool', category: 'Leisure', icon: 'Waves' },
      { name: 'Private Helipad Access', category: 'Convenience', icon: 'Plane' },
      { name: 'Championship Squash & Tennis Courts', category: 'Sports', icon: 'Trophy' },
      { name: 'Holistic Ayurvedic Spa & Hammam', category: 'Wellness', icon: 'Sparkles' },
      { name: '24/7 White-Glove Concierge by Quintessentially', category: 'Convenience', icon: 'Shield' },
      { name: 'Private Cigar & Wine Tasting Lounge', category: 'Leisure', icon: 'Wine' }
    ],
    floorPlans: [
      { title: '3 BHK Royal Residence', size: '2,850 sq.ft.', carpetArea: '2,150 sq.ft.', price: '₹5.40 Cr', specs: '3 Bed · 4 Bath · Servant Room · 2 Dedicated Parking' },
      { title: '4 BHK Grand Suite', size: '3,800 sq.ft.', carpetArea: '2,920 sq.ft.', price: '₹7.20 Cr', specs: '4 Bed · 5 Bath · Family Lounge · Powder Room · 3 Parking' },
      { title: '5 BHK Sky Penthouse', size: '5,600 sq.ft.', carpetArea: '4,450 sq.ft.', price: '₹12.50 Cr', specs: '5 Bed · Double Height Living · Private Terrace Pool · 4 Parking' }
    ],
    connectivity: [
      { name: 'Kalindi Kunj / South Delhi', time: '2 mins' },
      { name: 'Okhla Bird Sanctuary Metro', time: '1 min' },
      { name: 'Noida-Greater Noida Expressway', time: '0 mins' },
      { name: 'Jewar International Airport', time: '40 mins' }
    ],
    featured: true
  },
  {
    slug: 'godrej-tropical-isle',
    name: 'Godrej Tropical Isle',
    developer: 'Godrej Properties',
    location: 'Sector 146, Noida',
    sector: 'Sector 146',
    price: '₹3.25 Cr onwards',
    priceNum: 32500000,
    usdPrice: '$390,000',
    configuration: '3 & 4 Bed Island Residences',
    area: '2,200 – 3,900 sq.ft.',
    possession: 'Q3 2027',
    category: 'Island Living',
    type: 'Residential',
    investment: 'Lifestyle led',
    roi: '13.8% p.a.',
    rera: 'UPRERAPRJ303390',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'Inspired by pristine tropical retreats, Godrej Tropical Isle brings resort living to Sector 146. Features an artificial beach, lagoon clubhouse, air purification bio-filters in every apartment, and immediate walking connectivity to Sector 146 Metro Station.',
    highlights: [
      'Direct walking bridge to Sector 146 Metro Station',
      '3-acre pristine artificial beach & lagoon pool',
      'Ultra-dense tropical foliage with over 5,000 exotic trees',
      'Double-glazed acoustic windows and 5-tier security',
      'Smart home automation powered by Crestron'
    ],
    amenities: [
      { name: 'Lagoon Swimming Pool with White Sand', category: 'Leisure', icon: 'Waves' },
      { name: 'Tropical Island Clubhouse', category: 'Leisure', icon: 'Compass' },
      { name: 'Full-Sized Lawn Tennis Court', category: 'Sports', icon: 'Trophy' },
      { name: 'Aroma Therapy Meditation Gazebo', category: 'Wellness', icon: 'Sparkles' },
      { name: 'High-Speed EV Fast Charging Bays', category: 'Convenience', icon: 'Zap' },
      { name: 'Sky Observatory with Telescopic Deck', category: 'Leisure', icon: 'Eye' }
    ],
    floorPlans: [
      { title: '3 BHK Palm Suite', size: '2,200 sq.ft.', carpetArea: '1,680 sq.ft.', price: '₹3.25 Cr', specs: '3 Bed · 3 Bath · Balcony Garden · 2 Covered Parking' },
      { title: '4 BHK Island Sanctuary', size: '3,100 sq.ft.', carpetArea: '2,420 sq.ft.', price: '₹4.85 Cr', specs: '4 Bed · 4 Bath · Dressing Suite · Servant Quarter · 2 Parking' },
      { title: '4 BHK Presidential Villa Suite', size: '3,900 sq.ft.', carpetArea: '3,100 sq.ft.', price: '₹6.20 Cr', specs: '4 Bed · 5 Bath · Double Balconies · 3 Dedicated Parking' }
    ],
    connectivity: [
      { name: 'Sector 146 Metro Station', time: '1 min walk' },
      { name: 'Noida Expressway', time: '2 mins' },
      { name: 'Upcoming Jewar Airport', time: '35 mins' },
      { name: 'DND Flyway', time: '20 mins' }
    ],
    featured: true
  },
  {
    slug: 'max-estate-128',
    name: 'Max Estate 128',
    developer: 'Max Estates',
    location: 'Sector 128, Noida',
    sector: 'Sector 128',
    price: '₹4.75 Cr onwards',
    priceNum: 47500000,
    usdPrice: '$570,000',
    configuration: '3 & 4 Bed Residences',
    area: '2,750 – 4,500 sq.ft.',
    possession: 'Q2 2028',
    category: 'Golf-Side',
    type: 'Residential',
    investment: 'Long horizon',
    roi: '15.2% p.a.',
    rera: 'UPRERAPRJ992817',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'Nestled next to Jaypee Greens Golf Course in Sector 128, Max Estate 128 focuses on holistic wellbeing and low-density luxury. Only 260 bespoke residences across 10 acres of lush landscaped greens with 80% open spaces.',
    highlights: [
      'Uninterrupted 18-hole golf course panoramas',
      'Low density: only 25 residences per acre',
      'IGBC Platinum Pre-certified sustainable enclave',
      'Curated wellness philosophy with biophilic architecture',
      'Thermal insulation and noise-dampened living spaces'
    ],
    amenities: [
      { name: 'Golf Putting Greens & Simulator', category: 'Sports', icon: 'Trophy' },
      { name: 'Heated Indoor Swimming Pool', category: 'Leisure', icon: 'Waves' },
      { name: 'Organic Farm-to-Table Café', category: 'Wellness', icon: 'Sparkles' },
      { name: 'Pilates Studio & Ayurvedic Clinic', category: 'Wellness', icon: 'Activity' },
      { name: 'Artisan Library & Co-Working Suite', category: 'Convenience', icon: 'Book' }
    ],
    floorPlans: [
      { title: '3 BHK Golf Haven', size: '2,750 sq.ft.', carpetArea: '2,100 sq.ft.', price: '₹4.75 Cr', specs: '3 Bed · 4 Bath · Wrap-around Verandah · 2 Car Parking' },
      { title: '4 BHK Grand Estate', size: '3,850 sq.ft.', carpetArea: '3,050 sq.ft.', price: '₹6.80 Cr', specs: '4 Bed · 5 Bath · Chef Kitchen · Servant Suite · 3 Car Parking' }
    ],
    connectivity: [
      { name: 'Jaypee Greens Golf Course', time: 'Adjacent' },
      { name: 'Max Super Speciality Hospital', time: '5 mins' },
      { name: 'Mahamaya Flyover', time: '8 mins' },
      { name: 'Connaught Place, Delhi', time: '30 mins' }
    ],
    featured: true
  },
  {
    slug: 'ats-knightsbridge',
    name: 'ATS Knightsbridge',
    developer: 'ATS Infrastructure',
    location: 'Sector 124, Noida',
    sector: 'Sector 124',
    price: '₹6.10 Cr onwards',
    priceNum: 61000000,
    usdPrice: '$730,000',
    configuration: '4 & 6 Bed Private Mansions',
    area: '4,000 – 6,000 sq.ft.',
    possession: 'Ready to Move',
    category: 'Penthouse',
    type: 'Residential',
    investment: 'Scarcity premium',
    roi: '12.4% p.a.',
    rera: 'UPRERAPRJ114920',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'A statement of peerless aristocratic grandeur at the strategic nexus of Delhi and Noida. ATS Knightsbridge offers single-residence-per-floor sky mansions with 360-degree unobstructed horizon views and unmatched personal discretion.',
    highlights: [
      'Single residence per floor concept with dedicated private high-speed elevators',
      'Soaring 13-foot clear ceiling heights',
      'Ultra-exclusive 35,000 sq.ft. Clubhouse The Mayfair',
      'Ready to move with immediate registry and handover',
      'Panoramic Yamuna riverfront and Delhi skyline vistas'
    ],
    amenities: [
      { name: 'Olympic-Standard Lap Pool', category: 'Sports', icon: 'Waves' },
      { name: 'Private Gold-Class Screening Theatre', category: 'Leisure', icon: 'Tv' },
      { name: 'Dedicated Butler & Valet Service', category: 'Convenience', icon: 'UserCheck' },
      { name: 'Temperature Controlled Wine Cellar', category: 'Leisure', icon: 'Wine' }
    ],
    floorPlans: [
      { title: '4 BHK Grand Mansion', size: '4,050 sq.ft.', carpetArea: '3,200 sq.ft.', price: '₹6.10 Cr', specs: '4 Bed · 5 Bath · Double Staff Quarters · 3 Car Parking' },
      { title: '6 BHK Sky Villa', size: '6,000 sq.ft.', carpetArea: '4,800 sq.ft.', price: '₹9.80 Cr', specs: '6 Bed · 7 Bath · Private Pool Deck · 4 Car Parking' }
    ],
    connectivity: [
      { name: 'Delhi Border', time: '1 min' },
      { name: 'Sector 18 Commercial Hub', time: '5 mins' },
      { name: 'Golf Course Metro', time: '4 mins' }
    ],
    featured: true
  },
  {
    slug: 'county-107',
    name: 'County 107',
    developer: 'County Group',
    location: 'Sector 107, Noida',
    sector: 'Sector 107',
    price: '₹2.45 Cr onwards',
    priceNum: 24500000,
    usdPrice: '$295,000',
    configuration: '3 & 4 Bed Luxury Suites',
    area: '2,100 – 3,600 sq.ft.',
    possession: 'Ready to Move',
    category: 'Ultra Luxury',
    type: 'Residential',
    investment: 'End-user favourite',
    roi: '11.8% p.a.',
    rera: 'UPRERAPRJ783944',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'Indias first residential project with an elevated aerial walkway connecting all residential towers. Complete zero-vehicular surface movement, real forest landscaped gardens, and ready possession.',
    highlights: [
      'Elevated skywalk with lush jogging tracks among canopy',
      'Zero vehicle movement at ground level',
      'Centrally air-conditioned homes with VRV HVAC systems',
      'Clubhouse with indoor heated swimming pool'
    ],
    amenities: [
      { name: 'Canopy Aerial Walkway', category: 'Wellness', icon: 'Compass' },
      { name: 'Heated Indoor Swimming Pool', category: 'Leisure', icon: 'Waves' },
      { name: 'Badminton & Squash Courts', category: 'Sports', icon: 'Trophy' }
    ],
    floorPlans: [
      { title: '3 BHK Suite', size: '2,100 sq.ft.', carpetArea: '1,620 sq.ft.', price: '₹2.45 Cr', specs: '3 Bed · 3 Bath · Extended Balcony · 2 Parking' },
      { title: '4 BHK Grand Suite', size: '3,200 sq.ft.', carpetArea: '2,500 sq.ft.', price: '₹3.90 Cr', specs: '4 Bed · 4 Bath · Powder Room · 2 Parking' }
    ],
    connectivity: [
      { name: 'Noida Expressway', time: '3 mins' },
      { name: 'Sector 76 Metro Station', time: '5 mins' },
      { name: 'Amity University', time: '6 mins' }
    ]
  },
  {
    slug: 'ace-parkway',
    name: 'Ace Parkway',
    developer: 'Ace Group',
    location: 'Sector 150, Noida',
    sector: 'Sector 150',
    price: '₹1.90 Cr onwards',
    priceNum: 19000000,
    usdPrice: '$230,000',
    configuration: '3 & 4 Bed Parkside Homes',
    area: '1,950 – 2,650 sq.ft.',
    possession: 'Q1 2027',
    category: 'Villas',
    type: 'Residential',
    investment: 'Growth corridor',
    roi: '16.1% p.a.',
    rera: 'UPRERAPRJ552011',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'Overlooking the 42-acre Shaheed Bhagat Singh City Park in low-density Sector 150. Ace Parkway combines classic Roman Art Deco architecture with 51 dedicated sports amenities designed for an active luxury lifestyle.',
    highlights: [
      'Faces 42-acre lush green central city park',
      'Sector 150: Lowest density sector of NCR (80% open greens)',
      '51 world-class sports amenities curated by international coaches',
      'Instant access to Noida-Greater Noida Expressway and Yamuna Expressway'
    ],
    amenities: [
      { name: '51 Olympic-Standard Sports Facilities', category: 'Sports', icon: 'Trophy' },
      { name: 'Roman-Inspired Grand Amphitheatre', category: 'Leisure', icon: 'Eye' },
      { name: 'Reflexology Zen Garden', category: 'Wellness', icon: 'Sparkles' }
    ],
    floorPlans: [
      { title: '3 BHK Parkside', size: '1,950 sq.ft.', carpetArea: '1,510 sq.ft.', price: '₹1.90 Cr', specs: '3 Bed · 3 Bath · Green View · 2 Parking' },
      { title: '4 BHK Executive', size: '2,650 sq.ft.', carpetArea: '2,080 sq.ft.', price: '₹2.75 Cr', specs: '4 Bed · 4 Bath · Dressing Area · 2 Parking' }
    ],
    connectivity: [
      { name: 'Shaheed Bhagat Singh Park', time: 'Directly Adjacent' },
      { name: 'Sector 148 Metro Station', time: '3 mins' },
      { name: 'Jewar International Airport', time: '25 mins' }
    ]
  },
  {
    slug: 'bhutani-cyberthum',
    name: 'Bhutani Cyberthum',
    developer: 'Bhutani Group',
    location: 'Sector 140A, Noida',
    sector: 'Sector 140A',
    price: '₹85 Lakh onwards',
    priceNum: 8500000,
    usdPrice: '$105,000',
    configuration: 'Grade-A Office Suites & High Street Retail',
    area: '450 – 2,000 sq.ft.',
    possession: 'Q4 2026',
    category: 'Commercial',
    type: 'Commercial',
    investment: 'High Rental Yield',
    roi: '9.5% Net Yield',
    rera: 'UPRERAPRJ240588',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'One of North Indias tallest commercial developments featuring twin 50-storey iconic towers. Cyberthum introduces a massive musical fountain water body, sky mall, and Grade-A lockable corporate suites with long-term leasing commitments.',
    highlights: [
      'Twin 50-storey Grade-A commercial corporate skyscrapers',
      'Spectacular Vegas-style dancing fountain on 2-acre lake',
      'Lockable office spaces with pre-leased corporate options',
      'Sky-walk connectivity between office towers and retail district'
    ],
    amenities: [
      { name: 'Multi-Level High Street Retail & Dining', category: 'Convenience', icon: 'ShoppingBag' },
      { name: 'Helipad on 50th Floor Tower Roof', category: 'Convenience', icon: 'Plane' },
      { name: 'Executive Business Boardrooms', category: 'Convenience', icon: 'Briefcase' }
    ],
    floorPlans: [
      { title: 'Executive Lockable Office', size: '550 sq.ft.', carpetArea: '400 sq.ft.', price: '₹85 Lakh', specs: 'Fully Furnished · Central AC · High-speed elevators' },
      { title: 'Corporate Corner Suite', size: '1,250 sq.ft.', carpetArea: '950 sq.ft.', price: '₹1.95 Cr', specs: 'Panoramic Expressway View · Private Restroom · 1 Parking' }
    ],
    connectivity: [
      { name: 'Noida Expressway', time: '1 min' },
      { name: 'Sector 137 Metro Station', time: '3 mins' },
      { name: 'DND Flyway', time: '18 mins' }
    ]
  },
  {
    slug: 'crc-the-flagship',
    name: 'CRC The Flagship',
    developer: 'CRC Group',
    location: 'Sector 140A, Noida',
    sector: 'Sector 140A',
    price: '₹1.35 Cr onwards',
    priceNum: 13500000,
    usdPrice: '$165,000',
    configuration: 'Commercial Towers & IT Enclave',
    area: '1,850 – 2,750 sq.ft.',
    possession: 'Q3 2027',
    category: 'Commercial',
    type: 'Commercial',
    investment: 'Expressway access',
    roi: '9.2% Net Yield',
    rera: 'UPRERAPRJ882190',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'A premium campus for leading global tech enterprises and financial powerhouses. Features IGBC Platinum architecture, rooftop infinity pools, and world-class retail promenades.',
    highlights: [
      'Platinum rated green IT campus',
      'Dual metro connectivity',
      'Campus style dining and open-air amphitheatre'
    ],
    amenities: [
      { name: 'Rooftop Lounge & Fine Dining', category: 'Leisure', icon: 'Wine' },
      { name: 'Automated 4-Tier Parking System', category: 'Convenience', icon: 'Shield' }
    ],
    floorPlans: [
      { title: 'Tech Suite Unit', size: '1,850 sq.ft.', carpetArea: '1,400 sq.ft.', price: '₹1.35 Cr', specs: 'Fibre Optic Backbone · 100% Power Backup' }
    ],
    connectivity: [
      { name: 'Noida Expressway', time: '2 mins' },
      { name: 'Advant Navis Business Park', time: '4 mins' }
    ]
  },
  {
    slug: 'gulshan-dynasty',
    name: 'Gulshan Dynasty',
    developer: 'Gulshan Group',
    location: 'Sector 144, Noida',
    sector: 'Sector 144',
    price: '₹4.90 Cr onwards',
    priceNum: 49000000,
    usdPrice: '$590,000',
    configuration: '4 Bed Ultra Luxury Homes',
    area: '4,700 sq.ft.',
    possession: 'Ready to Move',
    category: 'Ultra Luxury',
    type: 'Residential',
    investment: 'Elite End-user',
    roi: '12.0% p.a.',
    rera: 'UPRERAPRJ139441',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'Noidas first wellness-certified luxury residences. With only two apartments per floor, Gulshan Dynasty delivers 76% green landscapes, hydroponic farming on site, and 50+ hand-picked wellness amenities.',
    highlights: [
      'WELL Certified Platinum luxury project',
      'On-site hydroponic organic kitchen farm',
      'Single configuration exclusivity: 4 BHK with 4,700 sq.ft.',
      'Dedicated private elevator access for each residence'
    ],
    amenities: [
      { name: 'Hydroponic Vegetable Garden', category: 'Wellness', icon: 'Sparkles' },
      { name: 'Olympic Sized Heated Pool', category: 'Sports', icon: 'Waves' },
      { name: 'Private Concierge Desks', category: 'Convenience', icon: 'Shield' }
    ],
    floorPlans: [
      { title: 'The Dynasty Signature 4 BHK', size: '4,700 sq.ft.', carpetArea: '3,800 sq.ft.', price: '₹4.90 Cr', specs: '4 Bed · 5 Bath · 2 Servant Rooms · 3 Reserved Parking' }
    ],
    connectivity: [
      { name: 'Sector 144 Metro Station', time: '1 min' },
      { name: 'Expressway Flyover', time: '2 mins' }
    ]
  },
  {
    slug: 'mahagun-medalleo',
    name: 'Mahagun Medalleo',
    developer: 'Mahagun Group',
    location: 'Sector 107, Noida',
    sector: 'Sector 107',
    price: '₹3.10 Cr onwards',
    priceNum: 31000000,
    usdPrice: '$370,000',
    configuration: '3 & 4 Bed Regal Suites',
    area: '2,500 – 3,700 sq.ft.',
    possession: 'Q3 2027',
    category: 'Ultra Luxury',
    type: 'Residential',
    investment: 'Established micro-market',
    roi: '13.1% p.a.',
    rera: 'UPRERAPRJ125561',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'Infusing classical French neoclassical architecture with contemporary smart home luxury. Located in established Sector 107, offering unhindered green vistas and proximity to top international schools.',
    highlights: [
      'French Chateau inspired design with high arches and stonework',
      'Private clubhouse with heated pool and cigar room',
      'VRV central air conditioning with air purifier units'
    ],
    amenities: [
      { name: 'Grand Ballroom & Banquet', category: 'Leisure', icon: 'Sparkles' },
      { name: 'Infinity Lap Pool', category: 'Leisure', icon: 'Waves' }
    ],
    floorPlans: [
      { title: '3 BHK Royal', size: '2,500 sq.ft.', carpetArea: '1,950 sq.ft.', price: '₹3.10 Cr', specs: '3 Bed · 3 Bath · 2 Balconies · 2 Parking' },
      { title: '4 BHK Sovereign', size: '3,700 sq.ft.', carpetArea: '2,900 sq.ft.', price: '₹4.60 Cr', specs: '4 Bed · 5 Bath · Powder Room · 3 Parking' }
    ],
    connectivity: [
      { name: 'Pathways International School', time: '4 mins' },
      { name: 'Sector 18 Market', time: '10 mins' }
    ]
  },
  {
    slug: 'gaur-city-centre',
    name: 'Gaur City Centre',
    developer: 'Gaurs Group',
    location: 'Greater Noida West',
    sector: 'Greater Noida West',
    price: '₹72 Lakh onwards',
    priceNum: 7200000,
    usdPrice: '$87,000',
    configuration: 'High Street Retail & Commercial',
    area: '350 – 1,800 sq.ft.',
    possession: 'Ready to Move',
    category: 'Commercial',
    type: 'Commercial',
    investment: 'High Footfall',
    roi: '8.8% Net Yield',
    rera: 'UPRERAPRJ478901',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'Positioned at the bustling Kisan Chowk, Gaur City Centre caters to over 500,000 residents within a 3-km radius. A ready-to-move commercial epicenter with anchor retail stores, multiplex, and office suites.',
    highlights: [
      'Catchment area of over 500,000 prospective shoppers',
      'Immediate connectivity to proposed Greater Noida Metro line',
      'Operational multiplex and major national fashion anchors'
    ],
    amenities: [
      { name: 'Food Court & Fine Dine Promenade', category: 'Leisure', icon: 'ShoppingBag' },
      { name: 'Multi-Level Car Parking for 4,000+ Vehicles', category: 'Convenience', icon: 'Shield' }
    ],
    floorPlans: [
      { title: 'High Street Retail Shop', size: '450 sq.ft.', carpetArea: '320 sq.ft.', price: '₹72 Lakh', specs: 'Double Height Ground Floor · Direct Walkway frontage' }
    ],
    connectivity: [
      { name: 'Gaur Chowk / Kisan Chowk', time: '0 mins' },
      { name: 'Sector 52 Metro Station', time: '12 mins' }
    ]
  },
  {
    slug: 'paras-quartier-golf',
    name: 'Paras Avenue & Residences',
    developer: 'Paras Buildtech',
    location: 'Sector 129, Noida',
    sector: 'Sector 129',
    price: '₹2.80 Cr onwards',
    priceNum: 28000000,
    usdPrice: '$340,000',
    configuration: '3 & 4 Bed Modern Suites',
    area: '2,350 – 3,400 sq.ft.',
    possession: 'Q2 2027',
    category: 'Golf-Side',
    type: 'Residential',
    investment: 'Expressway Hub',
    roi: '13.4% p.a.',
    rera: 'UPRERAPRJ993812',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'High-visibility expressway frontage with contemporary glass facade towers. Seamlessly merges luxury residences with a boutique retail high street.',
    highlights: [
      'Expressway corner plot with zero signal access to Delhi',
      'Modern glass curtain wall architecture',
      'Rooftop club with infinity pool and sky deck'
    ],
    amenities: [
      { name: 'Sky Club with 360-degree city views', category: 'Leisure', icon: 'Waves' },
      { name: 'Fitness Centre with Personal Trainers', category: 'Wellness', icon: 'Activity' }
    ],
    floorPlans: [
      { title: '3 BHK Urban', size: '2,350 sq.ft.', carpetArea: '1,800 sq.ft.', price: '₹2.80 Cr', specs: '3 Bed · 3 Bath · 2 Balconies' }
    ],
    connectivity: [
      { name: 'Jaypee Hospital', time: '2 mins' },
      { name: 'DND Flyway', time: '14 mins' }
    ]
  },
  {
    slug: 'kalpataru-vista',
    name: 'Kalpataru Vista',
    developer: 'Kalpataru Limited',
    location: 'Sector 128, Noida',
    sector: 'Sector 128',
    price: '₹5.15 Cr onwards',
    priceNum: 51500000,
    usdPrice: '$620,000',
    configuration: '3 & 4 Bed Championship Golf Condos',
    area: '3,000 – 4,150 sq.ft.',
    possession: 'Q4 2027',
    category: 'Golf-Side',
    type: 'Residential',
    investment: 'Generational Trophy',
    roi: '14.2% p.a.',
    rera: 'UPRERAPRJ442299',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    overview: 'Flanked by a 9-hole executive and 18-hole Graham Cooke championship golf course, Kalpataru Vista provides unbroken fairway vistas, private viewing decks, and acoustic privacy.',
    highlights: [
      'Direct frontage overlooking 18-hole championship greens',
      'Double glazed acoustic floor-to-ceiling glass envelopes',
      'Temperature controlled infinity pool & wellness pavilion',
      'Private biometric high-speed elevator access'
    ],
    amenities: [
      { name: 'Championship Golf Putting Greens', category: 'Sports', icon: 'Trophy' },
      { name: 'Infinity Edge Pool overlooking fairways', category: 'Leisure', icon: 'Waves' },
      { name: 'Private Concierge & Valet Service', category: 'Convenience', icon: 'Shield' }
    ],
    floorPlans: [
      { title: '3 BHK Golf Residence', size: '3,000 sq.ft.', carpetArea: '2,320 sq.ft.', price: '₹5.15 Cr', specs: '3 Bed · 4 Bath · Wrap-around Golf Balcony' },
      { title: '4 BHK Grand Golf Suite', size: '4,150 sq.ft.', carpetArea: '3,250 sq.ft.', price: '₹7.10 Cr', specs: '4 Bed · 5 Bath · Staff Quarters · 3 Car Parks' }
    ],
    connectivity: [
      { name: 'Sector 128 Jaypee Greens', time: '0 mins' },
      { name: 'Noida-Greater Noida Expressway', time: '1 min' },
      { name: 'South Delhi (Kalindi Kunj)', time: '15 mins' }
    ]
  }
];
