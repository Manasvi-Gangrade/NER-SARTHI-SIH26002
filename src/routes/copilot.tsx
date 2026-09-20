import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, CloudRain, ShieldCheck, ArrowRight, 
  Gauge, Database, CheckCircle2, ChevronRight, Sliders, RefreshCw, 
  FileText, ExternalLink, Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading, SectionHead, Source, Status } from '@/components/ner-ui';
import { aiQueries, metadata } from '@/lib/ner-data';

export const Route = createFileRoute('/copilot')({
  head: () => metadata(
    'AI Decision Support Co-Pilot',
    'RAG-grounded logistics intelligence, physics-informed scenario stress simulation, and auditable telemetry citations for North Eastern logistics.'
  ),
  component: Copilot,
});

function Copilot() {
  const [input, setInput] = useState('');
  const [activeQuery, setActiveQuery] = useState(aiQueries[0]!);
  const [loading, setLoading] = useState(false);

  // Scenario Simulator State
  const [rainExtra, setRainExtra] = useState(20);
  const [nh27Blocked, setNh27Blocked] = useState(true);
  const [priorityCargo, setPriorityCargo] = useState<'Medical' | 'Fuel' | 'Food'>('Medical');

  const calculatedDelay = 42 + rainExtra * 1.5 + (nh27Blocked ? 35 : 0);
  const calculatedRisk = Math.min(100, Math.round(75 + rainExtra * 0.4 + (nh27Blocked ? 12 : 0)));

  const ask = (qText: string) => {
    if (!qText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const match = aiQueries.find(
        (x) => x.q.toLowerCase().includes(qText.toLowerCase()) || qText.toLowerCase().includes(x.q.toLowerCase())
      ) ?? {
        q: qText,
        answer: `For "${qText}": Telemetry indicates that mountain passes in Dima Hasao and East Khasi Hills remain vulnerable due to accumulated monsoon rainfall. Recommended bypass routes (Umrangso and Dawki) are active with single-lane police escort for emergency vehicles.`,
        confidence: 86,
        sources: ['Regional GIS Risk Grid · sample', 'District PWD Log #281', 'InSAR Soil Sensor DH-4'],
        action: 'Verify road clearance with the Haflong DEOC before dispatching multi-axle freight.',
        routeToInspect: 'NH-27',
      };
      setActiveQuery(match);
      setInput('');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-[1540px] px-4 py-8 lg:px-8 space-y-8">
      <PageHeading
        kicker="Grounded Decision Intelligence · Physics-Informed SLM"
        title="AI Logistics Decision Co-Pilot"
        description="Interact with NER-SARTHI's conversational strategic assistant. Built using Retrieval-Augmented Generation (RAG) grounded in real-time satellite radar, road pass registers, and hospital supply registries."
        aside={
          <span className="flex items-center gap-1.5 rounded-full border border-safe/30 bg-safe/10 px-3 py-1 text-xs font-bold text-safe">
            <Sparkles className="size-3.5" /> RAG Decision Core Synced
          </span>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.85fr)]">
        {/* Left: Chat / Question Console */}
        <div className="space-y-6">
          <article className="panel overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-border bg-primary px-5 py-4 text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-lg bg-white/10 text-white">
                  <Bot className="size-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold">Ask NER-SARTHI Decision Desk</h2>
                  <p className="text-[10px] text-primary-foreground/75">Physics-informed mountain transit intelligence</p>
                </div>
              </div>
              <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                Local SLM Demonstration
              </span>
            </div>

            {/* Conversation Window */}
            <div className="min-h-[380px] space-y-5 bg-muted/20 p-5 flex-1">
              {/* User Message */}
              <div className="ml-auto w-fit max-w-[85%] rounded-xl bg-primary p-3.5 text-xs sm:text-sm text-primary-foreground font-medium shadow-xs">
                {activeQuery.q}
              </div>

              {/* AI Briefing Response */}
              {loading ? (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 w-fit shadow-xs">
                  <span className="typing-dot" />
                  <span className="typing-dot delay-1" />
                  <span className="typing-dot delay-2" />
                  <span className="text-xs text-muted-foreground font-semibold ml-2">Grounding with InSAR & IMD Telemetry...</span>
                </div>
              ) : (
                <div className="max-w-[96%] rounded-xl border border-border bg-card p-5 shadow-xs space-y-4 animate-fade-in">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <Sparkles className="size-4 text-amber-500" />
                      Executive Situation Briefing
                    </span>
                    <span className="rounded-full bg-safe/10 px-2.5 py-0.5 text-[11px] font-bold text-safe flex items-center gap-1">
                      <Gauge className="size-3" />
                      {activeQuery.confidence}% Confidence
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                    {activeQuery.answer}
                  </p>

                  <div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/10 p-3.5 text-xs text-amber-900 dark:text-amber-200">
                    <strong className="block font-bold">Immediate Executive Action:</strong>
                    <span className="mt-1 block leading-relaxed">{activeQuery.action}</span>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                      Grounded Telemetry Citations:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeQuery.sources.map((src) => (
                        <Source key={src}>{src}</Source>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex gap-2 border-t border-border bg-card p-4"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a pass, district stock, landslide warning or convoy..."
                className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring font-medium"
              />
              <Button type="submit" size="sm" className="font-bold text-xs h-10 px-4">
                <Send className="size-3.5 mr-1.5" />
                Analyze
              </Button>
            </form>
          </article>

          {/* Preset Suggested Questions */}
          <div className="panel p-5">
            <span className="section-kicker">Curated Inquiries</span>
            <h3 className="text-sm font-bold text-foreground mb-3">Explore Grounded Scenarios</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {aiQueries.map((q) => (
                <Button
                  key={q.q}
                  variant={activeQuery.q === q.q ? 'secondary' : 'outline'}
                  size="sm"
                  className="h-auto min-h-11 justify-between py-2.5 px-3 text-left text-xs font-semibold whitespace-normal border-border"
                  onClick={() => ask(q.q)}
                >
                  <span className="line-clamp-2">{q.q}</span>
                  <ChevronRight className="size-3.5 shrink-0 ml-1 text-primary" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: What-If Scenario Stress Simulator */}
        <div className="space-y-6">
          <article className="panel overflow-hidden">
            <SectionHead
              kicker="Terrain Stress Tester"
              title="What-If Disruption Simulator"
              aside={<Sliders className="size-4 text-primary" />}
            />

            <div className="p-5 space-y-5">
              {/* Rain Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span>Additional Cloudburst Precipitation:</span>
                  <span className="text-primary font-black">+{rainExtra} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="10"
                  value={rainExtra}
                  onChange={(e) => setRainExtra(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <span className="text-[10px] text-muted-foreground block mt-1">
                  Simulates cumulative 6-hour rainfall excess over Dima Hasao ridge.
                </span>
              </div>

              {/* Road Condition Checkbox */}
              <div className="rounded-lg border border-border p-3 bg-muted/20">
                <label className="flex items-center gap-2.5 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nh27Blocked}
                    onChange={(e) => setNh27Blocked(e.target.checked)}
                    className="size-4 accent-primary rounded"
                  />
                  <span>Assume NH-27 KM 148 Slump Fully Impassable</span>
                </label>
              </div>

              {/* Cargo Priority Radio */}
              <div>
                <span className="text-xs font-bold text-foreground block mb-2">Cargo Priority Tier:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Medical', 'Fuel', 'Food'] as const).map((tier) => (
                    <Button
                      key={tier}
                      size="sm"
                      variant={priorityCargo === tier ? 'default' : 'outline'}
                      className="text-xs font-bold h-8"
                      onClick={() => setPriorityCargo(tier)}
                    >
                      {tier}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Dynamic Calculation Outcomes */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="rounded bg-card p-2.5 border border-border">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Modeled Risk</span>
                    <strong className="block text-xl font-black text-critical mt-0.5">{calculatedRisk}/100</strong>
                  </div>
                  <div className="rounded bg-card p-2.5 border border-border">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Transit Delay</span>
                    <strong className="block text-xl font-black text-amber-700 mt-0.5">+{calculatedDelay} min</strong>
                  </div>
                </div>

                <div className="text-xs text-foreground leading-relaxed">
                  <strong>Recommended Dispatch: </strong>
                  {nh27Blocked
                    ? `Divert ${priorityCargo} cargo via Umrangso → Lanka single-lane bypass immediately. Coordinate police clearance at checkposts.`
                    : `Maintain monitored single-lane flow with BRO escort; keep Umrangso bypass on active 15-minute standby.`}
                </div>
              </div>
            </div>
          </article>

          {/* Auditable Data Governance */}
          <article className="panel p-5 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Database className="size-4" />
              <span>Grounded Knowledge Base Registry</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Every Co-Pilot suggestion references verifiable physical datasets:
            </p>
            <ul className="space-y-1.5 text-muted-foreground text-[11px]">
              <li className="flex items-center gap-1.5">• Geological Survey of India InSAR Soil Displacement</li>
              <li className="flex items-center gap-1.5">• India Meteorological Department (IMD) 15-min Doppler Grid</li>
              <li className="flex items-center gap-1.5">• Border Roads Organisation (Project Swastik) Daily Log</li>
              <li className="flex items-center gap-1.5">• Food Corporation of India (FCI) Regional Granary Buffer</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}
