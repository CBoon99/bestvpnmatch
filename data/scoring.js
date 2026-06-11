/**
 * Weighted editorial scoring — see DATA-SOURCES.md for methodology
 */
function buildVPN(p) {
  const [savingsPct, regularPrice] = VPN_SAVINGS[p.id] || [0, p.monthlyPrice || 4.99];
  return {
    id: p.id,
    name: p.name,
    savingsPct,
    regularPrice,
    logoIcon: p.logoIcon || "🛡️",
    tagline: p.tagline || "",
    speedScore: p.speedScore || 80,
    jurisdiction: p.jurisdiction || "USA",
    auditType: p.auditType || "none",
    auditFirm: p.auditFirm || "",
    noLogPolicy: p.noLogPolicy !== false,
    warrantCanary: p.warrantCanary || false,
    ramServers: p.ramServers || false,
    acceptsCrypto: p.acceptsCrypto || false,
    privacyScore: p.privacyScore || 70,
    securityScore: p.securityScore || 75,
    streamingScore: p.streamingScore || 70,
    streamingPlatforms: p.streamingPlatforms || [],
    valueScore: p.valueScore || 75,
    ethicsScore: p.ethicsScore || 70,
    appsScore: p.appsScore || 85,
    platforms: p.platforms || ["Windows", "macOS", "iOS", "Android"],
    simultaneousConnections: p.simultaneousConnections ?? 5,
    connectionsScore: p.connectionsScore || 60,
    monthlyPrice: p.monthlyPrice || 4.99,
    moneyBackGuarantee: p.moneyBackGuarantee || "30 days",
    bestPlan: p.bestPlan || "1-year",
    parentCompany: p.parentCompany || "Unknown",
    founderBackground: p.founderBackground || "unknown",
    pastBreaches: p.pastBreaches || "none",
    openSource: p.openSource || false,
    nonProfit: p.nonProfit || false,
    protocols: p.protocols || ["OpenVPN", "WireGuard"],
    pros: p.pros || ["Solid all-round performance"],
    cons: p.cons || ["Verify latest pricing on provider site"],
    bestFor: p.bestFor || "General use",
    affiliateLink: affiliateHref(p.id),
    freePlan: p.freePlan || false,
    tags: p.tags || [],
    sources: p.sources || {},
    affiliatePartnered: p.affiliatePartnered || false,
    weightedScore: 0,
    ranking: 0
  };
}

function calculateVPNScore(v) {
  const w = { speed:0.20, privacy:0.25, security:0.15, streaming:0.10, value:0.10, ethics:0.10, apps:0.05, connections:0.05 };
  return Math.round(
    v.speedScore * w.speed + v.privacyScore * w.privacy + v.securityScore * w.security +
    v.streamingScore * w.streaming + v.valueScore * w.value + v.ethicsScore * w.ethics +
    v.appsScore * w.apps + v.connectionsScore * w.connections
  );
}

function enrichVPNs(list) {
  list.forEach(v => { v.weightedScore = calculateVPNScore(v); v.affiliateLink = affiliateHref(v.id); });
  list.sort((a, b) => b.weightedScore - a.weightedScore || a.name.localeCompare(b.name));
  list.forEach((v, i) => { v.ranking = i + 1; });
  return list;
}
