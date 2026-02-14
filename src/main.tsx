import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/ErrorBoundary";
import App from "./App.tsx";
import "./index.css";

try {
  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} catch (err) {
  console.error("Fatal bootstrap error:", err);
  const fallback = document.getElementById("static-fallback");
  if (fallback) {
    fallback.innerHTML =
      '<div><h1 style="font-family:Playfair Display,Georgia,serif;font-size:2rem;color:hsl(350,85%,55%);margin-bottom:0.5rem;">Something Went Wrong</h1><p style="font-family:Inter,sans-serif;font-size:0.875rem;color:hsl(240,5%,65%);margin-bottom:1.5rem;">The app failed to start.</p><button onclick="location.reload()" style="padding:0.5rem 1.5rem;border:1px solid hsl(350,85%,55%,0.5);color:hsl(350,85%,55%);background:transparent;font-family:JetBrains Mono,monospace;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;border-radius:4px;">Reload</button></div>';
  }
}
