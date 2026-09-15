"use client";
import React, { useState, useRef, useEffect } from "react";
import { useCurrency, CURRENCIES, CurrencyCode } from "../context/CurrencyContext";
import { ChevronDown, Globe } from "lucide-react";

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = CURRENCIES[currency];

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-200 bg-[#07130c]/90 hover:bg-[#0c1f14] border border-[#c6a15b]/30 hover:border-[#dfc17b]/60 rounded-[2px] transition-all cursor-pointer shadow-sm"
        title="Change Valuation Currency"
      >
        <span>{current.flag}</span>
        <span className="font-mono font-semibold text-[11px] text-[#dfc17b]">{current.code}</span>
        <ChevronDown size={11} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-[#08150f] border border-[#c6a15b]/40 rounded-[2px] shadow-2xl z-50 py-1 divide-y divide-white/5 animate-fadeIn">
          <div className="px-3 py-1.5 text-[9px] uppercase tracking-wider text-gray-400 font-medium">
            Select Currency
          </div>
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => {
            const item = CURRENCIES[c];
            const isSelected = currency === c;
            return (
              <button
                key={c}
                onClick={() => {
                  setCurrency(c);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected ? "bg-[#c6a15b]/20 text-[#dfc17b] font-bold" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.flag}</span>
                  <span className="font-medium">{item.code}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{item.symbol}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
