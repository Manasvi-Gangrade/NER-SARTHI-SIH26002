import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Settings, Maximize, 
  Captions, Sparkles, ShieldAlert, Anchor, Train, Truck, ArrowRight, 
  Clock, Compass, MapPin, Activity, CheckCircle2, Layers, Bot, 
  Smartphone, ChevronRight, FileText, AlertTriangle, CloudRain,
  Eye, Droplets, Mountain, Send, Plus, Radio, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  MapView, Alerts, RiskChart, AccessChart, ShipmentChart, FleetTable, 
  Status, Bypass, Source, BVSBayesianCalculator, MultimodalFallbackPanel,
  DirectQueryBar
} from '@/components/ner-ui';
import { 
  districts, alerts, vehicles, corridors, platformPillars, 
  aiQueries, metadata, type Risk 
} from '@/lib/ner-data';

export const Route = createFileRoute('/')({
  head: () => metadata(
    'NER-SARTHI · National Decision Intelligence Platform',
    'Where India’s terrain and logistics data becomes India’s decisions. Real-time multi-modal logistics, AI disruption forecasting, and emergency continuity for the North Eastern Region.'
  ),
  component: INDRACommandCenter,
});

function INDRACommandCenter() {
  const [selectedHub, setSelectedHub] = useState<'command' | 'pilot' | 'voice'>('command');
  const [selectedCorridorId, setSelectedCorridorId] = useState('NH-27');
  const [activeCopilotQuery, setActiveCopilotQuery] = useState(aiQueries[0]!);
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [focusChokepointId, setFocusChokepointId] = useState<string | undefined>(undefined);
  const [videoPlaying, setVideoPlaying] = useState(true);

  const activeCorridor = corridors.find((c) => c.id === selectedCorridorId) ?? corridors[0]!;

  const handleAskCopilot = (queryItem: typeof aiQueries[0]) => {
    setCopilotLoading(true);
    setTimeout(() => {
      setActiveCopilotQuery(queryItem);
      setCopilotLoading(false);
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    setCopilotLoading(true);
    setTimeout(() => {
      const matched = aiQueries.find(
        (q) => q.q.toLowerCase().includes(customQuery.toLowerCase())
      ) ?? {
        q: customQuery,
        answer: `Regarding "${customQuery}": Telemetry indicates NH-27 remains under heavy watch (86/100 risk) and NH-06 at 78/100. PWD ground crews are actively managing the Umrangso bypass. Ensure all relief consignments carry secondary communication radios.`,
        confidence: 88,
        sources: ['National GIS Telemetry Grid', 'PWD District Log', 'InSAR Soil Sensor DH-4'],
        action: 'Confirm convoy position with district magistrate control desk.',
        routeToInspect: 'NH-27',
      };
      setActiveCopilotQuery(matched);
      setCustomQuery('');
      setCopilotLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 
        ====================================================
        1. INDRA EXACT HERO SECTION (2-COLUMN GRID)
        ====================================================
      */}
      <section className="relative overflow-hidden bg-white pt-8 pb-12 border-b border-slate-200/80">
        {/* Subtle Map Topo Silhouette Background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
          style={{
            backgroundImage: `radial-gradient(#0b3d6b 1.2px, transparent 1.2px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative mx-auto max-w-[1540px] px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* LEFT COLUMN: Huge Bold Heading, Subtitle & 4 Crisis Cards */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.12]">
                  NER-SARTHI: Smart Logistics & Accessibility Intelligence for the{' '}
                  <span className="text-[#2563eb]">North Eastern Region</span>
                </h1>
                
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl font-normal">
                  A unified AI decision-support platform fusing real-time weather intelligence, satellite radar, NavIC telemetry, and field reporting across all 8 North Eastern states — predicting road collapse, flood washouts, and lifeline disruption before they happen.
                </p>
              </div>

              {/* 4 Crisis Thumbnail Cards (Exact INDRA style, 100% NER Grounded) */}
              <div className="pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Card 1: Dima Hasao Jatinga Slump */}
                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-2xs group hover:shadow-md transition-all">
                    <div className="bg-[#b91c1c] text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wider text-center truncate">
                      DIMA HASAO · NH-27
                    </div>
                    <div className="h-20 bg-slate-100 relative overflow-hidden flex items-center justify-center p-1">
                      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                        <div className="bg-red-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-red-800 text-center p-0.5">
                          ⚠️ 86/100 Risk
                        </div>
                        <div className="bg-sky-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-sky-800 text-center p-0.5">
                          🌧️ 124mm Rain
                        </div>
                        <div className="bg-amber-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-amber-800 text-center p-0.5">
                          🪨 Soil Slump
                        </div>
                        <div className="bg-blue-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-blue-900 text-center p-0.5">
                          🚜 BRO Unit
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 text-center bg-slate-50 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-700 block truncate">Jatinga Slump (Barak Cutoff)</span>
                    </div>
                  </div>

                  {/* Card 2: Sikkim NH-10 Teesta Collapse */}
                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-2xs group hover:shadow-md transition-all">
                    <div className="bg-slate-800 text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wider text-center truncate">
                      SIKKIM · NH-10
                    </div>
                    <div className="h-20 bg-slate-100 relative overflow-hidden flex items-center justify-center p-1 bg-gradient-to-br from-slate-200 to-sky-100">
                      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                        <div className="bg-blue-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-blue-800 text-center p-0.5">
                          🌊 Teesta Surge
                        </div>
                        <div className="bg-stone-200 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-stone-800 text-center p-0.5">
                          🪨 29th Mile
                        </div>
                        <div className="bg-red-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-red-800 text-center p-0.5">
                          📍 Mangan Cut
                        </div>
                        <div className="bg-emerald-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-emerald-900 text-center p-0.5">
                          🛡️ Swastik Unit
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 text-center bg-slate-50 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-700 block truncate">Teesta Basin Washout</span>
                    </div>
                  </div>

                  {/* Card 3: Majuli Island Riverine Flood */}
                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-2xs group hover:shadow-md transition-all">
                    <div className="bg-[#b91c1c] text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wider text-center truncate">
                      MAJULI ISLAND
                    </div>
                    <div className="h-20 bg-slate-100 relative overflow-hidden flex items-center justify-center p-1 bg-gradient-to-br from-amber-50 to-orange-100">
                      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                        <div className="bg-sky-200 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-sky-900 text-center p-0.5">
                          🚢 NW-2 RoPax
                        </div>
                        <div className="bg-red-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-red-800 text-center p-0.5">
                          🌊 River +1.4m
                        </div>
                        <div className="bg-amber-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-amber-800 text-center p-0.5">
                          📦 Buffer Stock
                        </div>
                        <div className="bg-teal-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-teal-900 text-center p-0.5">
                          🏝️ Island Dep.
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 text-center bg-slate-50 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-700 block truncate">Brahmaputra Flood Isolation</span>
                    </div>
                  </div>

                  {/* Card 4: Siliguri 22km Gateway */}
                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-2xs group hover:shadow-md transition-all">
                    <div className="bg-emerald-800 text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wider text-center truncate">
                      SILIGURI CORRIDOR
                    </div>
                    <div className="h-20 bg-slate-100 relative overflow-hidden flex items-center justify-center p-1 bg-gradient-to-br from-emerald-50 to-teal-100">
                      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                        <div className="bg-emerald-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-emerald-900 text-center p-0.5">
                          🚛 4,200 Trucks
                        </div>
                        <div className="bg-blue-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-blue-900 text-center p-0.5">
                          ⚡ 22km Neck
                        </div>
                        <div className="bg-purple-100 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-purple-900 text-center p-0.5">
                          📡 NavIC Paced
                        </div>
                        <div className="bg-slate-200 rounded-2xs flex items-center justify-center text-[8.5px] font-bold text-slate-800 text-center p-0.5">
                          🏛️ Srirampur
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 text-center bg-slate-50 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-700 block truncate">Chicken's Neck Gateway</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Live Threat & News Feeds (Exact INDRA style) */}
            <div className="lg:col-span-5 space-y-3">
              {/* Header Title & Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 text-sm font-black">▶</span>
                  <h2 className="text-base font-black text-slate-900 tracking-tight">Live Disruption & Logistics Radar</h2>
                </div>
                <span className="rounded-full bg-red-100 text-red-700 text-[10px] font-black px-2.5 py-0.5 tracking-wider border border-red-200">
                  LIVE RADAR
                </span>
              </div>

              {/* Main Simulated Live Broadcast Video Card */}
              <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white overflow-hidden shadow-xl relative">
                {/* Video Screen Simulation */}
                <div className="relative aspect-video w-full bg-gradient-to-b from-slate-900 via-slate-800 to-black overflow-hidden flex flex-col justify-between p-3">
                  {/* Top Bar inside Video */}
                  <div className="flex items-center justify-between z-10">
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-white animate-ping" />
                      DD NORTH EAST LIVE
                    </span>

                    <span className="bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                      MDoNER SITREP DESK
                    </span>
                  </div>

                  {/* Center Visual: Simulated Radar & News Graphics */}
                  <div className="my-auto text-center space-y-1.5 z-10">
                    <div className="inline-block rounded-xl bg-black/70 backdrop-blur-md px-3.5 py-2 border border-white/15 max-w-[92%]">
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block mb-0.5">
                        GEOLOGICAL RADAR & ROAD CLEARANCE · CAM-DH4
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white block">
                        NH-27 KM 148 Jatinga Slump: BRO Swastik Excavator Teams Deployed
                      </span>
                      <div className="mt-1 flex items-center justify-center gap-2 text-[9.5px] text-slate-300 font-mono">
                        <span className="text-red-400 font-bold">Rain: 52mm/hr</span>
                        <span>•</span>
                        <span className="text-amber-300 font-bold">Soil Slip: +4.8mm/hr</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">Umrangso Bypass Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Player Control Overlay */}
                  <div className="z-10 space-y-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 rounded-lg">
                    {/* Scrub Bar */}
                    <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full w-[45%]" />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setVideoPlaying(!videoPlaying)} className="hover:text-white" aria-label={videoPlaying ? "Pause Video" : "Play Video"}>
                          {videoPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                        </button>
                        <button className="hover:text-white" aria-label="Rewind"><SkipBack className="size-3.5" /></button>
                        <button className="hover:text-white" aria-label="Fast Forward"><SkipForward className="size-3.5" /></button>
                        <span className="font-mono text-[10px]">09:14:22 IST · 24/7 BROADCAST</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Volume2 className="size-3.5 hover:text-white cursor-pointer" />
                        <Captions className="size-3.5 hover:text-white cursor-pointer" />
                        <Settings className="size-3.5 hover:text-white cursor-pointer" />
                        <Maximize className="size-3.5 hover:text-white cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Breaking Text Marquee on Video Card */}
                <div className="bg-[#991b1b] text-white px-3 py-1.5 text-[11px] font-bold flex items-center gap-2">
                  <span className="bg-red-700 px-1.5 py-0.2 rounded text-[9px] uppercase font-black">BREAKING</span>
                  <span className="truncate">
                    BRO TASKFORCE CLEARING 29TH MILE TEESTA · POL FUEL CONVOY 41 ACTIVE VIA UMRANGSO · 230+ DIALECT CITIZEN HELPLINE LIVE
                  </span>
                </div>
              </div>

              {/* Two Bottom Secondary News Thumbnails (Exact INDRA style, 100% NER) */}
              <div className="grid grid-cols-2 gap-3">
                {/* Left: Pratidin Time / News18 Assam-NE */}
                <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded">
                      ● PRATIDIN TIME
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">DISPATCH DESK</span>
                  </div>
                  <div className="h-16 rounded bg-slate-100 flex items-center justify-center text-center p-1 bg-gradient-to-r from-red-50 to-orange-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-800 leading-tight">
                      Jogighopa MMLP: 40-tonne FCI rice barges dispatched via NW-2 Brahmaputra
                    </span>
                  </div>
                </div>

                {/* Right: ISRO Bhuvan / GSI Bhusanket */}
                <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-700 text-white text-[9px] font-black px-1.5 py-0.2 rounded">
                      🛰️ ISRO BHUVAN
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">GSI BHUSANKET</span>
                  </div>
                  <div className="h-16 rounded bg-slate-100 flex items-center justify-center text-center p-1 bg-gradient-to-r from-sky-50 to-blue-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-800 leading-tight">
                      National Landslide Early Warning active across 6 Sikkim districts (Mangan, Pakyong)
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ====================================================
        2. INDRA EXACT COLORFUL HORIZONTAL CAROUSEL CARDS
        ====================================================
      */}
      <section className="mx-auto max-w-[1540px] px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Teal / Emerald */}
          <div className="rounded-2xl p-5 bg-[#0d9488] text-white shadow-md hover:scale-[1.02] transition-transform cursor-pointer">
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-200 block mb-1">MDoNER SCHEME MONITOR</span>
            <h3 className="font-extrabold text-sm sm:text-base leading-snug">
              NESIDS Mission Sync: ₹8,139.50 Cr Outlay Monitored Across 90 Projects in All 8 NER States
            </h3>
          </div>

          {/* Card 2: Amber / Orange */}
          <div className="rounded-2xl p-5 bg-[#ea580c] text-white shadow-md hover:scale-[1.02] transition-transform cursor-pointer">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-200 block mb-1">INTERMODAL LOGISTICS</span>
            <h3 className="font-extrabold text-sm sm:text-base leading-snug">
              PM GatiShakti Multimodal: NW-2 Brahmaputra Barge + NFR Railhead Fallback Activated
            </h3>
          </div>

          {/* Card 3: Royal Purple */}
          <div className="rounded-2xl p-5 bg-[#7c3aed] text-white shadow-md hover:scale-[1.02] transition-transform cursor-pointer">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-200 block mb-1">EARLY WARNING SYSTEM</span>
            <h3 className="font-extrabold text-sm sm:text-base leading-snug">
              GSI Bhusanket LEWS: Automated 15-Minute Landslide Threshold Alerting in High-Risk Zones
            </h3>
          </div>

          {/* Card 4: Magenta / Fuchsia */}
          <div className="rounded-2xl p-5 bg-[#c026d3] text-white shadow-md hover:scale-[1.02] transition-transform cursor-pointer">
            <span className="text-[10px] font-black uppercase tracking-wider text-fuchsia-200 block mb-1">LIFELINE ASSURANCE</span>
            <h3 className="font-extrabold text-sm sm:text-base leading-snug">
              Zero-Shortage Logistics: 100% Critical Hospital Oxygen & Essential Grain Tracked via NavIC
            </h3>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        3. INDRA EXACT CORE INTELLIGENCE HUBS
        ====================================================
      */}
      <section className="mx-auto max-w-[1540px] px-4 lg:px-8 space-y-6 pt-4">
        {/* Letter-spaced Title with horizontal bar */}
        <div className="text-center space-y-2">
          <h2 className="text-xs sm:text-sm font-black tracking-[0.25em] text-slate-500 uppercase">
            C O R E &nbsp; I N T E L L I G E N C E &nbsp; H U B S
          </h2>
          <div className="w-24 h-0.5 bg-slate-300 mx-auto" />
        </div>

        {/* 3 Giant Pill Cards (from INDRA style, 100% grounded in NER-SARTHI) */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Hub 1: COMMAND CENTER (Royal Blue) */}
          <button
            type="button"
            onClick={() => {
              setSelectedHub('command');
              const el = document.getElementById('dashboard-view');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full h-24 sm:h-28 rounded-3xl bg-[#0b3d6b] hover:bg-[#072c4f] text-white shadow-lg flex flex-col items-center justify-center relative overflow-hidden group transition-all"
          >
            <Sparkles className="absolute top-4 right-6 size-5 text-white/40 group-hover:text-white transition-colors" />
            <span className="text-xl sm:text-2xl font-black uppercase tracking-wider">
              COMMAND CENTER
            </span>
            <span className="text-[11px] font-semibold text-sky-200 tracking-wide mt-0.5">
              Eight-State GIS Telemetry & Strategic Chokepoint Grid
            </span>
            <div className="w-12 h-1 bg-white/40 rounded-full mt-2 group-hover:w-20 transition-all" />
          </button>

          {/* Hub 2: LEADER PILOT (Vibrant Purple) - Direct Module Link */}
          <Link
            to="/copilot"
            className="w-full h-24 sm:h-28 rounded-3xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-lg flex flex-col items-center justify-center relative overflow-hidden group transition-all"
          >
            <Sparkles className="absolute top-4 right-6 size-5 text-white/40 group-hover:text-white transition-colors" />
            <span className="text-xl sm:text-2xl font-black uppercase tracking-wider">
              LEADER PILOT
            </span>
            <span className="text-[11px] font-semibold text-purple-200 tracking-wide mt-0.5">
              Launch RAG Decision Intelligence & Natural Language Query Assistant →
            </span>
            <div className="w-12 h-1 bg-white/40 rounded-full mt-2 group-hover:w-20 transition-all" />
          </Link>

          {/* Hub 3: VOICE OUTREACH (Emerald Green) - Direct Module Link */}
          <Link
            to="/citizen"
            className="w-full h-24 sm:h-28 rounded-3xl bg-[#059669] hover:bg-[#047857] text-white shadow-lg flex flex-col items-center justify-center relative overflow-hidden group transition-all"
          >
            <Sparkles className="absolute top-4 right-6 size-5 text-white/40 group-hover:text-white transition-colors" />
            <span className="text-xl sm:text-2xl font-black uppercase tracking-wider">
              VOICE OUTREACH
            </span>
            <span className="text-[11px] font-semibold text-emerald-200 tracking-wide mt-0.5">
              Launch Bhashini 230+ Regional Dialects & Offline Driver App →
            </span>
            <div className="w-12 h-1 bg-white/40 rounded-full mt-2 group-hover:w-20 transition-all" />
          </Link>
        </div>
      </section>

      {/* 
        ====================================================
        4. DIRECT FOCUS RIBBON (NETRA / INDRA FAST ACCESS)
        ====================================================
      */}
      <section className="mx-auto max-w-[1540px] px-4 lg:px-8">
        <DirectQueryBar
          onSelectChokepoint={(chkId) => {
            setFocusChokepointId(chkId);
            const el = document.getElementById('dashboard-view');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBVS={() => {
            const el = document.getElementById('bvs-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSimulation={() => {
            const el = document.getElementById('dashboard-view');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* 
        ====================================================
        5. EIGHT-STATE COMMAND CENTER GIS WORKBENCH
        ====================================================
      */}
      <section id="dashboard-view" className="mx-auto max-w-[1540px] px-4 lg:px-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="section-kicker">Geospatial Command Display</span>
            <h2 className="text-2xl font-black text-slate-900">Eight-State Operational Picture</h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-emerald-800 font-bold">
              <span className="pulse-dot size-2 rounded-full bg-emerald-600" />
              InSAR Satellite Radar Synced
            </span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(320px,1fr)]">
          {/* Main Interactive SVG GIS Map Canvas */}
          <article className="panel overflow-hidden flex flex-col border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500">Interactive Display</span>
                <h3 className="text-sm font-bold text-slate-900">District Vulnerability & Highway Corridors</h3>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline">Click district or chokepoint diamond</span>
            </div>
            
            <div className="h-[460px] sm:h-[530px] p-2 relative bg-slate-50/50">
              <MapView 
                highlightCorridor={selectedCorridorId} 
                focusChokepointId={focusChokepointId}
              />
            </div>

            {/* Quick Corridor Selection Bar below map */}
            <div className="border-t border-slate-200 bg-white p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-500 text-[11px]">Inspect Highway Arteries:</span>
              <div className="flex flex-wrap gap-1.5">
                {corridors.map((c) => (
                  <Button
                    key={c.id}
                    size="sm"
                    variant={selectedCorridorId === c.id ? 'default' : 'outline'}
                    className={`h-7 px-2.5 text-xs font-bold ${
                      c.status === 'critical' ? 'border-red-300 text-red-700' : ''
                    }`}
                    onClick={() => {
                      setSelectedCorridorId(c.id);
                      setFocusChokepointId(undefined);
                    }}
                  >
                    {c.id}
                    <span className={`ml-1 size-1.5 rounded-full ${
                      c.status === 'critical' ? 'bg-red-600' : c.status === 'watch' ? 'bg-amber-500' : 'bg-emerald-600'
                    }`} />
                  </Button>
                ))}
              </div>
            </div>
          </article>

          {/* Real-Time Live Operations Alert Feed */}
          <Alerts limit={5} />
        </div>
      </section>

      {/* 
        ====================================================
        6. MULTI-CHART ANALYTICS ROW
        ====================================================
      */}
      <section className="mx-auto max-w-[1540px] px-4 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="section-kicker">Predictive Terrain Analytics</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Supply Continuity & Risk Intelligence</h2>
          </div>
          <Button asChild variant="outline" size="sm" className="text-xs font-bold">
            <Link to="/corridors">Deep Corridor Analytics →</Link>
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Corridor 7-day Risk Trend Area Chart */}
          <article className="panel overflow-hidden border border-slate-200 bg-white">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500">{activeCorridor.id} · {activeCorridor.focus}</span>
                <h3 className="text-sm font-bold text-slate-900">7-Day Landslide Risk & Rain</h3>
              </div>
              <Status status={activeCorridor.status}>{activeCorridor.status}</Status>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2 mb-2">
                <span className="text-slate-500 font-semibold">Route: <strong className="text-slate-900">{activeCorridor.name}</strong></span>
                <span className="text-blue-600 font-bold">{activeCorridor.elevation}</span>
              </div>
              <div className="h-[210px]">
                <RiskChart series={activeCorridor.series} id="dashboard-risk-chart" />
              </div>
              <div className="mt-3">
                <Bypass name={activeCorridor.bypass} extra={activeCorridor.extra} />
              </div>
            </div>
          </article>

          {/* District Accessibility Horizontal Bar Chart */}
          <article className="panel overflow-hidden border border-slate-200 bg-white">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500">Isolation Risk Index</span>
                <h3 className="text-sm font-bold text-slate-900">District Accessibility</h3>
              </div>
              <MapPin className="size-4 text-blue-600" />
            </div>
            <div className="p-4 flex flex-col justify-between h-[calc(100%-54px)]">
              <p className="text-[11px] text-slate-500 mb-1">
                Scores below 50 indicate acute mountain isolation risk requiring alternate staging depots.
              </p>
              <div className="h-[230px]">
                <AccessChart />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-slate-400 border-t border-slate-100 pt-2">
                <span className="text-emerald-700">● High Access (&gt;75)</span>
                <span className="text-blue-700">● Moderate (50-74)</span>
                <span className="text-red-700">● Isolated (&lt;50)</span>
              </div>
            </div>
          </article>

          {/* Shipment Health Donut Chart */}
          <article className="panel overflow-hidden flex flex-col border border-slate-200 bg-white">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500">Essential Cargo Telemetry</span>
                <h3 className="text-sm font-bold text-slate-900">Shipment Continuity</h3>
              </div>
              <Activity className="size-4 text-blue-600" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <ShipmentChart />
            </div>
            <div className="border-t border-slate-100 bg-slate-50 p-3 text-center">
              <span className="text-[11px] font-bold text-slate-600">
                1,284 Convoys Tracked via NavIC Satellite Constellation
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* 
        ====================================================
        7. BASE VULNERABILITY SCORE (BVS) & MULTIMODAL FAILOVER
        ====================================================
      */}
      <section id="bvs-section" className="mx-auto max-w-[1540px] px-4 lg:px-8 space-y-6">
        <div>
          <span className="section-kicker">Mathematical Formulation & Intermodal Failover</span>
          <h2 className="text-2xl font-black text-slate-900">Dynamic Risk Modeling & Multimodal Logistics</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* BVS Interactive Bayesian Calculator */}
          <BVSBayesianCalculator />

          {/* Multimodal Fallback Dispatch Panel */}
          <MultimodalFallbackPanel corridorId={selectedCorridorId} />
        </div>
      </section>

      {/* 
        ====================================================
        8. ENTERPRISE OPERATIONAL MODULES DIRECTORY
        (Clear Multi-Page Application Architecture)
        ====================================================
      */}
      <section className="mx-auto max-w-[1540px] px-4 lg:px-8 space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="section-kicker">System Architecture & Workspaces</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Dedicated Operational Desks & Modules
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              NER-SARTHI is organized into distinct specialized command modules for highway engineers, logistics dispatchers, district magistrates, field officers, and citizens.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Module 1: Strategic Corridors */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-700 font-bold group-hover:scale-110 transition-transform">
                  🛣️
                </span>
                <span className="rounded-full bg-red-100 text-red-700 text-[10px] font-bold px-2.5 py-0.5">
                  5 Highways Active
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                Strategic Corridors & Bypasses
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physics-informed terrain risk modeling, GSI Bhusanket LEWS integration, rainfall accumulation thresholds, mountain pass elevations, and heavy vehicle detour bypasses.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-100 mt-5">
              <Button asChild className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs">
                <Link to="/corridors">
                  Launch Corridors Desk <ArrowRight className="size-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Module 2: NavIC Fleet Telemetry */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700 font-bold group-hover:scale-110 transition-transform">
                  🛰️
                </span>
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5">
                  1,284 Convoys
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                NavIC Fleet & Cargo Radar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                24/7 indigenous satellite telemetry tracking priority convoys carrying Medical Oxygen, Vaccines, FCI Foodgrains, and POL Petroleum fuels across all hill routes.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-100 mt-5">
              <Button asChild className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs">
                <Link to="/fleet">
                  Launch Fleet Radar <ArrowRight className="size-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Module 3: 6 Role-Based Incident Command Portals */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-purple-50 text-purple-700 font-bold group-hover:scale-110 transition-transform">
                  🏛️
                </span>
                <span className="rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-0.5">
                  6 RBAC Portals
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                Role Portals (MDoNER / BRO / PWD)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated incident command desks for MDoNER Central, State PWD, Border Roads Organisation, NDMA, District Magistrates, and Emergency Convoy Coordinators.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-100 mt-5">
              <Button asChild className="w-full bg-slate-900 hover:bg-purple-600 text-white font-bold text-xs">
                <Link to="/roles">
                  Access Role Portals <ArrowRight className="size-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Module 4: Citizen & Driver Offline Mobile Hub */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-amber-50 text-amber-700 font-bold group-hover:scale-110 transition-transform">
                  📱
                </span>
                <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5">
                  230+ Dialects
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                Citizen & Driver Mobile Desk
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interactive mobile smartphone simulator with Bhashini voice navigation, offline-first geotagged photo reporting, and Twilio SMS fallback for zero-network dead zones.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-100 mt-5">
              <Button asChild className="w-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs">
                <Link to="/citizen">
                  Open Mobile Simulator <ArrowRight className="size-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Module 5: Leader Pilot (RAG Strategic Co-Pilot) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-sky-50 text-sky-700 font-bold group-hover:scale-110 transition-transform">
                  🤖
                </span>
                <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2.5 py-0.5">
                  RAG SLM Engine
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                Leader Pilot: AI Decision Engine
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-screen strategic assistant powered by retrieval-augmented generation. Allows district collectors to ask natural language questions with audited data citations.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-100 mt-5">
              <Button asChild className="w-full bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs">
                <Link to="/copilot">
                  Launch Co-Pilot Desk <ArrowRight className="size-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Module 6: Intermodal Fallback Logistics */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-teal-50 text-teal-700 font-bold group-hover:scale-110 transition-transform">
                  🚢
                </span>
                <span className="rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-0.5">
                  NW-2 & NFR Rail
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-600 transition-colors">
                Multimodal Supply Chain Failover
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dynamic intermodal failover engine routing freight from blocked hill highways onto IWAI National Waterway-2 river barges and Northeast Frontier Railway rakes.
              </p>
            </div>
            <div className="pt-5 border-t border-slate-100 mt-5">
              <Button 
                onClick={() => {
                  const el = document.getElementById('bvs-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="w-full bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs cursor-pointer"
              >
                Inspect Multimodal Grid <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
