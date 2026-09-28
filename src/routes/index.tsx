import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Settings, Maximize, 
  Captions, Sparkles, ShieldAlert, Anchor, Train, Truck, ArrowRight, 
  Clock, Compass, MapPin, Activity, CheckCircle2, Layers, Bot, 
  Smartphone, ChevronRight, FileText, AlertTriangle, CloudRain,
  Eye, Droplets, Mountain, Send, Plus, Radio, ExternalLink,
  Wifi, WifiOff, Camera, Phone, Check, ShieldCheck, Zap,
  Sliders, RefreshCw, Gauge, Fuel, HeartPulse, Wheat, LifeBuoy, Users, Building2, ClipboardCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  MapView, Alerts, RiskChart, AccessChart, ShipmentChart, FleetTable, 
  Status, Bypass, Source, BVSBayesianCalculator, MultimodalFallbackPanel,
  DirectQueryBar
} from '@/components/ner-ui';
import { 
  districts, alerts, vehicles, corridors, platformPillars, 
  aiQueries, metadata, bhashiniVoiceAdvisories, type Risk 
} from '@/lib/ner-data';
import { operationalRoles } from './roles';

export const Route = createFileRoute('/')({
  head: () => metadata(
    'NER-SARTHI · National Decision Intelligence Platform',
    'Where India’s terrain and logistics data becomes India’s decisions. Real-time multi-modal logistics, AI disruption forecasting, and emergency continuity for the North Eastern Region.'
  ),
  component: INDRACommandCenter,
});

