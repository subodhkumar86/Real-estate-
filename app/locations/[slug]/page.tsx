"use client";
import { useState, use } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  Compass, 
  Calendar 
} from "lucide-react";
import { locations, LocationData } from "../../../data/locations";
import { properties } from "../../../data/properties";
import ConsultationModal from "../../../components/ConsultationModal";

export default function LocationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [modalOpen, setModalOpen] = useState(false);

  const loc = locations.find((l) => l.slug === slug) || locations[0];

  // Matching properties in this sector or corridor
  const corridorProperties = properties.filter((p) => 
    loc.featuredProjects.some(fp => fp.toLowerCase().includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(fp.toLowerCase()))
  );

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#08130d] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/locations" className="text-xs text-gray-400 hover:text-[#c6a15b] flex items-center gap-1">
            <ArrowLeft size={13} /> Back to All Corridors
          </Link>
        </div>
      </div>

      {/* Hero Banner with Background Image */}
      <div className="relative py-20 overflow-hidden border-b border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: `url(${loc.image})` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060d09] via-[#060d09]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles size={15} />
            <span>Micro-Market Intelligence · {loc.opportunities}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4">
            {loc.name} <em>considered.</em>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-8">
            {loc.tagline}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl premium-surface border-[#c6a15b]/30 p-5 text-xs">
            <div>
              <span className="text-gray-400 uppercase text-[10px] block mb-1">Annual Appreciation</span>
              <strong className="text-[#c6a15b] text-base font-semibold">{loc.appreciation}</strong>
            </div>
            <div>
              <span className="text-gray-400 uppercase text-[10px] block mb-1">Average Sq.Ft Price</span>
              <strong className="text-white text-base font-semibold">{loc.avgPriceSqFt}</strong>
            </div>
            <div>
              <span className="text-gray-400 uppercase text-[10px] block mb-1">Rental Yield Window</span>
              <strong className="text-white text-base font-semibold">{loc.rentalYield}</strong>
            </div>
            <div>
              <span className="text-gray-400 uppercase text-[10px] block mb-1">Infrastructure Score</span>
              <strong className="text-[#c6a15b] text-base font-semibold">9.4 / 10</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Deep Macro Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              The Strategic <em>Investment Thesis</em>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {loc.overview}
            </p>

            {/* Highlights */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="font-serif text-2xl text-white mb-4">Core Structural Advantages</h3>
              <div className="space-y-3">
                {loc.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-[#c6a15b] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Catalysts */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="font-serif text-2xl text-white mb-4">Upcoming Growth Catalysts (2026–2030)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loc.catalysts.map((c, i) => (
                  <div key={i} className="p-4 premium-surface text-xs">
                    <span className="text-[#c6a15b] font-serif text-xl block mb-1">0{i + 1}</span>
                    <p className="text-gray-300">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Transit Times & Advisory Booking */}
          <div className="lg:col-span-4 space-y-6">
            <div className="premium-surface border-[#c6a15b]/35 p-6 space-y-4">
              <h3 className="font-serif text-xl text-white">Connectivity Benchmarks</h3>
              <div className="space-y-3 text-xs">
                {loc.connectivity.map((conn, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-400">{conn.name}</span>
                    <strong className="text-[#c6a15b] font-medium">{conn.time}</strong>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full gold-btn-luxury py-3 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Calendar size={14} />
                  <span>Book Corridor Site Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Properties in this Corridor */}
        {corridorProperties.length > 0 && (
          <div className="border-t border-white/10 pt-12">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#c6a15b] mb-1">Curated Inventory</p>
                <h2 className="font-serif text-3xl sm:text-4xl text-white">
                  Featured Residences in {loc.name}
                </h2>
              </div>
              <Link href="/properties" className="text-xs uppercase tracking-wider text-[#c6a15b] flex items-center gap-1">
                View All <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {corridorProperties.map((p) => (
                <div key={p.slug} className="luxury-card p-5 flex flex-col justify-between">
                  <div>
                    <div className="h-44 overflow-hidden mb-4">
                      <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-[#c6a15b] uppercase tracking-wider">{p.category}</span>
                    <h3 className="font-serif text-2xl text-white mt-1">{p.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{p.configuration} · {p.area}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                    <strong className="text-white text-sm">{p.price}</strong>
                    <Link href={`/properties/${p.slug}`} className="text-xs text-[#c6a15b] font-medium flex items-center gap-1">
                      Details <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty={`Corridor Tour: ${loc.name}`}
      />
    </main>
  );
}
