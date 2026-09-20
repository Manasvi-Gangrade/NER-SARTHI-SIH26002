import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  ArrowRight, MapPinned, Activity, Truck, ShieldAlert, Bot, 
  Smartphone, Sparkles, Navigation, Layers, CheckCircle2, 
  AlertTriangle, Phone, Radio, WifiOff, Languages, CloudRain,
  Eye, Compass, ShieldCheck, Download, ChevronRight, FileText,
  Building2, Users, ClipboardCheck, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  PageHeading, Metrics, MapView, Alerts, SectionHead, 
  AccessChart, ShipmentChart, FleetTable, Status, RiskChart, Bypass, Source 
} from '@/components/ner-ui';
import { 
  districts, alerts, vehicles, corridors, platformPillars, 
  aiQueries, metadata, type Risk 
} from '@/lib/ner-data';

export const Route = createFileRoute('/')({
  head: () => metadata(
    'National Command Center',
    'Comprehensive eight-state operational picture of corridor risk, district accessibility, alerts, and essential supply continuity across India’s North Eastern Region.'
  ),
  component: CommandCenter,
});

type RoleKey = 'central' | 'district' | 'ndrf' | 'field' | 'citizen' | 'driver';

const roleProfiles: Record<RoleKey, {
  label: string;
  badge: string;
  icon: any;
  scope: string;
  headline: string;
  actionQueue: string[];
  kpis: { label: string; value: string; detail: string; tone?: 'primary' | Risk }[];
}> = {
  central: {
    label: 'MDoNER Central Command',
    badge: 'Regional Oversight',
    icon: Building2,
    scope: 'Eight-State Regional Master Picture',
    headline: 'Inter-state corridor exposure, fuel reserves & national supply continuity.',
    actionQueue: [
      'Approve interstate detour protocol via Umrangso for NH-27',
      'Authorize emergency buffer grain allocation for Barak Valley',
      'Review InSAR satellite soil saturation report for Meghalaya slope',
    ],
    kpis: [
      { label: 'States Synced', value: '8 / 8', detail: 'Real-time telemetry' },
      { label: 'High-Risk Zones', value: '06', detail: 'Districts on watch', tone: 'critical' },
      { label: 'Active Shipments', value: '1,284', detail: 'Monitored via NavIC' },
      { label: 'On-time Rate', value: '72%', detail: 'Regional supply health', tone: 'safe' },
    ],
  },
  district: {
    label: 'District Admin (Dima Hasao)',
    badge: 'District Desk',
    icon: Users,
    scope: 'Haflong & Cachar Approach Jurisdiction',
    headline: 'Local accessibility index, road clearance machinery & municipal stockpiles.',
    actionQueue: [
      'Deploy PWD earthmover team to KM 148 Jatinga escarpment',
      'Verify hospital oxygen buffer stock at Haflong Civil Hospital',
      'Issue local advisory restricting heavy multi-axle trailers',
    ],
    kpis: [
      { label: 'District Access', value: '32%', detail: 'Critically restricted', tone: 'critical' },
      { label: '24h Rainfall', value: '124 mm', detail: 'Slope saturation point', tone: 'watch' },
      { label: 'Priority Convoys', value: '03', detail: 'Medical & fuel carriers' },
      { label: 'Clearing Crews', value: '4 Teams', detail: 'Deployed on NH-27', tone: 'safe' },
    ],
  },
  ndrf: {
    label: 'NDRF / SDRF Emergency Unit',
    badge: 'Disaster Staging',
    icon: Radio,
    scope: 'Quick Response & Rescue Staging',
    headline: 'Pre-positioning rescue personnel, rock-clearing gear & green corridor escort.',
    actionQueue: [
      'Stage NDRF 1st Bn detachment at Silchar approach',
      'Escort high-risk medical shipment NER-MED-209 across 29th Mile',
      'Inspect satellite soil moisture sensor DH-4 near Harangajao',
    ],
    kpis: [
      { label: 'Units Staged', value: '06', detail: 'Active disaster posts', tone: 'safe' },
      { label: 'SOS Beacon Pings', value: '02', detail: 'Triaged and queued', tone: 'watch' },
      { label: 'Pass Closures', value: '01', detail: 'NH-27 partial block', tone: 'critical' },
      { label: 'Standby Rescue', value: '18 Teams', detail: 'Ready in 30 mins' },
    ],
  },
  field: {
    label: 'Field Officer (Ground PWD/BRO)',
    badge: 'Ground Telemetry',
    icon: ClipboardCheck,
    scope: 'Road Verification & Hazard Validation',
    headline: 'Crowdsourced obstruction logs, single-lane clearance validation & detour signage.',
    actionQueue: [
      'Log ground verification of rock-fall net at Zubza Pass (NH-02)',
      'Inspect Teesta river crossing water level marker',
      'Verify offline mobile citizen hazard report #ALT-1092',
    ],
    kpis: [
      { label: 'Logs Validated', value: '37 Today', detail: 'Ground inspection', tone: 'safe' },
      { label: 'Pending Review', value: '14 Reports', detail: 'Awaiting inspection', tone: 'watch' },
      { label: 'Bypass Verified', value: '04 Corridors', detail: 'Safe for transit' },
      { label: 'Avg Verify Time', value: '18 min', detail: 'Mobile offline sync' },
    ],
  },
  citizen: {
    label: 'Citizen & Commuter Portal',
    badge: 'Public Safety',
    icon: Smartphone,
    scope: 'Travel Safety & Hazard Alerts',
    headline: 'Safe route guidance, multilingual voice advisories & emergency SOS beacon.',
    actionQueue: [
      'Check NH-27 bypass status before travelling to Silchar',
      'Download offline road safety map for Dima Hasao sector',
      'Report waterlogging obstruction on rural arterial road',
    ],
    kpis: [
      { label: 'Safe Routes', value: '3 Corridors', detail: 'Clear for passenger travel', tone: 'safe' },
      { label: 'Active Alerts', value: '04 Notices', detail: 'Weather & landslides', tone: 'watch' },
      { label: 'Restricted Hubs', value: 'Haflong', detail: 'Avoid non-essential trips', tone: 'critical' },
      { label: 'Assistance Line', value: '112 / 1078', detail: 'Toll-free 24x7' },
    ],
  },
  driver: {
    label: 'Truck Pilot & Convoy Driver',
    badge: 'Logistics Fleet',
    icon: Truck,
    scope: 'Freight Navigation & Turn-by-Turn',
    headline: 'NavIC GPS satellite navigation, mountain speed advisories & depot drop-off ETA.',
    actionQueue: [
      'Accept automated detour via Umrangso (+42 min travel time)',
      'Confirm fuel reserve buffer before ascending Jatinga Hill',
      'Transmit NavIC checkpoint ping at Haflong toll plaza',
    ],
    kpis: [
      { label: 'Target ETA', value: '2h 18m', detail: 'Haflong Civil Hospital' },
      { label: 'Assigned Bypass', value: 'Umrangso', detail: 'Single-axle clearance', tone: 'watch' },
      { label: 'NavIC Status', value: 'L5 Locked', detail: 'Sub-3m accuracy', tone: 'safe' },
      { label: 'Convoy Status', value: 'Rerouted', detail: 'Safe corridor active', tone: 'safe' },
    ],
  },
};

