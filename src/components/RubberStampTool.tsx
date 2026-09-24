import { useRef, useState } from "react";
import { RotateCcw, Stamp, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const labels = ["CERTIFIED DUMB", "QUESTIONABLE", "EVIDENCE", "WHY?", "TOUCHED IT"] as const;
const rotations = ["-rotate-12", "rotate-6", "-rotate-3", "rotate-12", "rotate-3"] as const;

type Mark = {
  id: number;
  x: number;
  y: number;
  label: (typeof labels)[number];
  rotation: (typeof rotations)[number];
};

export function RubberStampTool() {
  const [active, setActive] = useState(false);
  const [marks, setMarks] = useState<Mark[]>([]);
  const nextMark = useRef(0);

  const placeStamp = (event: React.PointerEvent<HTMLDivElement>) => {
    const index = nextMark.current % labels.length;
    nextMark.current += 1;
    setMarks(current => [
      ...current,
      {
        id: nextMark.current,
        x: event.clientX,
        y: event.clientY,
        label: labels[index],
        rotation: rotations[index],
      },
    ]);
  };

  return (
    <>
      {active && (
        <div
          className="fixed inset-0 z-[65] cursor-crosshair touch-none"
          onPointerDown={placeStamp}
          aria-label="Stamp canvas. Tap anywhere to leave a mark."
        >
          <p className="pointer-events-none fixed left-1/2 top-24 -translate-x-1/2 border border-primary bg-background px-3 py-2 font-mono text-[10px] font-bold uppercase text-primary shadow-sm">
            Tap anywhere. Regret nothing.
          </p>
        </div>
      )}

      <div className="pointer-events-none fixed inset-0 z-[66] overflow-hidden" aria-live="polite">
        {marks.map(mark => (
          <span
            key={mark.id}
            className={`rubber-stamp-mark absolute ${mark.rotation}`}
            style={{ left: mark.x, top: mark.y }}
          >
            {mark.label}
          </span>
        ))}
      </div>

      <div className="fixed bottom-5 left-5 z-[70] flex items-center gap-2">
        <Button
          type="button"
          variant={active ? "default" : "outline"}
          size="icon"
          aria-label={active ? "Stop stamping" : "Activate rubber stamp"}
          aria-pressed={active}
          title={active ? "Stop stamping" : "Rubber stamp tool"}
          className="h-12 w-12 rounded-none border-2 border-primary shadow-lg"
          onClick={() => setActive(value => !value)}
        >
          {active ? <X aria-hidden="true" /> : <Stamp aria-hidden="true" />}
        </Button>
        {marks.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Clear all stamps"
            title="Clear all stamps"
            className="h-12 w-12 rounded-none border-2 border-primary bg-background text-primary shadow-lg"
            onClick={() => setMarks([])}
          >
            <RotateCcw aria-hidden="true" />
          </Button>
        )}
      </div>
    </>
  );
}