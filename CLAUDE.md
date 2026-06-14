# CLAUDE.md — Best VPN Match

> Context file for Claude Code agents. Read this before touching anything.
> Last updated: 2026-06-12

---

## What this project is

**bestvpnmatch.com** — an independent VPN comparison and editorial scoring site.

- Scores 15 VPN providers across 8 categories using **public, verifiable data only** (no first-person lab tests)
- Links users to official VPN provider homepages — **no affiliate income yet**
- Part of BestMatch Group — independent comparison and decision platform
- Deployed on Netlify from `github.com:CBoon99/bestvpnmatch.git`

**Current business state:** `affiliateActive: false` in `data/site-config.js`. All CTAs say "Visit site →" and link to official homepages. No deals, no email list, no paid placement. The site earns nothing right now — the architecture is ready for affiliate links when programs are approved.

**Editorial honesty model:** Scores are editorial, not first-person tests. This is documented in `DATA-SOURCES.md` and the public `/methodology` page. Do not add any language implying we personally ran speed tests, tested VPNs hands-on, or ran lab benchmarks. Use framing like "editorial score based on published benchmarks" or "per independent audit reports".

---

## Tech stack

| Layer | What |
|-------|------|
| Framework | None — pure static HTML/CSS/JS |
| Build step | None — files served directly |
| Hosting | Netlify (publish dir = `.`) |
| CSS | Custom properties (`--bg-dark`, `--accent-blue`, etc.) with `[data-theme="dark"]` |
| Theme toggle | Inline anti-flash `<script>` in `<head>` reads `localStorage("vpn-theme")` — do not move it |
| Data | Three JS files in `/data/` loaded as `<script>` tags before the inline JS block |
| Schema | Schema.org JSON-LD — static in `<head>` + dynamic via JS on DOMContentLoaded |
| AI discovery | `llms.txt`, `llms-full.txt`, `agents.txt`, `ai.txt`, `.well-known/ai.json` |

**No npm, no webpack, no framework.** Everything runs in the browser. `<script src="data/site-config.js">` etc. loads globals that the inline `<script>` block in `index.html` depends on.

---

## Repository layout

```
/
├── index.html                  # Main comparison page (~3650 lines)
├── data/
│   ├── vpn-data.js             # 16 VPN records (VPNS array)
│   ├── scoring.js              # buildVPN(), calculateVPNScore(), enrichVPNs()
│   └── site-config.js          # affiliateActive flag, links, VPN_SAVINGS
├── methodology.html            # /methodology — public scoring rubric
├── about.html                  # /about — named maintainer, editorial model
├── ethics.html                 # /ethics — 6 rules, version log, KAPE section
├── DATA-SOURCES.md             # Honesty policy (what scores represent)
├── _redirects                  # Netlify clean URL rewrites (extensionless)
├── netlify.toml                # Security headers, cache headers
├── sitemap.xml
├── robots.txt
├── llms.txt / llms-full.txt    # AI crawler discovery
├── agents.txt / ai.txt
├── .well-known/ai.json
├── scripts/
│   ├── check_links.py          # Validates outbound VPN URLs
│   └── check_internal.py       # Checks internal links
└── reports/                    # CI output from link checks
```

**Landing pages (root-level .html):**

| File | Route | Topic |
|------|-------|-------|
| `best-vpn-for-netflix.html` | `/best-vpn-for-netflix` | Streaming |
| `best-vpn-for-gaming.html` | `/best-vpn-for-gaming` | Gaming |
| `best-vpn-for-privacy.html` | `/best-vpn-for-privacy` | Privacy |
| `best-vpn-for-china.html` | `/best-vpn-for-china` | China/travel |
| `best-vpn-for-travel.html` | `/best-vpn-for-travel` | Travel |
| `best-vpn-for-torrenting.html` | `/best-vpn-for-torrenting` | Torrenting |
| `best-vpn-for-remote-work.html` | `/best-vpn-for-remote-work` | Remote work |
| `best-vpn-for-students.html` | `/best-vpn-for-students` | Students |
| `best-free-vpn.html` | `/best-free-vpn` | Free VPNs |
| `cheapest-vpn.html` | `/cheapest-vpn` | Budget |
| `best-vpn-for-uae.html` | `/best-vpn-for-uae` | UAE |
| `best-vpn-no-logs-audited.html` | `/best-vpn-no-logs-audited` | Audited no-logs |
| `best-vpn-age-verification.html` | `/best-vpn-age-verification` | Age verification bypass |
| `best-vpn-for-ai-tools.html` | `/best-vpn-for-ai-tools` | AI tool access |
| `nordvpn-review.html` | `/nordvpn-review` | NordVPN full review |
| `expressvpn-review.html` | `/expressvpn-review` | ExpressVPN full review |
| `nordvpn-vs-expressvpn.html` | `/nordvpn-vs-expressvpn` | Head-to-head |
| `best-vpn-for-router.html` | `/best-vpn-for-router` | Router setup |
| `contact.html` | `/contact` | Contact page (stub) |
| `privacy.html` | `/privacy` | Privacy policy (stub) |
| `reviews.html` | `/reviews` | Reviews index (stub) |

