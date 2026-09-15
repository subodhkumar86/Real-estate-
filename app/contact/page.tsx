"use client";
import { useState } from "react";
import { Sparkles, MapPin, Phone, Mail, Clock, CheckCircle2, ShieldCheck, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "Luxury Residence / Penthouse",
    preferredLocation: "Sector 94 (Delhi Border)",
    meetingMode: "Private Chauffeur Site Visit",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(result?.message || "Unable to send request");
      }

      // Keep the demo journey connected end-to-end: successful contact
      // enquiries appear immediately inside the local admin CRM.
      const newLead = {
        id: Date.now(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        interest: `${formData.propertyType} · ${formData.preferredLocation}`,
        meetingType: formData.meetingMode,
        date: "Just now",
        status: "New VIP",
        notes: formData.message.trim(),
        source: "Contact Page",
      };
      try {
        const parsed = JSON.parse(localStorage.getItem("investinpro_leads") || "[]");
        const existingLeads = Array.isArray(parsed) ? parsed : [];
        localStorage.setItem("investinpro_leads", JSON.stringify([newLead, ...existingLeads]));
        window.dispatchEvent(new Event("leads-updated"));
      } catch {
        localStorage.setItem("investinpro_leads", JSON.stringify([newLead]));
      }

      setLoading(false);
      setSubmitted(true);
    } catch (submissionError) {
      setLoading(false);
      setError(submissionError instanceof Error
        ? submissionError.message
        : "We could not send your request just now. Please try again or contact the VIP desk directly.");
    }
  };

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Header Banner */}
      <div className="border-b border-white/10 bg-[#08130d] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="eyebrow-luxury flex items-center gap-2 mb-3">
            <Sparkles size={15} />
            <span>Private Appointments · Direct Advisory</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4">
            Let’s begin a <em>conversation.</em>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            Connect directly with our senior partners. We provide discrete, unbiased market intelligence, title-cleared opportunities, and private preview access.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 min-w-0 premium-surface p-5 sm:p-8 lg:p-10">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6" aria-busy={loading}>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white mb-2">
                    Private Appointment Request
                  </h2>
                  <p className="text-xs text-gray-400">
                    Share your requirements and an advisor will curate relevant opportunities within 2 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Vikramaditya Singhal"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#102018] border border-white/15 p-3.5 text-sm text-white focus:outline-none focus:border-[#c6a15b] focus:ring-2 focus:ring-[#c6a15b]/15 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#102018] border border-white/15 p-3.5 text-sm text-white focus:outline-none focus:border-[#c6a15b] focus:ring-2 focus:ring-[#c6a15b]/15 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="vikram@familyoffice.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#102018] border border-white/15 p-3.5 text-sm text-white focus:outline-none focus:border-[#c6a15b] focus:ring-2 focus:ring-[#c6a15b]/15 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Interest Category
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-[#102018] border border-white/15 p-3.5 text-sm text-white focus:outline-none focus:border-[#c6a15b] focus:ring-2 focus:ring-[#c6a15b]/15 transition-colors"
                    >
                      <option value="Luxury Residence / Penthouse">Luxury Residence / Penthouse</option>
                      <option value="Golf-Course Estate">Golf-Course Estate</option>
                      <option value="Grade-A Commercial Office">Grade-A Commercial Office</option>
                      <option value="High-Street Retail Investment">High-Street Retail Investment</option>
                      <option value="NRI Portfolio Strategy">NRI Multi-Unit Portfolio</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Target Corridor
                    </label>
                    <select
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className="w-full bg-[#102018] border border-white/15 p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c6a15b]"
                    >
                      <option value="Sector 94 (Delhi Border)">Sector 94 (Delhi Border)</option>
                      <option value="Sector 128 (Golf Vista)">Sector 128 (Golf Vista)</option>
                      <option value="Sector 150 (Sports City)">Sector 150 (Sports City)</option>
                      <option value="Noida Expressway IT Hub">Noida Expressway IT Hub</option>
                      <option value="Jewar Airport Corridor">Jewar Airport Corridor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                      Appointment Format
                    </label>
                    <select
                      value={formData.meetingMode}
                      onChange={(e) => setFormData({ ...formData, meetingMode: e.target.value })}
                      className="w-full bg-[#102018] border border-white/15 p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c6a15b]"
                    >
                      <option value="Private Chauffeur Site Visit">Private Chauffeur Site Visit</option>
                      <option value="Sector 18 Private Lounge">Sector 18 Private Lounge (Noida)</option>
                      <option value="Aerocity Diplomatic Lounge">Aerocity Diplomatic Lounge (Delhi)</option>
                      <option value="Confidential Video Briefing (NRI)">Confidential Video Briefing (NRI)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Brief / Specific Inquiries (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any specific developer preferences, budget expectations, or possession timelines."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#102018] border border-white/15 p-3.5 text-sm text-white focus:outline-none focus:border-[#c6a15b] focus:ring-2 focus:ring-[#c6a15b]/15 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <ShieldCheck size={16} className="text-[#c6a15b]" />
                    <span>Strict NDA · Guaranteed Privacy</span>
                  </div>

                  {error && <p role="alert" aria-live="polite" className="text-xs text-red-300 sm:max-w-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="w-full sm:w-auto gold-btn-luxury px-8 py-3.5 text-xs cursor-pointer disabled:cursor-wait disabled:opacity-70"
                  >
                    {loading ? "Sending..." : "Submit Private Request ↗"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#c6a15b]/20 border border-[#c6a15b] rounded-full flex items-center justify-center mx-auto text-[#c6a15b]">
                  <CheckCircle2 size={36} />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#c6a15b]">
                  Enquiry Received
                </p>
                <h3 className="font-serif text-3xl text-white">
                  Thank you, {formData.name}.
                </h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                  Your request has been routed to our Senior Portfolio Director. A private advisor will reach out to you via WhatsApp / phone (+{formData.phone}) within two hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="gold-btn-luxury px-6 py-2.5 text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Private Lounges & Direct Access (5 cols) */}
          <div className="lg:col-span-5 min-w-0 space-y-8 lg:sticky lg:top-28 lg:self-start">
            {/* Direct Contact Card */}
            <div className="premium-surface p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-2xl text-white">Direct Advisory Channels</h3>
              
              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#c6a15b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">VIP Hotline (Direct Desk):</strong>
                    <a href="tel:+919811055888" className="hover:text-[#dfc17b] text-sm text-gray-200 font-mono">+91 98110 55888</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle size={18} className="text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">WhatsApp Concierge:</strong>
                    <a href="https://wa.me/919811055888" target="_blank" rel="noreferrer" className="hover:text-[#25D366] text-sm font-mono text-gray-200">
                      +91 98110 55888 (Instant Connect)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#c6a15b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Confidential Inquiries:</strong>
                    <span className="text-sm break-all text-gray-200">advisory@investinpronoida.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#c6a15b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Advisory Hours:</strong>
                    <span>Monday through Saturday · 10:00 AM – 07:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lounges */}
            <div className="premium-surface p-6 sm:p-8 space-y-6 text-sm text-gray-300">
              <h3 className="font-serif text-2xl text-white">Client Lounges</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#c6a15b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Noida Private Suite:</strong>
                    <p className="text-gray-400 mt-0.5">Level 8, Sector 18 Commercial Center, Noida 201301</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#c6a15b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">New Delhi Diplomatic Lounge:</strong>
                    <p className="text-gray-400 mt-0.5">Worldmark 1, Aerocity Hospitality District, New Delhi 110037</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
