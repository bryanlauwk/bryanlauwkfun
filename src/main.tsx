import { createRoot } from "react-dom/client";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

async function renderApp() {
  try {
    const { default: App } = await import("./App.tsx");
    root.render(<App />);
  } catch (e) {
    console.error("App failed to load:", e);
    root.render(
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1.5rem",
        fontFamily: "Georgia, serif",
      }}>
        <div>
          <h1 style={{ color: "hsl(350,85%,55%)", fontSize: "2rem", marginBottom: "1rem", letterSpacing: "0.1em" }}>
            Signal Lost
          </h1>
          <p style={{ color: "hsl(240,5%,65%)", fontFamily: "monospace", fontSize: "0.875rem", marginBottom: "2rem" }}>
            The connection dropped momentarily. Click below to retune.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.75rem 1.5rem",
              border: "1px solid hsl(350,85%,55%,0.5)",
              background: "transparent",
              color: "hsl(350,85%,55%)",
              fontFamily: "monospace",
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}

renderApp();