---

## Data architecture

### Load order (critical)

In `index.html`, scripts load in this exact order:
```html
<script src="data/site-config.js"></script>   <!-- SITE_CONFIG, VPN_SAVINGS, affiliateHref() -->
<script src="data/scoring.js"></script>         <!-- buildVPN(), calculateVPNScore(), enrichVPNs() -->
<script src="data/vpn-data.js"></script>        <!-- VPNS array (enriched) -->
<script>/* inline page logic */</script>
```

`vpn-data.js` ends with:
```js
let VPNS = VPN_RECORDS.map(buildVPN);
enrichVPNs(VPNS);
```

So by the time the inline script runs, `VPNS` is a fully enriched, sorted, ranked array.

### VPN record shape (in vpn-data.js — array is `VPN_RECORDS`)

```js
{
  id: "nordvpn",                    // kebab-case, matches VPN_HOME_LINKS keys
  name: "NordVPN",
  logoIcon: "🔵",
  tagline: "The gold standard",
  jurisdiction: "Panama",
  auditType: "independent",         // "independent" | "self-published" | "none"
  auditFirm: "Deloitte",
  noLogPolicy: true,
  warrantCanary: true,
  ramServers: true,
  acceptsCrypto: true,
  speedScore: 92,                   // 0–100 editorial
  privacyScore: 94,
  securityScore: 91,
  streamingScore: 95,
  valueScore: 88,
  ethicsScore: 88,
  appsScore: 100,
  connectionsScore: 80,
  simultaneousConnections: 10,      // number or "unlimited"
  monthlyPrice: 3.39,               // long-term plan price
  moneyBackGuarantee: "30 days",
  bestPlan: "2-year",
  parentCompany: "Nord Security",
  pros: ["...", "..."],
  cons: ["...", "..."],
  bestFor: "All-round best",
  freePlan: false,
  protocols: ["WireGuard", "OpenVPN", "IKEv2"],
  streamingPlatforms: ["Netflix", "BBC iPlayer", "Disney+"],
  tags: ["streaming", "wireguard", "independent-audit", ...],
  sources: {                        // 1:1 to 8 scoring categories
    privacy:     "https://...",
    speed:       "https://...",
    security:    "https://...",
    streaming:   "https://...",
    value:       "https://...",
    ethics:      "https://...",
    apps:        "https://...",
    connections: "https://..."
  },
  affiliatePartnered: false,        // true when affiliate deal is live for this VPN
  status: "active",                 // "active" | "discontinued"
}
```

### buildVPN() output (after scoring.js processes it)

Adds these computed fields:
- `savingsPct` — from `VPN_SAVINGS[id][0]` (e.g. 63 for NordVPN)
- `regularPrice` — from `VPN_SAVINGS[id][1]` (e.g. 11.99)
- `affiliateLink` — result of `affiliateHref(id)` (homepage while `affiliateActive: false`)
- `weightedScore` — computed by `calculateVPNScore()`
- `ranking` — 1-based position after sort

### Scoring weights (locked at v1.0 — do not change without updating ethics.html version log)

```
Privacy      25%
Speed        20%
Security     15%
Streaming    10%
Value        10%
Ethics       10%
Apps          5%
Connections   5%
```

### site-config.js key exports

```js
SITE_CONFIG.affiliateActive          // false — flip to true when affiliate programs approved
SITE_CONFIG.dataLastVerified         // "2026-06-09" — update when re-verifying scores
VPN_SAVINGS                          // { nordvpn: [63, 11.99], ... } — [savingsPct, regularMonthly]
VPN_HOME_LINKS                       // official homepages — used while affiliateActive: false
AFFILIATE_LINKS                      // {} — fill when programs approved
affiliateHref(id)                    // returns affiliate URL or homepage fallback
outboundRel()                        // "noopener sponsored" or "noopener noreferrer"
outboundLabel()                      // "Affiliate link" or "Official site"
```

---

## index.html architecture

### Key sections (in order)

