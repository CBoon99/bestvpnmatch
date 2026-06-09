#!/usr/bin/env python3
"""Check outbound VPN official and affiliate URLs from data/site-config.js."""

from __future__ import annotations

import re
import ssl
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "data" / "site-config.js"
REPORT = ROOT / "reports" / "link-health.txt"
USER_AGENT = "BestVPNMatch-HealthCheck/1.0 (+https://bestvpnmatch.com)"
TIMEOUT = 20


def extract_url_map(block_name: str, text: str) -> dict[str, str]:
    pattern = rf"{block_name}\s*=\s*\{{(.*?)\}};"
    match = re.search(pattern, text, re.S)
    if not match:
        return {}
    block = match.group(1)
    return dict(re.findall(r"\n\s+(\w+):\s+\"([^\"]+)\"", block))


def extract_exempt(text: str) -> dict[str, str]:
    return extract_url_map("LINK_CHECK_EXEMPT", text)


def check_url(url: str) -> tuple[str, int | None, str]:
    if not url or url == "#":
        return "EMPTY", None, "No URL configured"
    if "YOUR_ID" in url:
        return "PLACEHOLDER", None, "Contains YOUR_ID — replace before going affiliate"

    ctx = ssl.create_default_context()
    req = urllib.request.Request(
        url,
        method="HEAD",
        headers={"User-Agent": USER_AGENT, "Accept": "text/html,*/*"},
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT, context=ctx) as resp:
            return "OK", resp.status, resp.geturl()
    except urllib.error.HTTPError as e:
        code = e.code
        if code in (403, 405):
            return check_url_get(url, ctx, code)
        if 400 <= code < 500:
            return "BROKEN", code, str(e)
        return "ERROR", code, str(e)
    except Exception:
        return check_url_get(url, ctx, None)


def check_url_get(url: str, ctx: ssl.SSLContext, head_code: int | None) -> tuple[str, int | None, str]:
    req = urllib.request.Request(
        url,
        method="GET",
        headers={"User-Agent": USER_AGENT, "Accept": "text/html,*/*"},
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT, context=ctx) as resp:
            status = "OK" if head_code in (403, 405) else "OK"
            note = "HEAD blocked; GET succeeded" if head_code else "GET succeeded"
            return status, resp.status, f"{note} → {resp.geturl()}"
    except urllib.error.HTTPError as e:
        if e.code == 403:
            host = urlparse(url).netloc
            return "WARN", 403, f"403 from {host} — likely bot block; verify manually in browser"
        return "BROKEN", e.code, str(e)
    except Exception as e:
        return "ERROR", None, str(e)


def main() -> int:
    text = CONFIG.read_text(encoding="utf-8")
    affiliate_active = "affiliateActive: true" in text.replace(" ", "")
    home_links = extract_url_map("VPN_HOME_LINKS", text)
    affiliate_links = extract_url_map("AFFILIATE_LINKS", text)
    exempt = extract_exempt(text)

    lines: list[str] = []
    failures: list[str] = []
    warns: list[str] = []

    log = lambda m: (lines.append(m), print(m))

    log("=== Outbound link health ===")
    log(f"Config: {CONFIG.relative_to(ROOT)}")
    log(f"affiliateActive: {affiliate_active}")
    log("")

    targets: list[tuple[str, str, str]] = []
    for vpn_id, url in sorted(home_links.items()):
        targets.append((vpn_id, "official", url))
    for vpn_id, url in sorted(affiliate_links.items()):
        targets.append((vpn_id, "affiliate", url))

    if not targets:
        log("❌ No URLs found in site-config.js")
        REPORT.parent.mkdir(parents=True, exist_ok=True)
        REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
        return 1

    ok = warn = broken = placeholder = skipped = 0
    for vpn_id, kind, url in targets:
        if vpn_id in exempt:
            log(f"⏭️  {vpn_id.upper()} ({kind}): SKIPPED — {exempt[vpn_id]}")
            skipped += 1
            continue
        status, code, detail = check_url(url)
        code_str = str(code) if code is not None else "—"
        icon = {"OK": "✅", "WARN": "⚠️", "BROKEN": "❌", "PLACEHOLDER": "🚧", "ERROR": "❌", "EMPTY": "❌"}.get(status, "?")
        log(f"{icon} {vpn_id.upper()} ({kind}): {status} ({code_str}) — {url}")
        if detail and status != "OK":
            log(f"   ↳ {detail}")

        if status == "OK":
            ok += 1
        elif status == "WARN":
            warn += 1
            warns.append(vpn_id)
        elif status == "PLACEHOLDER":
            placeholder += 1
            if affiliate_active:
                failures.append(vpn_id)
        elif status in ("BROKEN", "ERROR", "EMPTY"):
            broken += 1
            failures.append(vpn_id)

    log("")
    log("=== Summary ===")
    log(f"Checked: {len(targets)} | OK: {ok} | Warn: {warn} | Skipped: {skipped} | Broken: {broken} | Placeholder: {placeholder}")

    if affiliate_active and placeholder:
        log("❌ Affiliate mode on but placeholder URLs remain")
    elif not affiliate_active and placeholder:
        log("ℹ️  Placeholder affiliate URLs ignored while affiliateActive is false")

    if failures:
        log(f"FAILED — review: {', '.join(failures)}")
        result = 1
    else:
        log("PASSED — no broken outbound links")
        result = 0

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return result


if __name__ == "__main__":
    sys.exit(main())
