"use client";
import { useState, useMemo } from "react";
import { Calculator, Sparkles, TrendingUp, Landmark } from "lucide-react";
import ConsultationModal from "../../components/ConsultationModal";

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<'emi' | 'roi' | 'stamp'>('emi');
  const [modalOpen, setModalOpen] = useState(false);

  // Tab 1: EMI Calculator States
  const [price, setPrice] = useState(35000000); // 3.50 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Tab 2: ROI / Wealth Forecaster States
  const [roiPrice, setRoiPrice] = useState(35000000);
  const [annualGrowthRate, setAnnualGrowthRate] = useState(12.5); // 12.5% CAGR
  const [monthlyRent, setMonthlyRent] = useState(90000); // 90k/mo
  const [forecastYears, setForecastYears] = useState(5);

  // Tab 3: Stamp Duty States
  const [stampPrice, setStampPrice] = useState(35000000);
  const [buyerType, setBuyerType] = useState<'male' | 'female' | 'joint'>('male');

  // EMI Calculations
  const emiData = useMemo(() => {
    const loanAmount = price * (1 - downPaymentPercent / 100);
    const downPaymentAmount = price * (downPaymentPercent / 100);
    const r = interestRate / 1200;
    const n = tenureYears * 12;
    const emi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalPayment = emi * n;
    const totalInterest = totalPayment - loanAmount;
    const principalShare = Math.round((loanAmount / totalPayment) * 100);
    const interestShare = 100 - principalShare;

    return {
      loanAmount,
      downPaymentAmount,
      emi,
      totalPayment,
      totalInterest,
      principalShare,
      interestShare
    };
  }, [price, downPaymentPercent, interestRate, tenureYears]);

  // ROI Calculations
  const roiData = useMemo(() => {
    const futureValue = Math.round(roiPrice * Math.pow(1 + annualGrowthRate / 100, forecastYears));
    const totalRentalIncome = Math.round(monthlyRent * 12 * forecastYears * 1.15); // with 5% bi-annual rental escalation
    const netWealthCreated = futureValue + totalRentalIncome - roiPrice;
    const grossRentalYield = ((monthlyRent * 12) / roiPrice) * 100;

    return {
      futureValue,
      totalRentalIncome,
      netWealthCreated,
      grossRentalYield: grossRentalYield.toFixed(2)
    };
  }, [roiPrice, annualGrowthRate, monthlyRent, forecastYears]);

  // Stamp Duty Calculations (Uttar Pradesh / Noida)
  const stampData = useMemo(() => {
    // UP: Male 7%, Female 6% (up to certain ceiling, 10k rebate), Joint ~6.5%
    const rate = buyerType === 'female' ? 6 : buyerType === 'joint' ? 6.5 : 7;
    const stampDuty = Math.round((stampPrice * rate) / 100);
    const registrationFee = Math.min(Math.round((stampPrice * 1) / 100), 200000); // 1% or max standard ceiling
    const legalDueDiligence = 75000;
    const totalOverhead = stampDuty + registrationFee + legalDueDiligence;

    return {
      rate,
      stampDuty,
      registrationFee,
      legalDueDiligence,
      totalOverhead
    };
  }, [stampPrice, buyerType]);

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#08130d] py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles size={15} />
            <span>Investment Intelligence · Financial Modeling</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4">
            See the <em>potential.</em>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            Institutional-grade modeling for high-conviction real estate decisions in Noida and NCR. Simulate mortgage outflows, 5-to-10 year capital growth, and acquisition charges.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Tool Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8 pb-4 border-b border-white/10">
          <button
            onClick={() => setActiveTab('emi')}
            aria-pressed={activeTab === 'emi'}
            className={`px-4 py-3 text-[11px] uppercase tracking-wider font-semibold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'emi'
                ? 'bg-[#c6a15b]/14 text-[#f0d99e] border-[#c6a15b] shadow-[inset_0_-2px_0_#c6a15b]'
                : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
            }`}
          >
            <Calculator size={16} />
            <span>1. Mortgage & EMI Forecaster</span>
          </button>

          <button
            onClick={() => setActiveTab('roi')}
            aria-pressed={activeTab === 'roi'}
            className={`px-4 py-3 text-[11px] uppercase tracking-wider font-semibold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'roi'
                ? 'bg-[#c6a15b]/14 text-[#f0d99e] border-[#c6a15b] shadow-[inset_0_-2px_0_#c6a15b]'
                : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
            }`}
          >
            <TrendingUp size={16} />
            <span>2. Capital Growth & Wealth Projection</span>
          </button>

          <button
            onClick={() => setActiveTab('stamp')}
            aria-pressed={activeTab === 'stamp'}
            className={`px-4 py-3 text-[11px] uppercase tracking-wider font-semibold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'stamp'
                ? 'bg-[#c6a15b]/14 text-[#f0d99e] border-[#c6a15b] shadow-[inset_0_-2px_0_#c6a15b]'
                : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
            }`}
          >
            <Landmark size={16} />
            <span>3. Noida Stamp Duty & Registration</span>
          </button>
        </div>

        {/* TAB 1: MORTGAGE & EMI FORECASTER */}
        {activeTab === 'emi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start animate-fadeIn">
            {/* Form Sliders (7 cols) */}
            <div className="lg:col-span-7 premium-surface p-5 sm:p-8 space-y-6">
              <h2 className="font-serif text-2xl text-white border-b border-white/10 pb-4">
                Mortgage Assumptions
              </h2>

              {/* Property Price */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 uppercase tracking-wider">Property Consideration</span>
                  <strong className="font-serif text-xl text-[#c6a15b]">
                    ₹{(price / 10000000).toFixed(2)} Cr
                  </strong>
                </div>
                <input
                  type="range"
                  min="10000000"
                  max="200000000"
                  step="2500000"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>₹1.00 Cr</span>
                  <span>₹10.00 Cr</span>
                  <span>₹20.00 Cr</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 uppercase tracking-wider">Down Payment ({downPaymentPercent}%)</span>
                  <strong className="text-white">
                    ₹{(emiData.downPaymentAmount / 10000000).toFixed(2)} Cr
                  </strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(+e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 uppercase tracking-wider">Annual Interest Rate</span>
                  <strong className="text-[#c6a15b]">{interestRate}% p.a.</strong>
                </div>
                <input
                  type="range"
                  min="7.0"
                  max="12.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(+e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 uppercase tracking-wider">Tenure</span>
                  <strong className="text-white">{tenureYears} Years ({tenureYears * 12} Months)</strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(+e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Calculation Outputs (5 cols) */}
            <div className="lg:col-span-5 premium-surface border-[#c6a15b]/40 p-5 sm:p-8 space-y-6 shadow-2xl">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c6a15b] font-semibold block mb-1">
                  Indicative Monthly Commitment
                </span>
                <strong className="font-serif text-4xl sm:text-5xl text-white font-normal block">
                  ₹{emiData.emi.toLocaleString('en-IN')}
                </strong>
                <span className="text-xs text-gray-400">per calendar month</span>
              </div>

              {/* Visual Split */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#c6a15b] inline-block rounded-full" />
                    Principal Loan ({emiData.principalShare}%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#406850] inline-block rounded-full" />
                    Total Interest ({emiData.interestShare}%)
                  </span>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden flex">
                  <div style={{ width: `${emiData.principalShare}%` }} className="bg-[#c6a15b] h-full" />
                  <div style={{ width: `${emiData.interestShare}%` }} className="bg-[#406850] h-full" />
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Net Principal Borrowed:</span>
                  <strong className="text-white">₹{(emiData.loanAmount / 10000000).toFixed(2)} Cr</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Total Interest Payable:</span>
                  <strong className="text-[#c6a15b]">₹{(emiData.totalInterest / 10000000).toFixed(2)} Cr</strong>
                </div>
                <div className="flex justify-between py-1 border-t border-white/10 pt-2 font-medium">
                  <span className="text-gray-300">Total Outflow Over {tenureYears} Yrs:</span>
                  <strong className="text-white">₹{(emiData.totalPayment / 10000000).toFixed(2)} Cr</strong>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] hover:from-[#faebd7] hover:to-[#dfc17b] text-[#07100b] font-bold text-xs uppercase tracking-[0.16em] py-3.5 px-4 rounded-[2px] shadow-[0_4px_25px_rgba(198,161,91,0.3)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Discuss Financing With Advisor ↗</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CAPITAL GROWTH & WEALTH FORECASTER */}
        {activeTab === 'roi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            <div className="lg:col-span-7 premium-surface p-5 sm:p-8 space-y-6">
              <h2 className="font-serif text-2xl text-white border-b border-white/10 pb-4">
                Appreciation & Rental Assumptions
              </h2>

              {/* Base Price */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 uppercase tracking-wider">Initial Purchase Consideration</span>
                  <strong className="font-serif text-xl text-[#c6a15b]">
                    ₹{(roiPrice / 10000000).toFixed(2)} Cr
                  </strong>
                </div>
                <input
                  type="range"
                  min="10000000"
                  max="150000000"
                  step="2500000"
                  value={roiPrice}
                  onChange={(e) => setRoiPrice(+e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Annual Growth Rate */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 uppercase tracking-wider">Expected Annual Capital Appreciation (CAGR)</span>
                  <strong className="text-[#c6a15b]">{annualGrowthRate}% p.a.</strong>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="22.0"
                  step="0.5"
                  value={annualGrowthRate}
                  onChange={(e) => setAnnualGrowthRate(+e.target.value)}
                  className="w-full"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  *Noida Expressway luxury corridors average 14.8% CAGR (2022–2026).
                </span>
              </div>

              {/* Monthly Rent */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 uppercase tracking-wider">Expected Monthly Rental Inflow</span>
                  <strong className="text-white">₹{monthlyRent.toLocaleString('en-IN')} / mo</strong>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="350000"
                  step="5000"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(+e.target.value)}
                  className="w-full"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Gross Yield: {roiData.grossRentalYield}% per annum
                </span>
              </div>

              {/* Holding Period */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 uppercase tracking-wider">Investment Horizon</span>
                  <strong className="text-white">{forecastYears} Years</strong>
                </div>
                <div className="flex gap-2">
                  {[3, 5, 7, 10].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setForecastYears(yr)}
                      className={`flex-1 py-2 text-xs border transition-colors cursor-pointer ${
                        forecastYears === yr
                          ? 'bg-[#c6a15b] text-[#060d09] border-[#c6a15b] font-bold'
                          : 'border-white/15 text-gray-400 hover:text-white'
                      }`}
                    >
                      {yr} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Wealth Projection Output */}
            <div className="lg:col-span-5 premium-surface border-[#c6a15b]/40 p-5 sm:p-8 space-y-6 shadow-2xl">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c6a15b] font-semibold block mb-1">
                  Projected Valuation in {forecastYears} Years
                </span>
                <strong className="font-serif text-4xl sm:text-5xl text-white font-normal block">
                  ₹{(roiData.futureValue / 10000000).toFixed(2)} Cr
                </strong>
                <span className="text-xs text-gray-400">compounded at {annualGrowthRate}% annually</span>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Capital Appreciation Gain:</span>
                  <strong className="text-[#c6a15b]">
                    +₹{((roiData.futureValue - roiPrice) / 10000000).toFixed(2)} Cr
                  </strong>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Cumulative Rental Returns:</span>
                  <strong className="text-white">
                    +₹{(roiData.totalRentalIncome / 10000000).toFixed(2)} Cr
                  </strong>
                </div>
                <div className="flex justify-between py-2 font-medium">
                  <span className="text-gray-300">Total Pre-Tax Wealth Created:</span>
                  <strong className="text-white text-base">
                    ₹{(roiData.netWealthCreated / 10000000).toFixed(2)} Cr
                  </strong>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] hover:from-[#faebd7] hover:to-[#dfc17b] text-[#07100b] font-bold text-xs uppercase tracking-[0.16em] py-3.5 px-4 rounded-[2px] shadow-[0_4px_25px_rgba(198,161,91,0.3)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Full Financial Briefing ↗</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STAMP DUTY & REGISTRATION ESTIMATOR */}
        {activeTab === 'stamp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            <div className="lg:col-span-7 premium-surface p-5 sm:p-8 space-y-6">
              <h2 className="font-serif text-2xl text-white border-b border-white/10 pb-4">
                Registration Parameters (Noida / UP)
              </h2>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 uppercase tracking-wider">Property Agreement Value</span>
                  <strong className="font-serif text-xl text-[#c6a15b]">
                    ₹{(stampPrice / 10000000).toFixed(2)} Cr
                  </strong>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="150000000"
                  step="2500000"
                  value={stampPrice}
                  onChange={(e) => setStampPrice(+e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Ownership Category */}
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 block mb-2">
                  Primary Title Ownership
                </label>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <button
                    onClick={() => setBuyerType('male')}
                    className={`py-3 px-2 text-center border transition-colors cursor-pointer ${
                      buyerType === 'male'
                        ? 'bg-[#c6a15b] text-[#060d09] border-[#c6a15b] font-bold'
                        : 'border-white/15 text-gray-300'
                    }`}
                  >
                    Male Sole (7%)
                  </button>
                  <button
                    onClick={() => setBuyerType('female')}
                    className={`py-3 px-2 text-center border transition-colors cursor-pointer ${
                      buyerType === 'female'
                        ? 'bg-[#c6a15b] text-[#060d09] border-[#c6a15b] font-bold'
                        : 'border-white/15 text-gray-300'
                    }`}
                  >
                    Female Sole (6%)
                  </button>
                  <button
                    onClick={() => setBuyerType('joint')}
                    className={`py-3 px-2 text-center border transition-colors cursor-pointer ${
                      buyerType === 'joint'
                        ? 'bg-[#c6a15b] text-[#060d09] border-[#c6a15b] font-bold'
                        : 'border-white/15 text-gray-300'
                    }`}
                  >
                    Joint Title (6.5%)
                  </button>
                </div>
                <span className="text-[10px] text-gray-500 mt-2 block">
                  Uttar Pradesh Revenue Code offers a 1% rebate for women sole purchasers.
                </span>
              </div>
            </div>

            {/* Output */}
            <div className="lg:col-span-5 premium-surface border-[#c6a15b]/40 p-5 sm:p-8 space-y-6 shadow-2xl">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c6a15b] font-semibold block mb-1">
                  Total Acquisition Overhead
                </span>
                <strong className="font-serif text-4xl sm:text-5xl text-white font-normal block">
                  ₹{(stampData.totalOverhead / 100000).toFixed(2)} Lakh
                </strong>
                <span className="text-xs text-gray-400">approx. {((stampData.totalOverhead / stampPrice) * 100).toFixed(2)}% of agreement price</span>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Stamp Duty ({stampData.rate}%):</span>
                  <strong className="text-white">₹{stampData.stampDuty.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Registration / Sub-Registrar:</span>
                  <strong className="text-[#c6a15b]">₹{stampData.registrationFee.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Legal Audit & Documentation:</span>
                  <strong className="text-gray-300">₹{stampData.legalDueDiligence.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] hover:from-[#faebd7] hover:to-[#dfc17b] text-[#07100b] font-bold text-xs uppercase tracking-[0.16em] py-3.5 px-4 rounded-[2px] shadow-[0_4px_25px_rgba(198,161,91,0.3)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Conveyancing Support ↗</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty="Financial Modeling & Mortgage Advisory"
      />
    </main>
  );
}
