import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Maximize2, Minimize2, Stamp } from "lucide-react";
import { recordStampReaction } from "@/hooks/useStampReactions";

const LABELS = [
  "CERTIFIED",
  "???",
  "CERTIFIED DUMB",
  "EVIDENCE",
  "WHY?",
  "QUESTIONABLE",
  "NO NOTES",
  "I WAS HERE",
  "SEND HELP",
];

interface StampMark {
  id: number;
  x: number;
  y: number;
  label: string;
  rotation: number;
}

export function InteractiveStampTool() {
  const [active, setActive] = useState(false);
  const [marks, setMarks] = useState<StampMark[]>([]);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [selectedLabel, setSelectedLabel] = useState(LABELS[0]);
  const [guideVisible, setGuideVisible] = useState(true);
  const [dockMinimized, setDockMinimized] = useState(false);
  const nextId = useRef(0);

  useEffect(() => {
    document.body.classList.toggle("stamp-mode", active);
    if (!active) return () => document.body.classList.remove("stamp-mode");

    const moveCursor = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    const stamp = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".interactive-stamp-dock, .interactive-stamp-mark")) return;
      if (target.closest("button, a, input, textarea, select, [role='button'], [data-no-stamp]")) return;

      const pagePath = window.location.pathname;
      const areaKey = target.closest<HTMLElement>("section[id]")?.id || "page";
      if (!pagePath.startsWith("/admin") && !pagePath.startsWith("/auth") && !pagePath.startsWith("/.lovable/")) {
        void recordStampReaction(selectedLabel, pagePath, areaKey.slice(0, 80)).catch((error) => {
          console.warn("Could not record anonymous stamp reaction:", error.message);
        });
      }

      setMarks((current) => [...current, {
        id: nextId.current++,
        x: event.clientX,
        y: event.clientY,
        label: selectedLabel,
        rotation: Math.round((Math.random() * 18 - 9) * 10) / 10,
      }]);
    };

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("pointerdown", stamp);
    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerdown", stamp);
      document.body.classList.remove("stamp-mode");
    };
  }, [active, selectedLabel]);

  return createPortal((
    <>
      {marks.map((mark) => (
        <span
          key={mark.id}
          className="interactive-stamp-mark"
          style={{ left: mark.x, top: mark.y, transform: `translate(-50%, -50%) rotate(${mark.rotation}deg)` }}
          aria-hidden="true"
        >
          {mark.label}
        </span>
      ))}

      {active && (
        <span
          className="interactive-stamp-cursor"
          style={{ left: cursor.x, top: cursor.y }}
          aria-hidden="true"
        >
          <span>{selectedLabel}</span>
        </span>
      )}

      {dockMinimized ? (
        <aside className="interactive-stamp-dock interactive-stamp-dock-minimized" aria-label="Page stamp tool">
          <button type="button" className="interactive-stamp-mini-button" onClick={() => setDockMinimized(false)} aria-label="Open stamp tool" title="Open stamp tool">
            <Stamp aria-hidden="true" />
            <span>STAMP</span>
            {marks.length > 0 && <span className="interactive-stamp-mini-count">{marks.length}</span>}
            <Maximize2 className="interactive-stamp-expand-icon" aria-hidden="true" />
          </button>
        </aside>
      ) : (
        <aside className="interactive-stamp-dock" aria-label="Page stamp tool">
          <div className="interactive-stamp-dock-head">
            <span>PUBLIC OPINION MACHINE</span>
            <div className="interactive-stamp-dock-actions">
              <button
                type="button"
                className="interactive-stamp-action"
                aria-expanded={guideVisible}
                aria-controls="interactive-stamp-guide"
                aria-label={guideVisible ? "Hide stamp instructions" : "Show stamp instructions"}
                title={guideVisible ? "Hide instructions" : "Show instructions"}
                onClick={() => setGuideVisible((visible) => !visible)}
              >
                {guideVisible ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
              </button>
              <button
                type="button"
                className="interactive-stamp-action"
                aria-label="Minimize stamp tool"
                title="Minimize stamp tool"
                onClick={() => { setActive(false); setDockMinimized(true); }}
              >
                <Minimize2 aria-hidden="true" />
              </button>
            </div>
          </div>

          {guideVisible && (
            <div className="interactive-stamp-guide" id="interactive-stamp-guide">
              <svg className="interactive-stamp-sketch" viewBox="0 0 92 68" fill="none" aria-hidden="true">
                <path d="M11 12c9 0 15 3 21 9l9 10m-30-7c8 0 13 2 19 8l8 9m-25-3c7 1 11 3 16 8l7 8m10-17 1-24c0-5 7-5 7 0l1 18 2-10c1-5 8-4 8 1l-1 10 3-7c2-4 8-2 7 3l-2 12c-1 10-8 17-19 18l-10-1c-5-1-8-4-12-9L13 39c-3-4 2-9 6-6l13 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M49 5c10-4 23-1 30 5m-1-7 2 8-9-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" />
              </svg>
              <div>
                <p className="interactive-stamp-kicker">A tiny public opinion machine</p>
                <p className="interactive-stamp-instruction"><b>1</b> Pick a stamp <span aria-hidden="true">→</span> <b>2</b> Tap anywhere</p>
                <p className="interactive-stamp-note">Your stamp and page area are counted anonymously.</p>
              </div>
            </div>
          )}

          <div className="interactive-stamp-options" aria-label="Choose a stamp">
            {LABELS.map((label) => (
              <button
                key={label}
                type="button"
                className="interactive-stamp-option"
                aria-pressed={selectedLabel === label}
                onClick={() => setSelectedLabel(label)}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="interactive-stamp-toggle"
            aria-pressed={active}
            onClick={() => setActive((enabled) => !enabled)}
          >
            <span aria-hidden="true">{active ? "✳" : "▣"}</span>
            {active ? "DONE — KEEP PLAYING" : "STAMP THIS PAGE"}
          </button>
          {marks.length > 0 && <span className="interactive-stamp-count" aria-live="polite">{marks.length} {marks.length === 1 ? "mark" : "marks"} on this visit</span>}
        </aside>
      )}
    </>
  ), document.body);
}
