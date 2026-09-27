import { useState, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { 
  Clock, MapPin, Cloud, Volume2, VolumeX, Play, BellRing, Menu, X, 
  ShieldCheck, FileText, CheckCircle, Copy, Printer, Download, Sparkles,
  MessageSquare, Send, Plus, ChevronRight, Activity, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bhashiniVoiceAdvisories, strategicChokepoints } from '@/lib/ner-data';

export function AppChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sitrepModal, setSitrepModal] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'reg' | null>(null);
  const [timeStr, setTimeStr] = useState('12:06:00 pm');
  const [dateStr, setDateStr] = useState('Sun, 27 Sep');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [copied, setCopied] = useState(false);

  // Floating INDRABOT / SARTHIBOT Drawer state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    {
      sender: 'bot',
      text: 'NER-SARTHI Global Ontology Engine AI online. Select an Intelligence Mode (+) next to the input to generate charts, tables, or search terrain telemetry for insights.'
    }
  ]);

  const path = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).toLowerCase()
      );
      setDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    if ('speechSynthesis' in window) {
      if (nextState) {
        const item = bhashiniVoiceAdvisories.find(v => v.language === selectedLang) ?? bhashiniVoiceAdvisories[0];
        const announcement = item ? item.announcement : 'Voice guidance enabled for NER-SARTHI.';
        const utterance = new SpeechSynthesisUtterance(
          `Voice guidance enabled. ${announcement.slice(0, 85)}...`
        );
        utterance.rate = 1.0;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    if (audioEnabled && 'speechSynthesis' in window) {
      const item = bhashiniVoiceAdvisories.find(v => v.language === lang) ?? bhashiniVoiceAdvisories[0];
      const announcement = item ? item.announcement : 'Language updated.';
      const utterance = new SpeechSynthesisUtterance(announcement);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          text: `Grounded SITREP for "${userText}": NH-27 KM 148 Jatinga Slump risk index is 86/100 with 124mm rainfall. Umrangso bypass is active. NFR Railhead Ro-Ro freight shuttle on 4-hour standby at Lumding.` 
        }
      ]);
    }, 600);
  };

  const handleCopySitrep = () => {
    const sitrepContent = `=====================================================
GOVERNMENT OF INDIA · MINISTRY OF DEVELOPMENT OF NER
REGIONAL LOGISTICS SITUATION REPORT (SITREP)
REF: MDoNER-GIS-SITREP-2026-0927-1030IST
=====================================================

1. EXECUTIVE SUMMARY:
- 8 of 8 North Eastern States are operational.
- 64 Districts actively monitored under InSAR satellite radar and IMD Doppler grid.
- Critical Chokepoints: Siliguri Corridor (High Traffic: 4,200 trucks/day), Jatinga Escarpment KM 148 (High Landslide Risk: 86/100).
- Highway Bypasses Active: Umrangso-Lanka diversion operational for heavy freight.
- Multimodal Fallbacks: NFR Railhead Freight (Lumding-Badarpur) and IWAI NW-2 River Barge (Pandu-Jogighopa) on active standby.

2. LIFE-SAVING SUPPLY ASSURANCE:
- Hospital Oxygen: 99.4% depot adequacy. Zero stockouts.
- Foodgrain (FCI): 14 days strategic buffer maintained in Barak Valley.
- POL Fuel: Silchar railhead depot buffer at 88% capacity.

Authenticated by: National Decision Support System (NER-SARTHI)`;

    navigator.clipboard.writeText(sitrepContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 
        ====================================================
        1. INDRA EXACT TOP NAVBAR
        ====================================================
      */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-4 px-4 py-2.5 lg:px-8">
          {/* Left capsule: Time, Date, Location, Weather */}
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/80 px-3.5 py-1.5 text-xs text-slate-600 shadow-2xs font-medium">
            <span className="flex items-center gap-1.5 font-bold text-slate-800">
              <Clock className="size-3.5 text-slate-500" />
              {timeStr}
            </span>
            <span className="text-slate-300">|</span>
            <span>{dateStr}</span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="size-3.5 text-red-500" />
              Guwahati · New Delhi (MDoNER)
            </span>
            <span className="text-slate-300 hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1 font-semibold text-slate-700">
              <Cloud className="size-3.5 text-sky-500" />
              24.2°C · NER Grid
            </span>
          </div>

          {/* Right Action Tools: Speaker, Select Language, Simulation, Registration, Login */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Blue Speaker Button */}
            <button
              type="button"
              onClick={toggleAudio}
              className="grid size-9 place-items-center rounded-lg border border-sky-200 bg-sky-50 text-blue-600 hover:bg-sky-100 transition-colors shadow-2xs"
              title={audioEnabled ? 'Turn Off Audio Guidance' : 'Turn On Audio Guidance'}
            >
              {audioEnabled ? <Volume2 className="size-4 animate-pulse text-emerald-600" /> : <Volume2 className="size-4" />}
            </button>

            {/* Select Language Dropdown */}
            <div className="relative">
              <select
                aria-label="Select Regional Language"
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="h-9 rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
              >
                <option value="English">Select Language</option>
                <option value="English">English</option>
                <option value="हिन्दी">हिन्दी (Hindi)</option>
                <option value="অসমীয়া">অসমীয়া (Assamese)</option>
                <option value="বাংলা">বাংলা (Bengali)</option>
                <option value="মৈতৈলোন্">মৈতৈলোন্ (Meitei)</option>
                <option value="Bodo">बड़ो (Bodo)</option>
                <option value="Mizo">Mizo ṭawng</option>
              </select>
            </div>

            {/* Simulation Pill Button */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-lg border-blue-200 text-blue-600 font-bold text-xs hover:bg-blue-50 gap-1.5 shadow-2xs hidden sm:inline-flex"
              onClick={() => {
                const el = document.getElementById('bvs-section') || document.getElementById('dashboard-view');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Play className="size-3 fill-blue-600" />
              SIMULATION
            </Button>

            {/* Registration Emerald Pill */}
            <Button
              size="sm"
              className="h-9 rounded-lg bg-[#059669] hover:bg-emerald-700 text-white font-bold text-xs uppercase px-3.5 sm:px-4 shadow-xs"
              onClick={() => setSitrepModal(true)}
            >
              SITREP REPORT
            </Button>

            {/* Login Royal Blue Pill */}
            <Button
              size="sm"
              className="h-9 rounded-lg bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs uppercase px-4 shadow-xs"
              onClick={() => setAuthModal('login')}
            >
              LOGIN
            </Button>

            {/* Mobile Nav Toggle */}
            <button
              type="button"
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {open && (
          <div className="border-t border-slate-200 bg-white p-3 lg:hidden space-y-1 text-xs font-bold text-slate-700">
            <Link to="/" onClick={() => setOpen(false)} className="block p-2 rounded hover:bg-slate-100">
              Command Center (GIS)
            </Link>
            <Link to="/corridors" onClick={() => setOpen(false)} className="block p-2 rounded hover:bg-slate-100">
              Strategic Corridors
            </Link>
            <Link to="/fleet" onClick={() => setOpen(false)} className="block p-2 rounded hover:bg-slate-100">
              NavIC Fleet Telemetry
            </Link>
            <Link to="/roles" onClick={() => setOpen(false)} className="block p-2 rounded hover:bg-slate-100">
              Role Portals
            </Link>
            <Link to="/citizen" onClick={() => setOpen(false)} className="block p-2 rounded hover:bg-slate-100">
              Citizen & Driver Mobile
            </Link>
            <Link to="/copilot" onClick={() => setOpen(false)} className="block p-2 rounded hover:bg-slate-100">
              AI Decision Co-Pilot
            </Link>
          </div>
        )}
      </header>

      {/* 
        ====================================================
        2. INDRA EXACT CRIMSON RED LIVE ALERT FEED MARQUEE
        ====================================================
      */}
      <div className="bg-[#c81e1e] text-white px-4 py-1.5 text-xs font-bold overflow-hidden shadow-xs flex items-center">
        <div className="mx-auto max-w-[1540px] w-full flex items-center gap-3">
          {/* Dark Red Capsule Badge */}
          <div className="shrink-0 flex items-center gap-2 rounded-full bg-[#991b1b] px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-white border border-red-400/40 shadow-xs">
            <span className="size-2 rounded-full bg-white animate-ping inline-block" />
            LIVE ALERT FEED
          </div>

          {/* Marquee Text */}
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="marquee-track inline-block text-[11.5px] font-medium text-white tracking-wide">
              <span className="mx-4 font-bold">MDoNER LOGISTICS COMMAND: 64 Hill & Valley Districts Active Under InSAR Landslide Monitoring Grid</span>
              <span className="mx-4 font-bold">• NH-27 DIMA HASAO: High Landslide Probability at KM 148 Jatinga Slump [Risk: 86/100, BVS: 0.85] — Heavy POL trucks routed via Umrangso Bypass</span>
              <span className="mx-4 font-bold">• SILIGURI CORRIDOR ("CHICKEN'S NECK"): 22km Gateway Active · 4,200 Freight Convoys Paced at Srirampur & Boxirhat Entry Gates</span>
              <span className="mx-4 font-bold">• SIKKIM LIFELINE: NH-10 Teesta Corridor clearance underway at 29th Mile with BRO Project Swastik Heavy Earthmovers</span>
              <span className="mx-4 font-bold">• MULTIMODAL WATERWAY FALLBACK: IWAI National Waterway-2 (Brahmaputra) Ro-Pax Barge active for Majuli Island & Silchar relief</span>
              <span className="mx-4 font-bold">• RAILHEAD INTERMODAL: NFR Lumding-Badarpur Hill Section flatbed freight rakes standing by for essential grain & diesel</span>
              <span className="mx-4 font-bold">• BHASHINI ACCESSIBILITY: 230+ Regional Dialects Active across Offline Field App & Toll-Free Citizen IVRS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Page Body */}
      <main className="flex-1">{children}</main>

      {/* 
        ====================================================
        3. FLOATING SARTHIBOT / INDRABOT DRAWER & BUTTON
        ====================================================
      */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Floating Chat Drawer Popout */}
        {chatOpen && (
          <div className="mb-3 w-[340px] sm:w-[400px] rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md animate-fade-in text-xs">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="grid size-8 place-items-center rounded-full bg-blue-600 text-white">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900">SARTHIBOT AI</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">Grounded Decision Intelligence SLM</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Conversation Window */}
            <div className="my-3 max-h-[260px] overflow-y-auto space-y-2.5 pr-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-blue-600 text-white max-w-[85%]'
                      : 'bg-slate-100 text-slate-800 border border-slate-200/80 max-w-[95%]'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Bar with Plus button and Send Plane (Exact INDRA style) */}
            <form onSubmit={handleSendChat} className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                className="grid size-9 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                title="Select Intelligence Mode"
              >
                <Plus className="size-4" />
              </button>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Message NER-SARTHI Core..."
                  className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Send className="size-3" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Circular Floating Assistant Button */}
        <button
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          className="grid size-13 place-items-center rounded-full bg-[#0b3d6b] text-white shadow-xl hover:scale-105 transition-transform border-2 border-white"
          title="Open AI Decision Co-Pilot"
        >
          <MessageSquare className="size-6" />
        </button>
      </div>

      {/* 
        ====================================================
        4. OFFICIAL GOVERNMENT FOOTER
        ====================================================
      */}
      <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600 py-10 px-4 lg:px-8">
        <div className="mx-auto max-w-[1540px] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-3">
            <span className="font-black text-slate-900 text-base">NER-SARTHI</span>
            <span>·</span>
            <span>Ministry of Development of North Eastern Region (MDoNER)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button onClick={() => setSitrepModal(true)} className="hover:text-blue-600">SITREP Dossier</button>
            <Link to="/corridors" className="hover:text-blue-600">Corridors</Link>
            <Link to="/fleet" className="hover:text-blue-600">Fleet Telemetry</Link>
            <Link to="/roles" className="hover:text-blue-600">Role Portals</Link>
            <Link to="/copilot" className="hover:text-blue-600">Co-Pilot</Link>
          </div>
        </div>
      </footer>

      {/* SITREP Executive Dossier Modal */}
      {sitrepModal && (
        <div 
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto" 
          onMouseDown={e => { if (e.target === e.currentTarget) setSitrepModal(false); }}
        >
          <div role="dialog" aria-modal="true" className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl animate-fade-in my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                  Government of India · Ministry of Development of NER
                </span>
                <h2 className="text-xl font-black text-slate-900">Regional Logistics Situation Report (SITREP)</h2>
                <p className="text-xs font-mono text-slate-500">Dossier ID: MDoNER-GIS-SITREP-2026-0927-1030IST</p>
              </div>
              <button onClick={() => setSitrepModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <p className="font-bold text-slate-900 text-sm">1. Regional Operational Overview (IST 10:30)</p>
                <p className="mt-1 text-slate-600">
                  All 8 North Eastern states remain operational. 64 districts actively monitored under InSAR slope telemetry and IMD rainfall grids. 6 districts are on elevated disruption exposure with 2 strategic highland corridors operating on active bypass detours.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="font-bold text-slate-900 text-sm mb-2">2. Strategic Bottlenecks Telemetry</p>
                <div className="divide-y divide-slate-100">
                  {strategicChokepoints.slice(0, 4).map((chk) => (
                    <div key={chk.id} className="py-2 flex items-start justify-between gap-3">
                      <div>
                        <span className="font-bold text-slate-900">{chk.name}</span>
                        <p className="text-[11px] text-slate-500">{chk.description}</p>
                      </div>
                      <span className="shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {chk.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
              <span className="text-[11px] text-slate-400 font-mono">AUTH: NER-NDSS-SHA256-AUTHENTICATED</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCopySitrep}>
                  <Copy className="size-3.5 mr-1" />
                  {copied ? 'Copied!' : 'Copy SITREP Text'}
                </Button>
                <Button size="sm" className="bg-blue-600 text-white font-bold" onClick={() => window.print()}>
                  <Printer className="size-3.5 mr-1" /> Print PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login / Registration Modal */}
      {authModal && (
        <div 
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={e => { if (e.target === e.currentTarget) setAuthModal(null); }}
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-black text-base text-slate-900">
                {authModal === 'login' ? 'Officer & DM Portal Login' : 'National Portal Registration'}
              </h3>
              <button onClick={() => setAuthModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="size-4" />
              </button>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Email / Gov ID</label>
              <input type="text" defaultValue="officer@mdoner.gov.in" className="w-full h-9 rounded-lg border border-slate-300 px-3 text-xs" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Security PIN / DigiLocker Key</label>
              <input type="password" defaultValue="••••••••" className="w-full h-9 rounded-lg border border-slate-300 px-3 text-xs" />
            </div>
            <Button 
              className="w-full bg-blue-600 text-white font-bold h-9" 
              onClick={() => {
                window.alert('Authenticated via Government of India Single Sign-On (Jan Parichay)!');
                setAuthModal(null);
              }}
            >
              Authenticate & Enter Desk
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
