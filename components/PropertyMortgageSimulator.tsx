"use client";
import React, { useState, useMemo } from "react";
import { Calculator, TrendingUp, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useCurrency } from "../context/CurrencyContext";

interface PropertyMortgageSimulatorProps {
  propertyName: string;
  priceNum: number;
  indicativeRoi: string; // e.g. "14.2% p.a."
}

export default function PropertyMortgageSimulator({
  propertyName,
  priceNum,
  indicativeRoi
}: PropertyMortgageSimulatorProps) {
  const { formatPrice } = useCurrency();
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const calculations = useMemo(() => {
    const loanAmount = priceNum * (1 - downPaymentPercent / 100);
    const downPaymentAmount = priceNum * (downPaymentPercent / 100);
    const r = interestRate / 1200;
    const n = tenureYears * 12;
    const emi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

    // Indicative gross monthly rental income (~3.8% rental yield for ultra-luxury residential)
    const estimatedMonthlyRent = Math.round((priceNum * 0.038) / 12);
    const netMonthlyOutflow = Math.max(0, emi - estimatedMonthlyRent);

    return {
      loanAmount,
      downPaymentAmount,
      emi,
      estimatedMonthlyRent,
      netMonthlyOutflow
    };
  }, [priceNum, downPaymentPercent, interestRate, tenureYears]);

  return (
    <div className="premium-surface border border-[#c6a15b]/35 p-5 sm:p-8 rounded-[2px] shadow-[0_12px_40px_rgba(0,0,0,0.6)] my-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-1">
            <Calculator size={14} />
            <span>Interactive Financial Underwriting</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Mortgage & Yield <em>Simulator.</em>
          </h3>
          <p className="text-xs text-gray-300 mt-1 font-light">
            Live financing breakdown customized for {propertyName} ({formatPrice(priceNum)}).
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Underwriting ROI Target</span>
          <span className="text-sm font-semibold text-[#dfc17b] font-mono">{indicativeRoi}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Down Payment Slider */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-400 uppercase tracking-wider">
                Equity Down Payment ({downPaymentPercent}%)
              </span>
              <strong className="text-white font-mono">
                {formatPrice(calculations.downPaymentAmount)}
              </strong>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(+e.target.value)}
              className="w-full accent-[#c6a15b] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>10% (₹{(priceNum * 0.1 / 10000000).toFixed(2)} Cr)</span>
              <span>30%</span>
              <span>50% (₹{(priceNum * 0.5 / 10000000).toFixed(2)} Cr)</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-400 uppercase tracking-wider">Loan Horizon / Tenure</span>
              <strong className="text-white font-mono">
                {tenureYears} Years ({tenureYears * 12} Installments)
              </strong>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(+e.target.value)}
              className="w-full accent-[#c6a15b] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>5 Years</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-400 uppercase tracking-wider">Prime Lending Rate (HNI Private Banking)</span>
              <strong className="text-[#dfc17b] font-mono">{interestRate}% p.a.</strong>
            </div>
            <input
              type="range"
              min="7.5"
              max="11.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(+e.target.value)}
              className="w-full accent-[#c6a15b] cursor-pointer"
            />
          </div>
        </div>

        {/* Dynamic Outputs (5 cols) */}
        <div className="lg:col-span-5 bg-[#06100a] border border-[#c6a15b]/30 p-5 sm:p-6 rounded-[2px] space-y-4 shadow-xl">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#dfc17b] font-medium block mb-1">
              Estimated Monthly Outflow (EMI)
            </span>
            <strong className="font-serif text-3xl sm:text-4xl text-white font-normal block font-mono">
              ₹{calculations.emi.toLocaleString("en-IN")}
            </strong>
            <span className="text-[11px] text-gray-400">per month on {formatPrice(calculations.loanAmount)} debt</span>
          </div>

          <div className="border-t border-white/10 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Est. Luxury Rental Offset:</span>
              <span className="text-emerald-400 font-mono font-medium">
                +₹{calculations.estimatedMonthlyRent.toLocaleString("en-IN")}/mo
              </span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Net Holding Cost (After Rent):</span>
              <span className="text-white font-mono font-bold">
                ₹{calculations.netMonthlyOutflow.toLocaleString("en-IN")}/mo
              </span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/919811055888?text=Hello%20InvestInPro,%20I%20would%20like%20a%20formal%20mortgage%20and%20yield%20sheet%20for%20this%20property."
              target="_blank"
              rel="noreferrer"
              className="w-full gold-btn-luxury py-2.5 text-xs flex items-center justify-center gap-1.5 font-bold shadow-md cursor-pointer text-center"
            >
              <span>Request Custom Banking Memo ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
