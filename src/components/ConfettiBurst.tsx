import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  velocityX: number;
  velocityY: number;
}

const colors = [
  "hsl(340 82% 52%)", // primary
  "hsl(190 80% 50%)", // accent
  "hsl(48 100% 67%)", // yellow
  "hsl(0 100% 71%)",  // coral
  "hsl(270 67% 58%)", // purple
  "hsl(160 60% 60%)", // mint
];

interface ConfettiBurstProps {
  x: number;
  y: number;
  onComplete: () => void;
}

export function ConfettiBurst({ x, y, onComplete }: ConfettiBurstProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    // Create initial confetti pieces
    const initialPieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: x,
      y: y,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      velocityX: (Math.random() - 0.5) * 15,
      velocityY: Math.random() * -12 - 5,
    }));
    setPieces(initialPieces);
  }, [x, y]);

  useEffect(() => {
    if (frame > 60) {
      onComplete();
      return;
    }

    const timer = requestAnimationFrame(() => {
      setPieces((prev) =>
        prev.map((piece) => ({
          ...piece,
          x: piece.x + piece.velocityX,
          y: piece.y + piece.velocityY,
          velocityY: piece.velocityY + 0.5, // gravity
          rotation: piece.rotation + piece.velocityX * 2,
        }))
      );
      setFrame((f) => f + 1);
    });

    return () => cancelAnimationFrame(timer);
  }, [frame, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            width: 10 * piece.scale,
            height: 10 * piece.scale,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            transform: `translate(-50%, -50%) rotate(${piece.rotation}deg)`,
            opacity: Math.max(0, 1 - frame / 60),
          }}
        />
      ))}
    </div>
  );
}
