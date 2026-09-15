"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  MessageCircle, 
  Phone, 
  Car, 
  Lock, 
  ShieldCheck, 
  X, 
  Sparkles, 
  ArrowUpRight,
  Clock
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

export default function FloatingContact() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMeetingType, setSelectedMeetingType] = useState("Private Chauffeur Site Tour");
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on escape or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Hide completely in admin
  if (pathname === "/admin") return null;

  const handleOpenChauffeurBooking = () => {
    setSelectedMeetingType("Private Chauffeur Site Tour");
    setIsOpen(false);
    setModalOpen(true);
  };

  const handleOpenPrivateCall = () => {
    setSelectedMeetingType("Confidential Video / Phone Advisory");
    setIsOpen(false);
    setModalOpen(true);
  };

  return (
    <>
      <div 
        ref={popoverRef}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-3 select-none"
      >
        {/* EXPANDABLE LUXURY CONCIERGE SUITE POPOVER */}
        {isOpen && (
          <div 
            className="w-[calc(100vw-2rem)] max-w-[360px] max-h-[min(680px,calc(100svh-6rem))] overflow-y-auto overscroll-contain bg-[#07100b]/98 backdrop-blur-2xl border border-[#c6a15b]/50 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_30px_rgba(198,161,91,0.15)] p-4 sm:p-5 text-white animate-fadeIn relative mb-1"
            role="dialog"
            aria-label="VIP Concierge Desk"
          >
            {/* Corner Luxury Accent Marks */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#c6a15b]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#c6a15b]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#c6a15b]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#c6a15b]" />

            {/* Header with Close */}
            <div className="flex items-start justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 border border-[#c6a15b] flex items-center justify-center bg-[#040805] rotate-45 shadow-[0_0_12px_rgba(198,161,91,0.25)]">
                  <span className="font-serif text-xs font-bold text-[#c6a15b] -rotate-45">IP</span>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
                    VIP Concierge Desk
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-medium">
                      Senior Partner Online
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close concierge"
              >
                <X size={18} />
              </button>
            </div>

            {/* Advisory Subtitle */}
            <p className="text-[11px] text-gray-300 font-light leading-relaxed my-3.5 bg-white/[0.03] p-2.5 border-l border-[#c6a15b]/40">
              Discreet real estate advisory for Noida sky mansions, golf estates, and Grade-A commercial portfolios. Zero brokerage for HNIs and institutional family offices.
            </p>

            {/* Action Grid */}
            <div className="space-y-2">
              {/* 1. Direct WhatsApp Desk */}
              <a
                href="https://wa.me/919811055888?text=Hello%20InvestInPro%20Noida%20Concierge,%20I%20am%20interested%20in%20exploring%20exclusive%20luxury%20properties%20and%20penthouses."
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-2.5 bg-[#102419] hover:bg-[#153122] border border-[#25D366]/40 hover:border-[#25D366] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#040805] text-[#25D366] border border-[#25D366]/40 group-hover:scale-105 transition-transform">
                    <MessageCircle size={15} className="fill-[#25D366]/20" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      Direct WhatsApp Desk
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Immediate response · Floorplans & Pricing Memos
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* 2. Schedule Chauffeur Inspection */}
              <button
                type="button"
                onClick={handleOpenChauffeurBooking}
                className="w-full group flex items-center justify-between p-2.5 bg-[#0d1c13] hover:bg-[#142a1d] border border-[#c6a15b]/30 hover:border-[#c6a15b] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#040805] text-[#dfc17b] border border-[#c6a15b]/30 group-hover:scale-105 transition-transform">
                    <Car size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white group-hover:text-[#dfc17b] transition-colors">
                      Private Chauffeur Site Escort
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Complimentary Maybach / E-Class pickup across NCR
                    </p>
                  </div>
                </div>
                <Sparkles size={14} className="text-[#c6a15b]" />
              </button>

              {/* 3. The Private Off-Market Vault */}
              <Link
                href="/vault"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-2.5 bg-[#09140e] hover:bg-[#0f2117] border border-white/10 hover:border-[#c6a15b]/60 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#040805] text-[#dfc17b] border border-white/10 group-hover:border-[#c6a15b]/50 group-hover:scale-105 transition-transform">
                    <Lock size={15} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-white group-hover:text-[#dfc17b] transition-colors">
                        The Private Vault
                      </p>
                      <span className="text-[8px] bg-[#c6a15b]/20 text-[#dfc17b] px-1 py-0.2 border border-[#c6a15b]/40 font-bold uppercase">
                        Off-Mkt
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400">
                      ₹20 Cr+ Trophy assets under NDA protection
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-gray-400 group-hover:text-[#c6a15b] transition-colors" />
              </Link>

              {/* 4. Confidential Call Hotline */}
              <div className="flex items-center justify-between pt-2 px-1 text-xs">
                <a
                  href="tel:+919811055888"
                  className="flex items-center gap-1.5 text-gray-300 hover:text-[#dfc17b] transition-colors font-medium text-[11px]"
                >
                  <Phone size={13} className="text-[#c6a15b]" />
                  <span>+91 98110 55888</span>
                </a>
                <button
                  type="button"
                  onClick={handleOpenPrivateCall}
                  className="text-[10px] text-[#c6a15b] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Request Callback
                </button>
              </div>
            </div>

            {/* Footer Trust Bar */}
            <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[9.5px] text-gray-400">
              <div className="flex items-center gap-1 text-[#c6a15b]">
                <ShieldCheck size={12} />
                <span>UP RERA Verified Advisory</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock size={11} />
                <span>24/7 VIP Concierge</span>
              </div>
            </div>
          </div>
        )}

        {/* FLOATING TRIGGER PILL */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle luxury concierge desk"
          className={`group flex h-12 w-12 lg:h-auto lg:w-auto items-center justify-center gap-2.5 lg:px-4 lg:py-2.5 border shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(198,161,91,0.2)] transition-all cursor-pointer ${
            isOpen
              ? "bg-[#c6a15b] text-[#040805] border-[#c6a15b] scale-105"
              : "bg-[#07100b]/95 hover:bg-[#0c1c13] text-white border-[#c6a15b]/50 hover:border-[#c6a15b] hover:shadow-[0_15px_45px_rgba(198,161,91,0.3)]"
          }`}
        >
          {/* Pulsating Indicator */}
          <span className="relative hidden lg:flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isOpen ? "bg-[#040805]" : "bg-[#c6a15b]"
            }`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isOpen ? "bg-[#040805]" : "bg-[#c6a15b]"
            }`} />
          </span>

          <div className="hidden lg:flex items-center gap-2">
            <span className="font-serif text-sm font-bold tracking-wider uppercase">
              VIP Concierge
            </span>
            <span className="hidden sm:inline text-[9px] uppercase tracking-widest px-1.5 py-0.5 border border-[#c6a15b]/40 bg-black/30 text-[#dfc17b]">
              Direct Desk
            </span>
          </div>

          <MessageCircle 
            size={16} 
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90 text-[#040805]" : "text-[#dfc17b] group-hover:scale-110"
            }`} 
          />
        </button>
      </div>

      {/* REUSABLE CONSULTATION MODAL INTEGRATION */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty={selectedMeetingType}
      />
    </>
  );
}