function INDRACommandCenter() {
  const [activeWorkspace, setActiveWorkspace] = useState<'command' | 'corridors' | 'fleet' | 'roles' | 'citizen' | 'copilot'>('command');
  const [selectedHub, setSelectedHub] = useState<'command' | 'pilot' | 'voice'>('command');
  const [selectedCorridorId, setSelectedCorridorId] = useState('NH-27');
  const [activeCopilotQuery, setActiveCopilotQuery] = useState(aiQueries[0]!);
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [focusChokepointId, setFocusChokepointId] = useState<string | undefined>(undefined);
  const [videoPlaying, setVideoPlaying] = useState(true);

  // Corridors Workspace State
  const [corridorRainExtra, setCorridorRainExtra] = useState(0);

  // Fleet Workspace State
  const [fleetCargoFilter, setFleetCargoFilter] = useState<'All' | 'Medical' | 'Food' | 'Fuel' | 'Relief'>('All');

  // Roles Workspace State
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [checkedQueue, setCheckedQueue] = useState<string[]>([]);

  // Citizen Workspace State
  const [citizenMode, setCitizenMode] = useState<'Citizen' | 'Driver'>('Citizen');
  const [isOffline, setIsOffline] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [incidentLogged, setIncidentLogged] = useState(false);
  const [selectedCitizenLang, setSelectedCitizenLang] = useState('অসমীয়া (Assamese)');

  // Co-Pilot Scenario Simulator State
  const [simRain, setSimRain] = useState(25);
  const [simBlocked, setSimBlocked] = useState(true);

  const activeCorridor = corridors.find((c) => c.id === selectedCorridorId) ?? corridors[0]!;
  const currentRole = operationalRoles[activeRoleIdx] ?? operationalRoles[0]!;
  const RoleIcon = currentRole.icon;

  const filteredFleetVehicles = fleetCargoFilter === 'All' 
    ? vehicles 
    : vehicles.filter((v) => v.cargo === fleetCargoFilter);

  const calculatedDelay = 42 + simRain * 1.5 + (simBlocked ? 35 : 0);
  const calculatedRisk = Math.min(100, Math.round(75 + simRain * 0.4 + (simBlocked ? 12 : 0)));

  const handleJumpToModule = (mod: 'command' | 'corridors' | 'fleet' | 'roles' | 'citizen' | 'copilot') => {
    setActiveWorkspace(mod);
    const el = document.getElementById(`module-${mod}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleAction = (act: string) => {
    setCompletedActions((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleToggleQueue = (item: string) => {
    setCheckedQueue((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handlePlayVoiceAdvisory = () => {
    if ('speechSynthesis' in window) {
      const adv = bhashiniVoiceAdvisories.find((v) => selectedCitizenLang.includes(v.language)) ?? bhashiniVoiceAdvisories[0]!;
      if (adv?.announcement) {
        const utterance = new SpeechSynthesisUtterance(adv.announcement);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    }
  };

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
      {/* 
        ====================================================
        1. EXACT HERO SECTION - SLEEK PREMIUM HYBRID
        ====================================================
      */}
      <section className="relative overflow-hidden bg-white/70 backdrop-blur-md pt-8 pb-12 border-b border-slate-200/80">
        {/* Subtle Map Topo Silhouette Background */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none bg-repeat"
          style={{
            backgroundImage: `radial-gradient(#092548 1.4px, transparent 1.4px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative mx-auto max-w-[1540px] px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* LEFT COLUMN: Huge Bold Heading, Subtitle & 4 Crisis Cards */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-3.5 py-1 text-xs font-bold text-blue-800 mb-3 shadow-2xs">
                  <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                  National Decision Support Architecture · SIH26002
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-[#091322] leading-[1.12]">
                  NER-SARTHI: Smart Logistics & Accessibility Intelligence for the{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600">
                    North Eastern Region
                  </span>
                </h1>
                
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl font-normal">
                  A unified AI decision-support platform fusing real-time weather intelligence, satellite radar, NavIC telemetry, and field reporting across all 8 North Eastern states — predicting road collapse, flood washouts, and lifeline disruption before they happen.
                </p>
              </div>

              {/* 4 Crisis Thumbnail Cards (Exact INDRA style, 100% NER Grounded) */}
              <div className="pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Card 1: Dima Hasao Jatinga Slump */}
                  <div className="rounded-xl border border-red-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    <div className="bg-gradient-to-r from-red-700 to-rose-700 text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wider text-center truncate shadow-xs">
                      DIMA HASAO · NH-27
                    </div>
                    <div className="h-20 bg-slate-50 relative overflow-hidden flex items-center justify-center p-1">
                      <div className="grid grid-cols-2 gap-1 w-full h-full">
                        <div className="bg-red-50 rounded-lg border border-red-200/60 flex items-center justify-center text-[8.5px] font-black text-red-700 text-center p-0.5">
                          ⚠️ 86/100 Risk
                        </div>
                        <div className="bg-sky-50 rounded-lg border border-sky-200/60 flex items-center justify-center text-[8.5px] font-black text-sky-800 text-center p-0.5">
                          🌧️ 124mm Rain
                        </div>
                        <div className="bg-amber-50 rounded-lg border border-amber-200/60 flex items-center justify-center text-[8.5px] font-black text-amber-800 text-center p-0.5">
                          🪨 Soil Slump
                        </div>
                        <div className="bg-blue-50 rounded-lg border border-blue-200/60 flex items-center justify-center text-[8.5px] font-black text-blue-900 text-center p-0.5">
                          🚜 BRO Unit
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 text-center bg-slate-50 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-800 block truncate">Jatinga Slump (Barak Cutoff)</span>
                    </div>
                  </div>

                  {/* Card 2: Sikkim NH-10 Teesta Collapse */}
                  <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    <div className="bg-[#092548] text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wider text-center truncate shadow-xs">
                      SIKKIM · NH-10
                    </div>
                    <div className="h-20 bg-slate-50 relative overflow-hidden flex items-center justify-center p-1">
                      <div className="grid grid-cols-2 gap-1 w-full h-full">
                        <div className="bg-blue-50 rounded-lg border border-blue-200/60 flex items-center justify-center text-[8.5px] font-black text-blue-800 text-center p-0.5">
                          🌊 Teesta Surge
                        </div>
                        <div className="bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-[8.5px] font-black text-slate-800 text-center p-0.5">
                          🪨 29th Mile
                        </div>
                        <div className="bg-rose-50 rounded-lg border border-rose-200/60 flex items-center justify-center text-[8.5px] font-black text-rose-800 text-center p-0.5">
                          📍 Mangan Cut
                        </div>
                        <div className="bg-emerald-50 rounded-lg border border-emerald-200/60 flex items-center justify-center text-[8.5px] font-black text-emerald-800 text-center p-0.5">
                          🛡️ Swastik Unit
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 text-center bg-slate-50 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-800 block truncate">Teesta Basin Washout</span>
                    </div>
                  </div>

                  {/* Card 3: Majuli Island Riverine Flood */}
                  <div className="rounded-xl border border-amber-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wider text-center truncate shadow-xs">
                      MAJULI ISLAND
                    </div>
                    <div className="h-20 bg-slate-50 relative overflow-hidden flex items-center justify-center p-1">
                      <div className="grid grid-cols-2 gap-1 w-full h-full">
                        <div className="bg-sky-50 rounded-lg border border-sky-200/60 flex items-center justify-center text-[8.5px] font-black text-sky-800 text-center p-0.5">
                          🚢 NW-2 RoPax
                        </div>
                        <div className="bg-red-50 rounded-lg border border-red-200/60 flex items-center justify-center text-[8.5px] font-black text-red-800 text-center p-0.5">
                          🌊 River +1.4m
                        </div>
                        <div className="bg-amber-50 rounded-lg border border-amber-200/60 flex items-center justify-center text-[8.5px] font-black text-amber-800 text-center p-0.5">
                          📦 Buffer Stock
                        </div>
                        <div className="bg-teal-50 rounded-lg border border-teal-200/60 flex items-center justify-center text-[8.5px] font-black text-teal-800 text-center p-0.5">
                          🏝️ Island Dep.
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 text-center bg-slate-50 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-800 block truncate">Brahmaputra Flood Isolation</span>
                    </div>
                  </div>

                  {/* Card 4: Siliguri 22km Gateway */}
                  <div className="rounded-xl border border-emerald-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wider text-center truncate shadow-xs">
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

            {/* RIGHT COLUMN: Section 4 Ground-Level Regional Operations Telemetry HUD */}
            <div className="lg:col-span-5 space-y-4">
              {/* Header Title & Live Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="text-base font-black text-slate-900 tracking-tight">Regional Telemetry & Early Warning Matrix</h2>
                </div>
                <span className="rounded-full bg-blue-50 text-blue-700 text-[10px] font-black px-2.5 py-0.5 tracking-wider border border-blue-200">
                  8 STATES SYNCHRONIZED
                </span>
              </div>

              {/* Main Executive Telemetry Panel */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                      MDoNER · ISRO Bhuvan · GSI Bhusanket
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">National Corridor Vulnerability Index</h3>
                  </div>
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                    Live Telemetry
                  </span>
                </div>

                {/* 4 Critical Risk Gauges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
                      <span>Jatinga KM 148 (NH-27)</span>
                      <span className="text-red-700 font-mono font-black">86/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 w-[86%]" />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">Soft fold soil slip · Umrangso active</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
                      <span>Teesta Basin (NH-10)</span>
                      <span className="text-red-700 font-mono font-black">92/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 w-[92%]" />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">29th Mile clearing · BRO Swastik</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
                      <span>Siliguri Neck Gateway</span>
                      <span className="text-amber-700 font-mono font-black">64/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[64%]" />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">4,200 trucks/day · Srirampur pace</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
                      <span>Brahmaputra NW-2</span>
                      <span className="text-emerald-700 font-mono font-black">18/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 w-[18%]" />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">RoPax river barge standby</span>
                  </div>
                </div>

                {/* Ground Operational Directives */}
                <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <span className="size-2 rounded-full bg-blue-600" />
                    <span>Real-Time Disruption Decision Rule</span>
                  </div>
                  <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                    When dynamic rainfall accumulation exceeds 40mm/hr in Cluster A districts (BVS &gt; 0.80), heavy multi-axle cargo is preemptively re-routed via pre-mapped bypasses (Umrangso-Lanka) to prevent multi-day valley isolation.
                  </p>
                </div>

                {/* Infrastructure Scheme Counter */}
                <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-slate-600 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-600" />
                    NESIDS Outlay: ₹8,139.50 Cr
                  </span>
                  <span className="text-blue-700">PM-DevINE Connected</span>
                </div>
              </div>

              {/* Data Ingestion Badges */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-[9px] font-black text-slate-400 uppercase block">Weather Telemetry</span>
                  <strong className="text-xs font-bold text-slate-800">IMD Doppler Grid</strong>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-[9px] font-black text-slate-400 uppercase block">Terrain InSAR</span>
                  <strong className="text-xs font-bold text-slate-800">GSI Bhukosh</strong>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-[9px] font-black text-slate-400 uppercase block">Fleet Navigation</span>
                  <strong className="text-xs font-bold text-slate-800">ISRO NavIC L5</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        OPERATIONAL WORKSPACE TABS (EXECUTIVE CONTROL BAR)
        ====================================================
      */}
      <section className="mx-auto max-w-[1540px] px-4 lg:px-8 -mt-4 mb-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-2.5 shadow-sm">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
            {/* Tabs List */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <Link
                to="/"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all bg-[#092548] text-white shadow-sm ring-2 ring-blue-500/30"
              >
                <span className="text-sm">🌐</span>
                <span>Command Center</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-600/60 text-blue-100">GIS Live</span>
              </Link>

              <Link
                to="/corridors"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all text-slate-700 hover:text-blue-700 hover:bg-slate-100 border border-slate-200/70"
              >
                <span className="text-sm">🏔️</span>
                <span>Strategic Corridors</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">4 Alerts</span>
              </Link>

              <Link
                to="/fleet"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all text-slate-700 hover:text-blue-700 hover:bg-slate-100 border border-slate-200/70"
              >
                <span className="text-sm">🚚</span>
                <span>NavIC Fleet</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800">ISRO L5</span>
              </Link>

              <Link
                to="/roles"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all text-slate-700 hover:text-blue-700 hover:bg-slate-100 border border-slate-200/70"
              >
                <span className="text-sm">👥</span>
                <span>Role Portals (6)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-100 text-purple-800">RBAC</span>
              </Link>

              <Link
                to="/citizen"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all text-slate-700 hover:text-blue-700 hover:bg-slate-100 border border-slate-200/70"
              >
                <span className="text-sm">📱</span>
                <span>Citizen Kiosk</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">Offline Mesh</span>
              </Link>

              <Link
                to="/copilot"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all text-slate-700 hover:text-blue-700 hover:bg-slate-100 border border-slate-200/70"
              >
                <span className="text-sm">🤖</span>
                <span>AI Co-Pilot</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800">Neural RAG</span>
              </Link>
            </div>

            {/* Right Telemetry Badge */}
            <div className="hidden xl:flex items-center gap-3 text-xs font-bold text-slate-600 border-l border-slate-200 pl-4 shrink-0">
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                <span className="size-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
                InSAR & Doppler Grid Live
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[#092548] font-black uppercase tracking-wider text-[11px]">MDoNER · Govt of India</span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        2. PROBLEM STATEMENT & MISSION ARCHITECTURE (SIH26002)
        ====================================================
      */}
      <section className="mx-auto max-w-[1540px] px-4 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-blue-600 animate-ping" />
                Problem Statement ID: SIH26002 · MDoNER
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Why NER-SARTHI? Solving the Fragile Mountain Supply Chain Crisis
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Connecting 8 States · 64 Vulnerable Hill Districts · Single Point of Truth for High-Altitude Logistics Continuity
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-800">
                8 States Monitored Live
              </span>
            </div>
          </div>

          {/* 3 Strategic Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all space-y-2">
              <div className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                01
              </div>
              <h3 className="font-black text-base text-slate-900">Predictive Disruption Modeling</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physics-informed Bayesian Vulnerability Score (BVS) combining InSAR satellite slope radar, IMD Doppler rainfall, and soil displacement to predict chokepoint washouts before trucks get stranded.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-emerald-200 hover:shadow-md transition-all space-y-2">
              <div className="size-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                02
              </div>
              <h3 className="font-black text-base text-slate-900">Dynamic Multi-Modal Failover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When NH-27 (Jatinga) or NH-10 (Teesta) collapses, system triggers automated failovers to NFR Lumding-Badarpur railhead flatbeds and IWAI NW-2 Brahmaputra RoPax river barges for life-saving supplies.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-purple-200 hover:shadow-md transition-all space-y-2">
              <div className="size-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black">
                03
              </div>
              <h3 className="font-black text-base text-slate-900">Offline-First & 230+ Dialects</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamless last-mile communication with mountain commuters and truck drivers using offline local mesh caching, Bhashini speech-to-speech voice advisories in local tribal dialects, and 1-tap SOS dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        3. DEPARTMENT FEATURES & ACTIVE SERVICES (NAVIGATION HUBS)
        ====================================================
      */}
      <section className="mx-auto max-w-[1540px] px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#071326] p-6 sm:p-10 shadow-2xl border border-blue-900/60">
          {/* Subtle Cyber Grid & Atmospheric Glow */}
          <div 
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 25%, #1d4ed8 0%, #071326 75%)`
            }}
          />
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 space-y-8">
            {/* Top Row: Circular Icon Badges with Direct Route Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {/* Icon 1: Corridors */}
              <Link 
                to="/corridors"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="size-13 sm:size-14 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:ring-4 group-hover:ring-amber-400/40 transition-all border-2 border-white/20">
                  <Mountain className="size-6 text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-200 group-hover:text-amber-400 transition-colors">
                  CORRIDORS
                </span>
              </Link>

              {/* Icon 2: Fleet */}
              <Link 
                to="/fleet"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="size-13 sm:size-14 rounded-full bg-[#ea580c] text-white flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:ring-4 group-hover:ring-orange-400/40 transition-all border-2 border-white/20">
                  <Truck className="size-6 text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-200 group-hover:text-orange-400 transition-colors">
                  NAVIC FLEET
                </span>
              </Link>

              {/* Icon 3: GIS Radar */}
              <button 
                type="button"
                onClick={() => {
                  const el = document.getElementById('dashboard-view');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="size-13 sm:size-14 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:ring-4 group-hover:ring-emerald-400/40 transition-all border-2 border-white/20">
                  <MapPin className="size-6 text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-200 group-hover:text-emerald-400 transition-colors">
                  GIS RADAR
                </span>
              </button>

              {/* Icon 4: Multimodal */}
              <button 
                type="button"
                onClick={() => {
                  const el = document.getElementById('bvs-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="size-13 sm:size-14 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-110 group-hover:ring-4 group-hover:ring-sky-400/40 transition-all border-2 border-white/20">
                  <Anchor className="size-6 text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-200 group-hover:text-sky-400 transition-colors">
                  MULTIMODAL
                </span>
              </button>

              {/* Icon 5: War Rooms */}
              <Link 
                to="/roles"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="size-13 sm:size-14 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:ring-4 group-hover:ring-emerald-400/40 transition-all border-2 border-white/20">
                  <ShieldAlert className="size-6 text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-200 group-hover:text-emerald-400 transition-colors">
                  WAR ROOMS
                </span>
              </Link>

              {/* Icon 6: Citizen */}
              <Link 
                to="/citizen"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="size-13 sm:size-14 rounded-full bg-[#64748b] text-white flex items-center justify-center shadow-lg shadow-slate-500/30 group-hover:scale-110 group-hover:ring-4 group-hover:ring-slate-400/40 transition-all border-2 border-white/20">
                  <Smartphone className="size-6 text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-200 group-hover:text-slate-300 transition-colors">
                  CITIZEN KIOSK
                </span>
              </Link>

              {/* Icon 7: AI Co-Pilot */}
              <Link 
                to="/copilot"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="size-13 sm:size-14 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:ring-4 group-hover:ring-purple-400/40 transition-all border-2 border-white/20">
                  <Bot className="size-6 text-white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-200 group-hover:text-purple-400 transition-colors">
                  AI CO-PILOT
                </span>
              </Link>
            </div>

            {/* Centered Heading */}
            <div className="text-center space-y-1.5 max-w-3xl mx-auto">
              <h2 className="text-lg sm:text-2xl lg:text-[24px] font-black uppercase tracking-[0.22em] text-white drop-shadow-sm">
                DEPARTMENT FEATURES & ACTIVE SERVICES
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium max-w-xl mx-auto">
                Dedicated operational modules and cross-agency services for the North Eastern Region. Click any module to access its full command workspace.
              </p>
            </div>

            {/* 6 Glowing Glass Pod Cards (Suvidha Reference Architecture) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 sm:gap-3">
              {/* Pod 1: STRATEGIC CORRIDORS */}
              <Link 
                to="/corridors"
                className="rounded-2xl border-2 border-orange-500/40 bg-[#0a1b33]/90 hover:border-orange-400 transition-all p-3.5 shadow-xl flex flex-col justify-between group cursor-pointer hover:scale-[1.02]"
              >
                <div>
                  <div className="rounded-xl bg-[#ea580c] text-white text-[10px] font-black uppercase tracking-wider py-1 px-2 text-center shadow-md mb-3 flex items-center justify-center gap-1">
                    <span>HIGHWAY CORRIDORS</span>
                    <ExternalLink className="size-2.5 opacity-80" />
                  </div>
                  <ul className="space-y-2 text-[11px] font-bold text-slate-200">
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-orange-400 shrink-0" />
                      NH-27 JATINGA SLUMP
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-orange-400 shrink-0" />
                      NH-10 TEESTA SURGE
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-orange-400 shrink-0" />
                      SILIGURI 22KM NECK
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-orange-400 shrink-0" />
                      UMRANGSO BYPASS
                    </li>
                    <li className="flex items-center gap-1.5 truncate text-slate-400">
                      <span className="size-1.5 rounded-full bg-slate-500 shrink-0" />
                      5 ACTIVE ARTERIES
                    </li>
                  </ul>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-orange-400 font-bold group-hover:underline">
                  <span>Open Corridors Page</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Pod 2: NAVIC FLEET */}
              <Link 
                to="/fleet"
                className="rounded-2xl border-2 border-emerald-500/40 bg-[#0a1b33]/90 hover:border-emerald-400 transition-all p-3.5 shadow-xl flex flex-col justify-between group cursor-pointer hover:scale-[1.02]"
              >
                <div>
                  <div className="rounded-xl bg-[#16a34a] text-white text-[10px] font-black uppercase tracking-wider py-1 px-2 text-center shadow-md mb-3 flex items-center justify-center gap-1">
                    <span>NAVIC L5 FLEET</span>
                    <ExternalLink className="size-2.5 opacity-80" />
                  </div>
                  <ul className="space-y-2 text-[11px] font-bold text-slate-200">
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      OXYGEN & MEDICINE
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      FCI GRAIN RAKES
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      POL FUEL TANKERS
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      COLD-CHAIN SENSORS
                    </li>
                    <li className="flex items-center gap-1.5 truncate text-slate-400">
                      <span className="size-1.5 rounded-full bg-slate-500 shrink-0" />
                      1,284 CONVOYS
                    </li>
                  </ul>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-emerald-400 font-bold group-hover:underline">
                  <span>Open Fleet Page</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Pod 3: GIS & BVS ENGINE */}
              <div 
                onClick={() => {
                  const el = document.getElementById('dashboard-view');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-2xl border-2 border-sky-500/40 bg-[#0a1b33]/90 hover:border-sky-400 transition-all p-3.5 shadow-xl flex flex-col justify-between group cursor-pointer hover:scale-[1.02]"
              >
                <div>
                  <div className="rounded-xl bg-[#0284c7] text-white text-[10px] font-black uppercase tracking-wider py-1 px-2 text-center shadow-md mb-3">
                    GIS & BVS ENGINE
                  </div>
                  <ul className="space-y-2 text-[11px] font-bold text-slate-200">
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-sky-400 shrink-0" />
                      8 STATES GIS GRID
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-sky-400 shrink-0" />
                      BVS SCORE (0.85)
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-sky-400 shrink-0" />
                      INSAR RADAR SYNC
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-sky-400 shrink-0" />
                      DOPPLER RAIN FEED
                    </li>
                    <li className="flex items-center gap-1.5 truncate text-slate-400">
                      <span className="size-1.5 rounded-full bg-slate-500 shrink-0" />
                      64 DISTRICT INDEX
                    </li>
                  </ul>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-sky-400 font-bold group-hover:underline">
                  <span>View Map Below</span>
                  <span>↓</span>
                </div>
              </div>

              {/* Pod 4: MULTIMODAL LOGISTICS */}
              <div 
                onClick={() => {
                  const el = document.getElementById('bvs-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-2xl border-2 border-emerald-400/40 bg-[#0a1b33]/90 hover:border-emerald-300 transition-all p-3.5 shadow-xl flex flex-col justify-between group cursor-pointer hover:scale-[1.02]"
              >
                <div>
                  <div className="rounded-xl bg-[#10b981] text-white text-[10px] font-black uppercase tracking-wider py-1 px-2 text-center shadow-md mb-3">
                    MULTIMODAL MESH
                  </div>
                  <ul className="space-y-2 text-[11px] font-bold text-slate-200">
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      NFR LUMDING RAIL
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      NW-2 RIVER BARGES
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      JOGIGHOPA MMLP
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      MAJULI ROPAX FERRY
                    </li>
                    <li className="flex items-center gap-1.5 truncate text-slate-400">
                      <span className="size-1.5 rounded-full bg-slate-500 shrink-0" />
                      INTERMODAL FAILOVER
                    </li>
                  </ul>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-emerald-400 font-bold group-hover:underline">
                  <span>View Failover Panel</span>
                  <span>↓</span>
                </div>
              </div>

              {/* Pod 5: 6 ROLE WAR ROOMS */}
              <Link 
                to="/roles"
                className="rounded-2xl border-2 border-purple-500/40 bg-[#0a1b33]/90 hover:border-purple-400 transition-all p-3.5 shadow-xl flex flex-col justify-between group cursor-pointer hover:scale-[1.02]"
              >
                <div>
                  <div className="rounded-xl bg-[#7c3aed] text-white text-[10px] font-black uppercase tracking-wider py-1 px-2 text-center shadow-md mb-3 flex items-center justify-center gap-1">
                    <span>6 ROLE PORTALS</span>
                    <ExternalLink className="size-2.5 opacity-80" />
                  </div>
                  <ul className="space-y-2 text-[11px] font-bold text-slate-200">
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-purple-400 shrink-0" />
                      DISTRICT DM DESK
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-purple-400 shrink-0" />
                      MDONER COMMAND
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-purple-400 shrink-0" />
                      NDRF RESCUE CELL
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-purple-400 shrink-0" />
                      PWD / BRO TRIAGE
                    </li>
                    <li className="flex items-center gap-1.5 truncate text-slate-400">
                      <span className="size-1.5 rounded-full bg-slate-500 shrink-0" />
                      AADHAAR SANDBOX
                    </li>
                  </ul>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-purple-400 font-bold group-hover:underline">
                  <span>Open War Rooms Page</span>
                  <span>→</span>
                </div>
              </Link>

              {/* Pod 6: CITIZEN & ACCESSIBILITY */}
              <Link 
                to="/citizen"
                className="rounded-2xl border-2 border-cyan-500/40 bg-[#0a1b33]/90 hover:border-cyan-400 transition-all p-3.5 shadow-xl flex flex-col justify-between group cursor-pointer hover:scale-[1.02]"
              >
                <div>
                  <div className="rounded-xl bg-[#0891b2] text-white text-[10px] font-black uppercase tracking-wider py-1 px-2 text-center shadow-md mb-3 flex items-center justify-center gap-1">
                    <span>CITIZEN MOBILITY</span>
                    <ExternalLink className="size-2.5 opacity-80" />
                  </div>
                  <ul className="space-y-2 text-[11px] font-bold text-slate-200">
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-cyan-400 shrink-0" />
                      230+ DIALECT TTS
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-cyan-400 shrink-0" />
                      OFFLINE HILL MESH
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-cyan-400 shrink-0" />
                      1-TAP SOS DISPATCH
                    </li>
                    <li className="flex items-center gap-1.5 truncate">
                      <span className="size-1.5 rounded-full bg-cyan-400 shrink-0" />
                      PHOTO GEOTAGGING
                    </li>
                    <li className="flex items-center gap-1.5 truncate text-slate-400">
                      <span className="size-1.5 rounded-full bg-slate-500 shrink-0" />
                      TWILIO FALLBACK
                    </li>
                  </ul>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-cyan-400 font-bold group-hover:underline">
                  <span>Launch Kiosk Page</span>
                  <span>→</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        EXECUTIVE COMMAND: GEOSPATIAL RADAR & MULTIMODAL FAILOVER
        ====================================================
      */}
      <section id="module-command" className="space-y-8">
        <div className="mx-auto max-w-[1540px] px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest">EXECUTIVE OVERVIEW · REGIONAL FUSION</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">National Geospatial Command Center & BVS Engine</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                8 States Monitored Live
              </span>
            </div>
          </div>
        </div>

        {/* Direct Focus Ribbon */}
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

        {/* Eight-State GIS Command Display */}
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
            {/* Interactive SVG GIS Map Canvas */}
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

            <Alerts limit={5} />
          </div>
        </section>

        {/* Multi-Chart Analytics Row */}
        <section className="mx-auto max-w-[1540px] px-4 lg:px-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="section-kicker">Predictive Terrain Analytics</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Supply Continuity & Risk Intelligence</h2>
            </div>
            <Button asChild variant="outline" size="sm" className="text-xs font-bold cursor-pointer">
              <Link to="/corridors">Deep Corridor Analytics →</Link>
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
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

        {/* Dynamic Risk Modeling & Multimodal Fallback */}
        <section id="bvs-section" className="mx-auto max-w-[1540px] px-4 lg:px-8 space-y-6">
          <div>
            <span className="section-kicker">Mathematical Formulation & Intermodal Failover</span>
            <h2 className="text-2xl font-black text-slate-900">Dynamic Risk Modeling & Multimodal Logistics</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <BVSBayesianCalculator />
            <MultimodalFallbackPanel corridorId={selectedCorridorId} />
          </div>
        </section>
      </section>
    </div>
  );
}
