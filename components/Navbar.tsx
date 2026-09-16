"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Heart, 
  Menu, 
  X, 
  ArrowUpRight, 
  Lock, 
  ChevronDown, 
  Calculator, 
  Scale, 
  BookOpen, 
  ShieldCheck, 
  Phone, 
  Sparkles
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advisoryOpen, setAdvisoryOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync wishlist count from localStorage
  useEffect(() => {
    const updateWishlist = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('investinpro-wishlist-slugs') || '[]');
        setWishlistCount(saved.length);
      } catch {
        setWishlistCount(0);
      }
    };
    updateWishlist();
    window.addEventListener('storage', updateWishlist);
    window.addEventListener('wishlist-updated', updateWishlist);

    let scrollFrame = 0;
    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        scrollFrame = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Close advisory dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAdvisoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener('storage', updateWishlist);
      window.removeEventListener('wishlist-updated', updateWishlist);
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keep the page fixed while the concierge drawer is open and support Escape to close it.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const primaryLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'Projects', href: '/projects' },
    { name: 'Locations', href: '/locations' },
    { name: 'Insights', href: '/insights' },
  ];

  const advisoryItems = [
    {
      title: 'Mortgage & ROI Simulator',
      desc: 'Cashflow forecaster & 10-yr capital growth compounding',
      href: '/calculator',
      icon: Calculator,
    },
    {
      title: 'Portfolio Compare Matrix',
      desc: 'Side-by-side technical specification analysis',
      href: '/compare',
      icon: Scale,
    },
    {
      title: 'Market Insights & Research',
      desc: 'Quarterly macroeconomic whitepapers & corridor reports',
      href: '/insights',
      icon: BookOpen,
    },
    {
      title: 'The Advisory Methodology',
      desc: 'Our 4-tier due diligence & private client offices',
      href: '/about',
      icon: ShieldCheck,
    },
  ];

  const isAdvisoryActive = ['/calculator', '/compare', '/insights', '/about'].some(p => pathname.startsWith(p));

  // The admin console owns its own authenticated header. Rendering the public
  // navigation here as well creates a confusing double-header experience.
  if (pathname === "/admin") return null;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#040805]/95 backdrop-blur-xl py-3 border-b border-[#c6a15b]/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]' 
            : 'bg-gradient-to-b from-[#040805]/95 via-[#040805]/80 to-transparent py-4 border-b border-[#c6a15b]/15'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* 1. ROYAL CREST BRAND LOGO */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 border border-[#c6a15b] flex items-center justify-center bg-[#07100b] shadow-[0_0_15px_rgba(198,161,91,0.25)] group-hover:border-[#dfc17b] group-hover:shadow-[0_0_20px_rgba(198,161,91,0.45)] transition-all rotate-45">
              <span className="font-serif text-base font-bold text-[#c6a15b] -rotate-45 tracking-tighter">
                IP
              </span>
              <div className="absolute inset-0 border border-[#c6a15b]/30 scale-75 pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif tracking-[0.25em] text-sm sm:text-base font-semibold text-white uppercase group-hover:text-[#dfc17b] transition-colors">
                  INVESTINPRO
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#c6a15b] border border-[#c6a15b]/40 px-1 py-0.2 font-cinzel font-semibold">
                  NOIDA
                </span>
              </div>
              <p className="text-[7.5px] uppercase tracking-[0.3em] text-gray-400 hidden sm:block mt-0.5 font-light">
                Private Real Estate Advisory
              </p>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION (CLEAN, PROPORTIONED, NO OVERFLOW) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {primaryLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11.5px] uppercase tracking-[0.18em] transition-all relative py-1 font-medium ${
                    active
                      ? 'text-[#dfc17b] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#c6a15b]'
                      : 'text-gray-300 hover:text-white hover:tracking-[0.2em]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Advisory Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setAdvisoryOpen(true)}
              onMouseLeave={() => setAdvisoryOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAdvisoryOpen(!advisoryOpen)}
                className={`text-[11.5px] uppercase tracking-[0.18em] transition-all py-1 flex items-center gap-1.5 font-medium cursor-pointer ${
                  isAdvisoryActive || advisoryOpen
                    ? 'text-[#dfc17b] font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>Tools</span>
                <ChevronDown 
                  size={13} 
                  className={`transition-transform duration-300 text-[#c6a15b] ${advisoryOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu Box */}
              {advisoryOpen && (
                <div className="absolute top-full -left-6 pt-3 w-80 z-50 animate-fadeIn">
                  <div className="bg-[#07100b]/95 backdrop-blur-2xl border border-[#c6a15b]/40 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#c6a15b] font-cinzel font-semibold px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                      <span>Investment Tools</span>
                      <Sparkles size={10} />
                    </div>

                    <div className="space-y-1">
                      {advisoryItems.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = pathname === item.href;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setAdvisoryOpen(false)}
                            className={`flex items-start gap-3 p-2.5 transition-all group/item ${
                              isCurrent 
                                ? 'bg-[#c6a15b]/15 border-l-2 border-[#c6a15b]' 
                                : 'hover:bg-white/5 border-l-2 border-transparent hover:border-[#c6a15b]'
                            }`}
                          >
                            <div className="p-1.5 bg-[#040805] border border-white/10 group-hover/item:border-[#c6a15b] transition-colors mt-0.5 shrink-0">
                              <Icon size={14} className="text-[#dfc17b]" />
                            </div>
                            <div>
                              <p className="text-xs text-white font-medium group-hover/item:text-[#dfc17b] transition-colors">
                                {item.title}
                              </p>
                              <p className="text-[10px] text-gray-400 leading-tight mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* The Private Vault (Sleek Gold Badge) */}
            <Link
              href="/vault"
              className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-all flex items-center gap-1.5 font-medium border ${
                pathname === '/vault'
                  ? 'bg-[#c6a15b] text-[#040805] border-[#c6a15b] font-bold shadow-[0_0_20px_rgba(198,161,91,0.4)]'
                  : 'text-[#dfc17b] border-[#c6a15b]/40 bg-[#c6a15b]/10 hover:bg-[#c6a15b] hover:text-[#040805] hover:border-[#c6a15b] shadow-[0_0_15px_rgba(198,161,91,0.15)]'
              }`}
            >
              <Lock size={11} className="shrink-0" />
              <span>Private Vault</span>
              <span className="text-[8px] bg-black/40 px-1 py-0.2 tracking-wider font-bold">
                OFF-MKT
              </span>
            </Link>
          </nav>

          {/* 3. RIGHT CONTROLS (ALWAYS FITS CLEANLY) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-300 hover:text-[#dfc17b] transition-colors"
              title="Saved Properties"
            >
              <Heart size={17} className={wishlistCount > 0 ? "fill-[#c6a15b] text-[#c6a15b]" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c6a15b] text-[#040805] text-[9px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* VIP Advisory CTA (Desktop) */}
            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] hover:from-[#faebd7] hover:to-[#dfc17b] text-[#07100b] font-bold text-[11px] uppercase tracking-[0.16em] px-4 py-2.5 items-center gap-1.5 cursor-pointer shadow-[0_3px_15px_rgba(198,161,91,0.3)] hover:shadow-[0_4px_20px_rgba(198,161,91,0.45)] hover:scale-[1.02] transition-all rounded-[2px]"
            >
              <span>VIP Advisory</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Hamburger / Extended Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-300 hover:text-[#dfc17b] border border-white/10 hover:border-[#c6a15b]/40 bg-[#07100b] transition-all cursor-pointer flex items-center gap-2"
              aria-label="Open Navigation Menu"
            >
              <Menu size={18} />
              <span className="hidden xl:inline text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-300">
                Menu
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 4. FULL-SCREEN LUXURY CONCIERGE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-md animate-fadeIn">
          {/* Backdrop click to close */}
          <div 
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <div className="w-full max-w-md sm:max-w-lg bg-[#07100b] border-l border-[#c6a15b]/40 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_80px_rgba(0,0,0,0.9)] animate-slideLeft">
            
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 border border-[#c6a15b] flex items-center justify-center bg-[#040805] rotate-45">
                    <span className="font-serif text-xs font-bold text-[#c6a15b] -rotate-45">IP</span>
                  </div>
                  <span className="font-serif tracking-[0.2em] text-xs font-semibold text-white uppercase">
                    INVESTINPRO <i className="not-italic text-[#c6a15b]">NOIDA</i>
                  </span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white border border-white/10 hover:border-[#c6a15b] transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Sections */}
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#c6a15b] font-cinzel font-semibold mb-3">
                    The Collection
                  </p>
                  <div className="space-y-2.5">
                    <Link
                      href="/properties"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base sm:text-lg font-serif text-gray-200 hover:text-[#dfc17b] transition-colors"
                    >
                      All Properties & Penthouses ↗
                    </Link>
                    <Link
                      href="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base sm:text-lg font-serif text-gray-200 hover:text-[#dfc17b] transition-colors"
                    >
                      Iconic Master Projects ↗
                    </Link>
                    <Link
                      href="/locations"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base sm:text-lg font-serif text-gray-200 hover:text-[#dfc17b] transition-colors"
                    >
                      Noida Growth Corridors ↗
                    </Link>
                    <Link
                      href="/vault"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 bg-[#0a1610] border border-[#c6a15b]/40 flex items-center justify-between text-[#dfc17b] hover:bg-[#c6a15b] hover:text-[#040805] transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <Lock size={15} />
                        <span className="font-serif text-base font-semibold">The Private Off-Market Vault</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-mono border border-current px-1.5 py-0.5">
                        LOCKED
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#c6a15b] font-cinzel font-semibold mb-3">
                    Advisory Tools & Intel
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <Link
                      href="/calculator"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 bg-[#040805] border border-white/10 hover:border-[#c6a15b] text-gray-300 hover:text-[#dfc17b] transition-all"
                    >
                      <Calculator size={16} className="text-[#c6a15b] mb-1.5" />
                      <span className="font-medium block">ROI & Mortgage Forecaster</span>
                    </Link>

                    <Link
                      href="/compare"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 bg-[#040805] border border-white/10 hover:border-[#c6a15b] text-gray-300 hover:text-[#dfc17b] transition-all"
                    >
                      <Scale size={16} className="text-[#c6a15b] mb-1.5" />
                      <span className="font-medium block">Property Comparison</span>
                    </Link>

                    <Link
                      href="/insights"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 bg-[#040805] border border-white/10 hover:border-[#c6a15b] text-gray-300 hover:text-[#dfc17b] transition-all"
                    >
                      <BookOpen size={16} className="text-[#c6a15b] mb-1.5" />
                      <span className="font-medium block">Market Whitepapers</span>
                    </Link>

                    <Link
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 bg-[#040805] border border-white/10 hover:border-[#c6a15b] text-gray-300 hover:text-[#dfc17b] transition-all"
                    >
                      <ShieldCheck size={16} className="text-[#c6a15b] mb-1.5" />
                      <span className="font-medium block">Advisory Methodology</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-[#dfc17b] py-1"
                  >
                    Private Client Lounges (Sector 18 & Aerocity) ↗
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-500 hover:text-gray-300 text-[11px] py-0.5"
                  >
                    Advisor Portal Login ↗
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer & VIP Direct Call */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="gold-btn-luxury w-full py-3 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Schedule Private Consultation</span>
                <ArrowUpRight size={14} />
              </button>

              <div className="p-3 bg-[#040805] border border-white/10 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#c6a15b]" />
                  <span>VIP Hotline:</span>
                </div>
                <a href="tel:+919999999999" className="text-white font-serif hover:text-[#dfc17b]">
                  +91 99999 99999
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIP Consultation Scheduler Modal */}
      <ConsultationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  );
}
