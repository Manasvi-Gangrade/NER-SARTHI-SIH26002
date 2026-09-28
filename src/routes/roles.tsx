import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  ShieldCheck, Radio, ClipboardCheck, Users, ArrowRight, 
  AlertTriangle, Building2, Truck, CheckCircle2, FileText, 
  PhoneCall, Zap, Compass, Check, Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading, Metrics, SectionHead, Status, Alerts } from '@/components/ner-ui';
import { metadata, type Risk } from '@/lib/ner-data';

export const operationalRoles = [
  {
    id: 'citizen-panel',
    name: 'Citizen & Commuter Portal',
    icon: Smartphone,
    jurisdiction: 'District Commuters & Remote Settlements',
    scope: 'Public Accessibility & Hazard Reporting Desk',
    summary: 'View live road closures, listen to spoken advisories in 230+ regional dialects, report rockfalls with geotagged photos, and check essential delivery ETAs without requiring Aadhaar KYC.',
    metrics: [
      { label: 'Remote Settlements', value: '4,280 Mapped', detail: '100% regional coverage', tone: 'safe' as Risk },
      { label: 'Active Reports', value: '18 Today', detail: '6 verified by PWD', tone: 'watch' as Risk },
      { label: 'Toll-Free IVRS', value: '1800-11-2026', detail: '230+ Dialects active', tone: 'safe' as Risk },
    ],
    priorityQueue: [
      'Check NH-27 Jatinga road accessibility before embarking',
      'Submit geotagged photo of slope crack near KM 149',
      'Listen to audio weather alert in Assamese / Bodo',
      'Track expected arrival time of medical & ration convoy',
    ],
    quickActions: [
      'Report Road Obstruction / Mudslide',
      'Play Spoken Route Guidance (Bhashini)',
      'Check Hospital Oxygen & Ration Delivery ETA',
      'Download Offline Settlement Map Pack',
    ],
  },
  {
    id: 'district-admin',
    name: 'District Magistrate (DM War Room)',
    icon: Users,
    jurisdiction: 'Dima Hasao & Cachar Axis',
    scope: 'District Emergency Operations Center (DEOC)',
    summary: 'Coordinate ground accessibility, mobilize PWD clearance dozers, and manage essential hospital supply stockpiles.',
    metrics: [
      { label: 'Accessible Wards', value: '31 / 42', detail: '74% coverage', tone: 'watch' as Risk },
      { label: 'Open Road Incidents', value: '04 Reports', detail: 'KM 148 Jatinga Slump', tone: 'critical' as Risk },
      { label: 'Clearance Crews', value: '12 Deployed', detail: 'Assam PWD + BRO', tone: 'safe' as Risk },
    ],
    priorityQueue: [
      'Issue Section 144 vehicle weight restriction on Jatinga bridge',
      'Verify 18-hour medical oxygen buffer at Haflong Civil Hospital',
      'Clear Umrangso bypass toll booths for emergency relief convoys',
      'Synchronize situation report with State Disaster Management Authority',
    ],
    quickActions: [
      'Deploy Excavator Unit to Jatinga Escarpment',
      'Authorize Emergency Toll Waiver on Bypass',
      'Issue Citizen Monsoon Advisory via SMS',
      'Requisition FCI Buffer Stock at Lumding Depot',
    ],
  },
  {
    id: 'central-command',
    name: 'MDoNER State/Central Command',
    icon: Building2,
    scope: 'National Inter-Ministry Coordination Cell (New Delhi)',
    jurisdiction: 'All 8 North Eastern States (Regional)',
    summary: 'Monitor inter-state corridor continuity, petroleum (POL) stock levels, and coordinate inter-ministerial relief logistics with MoRTH and NDMA.',
    metrics: [
      { label: 'Operational States', value: '8 / 8', detail: '100% telemetry active', tone: 'safe' as Risk },
      { label: 'Vulnerable Arteries', value: '02 Highways', detail: 'NH-27 & NH-06', tone: 'critical' as Risk },
      { label: 'Active Shipments', value: '1,284 Convoys', detail: 'NavIC L5 tracked', tone: 'safe' as Risk },
    ],
    priorityQueue: [
      'Review InSAR satellite slope displacement feed for Barak Valley',
      'Coordinate Meghalaya–Assam inter-state detour protocols',
      'Approve emergency railway rake allocation for fertilizer transport',
      'Deliver daily 10:00 IST Inter-Ministry situation report',
    ],
    quickActions: [
      'Trigger Regional Emergency CAP Broadcast',
      'Export Cabinet SITREP Report (PDF)',
      'Escalate National Highway Clearance with MoRTH',
      'Mobilize Indian Air Force Logistics Standby',
    ],
  },
  {
    id: 'ndrf-sdrf',
    name: 'NDRF / SDRF Emergency Response',
    icon: Radio,
    scope: 'Disaster Triage & Search-and-Rescue Base',
    jurisdiction: '1st & 2nd Battalion Regional Detachments',
    summary: 'Pre-position rescue teams, triage high-priority disruption reports, and escort critical pharmaceutical shipments through landslide zones.',
    metrics: [
      { label: 'Active Deployments', value: '06 Units', detail: 'High-risk sectors', tone: 'safe' as Risk },
      { label: 'Critical SOS Alarms', value: '02 Pings', detail: 'Triaged and assigned', tone: 'critical' as Risk },
      { label: 'Standby Personnel', value: '18 Teams', detail: 'Ready in 30 minutes', tone: 'safe' as Risk },
    ],
    priorityQueue: [
      'Stage rescue detachment at Sonapur tunnel south approach',
      'Provide armed escort to vaccine convoy NER-MED-209 across 29th Mile',
      'Establish satellite VHF communication post at Jatinga pass',
      'Validate water level gauge at Diyung river bridge crossing',
    ],
    quickActions: [
      'Dispatch Quick Response Team to Slump Site',
      'Initiate Convoy Escort Protocol',
      'Deploy Inflatable Rafts & Earthmovers',
      'Acknowledge Citizen SOS Coordinate',
    ],
  },
  {
    id: 'field-officer',
    name: 'Field Officer (Ground PWD & BRO)',
    icon: ClipboardCheck,
    scope: 'Ground Verification & Highway Engineering Desk',
    jurisdiction: 'Sector Slopes & Mountain Passes',
    summary: 'Validate physical road conditions, inspect slope-retention wire mesh, and upload authenticated georeferenced obstruction reports.',
    metrics: [
      { label: 'Inspections Pending', value: '14 Sites', detail: 'Priority check queue', tone: 'watch' as Risk },
      { label: 'Verified Today', value: '37 Points', detail: 'Ground telemetry log', tone: 'safe' as Risk },
      { label: 'Active Bypass Passes', value: '04 Routes', detail: 'Safe for transit', tone: 'safe' as Risk },
    ],
    priorityQueue: [
      'Inspect single-lane rock clearance at NH-10 29th Mile',
      'Measure rain gauge accumulation at Karbi Anglong border',
      'Install physical detour signage for Umrangso diversion',
      'Validate crowd-reported mudflow photo at Haflong milepost 148',
    ],
    quickActions: [
      'Log Physical Road Clearance Certificate',
      'Upload Soil Moisture Core Sample',
      'Authorize Single-Lane Heavy Freight Passage',
      'Submit High-Risk Slope Alert to DM',
    ],
  },
  {
    id: 'transporter',
    name: 'Logistics Fleet & Transporters',
    icon: Truck,
    scope: 'Commercial & Essential Freight Carriers',
    jurisdiction: 'All North East Freight Corridors',
    summary: 'Monitor live NavIC truck positions, receive turn-by-turn bypass diversions, and prevent mountain truck jams.',
    metrics: [
      { label: 'Tracked Vehicles', value: '1,284 Trucks', detail: 'NavIC GPS fix', tone: 'safe' as Risk },
      { label: 'Active Detours', value: '42 Vehicles', detail: 'Umrangso bypass', tone: 'watch' as Risk },
      { label: 'Fuel Staging Depots', value: '98% Buffer', detail: 'Silchar & Aizawl', tone: 'safe' as Risk },
    ],
    priorityQueue: [
      'Transmit automated bypass route to convoy NER-MED-042',
      'Alert petroleum tankers to stage at Silchar railhead',
      'Confirm driver rest stop availability along Lanka corridor',
      'Verify mountain axle weight clearance for foodgrain trucks',
    ],
    quickActions: [
      'Broadcast Turn-by-Turn Bypass to Drivers',
      'Flag Vehicle Mechanical Breakdown',
      'Request Emergency Green-Corridor Escort',
      'Update Freight Delivery ETA Register',
    ],
  },
];

