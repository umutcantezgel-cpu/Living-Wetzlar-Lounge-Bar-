# Definition of Done (DoD) – Weltmeisterniveau Checkliste

**Projekt**: Living Wetzlar Lounge Bar – **Weltmeister-Edition**
**Version**: 2.0.0 (Top 1-5% Upgrade)
**Datum**: 2025-01-12

Diese Checkliste definiert **Weltmeisterniveau-Standards (Top 1-5%)**. Alle Punkte müssen mit ✅ markiert sein, bevor ein Deployment erfolgen darf.

---

## 🏆 Performance & Core Web Vitals (Weltmeisterniveau)

### Lighthouse Scores (Mobile, p75)
- [ ] **Performance**: ≥ **98** (nicht 95!)
- [ ] **Accessibility**: **100** (Perfect Score)
- [ ] **Best Practices**: ≥ **98** (nicht 95!)
- [ ] **SEO**: ≥ **98** (nicht 95!)

### Core Web Vitals (p75) – Top 1-5% Targets
- [ ] **LCP (Largest Contentful Paint)**: ≤ **1,8 s** (nicht 2,5s!)
- [ ] **INP (Interaction to Next Paint)**: ≤ **150 ms** (nicht 200ms!)
- [ ] **CLS (Cumulative Layout Shift)**: ≤ **0,08** (nicht 0,1!)
- [ ] **TBT (Total Blocking Time)**: ≤ **150 ms**

### Performance-Budgets (Weltmeisterniveau)
- [ ] **JavaScript**: ≤ **35 KB**/Seite (nicht 50KB!)
- [ ] **CSS**: ≤ **45 KB**/Seite (strenger!)
- [ ] **Fonts**: ≤ 100 KB total (self-hosted WOFF2 + Variable Fonts)
- [ ] **Images**: ≤ 500 KB/Seite (AVIF/WebP preferred)
- [ ] **Total Page Weight**: ≤ 1 MB
- [ ] **Critical Assets**: Preloaded mit `fetchpriority="high"`
- [ ] **Font-Display**: `swap` + `size-adjust` gesetzt

---

## ♿ Accessibility (WCAG 2.2 AA)

### Automated Tests
- [ ] **Axe Core**: 0 critical/serious violations
- [ ] **Pa11y**: 0 critical/serious violations

### Manual Checks
- [ ] **Tastaturnavigation**: Alle interaktiven Elemente erreichbar
- [ ] **Fokus-Sichtbarkeit**: Fokus-Ringe überall sichtbar
- [ ] **Screen Reader**: Navigation funktional (getestet mit NVDA/VoiceOver)
- [ ] **Semantische HTML-Struktur**: Header, Nav, Main, Footer, H1-H6
- [ ] **ARIA**: Labels für alle Formulare, aria-current für aktive Nav-Links
- [ ] **Landmark-Regions**: Alle wichtigen Bereiche gekennzeichnet
- [ ] **Reduced Motion**: Respektiert `prefers-reduced-motion`
- [ ] **Touch Targets**: Mindestens 24×24 CSS-Pixel

---

## 🔒 Security

### Content Security Policy (CSP)
- [ ] **CSP-strict**: Aktiviert ohne `unsafe-inline` oder `unsafe-eval`
- [ ] **Trusted Types**: `require-trusted-types-for 'script'` aktiviert
- [ ] **No Inline Code**: 0 inline Scripts/Styles (verified via scanner)

### Security Headers
- [ ] **HSTS**: `max-age=31536000; includeSubDomains; preload`
- [ ] **X-Frame-Options**: `DENY`
- [ ] **X-Content-Type-Options**: `nosniff`
- [ ] **Referrer-Policy**: `strict-origin-when-cross-origin`
- [ ] **Permissions-Policy**: Alle unnötigen Features deaktiviert
- [ ] **COOP/COEP/CORP**: Korrekt konfiguriert

### Subresource Integrity (SRI)
- [ ] **SRI Coverage**: 100% für CSS, JS, WOFF2
- [ ] **Integrity Manifest**: `public/integrity.manifest.json` vorhanden
- [ ] **SRI Verification**: Script `npm run sri:verify` erfolgreich

### Dependencies
- [ ] **npm audit**: 0 critical/high vulnerabilities
- [ ] **Dependency Review**: Nur erlaubte Lizenzen (MIT, Apache 2.0, etc.)
- [ ] **SBOM**: CycloneDX SBOM generiert

---

## 🔐 Consent & DSGVO/TTDSG

### Consent-Management
- [ ] **Cookie-Banner**: Visible mit Ablehnen-Option
- [ ] **Consent-Kategorien**: Essential, Analytics, Marketing konfiguriert
- [ ] **Consent-Persistence**: LocalStorage funktional
- [ ] **No 3rd-Party Requests**: Ohne Opt-In keine externen Requests

### Two-Click-Embeds
- [ ] **YouTube**: Two-Click-Pattern implementiert
- [ ] **Google Maps**: Two-Click-Pattern implementiert
- [ ] **Sandbox**: iframes mit korrekten Sandbox-Attributen

### Rechtliche Seiten
- [ ] **Impressum**: Vollständig ausgefüllt (TODO markiert)
- [ ] **Datenschutzerklärung**: Vollständig ausgefüllt
- [ ] **Noindex**: Impressum & Datenschutz auf `noindex, follow`

