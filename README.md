# Living Wetzlar Lounge Bar – Enterprise Website

Premium, statisch generierte Multi-Page-Website mit Enterprise-Qualität für die Living Wetzlar Lounge Bar.

## 🎯 Projektübersicht

**Wert**: ≥ 20.000 € – Premium-Enterprise-Lösung

- **Stack**: Astro (SSG), TypeScript, Tailwind CSS
- **Qualität**: WCAG 2.2 AA, Core Web Vitals optimiert, Security-härtet
- **Compliance**: DSGVO/TTDSG-konform mit Consent-Management
- **Performance**: LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1
- **Security**: CSP-strict, HSTS, SRI, Trusted Types
- **CI/CD**: Automatisierte Quality Gates (Lighthouse ≥ 95, Axe/Pa11y 0 critical)

## 📋 Voraussetzungen

- **Node.js**: ≥ 20.0.0
- **npm**: ≥ 10.0.0

## 🚀 Schnellstart

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build

# Preview des Builds
npm run preview
```

## 📦 Projektstruktur

```
├── contracts/              # Contract-Driven Architecture (JSON-Verträge)
│   ├── manifest.webspec.json
│   ├── seo.routes.json
│   ├── events.catalog.json
│   ├── orchestrator.json
│   └── components/         # Component Contracts
├── src/
│   ├── components/         # A11y-optimierte Komponenten
│   ├── layouts/            # Layout-Templates
│   ├── pages/              # Astro-Seiten (SSG)
│   └── styles/             # Design-Tokens & Styles
├── public/                 # Statische Assets
│   ├── assets/             # CSS, JS, Fonts, Images
│   ├── offline.html
│   ├── 503.html
│   └── _headers            # Security Headers (Netlify/Vercel)
├── scripts/                # Build & Validation Scripts
│   ├── gen-sri.js          # SRI Hash Generator
│   ├── verify-sri.js       # SRI Coverage Verification
│   └── no-inline-scanner.js # CSP Violation Scanner
├── docs/                   # Dokumentation
│   ├── deployment/         # Deployment-Guides
│   ├── reports/            # Quality Reports
│   └── ops/                # Operations-Runbooks
└── .github/workflows/      # CI/CD Pipelines
```

## 🧪 Tests & Quality Checks

### Alle Tests ausführen
```bash
npm run ci
```

### Einzelne Test-Suites

```bash
# Build & TypeScript Check
npm run build

# Lighthouse CI (Performance, SEO, Best Practices)
npm run lhci

# Accessibility Tests (Pa11y + Axe)
npm run a11y

# Link Checker
npm run links

# Security Checks
npm run security

# SRI Generation & Verification
npm run sri:gen
npm run sri:verify

# Contract Validation
npm run validate:contracts
```

## 🔒 Security

### Security-Härtung

- **CSP (Content Security Policy)**: Strict-Mode ohne `unsafe-*`
- **HSTS**: max-age=31536000, includeSubDomains, preload
- **SRI**: 100% Coverage für CSS, JS, WOFF2
- **Trusted Types**: Aktiviert für alle Scripts
- **COOP/COEP/CORP**: Cross-Origin Isolation
- **No Inline Code**: Alle Scripts/Styles extern

### Header-Konfigurationen

- **Netlify/Vercel**: `public/_headers` (automatisch)
- **Nginx**: `docs/deployment/nginx-headers.conf`

## 🌐 SEO & Strukturierte Daten

- ✅ Sitemap.xml (automatisch generiert)
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ JSON-LD (Schema.org: BarOrPub, LocalBusiness)
- ✅ OpenGraph & Twitter Cards
- ✅ hreflang (de-DE, en-US)

## ♿ Accessibility (A11y)

- **WCAG 2.2 Level AA** konform
- **0 critical/serious** Axe/Pa11y Violations
- Tastaturnavigation vollständig
- Screen-Reader optimiert
- Fokus-Management & ARIA
- Reduced-motion Support

## 🎨 Design-System

**3-Tier Token Architecture**:

1. **Tier 1 (Primitives)**: Farben, Spacing, Typografie
2. **Tier 2 (Semantic)**: Brand, Surface, Text, Border
3. **Tier 3 (Component)**: Button, Card, Form, Navigation

Alle Tokens in `src/styles/tokens.css` definiert.

## 📊 Performance-Budgets

| Ressource | Budget | Enforcement |
|-----------|--------|-------------|
| JavaScript | ≤ 50 KB/Seite | Error |
| CSS | ≤ 30 KB/Seite | Warning |
| Fonts | ≤ 100 KB total | Error |
| Images | ≤ 500 KB/Seite | Warning |

### Core Web Vitals Targets (p75)

- **LCP**: ≤ 2,5 s
- **INP**: ≤ 200 ms
- **CLS**: ≤ 0,1

## 🔐 Consent & DSGVO

- **Consent-Banner**: Opt-In mit Ablehnen-Option
- **Two-Click-Embeds**: YouTube, Google Maps
- **Consent-Kategorien**: Essential, Analytics, Marketing
- **Rechtliche Seiten**: Impressum, Datenschutzerklärung

## 🚢 Deployment

### Netlify/Vercel

```bash
# Build Command
npm run build

# Publish Directory
dist/
```

Security-Header werden automatisch aus `public/_headers` geladen.

### Custom Server (Nginx)

1. Build erstellen: `npm run build`
2. `dist/` auf Server kopieren
3. Nginx-Config aus `docs/deployment/nginx-headers.conf` einbinden
4. SSL-Zertifikat konfigurieren
5. Nginx neu laden: `sudo systemctl reload nginx`

## 📈 Monitoring & Ops

### SLOs (Service Level Objectives)

- **Availability**: ≥ 99,9%
- **Response Time (p95)**: ≤ 200 ms
- **Core Web Vitals (p75)**: Alle "Good"
- **Accessibility**: 0 critical violations
- **Security**: 0 critical vulnerabilities

Siehe `docs/ops/SLOs.md` für Details.

## ✅ Definition of Done (DoD)

Siehe `docs/DoD-checklist.md` für vollständige Abnahme-Checkliste.

**Minimum Requirements für Deployment**:
- ✅ Lighthouse ≥ 95 (Perf/SEO/Best Practices)
- ✅ Axe/Pa11y 0 critical/serious
- ✅ Core Web Vitals alle "Good"
- ✅ SRI 100% Coverage
- ✅ CSP-strict ohne unsafe-*
- ✅ 0 inline scripts/styles
- ✅ Consent-Banner funktional

---

**Version**: 1.0.0
**Stand**: 2025-01-12
**Projekt-Wert**: ≥ 20.000 €

Entwickelt mit höchsten Enterprise-Standards für **Living Wetzlar Lounge Bar**.