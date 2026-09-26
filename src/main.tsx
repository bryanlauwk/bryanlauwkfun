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
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("App root is missing");
  const root = createRoot(rootElement);
  // Keep the current first-paint shell until React actually commits content.
  const observer = new MutationObserver(() => {
    if (rootElement.childElementCount > 0) {
      observer.disconnect();
      removeStaticShell();
    }
  });
  observer.observe(rootElement, { childList: true });
  root.render(
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  );
} catch (err) {
  console.error("[boot] React failed to mount", err);
  // Leave the static shell up — the safety net script in index.html will
  // surface a reload prompt so users aren't stranded on a frozen view.
}
