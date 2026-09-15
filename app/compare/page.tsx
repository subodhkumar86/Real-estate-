"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Scale, X } from "lucide-react";
import { properties, Property } from "../../data/properties";
import ConsultationModal from "../../components/ConsultationModal";

export default function ComparePage() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Initialize from localStorage or fallback to 3 top properties
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('investinpro-compare-slugs') || '[]');
      if (saved.length > 0) {
        // Client storage hydration intentionally updates state after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedSlugs(saved);
      } else {
        setSelectedSlugs(['m3m-the-cullinan', 'godrej-tropical-isle', 'max-estate-128']);
      }
    } catch {
      setSelectedSlugs(['m3m-the-cullinan', 'godrej-tropical-isle', 'max-estate-128']);
    }
  }, []);

  const removeProperty = (slug: string) => {
    const updated = selectedSlugs.filter(s => s !== slug);
    setSelectedSlugs(updated);
    localStorage.setItem('investinpro-compare-slugs', JSON.stringify(updated));
  };

  const addProperty = (slug: string) => {
    if (selectedSlugs.includes(slug) || selectedSlugs.length >= 4) return;
    const updated = [...selectedSlugs, slug];
    setSelectedSlugs(updated);
    localStorage.setItem('investinpro-compare-slugs', JSON.stringify(updated));
  };

  const comparedProperties = selectedSlugs
    .map(slug => properties.find(p => p.slug === slug))
    .filter(Boolean) as Property[];

  const availableToAdd = properties.filter(p => !selectedSlugs.includes(p.slug));

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#08130d] py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-3">
            <Scale size={15} />
            <span>Decide with Clarity · Side-by-Side Evaluation</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4">
            Compare your <em>shortlist.</em>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            Examine configurations, price points, carpet areas, possession milestones, and RERA credentials across up to 4 shortlisted addresses simultaneously.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Add Property Selector if less than 4 */}
        {selectedSlugs.length < 4 && availableToAdd.length > 0 && (
          <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-[#0d1e15]/90 via-[#0a1710]/90 to-[#0d1e15]/90 border border-[#c6a15b]/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 rounded-[2px] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="w-2 h-2 rounded-full bg-[#dfc17b] animate-ping" />
              <span>Comparing <strong className="text-white">{selectedSlugs.length} of 4</strong> estates. Select another address to benchmark:</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                onChange={(e) => {
                  if (e.target.value) addProperty(e.target.value);
                  e.target.value = "";
                }}
                defaultValue=""
                className="bg-[#07130c] border border-[#c6a15b]/40 text-xs text-gray-200 px-4 py-2.5 rounded-[2px] focus:outline-none focus:border-[#dfc17b] focus:ring-1 focus:ring-[#c6a15b]/30 cursor-pointer transition-all"
              >
                <option value="" disabled>+ Add Estate to Matrix...</option>
                {availableToAdd.map(p => (
                  <option key={p.slug} value={p.slug} className="bg-[#0b1812] text-white">
                    {p.name} ({p.location}) · {p.price}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {comparedProperties.length > 0 ? (
          <div className="overflow-x-auto premium-surface shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="border-b border-white/15 bg-[#0e1f16]">
                  <th className="p-5 text-xs uppercase tracking-widest text-[#c6a15b] w-48 font-semibold">
                    Parameters
                  </th>
                  {comparedProperties.map((p) => (
                    <th key={p.slug} className="p-5 w-64 align-top">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] text-[#c6a15b] uppercase tracking-wider font-semibold">
                          {p.category}
                        </span>
                        <button
                          onClick={() => removeProperty(p.slug)}
                          className="text-gray-400 hover:text-white p-1"
                          title="Remove from comparison"
                        >
                          <X size={15} />
                        </button>
                      </div>

                      <div className="h-32 w-full overflow-hidden mb-3 border border-white/10">
                        <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      </div>

                      <h3 className="font-serif text-xl text-white">
                        <Link href={`/properties/${p.slug}`} className="hover:text-[#c6a15b] transition-colors">
                          {p.name}
                        </Link>
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">{p.developer} · {p.location}</p>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10 text-xs text-gray-300">
                {/* Starting Price */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    Starting Price
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5 font-serif text-xl text-[#c6a15b]">
                      {p.price}
                      <span className="text-[10px] text-gray-400 font-sans block mt-0.5">{p.usdPrice}</span>
                    </td>
                  ))}
                </tr>

                {/* Location / Sector */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    Sector & Corridor
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5 text-white font-medium">
                      {p.location}
                    </td>
                  ))}
                </tr>

                {/* Configurations */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    Configurations
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5">
                      {p.configuration}
                    </td>
                  ))}
                </tr>

                {/* Super Area */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    Carpet / Super Area
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5">
                      {p.area}
                    </td>
                  ))}
                </tr>

                {/* Possession Timeline */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    Possession Status
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5 font-medium text-white">
                      {p.possession}
                    </td>
                  ))}
                </tr>

                {/* UP RERA No */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    UP RERA Registration
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5 text-[#c6a15b] font-mono">
                      {p.rera}
                    </td>
                  ))}
                </tr>

                {/* Indicative Net Yield */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    Indicative Net Yield
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5 text-white font-bold">
                      {p.roi}
                    </td>
                  ))}
                </tr>

                {/* Investment Profile */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    Investment Profile
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5">
                      {p.investment}
                    </td>
                  ))}
                </tr>

                {/* Signature Amenity */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    Key Highlights
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5 leading-relaxed text-gray-300">
                      {p.highlights[0]}
                    </td>
                  ))}
                </tr>

                {/* Direct Action */}
                <tr>
                  <td className="p-5 font-semibold text-white uppercase tracking-wider bg-white/5">
                    Direct Action
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.slug} className="p-5 space-y-2">
                      <Link
                        href={`/properties/${p.slug}`}
                        className="block w-full text-center gold-btn-luxury py-2.5 text-xs shadow-md"
                      >
                        Explore Property ↗
                      </Link>
                      <button
                        onClick={() => setModalOpen(true)}
                        className="block w-full text-center bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#c6a15b]/50 text-gray-200 hover:text-[#dfc17b] py-2 uppercase tracking-wider text-[10px] transition-all rounded-[2px]"
                      >
                        Private Tour
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0c1811] border border-white/10 p-8">
            <h3 className="font-serif text-3xl text-white mb-2">No properties in comparison</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-6">
              Select properties from our collection to inspect their features side by side.
            </p>
            <Link
              href="/properties"
              className="inline-block gold-btn-luxury px-8 py-3 text-xs"
            >
              Browse Properties ↗
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-wrap justify-between items-center gap-6 p-6 sm:p-8 bg-gradient-to-r from-[#0c1a13] via-[#09150e] to-[#0c1a13] border border-[#c6a15b]/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-[2px]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#dfc17b] font-medium mb-1">Bespoke Intelligence</div>
            <h4 className="font-serif text-2xl sm:text-3xl text-white font-normal">Need an unbiased comparative recommendation?</h4>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl font-light">Our Senior Portfolio Director prepares bespoke comparison memos and yield forecasts for family offices.</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="gold-btn-luxury px-8 py-3.5 text-xs uppercase tracking-widest font-bold whitespace-nowrap cursor-pointer shadow-lg"
          >
            Request Private Comparison Memo ↗
          </button>
        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty="Comparative Portfolio Analysis"
      />
    </main>
  );
}
