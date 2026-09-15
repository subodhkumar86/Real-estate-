export interface LocationData {
  slug: string;
  name: string;
  tagline: string;
  opportunities: string;
  appreciation: string;
  avgPriceSqFt: string;
  rentalYield: string;
  image: string;
  overview: string;
  highlights: string[];
  catalysts: string[];
  connectivity: { name: string; time: string }[];
  featuredProjects: string[];
}

export const locations: LocationData[] = [
  {
    slug: 'noida-expressway',
    name: 'Noida Expressway',
    tagline: 'The city’s most connected growth corridor and corporate nerve center',
    opportunities: '32 curated opportunities',
    appreciation: '14.2% p.a.',
    avgPriceSqFt: '₹14,500 / sq.ft.',
    rentalYield: '4.5% – 6.2%',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    overview: 'The 24.5 km six-lane Noida-Greater Noida Expressway is the crown spine of NCR real estate. Lined with Fortune 500 tech campuses, global hospitals, premier IB schools, and ultra-luxury residential enclaves.',
    highlights: [
      'Seamless signal-free access to South Delhi and DND Flyway',
      'High concentration of MNCs (Microsoft, TCS, HCL, Adobe, Infosys)',
      'Operational Aqua Line Metro running parallel throughout the stretch',
      'Prime institutional hubs including Amity University and Jaypee Medical'
    ],
    catalysts: [
      'Jewar International Airport Phase-1 commissioning',
      'Underpass developments easing sector connectivity',
      'Expansion of institutional tech parks along Sectors 135 to 144'
    ],
    connectivity: [
      { name: 'Kalindi Kunj & Delhi Border', time: '10 mins' },
      { name: 'Noida Sector 18 Commercial Hub', time: '12 mins' },
      { name: 'Upcoming Jewar International Airport', time: '35 mins' },
      { name: 'Connaught Place, Central Delhi', time: '35 mins' }
    ],
    featuredProjects: ['M3M The Cullinan', 'Max Estate 128', 'Bhutani Cyberthum', 'ATS Knightsbridge']
  },
  {
    slug: 'sector-150',
    name: 'Sector 150 Sports City',
    tagline: 'Low-density green living with 80% designated forest and recreational cover',
    opportunities: '18 curated opportunities',
    appreciation: '16.8% p.a.',
    avgPriceSqFt: '₹12,800 / sq.ft.',
    rentalYield: '3.8% – 4.9%',
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=80',
    overview: 'Known as the Sports City and the greenest micro-market in entire NCR, Sector 150 mandates that over 80% of its landmass remains open green expanses. It features an Olympic sports complex, 42-acre Shaheed Bhagat Singh Park, and underground utility cables.',
    highlights: [
      '80% open and green expanses guaranteed by Noida Authority masterplan',
      'Shaheed Bhagat Singh City Park spanning 42 rolling green acres',
      'Underground power cabling with zero aerial overhead wires',
      'Direct exit to Yamuna Expressway, Faridabad-Noida-Ghaziabad (FNG) corridor'
    ],
    catalysts: [
      'Jewar International Airport direct highway spur',
      'Upcoming 9-hole international golf course and sports academy',
      'Commercial high-street mall developments in adjacent sectors'
    ],
    connectivity: [
      { name: 'Sector 148 Aqua Line Metro', time: '3 mins' },
      { name: 'Yamuna Expressway Entry', time: '4 mins' },
      { name: 'Jewar International Airport', time: '25 mins' },
      { name: 'Delhi Border', time: '25 mins' }
    ],
    featuredProjects: ['Ace Parkway', 'Godrej Tropical Isle', 'County 107']
  },
  {
    slug: 'jewar-airport',
    name: 'Jewar International Airport Corridor',
    tagline: 'Asias largest greenfield airport driving the next super-cycle of NCR appreciation',
    opportunities: '14 curated opportunities',
    appreciation: '21.5% p.a.',
    avgPriceSqFt: '₹9,200 / sq.ft.',
    rentalYield: '5.0% – 7.5%',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
    overview: 'The Noida International Airport at Jewar is the transformational catalyst reshaping North Indias economy. Set to become Asias largest aviation hub with multi-modal cargo, high-speed rail links, and an aerospace manufacturing zone.',
    highlights: [
      'Noida International Airport (Jewar) scheduled for commercial flights',
      'Proposed Pod Taxi (Personal Rapid Transit) connecting Airport with Film City',
      'Direct spur of Delhi-Varanasi High-Speed Bullet Train project',
      '1,000-acre Yamuna International Film City in immediate proximity'
    ],
    catalysts: [
      'Inaugural commercial flight operations',
      'Multi-modal logistics hub and dedicated freight corridors',
      'Electronic city and semiconductor manufacturing parks'
    ],
    connectivity: [
      { name: 'Noida City Center', time: '35 mins' },
      { name: 'Pari Chowk Greater Noida', time: '20 mins' },
      { name: 'Yamuna Expressway', time: '0 mins' },
      { name: 'Agra via Yamuna Expressway', time: '90 mins' }
    ],
    featuredProjects: ['Ace Parkway', 'Godrej Tropical Isle', 'Gaur City Centre']
  },
  {
    slug: 'sector-94',
    name: 'Sector 94 Delhi Gateway',
    tagline: 'Prestigious waterfront and skyline district directly touching South Delhi',
    opportunities: '8 curated opportunities',
    appreciation: '15.4% p.a.',
    avgPriceSqFt: '₹22,000 / sq.ft.',
    rentalYield: '4.2% – 5.8%',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    overview: 'The most prestigious address in Noida, situated directly on the Yamuna riverfront and adjacent to Okhla Bird Sanctuary. Sector 94 commands the highest price points in Noida and is home to high-net-worth individuals and corporate tycoons.',
    highlights: [
      'Immediate border with Kalindi Kunj and South Delhi (0 km)',
      'Panoramic water views of the Yamuna and Bird Sanctuary',
      'Okhla Bird Sanctuary Magenta Line Metro offering direct transit to IGI Airport'
    ],
    catalysts: [
      'Luxury mixed-use commercial and hospitality openings',
      'Beautification of Yamuna riverfront promenade'
    ],
    connectivity: [
      { name: 'South Delhi (Jasola/Sarita Vihar)', time: '2 mins' },
      { name: 'Nehru Place / GK', time: '15 mins' },
      { name: 'IGI Airport Terminal 3', time: '35 mins' }
    ],
    featuredProjects: ['M3M The Cullinan', 'ATS Knightsbridge']
  },
  {
    slug: 'sector-128',
    name: 'Sector 128 Golf Vista',
    tagline: 'An elite golf community surrounded by tranquil green fairways and luxury estates',
    opportunities: '12 curated opportunities',
    appreciation: '14.8% p.a.',
    avgPriceSqFt: '₹18,500 / sq.ft.',
    rentalYield: '4.0% – 5.5%',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80',
    overview: 'Centred around the iconic Jaypee Greens Golf Course, Sector 128 is synonymous with elite NCR estate living. Quiet tree-lined avenues, championship sports facilities, and the premier Max Super Speciality Hospital.',
    highlights: [
      'Surrounding 18-hole Graham Cooke designed golf course',
      'Low traffic, low pollution suburban atmosphere',
      'Immediate proximity to top healthcare and education'
    ],
    catalysts: [
      'New wellness and high-end retail developments',
      'Direct expressway flyover upgrades'
    ],
    connectivity: [
      { name: 'Mahamaya Flyover', time: '6 mins' },
      { name: 'Sector 18 Market', time: '8 mins' },
      { name: 'South Delhi', time: '14 mins' }
    ],
    featuredProjects: ['Max Estate 128', 'County 107', 'Paras Avenue & Residences']
  }
];
