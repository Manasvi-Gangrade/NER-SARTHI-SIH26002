import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  Truck, PackageCheck, Clock3, Navigation, Satellite, 
  ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, 
  Fuel, HeartPulse, Wheat, LifeBuoy, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  PageHeading, Metrics, SectionHead, Status, FleetTable, ShipmentChart 
} from '@/components/ner-ui';
import { metadata, vehicles, type VehicleTelemetry } from '@/lib/ner-data';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
} from 'recharts';

export const Route = createFileRoute('/fleet')({
  head: () => metadata(
    'Fleet Telemetry & Supply Chain',
    'Real-time NavIC satellite telemetry for essential medical, petroleum, and food grain convoys navigating mountain corridors across the North East.'
  ),
  component: Fleet,
});

const cargoTypes = ['All', 'Medical', 'Food', 'Fuel', 'Relief'] as const;

function Fleet() {
  const [filter, setFilter] = useState<(typeof cargoTypes)[number]>('All');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleTelemetry | null>(null);

  const filteredVehicles =
    filter === 'All'
      ? vehicles
      : vehicles.filter((v) => v.cargo === filter);

  return (
    <div className="mx-auto max-w-[1540px] px-4 py-8 lg:px-8 space-y-8">
      <PageHeading
        kicker="Lifeline Logistics & Supply Continuity"
        title="Fleet Telemetry & Convoy Dispatch"
        description="End-to-end telemetry powered by ISRO's NavIC L5 indigenous satellite constellation. Tracking high-priority pharmaceutical, petroleum, and FCI foodgrain shipments through complex Himalayan terrain."
        aside={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-safe/30 bg-safe/10 px-3 py-1 text-xs font-bold text-safe">
              <Satellite className="size-3.5" /> NavIC L5 Constellation Locked
            </span>
          </div>
        }
      />

      {/* Top Fleet Metrics */}
      <Metrics
        items={[
          { label: 'Active Convoys', value: '1,284', detail: '7 priority sample units shown' },
          { label: 'On-Time Reliability', value: '72%', detail: 'Safe transit progression', tone: 'safe' },
          { label: 'Weather Delay', value: '21%', detail: 'Monsoon slope slowing', tone: 'watch' },
          { label: 'Restricted Staging', value: '7%', detail: 'Holding at mountain depots', tone: 'critical' },
        ]}
      />

      {/* Main Grid: Active Convoy Cards & Shipment Health */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Active Convoy Positioning Cards */}
        <article className="panel overflow-hidden flex flex-col">
          <SectionHead
            kicker="Real-Time Fleet Positioning"
            title="Priority Convoy Staging & Telemetry"
            aside={
              <span className="text-xs font-bold text-primary flex items-center gap-1">
                <Truck className="size-3.5" /> High-Priority Consignments
              </span>
            }
          />
          <div className="grid gap-4 p-5 sm:grid-cols-2 flex-1">
            {vehicles.slice(0, 4).map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className="cursor-pointer rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-sm text-primary flex items-center gap-1.5">
                      {v.cargo === 'Medical' && <HeartPulse className="size-3.5 text-red-500" />}
                      {v.cargo === 'Food' && <Wheat className="size-3.5 text-amber-500" />}
                      {v.cargo === 'Fuel' && <Fuel className="size-3.5 text-sky-500" />}
                      {v.cargo === 'Relief' && <LifeBuoy className="size-3.5 text-emerald-500" />}
                      {v.id}
                    </span>
                    <Status status={v.risk}>{v.status}</Status>
                  </div>

                  <p className="mt-2 text-sm font-bold text-foreground">{v.route}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{v.cargoDetail}</p>

                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-2">
                    <span>Pilot: <strong className="text-foreground">{v.driverName}</strong></span>
                    <span className="font-bold text-primary">ETA: {v.eta}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground mb-1">
                    <span>Telemetry Progress</span>
                    <span>{v.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${v.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Shipment Health Donut */}
        <article className="panel overflow-hidden flex flex-col justify-between">
          <SectionHead
            kicker="Supply Chain Reliability"
            title="Consignment Delivery Health"
            aside={<PackageCheck className="size-4 text-primary" />}
          />
          <div className="flex-1 flex flex-col justify-center">
            <ShipmentChart />
          </div>
          <div className="border-t border-border bg-muted/30 p-3 text-xs text-muted-foreground text-center">
            Priority corridors monitored: NH-27, NH-06, NH-10, AS-21, NH-02
          </div>
        </article>
      </div>

      {/* Secondary Grid: Delay Breakdown by Cause & Dispatch Watchlist */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Delay Attribution Bar Chart */}
        <article className="panel overflow-hidden">
          <SectionHead
            kicker="Root-Cause Diagnostics"
            title="Transit Delay Attribution (Minutes)"
            aside={<Clock3 className="size-4 text-amber-600" />}
          />
          <div className="p-5">
            <p className="text-xs text-muted-foreground mb-3">
              Average delay minutes contributed per 100km corridor segment by environmental factors:
            </p>
            <div className="h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Monsoon Rain', minutes: 85, fill: '#0b3d6b' },
                    { name: 'Landslide Debris', minutes: 55, fill: '#dc2626' },
                    { name: 'Mountain Bypass', minutes: 42, fill: '#d97706' },
                    { name: 'PWD Roadworks', minutes: 18, fill: '#16a34a' },
                  ]}
                  layout="vertical"
                  margin={{ left: 8, right: 16 }}
                >
                  <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--foreground)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any) => [`${val} Minutes Delay`, 'Average Impact']}
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '6px', fontSize: '11px' }}
                  />
                  <Bar dataKey="minutes" radius={[0, 4, 4, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </article>

        {/* Dispatch Watchlist */}
        <article className="panel overflow-hidden">
          <SectionHead
            kicker="Active Interventions"
            title="Delayed & Rerouted Consignment Watchlist"
            aside={<AlertTriangle className="size-4 text-critical" />}
          />
          <div className="divide-y divide-border text-xs">
            {vehicles.filter((v) => v.delay > 0).map((v) => (
              <div key={v.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`grid size-8 place-items-center rounded-lg text-xs font-bold ${
                    v.risk === 'critical' ? 'bg-critical/15 text-critical' : 'bg-amber-500/15 text-amber-700'
                  }`}>
                    <Truck className="size-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-foreground">{v.id}</strong>
                      <span className="rounded bg-muted px-1.5 py-0.2 text-[9px] font-bold text-muted-foreground">
                        {v.cargo}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{v.route} · Driver: {v.driverName}</p>
                  </div>
                </div>

                <div className="text-right">
                  <strong className="text-amber-700 block text-xs">+{v.delay} min delay</strong>
                  <span className="text-[10px] text-muted-foreground">ETA {v.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      {/* Main Vehicle Telemetry Table */}
      <article className="panel overflow-hidden">
        <SectionHead
          kicker="NavIC Live Registry"
          title="Consignment Telemetry Stream"
          aside={<span className="text-xs text-muted-foreground font-semibold">{filteredVehicles.length} Vehicles Displayed</span>}
        />

        {/* Cargo Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/20 px-5 py-3">
          <span className="text-xs font-bold text-muted-foreground mr-2 flex items-center gap-1">
            <Filter className="size-3.5" /> Filter Cargo:
          </span>
          {cargoTypes.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={filter === t ? 'default' : 'ghost'}
              className="h-7 px-3 text-xs font-bold"
              onClick={() => setFilter(t)}
            >
              {t}
            </Button>
          ))}
        </div>

        <FleetTable rows={filteredVehicles} />
      </article>
    </div>
  );
}
