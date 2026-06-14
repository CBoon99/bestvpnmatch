/* Matomo analytics - Best VPN Match */
(function () {
  "use strict";

  var trackerBase = "https://cyan-herring-490718.hostingersite.com/matomo/";
  var siteId = "1";
  var consentKey = "bestvpnmatch-analytics-cookie-consent";
  var accepted = "accepted";
  var essential = "essential";
  var _paq = window._paq = window._paq || [];
  var state = {
    loaded: false,
    loadError: false,
    queuedCommands: 0,
    trackedEvents: 0
  };

  var providerHosts = [
    ["nordvpn", "NordVPN", "nordvpn.com"],
    ["expressvpn", "ExpressVPN", "expressvpn.com"],
    ["surfshark", "Surfshark", "surfshark.com"],
    ["protonvpn", "Proton VPN", "protonvpn.com"],
    ["mullvad", "Mullvad", "mullvad.net"],
    ["ivacy", "Ivacy", "ivacy.com"],
    ["cyberghost", "CyberGhost", "cyberghostvpn.com"],
    ["pia", "Private Internet Access", "privateinternetaccess.com"],
    ["windscribe", "Windscribe", "windscribe.com"],
    ["hide_me", "hide.me", "hide.me"],
    ["ipvanish", "IPVanish", "ipvanish.com"],
    ["vyprvpn", "VyprVPN", "vyprvpn.com"],
    ["privatevpn", "PrivateVPN", "privatevpn.com"],
    ["tunnelbear", "TunnelBear", "tunnelbear.com"],
    ["hotspotshield", "Hotspot Shield", "hotspotshield.com"],
    ["astrill", "Astrill VPN", "astrill.com"],
    ["besthostingmatch", "Best Hosting Match", "besthostingmatch.com"],
    ["bestvpsmatch", "Best VPS Match", "bestvpsmatch.com"]
  ];

  function readChoice() {
    try {
      return window.localStorage.getItem(consentKey) || "";
    } catch (error) {
      return "";
    }
  }

  function writeChoice(choice) {
    try {
      window.localStorage.setItem(consentKey, choice);
    } catch (error) {}
  }

  function removeChoice() {
    try {
      window.localStorage.removeItem(consentKey);
    } catch (error) {}
  }

  function textOf(el) {
    return ((el && el.textContent) || "").replace(/\s+/g, " ").trim().slice(0, 96);
  }

  function hostMatches(host, domain) {
    return host === domain || host.slice(-(domain.length + 1)) === "." + domain;
  }

  function providerFromUrl(url) {
    var host = url.hostname.replace(/^www\./, "").toLowerCase();
    for (var i = 0; i < providerHosts.length; i++) {
      if (hostMatches(host, providerHosts[i][2])) {
        return { id: providerHosts[i][0], name: providerHosts[i][1], host: host };
      }
    }
    return { id: "", name: "", host: host };
  }

  function vpnList() {
    if (typeof VPN_RECORDS !== "undefined" && Array.isArray(VPN_RECORDS)) return VPN_RECORDS;
    if (window.VPN_RECORDS && Array.isArray(window.VPN_RECORDS)) return window.VPN_RECORDS;
    return [];
  }

  function providerFromElement(el) {
    var id = el.getAttribute("data-provider-id") ||
      el.getAttribute("data-provider") ||
      el.getAttribute("data-vpn-id") ||
      el.getAttribute("data-id") ||
      el.getAttribute("data-compare-toggle");
    var vpns = vpnList();
    if (id && vpns.length) {
      for (var i = 0; i < vpns.length; i++) {
        if (vpns[i].id === id) return { id: id, name: vpns[i].name };
      }
    }
    var card = el.closest && el.closest(".scorecard,.featured-match,.intent-answer,.shortlist-card,.vpn-card,.provider-card,.pick,tr,.verdict,.top-pick");
    var label = card && (
      card.querySelector(".scorecard__name") ||
      card.querySelector(".vpn-name-cell strong") ||
      card.querySelector(".featured-match__scent strong") ||
      card.querySelector(".intent-answer__name") ||
      card.querySelector(".shortlist-card__name") ||
      card.querySelector(".quiz-match-name") ||
      card.querySelector("h2") ||
      card.querySelector("h3") ||
      card.querySelector("strong")
    );
    return { id: id || "", name: textOf(label).replace(/\s+\d+\/100.*$/, "") };
  }

  function contextFromElement(el) {
    if (el.getAttribute("data-analytics-context")) return el.getAttribute("data-analytics-context");
    if (el.closest && el.closest("#quiz-section,.quiz,.quiz-card")) return "quiz";
    if (el.closest && el.closest("#compare-modal")) return "compare-modal";
    if (el.closest && el.closest("#compare,.comparison-table,table")) return "comparison-table";
    if (el.closest && el.closest("#scorecards,.scorecards")) return "scorecards";
    if (el.closest && el.closest(".featured-match,.hero")) return "hero";
    if (el.closest && el.closest("footer")) return "footer";
    return "page";
  }

  function pushMatomo(command) {
    state.queuedCommands++;
    _paq.push(command);
  }

  function trackEvent(category, action, name, value) {
    var event = ["trackEvent", category, action];
    if (typeof name !== "undefined" && name !== null && name !== "") event.push(String(name).slice(0, 150));
    if (typeof value === "number" && isFinite(value)) event.push(value);
    state.trackedEvents++;
    pushMatomo(event);
  }

  function classifySearch(query) {
    var q = query.toLowerCase();
    var vpns = vpnList();
    for (var i = 0; i < vpns.length; i++) {
      var provider = vpns[i];
      if (provider.name.toLowerCase().indexOf(q) > -1 || q.indexOf(provider.name.toLowerCase()) > -1) {
        return "provider:" + provider.id;
      }
    }
    if (/netflix|stream|iplayer|hulu|disney/.test(q)) return "topic:streaming";
    if (/privacy|log|audit|anonymous/.test(q)) return "topic:privacy";
    if (/cheap|budget|price|cost|free/.test(q)) return "topic:price";
    if (/speed|game|latency|ping/.test(q)) return "topic:speed";
    if (/china|uae|travel|school|student/.test(q)) return "topic:restricted-access";
    if (/torrent|p2p/.test(q)) return "topic:torrenting";
    return "topic:other";
  }

  function resultCount() {
    var rows = document.querySelectorAll("#compare-body tr, tbody tr, .scorecard, .provider-card");
    var visible = 0;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].style.display !== "none") visible++;
    }
    return visible;
  }

  pushMatomo(["setTrackerUrl", trackerBase + "matomo.php"]);
  pushMatomo(["setSiteId", siteId]);
  pushMatomo(["setDoNotTrack", true]);
  pushMatomo(["setDomains", ["bestvpnmatch.com", "*.bestvpnmatch.com"]]);
  pushMatomo(["setCookieSameSite", "Lax"]);
  pushMatomo(["setLinkTrackingTimer", 250]);
  if (window.location.protocol === "https:") pushMatomo(["setSecureCookie", true]);
  pushMatomo(["requireCookieConsent"]);
  if (readChoice() === accepted) pushMatomo(["setCookieConsentGiven"]);
  pushMatomo(["enableHeartBeatTimer", 15]);
  pushMatomo(["enableLinkTracking"]);
  pushMatomo(["trackPageView"]);

  var script = document.createElement("script");
  var firstScript = document.getElementsByTagName("script")[0];
  script.async = true;
  script.src = trackerBase + "matomo.js";
  script.onload = function () { state.loaded = true; };
  script.onerror = function () { state.loadError = true; };
  firstScript.parentNode.insertBefore(script, firstScript);

  function injectConsentStyles() {
    if (document.getElementById("analytics-consent-style")) return;
    var style = document.createElement("style");
    style.id = "analytics-consent-style";
    style.textContent =
      ".analytics-consent{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:1000;display:flex;align-items:center;justify-content:space-between;gap:1rem;max-width:980px;margin:0 auto;background:var(--surface,#fff);color:var(--text-primary,#0f172a);border:1px solid var(--border,rgba(37,99,235,.18));border-left:4px solid var(--accent-blue,#2563eb);border-radius:10px;box-shadow:0 18px 60px rgba(15,23,42,.22);padding:.9rem 1rem;font-family:var(--font,Inter,system-ui,sans-serif)}" +
      ".analytics-consent__copy{display:grid;gap:.18rem;font-size:.84rem;color:var(--text-secondary,#475569)}" +
      ".analytics-consent__copy strong{color:var(--text-primary,#0f172a);font-size:.88rem}" +
      ".analytics-consent__actions{display:flex;align-items:center;gap:.55rem;flex-wrap:wrap;justify-content:flex-end;flex-shrink:0}" +
      ".analytics-consent__link{font-size:.8rem;font-weight:700;color:var(--text-secondary,#475569)}" +
      ".analytics-consent .btn{min-height:2.25rem}" +
      "@media(max-width:720px){.analytics-consent{display:block}.analytics-consent__actions{justify-content:flex-start;margin-top:.75rem}.analytics-consent .btn{white-space:normal;text-align:center;justify-content:center}}";
    document.head.appendChild(style);
  }

  function removeBanner() {
    var banner = document.getElementById("analytics-consent");
    if (banner) banner.parentNode.removeChild(banner);
  }

  function applyCookieChoice(choice) {
    writeChoice(choice);
    if (choice === accepted) {
      pushMatomo(["setCookieConsentGiven"]);
      trackEvent("Privacy", "Analytics cookie choice", "accepted");
    } else {
      pushMatomo(["forgetCookieConsentGiven"]);
      pushMatomo(["deleteCookies"]);
      trackEvent("Privacy", "Analytics cookie choice", "essential");
    }
    removeBanner();
  }

  function showBanner(force) {
    if (!document.body) return;
    if (!force && readChoice()) return;
    if (document.getElementById("analytics-consent")) return;

    injectConsentStyles();
    var banner = document.createElement("div");
    banner.id = "analytics-consent";
    banner.className = "analytics-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Analytics cookie preferences");
    banner.innerHTML =
      '<div class="analytics-consent__copy">' +
        '<strong>Analytics choices</strong>' +
        '<span>We use Matomo to understand VPN decision journeys, comparison actions, and outbound provider clicks. Cookies improve session and return-visit accuracy.</span>' +
      '</div>' +
      '<div class="analytics-consent__actions">' +
        '<button type="button" class="btn btn--primary btn--sm" data-analytics-choice="' + accepted + '">Allow analytics cookies</button>' +
        '<button type="button" class="btn btn--secondary btn--sm" data-analytics-choice="' + essential + '">Continue without cookies</button>' +
        '<a href="/privacy" class="analytics-consent__link">Privacy</a>' +
      '</div>';
    document.body.appendChild(banner);
  }

  function wireTracking() {
    var searchTimer;

    document.addEventListener("click", function (event) {
      var choiceBtn = event.target.closest && event.target.closest("[data-analytics-choice]");
      if (choiceBtn) {
        applyCookieChoice(choiceBtn.getAttribute("data-analytics-choice"));
        return;
      }

      var prefsBtn = event.target.closest && event.target.closest("[data-analytics-preferences]");
      if (prefsBtn) {
        event.preventDefault();
        showBanner(true);
        return;
      }

      var quiz = event.target.closest && event.target.closest(".quiz-option,.quiz__opt,[data-q][data-val]");
      if (quiz) {
        var quizLabel = quiz.getAttribute("data-q") ?
          quiz.getAttribute("data-q") + ":" + quiz.getAttribute("data-val") :
          quiz.getAttribute("data-value") || textOf(quiz);
        trackEvent("Decision Engine", "Quiz answer", quizLabel);
      }

      var filter = event.target.closest && event.target.closest("[data-filter]");
      if (filter) trackEvent("Decision Engine", "Filter", filter.getAttribute("data-filter"));

      var category = event.target.closest && event.target.closest(".category-tile,[data-search],[data-cat],[data-intent]");
      if (category) {
        var categoryLabel = category.getAttribute("data-search") ||
          category.getAttribute("data-cat") ||
          category.getAttribute("data-intent") ||
          textOf(category);
        trackEvent("Decision Engine", "Selection", categoryLabel);
      }

      var compareBtn = event.target.closest && event.target.closest("[data-compare-toggle],.compare-checkbox[data-id]");
      if (compareBtn) {
        var id = compareBtn.getAttribute("data-compare-toggle") || compareBtn.getAttribute("data-id");
        var checked = compareBtn.checked || compareBtn.classList.contains("is-checked") || compareBtn.getAttribute("aria-pressed") === "true";
        trackEvent("Decision Engine", checked ? "Compare add" : "Compare toggle", id);
      }

      if (event.target.closest && event.target.closest("#compare-now-btn,#tray-compare,#quiz-compare")) {
        trackEvent("Decision Engine", "Open comparison", "compare");
      }

      if (event.target.closest && event.target.closest("#compare-modal-close,.modal__close")) {
        trackEvent("Decision Engine", "Close comparison", "compare modal");
      }

      var score = event.target.closest && event.target.closest(".score-expand-btn,[data-score-breakdown]");
      if (score) {
        trackEvent("Decision Engine", "Show score breakdown", score.getAttribute("data-target") || textOf(score));
      }

      var sort = event.target.closest && event.target.closest("[data-sort]");
      if (sort) trackEvent("Decision Engine", "Sort comparison", sort.getAttribute("data-sort"));

      var link = event.target.closest && event.target.closest("a[href]");
      if (!link) return;

      var url;
      try {
        url = new URL(link.getAttribute("href"), window.location.href);
      } catch (error) {
        return;
      }

      if (!/^https?:$/.test(url.protocol)) return;
      if (url.hostname === window.location.hostname) return;

      var provider = providerFromElement(link);
      var fromUrl = providerFromUrl(url);
      if (!provider.name && fromUrl.name) provider = fromUrl;
      var context = contextFromElement(link);
      var label = (provider.name || fromUrl.host) + " | " + context + " | " + window.location.pathname;
      var action = provider.id && provider.id.indexOf("best") !== 0 ? "Provider outbound click" : "External outbound click";

      trackEvent("Outbound", action, label);
    });

    document.addEventListener("change", function (event) {
      var checkbox = event.target.closest && event.target.closest(".compare-checkbox[data-id],input[data-compare-toggle]");
      if (checkbox) {
        var id = checkbox.getAttribute("data-id") || checkbox.getAttribute("data-compare-toggle");
        trackEvent("Decision Engine", checkbox.checked ? "Compare add" : "Compare remove", id);
      }
    });

    document.addEventListener("input", function (event) {
      var target = event.target;
      if (!target) return;
      if (target.id === "search" || target.id === "hero-search" || target.getAttribute("type") === "search") {
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(function () {
          var query = target.value.trim();
          if (query.length < 2) return;
          trackEvent("Decision Engine", "Provider search", classifySearch(query), resultCount());
        }, 900);
      }
    });
  }

  window.BVPNAnalytics = {
    trackEvent: trackEvent,
    openCookiePreferences: function () { showBanner(true); },
    getCookieChoice: readChoice,
    setCookieChoice: applyCookieChoice,
    resetCookieChoice: function () {
      removeChoice();
      pushMatomo(["forgetCookieConsentGiven"]);
      pushMatomo(["deleteCookies"]);
      showBanner(true);
    },
    status: function () {
      return {
        trackerBase: trackerBase,
        siteId: siteId,
        loaded: state.loaded,
        loadError: state.loadError,
        queuedCommands: state.queuedCommands,
        trackedEvents: state.trackedEvents,
        cookieChoice: readChoice()
      };
    }
  };
  window.BestVPNMatchAnalytics = window.BVPNAnalytics;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      wireTracking();
      showBanner(false);
    });
  } else {
    wireTracking();
    showBanner(false);
  }
})();
