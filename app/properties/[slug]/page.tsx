"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Download, 
  CheckCircle2, 
  ArrowUpRight, 
  Calculator, 
  Phone, 
  Sparkles,
  Waves,
  Plane,
  Trophy,
  Zap,
  Eye,
  Book,
  Activity,
  UserCheck,
  Wine,
  ShoppingBag,
  Briefcase,
  Compass,
  FileText,
  Printer,
  Sun,
  Wind,
  MessageSquare
} from "lucide-react";
import { properties, Property } from "../../../data/properties";
import ConsultationModal from "../../../components/ConsultationModal";
import ExecutiveDossierModal from "../../../components/ExecutiveDossierModal";
import WhatsAppBrochureModal from "../../../components/WhatsAppBrochureModal";

// Helper for dynamic amenity icon
const renderAmenityIcon = (iconName: string) => {
  switch (iconName) {
    case 'Waves': return <Waves size={18} className="text-[#c6a15b]" />;
    case 'Plane': return <Plane size={18} className="text-[#c6a15b]" />;
    case 'Trophy': return <Trophy size={18} className="text-[#c6a15b]" />;
    case 'Zap': return <Zap size={18} className="text-[#c6a15b]" />;
    case 'Eye': return <Eye size={18} className="text-[#c6a15b]" />;
    case 'Book': return <Book size={18} className="text-[#c6a15b]" />;
    case 'Activity': return <Activity size={18} className="text-[#c6a15b]" />;
    case 'UserCheck': return <UserCheck size={18} className="text-[#c6a15b]" />;
    case 'Wine': return <Wine size={18} className="text-[#c6a15b]" />;
    case 'ShoppingBag': return <ShoppingBag size={18} className="text-[#c6a15b]" />;
    case 'Briefcase': return <Briefcase size={18} className="text-[#c6a15b]" />;
    default: return <Sparkles size={18} className="text-[#c6a15b]" />;
  }
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [currentProperty, setCurrentProperty] = useState<Property>(() => {
    return properties.find((p) => p.slug === slug) || properties[0];
  });

  const property = currentProperty;

  const [activeImage, setActiveImage] = useState(property.image);
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  // Dynamic admin properties loader
  useEffect(() => {
    try {
      const customProps: Property[] = JSON.parse(localStorage.getItem('investinpro_custom_properties') || '[]');
      const combined = [...customProps, ...properties];
      const found = combined.find((p) => p.slug === slug);
      if (found) {
        // Client storage hydration intentionally updates state after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentProperty(found);
        setActiveImage(found.image);
      } else {
        router.replace('/properties');
      }
    } catch {
      router.replace('/properties');
    }
  }, [router, slug]);

  // Dynamic EMI calculation state based on property price
  const [loanPercent, setLoanPercent] = useState(80);
  const [loanTenure, setLoanTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('investinpro-wishlist-slugs') || '[]');
      // Client storage hydration intentionally updates state after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSaved(saved.includes(property.slug));
    } catch {
      setIsSaved(false);
    }
    setActiveImage(property.image);
  }, [property.slug, property.image]);

  const toggleSave = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('investinpro-wishlist-slugs') || '[]');
      let updated: string[];
      if (saved.includes(property.slug)) {
        updated = saved.filter((s: string) => s !== property.slug);
        setIsSaved(false);
      } else {
        updated = [...saved, property.slug];
        setIsSaved(true);
      }
      localStorage.setItem('investinpro-wishlist-slugs', JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch {
      // fallback
    }
  };

  // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emiCalculation = useMemo(() => {
    const principal = (property.priceNum * loanPercent) / 100;
    const monthlyRate = interestRate / 1200;
    const totalMonths = loanTenure * 12;
    const emi = Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    return {
      principal,
      emi,
      totalInterest,
      totalPayment
    };
  }, [property.priceNum, loanPercent, loanTenure, interestRate]);

  const similarProperties = properties
    .filter((p) => p.slug !== property.slug && (p.category === property.category || p.sector === property.sector))
    .slice(0, 3);

  const handleDownloadBrochure = () => {
    setBrochureDownloaded(true);
    setTimeout(() => setBrochureDownloaded(false), 4000);
  };

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Top Breadcrumb & Actions */}
      <div className="border-b border-white/10 bg-[#08130d] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/properties" className="hover:text-[#c6a15b] flex items-center gap-1">
              <ArrowLeft size={13} /> Back to Collection
            </Link>
            <span>/</span>
            <span className="text-[#c6a15b]">{property.location}</span>
            <span>/</span>
            <span className="text-white font-medium">{property.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSave}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-[#c6a15b] text-[#060d09] border-[#c6a15b] font-semibold' 
                  : 'border-white/20 hover:border-[#c6a15b] text-gray-300'
              }`}
            >
              <Heart size={14} className={isSaved ? "fill-current" : ""} />
              <span>{isSaved ? 'Saved in Wishlist' : 'Save Property'}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Property link copied to clipboard!");
                }
              }}
              className="p-1.5 border border-white/20 hover:border-[#c6a15b] text-gray-300 hover:text-white transition-colors"
              title="Copy Link"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-widest font-semibold mb-2">
              <ShieldCheck size={16} />
              <span>{property.developer} · UP RERA: {property.rera}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal">
              {property.name}
            </h1>
            <p className="text-gray-400 text-sm flex items-center gap-1.5 mt-2">
              <MapPin size={15} className="text-[#c6a15b]" />
              <span>{property.location}</span>
            </p>
          </div>

          <div className="lg:text-right">
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 block mb-1">
              Starting Consideration
            </span>
            <strong className="font-serif text-3xl sm:text-4xl text-[#c6a15b] font-normal block">
              {property.price}
            </strong>
            <span className="text-xs text-gray-400">
              Approx. {property.usdPrice} · Indicative Net Yield: {property.roi}
            </span>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="mt-8 space-y-4">
          <div className="relative h-[420px] sm:h-[560px] w-full overflow-hidden bg-[#0c1811] border border-white/15">
            <img
              src={activeImage}
              alt={property.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 text-xs text-[#c6a15b] border border-[#c6a15b]/30 uppercase tracking-widest">
              {property.category}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {property.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`relative w-28 h-20 shrink-0 border-2 overflow-hidden transition-all cursor-pointer ${
                  activeImage === img ? 'border-[#c6a15b] scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Gallery thumbnail ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#0c1811] border border-white/10 text-xs">
          <div>
            <span className="text-gray-400 uppercase tracking-wider block mb-1">Configuration</span>
            <strong className="text-white text-sm sm:text-base font-semibold">{property.configuration}</strong>
          </div>
          <div>
            <span className="text-gray-400 uppercase tracking-wider block mb-1">Carpet / Super Area</span>
            <strong className="text-white text-sm sm:text-base font-semibold">{property.area}</strong>
          </div>
          <div>
            <span className="text-gray-400 uppercase tracking-wider block mb-1">Possession Milestone</span>
            <strong className="text-white text-sm sm:text-base font-semibold">{property.possession}</strong>
          </div>
          <div>
            <span className="text-gray-400 uppercase tracking-wider block mb-1">Investment Horizon</span>
            <strong className="text-[#c6a15b] text-sm sm:text-base font-semibold">{property.investment}</strong>
          </div>
        </div>

        {/* Main Grid: Details + Sticky Advisory Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left 2 Columns: Overview, Highlights, Floor Plans, Amenities, Calculator */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white mb-4">
                Architecture & <em>Vision</em>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {property.overview}
              </p>

              {/* Highlights Bullet points */}
              <div className="mt-6 space-y-2.5">
                {property.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-[#c6a15b] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Floor Plans */}
            <div className="border-t border-[#c6a15b]/20 pt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#c6a15b] font-cinzel font-semibold mb-1">
                    <Sparkles size={13} />
                    <span>Architectural Engineering & Spatial Ratios</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white">
                    Floor Plans & <em>Specifications</em>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Select a unit layout to inspect carpet dimensions, super built-up ratio, and orientation.</p>
                </div>

                {/* Elegant Luxury Layout Pill Tabs */}
                <div className="flex flex-wrap gap-2 p-1 bg-[#040805] border border-[#c6a15b]/30 rounded-[3px]">
                  {property.floorPlans.map((plan, i) => (
                    <button
                      key={plan.title}
                      onClick={() => setActivePlanIndex(i)}
                      className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer rounded-[2px] ${
                        activePlanIndex === i
                          ? 'bg-gradient-to-r from-[#dfc17b] to-[#c6a15b] text-[#07100b] shadow-[0_2px_15px_rgba(198,161,91,0.35)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {plan.title.split(' ')[0]} {plan.title.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Plan Details Card - Bespoke Architectural Showcase */}
              {property.floorPlans[activePlanIndex] && (
                <div className="bg-gradient-to-b from-[#09150e] to-[#050b07] border border-[#c6a15b]/40 p-6 sm:p-8 rounded-[4px] shadow-2xl relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/10 pb-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 bg-[#c6a15b]/20 text-[#dfc17b] border border-[#c6a15b]/30 font-cinzel font-bold">
                          Official Master Layout
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">
                          • 100% UP RERA Filed
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white">
                        {property.floorPlans[activePlanIndex].title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 font-light">
                        {property.floorPlans[activePlanIndex].specs}
                      </p>
                    </div>

                    <div className="sm:text-right bg-white/[0.02] sm:bg-transparent p-3 sm:p-0 border sm:border-0 border-white/10">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Indicative Tranche Price</span>
                      <strong className="font-serif text-3xl text-[#dfc17b] block">
                        {property.floorPlans[activePlanIndex].price}
                      </strong>
                      <span className="text-[10px] text-gray-500 block mt-0.5">Exclusive of Government Taxes</span>
                    </div>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-[#040805]/80 border border-white/10 p-4 rounded-[2px]">
                      <span className="text-gray-400 text-[9.5px] uppercase tracking-wider block mb-1">Super Area</span>
                      <strong className="font-serif text-lg text-white block">{property.floorPlans[activePlanIndex].size}</strong>
                      <span className="text-[10px] text-gray-500">Gross Built-Up Envelope</span>
                    </div>

                    <div className="bg-[#040805]/80 border border-white/10 p-4 rounded-[2px]">
                      <span className="text-gray-400 text-[9.5px] uppercase tracking-wider block mb-1">Carpet Area</span>
                      <strong className="font-serif text-lg text-[#dfc17b] block">{property.floorPlans[activePlanIndex].carpetArea}</strong>
                      <span className="text-[10px] text-emerald-400/90">~78% Usable Ratio</span>
                    </div>

                    <div className="bg-[#040805]/80 border border-white/10 p-4 rounded-[2px]">
                      <span className="text-gray-400 text-[9.5px] uppercase tracking-wider block mb-1">Deck Orientation</span>
                      <strong className="font-serif text-lg text-white block">River / Green</strong>
                      <span className="text-[10px] text-gray-500">180° Unobstructed Vistas</span>
                    </div>

                    <div className="bg-[#040805]/80 border border-white/10 p-4 rounded-[2px]">
                      <span className="text-gray-400 text-[9.5px] uppercase tracking-wider block mb-1">Floor Height</span>
                      <strong className="font-serif text-lg text-white block">11.5 – 13 Ft</strong>
                      <span className="text-[10px] text-gray-500">Palatial Ceiling Clears</span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#c6a15b]" />
                      <span>Customizable interior partition options available for family suites.</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setWhatsappModalOpen(true)}
                      className="text-[#dfc17b] hover:text-white flex items-center gap-1.5 font-medium tracking-wide hover:underline cursor-pointer shrink-0"
                    >
                      <Download size={13} />
                      <span>Request High-Res Blueprint PDF ↗</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* VASTU & SOLAR ORIENTATION COMPASS ANALYSIS */}
            <div className="border-t border-white/10 pt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs text-[#c6a15b] font-cinzel font-semibold mb-1">
                    <Compass size={14} />
                    <span>Ancient Principles · Modern Architecture</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white">
                    Vastu & Solar <em>Orientation Audit</em>
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-[#0a1610] border border-[#c6a15b]/40 px-3 py-1.5">
                  <span className="text-xs text-gray-400">Vastu Score:</span>
                  <strong className="text-sm font-serif text-[#dfc17b]">98.4% Harmonized</strong>
                </div>
              </div>

              <div className="bg-[#08120c] border border-[#c6a15b]/30 p-6 sm:p-8 space-y-6">
                {/* 4 Cardinal Zones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#040805] border border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[#dfc17b] font-cinzel font-bold text-xs">North-East (Ishanya)</span>
                      <span className="text-[10px] text-[#25D366] bg-[#25D366]/15 px-2 py-0.5 font-semibold">100% Auspicious</span>
                    </div>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      Grand entrance foyer & spiritual sanctuary placement, capturing unobstructed early morning cosmic energies and positive prana.
                    </p>
                  </div>

                  <div className="p-4 bg-[#040805] border border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[#dfc17b] font-cinzel font-bold text-xs">South-West (Nairutya)</span>
                      <span className="text-[10px] text-[#25D366] bg-[#25D366]/15 px-2 py-0.5 font-semibold">Optimal Stability</span>
                    </div>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      Master Presidential Suite positioned in the heavy Earth quadrant, fostering emotional stability, sound sleep, and wealth preservation.
                    </p>
                  </div>

                  <div className="p-4 bg-[#040805] border border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[#dfc17b] font-cinzel font-bold text-xs">South-East (Agni)</span>
                      <span className="text-[10px] text-[#25D366] bg-[#25D366]/15 px-2 py-0.5 font-semibold">Pure Fire Element</span>
                    </div>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      Bespoke gourmet chef kitchen aligned with the pure Agni zone, promoting metabolic health and culinary vibrancy.
                    </p>
                  </div>

                  <div className="p-4 bg-[#040805] border border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[#dfc17b] font-cinzel font-bold text-xs">North-West (Vayu)</span>
                      <span className="text-[10px] text-[#25D366] bg-[#25D366]/15 px-2 py-0.5 font-semibold">Continuous Airflow</span>
                    </div>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      Guest suites and wraparound sky balconies arranged for cross-ventilation and fluid atmospheric circulation.
                    </p>
                  </div>
                </div>

                {/* Solar & Wind Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs text-gray-300">
                  <div className="flex items-center gap-3 p-3 bg-[#0a1610]">
                    <Sun size={18} className="text-[#c6a15b] shrink-0" />
                    <div>
                      <strong className="text-white block text-xs">8.5+ Hours Natural Daylight</strong>
                      <span className="text-[10px] text-gray-400">Zero dark corridors; optimal winter sunlight penetration.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#0a1610]">
                    <Wind size={18} className="text-[#c6a15b] shrink-0" />
                    <div>
                      <strong className="text-white block text-xs">Dual-Aspect Cross Ventilation</strong>
                      <span className="text-[10px] text-gray-400">Natural thermal cooling reduces annual HVAC energy load by 24%.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Curated Luxury Amenities */}
            <div className="border-t border-white/10 pt-10">
              <h2 className="font-serif text-2xl sm:text-3xl text-white mb-2">
                Curated <em>Amenities</em>
              </h2>
              <p className="text-xs text-gray-400 mb-6">Designed to international hospitality standards.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-[#0c1811] border border-white/10 hover:border-[#c6a15b]/40 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#c6a15b]/15 border border-[#c6a15b]/30 flex items-center justify-center shrink-0">
                      {renderAmenityIcon(amenity.icon)}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{amenity.name}</h4>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{amenity.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Built-in Dynamic Mortgage EMI Calculator */}
            <div className="border-t border-white/10 pt-10">
              <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-widest font-semibold mb-2">
                <Calculator size={16} />
                <span>Financial Modeling</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white mb-2">
                Dynamic EMI <em>Forecaster</em>
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Calculated in real-time for {property.name} consideration of {property.price}.
              </p>

              <div className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(120deg,rgba(255,255,255,0.025),transparent_55%)] py-7 sm:py-9 grid grid-cols-1 md:grid-cols-[1.15fr_.85fr] gap-10 items-center">
                {/* Sliders */}
                <div className="space-y-7 px-1 sm:px-5">
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-400">Loan financing · {loanPercent}%</span>
                      <strong className="text-white">₹{(emiCalculation.principal / 10000000).toFixed(2)} Cr</strong>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="90"
                      step="5"
                      value={loanPercent}
                      onChange={(e) => setLoanPercent(+e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-400">Interest rate · {interestRate}%</span>
                      <strong className="text-white">{interestRate}% p.a.</strong>
                    </div>
                    <input
                      type="range"
                      min="7.0"
                      max="12.0"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(+e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-400">Loan tenure · {loanTenure} years</span>
                      <strong className="text-white">{loanTenure} Years ({loanTenure * 12} Mos)</strong>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(+e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Calculation Outputs */}
                <div className="relative mx-1 overflow-hidden border border-[#c6a15b]/25 bg-[radial-gradient(circle_at_50%_0%,rgba(198,161,91,0.13),transparent_52%),rgba(255,255,255,0.025)] p-7 text-center sm:mx-0 sm:p-9">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c6a15b] font-semibold block mb-1">
                    Estimated Monthly EMI
                  </span>
                  <strong className="font-serif text-4xl sm:text-5xl text-white font-normal block my-3 tracking-tight">
                    ₹{emiCalculation.emi.toLocaleString('en-IN')}
                  </strong>
                  <span className="text-xs text-gray-400 block mb-4">per month</span>

                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10 text-left text-xs">
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Down Payment</span>
                      <span className="font-semibold text-white">
                        ₹{((property.priceNum * (100 - loanPercent)) / 10000000).toFixed(2)} Cr
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Total Interest</span>
                      <span className="font-semibold text-[#c6a15b]">
                        ₹{(emiCalculation.totalInterest / 10000000).toFixed(2)} Cr
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connectivity & Travel Times */}
            <div className="border-t border-white/10 pt-10">
              <h2 className="font-serif text-2xl sm:text-3xl text-white mb-2">
                Connectivity & <em>Infrastructure</em>
              </h2>
              <p className="text-xs text-gray-400 mb-6">Drive times and transit hubs from {property.name}.</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {property.connectivity.map((c, i) => (
                  <div key={i} className="bg-[#0c1811] p-4 border border-white/10">
                    <span className="text-[#c6a15b] font-serif text-2xl font-normal block mb-1">
                      {c.time}
                    </span>
                    <span className="text-gray-300 font-medium block">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Luxury Advisory & Acquisition Desk */}
          <aside className="lg:border-l lg:border-white/10 lg:pl-8">
            <div className="sticky top-32 space-y-7 relative border-t border-[#c6a15b]/45 pt-7">

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#dfc17b] font-cinzel font-semibold">
                    Private Advisory Desk
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl leading-[1.05] text-white">
                  A private viewing,<br /><em className="text-[#dfc17b]">on your terms.</em>
                </h3>
                <p className="text-sm text-gray-400 mt-4 leading-6 font-light">
                  Direct developer allocation with verified UP RERA due diligence, private site escort, and tailored payment structuring.
                </p>
              </div>

              {/* Action Buttons Hierarchy */}
              <div className="space-y-3 pt-1">
                {/* 1. Primary Luxury CTA */}
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="gold-btn-luxury w-full py-4 px-4 flex items-center justify-center gap-2.5 text-xs cursor-pointer"
                >
                  <Calendar size={15} />
                  <span>Book Chauffeur Site Tour ↗</span>
                </button>

                {/* 2. Secondary Luxury Action: Dossier */}
                <button
                  type="button"
                  onClick={() => setDossierOpen(true)}
                  className="w-full border border-white/15 hover:border-[#dfc17b]/70 bg-white/[.025] text-gray-200 hover:text-[#dfc17b] py-3.5 text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText size={14} />
                  <span>Download Executive Dossier (PDF)</span>
                </button>

                {/* 3. Refined Luxury WhatsApp Desk */}
                <button
                  type="button"
                  onClick={() => setWhatsappModalOpen(true)}
                  className="w-full border border-white/15 hover:border-emerald-500/60 bg-white/[.025] text-gray-200 hover:text-emerald-300 py-3.5 text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare size={14} className="text-[#25D366]" />
                  <span>Receive Floorplans on WhatsApp ↗</span>
                </button>
              </div>

              {brochureDownloaded && (
                <div className="p-3 bg-[#0d2015] border border-[#c6a15b] text-xs text-[#dfc17b] flex items-center gap-2">
                  <CheckCircle2 size={15} />
                  <span>Official RERA Brochure PDF sent to download queue.</span>
                </div>
              )}

              {/* Verified Trust Metrics */}
              <div className="border-t border-white/10 pt-5 space-y-3 text-xs text-gray-300">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Advisory Representation:</span>
                  <strong className="text-white font-medium">Zero Brokerage to Buyers</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Statutory Title:</span>
                  <strong className="text-emerald-400 font-medium">100% UP RERA Verified</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Senior Partner Desk:</span>
                  <a href="tel:+919811055888" className="text-[#dfc17b] hover:underline font-semibold">
                    +91 98110 55888
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Curated Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-20 border-t border-white/10 pt-16">
            <h2 className="font-serif text-3xl text-white mb-8">
              Similar <em>Curated Addresses</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <Link
                  key={p.slug}
                  href={`/properties/${p.slug}`}
                  className="group bg-[#0c1811] border border-white/10 hover:border-[#c6a15b] transition-all p-4 flex flex-col"
                >
                  <div className="h-48 w-full overflow-hidden mb-3">
                    <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="text-[10px] text-[#c6a15b] uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-serif text-xl text-white group-hover:text-[#c6a15b] transition-colors">{p.name}</h3>
                  <span className="text-xs text-gray-400 mt-1">{p.location}</span>
                  <strong className="text-[#c6a15b] text-sm mt-3">{p.price}</strong>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty={`${property.name} (${property.location})`}
      />

      <ExecutiveDossierModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
        property={property}
      />

      <WhatsAppBrochureModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        propertyName={property.name}
        propertyPrice={property.price}
        propertyLocation={property.location}
      />
    </main>
  );
}