---

## 🌐 SEO

### On-Page SEO
- [ ] **Unique Titles**: Jede Seite hat einzigartigen Titel
- [ ] **Meta Descriptions**: Jede Seite hat einzigartige Description
- [ ] **Canonical URLs**: Auf allen Seiten korrekt
- [ ] **H1-H6 Hierarchie**: Logisch und semantisch korrekt
- [ ] **robots.txt**: Korrekt konfiguriert
- [ ] **sitemap.xml**: Automatisch generiert und valide

### Strukturierte Daten
- [ ] **JSON-LD**: Schema.org BarOrPub/LocalBusiness implementiert
- [ ] **Validation**: Structured Data Testing Tool zeigt 0 Fehler
- [ ] **OpenGraph**: Title, Description, Image auf allen Seiten
- [ ] **Twitter Cards**: Korrekt konfiguriert

### Internationalisierung (i18n)
- [ ] **lang-Attribut**: `<html lang="de-DE">` korrekt
- [ ] **hreflang**: Links zwischen de-DE und en-US (falls mehrsprachig)

---

## 📱 Responsive & Progressive Enhancement

### Responsive Design
- [ ] **Mobile-First**: Funktional auf 320px Breite
- [ ] **Breakpoints**: Smooth auf allen Viewports (320px - 1920px)
- [ ] **Images**: Responsive mit `srcset` oder `picture`
- [ ] **Touch Gestures**: Touch-friendly auf Mobile

### Progressive Enhancement
- [ ] **No-JS Fallback**: Grundfunktion ohne JavaScript
- [ ] **Offline-Fähigkeit**: offline.html verfügbar
- [ ] **Service Worker**: (Optional) Registriert und funktional

---

## 🧪 Testing

### Automated Tests
- [ ] **Build**: `npm run build` erfolgreich
- [ ] **TypeScript**: Keine Type-Errors
- [ ] **Lighthouse CI**: Alle Assertions bestanden
- [ ] **Pa11y/Axe**: 0 critical violations
- [ ] **Link Checker**: Alle Links erreichbar (0 broken links)
- [ ] **No-Inline Scanner**: 0 Violations

### Manual Tests
- [ ] **Cross-Browser**: Getestet in Chrome, Firefox, Safari, Edge
- [ ] **Mobile Devices**: Getestet auf iOS & Android
- [ ] **Keyboard Navigation**: Vollständig durchgetestet
- [ ] **Forms**: Validation & Submission funktional

---

## 🚢 Deployment & Operations

### Build & Deployment
- [ ] **Production Build**: `npm run build` erfolgreich
- [ ] **Asset Optimization**: CSS/JS minifiziert, Images optimiert
- [ ] **Security Headers**: Korrekt konfiguriert (Netlify/_headers oder Nginx)
- [ ] **SSL/TLS**: HTTPS aktiv, Zertifikat valide
- [ ] **DNS**: Korrekt konfiguriert

### Monitoring & Ops
- [ ] **SLOs definiert**: docs/ops/SLOs.md vorhanden
- [ ] **Runbooks**: Incident Response, Maintenance Mode verfügbar
- [ ] **Error Tracking**: (Optional) Sentry oder ähnliches konfiguriert
- [ ] **Uptime Monitoring**: (Optional) UptimeRobot oder ähnliches

---

## 📄 Dokumentation

### Code-Dokumentation
- [ ] **README.md**: Vollständig und aktuell
- [ ] **Component Contracts**: Alle Komponenten dokumentiert
- [ ] **Scripts**: Alle npm-Scripts dokumentiert

### Operations-Dokumentation
- [ ] **Deployment-Guide**: docs/deployment/ vorhanden
- [ ] **SLOs**: docs/ops/SLOs.md vorhanden
- [ ] **Runbooks**: Incident, Maintenance, Rollback dokumentiert
- [ ] **Architecture**: Contract-Driven Architektur erklärt

### Handover-Dokumentation
- [ ] **Wartung**: Anleitung für Updates & Patches
- [ ] **Schulung**: (Optional) Video/Slides für Content-Editoren
- [ ] **Credentials**: (Optional) Zugriffsdaten sicher übergeben

---

## ✅ Final Sign-Off

**Alle oben genannten Punkte sind erfüllt:**

- [ ] **Development Team Lead**: _________________ Datum: _______
- [ ] **QA Lead**: _________________ Datum: _______
- [ ] **Security Officer**: _________________ Datum: _______
- [ ] **Product Owner**: _________________ Datum: _______

**Projekt bereit für Production Deployment**: ☐ Ja ☐ Nein

---

## 📊 Qualitäts-Metriken (bei Abnahme)

### Performance (Lighthouse Mobile)
- Performance Score: _____%
- Accessibility Score: _____%
- Best Practices Score: _____%
- SEO Score: _____%

### Core Web Vitals (p75)
- LCP: _____ ms
- INP: _____ ms
- CLS: _____

### Security
- Axe Critical Violations: _____
- Pa11y Critical Violations: _____
- npm audit Critical: _____
- SRI Coverage: _____%

---

**Hinweis**: Diese Checkliste ist verbindlich. Kein Deployment ohne vollständige Erfüllung aller Punkte.

**Marktwert-Rechtfertigung**: Dieser umfassende Qualitätsstandard rechtfertigt einen Projektwert von **≥ 20.000 €**.
