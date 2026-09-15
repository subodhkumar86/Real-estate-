"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Trash2, ArrowUpRight, Scale, Calendar, MapPin, Sparkles, Building2 } from "lucide-react";
import { properties, Property } from "../../data/properties";
import ConsultationModal from "../../components/ConsultationModal";

export default function WishlistPage() {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

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

  const removeItem = (slug: string) => {
    const updated = savedSlugs.filter(s => s !== slug);
    setSavedSlugs(updated);
    localStorage.setItem('investinpro-wishlist-slugs', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  const clearAll = () => {
    setSavedSlugs([]);
    localStorage.removeItem('investinpro-wishlist-slugs');
    window.dispatchEvent(new Event('wishlist-updated'));
  };

  const savedProperties = savedSlugs
    .map(slug => properties.find(p => p.slug === slug))
    .filter(Boolean) as Property[];

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Header Banner */}
      <div className="border-b border-white/10 bg-[#08130d] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-3">
              <Sparkles size={15} />
              <span>Personal Shortlist · {savedProperties.length} Saved {savedProperties.length === 1 ? 'Address' : 'Addresses'}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal">
              Saved for <em>consideration.</em>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-xl font-light leading-relaxed mt-3">
              Your confidential shortlist is saved securely on this device. Compare features side by side or request a bundled private chauffeur tour.
            </p>
          </div>

          {savedProperties.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="gold-btn-luxury px-6 py-3 text-xs flex items-center gap-2 shadow-lg"
              >
                <Calendar size={15} />
                <span>Tour All Saved Properties</span>
              </button>

              <button
                onClick={clearAll}
                className="border border-white/20 hover:border-red-400 text-xs px-4 py-3 text-gray-400 hover:text-red-400 transition-colors"
              >
                Clear Shortlist
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((prop) => (
              <article
                key={prop.slug}
                className="luxury-card flex flex-col justify-between overflow-hidden"
              >
                <div className="relative h-64 w-full overflow-hidden bg-[#102018]">
                  <img
                    src={prop.image}
                    alt={prop.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#060d09]/90 border border-[#c6a15b]/30 text-[#c6a15b] px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold backdrop-blur-md">
                    {prop.category}
                  </div>

                  <button
                    onClick={() => removeItem(prop.slug)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-gray-300 hover:text-red-400 backdrop-blur-md transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 size={15} />
                  </button>

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#060d09] via-[#060d09]/80 to-transparent p-4 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Price</span>
                      <strong className="font-serif text-2xl text-white font-normal">{prop.price}</strong>
                    </div>
                    <span className="text-xs text-[#c6a15b] font-medium">{prop.usdPrice}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#c6a15b] mb-1">
                      <MapPin size={13} />
                      <span>{prop.location}</span>
                    </div>

                    <h3 className="font-serif text-2xl text-white mb-2">
                      <Link href={`/properties/${prop.slug}`} className="hover:text-[#c6a15b] transition-colors">
                        {prop.name}
                      </Link>
                    </h3>

                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-xs text-gray-300">
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase block">Config</span>
                        <span className="font-medium text-white">{prop.configuration}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase block">Carpet Area</span>
                        <span className="font-medium text-white">{prop.area}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href={`/properties/${prop.slug}`}
                      className="flex-1 gold-btn-luxury py-2.5 text-center text-xs shadow-md"
                    >
                      View Details ↗
                    </Link>

                    <button
                      onClick={() => removeItem(prop.slug)}
                      className="p-2.5 border border-white/15 hover:border-red-400 text-gray-400 hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State with Featured Quick Picks */
          <div className="text-center py-16 premium-surface p-8 max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-[#c6a15b]/20 border border-[#c6a15b] rounded-full flex items-center justify-center mx-auto text-[#c6a15b]">
              <Heart size={30} />
            </div>

            <h2 className="font-serif text-3xl text-white">Your shortlist is empty</h2>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              Save properties you find compelling by tapping the heart icon on any listing. They will appear here for easy comparison.
            </p>

            <div className="pt-2">
              <Link
                href="/properties"
                className="gold-btn-luxury px-8 py-3.5 text-xs inline-block shadow-lg"
              >
                Browse Curated Residences ↗
              </Link>
            </div>
          </div>
        )}
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty="All Shortlisted Saved Residences"
      />
    </main>
  );
}
