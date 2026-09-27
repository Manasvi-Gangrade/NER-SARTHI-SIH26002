# NER-SARTHI: Smart Logistics & Accessibility Intelligence Platform

**AI-Powered National Decision-Support & Multimodal Accessibility Coordination System for India's North Eastern Region (NER)**  
*Ministry of Development of North Eastern Region (MDoNER) · Government of India*

---

## Overview

The North Eastern Region (NER) of India — comprising Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura — is one of the most logistically fragile geographies in the country. Mountainous terrain, seismically active ranges, extreme monsoon rainfall, and heavy dependence on the critical Siliguri Corridor ("Chicken's Neck") mean that movements of essential commodities (medicines, foodgrains, fuel, and relief supplies) are chronically vulnerable to landslides, flash floods, and road collapse.

**NER-SARTHI** is an integrated intelligence platform that fuses real-time weather data, terrain hazard indices, satellite telemetry, and ground-level reporting into a unified predictive decision-support system. It delivers proactive route accessibility visibility, predictive disruption forecasting, and dynamic alternative routing before disruptions happen.

---

## Core Capabilities

1. **AI Disruption Forecasting**:
   - Physics-informed terrain susceptibility modeling combining static Base Vulnerability Scores with dynamic precipitation telemetry.
   - 24-hour predictive warnings for landslides, flash floods, and escarpment collapse.

2. **Dynamic Multi-Modal Routing**:
   - Risk-weighted graph-based route optimization across strategic national highway corridors (NH-27, NH-06, NH-10, AS-21, NH-02).
   - Automated bypass identification and multimodal fallback options (including NFR railheads and NW-2 river waterways).

3. **NavIC Fleet Telemetry**:
   - Indigenous satellite tracking for high-priority pharmaceutical, petroleum (POL), foodgrain, and emergency relief convoys through Himalayan shadow valleys.

4. **Multi-Role Command Architecture**:
   - Purpose-built operational lenses for Central/State Command, District Magistrates, NDRF/SDRF Disaster Teams, Field Engineers, Citizens, and Logistics Drivers.

5. **Citizen & Driver Offline-First Access**:
   - Turn-by-turn road pass advisories, crowdsourced incident photo reporting with offline encrypted queuing, and 1-tap disaster SOS rescue beacons.

6. **Linguistic Inclusivity**:
   - Multilingual interface supporting 230+ regional languages and dialects, including Assamese, Bodo, Meitei, Bengali, Khasi, Garo, Mizo, Nagamese, and Hindi.

---

## Technology Architecture

- **Frontend**: React 19, TypeScript, TanStack Start & Router, Tailwind CSS v4, Recharts, Lucide Icons
- **Design System**: Official Government of India command-center aesthetic, light theme, high-contrast accessibility
- **Geospatial & Visualization**: Custom vector GIS map layers, interactive topography contours, real-time alert tickers
- **Intelligence Layer**: RAG Decision Support Co-Pilot, scenario stress testing, and auditable data citations

---

## Development

```sh
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```

---

*© Ministry of Development of North Eastern Region · Government of India*
