/**
 * First-paint parity check.
 *
 * Loads the site with JavaScript disabled (captures the static shell in
 * index.html that users see on first paint) and again with JS enabled
 * (the hydrated React UI), at both mobile and desktop viewports, and
 * asserts the headline + brand copy match. This prevents regressions
 * where the pre-hydration shell shows a stale/legacy layout.
 *
 * Usage:
 *   BASE_URL=http://localhost:8080 node scripts/verify-first-paint.mjs
 *   BASE_URL=https://www.bryanlauwk.fun node scripts/verify-first-paint.mjs
 *
 * Requires: npm i -D playwright  (or run in an env where playwright is available)
 */
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
];

// Copy that must appear in BOTH the static fallback and the hydrated React UI.
const REQUIRED_PHRASES = [
  "Bryan Lau",
  "For the curious.",
  "A stranger",
  "kind of",
  "internet.",
];

// Legacy copy that must NEVER appear anywhere.
const FORBIDDEN_PHRASES = [
  "dumb",
  "Late nights, wild ideas",
  "rabbit holes",
  "I build dumb ideas",
];

const norm = (s) => s.replace(/\s+/g, " ").trim();

async function textAt(page) {
  return norm(await page.evaluate(() => document.body.innerText));
}

async function checkPhrases(label, text) {
  const failures = [];
  for (const phrase of REQUIRED_PHRASES) {
    if (!text.includes(phrase)) failures.push(`  ✗ missing required: "${phrase}"`);
  }
  for (const phrase of FORBIDDEN_PHRASES) {
    if (text.toLowerCase().includes(phrase.toLowerCase()))
      failures.push(`  ✗ found forbidden legacy copy: "${phrase}"`);
  }
  if (failures.length) {
    console.error(`[FAIL] ${label}`);
    failures.forEach((f) => console.error(f));
    return false;
  }
  console.log(`[ok]   ${label}`);
  return true;
}

async function run() {
  const browser = await chromium.launch();
  let allPassed = true;

  for (const vp of VIEWPORTS) {
    // 1. First-paint shell — JavaScript disabled, so React never hydrates.
    const noJsCtx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      javaScriptEnabled: false,
    });
    const noJsPage = await noJsCtx.newPage();
    await noJsPage.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const shellText = await textAt(noJsPage);
    allPassed = (await checkPhrases(`${vp.name} · first paint (no JS)`, shellText)) && allPassed;
    await noJsCtx.close();

    // 2. Hydrated React UI — JavaScript enabled.
    const jsCtx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const jsPage = await jsCtx.newPage();
    await jsPage.goto(BASE_URL, { waitUntil: "networkidle" });
    await jsPage.waitForSelector("main#main-content h1");
    const hydratedText = await textAt(jsPage);
    allPassed = (await checkPhrases(`${vp.name} · hydrated React`, hydratedText)) && allPassed;
    await jsCtx.close();
  }

  await browser.close();

  if (!allPassed) {
    console.error("\nFirst-paint parity check FAILED");
    process.exit(1);
  }
  console.log("\nAll checks passed — first paint matches hydrated UI.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
