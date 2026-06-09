# Best VPN Match — bestvpnmatch.com

Independent VPN comparison site. Real speed tests, privacy audits, streaming checks across 16+ VPNs. No paid placement. Affiliate revenue only.

---

## What this site is

A single-domain, multi-page static HTML affiliate site. Every page is self-contained — no framework, no build step, no database. Drop the files on any static host and it works.

Revenue model: affiliate commissions when users click through and purchase a VPN subscription. Commission rates average 30–40% of first-year subscription value.

---

## File structure

```
/
├── index.html                    # Homepage — main comparison, quiz, scorecards
├── best-vpn-for-netflix.html     # Streaming / geo-unblocking page
├── best-vpn-for-gaming.html      # Gaming + school WiFi bypass
├── best-vpn-for-privacy.html     # Privacy-focused users
├── best-vpn-for-china.html       # GFW bypass / China travel
├── best-vpn-age-verification.html # UK Online Safety Act / age-gated content
├── best-vpn-for-ai-tools.html    # ChatGPT / Claude / Gemini access
├── cheapest-vpn.html             # Budget VPNs / deals
├── best-vpn-for-travel.html      # Travel, expats, public WiFi
│
├── sitemap.xml                   # All URLs — submit to Google Search Console
├── robots.txt                    # Allows all crawlers incl. GPTBot, ClaudeBot
├── llms.txt                      # AI summary (short) — for Perplexity, Claude
├── llms-full.txt                 # AI full data reference — for AI research queries
│
├── og-image.png                  # Social share image (1200×630)
└── og-image.svg                  # Source SVG for og-image.png
```

---

## Deployment

### Any static host

Upload all files to the root of your hosting. No server-side processing required.

Recommended hosts (all support custom domains + SSL):
- **Cloudflare Pages** — free, fastest CDN globally, instant deploys from Git
- **Netlify** — free tier, drag-and-drop deploy
- **Vercel** — free tier, Git integration
- **GitHub Pages** — free, good for version control

### URL structure

The landing pages use extensionless URLs (`/best-vpn-for-netflix` not `/best-vpn-for-netflix.html`).

Configure your host to strip `.html` extensions:

**Netlify** — add `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/:splat.html"
  status = 200
```

**Cloudflare Pages** — enable "Pretty URLs" in Pages settings (strips `.html` automatically).

**Vercel** — add `vercel.json`:
```json
{ "cleanUrls": true }
```

