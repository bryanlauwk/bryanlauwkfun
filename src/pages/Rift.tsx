import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import type { GameState, HudData, RiftGame } from "@/game/rift/engine";

const BEST_KEY = "rift-runner-best";

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeBest = (v: number) => {
  try {
    localStorage.setItem(BEST_KEY, String(v));
  } catch {
    /* storage unavailable — best score just won't persist */
  }
};

interface Popup {
  id: number;
  text: string;
  tone: "good" | "bad" | "info";
}

const EMPTY_HUD: HudData = { score: 0, distance: 0, hull: 3, combo: 0, speed: 0, zone: 0, shards: 0, paused: false };

const Rift = () => {
  useSEO({
    title: "Rift Runner — a 3D browser game by Bryan LauWK",
    description:
      "Pilot a lone craft through a living, bending rift. Thread gates, dodge spinning blades, chain shards and see how deep you can go. Runs in your browser.",
    canonical: "https://www.bryanlauwk.fun/rift",
  });

  const mountRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<RiftGame | null>(null);
  const [state, setState] = useState<GameState>("ready");
  const [hud, setHud] = useState<HudData>(EMPTY_HUD);
  const [finalHud, setFinalHud] = useState<HudData | null>(null);
  const [best, setBest] = useState(readBest);
  const [newBest, setNewBest] = useState(false);
  const [zoneBanner, setZoneBanner] = useState<{ key: number; name: string } | null>(null);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [muted, setMuted] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const popupId = useRef(0);

  useEffect(() => {
    document.body.classList.add("rift-mode");
    return () => document.body.classList.remove("rift-mode");
  }, []);

  useEffect(() => {
    let cancelled = false;
    let game: RiftGame | null = null;
    // Code-split three.js so the rest of the site stays light.
    import("@/game/rift/engine")
      .then(({ RiftGame }) => {
        if (cancelled || !mountRef.current) return;
        try {
          game = new RiftGame(mountRef.current, {
            onHud: setHud,
            onState: (s, h) => {
              setState(s);
              setHud(h);
              if (s === "over") {
                setFinalHud(h);
                setBest((prev) => {
                  if (h.score > prev) {
                    writeBest(h.score);
                    setNewBest(true);
                    return h.score;
                  }
                  setNewBest(false);
                  return prev;
                });
              }
            },
            onPopup: (text, tone) => {
              const id = popupId.current++;
              setPopups((p) => [...p.slice(-3), { id, text, tone }]);
              window.setTimeout(() => setPopups((p) => p.filter((x) => x.id !== id)), 1100);
            },
            onZone: (index, name) => setZoneBanner({ key: index, name }),
          });
          gameRef.current = game;
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoadError("Your browser couldn't start WebGL. Try a different browser or enable hardware acceleration.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadError("The game failed to load. Check your connection and refresh.");
        setLoading(false);
      });
    return () => {
      cancelled = true;
      game?.dispose();
      gameRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!zoneBanner) return;
    const t = window.setTimeout(() => setZoneBanner(null), 2600);
    return () => window.clearTimeout(t);
  }, [zoneBanner]);

  const start = useCallback(() => {
    setFinalHud(null);
    setNewBest(false);
    setPopups([]);
    gameRef.current?.start();
  }, []);

  const togglePause = useCallback(() => {
    const g = gameRef.current;
    if (!g || g.state !== "playing") return;
    g.setPaused(!g.isPaused());
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      gameRef.current?.setMuted(!m);
      return !m;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((k === "enter" || k === " ") && (state === "ready" || state === "over")) {
        e.preventDefault();
        start();
      } else if ((k === "escape" || k === "p") && state === "playing") {
        togglePause();
      } else if (k === "m") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, start, togglePause, toggleMute]);

  const speedKmh = Math.round(hud.speed * 36);
  const multiplier = 1 + Math.min(7, Math.floor(hud.combo / 3));

  return (
    <main className="rift-root" data-no-stamp>
      <div ref={mountRef} className="rift-canvas" aria-hidden="true" />

      {/* Top bar */}
      <div className="rift-topbar">
        <a href="/" className="rift-icon-btn" aria-label="Back to the gallery">
          <ArrowLeft />
        </a>
        <div className="rift-topbar-actions">
          {state === "playing" && (
            <button className="rift-icon-btn" onClick={togglePause} aria-label={hud.paused ? "Resume" : "Pause"}>
              {hud.paused ? <Play /> : <Pause />}
            </button>
          )}
          <button className="rift-icon-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
        </div>
      </div>

      {/* HUD */}
      {(state === "playing" || state === "dying") && (
        <>
          <div className="rift-hud-score" aria-live="off">
            <span className="rift-hud-label">SCORE</span>
            <span className="rift-hud-big">{hud.score.toLocaleString()}</span>
            <span className={`rift-mult ${multiplier > 1 ? "is-on" : ""}`}>x{multiplier}</span>
          </div>
          <div className="rift-hud-left">
            <div>
              <span className="rift-hud-label">DEPTH</span>
              <span className="rift-hud-mid">{hud.distance.toLocaleString()}m</span>
            </div>
            <div>
              <span className="rift-hud-label">VELOCITY</span>
              <span className="rift-hud-mid">{speedKmh.toLocaleString()} km/h</span>
            </div>
          </div>
          <div className="rift-hud-right">
            <span className="rift-hud-label">HULL</span>
            <div className="rift-hull">
              {[0, 1, 2].map((i) => (
                <span key={i} className={i < hud.hull ? "is-full" : ""} />
              ))}
            </div>
            <span className="rift-hud-label rift-shards">◆ {hud.shards}</span>
          </div>
        </>
      )}

      {/* Floating callouts */}
      <div className="rift-popups" aria-live="polite">
        {popups.map((p) => (
          <div key={p.id} className={`rift-popup tone-${p.tone}`}>
            {p.text}
          </div>
        ))}
      </div>

      {zoneBanner && state === "playing" && (
        <div key={zoneBanner.key} className="rift-zone">
          <span className="rift-hud-label">ENTERING SECTOR {zoneBanner.key + 1}</span>
          <span className="rift-zone-name">{zoneBanner.name}</span>
        </div>
      )}

      {hud.paused && state === "playing" && (
        <div className="rift-overlay">
          <div className="rift-panel">
            <h2 className="rift-title-sm">PAUSED</h2>
            <button className="rift-cta" onClick={togglePause}>
              RESUME
            </button>
          </div>
        </div>
      )}

      {/* Title screen */}
      {state === "ready" && (
        <div className="rift-overlay">
          <div className="rift-panel">
            <p className="rift-kicker">A BROWSER EXPERIMENT · 3D</p>
            <h1 className="rift-title">
              RIFT
              <br />
              RUNNER
            </h1>
            <p className="rift-copy">
              Something tore a hole in the world. Fly into it. Thread the gates, dodge the blades, chain shards for
              multipliers. Every sector goes deeper and faster.
            </p>
            {loadError ? (
              <p className="rift-error">{loadError}</p>
            ) : (
              <button className="rift-cta" onClick={start} disabled={loading}>
                {loading ? "CALIBRATING…" : "LAUNCH"}
              </button>
            )}
            <div className="rift-controls">
              <span>
                <kbd>MOUSE</kbd> steer
              </span>
              <span>
                <kbd>WASD</kbd>/<kbd>↑↓←→</kbd> steer
              </span>
              <span>
                <kbd>DRAG</kbd> on touch
              </span>
              <span>
                <kbd>P</kbd> pause · <kbd>M</kbd> mute
              </span>
            </div>
            {best > 0 && <p className="rift-best">BEST · {best.toLocaleString()}</p>}
          </div>
        </div>
      )}

      {/* Game over */}
      {state === "over" && finalHud && (
        <div className="rift-overlay">
          <div className="rift-panel">
            <p className="rift-kicker">SIGNAL LOST</p>
            <h2 className="rift-title-sm">{newBest ? "NEW RECORD" : "HULL DESTROYED"}</h2>
            <div className="rift-stats">
              <div>
                <span className="rift-hud-label">SCORE</span>
                <span className="rift-hud-big">{finalHud.score.toLocaleString()}</span>
              </div>
              <div>
                <span className="rift-hud-label">DEPTH</span>
                <span className="rift-hud-mid">{finalHud.distance.toLocaleString()}m</span>
              </div>
              <div>
                <span className="rift-hud-label">SECTOR</span>
                <span className="rift-hud-mid">{finalHud.zone + 1}</span>
              </div>
              <div>
                <span className="rift-hud-label">SHARDS</span>
                <span className="rift-hud-mid">{finalHud.shards}</span>
              </div>
            </div>
            <p className="rift-best">BEST · {best.toLocaleString()}</p>
            <button className="rift-cta" onClick={start}>
              FLY AGAIN
            </button>
            <p className="rift-hint">
              press <kbd>ENTER</kbd>
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Rift;
