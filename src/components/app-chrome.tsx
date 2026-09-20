import { useState, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { 
  BellRing, Menu, X, Radio, ShieldCheck, AlertTriangle, FileText, 
  PhoneCall, Download, CheckCircle, ExternalLink, Activity, Satellite
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
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

          <div className="flex items-center gap-4 text-[10px]">
            <span className="hidden sm:flex items-center gap-1.5 font-mono text-foreground font-semibold">
              <span className="pulse-dot size-1.5 rounded-full bg-safe" />
              {time || 'LIVE TELEMETRY IST'}
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-primary font-semibold">
              <Satellite className="size-3.5" />
              NavIC L5 / GSAT-7A Synced
            </span>
            <span className="font-bold text-ashoka bg-ashoka/10 px-2 py-0.5 rounded">
              SIH26002 · Team 818_CodeBuddies
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-4 px-4 py-3 lg:px-8">
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

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              size="sm" 
              variant="outline" 
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold border-primary/20 hover:bg-primary/5 text-primary"
              onClick={() => setSitrepModal(true)}
            >
              <FileText className="size-3.5" />
              <span>SITREP Report</span>
            </Button>

            <Button 
              size="sm" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs"
              onClick={() => setBroadcast(true)}
            >
              <BellRing className="size-3.5 mr-1" />
              <span>Emergency Broadcast</span>
            </Button>

            <Button 
              size="icon" 
              variant="ghost" 
              className="lg:hidden" 
              aria-label={open ? 'Close navigation' : 'Open navigation'} 
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
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
              className="group relative shrink-0 rounded-md px-3.5 py-2 text-xs font-bold text-muted-foreground transition-all hover:bg-muted hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground shadow-2xs"
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
            <div className="pt-2 border-t border-border mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs font-semibold"
                onClick={() => { setOpen(false); setSitrepModal(true); }}
              >
                <FileText className="size-3.5 mr-2" /> Situation Report (SITREP)
              </Button>
            </div>
          </nav>
        )}

        {/* Breaking Live Incident Marquee */}
        <div className="border-t border-border/80 bg-amber-500/10 px-4 py-1 text-xs text-amber-900 font-medium overflow-hidden">
          <div className="mx-auto max-w-[1540px] flex items-center gap-3">
            <span className="shrink-0 flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded">
              <AlertTriangle className="size-3" /> Live SITREP
            </span>
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <div className="marquee-track inline-block text-[11px] font-medium">
                <span className="mx-4 font-semibold">🔴 NH-27 Landslide Warning: KM 148 Jatinga Slump (Dima Hasao) saturated. Heavy vehicles rerouted via Umrangso.</span>
                <span className="mx-4 font-semibold">🟡 Mangan Axis: Single-lane traffic restored at 29th Mile with BRO escort. Priority clearance for NER-MED-209.</span>
                <span className="mx-4 font-semibold">🟢 Kohima–Imphal NH-02: Normal transit resumed post slope stabilization.</span>
                <span className="mx-4 font-semibold">🔵 NavIC Satellite Sync: 8/8 North East States Active · 1,284 Essential Cargo Shipments Monitored.</span>
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
                Hackathon Submission
              </h3>
              <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-400">
                <p className="font-bold text-white">Smart India Hackathon (SIH26002)</p>
                <p className="mt-1 text-slate-400">Developed with dedication by <strong className="text-amber-400">Team 818_CodeBuddies</strong>.</p>
                <p className="mt-2 text-[10px] text-slate-500">
                  Comprehensive prototype demonstration using realistic regional telemetry and local state.
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

      {/* SITREP Situation Report Modal */}
      {sitrepModal && (
        <div 
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-xs" 
          onMouseDown={e => { if (e.target === e.currentTarget) setSitrepModal(false); }}
        >
          <div role="dialog" aria-modal="true" className="w-full max-w-xl rounded-xl border border-border bg-card p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <FileText className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-foreground">Regional Logistics SITREP #NER-2026-0927</h2>
                  <p className="text-xs text-muted-foreground">Prepared for: Ministry of Development of North Eastern Region</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setSitrepModal(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <div className="rounded-lg bg-muted/50 p-3 border border-border">
                <p className="font-bold text-foreground">1. Executive Overview</p>
                <p className="mt-1 text-muted-foreground">
                  As of 10:30 IST, all 8 states in the North Eastern Region are operational. 64 districts actively monitored under InSAR slope telemetry and IMD rainfall grids. 6 districts are on high disruption watch with 2 national highway corridors operating on scheduled bypasses.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-3">
                  <p className="font-bold text-foreground">Corridor Status</p>
                  <p className="mt-1 text-critical font-semibold">• NH-27 (Dima Hasao): Restricted</p>
                  <p className="text-warning-foreground font-semibold">• NH-06 (Shillong-Silchar): High Watch</p>
                  <p className="text-safe font-semibold">• NH-02 (Dimapur-Imphal): Clear</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="font-bold text-foreground">Critical Fleet Movements</p>
                  <p className="mt-1 text-muted-foreground">• Medical: 98% delivery reliability</p>
                  <p className="text-muted-foreground">• Petroleum (POL): 85 min avg bypass delay</p>
                  <p className="text-muted-foreground">• FCI Foodgrains: Buffer stocks adequate</p>
                </div>
              </div>

              <div className="rounded-lg border border-border p-3">
                <p className="font-bold text-foreground">2. Suggested Inter-Ministry Actions</p>
                <p className="mt-1 text-muted-foreground">
                  • Direct Assam PWD and BRO to expedite heavy earthmover deployment at KM 148 Jatinga.<br />
                  • Approve temporary green-corridor toll exemption at Umrangso bypass checkposts.<br />
                  • Authorize SDRF 1st Bn to maintain standby staging at Haflong.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
              <Button variant="outline" size="sm" onClick={() => setSitrepModal(false)}>Close</Button>
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground font-semibold"
                onClick={() => {
                  window.alert('SITREP Report generated and copied to clipboard as formatted executive markdown.');
                  setSitrepModal(false);
                }}
              >
                <Download className="size-3.5 mr-1" /> Export SITREP PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
