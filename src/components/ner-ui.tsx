import { useState } from 'react';
import { 
  AlertTriangle, ArrowUpRight, Clock3, MapPin, Navigation, Truck, 
  Layers, Compass, CloudRain, Shield, Mountain, Activity, CheckCircle2, 
  ExternalLink, Info, Phone, Radio, ChevronRight, UserCheck, Eye, EyeOff
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { 
  districts, alerts, vehicles, weekly, corridors, type Risk, 
  type DistrictData, type OperationalAlert, type VehicleTelemetry 
} from '@/lib/ner-data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function PageHeading({
  kicker,
  title,
  description,
  aside,
}: {
  kicker: string;
  title: string;
  description: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-border pb-6">
      <div>
        <p className="section-kicker flex items-center gap-1.5">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          {kicker}
        </p>
        <h1 className="mt-2 text-2xl font-black text-primary sm:text-3xl lg:text-4xl tracking-tight">
          {title}
        </h1>
        <p className="mt-2.5 max-w-3xl text-xs sm:text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

export function Metric({
  label,
  value,
  detail,
  tone = 'primary',
  trend,
}: {
  label: string;
  value: string;
  detail: string;
  tone?: 'primary' | Risk;
  trend?: string;
}) {
  return (
    <div className="relative border-r border-border p-4 sm:p-5 last:border-r-0 hover:bg-muted/30 transition-colors">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        {trend && (
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-extrabold text-primary">
            {trend}
          </span>
        )}
      </div>
      <p
        className={cn(
          'mt-2 text-2xl sm:text-3xl font-black tracking-tight',
          tone === 'critical'
            ? 'text-critical'
            : tone === 'watch'
            ? 'text-warning-foreground'
            : tone === 'safe'
            ? 'text-safe'
            : 'text-primary'
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground font-medium">{detail}</p>
    </div>
  );
}

export function Metrics({
  items,
}: {
  items: { label: string; value: string; detail: string; tone?: 'primary' | Risk; trend?: string }[];
}) {
  return (
    <div className="mb-7 grid grid-cols-2 border border-border bg-card shadow-xs rounded-lg overflow-hidden lg:grid-cols-4">
      {items.map((item) => (
        <Metric key={item.label} {...item} />
      ))}
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card/60 px-5 py-3.5 backdrop-blur-xs">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2 className="mt-0.5 text-sm sm:text-base font-bold text-foreground">{title}</h2>
      </div>
      {aside && <div className="text-xs">{aside}</div>}
    </div>
  );
}

export function Status({
  status,
  children,
}: {
  status: Risk;
  children?: React.ReactNode;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold', `status-${status}`)}>
      <span className="size-1.5 rounded-full bg-current" />
      {children ?? status.toUpperCase()}
    </span>
  );
}

/* 
 * High-Tech Interactive GIS Map Component
 * Visualizes 8 NER states, district risk markers, national highways, and real-time pass conditions
 */
export function MapView({
  compact = false,
  highlightCorridor,
  onSelectDistrict,
}: {
  compact?: boolean;
  highlightCorridor?: string;
  onSelectDistrict?: (d: DistrictData) => void;
}) {
  const [activeDistrict, setActiveDistrict] = useState<DistrictData>(districts[0]!);
  const [layer, setLayer] = useState<'all' | 'critical' | 'corridors'>('all');
  const [showHighways, setShowHighways] = useState(true);

  const displayedDistricts =
    layer === 'critical'
      ? districts.filter((d) => d.status === 'critical' || d.status === 'watch')
      : districts;

  const handleSelect = (d: DistrictData) => {
    setActiveDistrict(d);
    if (onSelectDistrict) onSelectDistrict(d);
  };

  return (
    <div className="relative h-full min-h-[360px] w-full rounded-md bg-slate-900/5 dark:bg-slate-950/40 p-2 sm:p-4 select-none">
      {/* Top Map Layer Controls */}
      {!compact && (
        <div className="absolute right-4 top-4 z-20 flex flex-wrap items-center gap-1.5 rounded-md border border-border bg-card/90 p-1 shadow-sm backdrop-blur-md text-xs">
          <Button
            size="sm"
            variant={layer === 'all' ? 'default' : 'ghost'}
            className="h-7 px-2.5 text-[11px] font-bold"
            onClick={() => setLayer('all')}
          >
            All 16 Districts
          </Button>
          <Button
            size="sm"
            variant={layer === 'critical' ? 'default' : 'ghost'}
            className="h-7 px-2.5 text-[11px] font-bold text-critical"
            onClick={() => setLayer('critical')}
          >
            Hazard Watch
          </Button>
          <Button
            size="sm"
            variant={showHighways ? 'secondary' : 'ghost'}
            className="h-7 px-2 text-[11px]"
            onClick={() => setShowHighways(!showHighways)}
            title="Toggle Highway Overlay"
          >
            {showHighways ? <Eye className="size-3.5 mr-1" /> : <EyeOff className="size-3.5 mr-1" />}
            Highways
          </Button>
        </div>
      )}

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 880 540"
        className="h-full w-full"
        role="img"
        aria-label="Interactive GIS Map of India's North Eastern Region"
      >
        <defs>
          {/* Subtle terrain topography patterns */}
          <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(11, 61, 107, 0.05)" strokeWidth="0.8" />
          </pattern>
          <linearGradient id="corridor-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        {/* Stylized State Polygons with Terrain Fill */}
        <g fill="oklch(0.94 0.02 235)" stroke="oklch(0.78 0.04 240)" strokeWidth="1.8" className="transition-all">
          {/* Arunachal Pradesh (Himalayan frontier) */}
          <path
            d="M 320 85 L 420 30 L 590 15 L 720 50 L 780 110 L 710 150 L 610 135 L 530 170 L 410 160 L 350 145 Z"
            className="hover:fill-sky-100/60 transition-colors"
          />
          {/* Assam (Brahmaputra Valley) */}
          <path
            d="M 330 165 L 450 145 L 580 140 L 700 170 L 650 225 L 530 240 L 420 220 L 330 240 L 270 215 Z"
            className="hover:fill-sky-100/60 transition-colors"
          />
          {/* Sikkim */}
          <path
            d="M 160 185 L 215 155 L 250 190 L 235 255 L 185 270 L 150 230 Z"
            className="hover:fill-sky-100/60 transition-colors"
          />
          {/* Meghalaya */}
          <path
            d="M 290 245 L 415 230 L 490 250 L 440 300 L 330 305 L 270 275 Z"
            className="hover:fill-sky-100/60 transition-colors"
          />
          {/* Nagaland */}
          <path
            d="M 610 230 L 685 205 L 740 245 L 715 310 L 650 325 L 610 285 Z"
            className="hover:fill-sky-100/60 transition-colors"
          />
          {/* Manipur */}
          <path
            d="M 550 290 L 625 310 L 650 385 L 590 420 L 540 365 Z"
            className="hover:fill-sky-100/60 transition-colors"
          />
          {/* Mizoram */}
          <path
            d="M 430 320 L 495 310 L 520 380 L 480 460 L 420 420 Z"
            className="hover:fill-sky-100/60 transition-colors"
          />
          {/* Tripura */}
          <path
            d="M 300 330 L 375 315 L 395 385 L 355 435 L 295 390 Z"
            className="hover:fill-sky-100/60 transition-colors"
          />
        </g>

        {/* State Label Callouts */}
        {!compact && (
          <g fill="#0b3d6b" opacity="0.65" fontSize="10.5" fontWeight="800" textAnchor="middle" letterSpacing="0.05em">
            <text x="560" y="80">ARUNACHAL PRADESH</text>
            <text x="490" y="195">ASSAM (VALLEY)</text>
            <text x="195" y="215">SIKKIM</text>
            <text x="375" y="275">MEGHALAYA</text>
            <text x="675" y="265">NAGALAND</text>
            <text x="595" y="355">MANIPUR</text>
            <text x="475" y="395">MIZORAM</text>
            <text x="345" y="375">TRIPURA</text>
          </g>
        )}

        {/* Highway Arteries Overlay */}
        {showHighways && (
          <g strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" opacity="0.85">
            {/* NH-27 Guwahati to Silchar (Critical) */}
            <path
              d="M 360 210 Q 420 240 445 285 T 450 340"
              fill="none"
              stroke="#dc2626"
              strokeWidth={highlightCorridor === 'NH-27' ? '5' : '3.5'}
              className="animate-pulse"
            />
            {/* NH-06 Shillong to Silchar (Watch) */}
            <path
              d="M 360 270 L 445 340"
              fill="none"
              stroke="#d97706"
              strokeWidth={highlightCorridor === 'NH-06' ? '5' : '3'}
            />
            {/* NH-10 Siliguri/Gangtok to Mangan */}
            <path
              d="M 180 260 L 205 220 L 210 190"
              fill="none"
              stroke="#d97706"
              strokeWidth={highlightCorridor === 'NH-10' ? '5' : '3'}
            />
            {/* NH-02 Dimapur to Kohima to Imphal */}
            <path
              d="M 610 240 L 635 280 L 600 350"
              fill="none"
              stroke="#16a34a"
              strokeWidth={highlightCorridor === 'NH-02' ? '5' : '3'}
            />
            {/* Highway Badges */}
            <g fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">
              <rect x="425" y="260" width="34" height="13" rx="3" fill="#dc2626" />
              <text x="442" y="270">NH-27</text>
              <rect x="380" y="300" width="34" height="13" rx="3" fill="#d97706" />
              <text x="397" y="310">NH-06</text>
              <rect x="620" y="300" width="34" height="13" rx="3" fill="#16a34a" />
              <text x="637" y="310">NH-02</text>
            </g>
          </g>
        )}

        {/* District Risk Markers */}
        {displayedDistricts.map((d) => {
          const cx = (d.x * 8.8);
          const cy = (d.y * 5.4);
          const isSelected = activeDistrict.id === d.id;
          const isCritical = d.status === 'critical';
          const isWatch = d.status === 'watch';

          return (
            <g
              key={d.id}
              transform={`translate(${cx}, ${cy})`}
              className="cursor-pointer transition-transform group"
              onClick={() => handleSelect(d)}
            >
              {/* Pulsing Radar Ring for Critical and Watch */}
              {(isCritical || isWatch) && (
                <circle
                  r={isCritical ? 18 : 13}
                  fill={isCritical ? '#dc2626' : '#d97706'}
                  opacity={isCritical ? '0.25' : '0.18'}
                  className={isCritical ? 'pulse-dot' : ''}
                />
              )}

              {/* Pin Base Circle */}
              <circle
                r={isSelected ? 8 : 6}
                fill={isCritical ? '#dc2626' : isWatch ? '#d97706' : '#16a34a'}
                stroke="#ffffff"
                strokeWidth={isSelected ? 3 : 2}
                className="filter drop-shadow-sm group-hover:scale-125 transition-transform"
              />

              {/* District Name Label */}
              <text
                x="0"
                y={isSelected ? -12 : -9}
                fontSize={isSelected ? '10' : '8.5'}
                fontWeight={isSelected ? '800' : '600'}
                fill="#0f172a"
                textAnchor="middle"
                className="pointer-events-none select-none drop-shadow-xs"
              >
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Detailed District Quick-Intel Card */}
      {!compact && activeDistrict && (
        <div className="absolute left-4 bottom-4 z-20 w-[300px] sm:w-[340px] rounded-lg border border-border bg-card/95 p-4 shadow-lg backdrop-blur-md animate-fade-in">
          <div className="flex items-start justify-between gap-2 border-b border-border pb-2.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {activeDistrict.state} · District Telemetry
              </span>
              <h3 className="text-base font-black text-foreground">{activeDistrict.name}</h3>
            </div>
            <Status status={activeDistrict.status}>
              Risk {activeDistrict.score}/100
            </Status>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded bg-muted/50 p-2">
              <span className="block text-[10px] text-muted-foreground">Accessibility</span>
              <strong className="text-sm font-bold text-foreground">{activeDistrict.access}%</strong>
            </div>
            <div className="rounded bg-muted/50 p-2">
              <span className="block text-[10px] text-muted-foreground">24h Rain</span>
              <strong className="text-sm font-bold text-amber-700">{activeDistrict.rainfall24h} mm</strong>
            </div>
            <div className="rounded bg-muted/50 p-2">
              <span className="block text-[10px] text-muted-foreground">Pass Status</span>
              <strong className={cn(
                'text-xs font-bold',
                activeDistrict.passStatus === 'Restricted' ? 'text-amber-700' : 
                activeDistrict.passStatus === 'Blocked' ? 'text-critical' : 'text-safe'
              )}>
                {activeDistrict.passStatus}
              </strong>
            </div>
          </div>

          <div className="mt-3 space-y-1.5 text-[11px] text-muted-foreground">
            <p className="flex items-center justify-between">
              <span>Depot Buffer:</span>
              <strong className="text-foreground">{activeDistrict.depotStatus}</strong>
            </p>
            <p className="flex items-center justify-between">
              <span>Nearest NDRF:</span>
              <strong className="text-foreground">{activeDistrict.nearestNdrf}</strong>
            </p>
            <p className="flex items-center justify-between">
              <span>Elevation:</span>
              <strong className="text-foreground">{activeDistrict.elevation}</strong>
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between">
            <span className="text-[10px] font-bold text-primary flex items-center gap-1">
              <Activity className="size-3" /> {activeDistrict.activeIncidents} Active Signal(s)
            </span>
            <Button asChild size="sm" variant="ghost" className="h-6 text-[11px] p-0 text-primary hover:underline">
              <Link to="/corridors">Inspect Corridor →</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute right-4 bottom-4 z-10 flex items-center gap-3 rounded bg-card/85 px-3 py-1.5 text-[10px] font-bold text-muted-foreground border border-border/80 backdrop-blur-xs shadow-xs">
        <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-safe inline-block" /> Safe (&lt;50)</span>
        <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-amber-500 inline-block" /> Watch (50-74)</span>
        <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-critical inline-block" /> Critical (75+)</span>
      </div>
    </div>
  );
}

/*
 * Recent Alerts / Operations Incident Feed
 */
export function Alerts({ limit = 4 }: { limit?: number }) {
  const [selectedFilter, setSelectedFilter] = useState<'All' | Risk>('All');
  const [acknowledged, setAcknowledged] = useState<string[]>([]);

  const filtered = alerts.filter(
    (a) => selectedFilter === 'All' || a.status === selectedFilter
  ).slice(0, limit);

  return (
    <article className="panel overflow-hidden flex flex-col">
      <SectionHead
        kicker="Real-time incident stream"
        title="Live Operations Feed"
        aside={
          <div className="flex items-center gap-1">
            <span className="pulse-dot size-2 rounded-full bg-critical mr-1.5" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="text-[11px] font-bold bg-muted border border-border rounded px-2 py-1 outline-none"
            >
              <option value="All">All Severities</option>
              <option value="critical">Critical (Red)</option>
              <option value="watch">Watch (Amber)</option>
              <option value="safe">Clearance (Green)</option>
            </select>
          </div>
        }
      />

      <div className="divide-y divide-border flex-1 overflow-y-auto max-h-[460px]">
        {filtered.map((a) => {
          const isAck = acknowledged.includes(a.id);
          return (
            <div key={a.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'grid size-7 place-items-center rounded-md font-bold text-xs',
                      a.status === 'critical'
                        ? 'bg-critical/15 text-critical'
                        : a.status === 'watch'
                        ? 'bg-amber-500/15 text-amber-700'
                        : 'bg-safe/15 text-safe'
                    )}
                  >
                    <AlertTriangle className="size-3.5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-foreground leading-snug">{a.title}</h4>
                    <p className="text-[11px] text-muted-foreground font-medium">{a.place}</p>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock3 className="size-3" /> {a.time}
                </span>
              </div>

              <p className="mt-2 text-xs text-muted-foreground/90 pl-9 leading-relaxed">
                {a.description}
              </p>

              <div className="mt-3 pl-9 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded bg-muted px-2 py-0.5 text-[9px] font-bold text-muted-foreground">
                  Agency: {a.sourceAgency}
                </span>
                <Button
                  size="sm"
                  variant={isAck ? 'secondary' : 'outline'}
                  className="h-6 text-[10px] font-bold px-2.5"
                  onClick={() =>
                    setAcknowledged((prev) =>
                      isAck ? prev.filter((id) => id !== a.id) : [...prev, a.id]
                    )
                  }
                >
                  {isAck ? <CheckCircle2 className="size-3 mr-1 text-safe" /> : null}
                  {isAck ? 'Acknowledged' : 'Acknowledge'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border bg-muted/40 p-3">
        <Button asChild variant="secondary" size="sm" className="w-full text-xs font-bold">
          <Link to="/corridors">
            Explore Strategic Corridors & Bypass Routes <ArrowUpRight className="size-3.5 ml-1" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

/*
 * Risk Chart (7-day trend with Rainfall Area overlay)
 */
export function RiskChart({
  series,
  id = 'risk',
}: {
  series: number[];
  id?: string;
}) {
  const data = weekly.map((day, i) => ({
    day,
    risk: series[i] ?? 0,
    rainfall: Math.max(15, (series[i] ?? 0) - 8 + (i % 3) * 12),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b3d6b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0b3d6b" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id={`${id}-rain`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 600 }}
        />
        <YAxis
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            borderColor: 'var(--border)',
            borderRadius: '6px',
            fontSize: '11px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
        <Area
          dataKey="risk"
          type="monotone"
          name="Landslide Risk Index"
          stroke="#0b3d6b"
          strokeWidth={3}
          fill={`url(#${id})`}
        />
        <Area
          dataKey="rainfall"
          type="monotone"
          name="Rainfall Factor (mm)"
          stroke="#d97706"
          strokeWidth={2}
          strokeDasharray="4 4"
          fill={`url(#${id}-rain)`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/*
 * District Accessibility Bar Chart
 */
export function AccessChart() {
  const chartData = districts.slice(0, 8).map((d) => ({
    district: d.name.length > 13 ? d.name.slice(0, 11) + '…' : d.name,
    score: d.access,
    status: d.status,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
        <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
        <YAxis
          dataKey="district"
          type="category"
          axisLine={false}
          tickLine={false}
          width={92}
          tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--foreground)' }}
        />
        <Tooltip
          formatter={(value: any) => [`${value}% Accessible`, 'Score']}
          contentStyle={{
            backgroundColor: '#ffffff',
            borderColor: 'var(--border)',
            borderRadius: '6px',
            fontSize: '11px',
          }}
        />
        <Bar
          dataKey="score"
          name="Accessibility"
          radius={[0, 4, 4, 0]}
          barSize={16}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.score >= 75
                  ? '#16a34a'
                  : entry.score >= 50
                  ? '#0b3d6b'
                  : '#dc2626'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/*
 * Shipment Continuity Donut Chart
 */
export function ShipmentChart() {
  const items = [
    { name: 'On-time Delivery', value: 72, color: '#16a34a' },
    { name: 'Weather Delayed', value: 21, color: '#d97706' },
    { name: 'Blocked / Staged', value: 7, color: '#dc2626' },
  ];

  return (
    <div className="p-4">
      <div className="relative h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              innerRadius={55}
              outerRadius={78}
              paddingAngle={4}
              stroke="none"
            >
              {items.map((i) => (
                <Cell key={i.name} fill={i.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => [`${value}%`, 'Shipment Share']}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: 'var(--border)',
                borderRadius: '6px',
                fontSize: '11px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <b className="block text-3xl font-black text-primary">1,284</b>
            <small className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Total Convoys
            </small>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center text-xs">
        {items.map((i) => (
          <div key={i.name}>
            <b className="block text-sm font-bold" style={{ color: i.color }}>
              {i.value}%
            </b>
            <span className="text-[10px] text-muted-foreground font-medium">{i.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
 * Comprehensive Fleet Telemetry Table
 */
export function FleetTable({
  rows = vehicles,
}: {
  rows?: VehicleTelemetry[];
}) {
  const [reroutedIds, setReroutedIds] = useState<string[]>([]);

  const handleReroute = (id: string) => {
    setReroutedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[840px] text-left">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <th className="px-5 py-3">Convoy / Vehicle</th>
            <th className="px-5 py-3">Route Segment</th>
            <th className="px-5 py-3">Cargo Specification</th>
            <th className="px-5 py-3">Driver & Speed</th>
            <th className="px-5 py-3">Telemetry Progress</th>
            <th className="px-5 py-3">Operational Status</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-xs">
          {rows.map((v) => {
            const isRerouted = reroutedIds.includes(v.id) || v.status === 'Rerouted';
            return (
              <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5 font-bold text-primary">
                  <div className="flex items-center gap-2">
                    <div className="grid size-7 place-items-center rounded bg-primary/10 text-primary">
                      <Truck className="size-3.5" />
                    </div>
                    <div>
                      <span>{v.id}</span>
                      <span className="block text-[9px] font-medium text-muted-foreground">
                        {v.satelliteFix}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 font-semibold text-foreground">
                  {v.route}
                  <span className="block text-[10px] text-muted-foreground font-normal">
                    Dest: {v.destinationDepot}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="font-bold text-foreground">{v.cargo}</span>
                  <span className="block text-[10px] text-muted-foreground">{v.cargoDetail}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="font-medium text-foreground">{v.driverName}</span>
                  <span className="block text-[10px] text-muted-foreground">{v.currentSpeed} · ETA {v.eta}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${v.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold">{v.progress}%</span>
                  </div>
                  {v.delay > 0 && (
                    <span className="text-[10px] font-bold text-amber-700">+{v.delay}m delay</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <Status status={isRerouted ? 'watch' : v.risk}>
                    {isRerouted ? 'Rerouted (Bypass)' : v.status}
                  </Status>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Button
                    size="sm"
                    variant={isRerouted ? 'secondary' : 'outline'}
                    className="h-7 text-[10px] font-bold px-2.5"
                    onClick={() => handleReroute(v.id)}
                  >
                    {isRerouted ? 'Active Bypass' : 'Reroute'}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p className="p-8 text-center text-sm text-muted-foreground">
          No vehicles match the active telemetry filter.
        </p>
      )}
    </div>
  );
}

/*
 * Bypass Route Advisory Card
 */
export function Bypass({ name, extra }: { name: string; extra: string }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-safe/30 bg-safe/5 p-3.5 text-xs text-foreground">
      <Navigation className="size-4 shrink-0 text-safe mt-0.5" />
      <div>
        <p className="font-bold text-safe">Suggested Bypass: {name}</p>
        <p className="mt-1 text-muted-foreground">
          Estimated additional travel time: <strong className="text-foreground">{extra}</strong>. Terrain slope stabilized for multi-axle trucks.
        </p>
      </div>
    </div>
  );
}

/*
 * Source Citation Chip
 */
export function Source({ children }: { children: React.ReactNode }) {
  return (
    <span className="source-chip">
      <MapPin className="size-3 text-primary" />
      {children}
    </span>
  );
}
