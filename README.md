# 🌿 AirAware AI — GenAI Pollution Intelligence & Winter Smog Advisor

[![CI Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/airaware-ai/airaware-ai)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Gemini API](https://img.shields.io/badge/Gemini%20API-1.5%20Flash-orange.svg)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**AirAware AI** is a full-stack, GenAI-powered environmental intelligence platform engineered to help families, vulnerable individuals (children, asthmatics, the elderly), and urban communities navigate severe winter smog and urban air crises. 

Instead of acting as a passive AQI number board, AirAware AI combines **real-time atmospheric sensor feeds (Copernicus CAMS & Open-Meteo)**, **household vulnerability parameters**, and **backend-grounded Google Gemini AI reasoning** to generate dynamic daily routines, window ventilation timings, low-emission habits, and what-if impact scenario simulations.

---

## 🔗 Public Repository & Live Demo
- **GitHub Repository**: [https://github.com/airaware-ai/airaware-ai](https://github.com/airaware-ai/airaware-ai)
- **Local Application URL**: `http://localhost:5173`
- **Backend API URL**: `http://localhost:5000`

---

## 1. Chosen Vertical: Severe Winter Smog, Urban Air Pollution & Family Health Protection

Severe winter smog represents a catastrophic public health crisis in northern India (Delhi NCR, Indo-Gangetic Plain), Central Europe, Salt Lake Basin, and high-density global megacities. During winter months, meteorological **thermal inversions** trap combustion exhaust (stubble burning, vehicle exhaust, biomass heating, industrial emissions) in a shallow cold boundary layer close to the ground.

Families are regularly left with critical, unanswered daily questions:
- *Can my child play outdoors safely at 8:00 AM?*
- *When should we open bedroom windows to prevent indoor CO2 spikes without letting in hazardous PM2.5?*
- *How can low-income households filter room air without spending $400 on commercial purifiers?*
- *How can families adjust commute routines to reduce personal particulate inhalation while cutting vehicle emissions?*

AirAware AI solves these challenges with structured, context-aware intelligence.

---

## 2. Approach & Architecture Logic

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AirAware AI Architecture                        │
└────────────────────────────────────────────────────────────────────────┘

    [ Open-Meteo & Copernicus CAMS APIs ]        [ Google Gemini 1.5 Flash ]
                    │                                        │
                    ▼                                        ▼
   ┌──────────────────────────────────┐     ┌────────────────────────────────┐
   │     Open-Meteo Data Service      │     │       Gemini AI Service        │
   │  • US EPA & CAMS Normalization   │     │  • Context Grounding           │
   │  • 15-Minute TTL Cache           │     │  • Zod Output Validation       │
   │  • Geocoding & Simulated Fallback│     │  • Deterministic Reasoner      │
   └────────────────┬─────────────────┘     └────────────────┬───────────────┘
                    │                                        │
                    └───────────────────┬────────────────────┘
                                        │
                                        ▼
                     ┌──────────────────────────────────────┐
                     │     Node.js Express TypeScript API   │
                     │  • Rate Limiting & Helmet Security   │
                     │  • REST Endpoints (/api/ai, etc.)    │
                     │  • Supabase RLS / In-Memory Fallback │
                     └──────────────────┬───────────────────┘
                                        │ (JSON REST)
                                        ▼
                     ┌──────────────────────────────────────┐
                     │    Vite + React 18 + Tailwind CSS    │
                     │  • Semantic HTML5 & 8px Design Grid  │
                     │  • CSS Variables Light/Dark Theme    │
                     │  • Prefers-Reduced-Motion Compliant  │
                     │  • Recharts Diurnal Smog Trends      │
                     └──────────────────────────────────────┘
```

### Approach Highlights:
1. **Strictly Grounded AI**: AI responses are never prompted into ungrounded hallucinations. Backend services inject verified real-time measurements (AQI, PM2.5, PM10, temperature, humidity, wind velocity, inversion markers) and household constraints directly into system prompts.
2. **Deterministic Fallback Engine**: If an external AI API key is omitted, exhausted, or encounters timeouts, AirAware AI automatically switches to a deterministic environmental science reasoning engine, ensuring the app remains 100% functional during hackathon reviews and offline demos.
3. **No Medical Diagnoses**: All health advice is framed strictly as particulate exposure reduction and environmental management, accompanied by prominent public health notices and non-medical disclaimers.
4. **Transparent Carbon & Exposure Metrics**: Impact calculations use verified EPA/EEA passenger vehicle carbon intensity factors and respiratory volume estimates rather than fabricated numbers.

---

## 3. Core Modules & Functionality

### A. Environmental Dashboard
- Displays US AQI, EPA categorical ratings (Good, Moderate, Sensitive, Unhealthy, Very Unhealthy, Hazardous).
- Detailed pollutant grid: PM2.5, PM10, NO2, O3, SO2, CO with WHO 2021 air quality thresholds.
- Weather card featuring an automated **Thermal Inversion Risk Indicator** (calculated from wind velocity, humidity, and temperature).
- 24-Hour Diurnal Trend Area Chart with Recharts visualizing rush hour spikes and afternoon ventilation windows.
- Global location search powered by Open-Meteo Geocoding, plus pre-configured winter smog benchmark presets (New Delhi, Los Angeles, London, Salt Lake City, Beijing).

### B. Context-Aware AI Smog Advisor
- Interactive conversational interface with session history.
- Quick question chips covering outdoor workout safety, window schedules, mask fit, and child protection.
- Verified data source pills and transparent limitation disclosures.

### C. Dynamic Daily Routine Planner
- Hourly schedule tailored to diurnal inversion peaks.
- Action items include priority badges, categories (indoor, outdoor, commute, sustainability), scientific rationale, and alternatives.
- Interactive completion tracking that logs actions to the user's personal Impact Tracker.

### D. Indoor Air Quality Optimizer
- Divided into **Zero-Cost Protocols**, **Low-Cost DIY ($10–$50)**, and **Equipment (HEPA)**.
- Step-by-step guidance for constructing low-cost **Corsi-Rosenthal Boxes** (box fan + MERV-13 filters) that deliver 250+ CFM Clean Air Delivery Rates.
- Weather-stripping protocols and zero-indoor-combustion rules (eliminating incense and mosquito coils).

### E. Low-Emission Lifestyle Planner
- Identifies high-leverage switches: errand batching, anti-idling at school gates, electric transit, biomass heating alternatives, and mulching over burning.
- Highlights habit vs. alternative, difficulty, costs, and personal health benefits.

### F. What-If Routine Impact Simulator — *Key Differentiator*
- Allows users to model their conventional routine (solo car commute distance, errand frequency, outdoor workout duration and timing) against an AI-optimized clean schedule.
- Calculates **Estimated Exposure Reduction (%)**, **Emissions Avoided (kg CO2)**, and convenience/cost impacts with transparent assumptions.

### G. Household Safety & Vulnerability Profile
- Configures household size, presence of young children, elderly members, asthma/respiratory sensitivity, and heart conditions.
- Records equipment availability (HEPA purifiers, N95 respirators, AC filtration) and budget tier.
- Stored locally with optional Supabase PostgreSQL persistence.

### H. Personal Impact Tracker
- Tracks cumulative CO2 avoided, average particulate exposure reduction, logged actions, and clean air streaks.
- Includes a manual action logging form for recording ad-hoc low-emission activities.

### I. Community Collective Insights
- Aggregates neighborhood initiatives (school carpools, open PM2.5 sensor meshes, clean heating moratoriums).
- Features clear demo labels and privacy protection (never tracks or displays personal home addresses).

---

## 4. Engineering Quality, Security & Accessibility

| Parameter | Implementation Details |
| :--- | :--- |
| **Code Quality** | Modular TypeScript architecture across client and server; typed API contracts; ESLint/Prettier compliance; separation of presentation and business logic. |
| **Security** | Secrets kept exclusively on backend; Helmet HTTP security headers; CORS restricted origins; general rate limiting (200 req/15 min) and AI rate limiting (30 req/min); comprehensive Zod input validation; untrusted inputs treated safely. |
| **Efficiency** | In-memory 15-minute caching TTL for atmospheric APIs; debounced geocoding search (350ms); optimized Recharts rendering. |
| **Testing** | Automated unit and integration test suites using Vitest for both backend services (`server/tests/server.test.ts`) and frontend UI logic (`client/tests/client.test.ts`). |
| **Accessibility (a11y)** | Semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`); strict 8px grid layout (`var(--grid-unit)`); CSS variables theme system (light/dark); full `@media (prefers-reduced-motion: reduce)` compliance; visible keyboard focus outlines; ARIA attributes and roles. |

---

## 5. Transparent Mathematical Assumptions & Constants

1. **Vehicular Carbon Emissions**: Calculated at **192 g CO2/km** for average passenger petrol/diesel vehicles (derived from EPA/EEA benchmark datasets).
2. **Public Electric Transit Emissions**: Calculated at **45 g CO2/passenger-km** (grid-averaged commuter metro/rail).
3. **Errand Trip Distance**: Modeled as an average round-trip urban distance of **4.0 km**.
4. **Idling Fuel Consumption**: Estimated at **0.8 liters/hour**, generating ~0.6 kg CO2 per 15 minutes of eliminated idling.
5. **Exposure Reduction Score**: Modeled as a function of outdoor minutes, minute ventilation rate (elevated during cardio), and hourly diurnal PM2.5 concentrations. *Clearly labeled as mathematical modeling estimates, not clinical diagnostic measurements.*

---

## 6. Installation & Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Step 1: Clone Repository
```bash
git clone https://github.com/airaware-ai/airaware-ai.git
cd "Climate control"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env
```
Edit `.env` to configure your Gemini API key (optional — app includes full offline deterministic fallback reasoning):
```env
PORT=5000
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
DEMO_MODE=true
```

### Step 4: Run Tests
Run both server and client test suites:
```bash
npm run test
```

### Step 5: Start Development Servers
Start both backend API and frontend Vite server:
```bash
# Terminal 1: Backend API (port 5000)
npm run dev:server

# Terminal 2: Frontend Client (port 5173)
npm run dev:client
```
Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 7. Database & Supabase Migrations
The database schema and Row Level Security policies are located at:
`supabase/migrations/20260101_init.sql`

Includes tables for:
- `profiles` & `household_settings` (with cascade delete and RLS policies)
- `saved_locations`
- `conversations` & `chat_messages`
- `daily_plans`
- `completed_actions`
- `community_initiatives`

---

## 8. License
Distributed under the **MIT License**. Built with care for communities and families facing severe seasonal smog.
