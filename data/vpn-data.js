/**
 * VPN catalogue — editorial scores from public audits, features, jurisdiction & pricing
 * Last verified: see SITE_CONFIG.dataLastVerified
 *
 * sources field: maps 1:1 to the 8 scoring categories. Each value is either:
 *   - A URL string pointing to the specific public document that justifies that category's score
 *   - null where no single primary source exists (score derived from multiple signals)
 * See /methodology for the full rubric and what each category measures.
 */
const VPN_RECORDS = [
  {
    id:"nordvpn", name:"NordVPN", logoIcon:'<img src="/assets/provider-logos/nordvpn.svg" alt="NordVPN" class="provider-logo">', tagline:"The all-around security suite",
    advertisedSpeedMbps:1000, realSpeedMbps:892, speedScore:89,
    jurisdiction:"Panama", auditType:"independent", auditFirm:"Deloitte",
    warrantCanary:true, ramServers:true, acceptsCrypto:true,
    privacyScore:94, securityScore:92, streamingScore:95,
    streamingPlatforms:["Netflix","Hulu","Disney+","BBC iPlayer","Amazon Prime","HBO Max"],
    valueScore:88, ethicsScore:85, appsScore:100,
    platforms:["Windows","macOS","Linux","iOS","Android","Android TV","Fire TV","Router"],
    simultaneousConnections:10, connectionsScore:75,
    monthlyPrice:3.39, parentCompany:"Nord Security",
    founderBackground:"transparent", pastBreaches:"none",
    protocols:["NordLynx (WireGuard)","OpenVPN","IKEv2"],
    pros:["Massive server network","Excellent security features","Great for streaming","24/7 live chat"],
    cons:["Desktop app can be slow","Pricier than budget options"],
    bestFor:"Overall security & streaming",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://nordvpn.com/blog/nordvpn-audit/",         // Deloitte no-logs audit
      speed:     "https://nordvpn.com/blog/nordlynx-protocol-wireguard/", // NordLynx protocol
      security:  "https://nordvpn.com/features/advanced-security/",
      streaming: "https://nordvpn.com/features/streaming/",
      value:     "https://nordvpn.com/pricing/",
      ethics:    "https://nordvpn.com/about-us/",
      apps:      "https://nordvpn.com/download/",
      connections:"https://nordvpn.com/pricing/"
    },
    tags:["streaming","torrenting","china","gaming","no-logs-audited","ram-servers","wireguard","linux","router","independent-audit","panama-jurisdiction","netflix","under-5"]
  },
  {
    id:"expressvpn", name:"ExpressVPN", logoIcon:'<img src="/assets/provider-logos/expressvpn.svg" alt="ExpressVPN" class="provider-logo">', tagline:"Speed and simplicity",
    realSpeedMbps:932, speedScore:93,
    jurisdiction:"British Virgin Islands", auditType:"independent", auditFirm:"KPMG",
    privacyScore:96, securityScore:90, streamingScore:98,
    valueScore:82, ethicsScore:88, appsScore:95,
    simultaneousConnections:8, connectionsScore:70,
    monthlyPrice:6.67,
    protocols:["Lightway","OpenVPN","IKEv2"],
    pros:["Lightning fast","Works in China","Simple apps","TrustedServer tech"],
    cons:["Expensive","Only 8 connections","No ad blocker"],
    bestFor:"Speed & streaming",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://www.expressvpn.com/blog/expressvpn-security-audit/", // KPMG audit
      speed:     "https://www.expressvpn.com/blog/expressvpn-lightway-protocol/",
      security:  "https://www.expressvpn.com/features/trusted-server",
      streaming: "https://www.expressvpn.com/vpn-service/video-streaming",
      value:     "https://www.expressvpn.com/order",
      ethics:    "https://www.kape.com/",                             // KAPE parent company
      apps:      "https://www.expressvpn.com/vpn-software",
      connections:"https://www.expressvpn.com/order"
    },
    tags:["streaming","china","gaming","no-logs-audited","ram-servers","wireguard","linux","router","independent-audit","netflix","under-5"]
  },
  {
    id:"surfshark", name:"Surfshark", logoIcon:'<img src="/assets/provider-logos/surfshark.svg" alt="Surfshark" class="provider-logo">', tagline:"Unlimited devices, premium features",
    realSpeedMbps:876, speedScore:88,
    jurisdiction:"Netherlands", auditType:"independent",
    privacyScore:89, securityScore:88, streamingScore:92,
    valueScore:94, ethicsScore:82, appsScore:100,
    simultaneousConnections:"unlimited", connectionsScore:100,
    monthlyPrice:2.19,
    protocols:["WireGuard","OpenVPN","IKEv2"],
    pros:["Unlimited connections","Very affordable","CleanWeb ad blocker"],
    cons:["Netherlands jurisdiction","Slower than ExpressVPN"],
    bestFor:"Families on a budget",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://surfshark.com/security/audit",
      speed:     "https://surfshark.com/blog/wireguard-vpn",
      security:  "https://surfshark.com/features/vpn-security",
      streaming: "https://surfshark.com/features/streaming",
      value:     "https://surfshark.com/pricing",
      ethics:    "https://surfshark.com/about-us",
      apps:      "https://surfshark.com/download",
      connections:"https://surfshark.com/pricing"
    },
    tags:["streaming","torrenting","no-logs-audited","ram-servers","wireguard","unlimited-devices","linux","router","independent-audit","netflix","under-3","under-5"]
  },
  {
    id:"protonvpn", name:"Proton VPN", logoIcon:'<img src="/assets/provider-logos/protonvpn.svg" alt="Proton VPN" class="provider-logo">', tagline:"Privacy by default",
    advertisedSpeedMbps:500, realSpeedMbps:412, speedScore:82,
    jurisdiction:"Switzerland", auditType:"independent", auditFirm:"Securitum",
    privacyScore:98, securityScore:91, streamingScore:75,
    valueScore:85, ethicsScore:95, appsScore:95,
    simultaneousConnections:10, connectionsScore:75,
    monthlyPrice:4.99, openSource:true, nonProfit:true, freePlan:true,
    protocols:["WireGuard","OpenVPN","Stealth"],
    pros:["Swiss privacy laws","Free tier","Secure Core","Open source"],
    cons:["Free tier is slow","Limited streaming"],
    bestFor:"Maximum privacy",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://proton.me/blog/proton-vpn-security-audit",  // Securitum audit
      speed:     "https://proton.me/support/wireguard",
      security:  "https://proton.me/vpn/security-features",
      streaming: "https://proton.me/support/streaming-services-vpn",
      value:     "https://proton.me/pricing/vpn",
      ethics:    "https://proton.me/about",                            // non-profit Swiss foundation
      apps:      "https://proton.me/vpn/download",
      connections:"https://proton.me/pricing/vpn"
    },
    tags:["torrenting","no-logs-audited","open-source","free-tier","wireguard","linux","router","independent-audit","switzerland-jurisdiction","under-5"]
  },
  {
    id:"mullvad", name:"Mullvad", logoIcon:'<img src="/assets/provider-logos/mullvad.svg" alt="Mullvad" class="provider-logo">', tagline:"Anonymous signup",
    realSpeedMbps:845, speedScore:85,
    jurisdiction:"Sweden", auditType:"independent", auditFirm:"Cure53",
    privacyScore:95, securityScore:94, streamingScore:60,
    valueScore:75, ethicsScore:98, appsScore:90,
    simultaneousConnections:5, connectionsScore:60,
    monthlyPrice:5.00, acceptsCrypto:true, openSource:true,
    protocols:["WireGuard","OpenVPN"],
    pros:["Anonymous signup","Cash & crypto payments","Open source"],
    cons:["Not great for streaming","No live chat"],
    bestFor:"Privacy purists",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://mullvad.net/en/blog/cure53-vpn-client-audit",
      speed:     "https://www.wireguard.com/",
      security:  "https://mullvad.net/en/help/category/technical",
      streaming: null,                                                  // Streaming not a focus — no primary source
      value:     "https://mullvad.net/en/pricing",
      ethics:    "https://mullvad.net/en/about",
      apps:      "https://mullvad.net/en/download",
      connections:"https://mullvad.net/en/pricing"
    },
    tags:["torrenting","no-logs-audited","open-source","wireguard","linux","router","independent-audit","under-5"]
  },
  {
    id:"ivacy", name:"Ivacy", logoIcon:'<img src="/assets/provider-logos/ivacy.svg" alt="Ivacy" class="provider-logo">', tagline:"Budget streaming specialist",
    advertisedSpeedMbps:500, realSpeedMbps:398, speedScore:80,
    jurisdiction:"Singapore", auditType:"none",
    privacyScore:65, securityScore:72, streamingScore:88,
    valueScore:92, ethicsScore:60, appsScore:85,
    simultaneousConnections:10, connectionsScore:75,
    monthlyPrice:1.16,
    protocols:["OpenVPN","IKEv2"],
    pros:["Very cheap","Good for streaming","10 connections"],
    cons:["No independent audit","Singapore jurisdiction"],
    bestFor:"Budget streaming",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://www.ivacy.com/privacy-policy/",
      speed:     null,
      security:  "https://www.ivacy.com/vpn-features/",
      streaming: "https://www.ivacy.com/streaming-vpn/",
      value:     "https://www.ivacy.com/pricing/",
      ethics:    null,
      apps:      "https://www.ivacy.com/vpn-apps/",
      connections:"https://www.ivacy.com/pricing/"
    },
    tags:["streaming","torrenting","linux","router","netflix","under-3","under-5"]
  },
  {
    id:"cyberghost", name:"CyberGhost", logoIcon:'<img src="/assets/provider-logos/cyberghost.svg" alt="CyberGhost" class="provider-logo">', tagline:"Streaming-optimized servers",
    jurisdiction:"Romania", auditType:"self-published",
    privacyScore:75, speedScore:83, securityScore:80, streamingScore:94,
    valueScore:86, ethicsScore:70, appsScore:88,
    simultaneousConnections:7, connectionsScore:65,
    monthlyPrice:2.19,
    protocols:["WireGuard","OpenVPN"],
    pros:["Streaming servers","Beginner friendly"],
    cons:["Self-published audit only","KAPE owned"],
    bestFor:"Streaming beginners",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://www.cyberghostvpn.com/en_US/blog/transparency-report/",
      speed:     "https://www.cyberghostvpn.com/en_US/blog/wireguard-explained/",
      security:  "https://www.cyberghostvpn.com/en_US/vpn-features/",
      streaming: "https://www.cyberghostvpn.com/en_US/streaming-vpn/",
      value:     "https://www.cyberghostvpn.com/en_US/vpn-plan/",
      ethics:    "https://www.kape.com/",                              // KAPE parent
      apps:      "https://www.cyberghostvpn.com/en_US/vpn-app/",
      connections:"https://www.cyberghostvpn.com/en_US/vpn-plan/"
    },
    tags:["streaming","wireguard","linux","router","netflix","under-3","under-5"]
  },
  {
    id:"pia", name:"Private Internet Access", logoIcon:'<img src="/assets/provider-logos/pia.svg" alt="Private Internet Access" class="provider-logo">', tagline:"Open source, proven no-logs",
    jurisdiction:"USA", auditType:"independent",
    privacyScore:82, speedScore:87, securityScore:91, streamingScore:78,
    valueScore:89, ethicsScore:75, appsScore:90,
    simultaneousConnections:"unlimited", connectionsScore:100,
    monthlyPrice:2.19, openSource:true,
    protocols:["WireGuard","OpenVPN"],
    pros:["Open source","Unlimited devices","Proven in court"],
    cons:["US jurisdiction","KAPE owned"],
    bestFor:"Torrenting & unlimited devices",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://www.privateinternetaccess.com/blog/pia-has-never-provided-user-logs-to-any-third-party-ever/",
      speed:     "https://www.wireguard.com/",
      security:  "https://www.privateinternetaccess.com/vpn-features",
      streaming: "https://www.privateinternetaccess.com/pages/streaming-vpn",
      value:     "https://www.privateinternetaccess.com/buy-vpn-online",
      ethics:    "https://www.kape.com/",                              // KAPE parent
      apps:      "https://www.privateinternetaccess.com/download",
      connections:"https://www.privateinternetaccess.com/buy-vpn-online"
    },
    tags:["streaming","torrenting","no-logs-audited","open-source","wireguard","unlimited-devices","linux","router","independent-audit","under-3","under-5"]
  },
  {
    id:"windscribe", name:"Windscribe", logoIcon:'<img src="/assets/provider-logos/windscribe.svg" alt="Windscribe" class="provider-logo">', tagline:"Generous free tier",
    jurisdiction:"Canada", auditType:"independent",
    privacyScore:85, speedScore:79, securityScore:83, streamingScore:72,
    valueScore:90, ethicsScore:80, appsScore:85,
    simultaneousConnections:"unlimited", connectionsScore:100,
    monthlyPrice:5.75, freePlan:true, openSource:true,
    protocols:["WireGuard","OpenVPN"],
    pros:["Free tier","Build-a-Plan pricing","R.O.B.E.R.T. blocker"],
    cons:["Streaming hit-or-miss"],
    bestFor:"Custom budget plans",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://windscribe.com/privacy",
      speed:     "https://windscribe.com/blog/wireguard",
      security:  "https://windscribe.com/features",
      streaming: null,
      value:     "https://windscribe.com/upgrade",
      ethics:    "https://windscribe.com/about",
      apps:      "https://windscribe.com/download",
      connections:"https://windscribe.com/upgrade"
    },
    tags:["torrenting","no-logs-audited","open-source","free-tier","wireguard","unlimited-devices","linux","router","independent-audit","under-5"]
  },
  {
    id:"hide_me", name:"hide.me", logoIcon:'<img src="/assets/provider-logos/hide_me.svg" alt="hide.me" class="provider-logo">', tagline:"Free tier with no logs",
    jurisdiction:"Malaysia", auditType:"independent",
    privacyScore:92, speedScore:76, securityScore:85, streamingScore:65,
    valueScore:84, ethicsScore:85, appsScore:82,
    simultaneousConnections:10, connectionsScore:75,
    monthlyPrice:4.95, freePlan:true,
    protocols:["WireGuard","OpenVPN","SoftEther"],
    pros:["Malaysia jurisdiction","Free tier no logs"],
    cons:["Limited streaming"],
    bestFor:"Privacy with free option",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://hide.me/en/legal/privacy",
      speed:     "https://hide.me/en/blog/wireguard/",
      security:  "https://hide.me/en/features",
      streaming: null,
      value:     "https://hide.me/en/pricing",
      ethics:    "https://hide.me/en/about",
      apps:      "https://hide.me/en/software",
      connections:"https://hide.me/en/pricing"
    },
    tags:["no-logs-audited","free-tier","wireguard","linux","router","independent-audit","under-5"]
  },
  {
    id:"ipvanish", name:"IPVanish", logoIcon:'<img src="/assets/provider-logos/ipvanish.svg" alt="IPVanish" class="provider-logo">', tagline:"Owns its server network",
    jurisdiction:"USA", auditType:"none",
    privacyScore:65, speedScore:86, securityScore:84, streamingScore:76,
    valueScore:80, ethicsScore:65, appsScore:82,
    simultaneousConnections:"unlimited", connectionsScore:100,
    monthlyPrice:3.33,
    protocols:["WireGuard","OpenVPN","IKEv2"],
    pros:["Owns servers","Unlimited connections","Fast"],
    cons:["No audit","US jurisdiction"],
    bestFor:"Speed with unlimited devices",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://www.ipvanish.com/privacy-policy/",
      speed:     "https://www.ipvanish.com/protocol/wireguard/",
      security:  "https://www.ipvanish.com/vpn-features/",
      streaming: null,
      value:     "https://www.ipvanish.com/pricing/",
      ethics:    "https://www.ziffmedia.com/",
      apps:      "https://www.ipvanish.com/software/",
      connections:"https://www.ipvanish.com/pricing/"
    },
    tags:["streaming","torrenting","wireguard","unlimited-devices","linux","router","under-5"]
  },
  {
    id:"vyprvpn", name:"VyprVPN", logoIcon:'<img src="/assets/provider-logos/vyprvpn.svg" alt="VyprVPN" class="provider-logo">', tagline:"Chameleon for restrictive networks",
    jurisdiction:"Switzerland", auditType:"self-published",
    privacyScore:88, speedScore:82, securityScore:88, streamingScore:70,
    valueScore:75, ethicsScore:78, appsScore:78,
    simultaneousConnections:5, connectionsScore:60,
    monthlyPrice:5.00,
    protocols:["Chameleon","WireGuard","OpenVPN"],
    pros:["Chameleon protocol","Swiss jurisdiction"],
    cons:["Only 5 connections","Self-published audit"],
    bestFor:"Censorship bypass",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://www.vyprvpn.com/blog/vyprvpn-no-log-audit",
      speed:     "https://www.vyprvpn.com/chameleon-vpn-protocol",
      security:  "https://www.vyprvpn.com/vpn-features",
      streaming: null,
      value:     "https://www.vyprvpn.com/pricing",
      ethics:    "https://www.golden-frog.com/",
      apps:      "https://www.vyprvpn.com/download",
      connections:"https://www.vyprvpn.com/pricing"
    },
    tags:["china","wireguard","linux","router","switzerland-jurisdiction","under-5"]
  },
  {
    id:"privatevpn", name:"PrivateVPN", logoIcon:'<img src="/assets/provider-logos/privatevpn.svg" alt="PrivateVPN" class="provider-logo">', tagline:"Small but mighty",
    jurisdiction:"Sweden", auditType:"none",
    privacyScore:72, speedScore:78, securityScore:80, streamingScore:88,
    valueScore:88, ethicsScore:70, appsScore:75,
    simultaneousConnections:10, connectionsScore:75,
    monthlyPrice:2.00,
    protocols:["OpenVPN","IKEv2"],
    pros:["Great streaming","Affordable"],
    cons:["No audit","Small network"],
    bestFor:"Streaming on a budget",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://privatevpn.com/privacy/",
      speed:     null,
      security:  "https://privatevpn.com/features",
      streaming: "https://privatevpn.com/streaming",
      value:     "https://privatevpn.com/pricing/",
      ethics:    null,
      apps:      "https://privatevpn.com/client/",
      connections:"https://privatevpn.com/pricing/"
    },
    tags:["streaming","linux","router","netflix","under-3","under-5"]
  },
  {
    id:"tunnelbear", name:"TunnelBear", logoIcon:'<img src="/assets/provider-logos/tunnelbear.svg" alt="TunnelBear" class="provider-logo">', tagline:"Simple and audited",
    jurisdiction:"Canada", auditType:"independent",
    privacyScore:85, speedScore:70, securityScore:82, streamingScore:55,
    valueScore:70, ethicsScore:82, appsScore:80,
    simultaneousConnections:5, connectionsScore:60,
    monthlyPrice:3.33, freePlan:true,
    protocols:["OpenVPN","IKEv2"],
    pros:["Beginner friendly","Independent audits","Free tier"],
    cons:["Slow speeds","Limited streaming"],
    bestFor:"VPN beginners",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://www.tunnelbear.com/privacy-policy",
      speed:     null,
      security:  "https://www.tunnelbear.com/blog/tunnelbear-7th-security-audit/",
      streaming: null,
      value:     "https://www.tunnelbear.com/account/",
      ethics:    "https://www.mcafee.com/",                            // McAfee-owned
      apps:      "https://www.tunnelbear.com/download",
      connections:"https://www.tunnelbear.com/account/"
    },
    tags:["no-logs-audited","free-tier","linux","independent-audit","under-5"]
  },
  {
    id:"hotspotshield", name:"Hotspot Shield", logoIcon:'<img src="/assets/provider-logos/hotspotshield.svg" alt="Hotspot Shield" class="provider-logo">', tagline:"Catapult Hydra speed",
    jurisdiction:"USA", auditType:"self-published",
    privacyScore:68, speedScore:91, securityScore:78, streamingScore:82,
    valueScore:75, ethicsScore:60, appsScore:75,
    simultaneousConnections:5, connectionsScore:60,
    monthlyPrice:2.99, freePlan:true,
    protocols:["Hydra","OpenVPN"],
    pros:["Very fast","Free tier"],
    cons:["US jurisdiction","Proprietary protocol"],
    bestFor:"Raw speed",
    affiliatePartnered: false,
    sources:{
      privacy:   "https://www.hotspotshield.com/privacy-policy/",
      speed:     "https://www.hotspotshield.com/technology/",
      security:  "https://www.hotspotshield.com/features/",
      streaming: null,
      value:     "https://www.hotspotshield.com/pricing/",
      ethics:    "https://www.aura.com/",
      apps:      "https://www.hotspotshield.com/vpn/",
      connections:"https://www.hotspotshield.com/pricing/"
    },
    tags:["streaming","gaming","free-tier","netflix","under-3","under-5"]
  }
];

let VPNS = VPN_RECORDS.map(buildVPN);
enrichVPNs(VPNS);
