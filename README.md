# NER-SARTHI

**National Decision Intelligence Platform for the North Eastern Region**
*Smart India Hackathon 2026 — Problem Statement ID: SIH26002 · Ministry of Development of North Eastern Region (MDoNER)*

🔗 **Live Demo:** [ner-sarthi-alpha.vercel.app](https://ner-sarthi-alpha.vercel.app/)

---

## Overview

NER-SARTHI ("Sarthi" — the charioteer) is a unified AI decision-support platform that fuses real-time weather intelligence, satellite radar, NavIC telemetry, and field reporting across all **8 North Eastern states** to predict road collapse, flood washouts, and lifeline disruptions **before they happen** — shifting response time from hours to days of advance warning.

It turns terrain and logistics data into actionable decisions for government agencies, drivers, and remote communities, without requiring any new physical infrastructure.

---

## Problem Statement

Almost all freight and passenger traffic into the North East funnels through a handful of fragile corridors — most critically the **22 km Siliguri Corridor ("Chicken's Neck")** and landslide-prone highways like **NH-27 (Dima Hasao)** and **NH-10 (Teesta/Sikkim)**.

- **₹8,139.50 Cr** has already been committed under **NESIDS** for physical road infrastructure.
- There is currently **no AI or predictive intelligence layer** on top of this infrastructure.
- A single slope failure or flood can isolate entire hill districts for days, cutting off essential supplies, medicine, and fuel.

---

## Solution

NER-SARTHI adds a predictive, multi-modal intelligence layer on top of existing infrastructure and agencies — it **augments**, not replaces, BRO, PWD, NDMA, and MDoNER workflows.

### Core Capabilities

| Module | Description |
|---|---|
| **Disruption Forecasting Engine** | Physics-informed Bayesian Vulnerability Score (BVS) combining InSAR satellite slope radar, IMD Doppler rainfall, and soil displacement data |
| **AI Routing & Optimization** | Risk-weighted routing (Dijkstra/A*) with dynamic re-routing around active chokepoints |
| **Dynamic Multi-Modal Failover** | Automatic failover to NFR rail freight (Lumding–Badarpur) and IWAI National Waterway-2 (Brahmaputra) river barges when highways collapse |
| **GPS/NavIC Fleet Tracking** | Real-time convoy tracking for essential commodities (medicine, fuel, grain, cold-chain) |
| **Accessibility Mapping** | District-wise connectivity and isolation-risk scoring |
| **Offline-First Field App** | Geo-tagged field reports from remote areas with local mesh caching |
| **Command Dashboard** | 6 role-based portals (District DM, MDoNER Command, NDRF, PWD/BRO, etc.) |
| **Citizen/Driver Mobile Kiosk** | Voice-first, 230+ regional dialect support via Bhashini, with 1-tap SOS and Twilio SMS/voice fallback |
| **AI Co-Pilot** | RAG-based conversational assistant for officials (e.g., "Which routes to Dima Hasao are at risk this week?") |

---

## Risk Model — Base Vulnerability Score (BVS)

NER-SARTHI's core risk engine computes a dynamic, physics-informed vulnerability score per corridor:

```
BVS = 0.35·G + 0.25·S + 0.25·R + 0.15·M

Risk(t) = BVS × [1 + α·(Rain / Rain_threshold)]
```

| Factor | Meaning | Example |
|---|---|---|
| **G** — Geological Stratum Fragility | Lithology-based shear weakness (GSI database) | 0.85 index |
| **S** — Slope Inclination | DEM-derived slope steepness | 44° |
| **R** — Dynamic Rainfall Rate | IMD Doppler / AWS 24h precipitation | 124 mm/24h |
| **M** — Soil Saturation Index | Sentinel-1 InSAR soil moisture / pore-water pressure | 88% saturated |

District-specific multipliers (e.g., **Dima Hasao ≈ 0.85**) account for terrain differences rather than applying one national threshold.

---

## Multi-Modal Failover Engine

When a primary highway corridor (e.g., NH-27 Jatinga) is severed, the system autonomously proposes alternate routes:

1. **Road Highland Bypass** — e.g., Umrangso → Lanka diversion (Assam PWD)
2. **NFR Rail Cargo Shuttle** — Lumding–Badarpur hill-section Ro-Ro freight (Northeast Frontier Railway)
3. **IWAI Inland Waterway (NW-2)** — Brahmaputra river barge via Jogighopa Terminal

Each option is scored on transit time, capacity, cost delta, and carbon impact.

---

## System Architecture

```
Data Sources → Kafka Ingestion → Storage (PostGIS / Neo4j / MongoDB / Redis)
      ↓
AI Intelligence Layer (Disruption Forecasting · Routing · Accessibility Mapping)
      ↓
API & Orchestration (FastAPI · RAG Co-Pilot · Alert Service · Security Shield)
      ↓
Delivery Channels (Command Dashboard · Citizen/Driver App · SMS/Voice Fallback)
```

**Data Sources:** IMD Doppler weather, ISRO Bhuvan/Bhuvver satellite imagery, GSI Bhukosh/Bhusanket geology, OpenStreetMap road topology, ISRO NavIC fleet telemetry, offline field-app reports.

---

## Tech Stack

- **Backend:** FastAPI, Kafka, Spark
- **Databases:** PostgreSQL + PostGIS, Neo4j, MongoDB, Redis
- **AI/ML:** XGBoost / LightGBM, Bayesian risk modeling, LangChain/LangGraph (RAG Co-Pilot)
- **Frontend:** React + TypeScript (Command Dashboard), React Native (Citizen/Driver App)
- **Infra:** AWS/GCP, Docker, Kubernetes, Microservices (99%+ uptime target)
- **Comms:** Twilio (SMS/Voice fallback), Bhashini (230+ regional dialects)
- **Security:** TLS, Role-Based Access Control, Aadhaar/DigiLocker (field officials only — never citizens)

---

## Projected Impact

| Metric | Projection |
|---|---|
| Faster delivery of essential goods | 30–40% |
| Lower logistics cost | 15–25% |
| Critical-route visibility during monsoon | 95%+ |
| Predictive warning window | Days, not hours |
| Population reach | 45M+ across 8 NER states |

> These are model-based projections defined in the problem statement, not results from field testing.

---

## Pilot & Rollout Plan

| Phase | Weeks | Focus |
|---|---|---|
| 1 | 0–6 | Foundation — data pipeline, ingestion, database setup |
| 2 | 6–14 | Core AI engines — forecasting, routing, accessibility mapping |
| 3 | 14–20 | Field app & mobile app development |
| 4 | 20–28 | **Pilot** — Dima Hasao (NH-27) & NH-10/Sikkim corridors |
| 5 | 28+ | Regional scale-up across all 8 NER states |

MVP is **road-only**; rail and waterway fallback are added in later phases.

---

## Feasibility & Viability

- **Technical:** Mature open-source stack; all core data sources (IMD, GSI, Bhuvan, OSM) are public.
- **Financial:** Software-first — no new physical infrastructure; reuses existing ₹8,139.50 Cr NESIDS funding.
- **Operational:** Augments existing BRO/PWD/NDMA/MDoNER workflows rather than replacing them.
- **Precedent:** GSI's Bhusanket landslide bulletins are already operational in 6 Sikkim districts, validating the risk-modeling approach.

---

## Key Challenges

1. **Data & connectivity gaps** in remote hill districts — mitigated via terrain priors, crowdsourced field reports, and offline-first design.
2. **Prediction uncertainty** — mitigated via probability bands (not binary alerts) and continuous model retraining.
3. **Adoption across agencies & languages** — mitigated via role-based dashboards, voice-first UI, and 230+ dialect support.

---

## Team

**Team:** 555_CodeBuddies
**Institution:** Indore Institute of Science & Technology (IIST), Indore

---

## License

This project was built for Smart India Hackathon 2026 (Problem Statement SIH26002).
