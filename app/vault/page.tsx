"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Eye, 
  FileText, 
  Phone, 
  MessageCircle, 
  Building2, 
  Coins, 
  Award,
  AlertTriangle,
  LogOut,
  MapPin
} from "lucide-react";
import { vaultProperties, VaultProperty } from "../../data/vault";
import ConsultationModal from "../../components/ConsultationModal";

export default function VaultPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssetForModal, setSelectedAssetForModal] = useState("");
  const [filterType, setFilterType] = useState<string>("All");

  // Form for requesting instant key
  const [reqName, setReqName] = useState("");
  const [reqOffice, setReqOffice] = useState("");
  const [reqPhone, setReqPhone] = useState("");
  const [keyGenerated, setKeyGenerated] = useState(false);

  // Check session storage
  useEffect(() => {
    if (sessionStorage.getItem('investinpro-vault-auth') === 'granted') {
      // Session storage hydration intentionally updates state after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (codeToTest?: string) => {
    const code = (codeToTest || accessCode).trim().toUpperCase();
    if (code === "VAULT2026" || code === "INVESTINPRO" || code === "VIP" || code === "NOIDA") {
      setIsUnlocked(true);
      setError("");
      sessionStorage.setItem('investinpro-vault-auth', 'granted');
    } else {
      setError("Invalid Passcode. Please verify or request an Invitation Key below.");
    }
  };

  const handleRequestKey = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyGenerated(true);
    setTimeout(() => {
      handleUnlock("VAULT2026");
    }, 1200);
  };

  const handleLock = () => {
    sessionStorage.removeItem('investinpro-vault-auth');
    setIsUnlocked(false);
    setAccessCode("");
    setKeyGenerated(false);
  };

  const filteredProperties = filterType === "All"
    ? vaultProperties
    : vaultProperties.filter(p => p.assetType.toLowerCase().includes(filterType.toLowerCase()) || p.sellerType.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <main className="bg-[#040805] text-[#e5e9e6] min-h-screen pb-24">
      {/* 1. STATE: LOCKED VAULT GATE */}
      {!isUnlocked ? (
        <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Crest and Lock Symbol */}
          <div className="text-center space-y-4 mb-12">
            <div className="relative w-20 h-20 border-2 border-[#c6a15b] mx-auto flex items-center justify-center bg-[#07100b] shadow-[0_0_50px_rgba(198,161,91,0.3)] rotate-45 mb-6">
              <Lock size={32} className="text-[#c6a15b] -rotate-45" />
              <div className="absolute inset-1 border border-[#c6a15b]/40 pointer-events-none" />
            </div>

            <p className="text-xs uppercase tracking-[0.35em] text-[#c6a15b] font-cinzel font-semibold">
              The Private Vault · Off-Market Portfolio
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
              By Invitation <em>Only.</em>
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
              Confidential trophy real estate assets (₹20 Cr to ₹70 Cr) in Noida and NCR reserved exclusively for Family Offices and Ultra-HNIs. Public dissemination is strictly restricted by non-disclosure agreements.
            </p>
          </div>

          {/* Passcode Entry Card */}
          <div className="bg-[#07100b] border border-[#c6a15b]/40 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-w-md mx-auto relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Passcode Verification</span>
                <span className="text-[10px] text-[#c6a15b] font-mono">256-BIT ENCRYPTED</span>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-gray-300 mb-2 font-medium">
                  Enter Invitation Passcode
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
                  <input
                    type="password"
                    placeholder="e.g. VAULT2026"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                    className="w-full bg-[#0d1a12] border border-white/15 px-3 py-3 pl-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c6a15b] uppercase tracking-widest font-mono"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-950/40 p-2.5 border border-red-800/50">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={() => handleUnlock()}
                className="w-full gold-btn-luxury py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Unlock Confidential Vault ↗</span>
              </button>

              {/* One-Click VIP Demo Pass */}
              <div className="pt-3 text-center">
                <button
                  type="button"
                  onClick={() => handleUnlock("VAULT2026")}
                  className="text-xs text-[#dfc17b] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>One-Click VIP Pass (Auto-Unlock: VAULT2026)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Request Access Form */}
          <div className="mt-14 max-w-xl mx-auto bg-[#07100b]/60 border border-white/10 p-8 text-center space-y-4">
            <h3 className="font-serif text-2xl text-white">
              Do not possess an Invitation Key?
            </h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm mx-auto">
              Accredited family offices, corporate promoters, and institutional buyers can request an instant digital access key below.
            </p>

            {!keyGenerated ? (
              <form onSubmit={handleRequestKey} className="space-y-3 pt-2 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={reqName}
                    onChange={(e) => setReqName(e.target.value)}
                    className="bg-[#0d1a12] border border-white/15 p-2.5 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Family Office / Organization"
                    value={reqOffice}
                    onChange={(e) => setReqOffice(e.target.value)}
                    className="bg-[#0d1a12] border border-white/15 p-2.5 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Number (e.g. +91 98765 43210)"
                  value={reqPhone}
                  onChange={(e) => setReqPhone(e.target.value)}
                  className="w-full bg-[#0d1a12] border border-white/15 p-2.5 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                />
                <button
                  type="submit"
                  className="w-full outline-btn-luxury py-3 text-xs uppercase tracking-wider font-semibold cursor-pointer text-[#dfc17b]"
                >
                  Request Instant Vault Pass ↗
                </button>
              </form>
            ) : (
              <div className="p-4 bg-[#0a1610] border border-[#c6a15b] text-xs text-[#dfc17b] flex items-center justify-center gap-2 animate-fadeIn">
                <CheckCircle2 size={16} />
                <span>Verification approved. Decrypting confidential listings...</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 2. STATE: UNLOCKED VAULT SHOWCASE */
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <div className="border-b border-[#c6a15b]/30 bg-[#07100b] py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 text-xs text-[#c6a15b] uppercase tracking-[0.3em] font-cinzel font-semibold mb-2">
                  <ShieldCheck size={16} />
                  <span>Confidential Memo · Fiduciary Clearances Verified</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal">
                  The Private <em>Vault.</em>
                </h1>

                <p className="text-gray-300 text-xs sm:text-sm max-w-xl font-light leading-relaxed mt-2">
                  Displaying 4 off-market acquisition opportunities. Information is strictly confidential and protected under non-disclosure terms.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLock}
                  className="border border-white/20 hover:border-red-400 text-gray-400 hover:text-red-400 px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Lock Vault Session</span>
                </button>

                <a
                  href="https://wa.me/919999999999?text=Hello%20InvestInPro%20Noida,%20I%20am%20reviewing%20the%20Private%20Vault%20off-market%20listings."
                  target="_blank"
                  rel="noreferrer"
                  className="gold-btn-luxury px-5 py-2.5 text-xs flex items-center gap-2"
                >
                  <MessageCircle size={14} />
                  <span>Direct Encrypted Line</span>
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
              {["All", "Penthouse", "Villa", "Land"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  aria-pressed={filterType === f}
                  className={`px-4 py-2 text-xs uppercase tracking-widest rounded-[2px] transition-all cursor-pointer ${
                    filterType === f
                      ? 'gold-btn-luxury text-[#07100b] font-bold shadow-[0_2px_12px_rgba(198,161,91,0.35)]'
                      : 'bg-[#09150e]/90 text-gray-400 border border-white/10 hover:border-[#c6a15b]/40 hover:text-white'
                  }`}
                >
                  {f === 'All' ? 'All 4 Trophy Assets' : f}
                </button>
              ))}
            </div>

            {/* Confidential Listings Grid */}
            <div className="space-y-12">
              {filteredProperties.map((asset) => (
                <article
                  key={asset.id}
                  className="premium-surface border-[#c6a15b]/40 p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
                >
                  {/* Watermark Overlay */}
                  <div className="absolute top-4 right-4 pointer-events-none opacity-20 text-[10px] uppercase tracking-[0.4em] text-[#c6a15b] font-mono rotate-12 hidden sm:block">
                    CONFIDENTIAL / NOT FOR CIRCULATION
                  </div>

                  {/* Image with Confidential Stamp */}
                  <div className="lg:col-span-5 relative h-72 lg:h-96 w-full overflow-hidden border border-[#c6a15b]/30">
                    <img
                      src={asset.image}
                      alt={asset.codeName}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040805] via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-[#040805]/95 border border-[#c6a15b] px-3 py-1 text-[9px] uppercase tracking-widest font-bold text-[#dfc17b] font-cinzel">
                      {asset.id} · {asset.confidentialityLevel}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#040805]/80 backdrop-blur-md border border-white/10 flex justify-between items-center text-xs">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px]">Seller Channel</span>
                      <span className="text-[#c6a15b] font-medium">{asset.sellerType}</span>
                    </div>
                  </div>

                  {/* Information */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1">
                        <span className="text-[#c6a15b] font-cinzel tracking-widest uppercase font-semibold">
                          Target IRR: {asset.targetIRR}
                        </span>
                        <span className="text-gray-400 font-mono text-[11px]">
                          Approx: {asset.usdPrice}
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl text-white mb-2">
                        {asset.codeName}
                      </h2>

                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-4">
                        <MapPin size={14} className="text-[#c6a15b]" />
                        <span>{asset.location} · {asset.assetType}</span>
                      </p>

                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-6">
                        {asset.overview}
                      </p>

                      {/* Confidential Deal Bullet Points */}
                      <div className="bg-[#040805] border border-white/10 p-4 space-y-2 mb-6">
                        <span className="text-[10px] uppercase tracking-widest text-[#dfc17b] font-semibold block mb-1">
                          Confidential Acquisition Terms:
                        </span>
                        {asset.confidentialHighlights.map((hl, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                            <CheckCircle2 size={14} className="text-[#c6a15b] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 border-t border-white/10 pt-4">
                        {asset.specs.map((s, idx) => (
                          <div key={idx}>
                            <span className="text-gray-500 text-[9px] uppercase block">{s.label}</span>
                            <span className="font-medium text-white">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#c6a15b]/20">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Consideration</span>
                        <strong className="font-serif text-3xl text-[#dfc17b] font-normal">{asset.price}</strong>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setSelectedAssetForModal(`${asset.codeName} (${asset.price})`);
                            setModalOpen(true);
                          }}
                          className="gold-btn-luxury px-6 py-3 text-xs cursor-pointer shadow-lg"
                        >
                          Request Title Dossier & NDA ↗
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom Confidentiality Advisory */}
            <div className="p-8 bg-[#07100b] border border-[#c6a15b]/30 text-center space-y-3">
              <ShieldCheck size={28} className="text-[#c6a15b] mx-auto" />
              <h3 className="font-serif text-2xl text-white">Have a private trophy property to list off-market?</h3>
              <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
                We represent select promoters, embassy dignitaries, and industrial families seeking absolute confidentiality without public advertising.
              </p>
              <button
                onClick={() => {
                  setSelectedAssetForModal("Private Off-Market Seller Representation");
                  setModalOpen(true);
                }}
                className="outline-btn-luxury px-6 py-2.5 text-xs text-[#dfc17b] cursor-pointer"
              >
                Inquire With Managing Director
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProperty={selectedAssetForModal || "Private Vault Off-Market Asset"}
      />
    </main>
  );
}