1. `<head>` — meta, Schema.org JSON-LD (static WebSite/Org/WebPage/FAQPage/HowTo)
2. Anti-flash theme script (inline, must stay in `<head>`)
3. Promo bar (`#promo-bar`) — populated by `initPromoBar()`
4. Hero — search input, CTA buttons
5. Intent section — 4 use-case tiles → shows best VPN for that use case
6. Categories section — 6 keyword tiles → triggers table search
7. Featured match (`#featured`) — rendered by `renderFeatured()`
8. Match quiz (`#match-quiz`) — 3-question flow, IIFE `initMatchQuiz()` runs at parse time
9. Scorecards (`#scorecards`) — rendered by `initScorecards()`, deduplicated
10. Shortlist — rendered by `renderShortlist()`
11. Comparison table (`#compare`) — rendered by `initTable()`
12. FAQ section
13. Niche guides
14. Footer — 3-column: Brand | Transparency (→methodology/about/ethics) | Explore
15. Compare modal (`#compare-modal`) — opened by `openCompareModal()`
16. Compare bar (`#compare-bar`) — floats when checkboxes selected
17. Sticky bar (`#sticky-bar`) — top-3 VPN quick links, hidden until hero scrolled past
18. Exit intent modal (`#exit-modal`)

### Key JS functions

| Function | What it does |
|----------|-------------|
| `initMatchQuiz()` | IIFE — 3-step quiz (Budget→Priority→Devices), renders top-3 on completion |
| `renderFeatured()` | Featured match card (highest weighted score) |
| `initScorecards()` | Renders SCORECARDS array (deduplicated — no VPN appears twice) |
| `renderTableRow(v)` | Single `<tr>` for comparison table — includes discontinued check |
| `openCompareModal()` | Side-by-side modal with all 8 score categories + source ⓘ links |
| `initSearch()` | Live debounced filter on `dataset.search` + autocomplete suggestions |
| `initCompare()` | Checkbox → selectedComparisons Set → compare bar → modal |
| `renderShortlist()` | 3-card shortlist (Best Overall, Best Privacy, Best Budget) |
| `renderStickyBar()` | Sticky bottom bar with top-3 VPN links |
| `initPromoBar()` | Updates promo bar with top VPN name; always shows "Editorial pick" (no deals) |
| `initIntentQuiz()` | 4-tile use-case selector |
| `sortTableBy(col)` | Column sort — score/speed/privacy/streaming/price/name |
| `initExitIntent()` | Exit intent modal on cursor leave or scroll-back |

### Savings badge rule (important)

All savings badges are **suppressed** while `affiliateActive: false`. The pattern throughout:

```js
// CORRECT — gates on affiliateActive
const savingsHtml = (v.savingsPct > 0 && SITE_CONFIG.affiliateActive)
  ? `<span class="savings-badge">Save ${v.savingsPct}%</span>` : "";
```

When affiliates go live, flip `affiliateActive: true` and all badges appear automatically.

---

## Known bugs (fix these next)

No open bugs as of 2026-06-12. All previously documented bugs have been resolved:
- `speedProtocolUrl` stale key replaced with `v.sources?.speed` in `renderTableRow`
- Footer transparency links (`/methodology`, `/about`, `/ethics`) standardized across all landing pages

---

## What's working (do not break)

- ✅ 3-question match quiz (`initMatchQuiz` IIFE) — renders step 0 at parse time, fully interactive
- ✅ Search — live filter on `dataset.search`, autocomplete, clear button
- ✅ Compare checkboxes → compare bar → compare modal (all 8 score categories + source links)
- ✅ Theme toggle (light/dark) with localStorage persistence and OS preference fallback
- ✅ Sticky bar — hidden until hero scrolls out of view (IntersectionObserver)
- ✅ Promo bar — shows top-rated VPN name, "Editorial pick", no fake deals
- ✅ Filter buttons + sort headers
- ✅ Exit intent modal
- ✅ Schema.org JSON-LD (static + dynamic ItemList/Review schemas)
- ✅ Atlas VPN discontinued state (grey badge, disabled checkbox, no CTA)
- ✅ Source ⓘ links in compare modal (all 8 categories)

---

## Phase 2 features (not yet built)

### P2.1 — "Why this score?" expandable rows (high value)

Each table row should have an expand toggle that reveals per-category score breakdown with source links. Pattern:

```html
<tr id="nordvpn">
  <!-- existing row -->
  <tr class="score-breakdown" id="nordvpn-breakdown" hidden>
    <!-- Privacy 94/100 — source link, Speed 92/100 — source link, etc. -->
  </tr>
```

Clicking the score pill toggles the breakdown row. Data is already in `v.sources` — just needs rendering.

### P2.2 — Custom weights slider (killer feature)

A UI widget above the table letting users drag sliders to reweight the 8 categories. Recalculates `weightedScore` live and re-sorts the table. Pattern:

