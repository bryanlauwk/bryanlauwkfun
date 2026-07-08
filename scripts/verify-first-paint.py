"""
First-paint parity check.

Loads the site with JavaScript disabled (captures the static shell in
index.html that users see on first paint) and again with JS enabled
(the hydrated React UI), at both mobile and desktop viewports.

Asserts:
  - Required copy appears in both the shell and the hydrated UI.
  - Legacy copy never appears.
  - After hydration, the static shell is removed AND main#main-content exists.
  - No `pageerror` or `console.error` fired during load.

Usage:
    BASE_URL=http://localhost:8080 python3 scripts/verify-first-paint.py
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

REQUIRED_PHRASES = [
    "Bryan Lau",
    "For the curious.",
    "A stranger",
    "kind of",
    "internet.",
]

FORBIDDEN_PHRASES = [
    "dumb",
    "Late nights, wild ideas",
    "rabbit holes",
    "I build dumb ideas",
]


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def check_phrases(label: str, text: str) -> bool:
    fails = []
    for phrase in REQUIRED_PHRASES:
        if phrase not in text:
            fails.append(f'  x missing required: "{phrase}"')
    lower = text.lower()
    for phrase in FORBIDDEN_PHRASES:
        if phrase.lower() in lower:
            fails.append(f'  x found forbidden legacy copy: "{phrase}"')
    if fails:
        print(f"[FAIL] {label}")
        for f in fails:
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

            # 1. First-paint shell — JS disabled.
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
            page_errors: list[str] = []
            console_errors: list[str] = []
            page.on("pageerror", lambda e: page_errors.append(str(e)))
            page.on(
                "console",
                lambda m: console_errors.append(m.text) if m.type == "error" else None,
            )
            await page.goto(BASE_URL, wait_until="networkidle")
            await page.wait_for_selector("main#main-content", timeout=8000)
            hydrated_text = norm(await page.evaluate("document.body.textContent"))
            all_passed &= check_phrases(f"{vp['name']} · hydrated React", hydrated_text)

            hydration = await page.evaluate(
                """() => ({
                  shellPresent: !!document.getElementById('static-fallback'),
                  hasMain: !!document.querySelector('main#main-content'),
                })"""
            )
            label = f"{vp['name']} · hydration cleanup"
            if hydration["shellPresent"] or not hydration["hasMain"]:
                print(f"[FAIL] {label} — shellPresent={hydration['shellPresent']} hasMain={hydration['hasMain']}")
                all_passed = False
            else:
                print(f"[ok]   {label}")

            label = f"{vp['name']} · runtime errors"
            if page_errors or console_errors:
                print(f"[FAIL] {label}")
                for e in page_errors:
                    print(f"  pageerror: {e}")
                for e in console_errors:
                    print(f"  console.error: {e}")
                all_passed = False
            else:
                print(f"[ok]   {label}")

            await js.close()

        await browser.close()

    if not all_passed:
        print("\nFirst-paint parity check FAILED")
        return 1
    print("\nAll checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(run()))
