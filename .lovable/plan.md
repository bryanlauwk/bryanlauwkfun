

# Fix Persistent Intermittent Page Crashes

## Diagnosis

After a thorough codebase scan, the app code itself is solid -- all hooks use `safe-client.ts` with hardcoded fallbacks, and the ErrorBoundary + unhandled rejection handler are in place. The intermittent crashes are caused by **two remaining gaps**:

### Gap 1: No HTML-level fallback when JavaScript fails entirely
If the Vite bundle fails to load (network hiccup, HMR error, env injection failure), the user sees a **blank white page** because `index.html` has an empty `<div id="root"></div>` with no fallback content. The ErrorBoundary can't help if React never mounts.

### Gap 2: Auto-generated `client.ts` can throw at module evaluation
The auto-generated `src/integrations/supabase/client.ts` calls `createClient(undefined, undefined)` when env vars aren't injected. Even though no app code imports it directly, Vite's module graph may still evaluate it. This is a file we cannot edit (auto-generated), but we can ensure nothing triggers its evaluation.

---

## Plan

### Step 1: Add a no-JS fallback directly in `index.html`
Add a `<noscript>` tag and a lightweight inline `<style>` + `<div>` inside the `#root` element that shows a "Loading..." message. This gets replaced when React mounts successfully, but remains visible if the JS bundle fails entirely.

```html
<div id="root">
  <div id="static-fallback" style="...dark theme styles...">
    <h1>Bryan Lau</h1>
    <p>Loading...</p>
  </div>
</div>
```

React's `createRoot().render()` will replace the contents of `#root`, so this fallback disappears automatically on successful load.

### Step 2: Add an inline error recovery script in `index.html`
Add a small inline `<script>` that sets a timeout -- if React hasn't mounted within 8 seconds, it shows a "Reload" button. This catches the case where the JS bundle loads but crashes silently before React renders.

```html
<script>
  setTimeout(function() {
    var root = document.getElementById('root');
    if (root && root.childElementCount <= 1) {
      // Show reload button
    }
  }, 8000);
</script>
```

### Step 3: Wrap `main.tsx` entry point in try-catch
Wrap the `createRoot().render()` call in a try-catch so that if even the ErrorBoundary fails to mount (e.g., import resolution error), the static fallback remains visible with a reload prompt.

---

## Files Changed

1. **`index.html`** -- Add static fallback content inside `#root` and an inline recovery script
2. **`src/main.tsx`** -- Wrap the render call in try-catch with DOM-based error recovery

## What This Solves

- Blank white page when JS bundle fails to load
- Blank page when env vars aren't injected during hot-reload
- Blank page when any import throws at module evaluation time
- Users always see either the app OR a branded "reload" prompt -- never a blank page

