/**
 * Best VPN Match — shared configuration (single source of truth for links)
 * Set affiliateActive: true and fill AFFILIATE_LINKS when programs are approved.
 */
const SITE_CONFIG = {
  affiliateActive: false,
  dataLastVerified: "2026-06-09",
  siteUrl: "https://bestvpnmatch.com",
  siteName: "Best VPN Match"
};

/** Real affiliate tracking URLs — empty until you join each program */
const AFFILIATE_LINKS = {};

/** Official provider homepages (used while affiliateActive is false) */
const VPN_HOME_LINKS = {
  nordvpn: "https://nordvpn.com",
  expressvpn: "https://www.expressvpn.com",
  surfshark: "https://surfshark.com",
  protonvpn: "https://protonvpn.com",
  mullvad: "https://mullvad.net",
  ivacy: "https://www.ivacy.com",
  cyberghost: "https://www.cyberghostvpn.com",
  pia: "https://www.privateinternetaccess.com",
  windscribe: "https://windscribe.com",
  hide_me: "https://hide.me",
  atlasvpn: "https://atlasvpn.com",
  ipvanish: "https://www.ipvanish.com",
  vyprvpn: "https://www.vyprvpn.com",
  privatevpn: "https://privatevpn.com",
  tunnelbear: "https://www.tunnelbear.com",
  hotspotshield: "https://www.hotspotshield.com",
  astrill: "https://www.astrill.com"
};

/** Skipped by scripts/check_links.py — document reason; remove VPN from data when ready */
const LINK_CHECK_EXEMPT = {
  atlasvpn: "Atlas VPN discontinued (2024); domain offline — pending removal from comparison"
};

/** [savingsPct, regularMonthlyPrice] — verify on provider sites; last checked SITE_CONFIG.dataLastVerified */
const VPN_SAVINGS = {
  nordvpn: [63, 11.99],
  expressvpn: [49, 12.95],
  surfshark: [82, 12.95],
  protonvpn: [50, 9.99],
  mullvad: [0, 5.00],
  ivacy: [90, 11.99],
  cyberghost: [82, 12.99],
  pia: [83, 11.99],
  windscribe: [50, 9.00],
  hide_me: [58, 9.99],
  atlasvpn: [83, 10.99],
  ipvanish: [72, 10.99],
  vyprvpn: [50, 10.00],
  privatevpn: [85, 11.99],
  tunnelbear: [50, 9.99],
  hotspotshield: [75, 12.99]
};

function affiliateHref(id) {
  const aff = AFFILIATE_LINKS[id];
  if (SITE_CONFIG.affiliateActive && aff) return aff;
  return VPN_HOME_LINKS[id] || "#";
}

function outboundRel() {
  return SITE_CONFIG.affiliateActive ? "noopener sponsored" : "noopener noreferrer";
}

function outboundLabel() {
  return SITE_CONFIG.affiliateActive ? "Affiliate link" : "Official site";
}