export const Route = createFileRoute('/roles')({
  head: () => metadata(
    'Operational Role Desks',
    'Specialized operational perspectives for District Magistrates, MDoNER Central Command, NDRF Disaster Teams, Field Engineers, and Transporters.'
  ),
  component: Roles,
});

function Roles() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [checkedQueue, setCheckedQueue] = useState<string[]>([]);

  const currentRole = operationalRoles[activeIdx] ?? operationalRoles[0]!;
  const Icon = currentRole.icon;

  const toggleAction = (act: string) => {
    setCompletedActions((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const toggleQueue = (item: string) => {
    setCheckedQueue((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="mx-auto max-w-[1540px] px-4 py-8 lg:px-8 space-y-8">
      <PageHeading
        kicker="Unified Operations · Tailored Roles"
        title="Institutional Role War Rooms"
        description="One single truth source, optimized for the operational workflows of District Magistrates, Central Secretariats, Emergency Responders, and Ground Engineers."
        aside={
          <span className="flex items-center gap-1.5 rounded-full border border-safe/30 bg-safe/10 px-3 py-1 text-xs font-bold text-safe">
            <Zap className="size-3.5" /> 6 Dedicated Operational Panels (RBAC)
          </span>
        }
      />

      {/* Role Navigation Tab Strip */}
      <div className="flex gap-2 overflow-x-auto border-b border-border pb-3">
        {operationalRoles.map((r, i) => {
          const RIcon = r.icon;
          const isSelected = activeIdx === i;
          return (
            <Button
              key={r.id}
              size="sm"
              variant={isSelected ? 'default' : 'outline'}
              className={`shrink-0 text-xs font-bold h-9 px-3.5 transition-all ${
                isSelected ? 'shadow-xs' : 'border-border text-muted-foreground hover:bg-muted'
              }`}
              onClick={() => {
                setActiveIdx(i);
              }}
            >
              <RIcon className="size-3.5 mr-1.5" />
              {r.name}
            </Button>
          );
        })}
      </div>

      {/* Role Operational Banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-xs shrink-0">
              <Icon className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-foreground">{currentRole.name}</h2>
                <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {currentRole.jurisdiction}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-semibold mt-0.5">{currentRole.scope}</p>
              <p className="mt-2 text-xs sm:text-sm text-foreground/90 max-w-3xl leading-relaxed">
                {currentRole.summary}
              </p>
            </div>
          </div>

          <Status status="safe">DESK ACTIVE</Status>
        </div>

        {/* Role Specific KPIs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-primary/15 pt-4">
          {currentRole.metrics.map((m) => (
            <div key={m.label} className="rounded-lg bg-card p-3 border border-border">
              <span className="text-[10px] font-bold uppercase text-muted-foreground block">{m.label}</span>
              <span className={`text-2xl font-black mt-1 block ${
                m.tone === 'critical' ? 'text-critical' : m.tone === 'watch' ? 'text-amber-700' : 'text-safe'
              }`}>
                {m.value}
              </span>
              <span className="text-[11px] text-muted-foreground">{m.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Role Controls Grid */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.1fr_340px]">
        {/* Priority Action Task Queue */}
        <article className="panel overflow-hidden flex flex-col">
          <SectionHead
            kicker="Workflow Automation"
            title="Priority Operational Queue"
            aside={<span className="text-xs text-muted-foreground font-semibold">{checkedQueue.length}/{currentRole.priorityQueue.length} Done</span>}
          />
          <div className="divide-y divide-border text-xs flex-1">
            {currentRole.priorityQueue.map((item, i) => {
              const isDone = checkedQueue.includes(item);
              return (
                <div
                  key={item}
                  onClick={() => toggleQueue(item)}
                  className={`p-4 cursor-pointer flex items-start gap-3 transition-colors ${
                    isDone ? 'bg-muted/40 text-muted-foreground line-through' : 'hover:bg-muted/20'
                  }`}
                >
                  <span className={`grid size-6 place-items-center rounded-full text-xs font-bold shrink-0 mt-0.5 ${
                    isDone ? 'bg-safe text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    {isDone ? <Check className="size-3.5" /> : `0${i + 1}`}
                  </span>
                  <p className="text-xs font-semibold leading-relaxed flex-1">{item}</p>
                </div>
              );
            })}
          </div>
          <div className="p-3 bg-muted/30 border-t border-border text-[11px] text-muted-foreground text-center">
            Click any task to mark as completed in this operational session.
          </div>
        </article>

        {/* Action Triggers */}
        <article className="panel overflow-hidden flex flex-col">
          <SectionHead
            kicker="Decision Dispatch"
            title="Immediate Action Triggers"
            aside={<Zap className="size-4 text-primary" />}
          />
          <div className="p-5 space-y-3 flex-1">
            {currentRole.quickActions.map((action) => {
              const isTriggered = completedActions.includes(action);
              return (
                <div
                  key={action}
                  className="rounded-lg border border-border p-3.5 flex items-center justify-between gap-3 bg-card hover:border-primary/40 transition-colors"
                >
                  <div>
                    <strong className="text-xs font-bold text-foreground block">{action}</strong>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">
                      {isTriggered ? '✓ Action dispatched to local agency' : 'Requires official confirmation'}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant={isTriggered ? 'secondary' : 'default'}
                    className="h-8 text-xs font-bold shrink-0 px-3"
                    onClick={() => toggleAction(action)}
                  >
                    {isTriggered ? 'Triggered' : 'Execute'}
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="p-3 bg-muted/30 border-t border-border text-[11px] text-muted-foreground text-center">
            Actions update the simulated command database locally.
          </div>
        </article>

        {/* Live Operations Feed Sidebar */}
        <Alerts limit={3} />
      </div>
    </div>
  );
}
