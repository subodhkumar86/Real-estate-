"use client";
import { useState } from "react";
import { X, MessageSquare, CheckCircle2, ShieldCheck } from "lucide-react";

interface WhatsAppBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  propertyPrice?: string;
  propertyLocation?: string;
}

export default function WhatsAppBrochureModal({
  isOpen,
  onClose,
  propertyName,
  propertyPrice = "",
  propertyLocation = ""
}: WhatsAppBrochureModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("Floor Plans & Price Sheet");
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Record lead in localStorage for Admin CRM
    try {
      const existingLeads = JSON.parse(localStorage.getItem('investinpro_leads') || '[]');
      const newLead = {
        id: Date.now(),
        name: name,
        phone: phone,
        email: "WhatsApp Lead",
        interest: `${propertyName} (${propertyLocation || 'Noida'})`,
        meetingType: "WhatsApp Brochure Dispatch",
        budget: propertyPrice || "Luxury Portfolio",
        date: "Just now",
        status: "New VIP",
        notes: `Requested ${requirement} via WhatsApp Concierge.`,
        source: "WhatsApp Dispatcher"
      };
      localStorage.setItem('investinpro_leads', JSON.stringify([newLead, ...existingLeads]));
      window.dispatchEvent(new Event('leads-updated'));
    } catch {
      // fallback
    }

    // 2. Open WhatsApp with prefilled message
    const msg = `Hello InvestInPro Noida Concierge, I am interested in *${propertyName}* (${propertyLocation}). Please send the confidential brochure, master floor plans, and latest payment schedule to my WhatsApp. My name is ${name} (${phone}).`;
    const waUrl = `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");

    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#07100b] border border-[#c6a15b]/40 shadow-2xl p-6 sm:p-8 text-white max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1.5 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!sent ? (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#25D366]">
              <MessageSquare size={16} />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold font-cinzel">
                Instant WhatsApp Concierge
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">
              Receive Masterplan & <em className="text-[#dfc17b]">Price Sheet</em>
            </h3>

            <p className="text-xs text-gray-300 mb-6 leading-relaxed">
              Get the confidential PDF brochure, high-resolution layout blueprints, and RERA filing for <strong className="text-white">{propertyName}</strong> directly on your WhatsApp within 60 seconds.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-medium">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singhal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a1610] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c6a15b]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-medium">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0a1610] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c6a15b]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-medium">
                  Select Deliverables
                </label>
                <select
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  className="w-full bg-[#0a1610] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                >
                  <option value="Complete Floor Plans & Price Sheet">Complete Floor Plans & Price Sheet</option>
                  <option value="10-Year ROI & Rental Yield Memorandum">10-Year ROI & Rental Yield Memorandum</option>
                  <option value="Schedule Chauffeur Site Inspection">Schedule Chauffeur Site Inspection</option>
                  <option value="Payment Plan & Bank Loan Approval Sheet">Payment Plan & Bank Loan Approval Sheet</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-[#040805] font-bold py-3 text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  <MessageSquare size={16} />
                  <span>Send Documents To WhatsApp ↗</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-2">
                <ShieldCheck size={12} className="text-[#c6a15b]" />
                <span>Zero Spam Guarantee · Discrete VIP Client Protocol</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366]">
              <CheckCircle2 size={30} />
            </div>
            <h4 className="font-serif text-2xl text-white">Opening WhatsApp...</h4>
            <p className="text-xs text-gray-300 max-w-sm mx-auto">
              Our Senior Advisor has received your dispatch request for <strong className="text-white">{propertyName}</strong>. The confidential dossier is loading on your WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
