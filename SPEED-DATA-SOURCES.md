# VPN Speed Data Sources — Best VPN Match

**Status:** Research phase complete. Selected sources are public, verifiable, and meet the criteria in [/methodology](/methodology) and [/DATA-SOURCES.md](/DATA-SOURCES.md).

**Goal:** Replace undocumented `realSpeedMbps` values in `data/vpn-data.js` with traceable daily/periodic averages from independent published benchmarks. Every value must be backed by ≥2 sources. Full provenance logged.

**Date of this research:** 2026-06-22

## Selected 5 Sources

All 5:
- Publish actual measured speeds (Mbps or % loss convertible to performance metrics)
- Test major VPN providers (NordVPN, ExpressVPN, Surfshark, Proton VPN, Mullvad, CyberGhost, PIA, Ivacy + others)
- Prioritize or test modern protocols including WireGuard (and equivalents like NordLynx/Lightway)
- Are from reputable independent outlets with long track records (not one-off or paywalled reviews)
- Document their testing methodology publicly
- Are updated on a recurring basis (weeks/months, suitable for periodic automation)

### 1. PCMag (Primary lab benchmark source)
- **URLs for fetching:**
  - Main: https://www.pcmag.com/picks/the-best-vpn-services
  - Fastest VPN roundups: https://uk.pcmag.com/vpn/87737/the-fastest-vpns (or US equivalent)
- **Methodology (documented):** 10 baseline tests + 10 tests per VPN on the "fastest/closest" server using custom Ookla Speedtest tool (same tech as speedtest.net). Use **median**. Report % decrease in download and upload speeds, % increase in latency.
- **Example recent data (May 2026):** NordVPN: -1.94% download, -5.54% upload. IPVanish strong performer.
- **VPN coverage:** Excellent for majors (NordVPN frequently tops recent tests). Recurring lab testing (10+ years history).
- **Why chosen:** Highest credibility for rigorous, repeatable, median-based lab methodology. Widely cited.
- **Automation notes:** % change is reliable signal. Convert % loss to retention (100 + %change). Update frequency: periodic roundups.
- **Limitations:** Rarely publishes raw absolute Mbps (focuses on % impact); test location is PCMag lab (US-centric).

### 2. Tom's Guide
- **URL:** https://www.tomsguide.com/best-picks/best-vpn (updated frequently, e.g. June 2026)
- **Methodology:** Hands-on testing on high-bandwidth lines (recent tests used 10 Gbps connection). Reports peak and average Mbps for closest servers and distant (e.g. US from UK). Notes protocol used.
- **Example recent data:** NordVPN ~1,256 Mbps (closest on 10Gbps line), peaks >1,100 Mbps. ExpressVPN and Proton VPN showed peaks of 1,479 Mbps and 1,521 Mbps in same round. Surfshark and PIA covered in rankings.
- **VPN coverage:** Strong on NordVPN, Surfshark, ExpressVPN, Proton VPN, PIA.
- **Why chosen:** Publishes concrete Mbps numbers on modern connections. Frequent updates. Good real-world context.
- **Automation notes:** Parse for specific "Mbps" mentions near provider names. Date the article.
- **Limitations:** Absolute numbers depend on their test line speed (use as relative or normalize).

### 3. Security.org (Excellent for explicit Mbps tables + Ivacy/PIA coverage)
- **URL:** https://www.security.org/vpn/speed-test/ (dedicated results page, last major update Feb 2026)
- **Methodology:** 10 runs per VPN using Ookla Speedtest. Average download/upload (Mbps) and ping vs their baseline. Explicit % difference. Detailed explanation of process and variables (time of day, server distance).
- **Example data (their baseline ~94 Mbps):**
  - NordVPN: 89.11 Mbps download (-5.78%)
  - PureVPN top overall
  - IPVanish, Proton, PIA, Ivacy (90.24 Mbps dl), ExpressVPN (87.48), CyberGhost, Surfshark all have explicit rows.
- **VPN coverage:** One of the best for breadth including Ivacy, PIA, CyberGhost, Hotspot Shield alongside majors.
- **Why chosen:** Direct Mbps numbers in tables, transparent % vs baseline, covers task-listed providers well. Easy to parse tables.
- **Automation notes:** Tables are parse-friendly. Good source for lower-tier and budget VPNs.
- **Limitations:** Test baseline relatively modest (~94 Mbps); older snapshot than some 2026 roundups.

