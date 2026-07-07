#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SLASH = chr(47)
USERS = "Us" + "ers"
SIRIUS = "Sir" + "ius"
NEXUS = "Ne" + "xus"
HQ = "00_" + "HQ"
WITNESS = "Wi" + "tness"
MEMORY = "Me" + "mory"
RAW = "ra" + "w"
OPENAI = "op" + "enai"
API = "ap" + "i"
ANTHROPIC = "an" + "thropic"
SK = "s" + "k-"
PUBLIC_PATH = f"{SLASH}{USERS}{SLASH}"
PUBLIC_REPO_NAME = f"{SIRIUS} {NEXUS}"
WITNESS_NAME = f"{WITNESS} {MEMORY}"
OPENAI_DOMAIN = f"{API}.{OPENAI}.com"
RAW_OPENAI = f"{RAW}{SLASH}{OPENAI}"

REQUIRED_FILES = [
    ROOT / "index.html",
    ROOT / "app.js",
    ROOT / "styles.css",
    ROOT / "offer" / "index.html",
    ROOT / "offer" / "customer-brief-template.md",
    ROOT / "offer" / "delivery-sample.md",
    ROOT / "offer" / "faq.md",
    ROOT / "offer" / "terms.md",
    ROOT / "offer" / "checkout-options.md",
]
FORBIDDEN_PATTERNS = [
    PUBLIC_PATH,
    PUBLIC_REPO_NAME,
    HQ,
    WITNESS_NAME,
    RAW_OPENAI,
    OPENAI_DOMAIN,
    ANTHROPIC,
    SK,
]
FORBIDDEN_SUFFIXES = {".env", ".pem", ".key", ".db", ".sqlite", ".jsonl"}
REQUIRED_MD_HEADINGS = [
    "# Sample Delivery — Ash Empire",
    "## Core Concept",
    "## World Premise",
    "## Factions",
    "## Locations",
    "## Character Archetypes",
    "## Story Hooks",
    "## Commercial Use Cases",
    "## Next Steps",
]


def check_required_files() -> list[str]:
    missing = [str(path.relative_to(ROOT)) for path in REQUIRED_FILES if not path.exists()]
    for path in missing:
        print(f"FAIL missing {path}")
    return missing


def check_forbidden_files() -> list[str]:
    forbidden = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if path == Path(__file__).resolve():
            continue
        if path.name == ".gitkeep":
            continue
        if path.suffix in FORBIDDEN_SUFFIXES or path.name in FORBIDDEN_SUFFIXES:
            forbidden.append(str(path.relative_to(ROOT)))
    for path in forbidden:
        print(f"FAIL forbidden file {path}")
    return forbidden


def check_text_files() -> list[str]:
    issues = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if path == Path(__file__).resolve():
            continue
        if path.suffix not in {".html", ".css", ".js", ".md"}:
            continue
        text = path.read_text(encoding="utf-8")
        for pattern in FORBIDDEN_PATTERNS:
            if pattern in text:
                issues.append(f"{path.relative_to(ROOT)} contains forbidden string")
        if path.name == "app.js":
            for needle in ("fetch(", "XMLHttpRequest", OPENAI_DOMAIN):
                if needle in text:
                    issues.append(f"{path.relative_to(ROOT)} contains {needle}")
        if path.name == "ash-empire.json" or path.name.endswith(".json"):
            try:
                json.loads(text)
            except Exception:
                issues.append(f"{path.relative_to(ROOT)} is not valid JSON")
        if path.name == "ash-empire.md":
            for heading in REQUIRED_MD_HEADINGS:
                if heading not in text:
                    issues.append(f"{path.relative_to(ROOT)} missing heading {heading}")
    for issue in issues:
        print(f"FAIL {issue}")
    return issues


def main() -> int:
    missing = check_required_files()
    forbidden = check_forbidden_files()
    issues = check_text_files()
    if missing or forbidden or issues:
        return 1
    print("PASS public demo verification")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
