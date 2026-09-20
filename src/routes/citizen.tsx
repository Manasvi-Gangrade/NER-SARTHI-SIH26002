import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  AlertTriangle, Camera, Check, MapPin, Radio, WifiOff, 
  Navigation, Phone, Languages, Smartphone, ShieldCheck, 
  Wifi, HelpCircle, FileCheck, ArrowRight, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading, SectionHead, Status, MapView } from '@/components/ner-ui';
import { metadata } from '@/lib/ner-data';

export const Route = createFileRoute('/citizen')({
  head: () => metadata(
    'Citizen & Driver Portal',
    'Offline-first road accessibility guidance, localized emergency SOS, crowdsourced hazard reporting, and regional language support for North East travelers.'
  ),
  component: Citizen,
});

const languages = [
  'English',
  'অসমীয়া (Assamese)',
  'बरʼ (Bodo)',
  'ꯃꯤꯇꯩꯂꯣꯟ (Meitei)',
  'বাংলা (Bengali)',
  'Ka Ktien Khasi (Khasi)',
  'Mizo Ṭawng (Mizo)',
  'Nagamese (Creole)',
  'हिन्दी (Hindi)',
];

function Citizen() {
  const [mode, setMode] = useState<'Citizen' | 'Driver'>('Citizen');
  const [language, setLanguage] = useState('English');
  const [isOffline, setIsOffline] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Form Fields
  const [location, setLocation] = useState('NH-27, Milepost 148 near Jatinga');
  const [category, setCategory] = useState('Landslide & Rockfall');
  const [severity, setSeverity] = useState('Critical Blockage');
  const [details, setDetails] = useState('');
  const [photoName, setPhotoName] = useState('IMG_Jatinga_Slump.jpg');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-[1540px] px-4 py-8 lg:px-8 space-y-8">
      <PageHeading
        kicker="Last-Mile Accessibility · Offline Resilient"
        title="Citizen & Driver Safety Portal"
        description="Providing high-mountain commuters and commercial freight pilots with turn-by-turn road alerts, verified bypass guidance, offline crowdsourced blockage reporting, and 1-click emergency SOS dispatch."
        aside={
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-border bg-card p-1 shadow-2xs">
              <Button
                size="sm"
                variant={mode === 'Citizen' ? 'default' : 'ghost'}
                className="h-8 text-xs font-bold"
                onClick={() => setMode('Citizen')}
              >
                Citizen Mode
              </Button>
              <Button
                size="sm"
                variant={mode === 'Driver' ? 'default' : 'ghost'}
                className="h-8 text-xs font-bold"
                onClick={() => setMode('Driver')}
              >
                Truck Driver Mode
              </Button>
            </div>
          </div>
        }
      />

      {/* Connectivity Simulator Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <span
            className={`grid size-9 place-items-center rounded-lg text-sm font-bold ${
              isOffline ? 'bg-amber-500/15 text-amber-700' : 'bg-safe/15 text-safe'
            }`}
          >
            {isOffline ? <WifiOff className="size-5" /> : <Wifi className="size-5" />}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <strong className="text-sm font-bold text-foreground">
                {isOffline ? 'Offline Valley Mode Active' : 'Connected to Highway Mesh (4G / NavIC)'}
              </strong>
              <Status status={isOffline ? 'watch' : 'safe'}>
                {isOffline ? 'Local Cache' : 'Cloud Sync'}
              </Status>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isOffline
                ? 'Incident reports and photos are queued securely in local encrypted SQLite. Automatic sync scheduled on signal recovery.'
                : 'Live telemetry updates every 15 seconds from PWD and BRO field control rooms.'}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="text-xs font-bold border-border"
          onClick={() => setIsOffline(!isOffline)}
        >
          {isOffline ? <Wifi className="size-3.5 mr-1 text-safe" /> : <WifiOff className="size-3.5 mr-1 text-amber-600" />}
          {isOffline ? 'Simulate Reconnect' : 'Simulate Zero-Signal'}
        </Button>
      </div>

      {/* Main Grid: Left Safety Map & Hazard Report, Right SOS & Language */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,400px)]">
        {/* Left Side: Map & Crowdsource Form */}
        <div className="space-y-6">
          {/* Safety Navigation Map */}
          <article className="panel overflow-hidden">
            <SectionHead
              kicker={`${mode} Route Navigator`}
              title="Regional Road Pass Status"
              aside={<MapPin className="size-4 text-primary" />}
            />
            <div className="h-[380px] p-2 sm:p-4">
              <MapView compact />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card p-4 text-xs">
              <div className="flex flex-wrap gap-2">
                <Status status="safe">3 Verified Clear Corridors</Status>
                <Status status="watch">2 Weather Advisories</Status>
                <Status status="critical">1 Active Slump (NH-27)</Status>
              </div>
              <span className="text-[11px] text-muted-foreground font-semibold">
                Updated 4 min ago by Assam PWD
              </span>
            </div>
          </article>

          {/* Crowdsourced Hazard Reporter Form */}
          <article className="panel overflow-hidden">
            <SectionHead
              kicker="Citizen Crowdsourced Telemetry"
              title="Report a Road Obstruction or Hazard"
              aside={<Camera className="size-4 text-primary" />}
            />

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-bold text-foreground block mb-1">
                    Location / Milepost
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. NH-27 near Harangajao"
                    className="w-full rounded-md border border-input bg-background p-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">
                    Hazard Classification
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-md border border-input bg-background p-2.5 text-xs font-medium"
                  >
                    <option>Landslide & Rockfall</option>
                    <option>Flash Flood / Water Inundation</option>
                    <option>Road Surface Subsidence (Slump)</option>
                    <option>Uprooted Tree / Fallen Wire</option>
                    <option>Multi-Truck Breakdown Blockage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">
                  Obstruction Severity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Passable with Caution', 'Single-Lane Only', 'Completely Blocked'] as const).map((sev) => (
                    <Button
                      key={sev}
                      type="button"
                      size="sm"
                      variant={severity === sev ? 'default' : 'outline'}
                      className="text-xs font-semibold h-8"
                      onClick={() => setSeverity(sev)}
                    >
                      {sev}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">
                  Eyewitness Observation
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe slope condition, whether heavy vehicles can pass, or if local bulldozers are already present..."
                  className="w-full rounded-md border border-input bg-background p-2.5 text-xs outline-none focus:ring-2 focus:ring-ring font-normal"
                />
              </div>

              {/* Photo Upload Attachment Simulation */}
              <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded bg-primary/10 text-primary">
                    <Camera className="size-5" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Georeferenced Photo Attached</span>
                    <span className="text-[10px] text-muted-foreground">
                      GPS Tag: 25.1842° N, 93.0315° E (EXIF Authenticated)
                    </span>
                  </div>
                </div>
                <span className="rounded bg-safe/10 text-safe font-bold text-[10px] px-2 py-0.5">
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-[11px] text-muted-foreground">
                  {isOffline ? 'Will be stored locally until network restored.' : 'Broadcasts to District War Room in real time.'}
                </span>
                <Button type="submit" size="sm" className="font-bold text-xs h-9 px-4">
                  <Radio className="size-3.5 mr-1.5" />
                  {isOffline ? 'Queue Offline Report' : 'Transmit Field Report'}
                </Button>
              </div>

              {reportSubmitted && (
                <div className="rounded-lg border border-safe/30 bg-safe/10 p-3.5 text-safe text-xs flex items-center gap-2 animate-fade-in">
                  <Check className="size-4 shrink-0 font-bold" />
                  <span>
                    <strong>Report #{Math.floor(1000 + Math.random() * 9000)} Successfully Logged!</strong>{' '}
                    {isOffline ? 'Queued in local encrypted device memory.' : 'Transmitted to Assam PWD Ground Station.'}
                  </span>
                </div>
              )}
            </form>
          </article>
        </div>

        {/* Right Side: Emergency SOS, Language & Route Brief */}
        <div className="space-y-6">
          {/* Emergency SOS Panic Desk */}
          <article className="panel p-6 bg-red-500/5 border-red-500/20 text-center space-y-4">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-red-600 text-white shadow-md">
              <Phone className="size-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-red-700">Immediate Disaster SOS</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Stranded due to sudden mudflow or flash flood? Trigger this beacon to transmit your exact coordinate to NDRF 1st Battalion and Assam Police.
              </p>
            </div>

            <Button
              className="h-11 w-full bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-xs"
              onClick={() => {
                setSosTriggered(true);
                setTimeout(() => setSosTriggered(false), 3000);
              }}
            >
              {sosTriggered ? 'SOS Beacon Transmitted!' : 'TRANSMIT RESCUE BEACON'}
            </Button>

            {sosTriggered && (
              <p className="rounded-md border border-red-300 bg-red-100 p-2.5 text-xs font-bold text-red-800 animate-fade-in">
                Emergency Beacon sent to Silchar Disaster Base! Nearest post alerted (14 km away).
              </p>
            )}

            <div className="pt-2 border-t border-red-200/60 text-[11px] text-muted-foreground">
              Official Toll-Free National Emergency Line: <strong className="text-foreground">112</strong>
            </div>
          </article>

          {/* Regional Language Selection (Bhashini AI) */}
          <article className="panel p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Languages className="size-4" />
              <span>Voice & Regional Dialect (Bhashini Core)</span>
            </div>

            <p className="text-xs text-muted-foreground">
              Select your preferred regional language for audio turn-by-turn road alerts:
            </p>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-md border border-input bg-background p-2.5 text-xs font-semibold"
            >
              {languages.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>

            <span className="block text-[11px] text-safe font-semibold">
              ✓ Active audio dialect: {language}
            </span>
          </article>

          {/* Safe Travel Snapshot */}
          <article className="panel p-5 space-y-3">
            <span className="section-kicker">Travel Route Brief</span>
            <h4 className="text-sm font-bold text-foreground">
              {mode === 'Citizen' ? 'Recommended Civilian Path' : 'Commercial Freight Clearance'}
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 rounded-md border border-safe/30 bg-safe/5 p-2.5">
                <Navigation className="size-4 text-safe shrink-0 mt-0.5" />
                <div>
                  <strong className="text-safe block">Umrangso Diversion: Active</strong>
                  <span className="text-muted-foreground text-[11px]">
                    Single-lane bridge monitored by Assam Police. Average delay: +42 min.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5">
                <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-800 block">NH-27 Jatinga: Exercise Caution</strong>
                  <span className="text-muted-foreground text-[11px]">
                    Heavy vehicle restrictions between 18:00 and 06:00 IST.
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
