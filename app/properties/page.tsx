"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  Scale, 
  ChevronDown, 
  X,
  Sparkles,
  Calendar
} from "lucide-react";
import { properties, Property } from "../../data/properties";
import ConsultationModal from "../../components/ConsultationModal";

function getAdvisoryScore(property: Property) {
  const roi = Number.parseFloat(property.roi) || 0;
  const roiScore = Math.min(30, Math.round(roi * 2));
  const reraScore = property.rera ? 25 : 0;
  const featuredScore = property.featured ? 20 : 12;
  const detailScore = property.highlights.length >= 4 && property.connectivity.length >= 3 ? 25 : 18;
  return Math.min(100, roiScore + reraScore + featuredScore + detailScore);
}

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "All";
  const initialLocation = searchParams?.get("location") || "All";
  const initialBudget = searchParams?.get("budget") || "All";

  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSector, setSelectedSector] = useState<string>(initialLocation);
  const [selectedBudget, setSelectedBudget] = useState<string>(initialBudget);
  const [selectedPossession, setSelectedPossession] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [allProperties, setAllProperties] = useState<Property[]>(properties);

  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProperty, setModalProperty] = useState("");

  // Wishlist, Compare & Custom Admin properties sync
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('investinpro-wishlist-slugs') || '[]');
      // Client storage hydration intentionally updates state after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSavedSlugs(saved);
      const compared = JSON.parse(localStorage.getItem('investinpro-compare-slugs') || '[]');
      setCompareSlugs(compared);

      const custom: Property[] = JSON.parse(localStorage.getItem('investinpro_custom_properties') || '[]');
      if (custom.length > 0) {
        setAllProperties([...custom, ...properties]);
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleWishlist = (slug: string) => {
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

  const toggleCompare = (slug: string) => {
    let updated: string[];
    if (compareSlugs.includes(slug)) {
      updated = compareSlugs.filter(s => s !== slug);
    } else {
      if (compareSlugs.length >= 4) {
        alert("You can compare up to 4 properties simultaneously.");
        return;
      }
      updated = [...compareSlugs, slug];
    }
    setCompareSlugs(updated);
    localStorage.setItem('investinpro-compare-slugs', JSON.stringify(updated));
  };

  // Filter and sort logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter((prop) => {
      // Keyword filter
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matches = 
          prop.name.toLowerCase().includes(q) ||
          prop.developer.toLowerCase().includes(q) ||
          prop.location.toLowerCase().includes(q) ||
          prop.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category filter
      if (selectedCategory !== "All" && selectedCategory !== "All Types") {
        if (prop.category !== selectedCategory && prop.type !== selectedCategory) return false;
      }

      // Sector filter
      if (selectedSector !== "All" && selectedSector !== "All Locations") {
        if (!prop.location.toLowerCase().includes(selectedSector.toLowerCase()) && 
            !prop.sector.toLowerCase().includes(selectedSector.toLowerCase())) {
          return false;
        }
      }

      // Budget filter
      if (selectedBudget !== "All" && selectedBudget !== "Any Budget") {
        if (selectedBudget === "under-2cr" && prop.priceNum >= 20000000) return false;
        if (selectedBudget === "2-4cr" && (prop.priceNum < 20000000 || prop.priceNum > 40000000)) return false;
        if (selectedBudget === "4-7cr" && (prop.priceNum < 40000000 || prop.priceNum > 70000000)) return false;
        if (selectedBudget === "above-7cr" && prop.priceNum <= 70000000) return false;
      }

      // Possession filter
      if (selectedPossession !== "All") {
        if (selectedPossession === "Ready" && !prop.possession.toLowerCase().includes("ready")) return false;
        if (selectedPossession === "2026" && !prop.possession.includes("2026")) return false;
        if (selectedPossession === "2027" && !prop.possession.includes("2027")) return false;
        if (selectedPossession === "2028" && !prop.possession.includes("2028")) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceNum - b.priceNum;
      if (sortBy === "price-desc") return b.priceNum - a.priceNum;
      return 0; // featured by default
    });
  }, [allProperties, keyword, selectedCategory, selectedSector, selectedBudget, selectedPossession, sortBy]);

  const clearFilters = () => {
    setKeyword("");
    setSelectedCategory("All");
    setSelectedSector("All");
    setSelectedBudget("All");
    setSelectedPossession("All");
    setSortBy("featured");
  };

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Header Banner */}
      <div className="border-b border-[#c6a15b]/15 bg-[#08130d] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles size={15} />
            <span>Curated Portfolio · {properties.length} Exceptional Opportunities</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4">
            Curated <em>properties.</em>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            Every listing verified with UP RERA. A bespoke portfolio of Noida’s preeminent sky mansions, golf-course estates, and Grade-A institutional commercial suites.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Floating Compare Banner if items selected */}
        {compareSlugs.length > 0 && (
          <div className="mb-8 p-4 premium-surface border-l-2 border-l-[#c6a15b] flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs text-white">
              <Scale size={18} className="text-[#c6a15b]" />
              <span><strong>{compareSlugs.length} properties</strong> selected for side-by-side comparison.</span>
            </div>
            <div className="flex gap-3">
              <Link
                href="/compare"
                className="gold-btn-luxury px-4 py-2 text-xs"
              >
                Compare Now ↗
              </Link>
              <button
                onClick={() => {
                  setCompareSlugs([]);
                  localStorage.removeItem('investinpro-compare-slugs');
                }}
                className="text-xs text-gray-400 hover:text-white"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0d1e15]/95 via-[#0a1710]/95 to-[#0d1e15]/95 border border-[#c6a15b]/35 backdrop-blur-md rounded-[2px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-4 mb-10">
          {/* Search Input & Quick Tabs */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-3.5 text-[#dfc17b]/70" />
              <input
                type="text"
                placeholder="Search by estate name, developer, or sector (e.g. Cullinan, Sector 150)..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-[#06100a]/90 border border-[#c6a15b]/30 py-3 pl-10 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#dfc17b] focus:ring-1 focus:ring-[#c6a15b]/30 rounded-[2px] transition-all"
              />
              {keyword && (
                <button onClick={() => setKeyword("")} className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white">
                  <X size={15} />
                </button>
              )}
            </div>

            {/* View Mode & Sort Dropdown */}
            <div className="flex items-center gap-3 justify-between lg:justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#07130c] border border-[#c6a15b]/35 px-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#dfc17b] rounded-[2px] cursor-pointer transition-all"
              >
                <option value="featured" className="bg-[#0b1812] text-white">Sort: Featured Estates</option>
                <option value="price-asc" className="bg-[#0b1812] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#0b1812] text-white">Price: High to Low</option>
              </select>

              <div className="flex border border-[#c6a15b]/30 rounded-[2px] overflow-hidden bg-[#07130c]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-[#c6a15b]/25 text-[#dfc17b]' : 'text-gray-400 hover:text-white'}`}
                  title="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-[#c6a15b]/25 text-[#dfc17b]' : 'text-gray-400 hover:text-white'}`}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-[#c6a15b]/15 text-xs">
            {/* Category */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#dfc17b] block mb-1.5 font-medium">Asset Class</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#07130c] border border-white/15 hover:border-[#c6a15b]/40 p-2.5 text-white focus:outline-none focus:border-[#dfc17b] rounded-[2px] cursor-pointer transition-all"
              >
                <option value="All" className="bg-[#0b1812]">All Asset Classes</option>
                <option value="Ultra Luxury" className="bg-[#0b1812]">Ultra Luxury Sky Mansions</option>
                <option value="Golf-Side" className="bg-[#0b1812]">Golf-Side Residences</option>
                <option value="Island Living" className="bg-[#0b1812]">Island Living</option>
                <option value="Commercial" className="bg-[#0b1812]">Commercial & Retail</option>
                <option value="Penthouse" className="bg-[#0b1812]">Sky Penthouses</option>
                <option value="Villas" className="bg-[#0b1812]">Parkside Residences</option>
              </select>
            </div>

            {/* Sector */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#dfc17b] block mb-1.5 font-medium">Sector Corridor</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full bg-[#07130c] border border-white/15 hover:border-[#c6a15b]/40 p-2.5 text-white focus:outline-none focus:border-[#dfc17b] rounded-[2px] cursor-pointer transition-all"
              >
                <option value="All" className="bg-[#0b1812]">All Noida Corridors</option>
                <option value="Sector 94" className="bg-[#0b1812]">Sector 94 (Delhi Gateway)</option>
                <option value="Sector 124" className="bg-[#0b1812]">Sector 124 (Border Mansions)</option>
                <option value="Sector 128" className="bg-[#0b1812]">Sector 128 (Golf Vista)</option>
                <option value="Sector 146" className="bg-[#0b1812]">Sector 146 (Island Corridor)</option>
                <option value="Sector 150" className="bg-[#0b1812]">Sector 150 (Sports City)</option>
                <option value="Sector 140A" className="bg-[#0b1812]">Sector 140A (Commercial Hub)</option>
                <option value="Sector 144" className="bg-[#0b1812]">Sector 144 (Wellness Corridor)</option>
                <option value="Greater Noida West" className="bg-[#0b1812]">Greater Noida West</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#dfc17b] block mb-1.5 font-medium">Capital Bracket</label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-[#07130c] border border-white/15 hover:border-[#c6a15b]/40 p-2.5 text-white focus:outline-none focus:border-[#dfc17b] rounded-[2px] cursor-pointer transition-all"
              >
                <option value="All" className="bg-[#0b1812]">All Capital Brackets</option>
                <option value="under-2cr" className="bg-[#0b1812]">Under ₹2.00 Cr</option>
                <option value="2-4cr" className="bg-[#0b1812]">₹2.00 Cr – ₹4.00 Cr</option>
                <option value="4-7cr" className="bg-[#0b1812]">₹4.00 Cr – ₹7.00 Cr</option>
                <option value="above-7cr" className="bg-[#0b1812]">₹7.00 Cr+ (Ultra Trophy)</option>
              </select>
            </div>

            {/* Possession */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] text-[#dfc17b] block mb-1.5 font-medium">Possession Horizon</label>
              <select
                value={selectedPossession}
                onChange={(e) => setSelectedPossession(e.target.value)}
                className="w-full bg-[#07130c] border border-white/15 hover:border-[#c6a15b]/40 p-2.5 text-white focus:outline-none focus:border-[#dfc17b] rounded-[2px] cursor-pointer transition-all"
              >
                <option value="All" className="bg-[#0b1812]">All Timelines</option>
                <option value="Ready" className="bg-[#0b1812]">Ready to Move (OC Received)</option>
                <option value="2026" className="bg-[#0b1812]">2026 Delivery</option>
                <option value="2027" className="bg-[#0b1812]">2027 Delivery</option>
                <option value="2028" className="bg-[#0b1812]">2028 Delivery</option>
              </select>
            </div>
          </div>

          {/* Active filter count & clear */}
          <div className="flex items-center justify-between text-xs pt-2 text-gray-400">
            <span>Showing <strong>{filteredProperties.length}</strong> of {properties.length} properties</span>
            {(keyword || selectedCategory !== "All" || selectedSector !== "All" || selectedBudget !== "All" || selectedPossession !== "All") && (
              <button
                onClick={clearFilters}
                className="text-[#c6a15b] hover:underline cursor-pointer flex items-center gap-1"
              >
                <X size={13} /> Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results Grid / List */}
        {filteredProperties.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {filteredProperties.map((prop) => {
                const isSaved = savedSlugs.includes(prop.slug);
                const isCompared = compareSlugs.includes(prop.slug);
                const advisoryScore = getAdvisoryScore(prop);

                return (
                  <article
                    key={prop.slug}
                    className="group luxury-card flex flex-col justify-between overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-72 w-full overflow-hidden bg-[#101210]">
                      <img
                        src={prop.image}
                        alt={prop.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="bg-[#060d09]/90 text-[#c6a15b] border border-[#c6a15b]/30 px-2 py-0.5 text-[9px] uppercase tracking-widest font-semibold backdrop-blur-md">
                          {prop.category}
                        </span>
                        <span className="bg-black/70 text-gray-300 px-2 py-0.5 text-[8px] uppercase tracking-wider backdrop-blur-sm">
                          RERA: {prop.rera}
                        </span>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(prop.slug)}
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
                          isSaved 
                            ? 'bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] text-[#07100b] shadow-[0_2px_12px_rgba(198,161,91,0.4)]' 
                            : 'bg-black/60 text-white hover:text-[#dfc17b] border border-white/10 hover:border-[#c6a15b]/40'
                        }`}
                        aria-label="Save to Wishlist"
                      >
                        <Heart size={15} className={isSaved ? "fill-current" : ""} />
                      </button>

                      {/* Price Banner */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#060d09] via-[#060d09]/90 to-transparent p-4 flex justify-between items-end">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Consideration</span>
                          <strong className="font-serif text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5e7c8] to-[#dfc17b]">{prop.price}</strong>
                        </div>
                        <span className="text-xs text-[#dfc17b] font-medium font-mono">{prop.usdPrice}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-[#c6a15b] mb-1">
                          <MapPin size={13} />
                          <span>{prop.location}</span>
                        </div>

                        <h3 className="font-serif text-2xl text-white group-hover:text-[#c6a15b] transition-colors mb-2">
                          <Link href={`/properties/${prop.slug}`}>
                            {prop.name}
                          </Link>
                        </h3>

                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                          {prop.overview}
                        </p>

                        <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-xs text-gray-300 mb-4">
                          <div>
                            <span className="text-gray-500 text-[10px] uppercase block">Configuration</span>
                            <span className="font-medium text-white">{prop.configuration}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-[10px] uppercase block">Possession</span>
                            <span className="font-medium text-white">{prop.possession}</span>
                          </div>
                        </div>

                      <div className="flex items-start gap-2 border-l border-[#c6a15b]/50 pl-3 py-1 mb-4">
                          <ShieldCheck size={14} className="text-[#c6a15b] shrink-0" />
                          <div className="min-w-0">
                            <span className="block text-[9px] uppercase tracking-[0.18em] text-[#c6a15b]">Advisory perspective</span>
                            <span className="block truncate text-xs text-gray-200">{prop.investment}</span>
                          </div>
                        </div>

                        <div className="mb-4 border-t border-white/10 pt-3">
                          <div className="flex items-center justify-between gap-3 mb-1.5">
                            <span className="text-[9px] uppercase tracking-[0.16em] text-gray-400">Internal intelligence score</span>
                            <span className="text-xs font-semibold text-[#dfc17b]">{advisoryScore}/100</span>
                          </div>
                          <div className="h-1 overflow-hidden bg-white/10">
                            <div className="h-full bg-gradient-to-r from-[#9b7933] via-[#c6a15b] to-[#f1d99a]" style={{ width: `${advisoryScore}%` }} />
                          </div>
                          <p className="mt-1.5 text-[10px] text-gray-500">Based on available return, verification, and location detail.</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/properties/${prop.slug}`}
                            className="flex-1 gold-btn-luxury py-2.5 text-center text-xs"
                          >
                            Explore Property ↗
                          </Link>

                          <button
                            onClick={() => {
                              setModalProperty(`${prop.name} (${prop.location})`);
                              setModalOpen(true);
                            }}
                            className="p-2.5 border border-white/15 hover:border-[#c6a15b] hover:text-[#c6a15b] text-gray-300 transition-colors"
                            title="Schedule Consultation"
                          >
                            <Calendar size={15} />
                          </button>
                        </div>

                        <button
                          onClick={() => toggleCompare(prop.slug)}
                          className={`w-full py-2 text-[11px] uppercase tracking-wider border rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isCompared 
                              ? 'bg-[#dfc17b]/15 text-[#dfc17b] border-[#dfc17b]/60 shadow-[0_0_15px_rgba(223,193,123,0.15)] font-semibold' 
                              : 'border-white/10 text-gray-400 hover:text-white hover:border-[#c6a15b]/40 bg-white/[0.02]'
                          }`}
                        >
                          <Scale size={13} />
                          <span>{isCompared ? 'Added to Compare ✓' : '+ Add to Compare'}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProperties.map((prop, idx) => {
                const isSaved = savedSlugs.includes(prop.slug);
                const isCompared = compareSlugs.includes(prop.slug);
                const advisoryScore = getAdvisoryScore(prop);

                return (
                  <article
                    key={prop.slug}
                    className="bg-[#0c1811] border border-white/10 hover:border-[#c6a15b]/40 p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-center justify-between transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto">
                      <span className="font-serif text-2xl text-[#c6a15b] font-light hidden sm:block">
                        0{idx + 1}
                      </span>
                      <img
                        src={prop.image}
                        alt={prop.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full sm:w-44 h-28 object-cover shrink-0"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#c6a15b] font-semibold block mb-1">
                          {prop.category} · RERA: {prop.rera}
                        </span>
                        <h3 className="font-serif text-2xl text-white hover:text-[#c6a15b] transition-colors">
                          <Link href={`/properties/${prop.slug}`}>
                            {prop.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {prop.developer} · {prop.location}
                        </p>
                        <div className="flex gap-4 text-xs text-gray-300 mt-3">
                          <span>{prop.configuration}</span>
                          <span>•</span>
                          <span>{prop.area}</span>
                          <span>•</span>
                          <span>Possession {prop.possession}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                      <div className="text-left md:text-right">
                        <strong className="font-serif text-2xl text-[#c6a15b] block font-normal">{prop.price}</strong>
                        <span className="text-[10px] text-gray-400 uppercase">Indicative ROI: {prop.roi}</span>
                        <span className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#dfc17b] md:justify-end">
                          <ShieldCheck size={11} /> Advisory score {advisoryScore}/100
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleWishlist(prop.slug)}
                          className={`p-2.5 border rounded-[2px] transition-all ${
                            isSaved 
                              ? 'bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] text-[#07100b] border-transparent shadow-[0_2px_10px_rgba(198,161,91,0.3)]' 
                              : 'border-white/15 text-gray-300 hover:text-white hover:border-[#c6a15b]/40'
                          }`}
                          title="Save to Wishlist"
                        >
                          <Heart size={14} className={isSaved ? "fill-current" : ""} />
                        </button>
                        <button
                          onClick={() => toggleCompare(prop.slug)}
                          className={`p-2.5 border rounded-[2px] transition-all ${
                            isCompared 
                              ? 'bg-[#dfc17b]/20 text-[#dfc17b] border-[#dfc17b]/60 font-semibold' 
                              : 'border-white/15 text-gray-300 hover:text-white hover:border-[#c6a15b]/40'
                          }`}
                          title="Compare"
                        >
                          <Scale size={14} />
                        </button>
                        <Link
                          href={`/properties/${prop.slug}`}
                          className="gold-btn-luxury px-5 py-2 text-xs"
                        >
                          View ↗
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#0c1811] border border-white/10 p-8 max-w-xl mx-auto">
            <Filter size={36} className="text-[#c6a15b] mx-auto mb-4" />
            <h3 className="font-serif text-3xl text-white mb-2">No properties found</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
              No active listings match your selected filter criteria. Try adjusting your budget or corridor filters.
            </p>
            <button
              onClick={clearFilters}
              className="gold-btn-luxury px-6 py-2.5 text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty={modalProperty}
      />
    </main>
  );
}
