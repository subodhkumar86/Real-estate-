"use client";
import { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  MapPin
} from "lucide-react";
import ConsultationModal from "../../components/ConsultationModal";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const stages = [
    {
      num: "01",
      title: "Understand",
      desc: "We begin with a private dialogue to understand your portfolio horizon, family spatial preferences, privacy expectations, and capital deployment strategy."
    },
    {
      num: "02",
      title: "Curate",
      desc: "We do not hand you a 200-page catalogue. We present a strictly vetted shortlist of 3 to 5 premier addresses that survive our 40-point legal and structural audit."
    },
    {
      num: "03",
      title: "Advise",
      desc: "Granular financial modeling: indicative net yields, rental growth catalysts, stamp duty implications, and preferential developer inventory pricing."
    },
    {
      num: "04",
      title: "Accompany",
      desc: "From private chauffeur site previews and developer board introductions to title registry and key handover, our advisory remains by your side."
    }
  ];

  const leaders = [
    {
      name: "Vikramaditya Singhania",
      role: "Managing Director & Principal Advisor",
      bio: "Over 18 years shaping premier NCR transactions. Formerly led luxury acquisitions at international property consultancies, advising Fortune 500 executives and family offices.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Ayesha Roy Chowdhury",
      role: "Senior Director, Sky Residences & Penthouses",
      bio: "Specialises in landmark South Delhi to Noida waterfront transitions. An authority on low-density urban planning and architectural curation.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Samarth Kapoor",
      role: "Director of Institutional Commercial Assets",
      bio: "Oversees Grade-A office pre-leases and retail high-street investments along Noida Expressway and Jewar corridor with an emphasis on net yields.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Header Banner */}
      <div className="about-hero relative overflow-hidden border-b border-[#c6a15b]/20 py-16 sm:py-24 lg:py-28">
        <div className="about-hero-orbit" aria-hidden="true" />
        <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border border-[#c6a15b]/10" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles size={15} />
            <span>The InvestInPro Manifesto · A Quieter Way To Buy</span>
          </div>

          <h1 className="relative z-10 max-w-4xl font-serif text-5xl sm:text-7xl lg:text-[5.75rem] text-white font-normal mb-7 leading-[0.94]">
            Real estate advice <br />
            <em className="gold-text-gradient italic">built around conviction.</em>
          </h1>

          <p className="relative z-10 border-l border-[#c6a15b]/60 pl-5 text-gray-300 text-base max-w-xl font-light leading-8">
            InvestInPro Noida was established to bring discretion, institutional rigor, and genuine fiduciary responsibility to luxury property acquisition across Noida, Greater Noida, and NCR.
          </p>

          <div className="relative z-10 mt-10 grid max-w-3xl grid-cols-2 gap-px border border-white/10 bg-white/10 shadow-2xl sm:grid-cols-4">
            {[
              ["40-point", "Due-diligence audit"],
              ["3–5", "Curated options"],
              ["Zero", "Buyer brokerage"],
              ["NCR", "Private access network"]
            ].map(([value, label]) => (
              <div key={label} className="bg-[#090b09]/90 px-4 py-5 backdrop-blur-xl sm:px-5">
                <strong className="block font-serif text-2xl text-[#dfc17b] sm:text-3xl">{value}</strong>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 space-y-16 sm:space-y-20">
        {/* Core Philosophy Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 items-center" aria-labelledby="founding-principles">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c6a15b] font-semibold">
              Our Founding Principles
            </p>
            <span className="gold-rule" aria-hidden="true" />
            <h2 id="founding-principles" className="font-serif text-3xl sm:text-4xl text-white">
              We provide a point of view, <br />
              <em>not an endless catalogue.</em>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              The Indian property market has long been crowded with high-pressure sales brokers pushing inventory regardless of quality. InvestInPro was founded on an opposite philosophy: absolute discretion, title transparency, and pre-vetted opportunities.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              We represent purchasers, investors, and family offices with zero bias. If an upcoming launch has doubtful handover viability or inflated pricing, we tell our clients explicitly to walk away.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 size={16} className="text-[#c6a15b]" />
                <span>Zero Brokerage to Buyers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 size={16} className="text-[#c6a15b]" />
                <span>100% UP RERA Registered</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 size={16} className="text-[#c6a15b]" />
                <span>Strict Non-Disclosure Agreements</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 size={16} className="text-[#c6a15b]" />
                <span>Private Chauffeur Site Tours</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[320px] sm:h-[420px] overflow-hidden premium-surface group">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
              alt="InvestInPro Luxury Architecture"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover saturate-[0.78] group-hover:saturate-100 group-hover:scale-[1.025] transition-[transform,filter] duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060d09] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#060d09]/80 backdrop-blur-md border border-[#c6a15b]/30">
              <span className="text-[#c6a15b] font-serif text-2xl font-normal block">₹1,500+ Crore</span>
              <p className="text-xs text-gray-300">In title-cleared luxury real estate curated since 2021.</p>
            </div>
          </div>
        </section>

        {/* 4-Stage Advisory Process */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c6a15b] font-semibold mb-2">
              Structured Methodology
            </p>
            <span className="gold-rule mx-auto mb-3" aria-hidden="true" />
            <h2 className="font-serif text-3xl sm:text-5xl text-white">
              The Four-Stage <em>Advisory Path</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((st) => (
              <div
                key={st.num}
                className="luxury-card luxury-card-numbered p-6 sm:p-7 flex min-h-64 flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#c6a15b] font-normal block mb-4">
                    {st.num}
                  </span>
                  <h3 className="font-serif text-2xl text-white mb-3">
                    {st.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Curators */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c6a15b] font-semibold mb-2">
              Leadership & Curators
            </p>
            <span className="gold-rule mx-auto mb-3" aria-hidden="true" />
            <h2 className="font-serif text-3xl sm:text-5xl text-white">
              Guided by <em>market veterans.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="luxury-card overflow-hidden p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="h-72 w-full overflow-hidden mb-5 border border-white/10">
                    <img src={leader.image} alt={leader.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-top grayscale-[20%] hover:grayscale-0 hover:scale-[1.025] transition-[transform,filter] duration-700" />
                  </div>
                  <h3 className="font-serif text-2xl text-white">{leader.name}</h3>
                  <p className="text-xs text-[#c6a15b] uppercase tracking-wider mt-1 mb-3">{leader.role}</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Client Lounges */}
        <div className="premium-surface p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#c6a15b] font-semibold mb-2">
                Executive Hospitality
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
                Private Client Lounges
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-6">
                Meet our senior partners in discretion. We host private portfolio discussions and developer presentations at our dedicated executive lounges in Noida and Delhi Aerocity.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#c6a15b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Noida Executive Suite:</strong>
                    <span className="text-gray-400">Level 8, Sector 18 Commercial Center, Noida 201301</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#c6a15b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Delhi Diplomatic Suite:</strong>
                    <span className="text-gray-400">Worldmark 1, Aerocity, New Delhi 110037</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <button
                onClick={() => setModalOpen(true)}
                className="gold-btn-luxury px-8 py-4 text-xs cursor-pointer"
              >
                Schedule Private Appointment ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty="General Private Consultation"
      />
    </main>
  );
}
