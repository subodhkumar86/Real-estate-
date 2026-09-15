"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CurrencyCode = "INR" | "USD" | "AED" | "GBP" | "EUR";

interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  rateToINR: number; // 1 Unit of Currency = X INR (e.g. 1 USD = 86.5 INR)
  label: string;
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyRate> = {
  INR: {
    code: "INR",
    symbol: "₹",
    rateToINR: 1,
    label: "INR (₹ Indian Rupee)",
    flag: "🇮🇳"
  },
  USD: {
    code: "USD",
    symbol: "$",
    rateToINR: 86.5,
    label: "USD ($ US Dollar)",
    flag: "🇺🇸"
  },
  AED: {
    code: "AED",
    symbol: "AED ",
    rateToINR: 23.55,
    label: "AED (د.إ UAE Dirham)",
    flag: "🇦🇪"
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    rateToINR: 109.2,
    label: "GBP (£ British Pound)",
    flag: "🇬🇧"
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    rateToINR: 91.8,
    label: "EUR (€ Euro)",
    flag: "🇪🇺"
  }
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (inrAmount: number) => string;
  formatPriceShort: (inrAmount: number) => string;
  currentRate: CurrencyRate;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("investinpro_currency") as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        // Client storage hydration intentionally updates state after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrencyState(saved);
      }
    } catch {
      // fallback to INR
    }
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("investinpro_currency", c);
    } catch {
      // ignore
    }
  };

  const currentRate = CURRENCIES[currency];

  const formatPrice = (inrAmount: number): string => {
    if (!inrAmount || isNaN(inrAmount)) return "Price on Request";

    if (currency === "INR") {
      if (inrAmount >= 10000000) {
        const cr = (inrAmount / 10000000).toFixed(2);
        return `₹${cr.replace(/\.00$/, "")} Cr`;
      }
      if (inrAmount >= 100000) {
        const lakh = (inrAmount / 100000).toFixed(2);
        return `₹${lakh.replace(/\.00$/, "")} Lakh`;
      }
      return `₹${inrAmount.toLocaleString("en-IN")}`;
    }

    // Convert to foreign currency
    const converted = inrAmount / currentRate.rateToINR;

    if (converted >= 1000000) {
      const m = (converted / 1000000).toFixed(2);
      return `${currentRate.symbol}${m.replace(/\.00$/, "")}M`;
    }
    if (converted >= 1000) {
      const k = (converted / 1000).toFixed(0);
      return `${currentRate.symbol}${k}K`;
    }
    return `${currentRate.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const formatPriceShort = (inrAmount: number): string => {
    return formatPrice(inrAmount);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        formatPriceShort,
        currentRate
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Fallback safe values if used outside provider
    return {
      currency: "INR" as CurrencyCode,
      setCurrency: () => {},
      formatPrice: (amt: number) => `₹${(amt / 10000000).toFixed(2)} Cr`,
      formatPriceShort: (amt: number) => `₹${(amt / 10000000).toFixed(2)} Cr`,
      currentRate: CURRENCIES.INR
    };
  }
  return context;
}
