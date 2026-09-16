"use client";
import { useEffect, useState } from "react";
import { X, CheckCircle2, Phone, Mail, User, Sparkles, Clock, ShieldCheck } from "lucide-react";
import PremiumSelect from "./PremiumSelect";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProperty?: string;
}

export default function ConsultationModal({ isOpen, onClose, defaultProperty = "" }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyInterest: defaultProperty || "All Ultra-Luxury Properties",
    meetingType: "Private Chauffeur Site Tour",
    preferredDate: "Tomorrow",
    timeSlot: "11:00 AM - 01:00 PM",
    budget: "₹3 Cr – ₹7 Cr",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      // The modal is an external UI surface; reset its transient state on open.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSubmitted(false);
      setError("");
      setFormData((current) => ({
        ...current,
        propertyInterest: defaultProperty || "All Ultra-Luxury Properties",
      }));
    }
  }, [isOpen, defaultProperty]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const existingLeads = JSON.parse(localStorage.getItem('investinpro_leads') || '[]');
      const newLead = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        interest: formData.propertyInterest,
        meetingType: formData.meetingType,
        budget: formData.budget,
        date: "Just now",
        status: "New VIP",
        notes: formData.notes || `Preferred Date: ${formData.preferredDate} (${formData.timeSlot})`,
        source: "VIP Consultation"
      };
      localStorage.setItem('investinpro_leads', JSON.stringify([newLead, ...existingLeads]));
      window.dispatchEvent(new Event('leads-updated'));
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          interest: formData.propertyInterest,
          source: 'VIP Consultation',
        }),
      });
      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || 'Please try again.');
      setLoading(false);
      setSubmitted(true);
    } catch (submissionError) {
      setLoading(false);
      setError(submissionError instanceof Error ? submissionError.message : 'Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0a1510] border border-[#c6a15b]/40 shadow-2xl p-8 md:p-10 text-white rounded-sm max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#c6a15b]" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#c6a15b] font-medium">
                Exclusive Real Estate Advisory
              </p>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-white mb-3">
              Schedule Private <em className="text-[#c6a15b] italic">Consultation.</em>
            </h2>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Connect directly with our Senior Portfolio Director. We provide discrete, unbiased market intelligence, title-cleared opportunities, and private preview access.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Birla"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#11231a] border border-white/15 px-3.5 py-2.5 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c6a15b] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-3.5 text-gray-500" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#11231a] border border-white/15 px-3.5 py-2.5 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c6a15b] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-3.5 text-gray-500" />
                    <input
                      type="email"
                      required
                      placeholder="vikram@familyoffice.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#11231a] border border-white/15 px-3.5 py-2.5 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c6a15b] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Investment Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#11231a] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#c6a15b] transition-colors"
                  >
                    <option value="Under ₹2 Cr">Under ₹2 Cr</option>
                    <option value="₹2 Cr – ₹4 Cr">₹2 Cr – ₹4 Cr</option>
                    <option value="₹4 Cr – ₹7 Cr">₹4 Cr – ₹7 Cr</option>
                    <option value="₹7 Cr – ₹15 Cr">₹7 Cr – ₹15 Cr (Sky Mansions)</option>
                    <option value="₹15 Cr+">₹15 Cr+ (Institutional / Trophy)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Meeting Preference
                  </label>
                  <PremiumSelect
                    value={formData.meetingType}
                    onChange={(value) => setFormData({ ...formData, meetingType: value })}
                    options={[
                      { value: "Private Chauffeur Site Tour", label: "Private Chauffeur Site Tour (Noida)" },
                      { value: "Executive Suite Meeting (Sector 18)", label: "Executive Lounge Meeting (Sector 18 Noida)" },
                      { value: "Aerocity Lounge Meeting (New Delhi)", label: "Aerocity Lounge Meeting (New Delhi)" },
                      { value: "High-Definition Video Conference (NRI)", label: "Private Video Conference (NRI / Global)" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Preferred Time Window
                  </label>
                  <div className="relative">
                    <Clock size={15} className="absolute left-3.5 top-3.5 text-gray-500" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-[#11231a] border border-white/15 px-3.5 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-[#c6a15b] transition-colors"
                    >
                      <option value="10:00 AM - 12:00 PM">Morning: 10:00 AM – 12:00 PM</option>
                      <option value="12:00 PM - 02:00 PM">Midday: 12:00 PM – 02:00 PM</option>
                      <option value="03:00 PM - 05:00 PM">Afternoon: 03:00 PM – 05:00 PM</option>
                      <option value="05:00 PM - 07:00 PM">Evening Sunset: 05:00 PM – 07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                  Specific Property or Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Interested in M3M The Cullinan 4BHK or golf-facing residences with immediate possession."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#11231a] border border-white/15 px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c6a15b] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={16} className="text-[#c6a15b]" />
                  <span>100% Confidential · Strict NDA adherence</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="gold-btn-luxury px-7 py-3 text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg cursor-pointer font-bold disabled:opacity-70"
                >
                  {loading ? "Confirming..." : "Confirm Private Appointment ↗"}
                </button>
              </div>
              {error && <p role="alert" className="text-xs text-red-300">{error}</p>}
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#c6a15b]/20 border border-[#c6a15b] rounded-full flex items-center justify-center mx-auto mb-5 text-[#c6a15b]">
              <CheckCircle2 size={36} />
            </div>
            
            <p className="text-xs uppercase tracking-[0.2em] text-[#c6a15b] mb-1 font-semibold">
              Private Appointment Confirmed
            </p>
            <h3 className="font-serif text-3xl text-white mb-3">
              We look forward to meeting you.
            </h3>
            
            <div className="bg-[#11231a] border border-white/10 p-5 max-w-md mx-auto my-6 text-left text-xs text-gray-300 space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Client:</span>
                <span className="font-semibold text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Format:</span>
                <span className="text-[#dfc17b] font-medium">{formData.meetingType}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Time Window:</span>
                <span>{formData.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Assigned Advisor:</span>
                <span className="text-white font-medium">Mr. Vikramaditya Singhania (Senior Director)</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
              A private chauffeur confirmation and formal itinerary have been queued for your WhatsApp (+{formData.phone}).
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="gold-btn-luxury px-6 py-2.5 text-xs uppercase tracking-widest font-bold cursor-pointer shadow-md"
              >
                Done
              </button>
              <a
                href="https://wa.me/919811055888?text=Hello%20InvestInPro,%20I%20have%20scheduled%20a%20private%20consultation."
                target="_blank"
                rel="noreferrer"
                className="border border-[#c6a15b]/60 text-[#dfc17b] hover:bg-[#c6a15b]/10 px-5 py-2.5 text-xs uppercase tracking-widest transition-colors flex items-center gap-2 rounded-[2px]"
              >
                Instant WhatsApp Desk ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
