"use client";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

export default function PremiumSelect({ value, onChange, options, className = "" }: {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}
        className="premium-select-trigger w-full min-h-11 flex items-center justify-between gap-3 text-left text-sm text-white">
        <span className="truncate">{selected?.label}</span>
        <ChevronDown size={16} className={`shrink-0 text-[#c6a15b] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div role="listbox" className="premium-select-menu absolute left-0 right-0 top-[calc(100%+8px)] z-[80] p-1.5 animate-fadeIn">
          {options.map((option) => (
            <button type="button" role="option" aria-selected={option.value === value} key={option.value}
              onClick={() => { onChange(option.value); setOpen(false); }}
              className={`premium-select-option w-full flex items-center justify-between gap-3 px-3 py-3 text-left text-sm ${option.value === value ? "is-selected" : ""}`}>
              <span>{option.label}</span>
              {option.value === value && <Check size={15} className="shrink-0 text-[#dfc17b]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
