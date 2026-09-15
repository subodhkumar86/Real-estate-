export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  propertyPurchased: string;
  portfolioValue: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Rohan Mehta',
    role: 'Founder & Managing Partner, Peak Ventures',
    location: 'Sector 94, Noida',
    quote: 'The difference with InvestInPro Noida was the sheer conviction and fiduciary discretion. I received a bespoke underwriting memorandum with verified title documents and clear numbers, not an endless sales brochure. Their relationship with developer chairmen secured us our private floor in days.',
    propertyPurchased: 'M3M The Cullinan (Sky Penthouse)',
    portfolioValue: '₹14.5 Cr',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    name: 'Ananya & Siddharth Kapoor',
    role: 'Private Family Office Principals',
    location: 'New Delhi / Sector 128',
    quote: 'Clear IRR benchmarks, honest downside stress-testing, and an advisory team that understood our multi-generational wealth timeline. Transitioning our family portfolio from South Delhi to Sector 128 golf estates was executed with complete discretion.',
    propertyPurchased: 'Max Estate 128 (Golf Estate)',
    portfolioValue: '₹10.5 Cr',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    name: 'Arjun Malhotra',
    role: 'Managing Director, Global Logistics (UAE NRI)',
    location: 'Downtown Dubai, UAE',
    quote: 'Deploying capital into Indian luxury real estate from Dubai usually involves anxiety over title registry, physical execution, and builder covenants. InvestInPro’s team handled 4K drone audits, virtual legal conveyance, and biometric handover flawlessly.',
    propertyPurchased: 'Godrej Tropical Isle (Island Suite)',
    portfolioValue: '₹7.2 Cr',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    name: 'Neha Arora',
    role: 'Director, Arora Capital Management',
    location: 'Golf Course Road, Gurugram',
    quote: 'A remarkably calm, data-backed buying experience in a market that is otherwise chaotic. Their micro-market advisory on Sector 140A institutional lease absorption helped us structure 9.2% net yield lockable corporate office suites.',
    propertyPurchased: 'Bhutani Cyberthum & CRC Flagship',
    portfolioValue: '₹5.8 Cr',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    name: 'Dr. Devashish Sen',
    role: 'Senior Cardiac Surgeon & Healthcare Trustee',
    location: 'London, UK / Sector 124',
    quote: 'Single-floor mansions on Noida Expressway offer space and finishes unmatched anywhere in South Delhi. InvestInPro verified every environmental clearance and structured the transaction seamlessly under FEMA guidelines.',
    propertyPurchased: 'ATS Knightsbridge (Single-Floor Palace)',
    portfolioValue: '₹12.0 Cr',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    rating: 5
  }
];
