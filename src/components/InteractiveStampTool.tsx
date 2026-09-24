import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const LABELS = ["CERTIFIED DUMB", "EVIDENCE", "WHY?", "QUESTIONABLE"];

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
  const nextId = useRef(0);
  const nextLabel = useRef(0);

  useEffect(() => {
    document.body.classList.toggle("stamp-mode", active);
    if (!active) return () => document.body.classList.remove("stamp-mode");

    const moveCursor = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    const stamp = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".interactive-stamp-toggle, .interactive-stamp-mark")) return;
      if (target.closest("button, a, input, textarea, select, [role='button'], [data-no-stamp]")) return;

      const label = LABELS[nextLabel.current % LABELS.length];
      nextLabel.current += 1;
      setMarks((current) => [...current, {
        id: nextId.current++,
        x: event.clientX,
        y: event.clientY,
        label,
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
  }, [active]);

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
          <span>CERTIFIED</span>
        </span>
      )}

      <button
        type="button"
        className="interactive-stamp-toggle"
        aria-pressed={active}
        onClick={() => setActive((enabled) => !enabled)}
      >
        <span aria-hidden="true">▣</span> {active ? "STAMP ON" : "STAMP"}
      </button>
    </>
  ), document.body);
}
