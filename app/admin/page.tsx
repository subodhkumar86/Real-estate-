"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Lock, 
  User, 
  TrendingUp, 
  Building2, 
  Phone, 
  LogOut, 
  Plus, 
  Search,
  Eye,
  Car,
  Key,
  Download,
  Trash2,
  Sparkles,
  MessageSquare,
  FileText,
  Clock,
  MapPin,
  X
} from "lucide-react";
import { properties as staticProperties, Property } from "../../data/properties";

const credentials = { id: "admin@investinpronoida.com", password: "InvestPro@2026" };

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  meetingType?: string;
  budget?: string;
  date: string;
  status: "New VIP" | "Contacted" | "Tour Scheduled" | "Negotiation" | "Deal Closed" | "Archived";
  notes?: string;
  source?: string;
}

const initialMockLeads: Lead[] = [
  { 
    id: 1, 
    name: "Vikramaditya Birla", 
    phone: "+91 98111 22334", 
    email: "v.birla@familyoffice.in", 
    interest: "M3M The Cullinan (Penthouse)", 
    meetingType: "Private Chauffeur Tour",
    budget: "Above ₹7 Cr",
    date: "12 mins ago", 
    status: "New VIP",
    notes: "Requires river-facing high duplex with private pool for personal stay."
  },
  { 
    id: 2, 
    name: "Dr. Sunita Aggarwal", 
    phone: "+91 99223 44556", 
    email: "drsunita@maxhealthcare.com", 
    interest: "Max Estate 128 (Golf Haven)", 
    meetingType: "Private Chauffeur Tour",
    budget: "₹4 Cr – ₹7 Cr",
    date: "45 mins ago", 
    status: "Tour Scheduled",
    notes: "Tour confirmed for tomorrow 11 AM in Mercedes-Maybach from South Delhi."
  },
  { 
    id: 3, 
    name: "Karan Johar (Dubai NRI)", 
    phone: "+971 50 123 4567", 
    email: "kjohar@dubaiholding.ae", 
    interest: "ATS Knightsbridge (Single Floor)", 
    meetingType: "Video Consultation",
    budget: "Above ₹7 Cr",
    date: "2 hrs ago", 
    status: "Negotiation",
    notes: "NRE account fund transfer in progress. Wants possession confirmation."
  },
  { 
    id: 4, 
    name: "Rajiv Singhal", 
    phone: "+91 98450 11223", 
    email: "rajiv@techventures.com", 
    interest: "Bhutani Cyberthum (Pre-leased)", 
    meetingType: "Office Presentation",
    budget: "₹2 Cr – ₹4 Cr",
    date: "4 hrs ago", 
    status: "Contacted",
    notes: "Targeting 9.5% rental yield commercial lockable unit."
  }
];

interface ChauffeurTour {
  id: number;
  client: string;
  phone: string;
  property: string;
  vehicle: string;
  driver: string;
  pickup: string;
  dateTime: string;
  status: "Scheduled" | "En Route" | "Completed";
}

const initialTours: ChauffeurTour[] = [
  {
    id: 101,
    client: "Dr. Sunita Aggarwal",
    phone: "+91 99223 44556",
    property: "Max Estate 128 (Sector 128)",
    vehicle: "Mercedes-Maybach S-Class (DL 1C AB 0001)",
    driver: "Ramesh Sharma (Diplomatic Chauffeur)",
    pickup: "Panchsheel Park, South Delhi",
    dateTime: "Tomorrow · 11:00 AM",
    status: "Scheduled"
  },
  {
    id: 102,
    client: "Rajeshwar Mehra",
    phone: "+91 98711 00223",
    property: "M3M The Cullinan (Sector 94)",
    vehicle: "BMW 7-Series LWB (DL 2C XY 7777)",
    driver: "Gurpreet Singh (Senior Chauffeur)",
    pickup: "The Oberoi, New Delhi",
    dateTime: "Thursday · 03:00 PM",
    status: "Scheduled"
  }
];

interface VaultKey {
  id: number;
  clientName: string;
  passcode: string;
  validUntil: string;
  generatedAt: string;
  uses: number;
}

