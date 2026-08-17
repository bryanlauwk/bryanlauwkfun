# Fix: Mobile stuck on static shell + full landing audit

## Problem
On mobile, the page freezes on the `#static-fallback` shell in `index.html` and never hands off to the hydrated React UI. Desktop hydrates fine. Likely the React tree mounts but the fallback shell isn't being removed, or a mobile-only runtime error (audio/hover/scroll listener, image, or Supabase call) crashes hydration before first paint replaces the shell.

Root-cause candidates to check, in order:

1. **Static shell never removed.** `index.html` renders `<div id="static-fallback">` inside `#root`. `createRoot(document.getElementById("root")!).render(...)` in `src/main.tsx` should replace it on mount, but if React throws during first render the ErrorBoundary may render *around* the shell or the shell may remain visible under a transparent React tree. On desktop it works because hydration completes; on mobile something throws.
2. **Mobile-only crash in a top-level component.** Suspects: `useBackgroundMusic`, `KonamiCodeListener`, `UpsideDownOverlay`, `useVisitorCounter`, `CinematicHeader` scroll listener, `ProjectGrid` image loads, `useSEO` / `HelmetProvider`.
3. **First-paint parity check gives false confidence.** `scripts/verify-first-paint.py` asserts required copy exists in shell + hydrated DOM, but does NOT assert the shell is actually removed/hidden after hydration — so a "stuck on shell" bug passes the check.

## Plan

### 1. Reproduce and capture the real error
- Run Playwright at 390×844 against `http://localhost:8080`, JS enabled, capture:
  - `console` messages (all levels) and `pageerror`
  - Network failures
  - Screenshot after `networkidle`
  - DOM snapshot of `#root` — is `#static-fallback` still present? Is `main#main-content` present?
- Repeat at 1280×900 to confirm desktop hydrates.
- If mobile shows a runtime error, fix that specific component. If mobile DOM contains BOTH shell and hydrated `<main>`, the shell isn't being cleared → fix in step 2.

### 2. Guarantee the shell is removed on hydration
Two robust options; pick one after step 1 confirms behavior:
- **A (preferred):** Move `#static-fallback` OUT of `#root` (sibling div), and in `src/main.tsx` remove it synchronously right after `createRoot(...).render(...)`. React only owns `#root`, so it can never accidentally preserve the shell.
- **B:** Keep it inside `#root` but ensure `createRoot` on an empty container — clear `#root.innerHTML` before rendering. Simpler but loses instant paint of the shell inside the React container.

Go with **A**: keep instant paint, guarantee cleanup, no flash.

### 3. Fix whichever mobile-only crash step 1 surfaces
Likely fixes (only apply what repro shows):
- Guard `window.matchMedia` / `AudioContext` / `navigator.*` usage behind `typeof window !== "undefined"` and try/catch.
- Ensure `useVisitorCounter` handles Supabase error without throwing during render.
- Ensure `HelmetProvider` + `useSEO` isn't double-mounting.
- Wrap the risky top-level side-effect components in a small ErrorBoundary so one crash doesn't blank the page.

### 4. Harden the first-paint parity check
Extend `scripts/verify-first-paint.py` to also assert, in the hydrated run:
- `document.getElementById("static-fallback")` is `null` (or `hidden`)
- `main#main-content` exists and is visible
- No `console.error` / `pageerror` fired during load
Run at both viewports; fail loudly if the shell survives hydration.

### 5. Landing-journey audit (mobile 390 + desktop 1280)
Walk the full flow with Playwright and screenshot each step; report anything broken or awkward:
- `/` hero renders, header sticky behavior, visitor counter loads, sound toggle works
- `Drops` grid renders all 9 projects from Supabase, cards are tappable, external links open
- Click a drop → `/drops/:slug` renders (or falls through to external `href`)
- Footer + guest book: submit a test message path renders, validation works
- `/auth`, `/admin` (unauthenticated redirect), `/404` unknown route
- Konami code / Upside Down overlay doesn't break mobile
- Lighthouse-style quick checks: no layout shift from shell → hydrated, no horizontal scroll on 390px, tap targets ≥ 40px

### 6. Deliverable
- Root-cause writeup with the exact console error and offending file
- Code fix (steps 2 + 3)
- Updated `scripts/verify-first-paint.py`
- Short audit report of journey findings with screenshots, ordered by severity

## Technical notes
- Only touch presentation/runtime code; no schema or business-logic changes.
- No new dependencies.
- Keep the "Certified curious" / "For the curious" copy untouched.

## Question before I start
Do you want me to also fix any non-blocker journey issues I find in the audit (e.g. tap targets, missing alt text, mobile layout nits), or only the hydration bug + report the rest for you to triage?
