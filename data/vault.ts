export interface VaultProperty {
  id: string;
  codeName: string;
  location: string;
  sector: string;
  price: string;
  priceNum: number;
  usdPrice: string;
  assetType: string;
  size: string;
  carpetArea: string;
  sellerType: 'Promoter Equity Tranche' | 'Institutional Land Parcel' | 'Diplomatic Resale' | 'Ultra-HNI Sky Villa';
  confidentialityLevel: 'Strict NDA Required' | 'Direct Board Approval' | 'Private Treaty';
  image: string;
  overview: string;
  confidentialHighlights: string[];
  specs: { label: string; value: string }[];
  targetIRR: string;
}

export const vaultProperties: VaultProperty[] = [
  {
    id: "VP-01",
    codeName: "The Imperial Triplex Sky Mansion",
    location: "Sector 94 Waterfront, Noida",
    sector: "Sector 94",
    price: "₹28.50 Cr",
    priceNum: 285000000,
    usdPrice: "$3,420,000",
    assetType: "Triplex Penthouse (Top 3 Floors)",
    size: "11,200 sq.ft.",
    carpetArea: "8,850 sq.ft.",
    sellerType: "Promoter Equity Tranche",
    confidentialityLevel: "Strict NDA Required",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90",
    overview: "An unlisted, single-owner triplex commanding the highest residential elevation on the Delhi-Noida waterfront border. Features a cantilevered 40-ft heated sky pool, private internal pneumatic elevator, and 6 dedicated basement parking slots with EV superchargers.",
    confidentialHighlights: [
      "Offered directly from the developer chairman's personal reserve quota",
      "Unobstructed 360-degree views of Yamuna river and Delhi skyline",
      "Triple-height private grand foyer with bespoke Italian marble finishing",
      "Pre-approved subvention payment terms: 25:75 on possession"
    ],
    specs: [
      { label: "Configuration", value: "6 Bedrooms · 8 Bathrooms · 2 Staff Suites" },
      { label: "Ceiling Height", value: "14.5 Feet Clear" },
      { label: "Private Amenities", value: "Sky Pool · Cigar Room · 12-Seater Cinema" },
      { label: "Handover Status", value: "Bespoke Bare-Shell (Ready for Interior Architecture)" }
    ],
    targetIRR: "18.2% p.a."
  },
  {
    id: "VP-02",
    codeName: "The Sovereign Fairway Estate",
    location: "Sector 128 Golf Vista, Noida",
    sector: "Sector 128",
    price: "₹36.00 Cr",
    priceNum: 360000000,
    usdPrice: "$4,350,000",
    assetType: "Independent Golf Front Villa Estate",
    size: "14,500 sq.ft. Built-up on 1,000 sq.yd. Plot",
    carpetArea: "12,200 sq.ft.",
    sellerType: "Diplomatic Resale",
    confidentialityLevel: "Direct Board Approval",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
    overview: "Directly adjoining the Graham Cooke championship 18-hole golf course. Commissioned by a prominent industrial family with bullet-resistant triple glazing, subterranean 1,200-bottle wine tasting cellar, and professional indoor 2-lane bowling alley.",
    confidentialHighlights: [
      "Zero signal connectivity to South Delhi; private gated cul-de-sac",
      "Full freehold title conveyance with zero authority dues",
      "Private wellness wing with Finnish sauna, steam hammam, and plunge pool",
      "Discreet off-market sale to preserve owner confidentiality"
    ],
    specs: [
      { label: "Configuration", value: "7 Suite Bedrooms · Private Office Wing · Gymnasium" },
      { label: "Green Boundary", value: "120 Feet Direct Golf Course Frontage" },
      { label: "Parking Facility", value: "Covered Garage for 8 Luxury Vehicles" },
      { label: "Title Due Diligence", value: "Pre-cleared by Top-Tier Law Firm" }
    ],
    targetIRR: "15.4% p.a."
  },
  {
    id: "VP-03",
    codeName: "The Jewar Corridor Institutional Tech & Logistics Parcel",
    location: "Yamuna Expressway / Jewar Airport Node",
    sector: "Jewar Sector 28",
    price: "₹65.00 Cr",
    priceNum: 650000000,
    usdPrice: "$7,800,000",
    assetType: "Institutional Commercial / Data Center Land",
    size: "5.5 Acres (26,620 sq.yd.)",
    carpetArea: "FAR 2.5 (600,000 sq.ft. developable potential)",
    sellerType: "Institutional Land Parcel",
    confidentialityLevel: "Private Treaty",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90",
    overview: "Rare corner institutional land parcel situated 8 minutes from the inaugural terminal of Noida International Airport. Ideal for hyperscale data centers, global semiconductor assembly, or a 5-star airport transit hotel.",
    confidentialHighlights: [
      "Approved for multi-modal commercial & institutional zoning",
      "Dual grid 132kV power substation connectivity agreement in place",
      "Zero encumbrance, direct leasehold from Yamuna Expressway Authority",
      "Eligible for UP IT & Data Center Policy capital subsidies"
    ],
    specs: [
      { label: "Road Frontage", value: "60-Meter Wide Arterial Boulevard" },
      { label: "Permitted Use", value: "Data Center / Corporate Campus / Hospitality" },
      { label: "Distance to Airport", value: "6.8 km to Runway 1 Entrance" },
      { label: "Payment Flexibility", value: "Tranche-based milestone settlement" }
    ],
    targetIRR: "24.5% p.a."
  },
  {
    id: "VP-04",
    codeName: "The Diplomatic Sky Villa",
    location: "Sector 124 Delhi Nexus, Noida",
    sector: "Sector 124",
    price: "₹21.00 Cr",
    priceNum: 210000000,
    usdPrice: "$2,520,000",
    assetType: "Double-Height Sky Palace",
    size: "8,400 sq.ft.",
    carpetArea: "6,650 sq.ft.",
    sellerType: "Ultra-HNI Sky Villa",
    confidentialityLevel: "Strict NDA Required",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
    overview: "A majestic double-height residence occupying the penultimate floor with private elevator bank. Designed for high-ranking corporate leaders and diplomatic dignitaries requiring maximum physical and digital security.",
    confidentialHighlights: [
      "Private biometric elevator lobby with dual-stage access vestibule",
      "Double-height 26-foot living salon overlooking Okhla Bird Sanctuary",
      "Off-market promoter liquidation tranche at 15% discount to ready market",
      "Immediate possession with OC and completion certificate"
    ],
    specs: [
      { label: "Configuration", value: "5 Grand Suites · Double Kitchens · Security Bunker" },
      { label: "Acoustic Glazing", value: "Schüco German Sound-Insulated Facade" },
      { label: "Car Parking", value: "4 Reserved Basement Spots Directly Next to Lift" },
      { label: "Club Membership", value: "Lifetime Mayfair Club Founder Pass Included" }
    ],
    targetIRR: "16.8% p.a."
  }
];