- Default weights match `calculateVPNScore()` formula
- "Reset to defaults" button
- Sliders must total 100%
- Store preference in `sessionStorage`
- Scores update in table cells and score pills without page reload

### P2.3 — Score confidence indicator

A small visual indicator (e.g. coloured dot or bar) next to each score showing data quality:
- 🟢 Independent audit available
- 🟡 Self-published audit only
- 🔴 No audit — score based on features/policy only

Source: `v.auditType` field on each VPN record.

### P2.4 — Landing page footer links

All landing pages need `/methodology`, `/about`, `/ethics` links in their **footers** (navs already updated, footers are inconsistent).

### P2.6 — Mobile table layout audit

The comparison table is a full-width `<table>`. On mobile it currently scrolls horizontally. Consider a card-per-VPN layout below a certain breakpoint.

### P2.7 — Affiliate activation

When the first affiliate program is approved:
1. Add tracking URL to `AFFILIATE_LINKS` in `site-config.js`
2. Set `affiliatePartnered: true` on that VPN record in `vpn-data.js`
3. Set `affiliateActive: true` in `SITE_CONFIG`
4. All savings badges, deal CTAs, and sponsored rel attributes activate automatically
5. Update `about.html` and `ethics.html` with the disclosure

---

## Conventions — follow these exactly

### Savings badge gating
Always gate savings badges on `SITE_CONFIG.affiliateActive`:
```js
const savingsHtml = (v.savingsPct > 0 && SITE_CONFIG.affiliateActive) ? `...` : "";
```

### Source links (ⓘ pattern)
```js
function srcLink(url, label) {
  if (!url) return "";
  return ` <a href="${url}" target="_blank" rel="noopener noreferrer"
    title="Source: ${label}"
    style="font-size:0.65rem;color:var(--accent-blue);text-decoration:none;vertical-align:super">ⓘ</a>`;
}
```

### Editorial framing (avoid first-person testing claims)
❌ first-person test claims, owned speed-test claims, owned benchmark claims, lab-run claims
✅ "based on published benchmarks", "per editorial research", "per independent audit reports", "based on provider documentation"

### Score wording
- Scores are "editorial scores" — never "our scores" in a way implying first-person measurement
- "We evaluated" is fine. Do not say the site personally tested providers.

### CTA text
- `affiliateActive: false` → "Visit site →"
- `affiliateActive: true` → "Save X%" or "Get Deal" (driven by `v.savingsPct`)

### Outbound links
```js
rel="${outboundRel()}"  // auto: "noopener noreferrer" or "noopener sponsored"
```

### CSS variables (use these, don't hardcode colours)
```
--bg-dark, --bg-card, --bg-elevated
--text-primary, --text-secondary, --text-muted
--accent-blue (#2b7fff), --accent-green (#00d26a), --accent-purple (#8b5cf6)
--border, --radius
--font-display (Inter), --font-body (Inter), --font-mono
```

### Dark mode
All colours must use CSS variables. `[data-theme="dark"]` overrides are in the CSS block. Do not use hardcoded hex in new components.

---

## Deployment

- **Git remote:** `git@github.com:CBoon99/bestvpnmatch.git` (SSH)
- **Branch:** `main` — Netlify auto-deploys on push
- **Publish dir:** `.` (root) — no build step
- **Clean URLs:** handled by `_redirects` (Netlify 200 rewrites)
- **SSH note:** The sandbox/Cowork environment cannot authenticate via SSH. Carl must run `git push origin main` from his own Terminal.

```bash
# Standard commit from Carl's Terminal
cd ~/Documents/VPN\ Comparison
git config user.email "booncarl6@gmail.com"
git config user.name "Carl Boon"
git add -A
git commit -m "your message"
git push origin main
```

---

## File update checklist (when re-verifying VPN data)

When scores or pricing change:
1. Edit records in `data/vpn-data.js`
2. Update `SITE_CONFIG.dataLastVerified` in `data/site-config.js`
3. Update `DATA-SOURCES.md`
4. Update `<lastmod>` in `sitemap.xml`
5. Update scoring weight version in `ethics.html` if weights changed (they should not)

---

## What NOT to do

- Do not add email capture, newsletter signup, or any form that collects user data
- Do not add fake urgency ("Only 3 spots left", countdown timers, "Today only")
- Do not add "Save X%" badges or deal pricing without `affiliateActive: true`
- Do not claim first-person testing of specific VPN counts or durations
- Do not change scoring weights without updating `ethics.html` version log
- Do not remove the anti-flash theme script from `<head>` or make it async/defer
- Do not add incorporated status, office, team, or legal-registration claims unless documented
- Do not remove `DATA-SOURCES.md` — it's referenced from footer and methodology page
