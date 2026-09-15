"use client";
import Link from "next/link";
import { Sparkles, MapPin, ArrowUpRight, TrendingUp, Compass, ShieldCheck } from "lucide-react";
import { locations } from "../../data/locations";

export default function LocationsPage() {
  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Header Banner */}
      <div className="border-b border-white/10 bg-[#08130d] py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles size={15} />
            <span>Strategic Advisory · Micro-Market Research</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4">
            The city, <em>considered.</em>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            A comprehensive, data-backed assessment of Noida’s most promising growth corridors. From the Delhi borders of Sector 94 to the green expanses of Sector 150 and the Jewar International Airport zone.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <article
              key={loc.slug}
              className="group premium-surface hover:border-[#c6a15b]/60 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden bg-[#102018]">
                <img
                  src={loc.image}
                  alt={loc.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d09] via-transparent to-black/30" />
                <span className="absolute top-3 left-3 bg-[#060d09]/90 border border-[#c6a15b]/30 text-[#c6a15b] px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold backdrop-blur-md">
                  {loc.opportunities}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-[#c6a15b] transition-colors mb-2">
                    <Link href={`/locations/${loc.slug}`}>
                      {loc.name}
                    </Link>
                  </h2>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                    {loc.overview}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs text-gray-300">
                    <div>
                      <span className="text-gray-500 text-[10px] uppercase block">Appreciation</span>
                      <strong className="text-[#c6a15b] font-semibold">{loc.appreciation}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] uppercase block">Avg Sq.Ft Rate</span>
                      <strong className="text-white font-semibold">{loc.avgPriceSqFt}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="w-full outline-btn-luxury py-2.5 text-center text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Read Sector Whitepaper</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
