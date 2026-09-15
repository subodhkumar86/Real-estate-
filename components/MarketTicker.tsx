"use client";
import React from "react";
import { TrendingUp, ShieldCheck, Plane, Building2, Trees, Sparkles } from "lucide-react";

const tickerItems = [
  {
    icon: TrendingUp,
    highlight: "SECTOR 94 (DELHI GATEWAY)",
    metric: "₹28,500/SQ.FT",
    change: "▲ 14.8% YoY",
    positive: true
  },
  {
    icon: Building2,
    highlight: "SECTOR 128 (GOLF VISTA)",
    metric: "₹22,400/SQ.FT",
    change: "▲ 12.1% YoY",
    positive: true
  },
  {
    icon: Plane,
    highlight: "JEWAR INTL AIRPORT",
    metric: "COMMERCIAL TRIALS COMMENCED",
    change: "ON TRACK 2025",
    positive: true
  },
  {
    icon: Trees,
    highlight: "SECTOR 150 (SPORTS CITY)",
    metric: "80% GREEN CORRIDOR",
    change: "MASTERPLAN LOCKED",
    positive: true
  },
  {
    icon: ShieldCheck,
    highlight: "UP RERA COMPLIANCE",
    metric: "100% REGISTRATION MANDATE",
    change: "VERIFIED",
    positive: true
  },
  {
    icon: Sparkles,
    highlight: "GRADE-A LEASING",
    metric: "9.2% NET YIELD",
    change: "INSTITUTIONAL GRADE",
    positive: true
  }
];

export default function MarketTicker() {
  return (
    <div className="bg-[#040805] border-b border-[#c6a15b]/20 text-[10px] text-gray-400 py-1.5 px-4 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Live Indicator */}
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#dfc17b]">
            NCR Capital Terminal
          </span>
        </div>

        {/* Marquee ticker content */}
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar whitespace-nowrap text-xs">
          {tickerItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="inline-flex items-center gap-2 shrink-0">
                <Icon size={12} className="text-[#c6a15b]" />
                <span className="text-gray-300 font-medium tracking-wider text-[10.5px]">
                  {item.highlight}:
                </span>
                <span className="text-white font-semibold font-mono text-[10.5px]">
                  {item.metric}
                </span>
                <span className="text-emerald-400 text-[10px] font-semibold bg-emerald-950/40 px-1.5 py-0.5 rounded-[2px] border border-emerald-500/20">
                  {item.change}
                </span>
              </div>
            );
          })}
        </div>

        {/* Senior Partner Line */}
        <div className="hidden xl:flex items-center gap-2 shrink-0 pl-3 border-l border-white/10 text-[10px] text-gray-400">
          <span>Desk:</span>
          <a href="tel:+919811055888" className="text-[#dfc17b] hover:underline font-mono font-medium">
            +91 98110 55888
          </a>
        </div>
      </div>
    </div>
  );
}