### 4. CNET
- **URL:** https://www.cnet.com/tech/services-and-software/fastest-vpn/ (and best-vpn roundups)
- **Methodology:** Extensive controlled testing — 252+ individual speed tests per VPN (3 rounds across 6 global locations: NY, UK, AU, FR, DE, SG) on Windows/Mac. Multiple baseline measurements. Reports average **% download speed loss**.
- **Example 2025/2026 data:**
  - NordVPN: 3% loss (fastest they tested)
  - Proton VPN: 16%
  - ExpressVPN: 18%
  - Surfshark: 21%
  - Mullvad: 24%
- **VPN coverage:** Strong focus on top-tier: Nord, Proton, Express, Surfshark, Mullvad.
- **Why chosen:** Large sample size, multi-location, % loss is consistent metric. Highly cited outlet.
- **Automation notes:** Look for the "fastest VPN speeds compared" table or inline % numbers.
- **Limitations:** % loss only (no raw Mbps). Recent article focuses on top 5.

### 5. RTINGS.com
- **URL:** https://www.rtings.com/vpn (individual reviews + results tables); methodology: https://www.rtings.com/vpn/learn/how-we-test
- **Methodology:** Ongoing automated tests on VPS (Linux/Windows). Multiple runs per day to Speedtest.net servers in US East/West, London, Sydney. Averages performance over past 3 months for download speed, upload, latency. Publishes specific Mbps numbers in reviews.
- **Example:** ExpressVPN reviews show concrete numbers (e.g. baseline 1,162 Mbps → 260 Mbps with VPN in one test snapshot). Mullvad often scores well on speed/latency balance.
- **VPN coverage:** Good for Mullvad, ExpressVPN and others with in-depth pages.
- **Why chosen:** Continuous/averaged data (less snapshot bias), fully documented ongoing methodology, specific Mbps diffs published.
- **Automation notes:** Good for long-term stability signal. Parse review pages or results tables.
- **Limitations:** Not every VPN has equally fresh full pages; focus on depth over breadth.

## Coverage Mapping (Majors from vpn-data.js)

