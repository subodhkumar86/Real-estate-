"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, CheckCircle2, Shield, MapPin, Phone, Lock } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  if (pathname === "/admin") return null;

  return (
    <footer className="bg-[#050b07] text-white border-t border-[#c6a15b]/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c6a15b]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#c6a15b] flex items-center justify-center text-[#c6a15b] font-serif text-2xl font-bold bg-[#0a1610]">
                I
              </div>
              <div>
                <span className="font-serif tracking-[0.2em] text-lg font-semibold text-white uppercase">
                  INVESTINPRO <i className="not-italic text-[#c6a15b] text-xs font-light">NOIDA</i>
                </span>
                <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400">
                  Intelligent Real Estate · Exceptional Addresses
                </p>
              </div>
            </Link>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm pt-2">
              Noidas preeminent private real estate advisory. Curating verified, high-conviction residential sky mansions and Grade-A commercial assets for HNIs, NRIs, and institutional family offices.
            </p>

            {/* Accreditations */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-[#c6a15b]" />
                <span>100% UP RERA Registered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock size={14} className="text-[#c6a15b]" />
                <span>Encumbrance-Free Shortlists</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#c6a15b] font-semibold">
              The Collection
            </p>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/properties" className="hover:text-[#c6a15b] transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Residential" className="hover:text-[#c6a15b] transition-colors">
                  Luxury Residences & Penthouses
                </Link>
              </li>
              <li>
                <Link href="/properties?type=Commercial" className="hover:text-[#c6a15b] transition-colors">
                  Grade-A Office Suites & Retail
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#c6a15b] transition-colors">
                  Iconic Projects & Launches
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#c6a15b] transition-colors">
                  Micro-Market Intelligence
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#c6a15b] transition-colors">
                  Your Private Wishlist
                </Link>
              </li>
              <li>
                <Link href="/vault" className="text-[#dfc17b] hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <span>The Private Vault 🔒</span>
                  <span className="text-[9px] bg-[#c6a15b]/20 text-[#dfc17b] px-1.5 py-0.5 border border-[#c6a15b]/40">OFF-MARKET</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Advisory & Tools */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#c6a15b] font-semibold">
              Advisory & Tools
            </p>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/calculator" className="hover:text-[#c6a15b] transition-colors">
                  Mortgage & ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#c6a15b] transition-colors">
                  Property Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#c6a15b] transition-colors">
                  Market Insights & Research
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#c6a15b] transition-colors">
                  The InvestInPro Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#c6a15b] transition-colors">
                  Private Client Lounges
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#c6a15b] transition-colors text-gray-500">
                  Advisor Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Lounges & Newsletter */}
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#c6a15b] font-semibold">
              Private Lounges
            </p>
            
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#c6a15b] shrink-0 mt-0.5" />
                <div>
                  <b className="text-white block font-normal">Noida Executive Suite:</b>
                  <span>Level 8, Sector 18 Commercial Center, Noida 201301</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#c6a15b] shrink-0 mt-0.5" />
                <div>
                  <b className="text-white block font-normal">Delhi Diplomatic Lounge:</b>
                  <span>Worldmark 1, Aerocity, New Delhi 110037</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-[#c6a15b]" />
                  <a href="tel:+919811055888" className="hover:text-[#c6a15b] transition-colors">
                    +91 98110 55888 (Senior Partner Desk)
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-[11px] text-gray-400 pl-6">
                  <a href="tel:+911204587000" className="hover:text-white transition-colors">
                    +91 (0120) 458-7000 (Board Line)
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                Private Market Briefing (Monthly)
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#101b15] border border-white/15 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c6a15b] w-full"
                />
                <button
                  type="submit"
                  className="gold-btn-luxury px-3.5 py-2 font-bold text-xs cursor-pointer"
                  title="Subscribe"
                >
                  <ArrowUpRight size={14} />
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#c6a15b] mt-2">
                  <CheckCircle2 size={13} />
                  <span>Subscribed to private market intelligence.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legal Disclaimers & RERA notice */}
        <div className="pt-8 text-[11px] text-gray-500 leading-relaxed space-y-3">
          <p>
            <strong className="text-gray-400">RERA Compliance & Advisory Protocol:</strong> InvestInPro Noida is a premier institutional private real estate advisory firm (UP RERA Registered Consultant No: <span className="text-[#dfc17b]">UPRERAAGT10294/2024</span>). All curated properties listed on this platform are registered with the Uttar Pradesh Real Estate Regulatory Authority. We represent private wealth clients, NRIs, and institutional family offices under strict fiduciary discretion.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5 text-gray-400">
            <div>
              © 2026 InvestInPro Noida. All rights reserved. RERA Agent: UPRERAAGT10294 · invesstinpronoida.com
            </div>
            <div className="flex gap-6 text-xs">
              <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-300 cursor-pointer">Terms of Advisory</span>
              <span className="hover:text-gray-300 cursor-pointer">UP RERA Certificates</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