**Apache** — add to `.htaccess`:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]
```

### After deploying

1. Submit `https://bestvpnmatch.com/sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
2. Submit to [Bing Webmaster Tools](https://www.bing.com/webmasters)
3. Verify the og-image loads correctly with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
4. Test structured data with [Google's Rich Results Test](https://search.google.com/test/rich-results)

---

## Current mode: pre-affiliate (live)

- **`data/site-config.js`** — `affiliateActive: false`; all CTAs use `VPN_HOME_LINKS` (official provider sites)
- **Scores** — editorial, from public audits/features/pricing (see `DATA-SOURCES.md`)
- **No email capture** — removed until a real endpoint exists
- **Images** — `og-image.png` and `logo.png` in project root

## Adding affiliate IDs (when approved)

Open **`data/site-config.js`** (not `index.html`):

```js
const AFFILIATE_LINKS = {
  nordvpn:      "https://go.nordvpn.net/YOUR_ID",
  expressvpn:   "https://www.expressvpn.com/order?offer=YOUR_ID",
  surfshark:    "https://surfshark.com/deal/YOUR_ID",
  // ...
};
```

1. Set `affiliateActive: true`
2. Add real URLs to `AFFILIATE_LINKS`
3. Landing pages: add `<script src="data/site-config.js">` and use `affiliateHref('nordvpn')` when you refactor them (currently use official URLs directly)

### Where to sign up for affiliate programs

| VPN | Program | Network |
|-----|---------|---------|
| NordVPN | [nordvpn.com/affiliate](https://nordvpn.com/affiliate) | Impact / direct |
| ExpressVPN | [expressvpn.com/affiliates](https://www.expressvpn.com/affiliates) | Direct |
| Surfshark | [surfshark.com/affiliates](https://surfshark.com/affiliates) | Impact |
| Proton VPN | [proton.me/business/affiliates](https://proton.me/business/affiliates) | Direct |
| Mullvad | No affiliate program | — |
| PIA | [privateinternetaccess.com/affiliate](https://www.privateinternetaccess.com/affiliate) | CJ Affiliate |
| CyberGhost | Via Kape/Impact | Impact |
| Surfshark | surfshark.com/affiliates | Impact |

---

## Adding or updating VPN data

All VPN data lives in **`data/vpn-data.js`** (`VPN_RECORDS` array). Scoring logic is in **`data/scoring.js`**.

Each VPN is defined with `buildVPN({ ... })`. Example — to update NordVPN's price:

```js
buildVPN({
  id: "nordvpn",
  monthlyPrice: 3.39,  // ← change this
  // ...
})
```

### Adding a new VPN

1. Add a `buildVPN({})` entry to the `VPNS` array with all fields
2. Add the affiliate link to `AFFILIATE_LINKS` and `VPN_HOME_LINKS`
3. Add savings data to `VPN_SAVINGS`
4. Add the anchor ID to `sitemap.xml`

### Score fields reference

```js
buildVPN({
  id:                    "vpnid",        // lowercase, no spaces
  name:                  "VPN Name",
  logoIcon:              "🛡️",
  tagline:               "Short tagline",
  realSpeedMbps:         892,            // Actual tested speed
  speedScore:            89,             // 0–100
  jurisdiction:          "Panama",       // Country of legal incorporation
  auditType:             "independent",  // "independent" | "self-published" | "none"
  auditFirm:             "Deloitte",
  warrantCanary:         true,
  ramServers:            true,
  acceptsCrypto:         true,
  privacyScore:          94,             // 0–100
  securityScore:         92,
  streamingScore:        95,
  streamingPlatforms:    ["Netflix","Hulu","Disney+"],
  valueScore:            88,
  ethicsScore:           85,
  appsScore:             100,
  platforms:             ["Windows","macOS","Linux","iOS","Android","Router"],
  simultaneousConnections: 10,           // or "unlimited"
  connectionsScore:      75,
  monthlyPrice:          3.39,           // Best long-term plan price per month
  moneyBackGuarantee:    "30 days",
  openSource:            false,
  nonProfit:             false,
  freePlan:              false,
  protocols:             ["NordLynx (WireGuard)","OpenVPN","IKEv2"],
  pros:                  ["...", "..."],
  cons:                  ["...", "..."],
  bestFor:               "Overall security & streaming",
  tags:                  ["streaming","wireguard","linux","under-5"]
})
```

### Tag reference (used by the filter system)

| Tag | Meaning |
|-----|---------|
| `streaming` | Good for unblocking streaming services |
| `torrenting` | P2P/torrenting support |
| `china` | Works in China |
| `gaming` | Low latency, good for gaming |
| `no-logs-audited` | No-logs policy independently verified |
| `ram-servers` | RAM-only server infrastructure |
| `wireguard` | WireGuard protocol support |
| `linux` | Native Linux app |
| `router` | Router firmware support |
| `open-source` | Open source codebase |
| `free-tier` | Has a free plan |
| `unlimited-devices` | Unlimited simultaneous connections |
| `independent-audit` | Audited by a named third party |
| `panama-jurisdiction` | Registered in Panama |
| `switzerland-jurisdiction` | Registered in Switzerland |
| `netflix` | Reliably unblocks Netflix |
| `under-3` | Under $3/month |
| `under-5` | Under $5/month |

---

## Scoring methodology

Composite weighted score (0–100):

```
Score = (Speed × 0.20) + (Privacy × 0.25) + (Security × 0.15)
      + (Streaming × 0.10) + (Value × 0.10) + (Ethics × 0.10)
      + (Apps × 0.05) + (Connections × 0.05)
```

The `calculateVPNScore()` function in `index.html` computes this automatically from the raw score fields. You do not need to set the composite score manually — it is always calculated live.

---

## Email capture setup

The email signup form in the homepage footer calls `submitEmail()`. Currently it logs signups to the browser console if no endpoint is configured.

To activate, set the `endpoint` variable in `submitEmail()`:

```js
const endpoint = ""; // ← paste your endpoint URL here
```

Recommended services:
- **[Formspree](https://formspree.io)** — paste the form endpoint URL, free tier handles 50 submissions/month
- **[Resend](https://resend.com)** — developer-friendly, reliable deliverability
- **[Mailchimp](https://mailchimp.com/developer/marketing/api/list-members/)** — if you want full list management
- **[ConvertKit](https://developers.convertkit.com)** — good for content creators

---

## SEO architecture

### On-page

- Each page has a unique `<title>`, `<meta name="description">`, and `<link rel="canonical">`
- H1 contains the primary keyword
- FAQPage JSON-LD schema on every page (FAQ accordion sections)
- BreadcrumbList schema on every landing page
- Homepage has: WebSite, Organization, WebPage (Speakable), FAQPage, HowTo, ItemList (top 10 VPNs), individual Review schemas for top 3

### AI / LLM discovery

- `llms.txt` — summary context file for AI crawlers (Perplexity, Claude, ChatGPT)
- `llms-full.txt` — full scoring data and methodology for AI research queries
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, anthropic-ai, Google-Extended
- Meta tags: `<meta name="ai-context">`, `<meta name="llms-version">`, link alternates to both llms files

### Sitemap

`sitemap.xml` covers:
- Homepage (priority 1.0)
- 8 landing pages (priority 0.8–0.9)
- Key homepage section anchors (priority 0.7–0.8)
- Individual VPN anchors for long-tail (priority 0.6)
- AI context files (priority 0.4)

Update `<lastmod>` dates whenever you make significant content changes.

### Internal linking

Every landing page links back to the homepage comparison table (`/`). The homepage nav links to Streaming, Gaming, and AI Tools pages. This creates a hub-and-spoke internal link structure — search authority flows both ways.

---

## Content roadmap

### Built ✓

| Page | Primary keyword | Status |
|------|----------------|--------|
| `index.html` | best VPN 2026 | Live |
| `best-vpn-for-netflix.html` | best VPN for Netflix 2026 | Live |
| `best-vpn-for-gaming.html` | best VPN for gaming 2026 | Live |
| `best-vpn-age-verification.html` | VPN bypass age verification UK | Live |
| `best-vpn-for-ai-tools.html` | best VPN for AI tools 2026 | Live |
| `best-vpn-for-privacy.html` | best VPN for privacy 2026 | Live |
| `best-vpn-for-china.html` | best VPN for China 2026 | Live |
| `cheapest-vpn.html` | cheapest VPN 2026 | Live |
| `best-vpn-for-travel.html` | best VPN for travel 2026 | Live |
| `best-vpn-for-torrenting.html` | best VPN for torrenting 2026 | Live |
| `best-vpn-for-remote-work.html` | best VPN for remote work 2026 | Live |
| `best-free-vpn.html` | best free VPN 2026 | Live |
| `nordvpn-review.html` | NordVPN review 2026 | Live |
| `expressvpn-review.html` | ExpressVPN review 2026 | Live |
| `nordvpn-vs-expressvpn.html` | NordVPN vs ExpressVPN | Live |

### To build next

| Page | Primary keyword | Priority |
|------|----------------|---------|
| `best-vpn-for-students.html` | best VPN for students | High |
| `surfshark-review.html` | Surfshark review 2026 | High |
| `protonvpn-review.html` | Proton VPN review 2026 | High |
| `nordvpn-vs-surfshark.html` | NordVPN vs Surfshark | Medium |
| `expressvpn-vs-surfshark.html` | ExpressVPN vs Surfshark | Medium |
| `vpn-for-uae.html` | VPN for UAE legal | Medium |
| `vpn-for-russia.html` | VPN for Russia 2026 | Medium |
| `best-vpn-android.html` | best VPN for Android | Medium |
| `best-vpn-iphone.html` | best VPN for iPhone | Medium |
| `best-vpn-firestick.html` | best VPN for Firestick | Medium |

Individual VPN review pages and head-to-head comparison pages are high-volume but competitive. Build them once the main landing pages start ranking.

---

## Monthly maintenance checklist

- [ ] Update VPN prices (check each affiliate dashboard)
- [ ] Update `<lastmod>` dates in sitemap.xml for changed pages
- [ ] Re-run streaming tests and update streaming scores
- [ ] Check affiliate link validity (programs occasionally change tracking URLs)
- [ ] Review Google Search Console for crawl errors and keyword data
- [ ] Update `llms-full.txt` with any score or price changes
- [ ] Check for new VPN audit publications (add to relevant VPN's data)

---

## Architecture notes

### Theme system

Light/dark mode uses CSS custom properties. The active theme is set on `<html data-theme="dark|light">` by an anti-flash inline script in `<head>` that reads `localStorage("vpn-theme")` before any CSS renders. This eliminates the flash-of-wrong-theme on page load.

To change a colour globally, update the CSS variable in `:root` (light) and `[data-theme="dark"]`. Every element that uses `var(--accent-green)` etc. updates automatically.

### Scoring engine

`calculateVPNScore(vpn)` in `index.html` applies the weighted formula and returns a 0–100 integer. It runs once at page load for each VPN. Scores are cached in the `VPNS` array as `vpn.weightedScore`.

### Affiliate link fallback chain

```
affiliateHref(id):
  1. Check AFFILIATE_LINKS[id]
  2. If it contains "YOUR_ID" → use VPN_HOME_LINKS[id] instead
  3. If neither exists → "#"
```

Once you replace `YOUR_ID` with a real tracking ID, step 1 succeeds and commission tracking activates. No other code changes needed.

---

## Legal

All VPN names and logos are trademarks of their respective owners. Score comparisons are editorial and based on independent testing methodology. Affiliate disclosure is present on every page (visible footer + `#disclosure` section on homepage).

This site complies with FTC guidelines on affiliate disclosure. The `rel="sponsored"` attribute is present on all affiliate links.

---

*Last updated: June 2026*
