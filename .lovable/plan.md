

# Fix Intermittent Crashes -- Full Diagnosis and Remediation

## Root Causes Found

After scanning the entire codebase, I identified **three distinct crash vectors**:

### 1. Unhandled Promise Rejections (Primary Cause)
Multiple async operations across the app (background music fetch, visitor counter RPC, guest book queries, sponsor queries) can throw errors that propagate as **unhandled promise rejections**. React Error Boundaries do NOT catch these -- they only catch synchronous render errors. An unhandled rejection can crash the entire tab.

**Affected files:** `useBackgroundMusic.ts`, `useVisitorCounter.ts`, `useAuth.ts`

### 2. ErrorBoundary Not Wired Into App
The `ErrorBoundary` component exists but is **not used anywhere**. It was removed from `main.tsx` during the previous refactor. So even synchronous render crashes show a blank page.

### 3. QueryClient Has No Default Error Handling
The `QueryClient` in `App.tsx` is created with zero configuration -- no `retry` limits, no `onError` handler. Failed queries retry infinitely by default (3 times), but if all retries fail, the error bubbles up unhandled.

---

## Plan

### Step 1: Add global `unhandledrejection` listener in `App.tsx`
Add a `useEffect` in the App component that listens for `window.addEventListener("unhandledrejection", ...)` and prevents the crash by logging the error and showing a toast notification instead.

### Step 2: Re-wrap the app in the ErrorBoundary in `main.tsx`
Restore the `<ErrorBoundary>` wrapper around `<App />` so synchronous render errors display the "Signal Lost" fallback instead of a white screen.

### Step 3: Configure QueryClient with sensible defaults
Set `retry: 2` and a default `onError` callback on the QueryClient so failed data fetches degrade gracefully (show stale data or empty states) instead of crashing.

---

## Technical Details

### `src/main.tsx`
- Import `ErrorBoundary`
- Wrap `<App />` with `<ErrorBoundary>`

### `src/App.tsx`
- Convert `App` from arrow-expression to include a `useEffect` for the global rejection handler
- Configure `QueryClient` with `defaultOptions.queries.retry = 2`
- Show a `toast.error()` on unhandled rejections instead of crashing

### No other files need changes
The `safe-client.ts` fallback and existing `try/catch` blocks in hooks are already solid. The gap was purely at the top-level error handling layer.

