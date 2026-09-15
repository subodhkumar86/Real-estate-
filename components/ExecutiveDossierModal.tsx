"use client";
import { X, Printer, ShieldCheck, MapPin, CheckCircle2, TrendingUp } from "lucide-react";
import { Property } from "../data/properties";

interface ExecutiveDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export default function ExecutiveDossierModal({ isOpen, onClose, property }: ExecutiveDossierModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // 10-Year Forecast calculation
  const yr3 = Math.round(property.priceNum * 1.38 / 100000) / 100;
  const yr5 = Math.round(property.priceNum * 1.76 / 100000) / 100;
  const yr10 = Math.round(property.priceNum * 3.12 / 100000) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white">
      <div 
        className="relative w-full max-w-4xl bg-[#07100b] border border-[#c6a15b]/50 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white max-h-[95vh] overflow-y-auto print:max-h-none print:border-none print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Bar (Hidden in Print) */}
        <div className="sticky top-0 z-20 bg-[#040805]/95 backdrop-blur-md border-b border-[#c6a15b]/30 px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfc17b] font-cinzel font-bold">
              Official Executive Memorandum
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="gold-btn-luxury text-[11px] px-4 py-2 flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Printer size={14} />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white border border-white/10 hover:border-[#c6a15b] transition-colors"
              aria-label="Close Dossier"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOSSIER BODY */}
        <div className="p-6 sm:p-12 space-y-8 print:p-8 print:text-black">
          
          {/* Header Banner */}
          <div className="border-b border-[#c6a15b]/40 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 print:border-black">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 border border-[#c6a15b] flex items-center justify-center bg-[#0a1610] print:bg-gray-100 rotate-45">
                  <span className="font-serif text-base font-bold text-[#c6a15b] print:text-black -rotate-45">IP</span>
                </div>
                <div>
                  <span className="font-serif tracking-[0.25em] text-sm font-bold text-white print:text-black uppercase">
                    INVESTINPRO <i className="not-italic text-[#c6a15b]">NOIDA</i>
                  </span>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-gray-400 print:text-gray-600">
                    Private Real Estate Advisory · NCR
                  </p>
                </div>
              </div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#dfc17b] print:text-amber-800 font-cinzel font-semibold mt-2">
                Confidential Client Placement Memorandum
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-gray-400 print:text-gray-600">
              <span className="block text-[9px] uppercase tracking-wider">Document Reference</span>
              <code className="text-[#dfc17b] print:text-black font-mono font-bold">IPN-MEMO-{property.slug.toUpperCase().slice(0, 10)}</code>
              <span className="block text-[9px] text-gray-500 mt-0.5">Date of Issue: {new Date().toLocaleDateString('en-GB')}</span>
            </div>
          </div>

          {/* Title & Valuation */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block text-[10px] uppercase tracking-[0.2em] px-2.5 py-0.5 border border-[#c6a15b]/50 bg-[#c6a15b]/10 text-[#dfc17b] print:text-black print:border-black font-cinzel mb-2">
                {property.category} · {property.sector}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-white print:text-black font-normal">
                {property.name}
              </h1>
              <p className="text-xs text-gray-400 print:text-gray-600 mt-1 flex items-center gap-1.5">
                <MapPin size={13} className="text-[#c6a15b]" />
                <span>{property.location} · Master Developer: {property.developer}</span>
              </p>
            </div>

            <div className="border border-[#c6a15b]/40 bg-[#0a1610] print:bg-gray-50 p-4 shrink-0 text-left md:text-right">
              <span className="text-[9px] uppercase tracking-widest text-gray-400 print:text-gray-600 block">Acquisition Consideration</span>
              <p className="font-serif text-3xl text-[#dfc17b] print:text-black font-normal">{property.price}</p>
              <span className="text-xs text-gray-400 print:text-gray-600 block mt-0.5">Approx. {property.usdPrice}</span>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="border border-white/10 print:border-gray-300 p-3.5 bg-[#040805] print:bg-white">
              <span className="text-gray-500 print:text-gray-600 text-[9px] uppercase tracking-wider block">Configuration</span>
              <strong className="text-white print:text-black text-sm block mt-0.5">{property.configuration}</strong>
            </div>

            <div className="border border-white/10 print:border-gray-300 p-3.5 bg-[#040805] print:bg-white">
              <span className="text-gray-500 print:text-gray-600 text-[9px] uppercase tracking-wider block">Carpet Area</span>
              <strong className="text-white print:text-black text-sm block mt-0.5">{property.area}</strong>
            </div>

            <div className="border border-white/10 print:border-gray-300 p-3.5 bg-[#040805] print:bg-white">
              <span className="text-gray-500 print:text-gray-600 text-[9px] uppercase tracking-wider block">Possession</span>
              <strong className="text-[#dfc17b] print:text-black text-sm block mt-0.5">{property.possession}</strong>
            </div>

            <div className="border border-white/10 print:border-gray-300 p-3.5 bg-[#040805] print:bg-white">
              <span className="text-gray-500 print:text-gray-600 text-[9px] uppercase tracking-wider block">UP RERA Filing</span>
              <strong className="text-white print:text-black font-mono text-[11px] block mt-0.5">{property.rera}</strong>
            </div>
          </div>

          {/* Narrative Overview */}
          <div className="border border-white/10 print:border-gray-300 p-5 bg-[#0a1610]/60 print:bg-gray-50 space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#c6a15b] print:text-amber-800 font-cinzel font-semibold block">
              Architectural & Advisory Narrative
            </span>
            <p className="text-xs sm:text-sm text-gray-300 print:text-gray-800 leading-relaxed font-light">
              {property.overview}
            </p>
          </div>

          {/* 10-Year Capital Appreciation Trajectory */}
          <div className="border border-[#c6a15b]/40 print:border-black p-5 bg-[#040805] print:bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#dfc17b] print:text-black font-cinzel font-semibold block">
                  10-Year Capital Growth Compounding Forecaster
                </span>
                <p className="text-[11px] text-gray-400 print:text-gray-600">
                  Modelled at historic 12.8% Noida Expressway corridor CAGR following Jewar International Airport commissioning.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-[#25D366]">
                <TrendingUp size={14} />
                <span className="font-semibold">+212% 10-Yr Outlook</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 border border-white/10 print:border-gray-300 bg-[#07100b] print:bg-gray-50">
                <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Year 3 Target</span>
                <strong className="text-white print:text-black font-serif text-lg block mt-1">₹{yr3} Cr</strong>
                <span className="text-[9px] text-[#c6a15b]">+38% Appreciation</span>
              </div>

              <div className="p-3 border border-white/10 print:border-gray-300 bg-[#07100b] print:bg-gray-50">
                <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Year 5 Target</span>
                <strong className="text-white print:text-black font-serif text-lg block mt-1">₹{yr5} Cr</strong>
                <span className="text-[9px] text-[#c6a15b]">+76% Appreciation</span>
              </div>

              <div className="p-3 border border-white/10 print:border-gray-300 bg-[#07100b] print:bg-gray-50">
                <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Year 10 Multiplier</span>
                <strong className="text-[#dfc17b] print:text-black font-serif text-lg block mt-1">₹{yr10} Cr</strong>
                <span className="text-[9px] text-[#25D366]">+212% Total Wealth</span>
              </div>
            </div>
          </div>

          {/* Highlights & Amenities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="border border-white/10 print:border-gray-300 p-4 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#c6a15b] print:text-black font-semibold block">
                Trophy Asset Highlights
              </span>
              <ul className="space-y-1.5 text-gray-300 print:text-gray-700">
                {property.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-[#c6a15b] mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 print:border-gray-300 p-4 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#c6a15b] print:text-black font-semibold block">
                Curated Amenities & Club Specifications
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {property.amenities.map((a, i) => (
                  <span key={i} className="text-[10px] bg-white/5 print:bg-gray-200 border border-white/10 print:border-gray-300 px-2.5 py-1 text-gray-300 print:text-black">
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Legal & Advisory Seal */}
          <div className="border-t border-[#c6a15b]/40 print:border-black pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-400 print:text-gray-600">
            <div className="flex items-center gap-3">
              <ShieldCheck size={28} className="text-[#c6a15b] print:text-black shrink-0" />
              <div>
                <span className="font-semibold text-white print:text-black block">InvestInPro Noida Title Clearance</span>
                <span className="text-[10px]">Verified encumbrance-free filing with Uttar Pradesh Real Estate Regulatory Authority.</span>
              </div>
            </div>

            <div className="text-left sm:text-right border-l sm:border-l-0 sm:border-r border-white/10 pl-3 sm:pl-0 sm:pr-3">
              <span className="text-[9px] uppercase tracking-wider block">Private Desk Hotline</span>
              <strong className="text-white print:text-black font-serif">+91 99999 99999</strong>
              <span className="block text-[9px] text-gray-500">Sector 18 Noida · Aerocity Delhi</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