const initialVaultKeys: VaultKey[] = [
  { id: 1, clientName: "Birla Family Trust", passcode: "VAULT2026", validUntil: "31 Dec 2026", generatedAt: "Yesterday", uses: 4 },
  { id: 2, clientName: "Hinduja Capital Office", passcode: "VAULT-HIND-88", validUntil: "30 Nov 2026", generatedAt: "3 days ago", uses: 2 }
];

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"leads" | "properties" | "tours" | "vault" | "analytics">("leads");

  // Leads CRM State
  const [leads, setLeads] = useState<Lead[]>(initialMockLeads);
  const [searchLead, setSearchLead] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");
  const [editingNotesLeadId, setEditingNotesLeadId] = useState<number | null>(null);
  const [tempNote, setTempNote] = useState("");

  // Properties State (Static + Custom)
  const [customProperties, setCustomProperties] = useState<Property[]>([]);
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({
    name: "",
    developer: "",
    location: "Sector 128, Noida-Greater Noida Expressway",
    sector: "Sector 128",
    price: "₹8.50 Cr",
    priceNum: 85000000,
    usdPrice: "$1,020,000",
    category: "Residential",
    configuration: "4 BHK + Private Pool",
    area: "4,250 sq.ft.",
    possession: "Q4 2026",
    investment: "High Capital Yield Multiplier",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    rera: "UPRERAPRJ882200",
    overview: "An architectural masterpiece curated for uncompromising privacy and generous living spaces.",
    highlights: "Private elevator foyer, Golf course panorama, Double-height ceilings, 50,000 sq.ft. imperial clubhouse",
    amenities: "Infinity Pool, Private Cinema, Concierge, Helipad Access, Tennis Court",
    isOffMarket: false
  });

  // Chauffeur Tours State
  const [tours, setTours] = useState<ChauffeurTour[]>(initialTours);
  const [newTourModalOpen, setNewTourModalOpen] = useState(false);
  const [newTour, setNewTour] = useState({
    client: "",
    phone: "",
    property: "M3M The Cullinan (Sector 94)",
    vehicle: "Mercedes-Maybach S-Class",
    driver: "Ramesh Sharma",
    pickup: "Indira Gandhi International Airport T3",
    dateTime: "Tomorrow · 12:00 PM"
  });

  // Vault Keys State
  const [vaultKeys, setVaultKeys] = useState<VaultKey[]>(initialVaultKeys);
  const [keyClientName, setKeyClientName] = useState("");

  // Sync leads & custom properties from localStorage on mount
  useEffect(() => {
    try {
      const storedLeads = JSON.parse(localStorage.getItem('investinpro_leads') || '[]');
      if (storedLeads.length > 0) {
        // Merge without duplicates by id
        const merged = [...storedLeads];
        initialMockLeads.forEach(m => {
          if (!merged.some(l => l.id === m.id)) {
            merged.push(m);
          }
        });
        // Client storage hydration intentionally updates state after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLeads(merged);
      }

      const storedProps = JSON.parse(localStorage.getItem('investinpro_custom_properties') || '[]');
      setCustomProperties(storedProps);

      const storedTours = JSON.parse(localStorage.getItem('investinpro_tours') || '[]');
      if (storedTours.length > 0) {
        setTours(storedTours);
      }

      const storedKeys = JSON.parse(localStorage.getItem('investinpro_vault_keys') || '[]');
      if (storedKeys.length > 0) {
        setVaultKeys(storedKeys);
      }
    } catch {}

    const handleLeadsUpdated = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('investinpro_leads') || '[]');
        if (stored.length > 0) {
          const merged = [...stored];
          initialMockLeads.forEach((mockLead) => {
            if (!merged.some((lead) => lead.id === mockLead.id)) merged.push(mockLead);
          });
          setLeads(merged);
        }
      } catch {}
    };

    window.addEventListener('leads-updated', handleLeadsUpdated);
    return () => window.removeEventListener('leads-updated', handleLeadsUpdated);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === credentials.id && password === credentials.password) {
      setLogged(true);
      setError("");
    } else {
      setError("Invalid credentials. Please verify your advisor ID and password.");
    }
  };

  // Status Change for Lead
  const handleStatusChange = (id: number, newStatus: Lead["status"]) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setLeads(updated);
    try {
      localStorage.setItem('investinpro_leads', JSON.stringify(updated));
    } catch {}
  };

  // Save Note for Lead
  const handleSaveNote = (id: number) => {
    const updated = leads.map(l => l.id === id ? { ...l, notes: tempNote } : l);
    setLeads(updated);
    try {
      localStorage.setItem('investinpro_leads', JSON.stringify(updated));
    } catch {}
    setEditingNotesLeadId(null);
  };

  // Export Leads to CSV
  const handleExportCSV = () => {
    const headers = ["ID,Name,Phone,Email,Interest,MeetingType,Budget,Status,Date,Notes"];
    const rows = leads.map(l => {
      const escape = (val: string = "") => `"${val.replace(/"/g, '""')}"`;
      return [
        l.id,
        escape(l.name),
        escape(l.phone),
        escape(l.email),
        escape(l.interest),
        escape(l.meetingType || ""),
        escape(l.budget || ""),
        escape(l.status),
        escape(l.date),
        escape(l.notes || "")
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `investinpro_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add New Property
  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = newProp.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newPropertyObj: Property = {
      slug: slug,
      name: newProp.name,
      developer: newProp.developer,
      location: newProp.location,
      sector: newProp.sector,
      price: newProp.price,
      priceNum: Number(newProp.priceNum) || 50000000,
      usdPrice: newProp.usdPrice,
      category: newProp.category as Property["category"],
      type: newProp.category === 'Commercial' ? 'Commercial' : 'Residential',
      roi: '12.8% p.a.',
      configuration: newProp.configuration,
      area: newProp.area,
      possession: newProp.possession,
      investment: newProp.investment,
      image: newProp.image,
      gallery: [newProp.image],
      rera: newProp.rera,
      overview: newProp.overview,
      highlights: newProp.highlights.split(',').map(s => s.trim()).filter(Boolean),
      amenities: newProp.amenities.split(',').map(s => ({ name: s.trim(), icon: "Sparkles", category: "Wellness" as const })).filter(Boolean),
      connectivity: [
        { name: "Noida-Greater Noida Expressway", time: "Direct Access" },
        { name: "Indira Gandhi Int'l Airport (DEL)", time: "45 Mins" },
        { name: "Jewar Int'l Airport (DXN)", time: "35 Mins" },
        { name: "South Delhi (Kalindi Kunj)", time: "15 Mins" }
      ],
      floorPlans: [
        {
          title: "Executive Master Layout",
          specs: `${newProp.configuration} · Super Area: ${newProp.area}`,
          price: newProp.price,
          size: newProp.area,
          carpetArea: `${Math.round(parseInt(newProp.area) * 0.78) || 3000} sq.ft.`
        }
      ]
    };

    const updated = [newPropertyObj, ...customProperties];
    setCustomProperties(updated);
    try {
      localStorage.setItem('investinpro_custom_properties', JSON.stringify(updated));
    } catch {}

    setPropertyModalOpen(false);
    alert(`Property "${newProp.name}" has been successfully published! It is now live in the catalog.`);
  };

  // Delete Custom Property
  const handleDeleteCustomProperty = (slug: string) => {
    if (confirm("Are you sure you want to remove this property listing from the live portal?")) {
      const updated = customProperties.filter(p => p.slug !== slug);
      setCustomProperties(updated);
      try {
        localStorage.setItem('investinpro_custom_properties', JSON.stringify(updated));
      } catch {}
    }
  };

  // Schedule Chauffeur Tour
  const handleScheduleTour = (e: React.FormEvent) => {
    e.preventDefault();
    const newTourObj: ChauffeurTour = {
      id: Date.now(),
      client: newTour.client,
      phone: newTour.phone,
      property: newTour.property,
      vehicle: newTour.vehicle,
      driver: newTour.driver,
      pickup: newTour.pickup,
      dateTime: newTour.dateTime,
      status: "Scheduled"
    };
    const updated = [newTourObj, ...tours];
    setTours(updated);
    try {
      localStorage.setItem('investinpro_tours', JSON.stringify(updated));
    } catch {}
    setNewTourModalOpen(false);
    alert(`Chauffeur tour dispatched for ${newTour.client}!`);
  };

  // Generate Vault Passcode
  const handleGenerateVaultKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyClientName.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `VIP-${keyClientName.toUpperCase().slice(0, 4).replace(/[^A-Z]/g, 'X')}-${randomSuffix}`;
    
    const newKey: VaultKey = {
      id: Date.now(),
      clientName: keyClientName,
      passcode: code,
      validUntil: "30 Days from Issue",
      generatedAt: "Just now",
      uses: 0
    };

    const updated = [newKey, ...vaultKeys];
    setVaultKeys(updated);
    try {
      localStorage.setItem('investinpro_vault_keys', JSON.stringify(updated));
    } catch {}
    setKeyClientName("");
    alert(`Vault Key "${code}" created for ${newKey.clientName}! Share this with the client.`);
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    if (selectedStatusFilter !== "All" && l.status !== selectedStatusFilter) return false;
    if (searchLead.trim()) {
      const q = searchLead.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.interest.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // 1. LOGIN SCREEN
  if (!logged) {
    return (
      <main className="min-h-screen -mt-20 bg-[#040805] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#07100b] border border-[#c6a15b]/40 p-8 sm:p-10 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-12 h-12 border border-[#c6a15b] flex items-center justify-center text-[#c6a15b] font-serif text-xl font-bold bg-[#040805] mx-auto mb-3 shadow-[0_0_20px_rgba(198,161,91,0.3)] rotate-45">
              <span className="-rotate-45">IP</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#c6a15b] font-cinzel font-semibold">
              Internal Executive Portal
            </p>
            <h1 className="font-serif text-3xl text-white font-normal mt-1">
              Private Advisory <em>Console</em>
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-medium">
                Advisor ID
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3.5 text-gray-500" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="admin@investinpronoida.com"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full bg-[#0a1610] border border-white/15 px-3 py-2.5 pl-10 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-medium">
                Passcode
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3.5 text-gray-500" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a1610] border border-white/15 px-3 py-2.5 pl-10 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                />
              </div>
            </div>

            {error && (
              <p role="alert" aria-live="polite" className="text-xs text-red-400 bg-red-950/40 p-2.5 border border-red-800/50">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full gold-btn-luxury py-3 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer shadow-lg"
            >
              Sign In to Command Center ↗
            </button>
          </form>

          {/* Quick Demo Fill button */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={() => {
                setAdminId(credentials.id);
                setPassword(credentials.password);
              }}
              className="text-[11px] text-[#dfc17b] hover:underline cursor-pointer"
            >
              Click to Auto-Fill Verified Advisor Credentials
            </button>
            <span className="block text-[10px] text-gray-500 mt-1 font-mono">
              ID: admin@investinpronoida.com · Pass: InvestPro@2026
            </span>
          </div>
        </div>
      </main>
    );
  }

  // 2. AUTHENTICATED COMMAND CENTER
  const allPropertiesCombined = [...customProperties, ...staticProperties];
  const totalValuation = allPropertiesCombined.reduce((acc, p) => acc + (p.priceNum || 0), 0);

  return (
    <main className="min-h-screen -mt-20 bg-[#040805] text-white">
      {/* Executive Top Banner */}
      <header className="border-b border-[#c6a15b]/30 bg-[#07100b] px-4 sm:px-8 py-3.5 flex flex-wrap lg:flex-nowrap justify-between items-center gap-4 sticky top-0 z-30 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#c6a15b] flex items-center justify-center text-[#c6a15b] font-serif text-sm font-bold bg-[#040805] rotate-45">
            <span className="-rotate-45">IP</span>
          </div>
          <div>
            <span className="font-serif tracking-[0.2em] text-sm sm:text-base font-semibold text-white uppercase">
              INVESTINPRO <i className="not-italic text-[#c6a15b]">NOIDA</i>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 block font-light">
              Executive Command Center · Senior Director Console
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav aria-label="Admin sections" className="order-3 lg:order-none w-full lg:w-auto flex items-center gap-1 sm:gap-2 bg-[#040805] p-1 border border-white/10 overflow-x-auto text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setActiveTab("leads")}
            aria-pressed={activeTab === "leads"}
            className={`px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "leads" 
                ? 'bg-[#c6a15b] text-[#040805] font-bold shadow' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User size={13} />
            <span>Live Leads</span>
            <span className="text-[9px] px-1.5 py-0.2 bg-black/40 rounded-full font-bold">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("properties")}
            aria-pressed={activeTab === "properties"}
            className={`px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "properties" 
                ? 'bg-[#c6a15b] text-[#040805] font-bold shadow' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Building2 size={13} />
            <span>Portfolio Publisher</span>
            <span className="text-[9px] px-1.5 py-0.2 bg-black/40 rounded-full font-bold">
              {allPropertiesCombined.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("tours")}
            aria-pressed={activeTab === "tours"}
            className={`px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "tours" 
                ? 'bg-[#c6a15b] text-[#040805] font-bold shadow' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Car size={13} />
            <span>Chauffeur Tours</span>
            <span className="text-[9px] px-1.5 py-0.2 bg-black/40 rounded-full font-bold">
              {tours.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("vault")}
            aria-pressed={activeTab === "vault"}
            className={`px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "vault" 
                ? 'bg-[#c6a15b] text-[#040805] font-bold shadow' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Key size={13} />
            <span>Vault Keys</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            aria-pressed={activeTab === "analytics"}
            className={`px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "analytics" 
                ? 'bg-[#c6a15b] text-[#040805] font-bold shadow' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp size={13} />
            <span>Valuation</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-3 text-xs">
          <Link
            href="/"
            className="hidden lg:flex items-center gap-1 text-[#dfc17b] hover:underline"
          >
            <span>Live Site ↗</span>
          </Link>
          <button
            onClick={() => setLogged(false)}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Fast operational snapshot */}
        <section aria-label="Operational snapshot" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "New VIP leads", value: leads.filter((lead) => lead.status === "New VIP").length, detail: "Needs first response", icon: User },
            { label: "Tours in motion", value: tours.filter((tour) => tour.status !== "Completed").length, detail: "Scheduled or en route", icon: Car },
            { label: "Vault keys active", value: vaultKeys.length, detail: "Private client access", icon: Key },
            { label: "Live portfolio", value: allPropertiesCombined.length, detail: "Curated opportunities", icon: Building2 },
          ].map(({ label, value, detail, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveTab(label === "New VIP leads" ? "leads" : label === "Tours in motion" ? "tours" : label === "Vault keys active" ? "vault" : "properties")}
              className="group min-w-0 text-left bg-[#07100b] border border-white/10 hover:border-[#c6a15b]/50 p-4 sm:p-5 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase tracking-[0.16em] text-gray-400">{label}</span>
                <Icon size={15} className="text-[#c6a15b] shrink-0" />
              </div>
              <strong className="mt-2 block font-serif text-3xl text-[#dfc17b] font-normal">{value}</strong>
              <span className="mt-1 block truncate text-[10px] text-gray-500 group-hover:text-gray-300">{detail} →</span>
            </button>
          ))}
        </section>
        
        {/* TAB 1: LIVE CRM LEADS */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-[#07100b] border border-[#c6a15b]/30 p-5 shadow-xl">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl text-white">Live Client Enquiries & CRM</h2>
                  <span className="text-[10px] bg-[#25D366]/20 text-[#25D366] px-2 py-0.5 border border-[#25D366]/40 font-semibold uppercase">
                    Real-time Sync Active
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Enquiries received via VIP Consultation modals, WhatsApp dispatchers, and Chauffeur tour bookings.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative w-full sm:w-60">
                  <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by client or property..."
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    className="w-full bg-[#0a1610] border border-white/15 py-1.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="bg-[#0a1610] border border-white/15 py-1.5 px-3 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                >
                  <option value="All">All Statuses</option>
                  <option value="New VIP">New VIP</option>
                  <option value="Tour Scheduled">Tour Scheduled</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Deal Closed">Deal Closed</option>
                </select>

                {/* Export CSV Button */}
                <button
                  onClick={handleExportCSV}
                  className="gold-btn-luxury px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download size={13} />
                  <span>Export to CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-[#07100b] border border-white/10 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto overscroll-x-contain">
                <table className="w-full text-left text-xs text-gray-300 border-collapse">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-[#c6a15b]/20 bg-[#0a1610] text-[10px] uppercase tracking-wider text-gray-400">
                      <th className="py-3 px-4">Client Name & Email</th>
                      <th className="py-3 px-4">Phone / WhatsApp</th>
                      <th className="py-3 px-4">Property / Requirement</th>
                      <th className="py-3 px-4">Budget / Meeting</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Direct Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-white">
                          {lead.name}
                          <span className="text-[10px] text-gray-400 font-normal block font-mono">{lead.email}</span>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-gray-200">
                          {lead.phone}
                        </td>

                        <td className="py-3.5 px-4 text-[#dfc17b] font-medium">
                          {lead.interest}
                          {lead.source && (
                            <span className="text-[9px] text-gray-500 block uppercase font-mono">
                              Via {lead.source}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-gray-300">
                          <span className="font-semibold block text-white">{lead.budget}</span>
                          <span className="text-[10px] text-gray-400">{lead.meetingType || "Consultation"}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                            className="bg-[#040805] border border-white/20 text-[#dfc17b] text-[10px] py-1 px-2 font-semibold focus:outline-none focus:border-[#c6a15b]"
                          >
                            <option value="New VIP">New VIP</option>
                            <option value="Tour Scheduled">Tour Scheduled</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Deal Closed">Deal Closed</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-gray-400 text-[11px] whitespace-nowrap">
                          {lead.date}
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                          {/* Direct WhatsApp */}
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20I%20am%20the%20Senior%20Portfolio%20Director%20at%20InvestInPro%20Noida%20following%20up%20on%20your%20interest%20in%20${encodeURIComponent(lead.interest)}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#25D366] hover:underline border border-[#25D366]/30 px-2 py-1 bg-[#25D366]/10"
                            title="Direct WhatsApp"
                          >
                            <MessageSquare size={12} />
                            <span>WhatsApp</span>
                          </a>

                          {/* Call */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-1 text-xs text-[#dfc17b] hover:underline border border-[#c6a15b]/30 px-2 py-1 bg-[#c6a15b]/10"
                            title="Call Patron"
                          >
                            <Phone size={12} />
                            <span>Call</span>
                          </a>

                          {/* Notes Trigger */}
                          <button
                            onClick={() => {
                              setEditingNotesLeadId(lead.id);
                              setTempNote(lead.notes || "");
                            }}
                            className="inline-flex items-center gap-1 text-xs text-gray-300 hover:text-white border border-white/10 px-2 py-1 hover:border-[#c6a15b] cursor-pointer"
                            title="Edit Private Notes"
                          >
                            <FileText size={12} />
                            <span>Notes</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes Modal */}
            {editingNotesLeadId !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
                <div className="w-full max-w-lg bg-[#07100b] border border-[#c6a15b]/50 p-6 space-y-4 text-white shadow-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl text-white">Advisor Confidential Notes</h3>
                    <button
                      onClick={() => setEditingNotesLeadId(null)}
                      className="p-1 text-gray-400 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Add internal client preferences, funding verification, or meeting outcomes.
                  </p>
                  <textarea
                    rows={5}
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    placeholder="e.g. Client requested high-floor corner residence, fund verification completed with Barclays Dubai..."
                    className="w-full bg-[#0a1610] border border-white/20 p-3 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                  />
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditingNotesLeadId(null)}
                      className="px-4 py-2 border border-white/20 text-xs text-gray-300 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveNote(editingNotesLeadId)}
                      className="gold-btn-luxury px-6 py-2 text-xs cursor-pointer font-bold"
                    >
                      Save Confidential Note
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PORTFOLIO PUBLISHER ("POST NEW PROPERTY") */}
        {activeTab === "properties" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header + Post Button */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#07100b] border border-[#c6a15b]/30 p-5 shadow-xl">
              <div>
                <h2 className="font-serif text-2xl text-white">Active Portfolio & Publisher</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Manage active listings visible to HNIs or post new trophy penthouses & commercial floors.
                </p>
              </div>

              <button
                onClick={() => setPropertyModalOpen(true)}
                className="gold-btn-luxury px-5 py-3 text-xs uppercase tracking-widest font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus size={16} />
                <span>Post New Property Listing</span>
              </button>
            </div>

            {/* Custom Published Properties (if any) */}
            {customProperties.length > 0 && (
              <div className="bg-[#07100b] border border-[#c6a15b]/40 p-5 shadow-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#c6a15b]" />
                  <h3 className="font-serif text-xl text-[#dfc17b]">Recently Published by Admin ({customProperties.length})</h3>
                </div>
                <div className="overflow-x-auto overscroll-x-contain">
                  <table className="w-full text-left text-xs text-gray-300 border-collapse">
                    <thead className="sticky top-0 z-10">
                      <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-gray-400">
                        <th className="py-2.5 px-3">Property Name</th>
                        <th className="py-2.5 px-3">Developer</th>
                        <th className="py-2.5 px-3">Sector</th>
                        <th className="py-2.5 px-3">Consideration</th>
                        <th className="py-2.5 px-3">RERA</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {customProperties.map((p) => (
                        <tr key={p.slug} className="hover:bg-white/5">
                          <td className="py-3 px-3 font-semibold text-white">{p.name}</td>
                          <td className="py-3 px-3">{p.developer}</td>
                          <td className="py-3 px-3">{p.sector}</td>
                          <td className="py-3 px-3 text-[#dfc17b] font-medium">{p.price}</td>
                          <td className="py-3 px-3 font-mono text-gray-400">{p.rera}</td>
                          <td className="py-3 px-3 text-right space-x-3">
                            <Link
                              href={`/properties/${p.slug}`}
                              className="text-xs text-[#c6a15b] hover:underline inline-flex items-center gap-1"
                            >
                              <Eye size={12} /> Live View
                            </Link>
                            <button
                              onClick={() => handleDeleteCustomProperty(p.slug)}
                              className="text-xs text-red-400 hover:text-red-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Static Master Collection */}
            <div className="bg-[#07100b] border border-white/10 p-5 shadow-xl">
              <h3 className="font-serif text-xl text-white mb-3">Master Real Estate Inventory ({staticProperties.length})</h3>
              <div className="overflow-x-auto overscroll-x-contain">
                <table className="w-full text-left text-xs text-gray-300 border-collapse">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-gray-400">
                      <th className="py-2.5 px-3">Property</th>
                      <th className="py-2.5 px-3">Developer</th>
                      <th className="py-2.5 px-3">Location</th>
                      <th className="py-2.5 px-3">Price</th>
                      <th className="py-2.5 px-3">RERA ID</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {staticProperties.map((p) => (
                      <tr key={p.slug} className="hover:bg-white/5">
                        <td className="py-3 px-3 font-semibold text-white">{p.name}</td>
                        <td className="py-3 px-3">{p.developer}</td>
                        <td className="py-3 px-3">{p.location}</td>
                        <td className="py-3 px-3 text-[#dfc17b] font-medium">{p.price}</td>
                        <td className="py-3 px-3 font-mono text-gray-400 text-[11px]">{p.rera}</td>
                        <td className="py-3 px-3 text-right">
                          <Link
                            href={`/properties/${p.slug}`}
                            className="text-xs text-[#c6a15b] hover:underline inline-flex items-center gap-1"
                          >
                            <Eye size={12} /> View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Post New Property Modal */}
            {propertyModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
                <div className="w-full max-w-2xl bg-[#07100b] border border-[#c6a15b]/50 p-6 sm:p-8 space-y-6 text-white max-h-[92vh] overflow-y-auto shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="font-serif text-2xl text-white">Post New Property Listing</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Publish an ultra-luxury residence or commercial floor to the live portal.</p>
                    </div>
                    <button
                      onClick={() => setPropertyModalOpen(false)}
                      className="p-1.5 text-gray-400 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleAddProperty} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Property Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. DLF Privana Sky Villa"
                          value={newProp.name}
                          onChange={(e) => setNewProp({ ...newProp, name: e.target.value })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Developer *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. DLF Limited / Max Estates"
                          value={newProp.developer}
                          onChange={(e) => setNewProp({ ...newProp, developer: e.target.value })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Sector *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sector 128"
                          value={newProp.sector}
                          onChange={(e) => setNewProp({ ...newProp, sector: e.target.value })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Category</label>
                        <select
                          value={newProp.category}
                          onChange={(e) => setNewProp({ ...newProp, category: e.target.value })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Penthouse">Penthouse</option>
                          <option value="Sky Mansion">Sky Mansion</option>
                          <option value="Land Parcel">Land Parcel</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Configuration</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 4 BHK + Private Pool"
                          value={newProp.configuration}
                          onChange={(e) => setNewProp({ ...newProp, configuration: e.target.value })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Price Display (INR) *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ₹9.20 Cr"
                          value={newProp.price}
                          onChange={(e) => setNewProp({ ...newProp, price: e.target.value })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Price Numeric (INR) *</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 92000000"
                          value={newProp.priceNum}
                          onChange={(e) => setNewProp({ ...newProp, priceNum: Number(e.target.value) })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">USD Equivalent</label>
                        <input
                          type="text"
                          placeholder="e.g. $1,100,000"
                          value={newProp.usdPrice}
                          onChange={(e) => setNewProp({ ...newProp, usdPrice: e.target.value })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Carpet Area</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 4,500 sq.ft."
                          value={newProp.area}
                          onChange={(e) => setNewProp({ ...newProp, area: e.target.value })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">UP RERA Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. UPRERAPRJ112233"
                          value={newProp.rera}
                          onChange={(e) => setNewProp({ ...newProp, rera: e.target.value })}
                          className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Image URL</label>
                      <input
                        type="url"
                        required
                        placeholder="https://images.unsplash.com/..."
                        value={newProp.image}
                        onChange={(e) => setNewProp({ ...newProp, image: e.target.value })}
                        className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Architectural Overview Narrative</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Detailed luxury narrative of the project..."
                        value={newProp.overview}
                        onChange={(e) => setNewProp({ ...newProp, overview: e.target.value })}
                        className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-wider mb-1 font-medium">Trophy Highlights (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="Private lap pool, Golf course views, Double height lobby"
                        value={newProp.highlights}
                        onChange={(e) => setNewProp({ ...newProp, highlights: e.target.value })}
                        className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                      />
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setPropertyModalOpen(false)}
                        className="px-5 py-2.5 border border-white/20 text-gray-300 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="gold-btn-luxury px-6 py-2.5 font-bold cursor-pointer shadow-lg"
                      >
                        Publish to Live Catalog ↗
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ROYAL CHAUFFEUR TOUR DISPATCHER */}
        {activeTab === "tours" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#07100b] border border-[#c6a15b]/30 p-5 shadow-xl">
              <div>
                <h2 className="font-serif text-2xl text-white">Royal Chauffeur Fleet & Inspections</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Manage private Maybach and BMW 7-Series site viewing tours for VIP clients and HNIs.
                </p>
              </div>

              <button
                onClick={() => setNewTourModalOpen(true)}
                className="gold-btn-luxury px-5 py-3 text-xs uppercase tracking-widest font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus size={16} />
                <span>Dispatch New Inspection</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tours.map((tour) => (
                <div key={tour.id} className="bg-[#07100b] border border-white/10 p-6 shadow-xl space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#dfc17b] font-cinzel font-semibold block">
                        VIP Chauffeur Inspection #{tour.id}
                      </span>
                      <h3 className="font-serif text-xl text-white mt-1">{tour.client}</h3>
                      <span className="text-xs text-gray-400 font-mono">{tour.phone}</span>
                    </div>

                    <span className="bg-[#c6a15b]/15 text-[#dfc17b] border border-[#c6a15b]/40 text-[10px] uppercase font-semibold px-2.5 py-1">
                      {tour.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs border-y border-white/10 py-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-[#c6a15b] shrink-0" />
                      <span>Property: <strong className="text-white">{tour.property}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car size={14} className="text-[#c6a15b] shrink-0" />
                      <span>Vehicle: <strong className="text-white">{tour.vehicle}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-[#c6a15b] shrink-0" />
                      <span>Chauffeur: <strong className="text-white">{tour.driver}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#c6a15b] shrink-0" />
                      <span>Pickup: <strong className="text-white">{tour.pickup}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#c6a15b] shrink-0" />
                      <span>Schedule: <strong className="text-white">{tour.dateTime}</strong></span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <a
                      href={`https://wa.me/${tour.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(tour.client)},%20your%20chauffeur%20${encodeURIComponent(tour.driver)}%20has%20been%20dispatched%20for%20your%20inspection%20of%20${encodeURIComponent(tour.property)}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#25D366] hover:underline flex items-center gap-1"
                    >
                      <MessageSquare size={13} /> Update Patron via WhatsApp
                    </a>

                    <button
                      onClick={() => {
                        const nextStatus: ChauffeurTour["status"] = tour.status === "Scheduled" ? "En Route" : "Completed";
                        const updated = tours.map(t => t.id === tour.id ? { ...t, status: nextStatus } : t);
                        setTours(updated);
                        try { localStorage.setItem('investinpro_tours', JSON.stringify(updated)); } catch {}
                      }}
                      className="text-xs text-[#dfc17b] hover:underline cursor-pointer font-medium"
                    >
                      Mark as {tour.status === "Scheduled" ? "En Route" : "Completed"} ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Dispatch Modal */}
            {newTourModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
                <div className="w-full max-w-lg bg-[#07100b] border border-[#c6a15b]/50 p-6 space-y-4 text-white shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-serif text-xl text-white">Dispatch Royal Chauffeur Tour</h3>
                    <button onClick={() => setNewTourModalOpen(false)} className="p-1 text-gray-400 hover:text-white">
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleScheduleTour} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-gray-400 uppercase tracking-wider mb-1">Client Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Harsh Goenka"
                        value={newTour.client}
                        onChange={(e) => setNewTour({ ...newTour, client: e.target.value })}
                        className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-wider mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98111 00000"
                        value={newTour.phone}
                        onChange={(e) => setNewTour({ ...newTour, phone: e.target.value })}
                        className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-wider mb-1">Assigned Luxury Fleet Vehicle</label>
                      <select
                        value={newTour.vehicle}
                        onChange={(e) => setNewTour({ ...newTour, vehicle: e.target.value })}
                        className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                      >
                        <option value="Mercedes-Maybach S-Class (DL 1C AB 0001)">Mercedes-Maybach S-Class (DL 1C AB 0001)</option>
                        <option value="BMW 7-Series LWB (DL 2C XY 7777)">BMW 7-Series LWB (DL 2C XY 7777)</option>
                        <option value="Range Rover Autobiography (DL 9C ZZ 9999)">Range Rover Autobiography (DL 9C ZZ 9999)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-wider mb-1">Pickup Location</label>
                      <input
                        type="text"
                        required
                        value={newTour.pickup}
                        onChange={(e) => setNewTour({ ...newTour, pickup: e.target.value })}
                        className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-wider mb-1">Date & Time</label>
                      <input
                        type="text"
                        required
                        value={newTour.dateTime}
                        onChange={(e) => setNewTour({ ...newTour, dateTime: e.target.value })}
                        className="w-full bg-[#0a1610] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#c6a15b]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setNewTourModalOpen(false)}
                        className="px-4 py-2 border border-white/20 text-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="gold-btn-luxury px-6 py-2 font-bold"
                      >
                        Dispatch Chauffeur ↗
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PRIVATE VAULT PASSCODE GENERATOR */}
        {activeTab === "vault" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#07100b] border border-[#c6a15b]/30 p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <Key size={18} className="text-[#dfc17b]" />
                <h2 className="font-serif text-2xl text-white">Private Vault Passcode Generator</h2>
              </div>
              <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                Accredited family offices and institutional buyers require a confidential access keycard to view off-market trophy penthouses and Jewar data center land parcels. Generate bespoke passcodes below.
              </p>

              <form onSubmit={handleGenerateVaultKey} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="text"
                  required
                  placeholder="Enter Family Office or Patron Name (e.g. Dalmia Trust)..."
                  value={keyClientName}
                  onChange={(e) => setKeyClientName(e.target.value)}
                  className="flex-1 bg-[#0a1610] border border-white/20 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#c6a15b]"
                />
                <button
                  type="submit"
                  className="gold-btn-luxury px-6 py-2.5 text-xs uppercase tracking-wider font-bold cursor-pointer shrink-0"
                >
                  Generate VIP Keycard ↗
                </button>
              </form>
            </div>

            {/* Issued Keys Table */}
            <div className="bg-[#07100b] border border-white/10 p-5 shadow-xl">
              <h3 className="font-serif text-xl text-white mb-3">Active Vault Keys & Access Logs</h3>
              <div className="overflow-x-auto overscroll-x-contain">
                <table className="w-full text-left text-xs text-gray-300 border-collapse">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-gray-400">
                      <th className="py-2.5 px-3">Patron / Family Office</th>
                      <th className="py-2.5 px-3">VIP Passcode</th>
                      <th className="py-2.5 px-3">Validity</th>
                      <th className="py-2.5 px-3">Issued</th>
                      <th className="py-2.5 px-3">Unlock Count</th>
                      <th className="py-2.5 px-3 text-right">Copy Passcode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {vaultKeys.map((k) => (
                      <tr key={k.id} className="hover:bg-white/5">
                        <td className="py-3 px-3 font-semibold text-white">{k.clientName}</td>
                        <td className="py-3 px-3">
                          <code className="text-[#dfc17b] font-mono font-bold bg-[#040805] px-2 py-0.5 border border-[#c6a15b]/30">
                            {k.passcode}
                          </code>
                        </td>
                        <td className="py-3 px-3 text-gray-400">{k.validUntil}</td>
                        <td className="py-3 px-3 text-gray-400">{k.generatedAt}</td>
                        <td className="py-3 px-3 text-[#25D366] font-semibold">{k.uses} Decryptions</td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(k.passcode);
                              alert(`Passcode "${k.passcode}" copied to clipboard!`);
                            }}
                            className="text-xs text-[#c6a15b] hover:underline cursor-pointer"
                          >
                            Copy Code
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: VALUATION & ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-fadeIn">
            {/* 4 Big Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#07100b] border border-[#c6a15b]/30 p-6 shadow-xl">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Total Portfolio Value</span>
                <p className="font-serif text-3xl sm:text-4xl text-[#dfc17b] font-normal">₹{(totalValuation / 10000000).toFixed(0)} Cr</p>
                <small className="text-[#25D366] text-[10px] block mt-1">Across 12+ verified enclaves</small>
              </div>

              <div className="bg-[#07100b] border border-[#c6a15b]/30 p-6 shadow-xl">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Active Leads Pipeline</span>
                <p className="font-serif text-3xl sm:text-4xl text-white font-normal">₹184 Cr</p>
                <small className="text-[#c6a15b] text-[10px] block mt-1">{leads.length} qualified family offices</small>
              </div>

              <div className="bg-[#07100b] border border-[#c6a15b]/30 p-6 shadow-xl">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Avg. Ticket Size</span>
                <p className="font-serif text-3xl sm:text-4xl text-white font-normal">₹9.8 Cr</p>
                <small className="text-gray-400 text-[10px] block mt-1">Ultra-HNI and NRI segment</small>
              </div>

              <div className="bg-[#07100b] border border-[#c6a15b]/30 p-6 shadow-xl">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Scheduled Chauffeur Tours</span>
                <p className="font-serif text-3xl sm:text-4xl text-[#dfc17b] font-normal">{tours.length}</p>
                <small className="text-gray-400 text-[10px] block mt-1">Mercedes-Maybach & BMW fleet</small>
              </div>
            </div>

            {/* Micro-market Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#07100b] border border-white/10 p-6 shadow-xl space-y-4">
                <h3 className="font-serif text-xl text-white">Demand Distribution by Micro-Market</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Noida Expressway (Sectors 128, 146, 150)</span>
                      <strong className="text-[#dfc17b]">48% Demand</strong>
                    </div>
                    <div className="w-full h-2 bg-[#040805]">
                      <div className="h-full bg-[#c6a15b] w-[48%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>South Delhi Gateway (Sector 94 Waterfront)</span>
                      <strong className="text-[#dfc17b]">28% Demand</strong>
                    </div>
                    <div className="w-full h-2 bg-[#040805]">
                      <div className="h-full bg-[#dfc17b] w-[28%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Jewar Airport & Yamuna Expressway (DXN)</span>
                      <strong className="text-[#dfc17b]">16% Demand</strong>
                    </div>
                    <div className="w-full h-2 bg-[#040805]">
                      <div className="h-full bg-[#25D366] w-[16%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Central Noida (Sector 18 & Commercial)</span>
                      <strong className="text-[#dfc17b]">8% Demand</strong>
                    </div>
                    <div className="w-full h-2 bg-[#040805]">
                      <div className="h-full bg-gray-500 w-[8%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#07100b] border border-white/10 p-6 shadow-xl space-y-4">
                <h3 className="font-serif text-xl text-white">HNI Demographic Profile</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#040805] border border-white/10">
                    <span className="text-gray-400 text-[10px] uppercase block">NRI Buyers</span>
                    <strong className="text-white text-lg font-serif block mt-1">36%</strong>
                    <span className="text-[10px] text-[#c6a15b]">Dubai, London, Singapore</span>
                  </div>

                  <div className="p-4 bg-[#040805] border border-white/10">
                    <span className="text-gray-400 text-[10px] uppercase block">Delhi Promoters</span>
                    <strong className="text-white text-lg font-serif block mt-1">42%</strong>
                    <span className="text-[10px] text-[#c6a15b]">Upgrading from South Delhi</span>
                  </div>

                  <div className="p-4 bg-[#040805] border border-white/10">
                    <span className="text-gray-400 text-[10px] uppercase block">Tech & Corporate CXOs</span>
                    <strong className="text-white text-lg font-serif block mt-1">15%</strong>
                    <span className="text-[10px] text-[#c6a15b]">MNCs in Sectors 62 & 132</span>
                  </div>

                  <div className="p-4 bg-[#040805] border border-white/10">
                    <span className="text-gray-400 text-[10px] uppercase block">Institutional Land</span>
                    <strong className="text-white text-lg font-serif block mt-1">7%</strong>
                    <span className="text-[10px] text-[#c6a15b]">Jewar Data Centers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
