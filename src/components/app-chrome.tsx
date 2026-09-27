import { useState, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { 
  BellRing, Menu, X, Radio, ShieldCheck, AlertTriangle, FileText, 
  PhoneCall, Download, CheckCircle, ExternalLink, Activity, Satellite,
  Volume2, VolumeX, Languages, Printer, Copy, Sparkles, ZoomIn, ZoomOut,
  Eye, CornerDownRight, Navigation, Anchor, Train
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bhashiniVoiceAdvisories, strategicChokepoints, corridors } from '@/lib/ner-data';

const navItems = [
  { to: '/' as const, label: 'Command Center', badge: 'Live GIS' },
  { to: '/corridors' as const, label: 'Corridors & Disruption', badge: '2 Critical' },
  { to: '/fleet' as const, label: 'Fleet & Supply Chain', badge: '1,284 Active' },
  { to: '/roles' as const, label: 'Role Portals', badge: '6 Desks' },
  { to: '/citizen' as const, label: 'Citizen & Driver', badge: 'Mobile App' },
  { to: '/copilot' as const, label: 'AI Decision Co-Pilot', badge: 'RAG SLM' },
];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [broadcast, setBroadcast] = useState(false);
  const [sitrepModal, setSitrepModal] = useState(false);
  const [time, setTime] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [highContrast, setHighContrast] = useState(false);
  const [textZoom, setTextZoom] = useState(false);
  const [copied, setCopied] = useState(false);
  const path = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) + ' · ' +
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' IST'
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
    <div className={`min-h-screen bg-background text-foreground flex flex-col ${highContrast ? 'high-contrast' : ''} ${textZoom ? 'text-zoom-lg' : ''}`}>
      {/* Tiranga National Stripe */}
      <div className="ashoka-line" />

      {/* Official Government of India Top Banner */}
      <div className="border-b border-border/80 bg-muted/40 px-4 py-1.5 text-[11px] text-muted-foreground lg:px-8">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-foreground">
              <span className="size-2 rounded-full bg-emerald-600 inline-block" />
              भारत सरकार · Government of India
            </span>
            <span className="hidden md:inline text-border">|</span>
            <span className="hidden md:inline font-medium">
              पूर्वोत्तर क्षेत्र विकास मंत्रालय (MDoNER)
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[10px]">
            <span className="hidden sm:flex items-center gap-1.5 font-mono text-foreground font-semibold">
              <span className="pulse-dot size-1.5 rounded-full bg-safe" />
              {time || 'LIVE TELEMETRY IST'}
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-primary font-semibold">
              <Satellite className="size-3.5" />
              NavIC L5 / GSAT-7A Synced
            </span>
            <span className="font-bold text-ashoka bg-ashoka/10 px-2 py-0.5 rounded">
              PM Gati Shakti National Grid
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-4 px-4 py-2.5 lg:px-8">
          {/* Logo & National Emblem Identity */}
          <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
            <div className="grid size-11 place-items-center rounded-lg border-2 border-primary/20 bg-primary/5 text-primary shadow-xs">
              <span className="chakra-mark text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-primary">NER-SARTHI</span>
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-primary">
                  National GIS Platform
                </span>
              </div>
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide">
                Smart Logistics & Accessibility Intelligence for North Eastern Region
              </p>
            </div>
          </Link>

          {/* Action Tools (Inspired by NETRA & INDRA Command Operations) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Audio Voice Guidance Toggle */}
            <Button
              size="sm"
              variant={audioEnabled ? 'default' : 'outline'}
              className={`h-8 px-2.5 text-xs font-semibold gap-1.5 transition-all ${
                audioEnabled 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs' 
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
              onClick={toggleAudio}
              title={audioEnabled ? 'Voice Guidance On (Web Speech Active)' : 'Turn On Audio Guidance'}
            >
              {audioEnabled ? <Volume2 className="size-3.5 animate-pulse" /> : <VolumeX className="size-3.5" />}
              <span className="hidden sm:inline">{audioEnabled ? 'Audio On' : 'Voice'}</span>
            </Button>

            {/* Bhashini Multi-Language Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                aria-label="Select Regional Language"
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="h-8 rounded-md border border-input bg-background/90 px-2 py-0.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-2xs"
              >
                <option value="English">🇮🇳 English</option>
                <option value="हिन्दी">🇮🇳 हिन्दी (Hindi)</option>
                <option value="অসমীয়া">🇮🇳 অসমীয়া (Assam)</option>
                <option value="বাংলা">🇮🇳 বাংলা (Bengali)</option>
                <option value="মৈতৈলোন্">🇮🇳 মৈতৈলোন্ (Manipuri)</option>
              </select>
            </div>

            {/* Accessibility Quick Controls (SUVIDHA Kiosk inspired) */}
            <div className="hidden xl:flex items-center gap-1 border-l border-r border-border px-2">
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`p-1.5 rounded text-xs font-bold transition-colors ${highContrast ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                title="Toggle High Contrast Mode"
              >
                <Eye className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTextZoom(!textZoom)}
                className={`p-1.5 rounded text-xs font-bold transition-colors ${textZoom ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                title="Toggle Text Zoom"
              >
                {textZoom ? <ZoomOut className="size-3.5" /> : <ZoomIn className="size-3.5" />}
              </button>
            </div>

            {/* SITREP Executive Report Button (from NETRA Rail) */}
            <Button 
              size="sm" 
              variant="outline" 
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold border-primary/20 hover:bg-primary/5 text-primary h-8"
              onClick={() => setSitrepModal(true)}
            >
              <FileText className="size-3.5" />
              <span>SITREP Dossier</span>
            </Button>

            {/* Emergency Broadcast Button */}
            <Button 
              size="sm" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs h-8"
              onClick={() => setBroadcast(true)}
            >
              <BellRing className="size-3.5 mr-1" />
              <span className="hidden sm:inline">Emergency</span> Broadcast
            </Button>

            {/* Mobile Nav Toggle */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="lg:hidden h-8 w-8" 
              aria-label={open ? 'Close navigation' : 'Open navigation'} 
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="mx-auto hidden max-w-[1540px] items-center gap-1 overflow-x-auto px-4 pb-2 pt-1 lg:flex lg:px-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === '/' }}
              className="group relative shrink-0 rounded-md px-3.5 py-1.5 text-xs font-bold text-muted-foreground transition-all hover:bg-muted hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground shadow-2xs"
            >
              <span className="flex items-center gap-2">
                {item.label}
                <span className="rounded-full bg-muted-foreground/15 px-1.5 py-0.2 text-[9px] font-extrabold uppercase group-data-[status=active]:bg-white/20 group-data-[status=active]:text-white">
                  {item.badge}
                </span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav aria-label="Mobile navigation" className="grid border-t border-border bg-card p-3 lg:hidden space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === '/' }}
                className="flex items-center justify-between rounded-md px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-bold uppercase rounded bg-muted-foreground/15 px-1.5 py-0.5">
                  {item.badge}
                </span>
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs font-semibold"
                onClick={() => { setOpen(false); setSitrepModal(true); }}
              >
                <FileText className="size-3.5 mr-2" /> Situation Report (SITREP Dossier)
              </Button>
              <div className="flex items-center justify-between px-2 pt-1 text-xs">
                <span className="text-muted-foreground font-medium">High Contrast Mode</span>
                <Button size="sm" variant="ghost" onClick={() => setHighContrast(!highContrast)}>
                  {highContrast ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            </div>
          </nav>
        )}

        {/* Breaking Live Incident Marquee (INDRA Reference) */}
        <div className="border-t border-border/80 bg-amber-500/10 px-4 py-1 text-xs text-amber-900 font-medium overflow-hidden">
          <div className="mx-auto max-w-[1540px] flex items-center gap-3">
            <span className="shrink-0 flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded">
              <AlertTriangle className="size-3" /> Live Bulletin
            </span>
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <div className="marquee-track inline-block text-[11px] font-medium">
                <span className="mx-4 font-semibold">🔴 NH-27 Landslide Warning: KM 148 Jatinga Slump (Dima Hasao) saturated. Heavy vehicles rerouted via Umrangso.</span>
                <span className="mx-4 font-semibold">🟡 Siliguri Corridor Check: 22km Chokepoint clear with heavy freight pacing (4,200 trucks/day).</span>
                <span className="mx-4 font-semibold">🔵 Jogighopa MMLP: Rail-to-River NW-2 Ro-Ro barge staging initialized for Barak Valley foodgrains.</span>
                <span className="mx-4 font-semibold">🟡 Mangan Axis: Single-lane traffic restored at 29th Mile with BRO escort. Priority clearance for NER-MED-209.</span>
                <span className="mx-4 font-semibold">🟢 Kohima–Imphal NH-02: Normal transit resumed post slope rock-net stabilization.</span>
                <span className="mx-4 font-semibold">🛰️ NavIC Constellation: 8/8 States Synced · 1,284 Essential Cargo Shipments Monitored.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Official Government Footer */}
      <footer className="mt-16 border-t border-border bg-slate-900 text-slate-100">
        <div className="ashoka-line" />
        <div className="mx-auto max-w-[1540px] px-4 py-12 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-10 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-white">
                <span className="chakra-mark text-amber-400 size-6" />
                <span className="text-xl font-black">NER-SARTHI</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-400">
                Next-Generation AI Logistics & Accessibility Intelligence Platform built for the Ministry of Development of North Eastern Region (MDoNER).
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="size-4 text-emerald-400" />
                <span>Gati Shakti National Master Plan Aligned</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Operational Desks
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li><Link to="/corridors" className="hover:text-white transition-colors">Strategic Corridors & Disruption</Link></li>
                <li><Link to="/fleet" className="hover:text-white transition-colors">NavIC Fleet Telemetry & Convoys</Link></li>
                <li><Link to="/roles" className="hover:text-white transition-colors">District Magistrate (DM) War Room</Link></li>
                <li><Link to="/copilot" className="hover:text-white transition-colors">RAG Decision Intelligence Desk</Link></li>
                <li><Link to="/citizen" className="hover:text-white transition-colors">Citizen SOS & Offline Field Reporter</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Emergency & Institutional Linkages
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2"><PhoneCall className="size-3.5 text-amber-400" /> National Disaster Response (NDRF): 1078</li>
                <li className="flex items-center gap-2"><PhoneCall className="size-3.5 text-amber-400" /> MDoNER Emergency Control: 1800-11-2026</li>
                <li className="flex items-center gap-2"><Activity className="size-3.5 text-emerald-400" /> Border Roads Organisation (BRO Project Swastik)</li>
                <li className="flex items-center gap-2"><CheckCircle className="size-3.5 text-emerald-400" /> Geological Survey of India (GSI Landslide Grid)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                National Mission Alignment
              </h3>
              <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-400">
                <p className="font-bold text-white">MDoNER Digital Initiative</p>
                <p className="mt-1 text-slate-400">Integrated with <strong className="text-amber-400">PM Gati Shakti & NESIDS</strong>.</p>
                <p className="mt-2 text-[10px] text-slate-500">
                  Advanced regional decision-support system monitoring all 8 North Eastern states.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Ministry of Development of North Eastern Region · Government of India.</p>
            <p className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" /> All 8 NER States Active: AS, AR, MN, ML, MZ, NL, SK, TR
            </p>
          </div>
        </div>
      </footer>

      {/* Emergency Broadcast Modal */}
      {broadcast && (
        <div 
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-xs" 
          onMouseDown={e => { if (e.target === e.currentTarget) setBroadcast(false); }}
        >
          <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 text-amber-600 border-b border-border pb-4">
              <div className="grid size-10 place-items-center rounded-full bg-amber-500/10">
                <BellRing className="size-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-foreground">Emergency Multi-Channel Broadcast</h2>
                <p className="text-xs text-muted-foreground">Regional Flash Warning System · CAP Protocol v1.2</p>
              </div>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground">Target Jurisdiction</label>
                <select className="mt-1.5 w-full rounded-md border border-input bg-background p-2.5 text-xs font-medium">
                  <option>Dima Hasao & Cachar (Assam) · NH-27 Corridor</option>
                  <option>East Khasi Hills (Meghalaya) · NH-06 Link</option>
                  <option>Mangan & North Sikkim · NH-10 Pass</option>
                  <option>Siliguri Corridor & Gateway Axis</option>
                  <option>All 8 North Eastern States (Regional Flash)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-foreground">Broadcast Message Draft</label>
                <textarea 
                  rows={3} 
                  defaultValue="CRITICAL ADVISORY: Landslide risk elevated near Jatinga Escarpment (NH-27). Heavy commercial vehicles rerouted via Umrangso. Light vehicles exercise extreme caution. BRO team deployed."
                  className="mt-1.5 w-full rounded-md border border-input bg-background p-2.5 text-xs font-normal"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 py-2">
                <div className="border border-border rounded p-2 text-center bg-muted/30">
                  <span className="block font-bold text-foreground">SMS & Cell Broadcast</span>
                  <span className="text-[10px] text-muted-foreground">34,800 Citizens</span>
                </div>
                <div className="border border-border rounded p-2 text-center bg-muted/30">
                  <span className="block font-bold text-foreground">NavIC Transporters</span>
                  <span className="text-[10px] text-muted-foreground">1,284 Trucks</span>
                </div>
                <div className="border border-border rounded p-2 text-center bg-muted/30">
                  <span className="block font-bold text-foreground">FM Radio & IVR</span>
                  <span className="text-[10px] text-muted-foreground">AIR Silchar</span>
                </div>
              </div>

              <div className="rounded-md border border-safe/30 bg-safe/5 p-3 text-safe flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0" />
                <span>Sandbox Demonstration: In live deployment, broadcasts are cryptographically signed with eSign.</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
              <Button variant="outline" size="sm" onClick={() => setBroadcast(false)}>Cancel</Button>
              <Button 
                size="sm" 
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => {
                  setBroadcast(false);
                  window.alert('Emergency Broadcast simulated successfully across Cell Broadcast & NavIC channels!');
                }}
              >
                Send Official Broadcast
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* SITREP Situation Report Modal (Comprehensive Executive Dossier) */}
      {sitrepModal && (
        <div 
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto" 
          onMouseDown={e => { if (e.target === e.currentTarget) setSitrepModal(false); }}
        >
          <div role="dialog" aria-modal="true" className="w-full max-w-3xl rounded-xl border border-border bg-card p-6 sm:p-8 shadow-2xl animate-fade-in my-8">
            {/* Gov Header Stripe */}
            <div className="flex items-center justify-between border-b-2 border-primary/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <span className="chakra-mark size-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Government of India · Ministry of Development of NER
                  </span>
                  <h2 className="text-xl font-black text-foreground">Regional Logistics Situation Report (SITREP)</h2>
                  <p className="text-xs font-mono text-muted-foreground">Dossier ID: MDoNER-GIS-SITREP-2026-0927-1030IST</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setSitrepModal(false)}>
                <X className="size-5" />
              </Button>
            </div>

            <div className="mt-5 space-y-4 text-xs leading-relaxed max-h-[65vh] overflow-y-auto pr-2">
              {/* Executive Overview */}
              <div className="rounded-lg bg-muted/50 p-4 border border-border">
                <p className="font-bold text-foreground text-sm">1. Regional Operational Overview (IST 10:30)</p>
                <p className="mt-1 text-muted-foreground">
                  All 8 North Eastern states remain operational. 64 districts actively monitored under InSAR slope telemetry and IMD rainfall grids. 6 districts are on elevated disruption exposure with 2 strategic highland corridors operating on active bypass detours. Multi-modal failover conduits (NFR Rail and IWAI NW-2 River Barge) are primed.
                </p>
              </div>

              {/* Strategic Chokepoints Assessment */}
              <div className="rounded-lg border border-border p-4">
                <p className="font-bold text-foreground text-sm">2. Strategic Bottlenecks & Gateways Telemetry</p>
                <div className="mt-2.5 divide-y divide-border/60">
                  {strategicChokepoints.slice(0, 4).map((chk) => (
                    <div key={chk.id} className="py-2 flex items-start justify-between gap-3">
                      <div>
                        <span className="font-bold text-foreground">{chk.name}</span>
                        <p className="text-[11px] text-muted-foreground">{chk.description}</p>
                        <p className="text-[10px] text-primary font-semibold mt-0.5">
                          ↳ Fallback: {chk.alternativeRoute}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                        chk.status === 'High Alert' ? 'bg-critical/10 text-critical' :
                        chk.status === 'Multi-Modal Shift' ? 'bg-primary/10 text-primary' :
                        chk.status === 'Congested' ? 'bg-amber-500/10 text-amber-800' : 'bg-safe/10 text-safe'
                      }`}>
                        {chk.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multimodal Redundancy Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-3.5 bg-card">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Train className="size-4" />
                    <span>NFR Freight Railhead Redundancy</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Lumding–Badarpur Hill Section: 1,400 MT capacity bulk freight shuttle operational. Ro-Ro fuel tankers prioritized.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-safe bg-safe/10 px-2 py-0.5 rounded">
                    Active Failover Standby
                  </span>
                </div>

                <div className="rounded-lg border border-border p-3.5 bg-card">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Anchor className="size-4" />
                    <span>IWAI NW-2 River Barge (Brahmaputra)</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Pandu Port (Guwahati) to Jogighopa MMLP: 600 MT heavy Ro-Pax barge on 3-hour dispatch alert.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Riverhead Logistics Ready
                  </span>
                </div>
              </div>

              {/* Essential Stockpiles */}
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="font-bold text-foreground text-sm">3. Essential Commodity & Hospital Buffer Status</p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded border border-border bg-card p-2">
                    <span className="block text-[10px] text-muted-foreground">ICU Oxygen Silchar</span>
                    <strong className="text-sm font-bold text-safe">99.4% Buffer</strong>
                  </div>
                  <div className="rounded border border-border bg-card p-2">
                    <span className="block text-[10px] text-muted-foreground">Aizawl POL Reserves</span>
                    <strong className="text-sm font-bold text-amber-700">4.2 Days Stock</strong>
                  </div>
                  <div className="rounded border border-border bg-card p-2">
                    <span className="block text-[10px] text-muted-foreground">FCI Foodgrain Buffer</span>
                    <strong className="text-sm font-bold text-safe">14 Days Adequate</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <span className="text-[11px] text-muted-foreground">
                Digital Signature: <strong>NER-NDSS-SHA256-AUTH</strong>
              </span>

              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs font-semibold"
                  onClick={handleCopySitrep}
                >
                  <Copy className="size-3.5 mr-1" />
                  {copied ? 'Copied to Clipboard!' : 'Copy SITREP Text'}
                </Button>

                <Button 
                  size="sm" 
                  className="bg-primary text-primary-foreground font-semibold text-xs"
                  onClick={() => {
                    window.print();
                  }}
                >
                  <Printer className="size-3.5 mr-1" /> Print / Export PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
