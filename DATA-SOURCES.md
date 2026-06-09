# Data sources & honesty policy — Best VPN Match

**Last verified:** 2026-06-09

## What our scores represent

Scores on this site are **editorial**, not results of our own lab speed tests. Each VPN receives a **weighted score (0–100)** calculated from eight categories using **public, verifiable information**:

| Category | Weight | Sources |
|----------|--------|---------|
| Speed | 20% | Protocol support (WireGuard/Lightway etc.), provider reputation, published benchmarks where cited |
| Privacy | 25% | Jurisdiction, no-logs policy, independent audit reports, warrant canary, RAM-only servers |
| Security | 15% | Encryption, protocols, kill switch, leak protection features listed by provider |
| Streaming | 10% | Documented streaming support, community reports, provider marketing (conservative scoring) |
| Value | 10% | Published long-term plan pricing on official sites |
| Ethics | 10% | Ownership transparency, audit history, known incidents (KAPE-style framework) |
| Apps | 5% | Platform list from official app pages |
| Connections | 5% | Published simultaneous device limits |

**We do not claim to have run 10,000+ speed tests or hands-on streaming tests unless a page explicitly states a first-party test.**

## Pricing

- Prices shown are **from provider websites** on the last verified date above.
- Promotional “was/now” pricing uses published list vs deal prices where available.
- **Always confirm** the current price on the provider’s site before buying.

## Outbound links

- **`affiliateActive: false`** (current): every CTA links to the **official provider homepage** (`data/site-config.js` → `VPN_HOME_LINKS`).
- When affiliate programs are approved, set `affiliateActive: true` and add URLs to `AFFILIATE_LINKS` in the same file.

## Updating data

1. Edit records in `data/vpn-data.js`
2. Update `SITE_CONFIG.dataLastVerified` in `data/site-config.js`
3. Update this file and `llms-full.txt`
4. Update `<lastmod>` in `sitemap.xml`

## Rankings tie-break

When two VPNs share the same weighted score, rank order is alphabetical by name (stable sort).
