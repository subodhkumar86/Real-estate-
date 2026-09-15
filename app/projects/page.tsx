"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, Building2, Calendar, ArrowUpRight, CheckCircle2, ShieldCheck, TreePine, Layers } from "lucide-react";
import { projects, Project } from "../../data/projects";
import ConsultationModal from "../../components/ConsultationModal";

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filtered = filterStatus === "All" 
    ? projects 
    : projects.filter(p => p.status === filterStatus);

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Header Banner */}
      <div className="border-b border-white/10 bg-[#08130d] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles size={15} />
            <span>Developer Portfolio · Tier-1 Master Developments</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4">
            Projects with <em>conviction.</em>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            Noida’s most transformative developments shaping luxury living and institutional commerce. Verified title diligence and direct developer allocations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
          {["All", "Under Construction", "Ready to Move", "New Launch"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
                filterStatus === status
                  ? 'gold-btn-luxury text-[#07100b] font-bold shadow-[0_2px_12px_rgba(198,161,91,0.35)]'
                  : 'bg-[#09150e]/90 text-gray-300 border border-white/10 hover:border-[#c6a15b]/40 hover:text-white'
              }`}
            >
              {status} {status === 'All' ? `(${projects.length})` : ''}
            </button>
          ))}
        </div>

        {/* Project Cards Showcase */}
        <div className="space-y-12">
          {filtered.map((proj, idx) => (
            <article
              key={proj.slug}
              className="premium-surface hover:border-[#c6a15b]/50 transition-all p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Image Preview */}
              <div className="lg:col-span-5 relative h-72 lg:h-80 w-full overflow-hidden border border-white/10">
                <img
                  src={proj.image}
                  alt={proj.name}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#060d09]/90 border border-[#c6a15b]/40 text-[#c6a15b] px-3 py-1 text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md">
                  {proj.status}
                </div>
              </div>

              {/* Information */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1">
                    <span className="text-[#c6a15b] uppercase tracking-widest font-semibold">
                      {proj.developer}
                    </span>
                    <span className="text-gray-400">
                      Completion: <strong className="text-white">{proj.completion}</strong>
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-white mb-2">
                    <Link href={`/properties/${proj.slug}`} className="hover:text-[#c6a15b] transition-colors">
                      {proj.name}
                    </Link>
                  </h2>

                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-4">
                    <MapPin size={14} className="text-[#c6a15b]" />
                    <span>{proj.location} · {proj.type}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white/5 border border-white/10 text-xs mb-4">
                    <div>
                      <span className="text-gray-500 text-[10px] uppercase block">Land Acreage</span>
                      <strong className="text-white font-medium">{proj.landArea}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] uppercase block">Elevation</span>
                      <strong className="text-white font-medium">{proj.towers}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] uppercase block">Open Space</span>
                      <strong className="text-[#c6a15b] font-medium">{proj.openSpace}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] uppercase block">Starting From</span>
                      <strong className="text-white font-medium">{proj.price}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 size={15} className="text-[#c6a15b] shrink-0" />
                    <span>{proj.highlight}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  <Link
                    href={`/properties/${proj.slug}`}
                    className="gold-btn-luxury px-6 py-2.5 text-xs flex items-center gap-2 shadow-lg"
                  >
                    <span>View Residences & Inventory ↗</span>
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedProject(`${proj.name} (${proj.developer})`);
                      setModalOpen(true);
                    }}
                    className="border border-white/20 hover:border-[#c6a15b] text-white hover:text-[#c6a15b] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Schedule Private Site Tour
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty={selectedProject}
      />
    </main>
  );
}
