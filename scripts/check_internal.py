#!/usr/bin/env python3
"""Verify repo integrity: sitemap paths, Netlify redirects, no placeholder IDs."""

from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPORT = ROOT / "reports" / "internal-health.txt"
SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

SKIP_PATH_PREFIXES = ("/#",)
STATIC_EXTENSIONS = {
    ".html",
    ".md",
    ".txt",
    ".xml",
    ".png",
    ".svg",
    ".json",
    ".js",
}


def log(lines: list[str], msg: str) -> None:
    lines.append(msg)
    print(msg)


def parse_redirect_sources() -> set[str]:
    sources: set[str] = set()
    for line in (ROOT / "_redirects").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) >= 3 and parts[0].startswith("/"):
            sources.add(parts[0])
    return sources


def path_to_local_file(path: str) -> Path | None:
    if path == "/" or path == "":
        return ROOT / "index.html"
    if path.startswith("/#") or "#" in path:
        return ROOT / "index.html"  # fragment-only sitemap entries
    if path.endswith("/"):
        path = path.rstrip("/")
    rel = path.lstrip("/")
    if not rel:
        return ROOT / "index.html"
    direct = ROOT / rel
    if direct.is_file():
        return direct
    html = ROOT / f"{rel}.html"
    if html.is_file():
        return html
    return None


def main() -> int:
    lines: list[str] = []
    errors: list[str] = []
    warnings: list[str] = []

    log(lines, "=== Internal integrity check ===")
    log(lines, f"Root: {ROOT}")

    # 1. Placeholder affiliate IDs (site files only — not docs/scripts)
    log(lines, "\n-- Placeholder scan (YOUR_ID) --")
    scan_roots = [
        ROOT / "data",
        *ROOT.glob("*.html"),
    ]
    scanned: set[Path] = set()
    for item in scan_roots:
        paths = [item] if item.is_file() else list(item.rglob("*"))
        for path in paths:
            if not path.is_file() or path in scanned:
                continue
            scanned.add(path)
            if path.suffix not in {".html", ".js", ".md"}:
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            if "YOUR_ID" in text:
                msg = f"PLACEHOLDER: {path.relative_to(ROOT)} contains YOUR_ID"
                errors.append(msg)
                log(lines, f"❌ {msg}")

    if not any("YOUR_ID" in e for e in errors):
        log(lines, "✅ No YOUR_ID placeholders found")

    # 2. HTML pages have Netlify clean-URL redirects
    log(lines, "\n-- Netlify _redirects coverage --")
    redirect_sources = parse_redirect_sources()
    html_pages = [p for p in ROOT.glob("*.html") if p.name != "index.html"]
    for page in sorted(html_pages):
        slug = f"/{page.stem}"
        if slug not in redirect_sources:
            msg = f"Missing _redirects entry for {slug}"
            errors.append(msg)
            log(lines, f"❌ {msg}")
    if not any("Missing _redirects" in e for e in errors):
        log(lines, f"✅ All {len(html_pages)} HTML pages covered in _redirects")

    # 3. Sitemap paths resolve to files
    log(lines, "\n-- Sitemap vs files --")
    tree = ET.parse(ROOT / "sitemap.xml")
    locs = [
        el.text.strip()
        for el in tree.findall(".//sm:loc", SITEMAP_NS)
        if el.text
    ]
    for loc in locs:
        if "bestvpnmatch.com" not in loc:
            continue
        path = loc.split("bestvpnmatch.com", 1)[1] or "/"
        if path.startswith(SKIP_PATH_PREFIXES):
            log(lines, f"⏭️  Skip fragment URL: {path}")
            continue
        local = path_to_local_file(path.split("#", 1)[0])
        if local is None or not local.is_file():
            msg = f"Sitemap path missing file: {path}"
            errors.append(msg)
            log(lines, f"❌ {msg}")
        else:
            log(lines, f"✅ {path} → {local.relative_to(ROOT)}")

    # 4. Required SEO / AI files
    log(lines, "\n-- Required static assets --")
    required = [
        "robots.txt",
        "sitemap.xml",
        "llms.txt",
        "llms-full.txt",
        "agents.txt",
        "ai.txt",
        ".well-known/ai.json",
        "netlify.toml",
        "data/site-config.js",
        "data/vpn-data.js",
        "data/scoring.js",
    ]
    for rel in required:
        p = ROOT / rel
        if p.is_file():
            log(lines, f"✅ {rel}")
        else:
            msg = f"Missing required file: {rel}"
            errors.append(msg)
            log(lines, f"❌ {msg}")

    # 5. VPN ids in site-config vs vpn-data (warn only)
    log(lines, "\n-- VPN link config vs data --")
    config_text = (ROOT / "data/site-config.js").read_text(encoding="utf-8")
    home_ids = set(re.findall(r"\n\s+(\w+):\s+\"https?://", config_text.split("VPN_HOME_LINKS")[1].split("};")[0]))
    data_text = (ROOT / "data/vpn-data.js").read_text(encoding="utf-8")
    data_ids = set(re.findall(r'\bid:\s*"(\w+)"', data_text))
    missing_links = sorted(data_ids - home_ids)
    extra_links = sorted(home_ids - data_ids - {"astrill"})
    if missing_links:
        warnings.append(f"VPNs in data without VPN_HOME_LINKS: {', '.join(missing_links)}")
    if extra_links:
        warnings.append(f"VPN_HOME_LINKS without data entry: {', '.join(extra_links)}")
    for w in warnings:
        log(lines, f"⚠️  {w}")
    if not warnings:
        log(lines, "✅ VPN_HOME_LINKS aligns with vpn-data.js")

    log(lines, "\n=== Summary ===")
    log(lines, f"Errors: {len(errors)} | Warnings: {len(warnings)}")
    if errors:
        log(lines, "FAILED")
    else:
        log(lines, "PASSED")

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
