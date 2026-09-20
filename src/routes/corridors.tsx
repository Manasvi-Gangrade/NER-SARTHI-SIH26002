import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  Mountain, CloudRain, Route as RouteIcon, AlertTriangle, 
  Navigation, ShieldAlert, CheckCircle2, ArrowRight, Gauge, 
  Clock, MapPin, Activity, HardHat, FileSpreadsheet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  PageHeading, Metrics, SectionHead, Status, RiskChart, Bypass, MapView 
} from '@/components/ner-ui';
import { corridors, metadata, weekly, type Risk } from '@/lib/ner-data';

export const Route = createFileRoute('/corridors')({
  head: () => metadata(
    'Corridors & Disruption Intelligence',
    'Physics-informed terrain risk models, rainfall exposure, slope elevation profiles, and bypass routing for strategic North Eastern highways.'
  ),
  component: Corridors,
});

function Corridors() {
  const [selected, setSelected] = useState(corridors[0]!);
  const [simulatedRainExtra, setSimulatedRainExtra] = useState(0);

  const adjustedRain = selected.rainfall + simulatedRainExtra;
  const adjustedRisk = Math.min(100, Math.round(selected.risk + simulatedRainExtra * 0.25));

  return (
    <div className="mx-auto max-w-[1540px] px-4 py-8 lg:px-8 space-y-8">
      <PageHeading
        kicker="Predictive Terrain & Highway Intelligence"
        title="Strategic Corridors & Disruption Modeling"
        description="Comprehensive geological exposure analysis, real-time rainfall accumulation, mountain pass elevation profiles, and validated alternative bypass corridors across all 8 North Eastern states."
        aside={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold text-primary">
              <Activity className="size-3.5" /> 5 Strategic Arteries Active
            </span>
          </div>
        }
      />

      {/* Top Metrics Strip */}
      <Metrics
        items={[
          { label: 'Corridors Monitored', value: '05', detail: 'Primary lifeline highways' },
          { label: 'Critical Hazard Corridors', value: '02', detail: 'NH-27 & NH-06 under advisory', tone: 'critical' },
          { label: 'Peak 24h Rainfall', value: '124 mm', detail: 'Dima Hasao escarpment', tone: 'watch' },
          { label: 'Validated Bypasses', value: '04 Options', detail: 'Heavy vehicle approved', tone: 'safe' },
        ]}
      />

      {/* Main Grid: Left Corridor Selector, Right Detailed Intelligence */}
      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* Left Side: Highway Corridor Selection List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Strategic Highway
            </h2>
            <span className="text-[10px] text-muted-foreground">Gati Shakti ID</span>
          </div>

          <div className="space-y-2.5">
            {corridors.map((c) => {
              const isSelected = selected.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary'
                      : 'border-border bg-card hover:bg-muted/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-sm text-foreground">
                      {c.id}
                    </span>
                    <Status status={c.status}>
                      Risk {c.risk}/100
                    </Status>
                  </div>

                  <p className="mt-1 text-xs font-bold text-primary truncate">
                    {c.name}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-2">
                    <span>{c.focus}</span>
                    <span className="font-semibold text-foreground">{c.distanceKm} km</span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Elevation: {c.elevation}</span>
                    <span className="font-semibold text-amber-700">{c.rainfall} mm rain</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Disaster Machinery Staging Box */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <HardHat className="size-4" />
              <span>BRO Project Swastik & PWD Gear</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Heavy hydraulic excavators and rock-clearing bulldozers staged at Haflong, Jowai, Singtam, and Zubza for instantaneous mountain landslide response.
            </p>
          </div>
        </div>

        {/* Right Side: Selected Corridor Deep Analytics */}
        <div className="space-y-6">
          {/* Main Inspection Panel */}
          <article className="panel overflow-hidden">
            <SectionHead
              kicker={`${selected.id} · Priority Route Overview`}
              title={`${selected.name}`}
              aside={<Status status={selected.status}>{selected.status.toUpperCase()}</Status>}
            />

            {/* Key Telemetry Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border border-b border-border text-center bg-card">
              <div className="p-4">
                <Mountain className="mx-auto size-4 text-primary" />
                <strong className="mt-1.5 block text-xl font-black text-foreground">{selected.elevation}</strong>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Summit Elevation</span>
              </div>
              <div className="p-4">
                <CloudRain className="mx-auto size-4 text-amber-600" />
                <strong className="mt-1.5 block text-xl font-black text-amber-700">{adjustedRain} mm</strong>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">24h Precipitation</span>
              </div>
              <div className="p-4">
                <AlertTriangle className="mx-auto size-4 text-critical" />
                <strong className="mt-1.5 block text-xl font-black text-critical">{adjustedRisk}/100</strong>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Disruption Risk</span>
              </div>
              <div className="p-4">
                <Gauge className="mx-auto size-4 text-safe" />
                <strong className="mt-1.5 block text-xl font-black text-foreground">{selected.avgSpeed} km/h</strong>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Avg Mountain Speed</span>
              </div>
            </div>

            {/* Rainfall Stress Slider */}
            <div className="px-5 py-3 bg-muted/30 border-b border-border flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">What-If Rain Stress Test:</span>
                <span className="text-muted-foreground text-[11px]">Simulate sudden cloudburst impact</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={simulatedRainExtra}
                  onChange={(e) => setSimulatedRainExtra(Number(e.target.value))}
                  className="w-32 sm:w-44 accent-primary"
                />
                <span className="font-bold text-primary min-w-[55px]">+{simulatedRainExtra} mm</span>
                {simulatedRainExtra > 0 && (
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px]" onClick={() => setSimulatedRainExtra(0)}>
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Chart Area */}
            <div className="p-5">
              <p className="text-xs font-bold text-foreground mb-1">
                7-Day Geological Landslide Risk & Precipitation Correlation
              </p>
              <div className="h-[280px]">
                <RiskChart series={selected.series} id="corridors-risk-chart" />
              </div>
            </div>

            {/* Blockage Point & Bypass Recommendation */}
            <div className="p-5 bg-card border-t border-border space-y-3">
              {selected.blockagePoint && (
                <div className="flex items-center gap-2 rounded-md border border-critical/30 bg-critical/5 p-3 text-xs text-critical">
                  <AlertTriangle className="size-4 shrink-0" />
                  <span>
                    <strong>Identified Vulnerability Sector:</strong> {selected.blockagePoint}. High InSAR soil moisture saturation.
                  </span>
                </div>
              )}
              <Bypass name={selected.bypass} extra={selected.extra} />
            </div>
          </article>

          {/* Bottom Grid: Multi-Highway Disruption Matrix & Bypass Schedule */}
          <div className="grid gap-6 xl:grid-cols-2">
            {/* 7-Day Heatmap Table */}
            <article className="panel overflow-hidden">
              <SectionHead
                kicker="Geological Exposure Matrix"
                title="7-Day Risk & Rainfall Grid"
                aside={<span className="text-[10px] text-muted-foreground">Historical Telemetry</span>}
              />
              <div className="p-5 overflow-x-auto">
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr className="text-[10px] font-bold uppercase text-muted-foreground border-b border-border">
                      <th className="text-left pb-2">Corridor</th>
                      {weekly.map((d) => (
                        <th key={d} className="pb-2">{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {corridors.map((c) => (
                      <tr key={c.id}>
                        <td className="text-left py-2.5 font-black text-primary text-xs">
                          {c.id}
                        </td>
                        {c.series.map((val, i) => (
                          <td key={i} className="py-2.5 px-1">
                            <span
                              className={`inline-grid size-7 place-items-center rounded font-bold text-[10px] ${
                                val >= 75
                                  ? 'bg-critical/20 text-critical'
                                  : val >= 50
                                  ? 'bg-amber-500/20 text-amber-700'
                                  : 'bg-safe/20 text-safe'
                              }`}
                            >
                              {val}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-[10px] text-muted-foreground text-center">
                  Legend: Green &lt;50 Safe · Amber 50-74 Hazard Watch · Red 75+ Critical Disruption
                </p>
              </div>
            </article>

            {/* Bypass Routes Dispatch Planner */}
            <article className="panel overflow-hidden">
              <SectionHead
                kicker="Multi-Modal Diversion Network"
                title="Active Lifeline Bypass Schedule"
                aside={<RouteIcon className="size-4 text-primary" />}
              />
              <div className="divide-y divide-border text-xs">
                {corridors.map((c) => (
                  <div key={c.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <RouteIcon className="size-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-foreground block">{c.id} Diversion: {c.bypass}</strong>
                          <span className="text-muted-foreground text-[11px] block mt-0.5">
                            Priority Freight: {c.impact}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-amber-700 shrink-0">{c.extra}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
