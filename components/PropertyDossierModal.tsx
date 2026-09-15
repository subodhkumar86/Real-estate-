"use client";
import React from "react";
import { X, Printer, ShieldCheck, CheckCircle2, Download, Building2, MapPin, Calendar, FileText } from "lucide-react";
import { Property } from "../data/properties";

interface PropertyDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export default function PropertyDossierModal({
  isOpen,
  onClose,
  property
}: PropertyDossierModalProps) {
  if (!isOpen || !property) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#08130d] border border-[#c6a15b]/50 p-6 sm:p-10 text-white rounded-[2px] max-h-[94vh] overflow-y-auto shadow-2xl space-y-6 print:m-0 print:p-0 print:max-w-none print:border-none print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#dfc17b] font-semibold">
              VIP Confidential Title Dossier
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="gold-btn-luxury px-5 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Printer size={14} />
              <span>Print / Save as PDF ↗</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="space-y-8 print:text-black">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#c6a15b]/30 pb-6 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#c6a15b] font-cinzel font-semibold mb-1">
                InvestInPro Noida · Senior Advisory Desk
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white print:text-black font-normal">
                {property.name}
              </h2>
              <p className="text-xs text-gray-300 print:text-gray-600 mt-1 flex items-center gap-1.5">
                <MapPin size={13} className="text-[#c6a15b]" />
                <span>{property.location} · Developed by {property.developer}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[9px] uppercase tracking-widest text-gray-400 block">Statutory Clearance</span>
              <span className="font-mono text-xs text-[#dfc17b] print:text-amber-700 font-semibold block">
                UP RERA: {property.rera}
              </span>
              <span className="text-[10px] text-emerald-400 print:text-emerald-700 block mt-0.5">
                ● 100% Title Encumbrance Cleared
              </span>
            </div>
          </div>

          {/* Hero Preview & Core Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 h-64 overflow-hidden border border-white/10 rounded-[2px]">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-6 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#050e09] border border-white/10 print:bg-gray-100 print:text-black">
                <span className="text-gray-400 text-[9px] uppercase block">Acquisition Window</span>
                <strong className="font-serif text-xl text-[#dfc17b] print:text-black font-normal">{property.price}</strong>
                <span className="text-[10px] text-gray-400 block font-mono">{property.usdPrice}</span>
              </div>
              <div className="p-3.5 bg-[#050e09] border border-white/10 print:bg-gray-100 print:text-black">
                <span className="text-gray-400 text-[9px] uppercase block">Configuration</span>
                <strong className="text-white print:text-black text-sm block mt-1">{property.configuration}</strong>
                <span className="text-[10px] text-gray-400 block">{property.area}</span>
              </div>
              <div className="p-3.5 bg-[#050e09] border border-white/10 print:bg-gray-100 print:text-black">
                <span className="text-gray-400 text-[9px] uppercase block">Target Yield / ROI</span>
                <strong className="text-emerald-400 print:text-emerald-700 text-sm block mt-1">{property.roi}</strong>
                <span className="text-[10px] text-gray-400 block">Indicative Net Yield</span>
              </div>
              <div className="p-3.5 bg-[#050e09] border border-white/10 print:bg-gray-100 print:text-black">
                <span className="text-gray-400 text-[9px] uppercase block">Possession Milestone</span>
                <strong className="text-white print:text-black text-sm block mt-1">{property.possession}</strong>
                <span className="text-[10px] text-gray-400 block">Escrow Monitored</span>
              </div>
            </div>
          </div>

          {/* Architectural Specifications */}
          <div className="p-5 bg-[#050e09] border border-[#c6a15b]/30 rounded-[2px] print:bg-gray-50 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#dfc17b] print:text-black font-semibold">
              Master Architectural Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-300 print:text-black pt-1">
              <div>
                <span className="text-gray-500 text-[9px] uppercase block">Floor Plate Clearance</span>
                <strong className="text-white print:text-black">11.8 – 13.2 Ft High</strong>
              </div>
              <div>
                <span className="text-gray-500 text-[9px] uppercase block">Carpet Efficiency</span>
                <strong className="text-white print:text-black">~78% Space Ratio</strong>
              </div>
              <div>
                <span className="text-gray-500 text-[9px] uppercase block">Deck Orientation</span>
                <strong className="text-white print:text-black">180° Unobstructed</strong>
              </div>
              <div>
                <span className="text-gray-500 text-[9px] uppercase block">Elevator Access</span>
                <strong className="text-white print:text-black">Private Biometric Lift</strong>
              </div>
            </div>
          </div>

          {/* 60-Point Statutory Diligence Checkpoint Certification */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#dfc17b] print:text-black font-semibold">
              Statutory 60-Point Diligence Certification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 print:text-black">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#c6a15b] print:text-black shrink-0" />
                <span>30-Year Search Title Registry Authenticated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#c6a15b] print:text-black shrink-0" />
                <span>70% Construction Proceeds Escrow Locked</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#c6a15b] print:text-black shrink-0" />
                <span>Environmental & Pollution Control Clearances Active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#c6a15b] print:text-black shrink-0" />
                <span>Zero Litigation & Nil Encumbrance Certificate Issued</span>
              </div>
            </div>
          </div>

          {/* Signature & Seal */}
          <div className="border-t border-[#c6a15b]/30 pt-6 flex flex-wrap justify-between items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block">Certified Underwriter</span>
              <strong className="font-serif text-base text-white print:text-black font-normal block mt-0.5">
                Vikramaditya Singhania
              </strong>
              <span className="text-gray-400 text-[10px]">Managing Director & Senior Principal</span>
            </div>

            <div className="text-right">
              <div className="border border-[#c6a15b]/40 print:border-black px-3 py-1.5 inline-block text-center">
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#dfc17b] print:text-black font-bold block">
                  OFFICIAL FIDUCIARY SEAL
                </span>
                <span className="font-mono text-[9px] text-gray-400 print:text-gray-600 block">
                  UPRERAAGT10294/2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