function CommandCenter() {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('central');
  const [selectedCorridorId, setSelectedCorridorId] = useState('NH-27');
  const [activeCopilotQuery, setActiveCopilotQuery] = useState(aiQueries[0]!);
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [customQuery, setCustomQuery] = useState('');

  // Mobile App Phone Mockup State
  const [phoneScreen, setPhoneScreen] = useState<'map' | 'report' | 'sos'>('map');
  const [phoneLanguage, setPhoneLanguage] = useState('English');
  const [phoneSosTriggered, setPhoneSosTriggered] = useState(false);
  const [phoneReportDone, setPhoneReportDone] = useState(false);

  const activeRoleData = roleProfiles[selectedRole];
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
    <div className="mx-auto max-w-[1540px] px-4 py-8 lg:px-8 space-y-10">
      {/* 
        ====================================================
        1. HERO & COMMAND STAT STRIP
        ====================================================
      */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card via-card to-muted/20 p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-border/80">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary flex items-center gap-1.5">
                <span className="chakra-mark size-3.5 inline-block text-primary" />
                MDoNER · Govt of India Flagship
              </span>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <ShieldCheck className="size-3.5" />
                Smart India Hackathon (SIH26002)
              </span>
              <span className="rounded-full bg-safe/10 px-3 py-1 text-xs font-bold text-safe flex items-center gap-1.5">
                <span className="pulse-dot size-2 rounded-full bg-safe inline-block" />
                8/8 States Operational
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              NER-SARTHI <span className="text-primary font-bold text-2xl sm:text-3xl lg:text-4xl">Intelligence Platform</span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              National Decision-Support and AI Logistics Coordination System for India’s North Eastern Region. 
              Forecasting slope hazards, optimizing multi-modal lifeline corridors, and securing vital medical, food, and fuel movements across all eight states.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button asChild className="h-11 px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xs">
              <a href="#dashboard-view">
                Explore Command GIS <ChevronRight className="size-4 ml-1" />
              </a>
            </Button>
            <Button asChild variant="outline" className="h-11 px-5 border-primary/20 text-primary font-bold hover:bg-primary/5">
              <a href="#mobile-preview">
                Citizen Mobile App <Smartphone className="size-4 ml-1.5 text-muted-foreground" />
              </a>
            </Button>
          </div>
        </div>

        {/* Hero Stat Strip with Animated Counter Aesthetic */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Districts Monitored</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-primary">64</span>
              <span className="text-[10px] font-bold text-safe">8 States</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Continuous InSAR satellite radar</p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Lifeline Routes</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-primary">142</span>
              <span className="text-[10px] font-bold text-primary">Active</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">5 strategic highways assessed</p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Convoys Monitored</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-foreground">1,284</span>
              <span className="text-[10px] font-bold text-safe">NavIC L5</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Medical, POL, Foodgrain & Relief</p>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Avg Transit Delay</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-safe">-38%</span>
              <span className="text-[10px] font-bold text-safe">Saved</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Via dynamic AI bypass routing</p>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl border border-border/70 bg-card p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Critical Delivery Rate</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600">99.4%</span>
              <span className="text-[10px] font-bold text-safe">Reliability</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Zero hospital oxygen stockouts</p>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        2. INTERACTIVE ROLE-BASED LENS SWITCHER
        ====================================================
      */}
      <section className="rounded-xl border border-border bg-card p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <span className="section-kicker">Multi-Stakeholder Architecture</span>
            <h2 className="text-lg font-black text-foreground">Operational Role Perspectives</h2>
            <p className="text-xs text-muted-foreground">
              Select a stakeholder perspective to dynamically adapt metrics, priority queues, and decision controls.
            </p>
          </div>
          <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary self-start md:self-auto">
            Active Lens: {activeRoleData.label}
          </span>
        </div>

        {/* Role Tab Selector Buttons */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {(Object.keys(roleProfiles) as RoleKey[]).map((key) => {
            const role = roleProfiles[key];
            const Icon = role.icon;
            const isSelected = selectedRole === key;
            return (
              <Button
                key={key}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole(key)}
                className={`shrink-0 text-xs font-bold h-9 px-3.5 transition-all ${
                  isSelected ? 'shadow-xs' : 'border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="size-3.5 mr-1.5" />
                {role.label}
              </Button>
            );
          })}
        </div>

        {/* Dynamic Role Profile Display Banner */}
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary text-primary-foreground px-2 py-0.5 text-[10px] font-black uppercase">
                  {activeRoleData.badge}
                </span>
                <span className="text-xs font-bold text-muted-foreground">{activeRoleData.scope}</span>
              </div>
              <p className="text-sm font-bold text-foreground">{activeRoleData.headline}</p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto">
              <Button asChild size="sm" variant="outline" className="text-xs font-bold bg-card border-border">
                <Link to="/roles">Open Role War Room <ArrowRight className="size-3 ml-1" /></Link>
              </Button>
            </div>
          </div>

          {/* Dynamic Role Metrics Strip */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-primary/15 pt-3">
            {activeRoleData.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded bg-card/80 p-2.5 border border-border/80">
                <span className="text-[10px] font-bold uppercase text-muted-foreground block">{kpi.label}</span>
                <span className={`text-xl font-black mt-0.5 block ${
                  kpi.tone === 'critical' ? 'text-critical' : kpi.tone === 'safe' ? 'text-safe' : 'text-primary'
                }`}>
                  {kpi.value}
                </span>
                <span className="text-[10px] text-muted-foreground">{kpi.detail}</span>
              </div>
            ))}
          </div>

          {/* Role Priority Action Queue */}
          <div className="mt-3 pt-3 border-t border-primary/15 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold uppercase text-[10px] tracking-wider text-primary mr-1">Immediate Actions:</span>
            {activeRoleData.actionQueue.map((item, idx) => (
              <span key={idx} className="rounded-md bg-card px-2.5 py-1 text-[11px] font-semibold text-foreground border border-border flex items-center gap-1.5 shadow-2xs">
                <span className="size-1.5 rounded-full bg-primary" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        3. PRIMARY SHOWCASE: GIS MAP & LIVE OPERATIONS FEED
        ====================================================
      */}
      <section id="dashboard-view" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="section-kicker">Regional Geospatial Telemetry</span>
            <h2 className="text-2xl font-black text-foreground">Eight-State Command Center GIS</h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 rounded-full border border-safe/30 bg-safe/10 px-3 py-1 text-safe font-bold">
              <span className="pulse-dot size-2 rounded-full bg-safe" />
              GIS Telemetry Live
            </span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(320px,1fr)]">
          {/* Main Interactive SVG GIS Map Canvas */}
          <article className="panel overflow-hidden flex flex-col">
            <SectionHead
              kicker="Interactive National Decision Display"
              title="District Vulnerability & Highway Corridors"
              aside={
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground hidden sm:inline">Click district or highway for telemetry</span>
                </div>
              }
            />
            <div className="h-[460px] sm:h-[520px] p-2 relative">
              <MapView highlightCorridor={selectedCorridorId} />
            </div>
            {/* Quick Corridor Selection Bar below map */}
            <div className="border-t border-border bg-card p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-muted-foreground text-[11px]">Inspect Highway Arteries:</span>
              <div className="flex flex-wrap gap-1.5">
                {corridors.map((c) => (
                  <Button
                    key={c.id}
                    size="sm"
                    variant={selectedCorridorId === c.id ? 'default' : 'outline'}
                    className={`h-7 px-2.5 text-xs font-bold ${
                      c.status === 'critical' ? 'border-critical/30' : ''
                    }`}
                    onClick={() => setSelectedCorridorId(c.id)}
                  >
                    {c.id}
                    <span className={`ml-1 size-1.5 rounded-full ${
                      c.status === 'critical' ? 'bg-critical' : c.status === 'watch' ? 'bg-amber-500' : 'bg-safe'
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
        4. MULTI-CHART ANALYTICS ROW
        ====================================================
      */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="section-kicker">Predictive Terrain Analytics</span>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">Supply Continuity & Risk Intelligence</h2>
          </div>
          <Button asChild variant="outline" size="sm" className="text-xs font-bold">
            <Link to="/corridors">Deep Corridor Analytics →</Link>
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Corridor 7-day Risk Trend Area Chart */}
          <article className="panel overflow-hidden">
            <SectionHead
              kicker={`${activeCorridor.id} · ${activeCorridor.focus}`}
              title="7-Day Landslide Risk & Rain"
              aside={<Status status={activeCorridor.status}>{activeCorridor.status}</Status>}
            />
            <div className="p-4">
              <div className="flex items-center justify-between text-xs border-b border-border pb-2.5 mb-2">
                <span className="text-muted-foreground font-semibold">Route: <strong className="text-foreground">{activeCorridor.name}</strong></span>
                <span className="text-primary font-bold">{activeCorridor.elevation}</span>
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
          <article className="panel overflow-hidden">
            <SectionHead
              kicker="Isolation Risk Index"
              title="District Accessibility Index"
              aside={<MapPinned className="size-4 text-primary" />}
            />
            <div className="p-4 flex flex-col justify-between h-[calc(100%-54px)]">
              <p className="text-[11px] text-muted-foreground mb-1">
                Scores below 50 indicate acute mountain isolation risk requiring alternate staging depots.
              </p>
              <div className="h-[230px]">
                <AccessChart />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-muted-foreground border-t border-border pt-2">
                <span className="text-safe">● High Access (&gt;75)</span>
                <span className="text-primary">● Moderate (50-74)</span>
                <span className="text-critical">● Isolated (&lt;50)</span>
              </div>
            </div>
          </article>

          {/* Shipment Health Donut Chart */}
          <article className="panel overflow-hidden flex flex-col">
            <SectionHead
              kicker="Essential Cargo Telemetry"
              title="Shipment Continuity Breakdown"
              aside={<Activity className="size-4 text-primary" />}
            />
            <div className="flex-1 flex flex-col justify-center">
              <ShipmentChart />
            </div>
            <div className="border-t border-border bg-muted/30 p-3 text-center">
              <span className="text-[11px] font-bold text-muted-foreground">
                1,284 Convoys Tracked via NavIC Satellite Constellation
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* 
        ====================================================
        5. FLEET TELEMETRY & CONVOY RADAR
        ====================================================
      */}
      <section className="space-y-4">
        <div className="panel overflow-hidden">
          <SectionHead
            kicker="Active Mountain Logistics"
            title="Priority Convoy Telemetry & Satellite Dispatch"
            aside={
              <Button asChild variant="outline" size="sm" className="text-xs font-bold">
                <Link to="/fleet">View All Convoys <ArrowRight className="size-3.5 ml-1" /></Link>
              </Button>
            }
          />
          <FleetTable rows={vehicles.slice(0, 5)} />
        </div>
      </section>

      {/* 
        ====================================================
        6. AI DECISION CO-PILOT WORKBENCH & INTERACTIVE CHAT
        ====================================================
      */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="section-kicker">Grounded Decision Intelligence</span>
            <h2 className="text-2xl font-black text-foreground">NER-SARTHI AI Co-Pilot</h2>
          </div>
          <Button asChild variant="outline" size="sm" className="text-xs font-bold">
            <Link to="/copilot">Open Full AI Desk <ArrowRight className="size-3 ml-1" /></Link>
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
          {/* Chat / Briefing Console */}
          <div className="panel overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-border bg-primary px-5 py-3.5 text-primary-foreground">
              <div className="flex items-center gap-2.5">
                <div className="grid size-7 place-items-center rounded bg-white/10 text-white">
                  <Bot className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Ask NER-SARTHI Strategic Co-Pilot</h3>
                  <p className="text-[10px] text-primary-foreground/70">RAG Grounded Intelligence · Physics & Terrain Validated</p>
                </div>
              </div>
              <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-extrabold uppercase">
                SLM Active
              </span>
            </div>

            {/* Conversation Window */}
            <div className="flex-1 bg-muted/20 p-5 space-y-4 min-h-[300px]">
              {/* User Question Bubble */}
              <div className="ml-auto w-fit max-w-[85%] rounded-lg bg-primary p-3 text-xs sm:text-sm text-primary-foreground shadow-xs font-medium">
                {activeCopilotQuery.q}
              </div>

              {/* AI Response Card */}
              {copilotLoading ? (
                <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card p-4 w-fit shadow-xs">
                  <span className="typing-dot" />
                  <span className="typing-dot delay-1" />
                  <span className="typing-dot delay-2" />
                  <span className="text-xs text-muted-foreground font-semibold ml-2">Synthesizing terrain & convoy telemetry...</span>
                </div>
              ) : (
                <div className="max-w-[96%] rounded-lg border border-border bg-card p-5 shadow-sm space-y-3 animate-fade-in">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <Sparkles className="size-4" />
                      Executive Situation Intelligence
                    </span>
                    <span className="rounded bg-safe/10 px-2 py-0.5 text-[10px] font-bold text-safe">
                      {activeCopilotQuery.confidence}% Grounded Confidence
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                    {activeCopilotQuery.answer}
                  </p>

                  <div className="rounded-md border-l-4 border-amber-500 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200">
                    <b className="font-bold">Recommended Action: </b>
                    {activeCopilotQuery.action}
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                      Audited Data Citations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCopilotQuery.sources.map((src) => (
                        <Source key={src}>{src}</Source>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleCustomSubmit} className="flex gap-2 border-t border-border bg-card p-3">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Ask about mountain routes, medical convoys, rainfall or district stock..."
                className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" size="sm" className="font-bold text-xs h-10 px-4">
                Inquire
              </Button>
            </form>
          </div>

          {/* Quick Preset Queries & What-If Simulator */}
          <div className="space-y-4">
            <article className="panel p-4">
              <span className="section-kicker">Quick Strategic Inquiries</span>
              <h3 className="text-sm font-bold text-foreground mb-3">Pre-Grounded Scenarios</h3>
              <div className="space-y-2">
                {aiQueries.slice(0, 4).map((q) => (
                  <Button
                    key={q.q}
                    variant={activeCopilotQuery.q === q.q ? 'secondary' : 'outline'}
                    size="sm"
                    className="h-auto w-full justify-start py-2.5 px-3 text-left text-xs font-semibold whitespace-normal border-border hover:bg-muted"
                    onClick={() => handleAskCopilot(q)}
                  >
                    <ChevronRight className="size-3.5 mr-1 shrink-0 text-primary" />
                    <span>{q.q}</span>
                  </Button>
                ))}
              </div>
            </article>

            {/* What-If Rapid Terrain Stress Test Card */}
            <article className="panel p-4 bg-muted/20 border-border">
              <div className="flex items-center gap-2 text-primary mb-2">
                <CloudRain className="size-4" />
                <h4 className="text-xs font-bold uppercase">Rapid What-If Stress Tester</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Simulating +40mm additional monsoon precipitation across Dima Hasao increases Jatinga hazard probability to 94/100, mandating complete diversion of freight via Umrangso.
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-border/80 pt-2 text-xs">
                <span className="font-bold text-critical">Estimated Extra Delay: +42 min</span>
                <Button asChild size="sm" variant="ghost" className="h-6 text-[11px] text-primary p-0">
                  <Link to="/copilot">Launch Full Simulator →</Link>
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        7. CITIZEN & DRIVER SMARTPHONE MOCKUP PREVIEW
        ====================================================
      */}
      <section id="mobile-preview" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="section-kicker">Last-Mile Field Accessibility</span>
            <h2 className="text-2xl font-black text-foreground">Citizen & Driver Mobile Experience</h2>
          </div>
          <Button asChild variant="outline" size="sm" className="text-xs font-bold">
            <Link to="/citizen">Open Mobile Desk <ArrowRight className="size-3 ml-1" /></Link>
          </Button>
        </div>

        <div className="panel p-6 sm:p-8 bg-gradient-to-r from-card via-card to-muted/30">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_360px] items-center">
            {/* Feature Description Side */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="rounded bg-safe/10 text-safe font-bold text-xs px-2.5 py-1">
                  Offline-First Architecture
                </span>
                <span className="rounded bg-primary/10 text-primary font-bold text-xs px-2.5 py-1">
                  Bhashini 230+ Languages
                </span>
              </div>

              <h3 className="text-2xl font-black text-foreground">
                Engineered for Zero-Connectivity Mountain Valleys
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Truck drivers and isolated village citizens can access cached route safety alerts, report road blockages with offline photo capture, and trigger SOS panic beacons even without an active cellular network. Data automatically syncs when reconnecting to highway mesh nodes.
              </p>

              {/* Interactive Phone Screen Switchers */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase text-muted-foreground block">
                  Interactive Simulator Controls:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={phoneScreen === 'map' ? 'default' : 'outline'}
                    onClick={() => setPhoneScreen('map')}
                    className="text-xs font-bold"
                  >
                    1. Live Route Map & Alert
                  </Button>
                  <Button
                    size="sm"
                    variant={phoneScreen === 'report' ? 'default' : 'outline'}
                    onClick={() => setPhoneScreen('report')}
                    className="text-xs font-bold"
                  >
                    2. Report Blockage
                  </Button>
                  <Button
                    size="sm"
                    variant={phoneScreen === 'sos' ? 'default' : 'outline'}
                    onClick={() => setPhoneScreen('sos')}
                    className="text-xs font-bold text-critical"
                  >
                    3. SOS Emergency Beacon
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-xs">
                <div className="flex items-start gap-2">
                  <WifiOff className="size-4 text-safe shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-foreground">Zero Signal Queuing</strong>
                    <span className="text-muted-foreground">Local SQLite storage stores incident photos</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Languages className="size-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-foreground">Multi-Dialect Audio</strong>
                    <span className="text-muted-foreground">Assamese, Bodo, Meitei, Bengali, Mizo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Realistic Smartphone Mockup */}
            <div className="flex justify-center">
              <div className="phone-device">
                {/* Phone Speaker & Camera Notch */}
                <div className="phone-notch">
                  <div className="absolute right-3 top-1.5 size-2 rounded-full bg-slate-800" />
                </div>

                {/* Mobile Screen Header */}
                <div className="bg-primary px-4 py-2.5 text-primary-foreground flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="chakra-mark size-3 inline-block" />
                    <span className="text-xs font-black tracking-tight">NER-SARTHI Mobile</span>
                  </div>
                  <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                    {phoneLanguage.slice(0, 3).toUpperCase()}
                  </span>
                </div>

                {/* Screen 1: Live Route Map */}
                {phoneScreen === 'map' && (
                  <div className="p-3 space-y-3 flex-1 overflow-y-auto bg-slate-50 text-slate-900 text-xs">
                    {/* Road Advisory Banner */}
                    <div className="rounded-lg border border-amber-300 bg-amber-50 p-2.5 text-amber-900">
                      <div className="flex items-center gap-1.5 font-bold text-[11px]">
                        <AlertTriangle className="size-3.5 text-amber-600" />
                        <span>NH-27 Alert Ahead</span>
                      </div>
                      <p className="mt-1 text-[10px] leading-tight text-amber-800">
                        Heavy rain near Jatinga. Umrangso bypass recommended (+42 min).
                      </p>
                    </div>

                    {/* Mini SVG Route Illustration */}
                    <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Active Trip</span>
                      <strong className="text-sm text-primary block mt-0.5">Guwahati → Haflong</strong>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                        <span>Speed: 38 km/h</span>
                        <span className="font-bold text-emerald-600">ETA: 2h 18m</span>
                      </div>
                    </div>

                    {/* Nearby Safe Stations */}
                    <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-1.5 shadow-2xs">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Nearest Depots</span>
                      <p className="flex items-center justify-between text-[11px]">
                        <span>Umrangso Relief Camp</span>
                        <strong className="text-emerald-700">Open (14 km)</strong>
                      </p>
                      <p className="flex items-center justify-between text-[11px]">
                        <span>Haflong Civil Hospital</span>
                        <strong className="text-amber-700">Alert (48 km)</strong>
                      </p>
                    </div>

                    <Button
                      size="sm"
                      className="w-full text-xs font-bold bg-primary text-white"
                      onClick={() => setPhoneScreen('report')}
                    >
                      Report Road Hazard
                    </Button>
                  </div>
                )}

                {/* Screen 2: Report Blockage */}
                {phoneScreen === 'report' && (
                  <div className="p-3 space-y-3 flex-1 overflow-y-auto bg-slate-50 text-slate-900 text-xs">
                    <h4 className="font-black text-sm text-primary">Field Hazard Report</h4>
                    <p className="text-[10px] text-slate-500">
                      Works 100% offline. Will sync upon connection.
                    </p>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-slate-700">
                        Incident Location
                        <input
                          type="text"
                          defaultValue="KM 148, Jatinga Slump"
                          className="mt-1 w-full rounded border border-slate-300 bg-white p-2 text-xs font-normal"
                        />
                      </label>

                      <label className="block text-[11px] font-bold text-slate-700">
                        Hazard Category
                        <select className="mt-1 w-full rounded border border-slate-300 bg-white p-2 text-xs">
                          <option>Landslide / Mudflow</option>
                          <option>Bridge Water Inundation</option>
                          <option>Fallen Tree Obstruction</option>
                          <option>Road Surface Slump</option>
                        </select>
                      </label>

                      <div className="rounded border-2 border-dashed border-slate-300 p-3 text-center bg-white">
                        <span className="text-[10px] text-slate-500 font-semibold block">Photo Attached</span>
                        <span className="text-xs font-bold text-emerald-700">IMG_20260927_1030.jpg (Verified)</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => {
                        setPhoneReportDone(true);
                        setTimeout(() => {
                          setPhoneReportDone(false);
                          setPhoneScreen('map');
                        }, 1400);
                      }}
                    >
                      {phoneReportDone ? '✓ Report Queued Offline' : 'Submit Offline Report'}
                    </Button>
                  </div>
                )}

                {/* Screen 3: SOS Emergency */}
                {phoneScreen === 'sos' && (
                  <div className="p-4 space-y-4 flex-1 flex flex-col justify-center items-center bg-red-50 text-slate-900 text-center text-xs">
                    <div className="grid size-16 place-items-center rounded-full bg-red-600 text-white animate-pulse">
                      <Phone className="size-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-red-700">Emergency SOS Beacon</h4>
                      <p className="mt-1 text-[11px] text-slate-600">
                        Transmits emergency GPS fix (25.18°N, 93.03°E) to NDRF 1st Battalion & District Magistrate War Room.
                      </p>
                    </div>

                    <Button
                      className="h-11 w-full bg-red-600 hover:bg-red-700 text-white font-black text-sm"
                      onClick={() => {
                        setPhoneSosTriggered(true);
                        setTimeout(() => setPhoneSosTriggered(false), 2000);
                      }}
                    >
                      {phoneSosTriggered ? 'SOS Beacon Active!' : 'TRIGGER RESCUE BEACON'}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-slate-500"
                      onClick={() => setPhoneScreen('map')}
                    >
                      Cancel & Return
                    </Button>
                  </div>
                )}

                {/* Phone Bottom Home Bar */}
                <div className="bg-slate-900 py-1.5 flex justify-center">
                  <div className="h-1 w-24 rounded-full bg-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        8. PLATFORM PILLARS & FEATURE MATRIX
        ====================================================
      */}
      <section className="space-y-4">
        <div>
          <span className="section-kicker">Core System Architecture</span>
          <h2 className="text-2xl font-black text-foreground">Platform Capabilities & Pillars</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Engineered specifically to solve high-mountain logistics fragility in India's North Eastern Region.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platformPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="panel p-5 flex flex-col justify-between hover:border-primary/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-[9px] font-black uppercase text-primary">
                    {pillar.badge}
                  </span>
                  <span className="text-[10px] font-bold text-safe">{pillar.metrics}</span>
                </div>

                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">
                  {pillar.subtitle}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-primary font-bold">
                <span>Production Spec</span>
                <CheckCircle2 className="size-4 text-safe" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
