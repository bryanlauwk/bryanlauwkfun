import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "./components/ErrorBoundary";
import App from "./App.tsx";
import "./index.css";

function removeStaticShell() {
  const shell = document.getElementById("static-fallback");
  if (shell) shell.remove();
  const w = window as unknown as { __mountWatch?: number };
  if (w.__mountWatch) {
    clearTimeout(w.__mountWatch);
    w.__mountWatch = undefined;
  }
}

try {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  );
  // Remove the pre-hydration shell once React commits its first paint.
  requestAnimationFrame(removeStaticShell);
} catch (err) {
  console.error("[boot] React failed to mount", err);
  // Leave the static shell up — the safety net script in index.html will
  // surface a reload prompt so users aren't stranded on a frozen view.
}
