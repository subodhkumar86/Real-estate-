"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  Building2, 
  Compass, 
  CheckCircle2, 
  Layers, 
  PhoneCall, 
  Calendar,
  Waves,
  Award,
  ChevronDown,
  Play,
  Car,
  Clock,
  Shield,
  Lock,
  Key,
  X
} from "lucide-react";
import { properties, Property } from "../data/properties";
import { locations } from "../data/locations";
import { testimonials } from "../data/testimonials";
import ConsultationModal from "../components/ConsultationModal";

const heroSlides = [
  {
    volume: "COLLECTION NO. I",
    tag: "SIGNATURE WATERFRONT SKY MANSIONS",
    title: "Where Architecture",
    highlight: "Transcends Time.",
    subtitle: "Direct South Delhi gateway access, private elevator lobbies, and uninterrupted Yamuna river panoramas at Sector 94.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90",
    slug: "m3m-the-cullinan",
    property: "M3M The Cullinan · Sector 94",
    price: "₹5.40 Cr onwards",
    architect: "DP Architects, Singapore"
  },
  {
    volume: "COLLECTION NO. II",
    tag: "BOTANICAL ISLAND SANCTUARY",
    title: "Island Living,",
    highlight: "Reimagined for NCR.",
    subtitle: "Private white-sand lagoons, bio-filtered pure oxygen suites, and direct skybridge metro connection at Sector 146.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90",
    slug: "godrej-tropical-isle",
    property: "Godrej Tropical Isle · Sector 146",
    price: "₹3.25 Cr onwards",
    architect: "Godrej Design Lab"
  },
  {
    volume: "COLLECTION NO. III",
    tag: "18-HOLE GOLF WELLBEING ESTATE",
    title: "Unbroken Fairways,",
    highlight: "Generational Privacy.",
    subtitle: "Only 260 bespoke estates across 10 acres of pristine manicured greens directly bordering Jaypee Greens Golf Course.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=90",
    slug: "max-estate-128",
    property: "Max Estate 128 · Sector 128",
    price: "₹4.75 Cr onwards",
    architect: "Gensler Architects, UK"
  },
  {
    volume: "COLLECTION NO. IV",
    tag: "SINGLE-RESIDENCE-PER-FLOOR PALACES",
    title: "Aristocratic Grandeur,",
    highlight: "Absolute Discretion.",
    subtitle: "Single-residence-per-floor palatial mansions with 13-foot ceilings, biometric elevators, and immediate ready registry.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90",
    slug: "ats-knightsbridge",
    property: "ATS Knightsbridge · Sector 124",
    price: "₹6.10 Cr onwards",
    architect: "Hafeez Contractor"
  }
];

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Ultra Luxury' | 'Golf-Side' | 'Island Living' | 'Commercial'>('All');
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState("");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Search filter states
  const [searchLocation, setSearchLocation] = useState("All Locations");
  const [searchType, setSearchType] = useState("All Types");
  const [searchBudget, setSearchBudget] = useState("Any Budget");

  // Portfolio Matchmaker Interactive State
  const [matchmakerVision, setMatchmakerVision] = useState("Sky Penthouse");
  const [matchmakerBudget, setMatchmakerBudget] = useState("₹4 Cr – ₹7 Cr");
  const [matchmakerHorizon, setMatchmakerHorizon] = useState("Generational Residence");
  const [matchedProperty, setMatchedProperty] = useState<Property | null>(null);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('investinpro-wishlist-slugs') || '[]');
      // Client storage hydration intentionally updates state after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSavedSlugs(saved);
    } catch {
      setSavedSlugs([]);
    }
  }, []);

  // Slide Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Wishlist toggle
  const toggleSave = (slug: string) => {
    let updated: string[];
    if (savedSlugs.includes(slug)) {
      updated = savedSlugs.filter(s => s !== slug);
    } else {
      updated = [...savedSlugs, slug];
    }
    setSavedSlugs(updated);
    localStorage.setItem('investinpro-wishlist-slugs', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation !== "All Locations") params.set("location", searchLocation);
    if (searchType !== "All Types") params.set("category", searchType);
    if (searchBudget !== "Any Budget") params.set("budget", searchBudget);
    router.push(`/properties?${params.toString()}`);
  };

  // Run matchmaker calculation
  const handleMatchmaker = () => {
    let found: Property | undefined;
    if (matchmakerVision === "Sky Penthouse" || matchmakerBudget === "Above ₹7 Cr") {
      found = properties.find(p => p.slug === 'm3m-the-cullinan' || p.slug === 'ats-knightsbridge');
    } else if (matchmakerVision === "Golf Estate") {
      found = properties.find(p => p.slug === 'max-estate-128');
    } else if (matchmakerVision === "Island Living") {
      found = properties.find(p => p.slug === 'godrej-tropical-isle');
    } else {
      found = properties.find(p => p.type === 'Commercial' || p.slug === 'bhutani-cyberthum');
    }
    setMatchedProperty(found || properties[0]);
  };

  const filteredProperties = activeTab === 'All' 
    ? properties.slice(0, 6) 
    : properties.filter(p => p.category === activeTab).slice(0, 6);

  return (
    <main className="relative bg-[#040805] text-[#e5e9e6] selection:bg-[#c6a15b] selection:text-[#040805]">
      {/* 1. LIVE GOLD FINANCIAL TICKER BAR */}
      <div className="hidden md:block bg-[#07100b] border-b border-[#c6a15b]/25 overflow-hidden py-2 text-[10px] tracking-[0.25em] uppercase text-gray-300">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6a15b] animate-ping" />
            <strong className="text-[#dfc17b]">NOIDA EXPRESSWAY APPRECIATION:</strong> +14.8% YOY CAGR
          </span>
          <span className="text-[#c6a15b]">✦</span>
          <span><strong className="text-white">SECTOR 94 WATERFRONT AVERAGE:</strong> ₹22,500 / SQ.FT</span>
          <span className="text-[#c6a15b]">✦</span>
          <span><strong className="text-[#dfc17b]">JEWAR INTERNATIONAL AIRPORT:</strong> COMMERCIAL INAUGURAL 2026</span>
          <span className="text-[#c6a15b]">✦</span>
          <span><strong className="text-white">SECTOR 150 LOW-DENSITY BENCHMARK:</strong> 80% MANDATED GREEN COVER</span>
          <span className="text-[#c6a15b]">✦</span>
          <span><strong className="text-[#dfc17b]">COMMERCIAL GRADE-A YIELDS:</strong> 9.2% NET ANNUALIZED</span>
          <span className="text-[#c6a15b]">✦</span>
          <span><strong className="text-white">100% UP RERA VERIFIED:</strong> ZERO UNAPPROVED INVENTORY</span>
          <span className="text-[#c6a15b]">✦</span>
          <span><strong className="text-[#dfc17b]">VIP PRIVATE CHAUFFEUR TOUR:</strong> AVAILABLE COMPLIMENTARY</span>
        </div>
      </div>

      {/* 2. CINEMATIC SLIDING HERO */}
      <section 
        className="relative h-[86svh] min-h-[620px] md:h-[94vh] md:min-h-[720px] max-h-[1000px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Cinematic Slides */}
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Ken Burns Smooth Zoom */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[9000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                // Keep only the visible cinematic image in the initial paint.
                // This prevents all four high-resolution hero assets loading at once.
                style={isActive ? { backgroundImage: `url(${slide.image})` } : undefined}
              />
              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#040805] via-[#040805]/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040805] via-[#040805]/20 to-black/50" />
            </div>
          );
        })}

        {/* Hero Foreground Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Top Tag & Volume */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-cinzel text-xs text-[#c6a15b] tracking-[0.3em] font-semibold border-b border-[#c6a15b] pb-0.5">
                {heroSlides[currentSlide].volume}
              </span>
              <span className="text-gray-500 text-xs">/</span>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#e8d5b5] font-medium">
                {heroSlides[currentSlide].tag}
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white mb-5">
              {heroSlides[currentSlide].title} <br className="hidden sm:inline" />
              <em className="gold-text-gradient italic font-normal">
                {heroSlides[currentSlide].highlight}
              </em>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mb-8">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/properties/${heroSlides[currentSlide].slug}`}
                className="bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] hover:from-[#faebd7] hover:to-[#dfc17b] text-[#07100b] font-bold text-xs uppercase tracking-[0.18em] px-8 py-4 flex items-center gap-2.5 shadow-[0_8px_30px_rgba(198,161,91,0.35)] hover:shadow-[0_12px_40px_rgba(198,161,91,0.5)] hover:scale-[1.02] transition-all cursor-pointer rounded-[2px] group"
              >
                <span>Inspect Residence</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="bg-[#07100b]/85 hover:bg-[#0f2117] border border-[#c6a15b]/50 hover:border-[#dfc17b] text-white hover:text-[#dfc17b] px-7 py-4 text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-2.5 backdrop-blur-md transition-all cursor-pointer rounded-[2px]"
              >
                <Play size={14} className="fill-[#dfc17b] text-[#dfc17b]" />
                <span>Watch Cinematic Film</span>
              </button>
            </div>

            {/* Slide Property Stamp */}
            <div className="mt-10 pt-6 border-t border-[#c6a15b]/20 flex flex-wrap items-center gap-6 text-xs text-gray-400">
              <div>
                <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Featured Address</span>
                <strong className="text-white font-medium">{heroSlides[currentSlide].property}</strong>
              </div>
              <div className="hidden sm:block border-l border-white/10 pl-6">
                <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Architectural Design</span>
                <strong className="text-[#dfc17b] font-medium">{heroSlides[currentSlide].architect}</strong>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Starting Consideration</span>
                <strong className="text-white font-serif text-base">{heroSlides[currentSlide].price}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Roman Numeral Slide Controls */}
        <div className="absolute right-6 lg:right-12 bottom-12 z-30 flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4 text-xs font-cinzel">
            {["I", "II", "III", "IV"].map((num, i) => (
              <button
                key={num}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all tracking-widest cursor-pointer ${
                  i === currentSlide 
                    ? 'text-[#dfc17b] font-bold scale-125 border-b-2 border-[#c6a15b] pb-0.5' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="w-11 h-11 border border-[#c6a15b]/30 hover:border-[#c6a15b] bg-[#07100b]/80 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-[#dfc17b] transition-all cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
              className="w-11 h-11 border border-[#c6a15b]/30 hover:border-[#c6a15b] bg-[#07100b]/80 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-[#dfc17b] transition-all cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. PRIVATE CONCIERGE SEARCH DESK */}
      <section className="relative z-30 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form 
          onSubmit={handleSearchSubmit}
          className="premium-surface border-[#c6a15b]/35 p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 items-center"
        >
          {/* Location Selector */}
          <div className="border-b sm:border-b-0 sm:border-r border-[#c6a15b]/20 pb-3 sm:pb-0 sm:pr-4">
            <label className="block text-[10px] uppercase tracking-[0.22em] text-[#dfc17b] mb-1 font-semibold">
              Location / Micro-Market
            </label>
            <div className="relative">
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white font-medium focus:outline-none cursor-pointer appearance-none pr-6"
              >
                <option value="All Locations" className="bg-[#07100b]">All Prime Noida & NCR</option>
                <option value="Sector 94" className="bg-[#07100b]">Sector 94 (Delhi Border Waterfront)</option>
                <option value="Sector 128" className="bg-[#07100b]">Sector 128 (Golf Course Enclave)</option>
                <option value="Sector 146" className="bg-[#07100b]">Sector 146 (Island Theme Corridor)</option>
                <option value="Sector 150" className="bg-[#07100b]">Sector 150 (Sports City Greens)</option>
                <option value="Sector 140A" className="bg-[#07100b]">Sector 140A (Commercial Hub)</option>
                <option value="Jewar Corridor" className="bg-[#07100b]">Jewar Airport International Hub</option>
              </select>
              <ChevronDown size={14} className="absolute right-0 top-1 text-[#c6a15b] pointer-events-none" />
            </div>
          </div>

          {/* Property Category */}
          <div className="border-b sm:border-b-0 sm:border-r border-[#c6a15b]/20 pb-3 sm:pb-0 sm:pr-4">
            <label className="block text-[10px] uppercase tracking-[0.22em] text-[#dfc17b] mb-1 font-semibold">
              Asset Category
            </label>
            <div className="relative">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white font-medium focus:outline-none cursor-pointer appearance-none pr-6"
              >
                <option value="All Types" className="bg-[#07100b]">All Asset Classes</option>
                <option value="Ultra Luxury" className="bg-[#07100b]">Ultra Luxury Sky Mansions</option>
                <option value="Golf-Side" className="bg-[#07100b]">Championship Golf Estates</option>
                <option value="Island Living" className="bg-[#07100b]">Island & Lagoon Retreats</option>
                <option value="Commercial" className="bg-[#07100b]">Grade-A Commercial Offices</option>
                <option value="Penthouse" className="bg-[#07100b]">Sky Penthouses</option>
              </select>
              <ChevronDown size={14} className="absolute right-0 top-1 text-[#c6a15b] pointer-events-none" />
            </div>
          </div>

          {/* Budget Range */}
          <div className="border-b sm:border-b-0 lg:border-r border-[#c6a15b]/20 pb-3 sm:pb-0 sm:pr-4">
            <label className="block text-[10px] uppercase tracking-[0.22em] text-[#dfc17b] mb-1 font-semibold">
              Capital Bracket
            </label>
            <div className="relative">
              <select
                value={searchBudget}
                onChange={(e) => setSearchBudget(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white font-medium focus:outline-none cursor-pointer appearance-none pr-6"
              >
                <option value="Any Budget" className="bg-[#07100b]">Any Consideration</option>
                <option value="under-2cr" className="bg-[#07100b]">Under ₹2.00 Cr</option>
                <option value="2-4cr" className="bg-[#07100b]">₹2.00 Cr – ₹4.00 Cr</option>
                <option value="4-7cr" className="bg-[#07100b]">₹4.00 Cr – ₹7.00 Cr</option>
                <option value="above-7cr" className="bg-[#07100b]">₹7.00 Cr+ (Trophy Estates)</option>
              </select>
              <ChevronDown size={14} className="absolute right-0 top-1 text-[#c6a15b] pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] hover:from-[#faebd7] hover:to-[#dfc17b] text-[#07100b] font-bold text-xs uppercase tracking-[0.16em] py-3.5 px-4 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(198,161,91,0.3)] hover:scale-[1.01] transition-all rounded-[2px] cursor-pointer"
            >
              <Search size={15} />
              <span>Search Private Portfolio</span>
            </button>
          </div>
        </form>
      </section>

      {/* 4. THE ROYAL CHAUFFEUR SERVICE HIGHLIGHT */}
      <section className="py-12 sm:py-16 border-b border-[#c6a15b]/20 bg-gradient-to-b from-[#07100b] to-[#040805]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="premium-surface grid grid-cols-1 lg:grid-cols-12 gap-7 items-center p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl rounded-[4px] border border-[#c6a15b]/35">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c6a15b] font-cinzel">
                <Car size={16} />
                <span>Compliments of InvestInPro Private Client Group</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                Arrive in Distinction. <br />
                <em className="gold-text-gradient italic font-normal">Chauffeur-Driven Site Inspection.</em>
              </h2>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl font-light">
                We respect your time and privacy. Experience Noida’s most exclusive addresses from the luxury of a private Mercedes-Maybach or BMW 7-Series, accompanied by our Senior Portfolio Director.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#c6a15b]" />
                  <span>Doorstep / Airport Pickup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#c6a15b]" />
                  <span>Direct Developer Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#c6a15b]" />
                  <span>Confidential Briefing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedPropertyForModal("Royal Chauffeur Inspection Tour");
                  setModalOpen(true);
                }}
                className="bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] hover:from-[#faebd7] hover:to-[#dfc17b] text-[#07100b] font-bold text-xs uppercase tracking-[0.16em] px-8 py-4 shadow-[0_6px_25px_rgba(198,161,91,0.35)] hover:shadow-[0_8px_30px_rgba(198,161,91,0.5)] hover:scale-[1.02] transition-all rounded-[2px] cursor-pointer"
              >
                Reserve Chauffeur Tour ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE INVESTINPRO CURATED COLLECTION */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={15} className="text-[#c6a15b]" />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#c6a15b] font-medium font-cinzel">
                Volume XXIV · Title-Cleared Opportunities
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Curated <em>residences.</em>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Ultra Luxury', 'Golf-Side', 'Island Living', 'Commercial'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-all cursor-pointer border ${
                  activeTab === tab
                    ? 'bg-[#c6a15b] text-[#040805] border-[#c6a15b] font-bold'
                    : 'bg-[#07100b] text-gray-300 border-white/10 hover:border-[#c6a15b]/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop, idx) => {
            const isSaved = savedSlugs.includes(prop.slug);
            return (
              <article
                key={prop.slug}
                className="luxury-card flex flex-col justify-between overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-72 w-full overflow-hidden bg-[#07100b]">
                  <img
                    src={prop.image}
                    alt={prop.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 bg-[#040805]/90 border border-[#c6a15b]/40 text-[#c6a15b] px-3 py-1 text-[9px] uppercase tracking-widest font-bold font-cinzel backdrop-blur-md">
                    No. 0{idx + 1} · {prop.category}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleSave(prop.slug)}
                    className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      isSaved ? 'bg-[#c6a15b] text-[#040805]' : 'bg-black/60 text-white hover:text-[#c6a15b]'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart size={15} className={isSaved ? "fill-current" : ""} />
                  </button>

                  {/* Price Banner */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#040805] via-[#040805]/85 to-transparent p-4 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase tracking-widest block">Consideration</span>
                      <strong className="font-serif text-2xl text-white font-normal">{prop.price}</strong>
                    </div>
                    <span className="text-xs text-[#dfc17b] font-medium tracking-wide">
                      {prop.usdPrice}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#c6a15b] mb-1 font-medium">
                      <MapPin size={13} />
                      <span>{prop.location}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-[#dfc17b] transition-colors mb-2">
                      <Link href={`/properties/${prop.slug}`}>
                        {prop.name}
                      </Link>
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      {prop.overview}
                    </p>

                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#c6a15b]/20 text-xs text-gray-300 mb-4">
                      <div>
                        <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Specs</span>
                        <span className="font-medium text-white">{prop.configuration}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Carpet Area</span>
                        <span className="font-medium text-white">{prop.area}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href={`/properties/${prop.slug}`}
                      className="flex-1 bg-white/5 hover:bg-[#c6a15b] hover:text-[#040805] border border-white/15 hover:border-[#c6a15b] py-2.5 text-center text-xs uppercase tracking-widest font-bold transition-all"
                    >
                      Inspect Details ↗
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedPropertyForModal(`${prop.name} (${prop.location})`);
                        setModalOpen(true);
                      }}
                      className="p-2.5 border border-white/15 hover:border-[#c6a15b] hover:text-[#c6a15b] text-gray-300 transition-colors"
                      title="Schedule Private Presentation"
                    >
                      <PhoneCall size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/properties"
            className="gold-btn-luxury inline-flex items-center gap-3 px-10 py-4 text-xs uppercase tracking-[0.22em] shadow-2xl"
          >
            <span>Explore Entire Collection (12 Properties)</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* 5.5 PRIVATE OFF-MARKET VAULT (THE BLACK BOOK TEASER) */}
      <section className="relative py-20 bg-gradient-to-b from-[#040805] via-[#07100b] to-[#040805] border-y border-[#c6a15b]/30 overflow-hidden">
        {/* Background Subtle Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
          <span className="font-cinzel text-[16vw] font-bold text-[#dfc17b] select-none tracking-widest">
            VAULT
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#c6a15b]/40 bg-[#060c08]/90 p-8 sm:p-12 lg:p-16 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative">
            {/* Top Gold Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#dfc17b]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#dfc17b]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#dfc17b]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#dfc17b]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Information */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c6a15b]/15 border border-[#c6a15b]/40 text-[#dfc17b] text-[10px] uppercase tracking-[0.25em] font-cinzel font-semibold">
                  <Lock size={12} />
                  <span>Confidential Advisory Desk</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                  The Private Vault: <br />
                  <span className="text-[#dfc17b] italic font-serif">The Black Book (₹20 Cr – ₹70 Cr)</span>
                </h2>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Public portals disclose only a fraction of the finest properties. InvestInPro Noida maintains a strictly confidential ledger of trophy penthouses, golf fairway estates, and Jewar airport institutional land parcels under strict Non-Disclosure Agreements.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="border border-white/10 bg-[#040805]/60 p-3.5">
                    <span className="text-[#c6a15b] font-cinzel text-lg font-bold block">4 Active</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-0.5">Trophy Assets</span>
                  </div>
                  <div className="border border-white/10 bg-[#040805]/60 p-3.5">
                    <span className="text-[#c6a15b] font-cinzel text-lg font-bold block">100% NDA</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-0.5">Protected Ledger</span>
                  </div>
                  <div className="border border-white/10 bg-[#040805]/60 p-3.5">
                    <span className="text-[#c6a15b] font-cinzel text-lg font-bold block">Direct</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-0.5">Promoter Access</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Passcode / Keycard Access Box */}
              <div className="lg:col-span-5 bg-[#0a1610] border border-[#c6a15b]/50 p-6 sm:p-8 space-y-5 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#c6a15b]/15 border border-[#c6a15b] flex items-center justify-center text-[#dfc17b]">
                  <Key size={24} />
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                    Enter Passcode Or Claim VIP Key
                  </h3>
                  <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                    Accredited buyers, family offices, and corporate leaders can unlock the off-market catalogue immediately.
                  </p>
                </div>

                <div className="p-3 bg-[#040805] border border-white/15 text-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Passcode Format</span>
                  <code className="text-[#dfc17b] tracking-[0.3em] font-mono text-sm font-bold">VAULT••••</code>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/vault"
                    className="gold-btn-luxury w-full py-4 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Lock size={14} />
                    <span>Enter The Private Vault ↗</span>
                  </Link>

                  <p className="text-[10px] text-gray-500">
                    Complimentary VIP key generated instantly for verified patrons.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BESPOKE PORTFOLIO MATCHMAKER (INTERACTIVE QUIZ) */}
      <section className="py-16 sm:py-20 bg-[#07100b] border-t border-b border-[#c6a15b]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c6a15b] font-cinzel font-semibold mb-2">
              Private Client Advisory Tool
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-white">
              Bespoke Portfolio <em>Matchmaker</em>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
              Answer 3 brief questions to receive an instant, algorithmic recommendation curated exclusively for your acquisition parameters.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#0a1811] via-[#07120c] to-[#040805] border border-[#c6a15b]/40 p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] space-y-8 rounded-[4px] relative overflow-hidden">
            {/* Top gold hairline */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfc17b] to-transparent" />

            {/* Step 1: Vision */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-[0.22em] text-[#dfc17b] font-cinzel font-semibold">
                  1. Architectural Vision & Typology
                </label>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Select One</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {[
                  { id: "Sky Penthouse", title: "Sky Penthouse", sub: "Duplexes & Triplexes with private plunge pools", icon: "🏰" },
                  { id: "Golf Estate", title: "Golf Estate", sub: "Unbroken 18-hole championship fairway views", icon: "⛳" },
                  { id: "Island Living", title: "Island Living", sub: "Resort-style white sand lagoons & private skybridges", icon: "🌴" },
                  { id: "Pre-Leased Commercial", title: "Corporate Suite", sub: "Grade-A lockable offices with 9%+ net yields", icon: "🏢" }
                ].map((v) => {
                  const isSelected = matchmakerVision === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setMatchmakerVision(v.id)}
                      className={`p-4 border text-left transition-all cursor-pointer rounded-[3px] flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#122a1d] to-[#08150f] border-[#dfc17b] text-white shadow-[0_0_25px_rgba(198,161,91,0.25)] scale-[1.02]'
                          : 'bg-[#040805]/70 border-white/10 text-gray-300 hover:border-[#c6a15b]/40 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{v.icon}</span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#dfc17b] shadow-[0_0_8px_#dfc17b]" />
                        )}
                      </div>
                      <div>
                        <strong className="text-sm font-serif text-white block mb-0.5">{v.title}</strong>
                        <p className="text-[10px] text-gray-400 leading-tight font-light">{v.sub}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Budget */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-[0.22em] text-[#dfc17b] font-cinzel font-semibold">
                  2. Consideration Allocation Bracket
                </label>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Indicative Budget</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { id: "Under ₹2 Cr", label: "Under ₹2.00 Cr", tier: "Entry Allocation" },
                  { id: "₹2 Cr – ₹4 Cr", label: "₹2.00 Cr – ₹4.00 Cr", tier: "Prime Residential" },
                  { id: "₹4 Cr – ₹7 Cr", label: "₹4.00 Cr – ₹7.00 Cr", tier: "Ultra-Luxury" },
                  { id: "Above ₹7 Cr", label: "Above ₹7.00 Cr", tier: "Trophy Sky Estate" }
                ].map((b) => {
                  const isSelected = matchmakerBudget === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setMatchmakerBudget(b.id)}
                      className={`p-3.5 border text-center transition-all cursor-pointer rounded-[3px] ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#122a1d] to-[#08150f] border-[#dfc17b] text-[#faebd7] font-semibold shadow-[0_0_20px_rgba(198,161,91,0.25)]'
                          : 'bg-[#040805]/70 border-white/10 text-gray-300 hover:border-[#c6a15b]/40 hover:bg-white/[0.02]'
                      }`}
                    >
                      <strong className="text-xs text-white block font-sans">{b.label}</strong>
                      <span className="text-[9.5px] text-gray-400 block mt-0.5">{b.tier}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Primary Objective */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-[0.22em] text-[#dfc17b] font-cinzel font-semibold">
                  3. Primary Investment Objective
                </label>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Wealth Strategy</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { id: "Generational Residence", title: "Generational Residence", sub: "Family lifestyle & privacy preservation" },
                  { id: "Maximum Rental Yield (9%+)", title: "Immediate Rental Yield", sub: "Institutional lease locks with corporate tenants" },
                  { id: "5-Yr Capital Growth Multiplier", title: "Capital Growth Multiplier", sub: "Jewar Airport & corridor infrastructure catalyst" }
                ].map((h) => {
                  const isSelected = matchmakerHorizon === h.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setMatchmakerHorizon(h.id)}
                      className={`p-4 border text-left transition-all cursor-pointer rounded-[3px] ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#122a1d] to-[#08150f] border-[#dfc17b] text-white shadow-[0_0_20px_rgba(198,161,91,0.25)]'
                          : 'bg-[#040805]/70 border-white/10 text-gray-300 hover:border-[#c6a15b]/40 hover:bg-white/[0.02]'
                      }`}
                    >
                      <strong className="text-xs text-white block mb-0.5">{h.title}</strong>
                      <p className="text-[10px] text-gray-400 leading-tight font-light">{h.sub}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculation Trigger */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleMatchmaker}
                className="bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] hover:from-[#faebd7] hover:to-[#dfc17b] text-[#07100b] font-bold text-xs uppercase tracking-[0.2em] px-10 py-4 shadow-[0_6px_25px_rgba(198,161,91,0.35)] hover:shadow-[0_8px_30px_rgba(198,161,91,0.5)] hover:scale-[1.02] transition-all cursor-pointer rounded-[2px]"
              >
                Calculate Ideal Match ↗
              </button>
            </div>

            {/* Curated Result Card */}
            {matchedProperty && (
              <div className="mt-8 p-6 sm:p-8 bg-[#040805] border border-[#c6a15b]/60 rounded-[4px] animate-fadeIn flex flex-col md:flex-row items-center gap-6 shadow-[0_15px_45px_rgba(0,0,0,0.8)] relative">
                <div className="relative w-full md:w-56 h-36 shrink-0 overflow-hidden border border-white/10 rounded-[2px]">
                  <img
                    src={matchedProperty.image}
                    alt={matchedProperty.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#040805]/90 border border-[#c6a15b]/50 text-[#dfc17b] px-2 py-0.5 text-[8.5px] uppercase font-cinzel font-bold">
                    98.4% Match
                  </span>
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-[#c6a15b] uppercase tracking-widest font-semibold">
                      Algorithmic Private Match
                    </span>
                    <span className="text-[10px] text-gray-500">• Sector {matchedProperty.sector}</span>
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-white">{matchedProperty.name}</h4>
                  <p className="text-xs text-[#dfc17b] font-serif font-semibold mt-0.5">
                    {matchedProperty.price} · {matchedProperty.configuration}
                  </p>
                  <p className="text-xs text-gray-300 mt-2 line-clamp-2 font-light leading-relaxed">
                    {matchedProperty.overview}
                  </p>
                </div>

                <Link
                  href={`/properties/${matchedProperty.slug}`}
                  className="bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] text-[#07100b] font-bold px-6 py-3 text-xs uppercase tracking-wider shrink-0 rounded-[2px] shadow-md hover:scale-[1.02] transition-transform"
                >
                  View Residence ↗
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. NOIDA CORRIDORS SHOWCASE */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#c6a15b] font-cinzel font-medium mb-2">
              Macroeconomic Geography
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-white">
              Noida’s Defining <em>Growth Corridors</em>
            </h2>
          </div>
          <Link
            href="/locations"
            className="text-xs uppercase tracking-widest text-[#dfc17b] hover:text-white border-b border-[#c6a15b] pb-1 w-fit"
          >
            Explore All 5 Corridors ↗
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.slice(0, 3).map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group relative h-[420px] overflow-hidden border border-white/15 hover:border-[#c6a15b] transition-all flex flex-col justify-end p-7 shadow-xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${loc.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040805] via-[#040805]/75 to-transparent" />

              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#c6a15b] font-bold font-cinzel block mb-1">
                  {loc.opportunities}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-[#dfc17b] transition-colors mb-2">
                  {loc.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 mb-4 leading-relaxed font-light">
                  {loc.tagline}
                </p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-white/20 text-gray-300">
                  <span>CAGR: <strong className="text-white">{loc.appreciation}</strong></span>
                  <span className="text-[#dfc17b] font-medium flex items-center gap-1">
                    Whitepaper <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. CLIENT CONFIDENCE & TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-[#07100b] border-t border-[#c6a15b]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c6a15b] font-cinzel font-semibold mb-2">
              Fiduciary Trust
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-white">
              Voices of <em>Distinction</em>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-3">
              Representing prominent founders, private family offices, and NRI executives across Dubai, London, and Singapore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-[#0a1610] border border-white/10 hover:border-[#c6a15b]/40 p-6 flex flex-col justify-between transition-colors shadow-lg"
              >
                <div>
                  <div className="flex text-[#c6a15b] text-sm gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic mb-6 font-light">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover border border-[#c6a15b]"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white">{t.name}</h4>
                    <p className="text-[10px] text-gray-400">{t.role}</p>
                    <span className="text-[9px] text-[#dfc17b] block mt-0.5">
                      {t.propertyPurchased}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. VIDEO PREVIEW MODAL */}
      {videoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn"
          onClick={() => setVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#07100b] border border-[#c6a15b] p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
            >
              <X size={22} />
            </button>
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#c6a15b] font-cinzel">Cinematic Showcase</span>
              <h3 className="font-serif text-2xl text-white">Noida Ultra-Luxury Architectural Portfolio</h3>
            </div>
            <div className="relative aspect-video w-full bg-black overflow-hidden border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90"
                alt="Video Preview"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#c6a15b] flex items-center justify-center text-[#040805] shadow-[0_0_30px_rgba(198,161,91,0.6)] mb-3 cursor-pointer hover:scale-110 transition-transform">
                  <Play size={24} className="fill-[#040805] ml-1" />
                </div>
                <p className="text-sm font-serif text-white">Private Drone Aerial & Penthouse Walkthrough</p>
                <p className="text-xs text-gray-400 mt-1 max-w-sm">
                  Full 4K presentation is screened exclusively in our Sector 18 private lounge.
                </p>
                <button
                  onClick={() => {
                    setVideoModalOpen(false);
                    setModalOpen(true);
                  }}
                  className="mt-4 gold-btn-luxury px-6 py-2.5 text-xs cursor-pointer"
                >
                  Book Private Screening Room ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty={selectedPropertyForModal}
      />
    </main>
  );
}
