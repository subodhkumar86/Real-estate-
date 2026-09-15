"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  FileText, 
  MessageCircle,
  BarChart3
} from "lucide-react";
import ConsultationModal from "../../components/ConsultationModal";

interface AssetClass {
  num: string;
  category: "Residential" | "Commercial" | "Land" | "Allocations";
  title: string;
  badge: string;
  irr: string;
  yieldRate: string;
  ticket: string;
  timeframe: string;
  liquidity: "High" | "Medium" | "Strategic Lock";
  desc: string;
  drivers: string;
  mitigant: string;
}

const assetClasses: AssetClass[] = [
  {
    num: "01",
    category: "Residential",
    title: "Sky Mansions & Penthouses",
    badge: "Trophy Scarcity",
    irr: "14.5% p.a. expected",
    yieldRate: "3.5% – 4.2% Net",
    ticket: "₹5.4 Cr – ₹18 Cr",
    timeframe: "4 – 7 Years",
    liquidity: "High",
    desc: "Single-floor and double-height duplex residences overlooking golf courses and riverfronts. Characterized by severe supply scarcity in prime gateway sectors like Sector 94 and Sector 124.",
    drivers: "South Delhi wealth migration, HNI founder preference, international concierge facilities.",
    mitigant: "RERA registered, escrow account monitored, top-tier institutional architects."
  },
  {
    num: "02",
    category: "Residential",
    title: "Low-Density Sports & Forest Enclaves",
    badge: "Highest Long-Term CAGR",
    irr: "16.8% p.a. expected",
    yieldRate: "4.0% – 4.8% Net",
    ticket: "₹2.8 Cr – ₹6.5 Cr",
    timeframe: "3 – 5 Years",
    liquidity: "High",
    desc: "Low-density living mandated by Noida masterplan (80% green cover) in Sector 150. Generates superior rental retention from top corporate leaders and multi-national executives.",
    drivers: "Jewar Airport highway spur, 42-acre central park, zero heavy commercial pollution.",
    mitigant: "Strict masterplan building density caps, zero industrial zoning within 10 km."
  },
  {
    num: "03",
    category: "Commercial",
    title: "Grade-A Lockable Corporate Offices",
    badge: "Annuity Yield",
    irr: "9.2% Net Yield + Capital Growth",
    yieldRate: "8.5% – 9.4% Net",
    ticket: "₹85 Lakh – ₹4.5 Cr",
    timeframe: "5 – 10 Years",
    liquidity: "Medium",
    desc: "Lockable institutional office suites in iconic twin skyscrapers along Sector 140A. Backed by long-term corporate lease covenants from multinational IT and consulting firms.",
    drivers: "Growing tech campus concentration (Microsoft, Adobe, NTT), high rental yields vs residential.",
    mitigant: "Institutional property management, 9-year corporate lease locks with 15% escalations."
  },
  {
    num: "04",
    category: "Commercial",
    title: "High-Street Anchor Retail & Promenades",
    badge: "High Footfall Cashflow",
    irr: "8.8% Net Yield",
    yieldRate: "8.0% – 9.2% Net",
    ticket: "₹1.2 Cr – ₹5 Cr",
    timeframe: "5+ Years",
    liquidity: "Medium",
    desc: "Ground-floor high-street retail promenades situated at high-density residential nodes like Gaur Chowk and Sector 140A. High daily footfalls and long lease locks.",
    drivers: "Massive residential density within 3-km radius, modern lifestyle entertainment hubs.",
    mitigant: "Direct street-level visibility, anchor tenant pre-commitments, high consumer footfall."
  },
  {
    num: "05",
    category: "Land",
    title: "Jewar Greenfield Airport Corridor Assets",
    badge: "Exponential Multiplier",
    irr: "21.5% p.a. potential",
    yieldRate: "Capital Growth Focus",
    ticket: "₹2 Cr – ₹12 Cr",
    timeframe: "5 – 8 Years",
    liquidity: "Strategic Lock",
    desc: "Strategic land and commercial developments adjacent to Asia's largest greenfield airport. Benefiting from multi-modal logistics, bullet train links, and Film City.",
    drivers: "Inaugural commercial flight milestone, semiconductor fabrication clusters, multi-modal hub.",
    mitigant: "Government statutory master-plan clearance, direct Yamuna Expressway frontage."
  },
  {
    num: "06",
    category: "Allocations",
    title: "Pre-Launch Builder Allocations & Underwrites",
    badge: "Discretionary Tranche",
    irr: "Preferential Tranche Pricing",
    yieldRate: "Instant 15-20% Equity Discount",
    ticket: "₹4 Cr – ₹10 Cr",
    timeframe: "2 – 4 Years",
    liquidity: "Strategic Lock",
    desc: "Private investor preview rounds negotiated directly with Tier-1 developer chairmen. Secures the highest-appreciation inventory before public media marketing launches.",
    drivers: "First-mover price advantage, customized subvention payment plans, preferential unit picking.",
    mitigant: "Guaranteed buy-back option / priority exit clauses drafted with developer board."
  }
];

