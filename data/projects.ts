export interface Project {
  slug: string;
  name: string;
  developer: string;
  location: string;
  sector: string;
  price: string;
  type: string;
  status: 'New Launch' | 'Under Construction' | 'Ready to Move' | 'Private Preview';
  landArea: string;
  towers: string;
  openSpace: string;
  units: string;
  image: string;
  description: string;
  highlight: string;
  completion: string;
}

export const projects: Project[] = [
  {
    slug: 'm3m-the-cullinan',
    name: 'M3M The Cullinan',
    developer: 'M3M India',
    location: 'Sector 94, Noida',
    sector: 'Sector 94',
    price: '₹5.40 Cr onwards',
    type: 'Sky Mansions & High Street',
    status: 'Under Construction',
    landArea: '12.8 Acres',
    towers: '5 Luxury Towers',
    openSpace: '85% Green Cover',
    units: '374 Bespoke Residences',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    description: 'Noida’s most prominent gateway landmark at the Delhi border. Designed by DP Architects Singapore with a 100,000 sq.ft. private clubhouse and luxury retail promenade.',
    highlight: 'Direct zero-signal connectivity to South Delhi & Kalindi Kunj.',
    completion: 'December 2028'
  },
  {
    slug: 'godrej-tropical-isle',
    name: 'Godrej Tropical Isle',
    developer: 'Godrej Properties',
    location: 'Sector 146, Noida',
    sector: 'Sector 146',
    price: '₹3.25 Cr onwards',
    type: 'Island Theme Luxury Living',
    status: 'Under Construction',
    landArea: '12.5 Acres',
    towers: '7 High-Rise Towers',
    openSpace: '80% Tropical Greens',
    units: '700 Curated Suites',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    description: 'A botanical resort sanctuary featuring an artificial white-sand beach, floating cabanas, and private sky bridges in the burgeoning Sector 146 growth corridor.',
    highlight: 'Direct skybridge connection to Sector 146 Metro Station.',
    completion: 'October 2027'
  },
  {
    slug: 'max-estate-128',
    name: 'Max Estate 128',
    developer: 'Max Estates',
    location: 'Sector 128, Noida',
    sector: 'Sector 128',
    price: '₹4.75 Cr onwards',
    type: 'Golf-Side Wellbeing Enclave',
    status: 'Under Construction',
    landArea: '10 Acres',
    towers: '4 Boutique Towers',
    openSpace: '82% Landscaped Gardens',
    units: '260 Exclusive Residences',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85',
    description: 'Ultra low-density living centered around the LiveWell philosophy. Panoramic golf course frontage, acoustic sound isolation, and organic culinary offerings.',
    highlight: 'Unobstructed vistas of the Jaypee 18-hole championship golf course.',
    completion: 'June 2028'
  },
  {
    slug: 'ats-knightsbridge',
    name: 'ATS Knightsbridge',
    developer: 'ATS Infrastructure',
    location: 'Sector 124, Noida',
    sector: 'Sector 124',
    price: '₹6.10 Cr onwards',
    type: 'Ultra-Luxury Single Floor Mansions',
    status: 'Ready to Move',
    landArea: '6.25 Acres',
    towers: '5 Palatial Towers',
    openSpace: '75% Open Greens',
    units: '215 Private Mansions',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    description: 'Architectural homage to timeless classicism. One residence per floor with private elevators, 13-foot ceilings, and high-security biometric protocols.',
    highlight: 'Ready for possession and registry with full OC received.',
    completion: 'Ready to Move'
  },
  {
    slug: 'ace-parkway',
    name: 'Ace Parkway',
    developer: 'Ace Group',
    location: 'Sector 150, Noida',
    sector: 'Sector 150',
    price: '₹1.90 Cr onwards',
    type: 'Sports City Classic Residences',
    status: 'Under Construction',
    landArea: '11.3 Acres',
    towers: '11 Stately Towers',
    openSpace: '85% Verdant Greens',
    units: '513 Luxury Units',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=85',
    description: 'Located in NCR’s greenest sector, facing the 42-acre Shaheed Bhagat Singh City Park. Features 51 Olympic sports amenities and classical Art Deco elevation.',
    highlight: 'Directly on the express link to the upcoming Jewar International Airport.',
    completion: 'March 2027'
  },
  {
    slug: 'bhutani-cyberthum',
    name: 'Bhutani Cyberthum',
    developer: 'Bhutani Group',
    location: 'Sector 140A, Noida',
    sector: 'Sector 140A',
    price: '₹85 Lakh onwards',
    type: 'Grade-A Commercial & Retail',
    status: 'Under Construction',
    landArea: '26.8 Acres',
    towers: '2 Towers (50 Floors each)',
    openSpace: '70% Open Area',
    units: 'Corporate Suites & Retail',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
    description: 'North India’s tallest commercial twin towers. Featuring an amphitheatre lake, dancing musical fountains, sky lounges, and premium pre-leased IT spaces.',
    highlight: '50-storey architectural triumph with panoramic expressway visibility.',
    completion: 'December 2026'
  },
  {
    slug: 'kalpataru-vista',
    name: 'Kalpataru Vista',
    developer: 'Kalpataru Limited',
    location: 'Sector 128, Noida',
    sector: 'Sector 128',
    price: '₹5.15 Cr onwards',
    type: 'Championship Golf Residences',
    status: 'Under Construction',
    landArea: '8.5 Acres',
    towers: '2 Signature Towers',
    openSpace: '80% Golf Greens',
    units: '198 Bespoke Condos',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    description: 'Flanked by a 9-hole executive and 18-hole Graham Cooke championship golf course. Boasts floor-to-ceiling glass envelopes and private viewing decks.',
    highlight: 'Infinite greens panorama with zero road noise.',
    completion: 'November 2027'
  }
];