VPNs with current `realSpeedMbps` (partial extract):
- NordVPN: 892 → well covered (PCMag top, Tom's high Mbps, Security.org, CNET 3%)
- ExpressVPN: 932 → Tom's, CNET 18%, RTINGS, Security.org
- Surfshark: 876 → Tom's, CNET 21%, Security.org
- Proton VPN: 412 → CNET 16%, Tom's peaks, Security.org
- Mullvad: 845 → CNET 24%, RTINGS, Wirecutter-adjacent
- Ivacy: 398 → Strongest in Security.org; spot reviews elsewhere

**Gaps:** 
- Smaller providers (e.g. Ivacy) may rely more heavily on Security.org + occasional reviews → aim for ≥2 when possible or note.
- Absolute Mbps vary wildly by test line (10 Gbps tests give 1000+ Mbps; modest baselines give ~90). Script will record raw + normalized retention %.

## Data Collection Strategy

### Fetching
- Periodic (daily or every 2-3 days via cron). Most sources update reviews on a weeks/months cadence.
- Use polite fetching (User-Agent, respect robots where possible, retry with backoff).
- Store source article/publication date alongside value.

### Normalization Preference (updated per requirements)
- Bias toward **retention %** (speed as % of baseline or advertisedSpeedMbps).
- Rationale: Your existing methodology derives part of speed from (realSpeedMbps / advertisedSpeedMbps) × 100. Retention % is the most comparable metric across VPNs with different advertised speeds.
- In JSON: Always store **raw** measured values (absolute Mbps or exact % loss string) + computed `retentionPercent` for full audit trail.
- For `realSpeedMbps` in `data/vpn-data.js`: You can keep or set a representative "effective Mbps" number for UI/display (historical style ~400-950 range). The **primary signal for speedScore should come from the median retention %**.

### Averaging Formula
1. Per source extract raw + compute retentionPercent:
   - % loss source → retention = 100 - |reported loss %|
   - Absolute Mbps + known advertised → retention = (reported / advertised) * 100
   - Absolute without advertised → record raw Mbps only + note "use for relative ranking".
2. Per VPN: **median retentionPercent** (or median raw when retention not computable).
3. Weight recent data higher if dates available.
4. Fallback if fewer than 2 sources: log clearly, fall back conservatively to protocol + server scale.
5. Log full provenance for every number.

### Mapping to speedScore (0-100)
Use retention heavily:

```js
// Per VPN
const hasModernProtocol = /* WireGuard or NordLynx or Lightway */;
const serverTierBonus = serverCount >= 6000 ? 10 : serverCount >= 3000 ? 6 : serverCount >= 1000 ? 3 : 0;

let speedScore = 55;
if (hasModernProtocol) speedScore += 20;
speedScore += serverTierBonus;

// Benchmark: median retention % → percentile or direct
const medianRetention = ...; // 0-100 from the 5 sources
const benchBonus = Math.round( (medianRetention - 70) / 2 ); // example scaling, tune
speedScore += Math.max(0, Math.min(15, benchBonus));

speedScore = Math.max(40, Math.min(100, Math.round(speedScore)));
```

Document the exact thresholds used when you implement.

### Mapping to speedScore (0-100)
Current editorial speedScore already incorporates protocol + scale + benchmark reputation.

**Proposed explicit formula** (to be implemented in scoring or script helper):

```js
// Inputs per VPN from data + benchmarks
const hasModernProtocol = protocols.includes('WireGuard') || protocols.some(p => ['NordLynx', 'Lightway'].includes(p)); // + base
const serverCount = ... // from provider or known tiers
const avgRetention = calculateMedianRetention(...) // from the 5 sources (0-100, higher better)
const benchmarkPercentile = percentileRank(avgRetention across all VPNs) // 0-1 or 0-100

let speedScore = 55; // baseline for functional VPN

if (hasModernProtocol) speedScore += 20; // WireGuard or equivalent (per methodology)
if (serverCount >= 6000) speedScore += 10;
else if (serverCount >= 3000) speedScore += 6;
else if (serverCount >= 1000) speedScore += 3;

// Benchmark component (up to +15)
speedScore += Math.round(benchmarkPercentile * 15);

// Minor adjustments for consistency with existing (cap/floor)
speedScore = Math.max(40, Math.min(100, Math.round(speedScore)));
```

**Thresholds & justification (documented):**
- Modern protocol bonus: Matches methodology emphasis on WireGuard as current performance benchmark.
- Server scale tiers: Proxy for load distribution (public counts from provider sites).
- Benchmark percentile: Direct signal from the aggregated public tests.
- Keeps scores in line with existing editorial (Express ~93, Nord ~89, Surfshark ~88).

Exact implementation can live in `data/scoring.js` or a helper. Changes will be versioned.

## Logging & Provenance Requirements (for script)
- For every run: `data/speed-benchmarks.json` contains:
  - `lastUpdated`
  - Per VPN: `realSpeedMbps`, `speedSourcesUsed: ["PCMag", "Tom's Guide", ...]`
  - `sourcesDetail`: array of {source, url, rawValue, metricType, publishedDate, fetchedDate}
  - `notes`: "Median of 4 sources. PCMag and CNET provided % loss converted to retention."
- Failures logged (source unavailable, no match for VPN, parse error).
- Never fabricate data.

## Next Steps & Automation
- Script: `scripts/fetch-speed-benchmarks.js` (Node.js recommended for consistency).
- Cron example: `0 6 * * * cd /path/to/site && node scripts/fetch-speed-benchmarks.js >> logs/speed-fetch.log 2>&1`
- After fetch: review JSON, run update to `data/vpn-data.js`, update `SITE_CONFIG.dataLastVerified`, commit with sources cited.
- Error handling: retries (3x exponential), continue on partial failures, clear documentation of missing data.

## Open Questions / Caveats
- Normalization of Mbps across wildly different test conditions (we log raw + method).
- Some sources are more "review articles" than live APIs → scraping selectors will need maintenance.
- Not every one of the 15 VPNs will have data from all 5 every run. Target minimum 2.

This selection satisfies "public, verifiable", "independent and widely cited", "multiple protocols", "stable", and "documented methodology".

---

**References (screenshots/exports of methodology pages taken during research):** See tool logs for browsed content from PCMag, Tom's Guide, Security.org, CNET, RTINGS, bestvpnmatch.com/methodology, and DATA-SOURCES.md.