# North East Navigator

Helloooo bhai I need your help to build a project, its a govt project and I want you to build it according to your understanding of theme but in light theme and also bhai I want you to integrate a lot of graphs, charts, maps and everything into it, baaki bhai take reference from this document and do not hit the credit limit please bhai I trust you, also take reference from this link : https://indra-integrated-national-decision.vercel.app/, bhai bas please pehle basic sab kuch build kar dena fir credit limit hit karna please bhai please

Build NER-SARTHI — an AI-based Smart Logistics & Accessibility Intelligence Platform for India's North Eastern Region, as a FRONTEND-ONLY, DESIGN-FOCUSED demo/prototype (no backend, no auth, no real APIs — use realistic static/mock data and local React state everywhere). Keep this to a single well-structured React app with a few routes so it stays light to build.

## Visual Direction
- Clean LIGHT theme, official Government of India command-center aesthetic (inspired by dashboards like a national decision-support command center, but light background instead of dark).
- Base palette: white/very light grey background, deep navy blue (#0B3D6B style) as primary, a muted saffron/amber accent for warnings, green for "safe/normal", red for "critical/blocked", subtle ashoka-chakra-blue accent line somewhere in the header (tasteful, not tacky).
- Clean sans-serif typography (Inter/Manrope), rounded cards, soft shadows, generous whitespace — feel premium/government-official, not flashy startup.
- Subtle animations: number count-ups on stat cards, smooth fade/slide-in on section load, pulsing dot markers on the map for "active alerts", small hover-lift on cards. Nothing heavy.

## Pages / Sections (single-page scroll + a couple of routes is fine)

1. **Landing / Hero**
   - NER-SARTHI name + tagline ("AI-Powered Logistics & Accessibility Intelligence for the North East"), MDoNER/SIH26002 badge.
   - Hero stat strip with animated counters: districts monitored, active routes, vehicles tracked, avg delay reduction %.
   - CTA buttons: "View Command Dashboard", "Explore Citizen App".

2. **Command Dashboard (main showcase page)**
   - Left/top: an SVG map-style visualization of the 8 NER states with district markers color-coded by risk (green/amber/red) — doesn't need to be a real GIS map, a stylized custom SVG map with hoverable district dots and tooltips (district name, risk score, status) is enough.
   - Live-feel side panel: scrolling list of recent alerts (landslide risk, road blocked, delayed shipment) with icons and timestamps, mock data.
   - Charts row using recharts: 
     - Line chart: risk score trend over last 7 days for a selected corridor
     - Bar chart: district-wise accessibility score
     - Donut chart: shipment status breakdown (on-time/delayed/blocked)
   - Vehicle tracking mini-panel: list of 4-5 mock vehicles with route, cargo type (medicine/food/fuel), ETA, status badge.
   - Role switcher tabs (Citizen / Driver / Field Officer / District Admin / State-Central Command / Emergency Response) — switching tab just re-filters/relabels the same dashboard data to show role-based framing, no separate backend needed.

3. **AI Co-Pilot Panel**
   - A chat-style UI box ("Ask NER-SARTHI") where typing a question shows a pre-scripted, canned response (mock RAG answer) with a typing animation — e.g. asking "which routes to Dima Hasao are at risk" returns a formatted mock answer with a mini source citation chip.

4. **Citizen / Driver Mobile Preview**
   - A phone-mockup frame showing a simplified mobile UI: accessibility map, alert banner, "report an incident" button, language selector dropdown (show a few NER languages + English in the dropdown, purely cosmetic).

5. **Feature Grid Section**
   - Icon cards summarizing platform pillars: Disruption Forecasting, AI Routing, GPS Tracking, Field Reporting, 230+ Language Support, Offline-First, Aadhaar/DigiLocker Verification, RAG Co-Pilot.

6. **Footer**
   - MDoNER / Team 818_CodeBuddies / SIH26002 branding line.

## Data
Hardcode realistic mock JSON in the code for districts (use real NER names: Dima Hasao, Karbi Anglong, Mangan, East Khasi Hills, Kohima, Imphal West, etc.), risk scores, vehicles, and alerts — no live API calls at all.

## Scope constraint (important)
This is a lean first build: one cohesive page with smooth scroll/section navigation + the dashboard as the visual centerpiece. Prioritize the map, charts, and role-switcher — those sell the concept. Skip real auth, real GIS/map tiles, real backend, and real multilingual translation — mock/fake these convincingly with static UI only.



## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
