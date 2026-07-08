"""
First-paint parity check.

Loads the site with JavaScript disabled (captures the static shell in
index.html that users see on first paint) and again with JS enabled
(the hydrated React UI), at both mobile and desktop viewports, and
asserts the headline + brand copy match. This prevents regressions
where the pre-hydration shell shows a stale/legacy layout.

Usage:
    BASE_URL=http://localhost:8080 python3 scripts/verify-first-paint.py
    BASE_URL=https://www.bryanlauwk.fun python3 scripts/verify-first-paint.py

Requires: pip install playwright && playwright install chromium
"""
import asyncio
import os
import re
import sys

from playwright.async_api import async_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")

VIEWPORTS = [
    {"name": "mobile", "width": 390, "height": 844},
    {"name": "desktop", "width": 1280, "height": 900},
]

# Copy that must appear in BOTH the static fallback and the hydrated React UI.
REQUIRED_PHRASES = [
    "Bryan Lau",
    "For the curious.",
    "A stranger",
    "kind of",
    "internet.",
]

# Legacy copy that must NEVER appear anywhere.
FORBIDDEN_PHRASES = [
    "dumb",
    "Late nights, wild ideas",
    "rabbit holes",
    "I build dumb ideas",
]


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def check_phrases(label: str, text: str) -> bool:
    failures = []
    for phrase in REQUIRED_PHRASES:
        if phrase not in text:
            failures.append(f'  x missing required: "{phrase}"')
    lower = text.lower()
    for phrase in FORBIDDEN_PHRASES:
        if phrase.lower() in lower:
            failures.append(f'  x found forbidden legacy copy: "{phrase}"')
    if failures:
        print(f"[FAIL] {label}")
        for f in failures:
            print(f)
        return False
    print(f"[ok]   {label}")
    return True


async def run() -> int:
    all_passed = True
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        for vp in VIEWPORTS:
            viewport = {"width": vp["width"], "height": vp["height"]}

            # 1. First-paint shell — JavaScript disabled.
            no_js = await browser.new_context(
                viewport=viewport, java_script_enabled=False
            )
            page = await no_js.new_page()
            await page.goto(BASE_URL, wait_until="domcontentloaded")
            shell_text = norm(await page.evaluate("document.body.textContent"))
            all_passed &= check_phrases(f"{vp['name']} · first paint (no JS)", shell_text)
            await no_js.close()

            # 2. Hydrated React UI.
            js = await browser.new_context(viewport=viewport)
            page = await js.new_page()
            await page.goto(BASE_URL, wait_until="networkidle")
            await page.wait_for_selector("main#main-content h1")
            hydrated_text = norm(await page.evaluate("document.body.textContent"))
            all_passed &= check_phrases(f"{vp['name']} · hydrated React", hydrated_text)
            await js.close()

        await browser.close()

    if not all_passed:
        print("\nFirst-paint parity check FAILED")
        return 1
    print("\nAll checks passed — first paint matches hydrated UI.")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(run()))