export default function InvestmentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredAssets = activeFilter === "All"
    ? assetClasses
    : assetClasses.filter(a => a.category === activeFilter);

  return (
    <main className="bg-[#040805] text-[#e5e9e6] min-h-screen pb-24">
      {/* 1. LUXURY HERO BANNER */}
      <div className="relative border-b border-[#c6a15b]/25 bg-gradient-to-b from-[#08150e] via-[#050e09] to-[#040805] py-16 sm:py-20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#c6a15b]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-cinzel font-semibold mb-3">
            <Sparkles size={14} />
            <span>Strategic Asset Allocation · Wealth Preservation Desk</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-5 leading-tight">
            Invest with <em>mathematical intelligence.</em>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            Institutional-grade underwriting benchmarks for family offices, NRI capital, and ultra-high-net-worth individuals. We filter out the noise and curate asset classes with verified title deeds, sovereign infrastructure catalysts, and superior liquidity profiles.
          </p>

          {/* Institutional Macro Benchmarks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t border-white/10">
            <div className="p-4 bg-white/[0.02] border border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                Expressway Corridor Inflow
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                ₹42,000<span className="text-[#c6a15b] text-xl">+ Cr</span>
              </p>
              <span className="text-[10px] text-emerald-400 font-medium mt-1 block">
                ↑ Institutional & FDI Inflows
              </span>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                Average 3-Yr Capital CAGR
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                15.4<span className="text-[#c6a15b] text-xl">%</span>
              </p>
              <span className="text-[10px] text-gray-400 block mt-1">
                Sectors 94, 128, 146 & 150
              </span>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                Grade-A Net Rental Yields
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                8.5 – 9.4<span className="text-[#c6a15b] text-xl">%</span>
              </p>
              <span className="text-[10px] text-emerald-400 font-medium mt-1 block">
                Top IT/Corporate Corridors
              </span>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                Title Diligence Standard
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#dfc17b]">
                100<span className="text-white text-xl">%</span>
              </p>
              <span className="text-[10px] text-gray-400 block mt-1">
                UP RERA & Encumbrance-Free
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-[#c6a15b]" />
            <span className="text-xs uppercase tracking-[0.2em] font-cinzel font-semibold text-white">
              Curated Asset Classes
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "All", label: "All Asset Classes" },
              { id: "Residential", label: "Sky Mansions & Estates" },
              { id: "Commercial", label: "Grade-A Offices & Retail" },
              { id: "Land", label: "Greenfield Land" },
              { id: "Allocations", label: "Pre-Launch Tranches" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? "gold-btn-luxury text-[#07100b] font-bold shadow-[0_2px_12px_rgba(198,161,91,0.35)]"
                    : "bg-[#09150e]/90 text-gray-300 border border-white/10 hover:border-[#c6a15b]/40 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. ASSET CLASSES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {filteredAssets.map((item) => (
            <article
              key={item.num}
              className="luxury-card p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-start gap-2 mb-4">
                  <span className="font-serif text-3xl text-[#c6a15b] font-normal group-hover:scale-110 transition-transform">
                    {item.num}
                  </span>
                  <div className="text-right">
                    <span className="bg-[#c6a15b]/15 text-[#dfc17b] border border-[#c6a15b]/30 px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold block">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono mt-1 block">
                      Liquidity: <strong className="text-white">{item.liquidity}</strong>
                    </span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl text-white mb-2 group-hover:text-[#dfc17b] transition-colors">
                  {item.title}
                </h2>
                
                <p className="text-xs text-gray-300 leading-relaxed font-light mb-5">
                  {item.desc}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#040805] border border-white/10 text-xs">
                  <div>
                    <span className="text-gray-400 text-[9.5px] uppercase tracking-wider block">Target Return / IRR</span>
                    <strong className="text-[#dfc17b] text-sm font-semibold">{item.irr}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[9.5px] uppercase tracking-wider block">Yield / Cashflow</span>
                    <strong className="text-white text-sm font-semibold">{item.yieldRate}</strong>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-gray-400 text-[9.5px] uppercase tracking-wider block">Ticket Window</span>
                    <strong className="text-white font-medium">{item.ticket}</strong>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-gray-400 text-[9.5px] uppercase tracking-wider block">Horizon</span>
                    <strong className="text-white font-medium">{item.timeframe}</strong>
                  </div>
                </div>

                {/* Growth Catalyst & Mitigant */}
                <div className="mt-4 space-y-2 text-[11px] text-gray-400">
                  <p>
                    <strong className="text-gray-200">Growth Catalyst:</strong> {item.drivers}
                  </p>
                  <p className="text-emerald-400/90 flex items-start gap-1.5">
                    <ShieldCheck size={14} className="shrink-0 mt-0.5" />
                    <span><strong>Risk Mitigant:</strong> {item.mitigant}</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAsset(item.title);
                    setModalOpen(true);
                  }}
                  className="w-full gold-btn-luxury py-2.5 text-xs font-bold cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText size={14} />
                  <span>Request Allocation Dossier ↗</span>
                </button>

                <a
                  href={`https://wa.me/919811055888?text=Hello%20InvestInPro,%20I%20would%20like%20to%20receive%20the%20investment%20memo%20for%20${encodeURIComponent(item.title)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full outline-btn-luxury py-2 text-[11px] font-medium flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <MessageCircle size={13} className="text-[#25D366]" />
                  <span>Inquire via WhatsApp Desk</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* 4. THE 4-TIER DUE DILIGENCE MANDATE */}
        <div className="mt-20 p-8 sm:p-10 premium-surface border-[#c6a15b]/30">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c6a15b] font-cinzel font-semibold">
              The InvestInPro Mandate
            </span>
            <h3 className="font-serif text-3xl text-white font-normal mt-2">
              Our 4-Tier Family Office Due Diligence Protocol
            </h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Before any asset enters our private advisory book, it undergoes 60+ checkpoint statutory audits by leading real estate attorneys and financial analysts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-[#040805] border border-white/10">
              <div className="w-8 h-8 border border-[#c6a15b] flex items-center justify-center text-[#c6a15b] font-serif text-sm font-bold mb-3">
                1
              </div>
              <h4 className="text-sm font-serif text-white font-semibold mb-1">
                Registry & Title Authenticity
              </h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                30-year search title investigation, encumbrance certificate validation, and zero litigation assurance.
              </p>
            </div>

            <div className="p-4 bg-[#040805] border border-white/10">
              <div className="w-8 h-8 border border-[#c6a15b] flex items-center justify-center text-[#c6a15b] font-serif text-sm font-bold mb-3">
                2
              </div>
              <h4 className="text-sm font-serif text-white font-semibold mb-1">
                UP RERA Escrow Audit
              </h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                Verification that 70% of collection proceeds are locked exclusively into dedicated construction escrow accounts.
              </p>
            </div>

            <div className="p-4 bg-[#040805] border border-white/10">
              <div className="w-8 h-8 border border-[#c6a15b] flex items-center justify-center text-[#c6a15b] font-serif text-sm font-bold mb-3">
                3
              </div>
              <h4 className="text-sm font-serif text-white font-semibold mb-1">
                Micro-Market Supply Density
              </h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                Macro demographic study analyzing absorption velocities, corporate headcounts, and rental yields within a 5-km radius.
              </p>
            </div>

            <div className="p-4 bg-[#040805] border border-white/10">
              <div className="w-8 h-8 border border-[#c6a15b] flex items-center justify-center text-[#c6a15b] font-serif text-sm font-bold mb-3">
                4
              </div>
              <h4 className="text-sm font-serif text-white font-semibold mb-1">
                Guaranteed Exit Structuring
              </h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                Pre-agreed resale liquidation windows and secondary market syndication network across 1,200+ active HNI family offices.
              </p>
            </div>
          </div>
        </div>

        {/* 5. INTERACTIVE ROI CALCULATOR CALLOUT */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[#0d1f14] to-[#08120b] border border-[#c6a15b]/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#c6a15b] font-cinzel uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Interactive Financial Modeling</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Model your 10-Year Compounding Returns & Yield
            </h3>
            <p className="text-xs text-gray-300 mt-1.5 max-w-xl leading-relaxed font-light">
              Simulate loan EMI, tax deductions under Section 24b, and capital appreciation curves customized to Sector 94, Sector 128, and Sector 150.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/calculator"
              className="gold-btn-luxury px-6 py-3.5 text-xs text-center font-bold"
            >
              Launch Financial Simulator ↗
            </Link>
            <Link
              href="/vault"
              className="outline-btn-luxury px-6 py-3.5 text-xs text-center font-medium flex items-center justify-center gap-1.5"
            >
              <Lock size={12} className="text-[#c6a15b]" />
              <span>Enter Private Vault</span>
            </Link>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty={`Strategic Allocation: ${selectedAsset}`}
      />
    </main>
  );
}
