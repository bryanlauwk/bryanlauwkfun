import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StiveNav } from "@/components/stive/StiveNav";

const STYLES = [
  { label: "Cute Chibi", emoji: "🌸", active: false },
  { label: "Pixel RPG", emoji: "🕹️", active: true },
  { label: "Cyberpunk", emoji: "⚡", active: false },
  { label: "Horror", emoji: "💀", active: false },
  { label: "Retro Arcade", emoji: "🎰", active: false },
  { label: "Minimal", emoji: "◆", active: false },
];

const OUTPUT_TYPES = [
  { label: "Mini Web Game", emoji: "🎮", credits: 10 },
  { label: "Toy Packaging", emoji: "📦", credits: 6 },
  { label: "3D Figurine", emoji: "🗿", credits: 15 },
  { label: "Animated GIF", emoji: "✨", credits: 8 },
  { label: "Trading Card", emoji: "🃏", credits: 5 },
];

const GENERATED_RESULTS = [
  {
    type: "Mini Web Game",
    emoji: "🎮",
    title: "Escape The Burning Room",
    desc: "Help the firefighter girl escape and rescue the cats!",
    color: "#7C3AED",
    badge: "PLAYABLE",
    stats: { label1: "Best Score", v1: "1,248", label2: "Plays", v2: "3.2K", label3: "Likes", v3: "842" },
  },
  {
    type: "Toy Packaging",
    emoji: "📦",
    title: "Fire Fighter Girl — Series 1",
    desc: "Limited blind box packaging concept for physical drop.",
    color: "#EC4899",
    badge: "MOCKUP",
    stats: { label1: "Edition", v1: "Limited", label2: "Units", v2: "500", label3: "Price", v3: "RM 39" },
  },
  {
    type: "3D Figurine",
    emoji: "🗿",
    title: "Chibi Firefighter — 15cm",
    desc: "Articulated chibi figurine with glow-in-the-dark accessories.",
    color: "#06B6D4",
    badge: "CONCEPT",
    stats: { label1: "Height", v1: "15cm", label2: "Joints", v2: "6", label3: "Est.", v3: "RM 89" },
  },
  {
    type: "Animated GIF",
    emoji: "✨",
    title: "Idle Animation Loop",
    desc: "Looping idle animation ready for Discord and social posts.",
    color: "#EAB308",
    badge: "READY",
    stats: { label1: "Frames", v1: "24", label2: "FPS", v2: "12", label3: "Size", v3: "1.2MB" },
  },
  {
    type: "Trading Card",
    emoji: "🃏",
    title: "Holo Card — Fire Fighter Girl",
    desc: "Collectible holographic trading card with lore.",
    color: "#10B981",
    badge: "CARD",
    stats: { label1: "Rarity", v1: "Rare", label2: "Foil", v2: "Holo", label3: "Series", v3: "#001" },
  },
];

export default function Generate() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState("Pixel RPG");
  const [selectedOutputs, setSelectedOutputs] = useState<Set<string>>(new Set(["Mini Web Game"]));
  const [phase, setPhase] = useState<"idle" | "generating" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [visibleResults, setVisibleResults] = useState<number>(0);

  const filename = localStorage.getItem("stive_filename") || "Fire Fighter Girl";
  const exampleEmoji = localStorage.getItem("stive_example_emoji") || "🔥";
  const artwork = localStorage.getItem("stive_artwork");

  useEffect(() => {
    const saved = localStorage.getItem("stive_selected_outputs");
    if (saved) {
      try {
        setSelectedOutputs(new Set(JSON.parse(saved)));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (phase !== "generating") return;
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 300);
      }
      setProgress(Math.min(p, 100));
    }, 160);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleResults(i);
      if (i >= filteredResults.length) clearInterval(interval);
    }, 250);
    return () => clearInterval(interval);
  }, [phase]);

  const toggleOutput = (label: string) => {
    setSelectedOutputs((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const filteredResults = GENERATED_RESULTS.filter((r) => selectedOutputs.has(r.type));

  return (
    <div style={{ background: "#08080F", minHeight: "100vh", color: "#F9FAFB" }}>
      <StiveNav />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: step <= 3 ? "#7C3AED" : "#1E1E30",
                  color: step <= 3 ? "white" : "#6B7280",
                }}
              >
                {step < 3 ? "✓" : step}
              </div>
              {step < 4 && <div style={{ width: 32, height: 2, background: step < 3 ? "#7C3AED" : "#1E1E30" }} />}
            </div>
          ))}
          <span className="ml-2 text-sm font-medium" style={{ color: "#9CA3AF" }}>Generate Experiences</span>
        </div>

        {phase === "idle" && (
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-8">
            {/* Left: Controls */}
            <div>
              <div className="mb-6">
                <div className="text-xs font-medium mb-2" style={{ color: "#6B7280" }}>BASED ON</div>
                <div
                  className="flex items-center gap-3 px-3 py-2 rounded-xl"
                  style={{ background: "#0F0F1A", border: "1px solid #1E1E30" }}
                >
                  <div style={{ fontSize: 28 }}>{artwork && artwork !== "example" ? "🖼️" : exampleEmoji}</div>
                  <div>
                    <div className="font-semibold text-sm">{filename}</div>
                    <button className="text-xs" style={{ color: "#A855F7" }}>View Character</button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs font-medium mb-3" style={{ color: "#6B7280" }}>CHOOSE STYLE</div>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedStyle(s.label)}
                      className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: selectedStyle === s.label ? "#7C3AED" : "#0F0F1A",
                        border: `1px solid ${selectedStyle === s.label ? "#A855F7" : "#1E1E30"}`,
                        color: selectedStyle === s.label ? "white" : "#9CA3AF",
                      }}
                    >
                      {s.emoji} {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="text-xs font-medium mb-3" style={{ color: "#6B7280" }}>CHOOSE OUTPUT</div>
                <div className="space-y-2">
                  {OUTPUT_TYPES.map((o) => {
                    const selected = selectedOutputs.has(o.label);
                    return (
                      <button
                        key={o.label}
                        onClick={() => toggleOutput(o.label)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
                        style={{
                          background: selected ? "rgba(124,58,237,0.12)" : "#0F0F1A",
                          border: `1px solid ${selected ? "#7C3AED" : "#1E1E30"}`,
                        }}
                      >
                        <span style={{ fontSize: 22 }}>{o.emoji}</span>
                        <span className="flex-1 font-medium text-sm">{o.label}</span>
                        <span className="text-xs" style={{ color: "#6B7280" }}>{o.credits} credits</span>
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            border: `2px solid ${selected ? "#7C3AED" : "#2A2A3E"}`,
                            background: selected ? "#7C3AED" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            color: "white",
                            flexShrink: 0,
                          }}
                        >
                          {selected ? "✓" : ""}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setPhase("generating")}
                disabled={selectedOutputs.size === 0}
                className="w-full py-4 rounded-xl font-bold text-base transition-all"
                style={{
                  background: selectedOutputs.size > 0 ? "linear-gradient(135deg, #7C3AED, #A855F7)" : "#1E1E30",
                  color: selectedOutputs.size > 0 ? "white" : "#4B4B6B",
                }}
              >
                ✦ Generate ({selectedOutputs.size} outputs)
              </button>
              <div className="text-center text-xs mt-2" style={{ color: "#4B4B6B" }}>
                This will use {[...selectedOutputs].reduce((sum, s) => sum + (OUTPUT_TYPES.find(o => o.label === s)?.credits ?? 0), 0)} credits
              </div>
            </div>

            {/* Right: Preview placeholder */}
            <div className="hidden md:block">
              <div className="text-xs font-medium mb-3" style={{ color: "#6B7280" }}>PREVIEW</div>
              <div
                style={{
                  background: "#0F0F1A",
                  border: "1px solid #1E1E30",
                  borderRadius: 20,
                  height: 460,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 56, opacity: 0.2 }}>✦</div>
                <div className="text-sm font-medium" style={{ color: "#4B4B6B" }}>Select outputs and hit generate</div>
                <div className="text-xs" style={{ color: "#2A2A3E" }}>Your experiences will appear here</div>
              </div>
            </div>
          </div>
        )}

        {/* Generating state */}
        {phase === "generating" && (
          <div className="max-w-md mx-auto text-center py-20">
            <div style={{ fontSize: 64, marginBottom: 24, animation: "float-gentle 2s ease-in-out infinite" }}>✦</div>
            <h2 className="font-black text-2xl mb-3">Building your universe...</h2>
            <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
              AI is generating {selectedOutputs.size} experience{selectedOutputs.size > 1 ? "s" : ""} in {selectedStyle} style
            </p>
            <div
              style={{
                background: "#1E1E30",
                borderRadius: 999,
                height: 6,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  background: "linear-gradient(90deg, #7C3AED, #EC4899)",
                  height: "100%",
                  width: `${progress}%`,
                  transition: "width 0.2s ease",
                  borderRadius: 999,
                }}
              />
            </div>
            <div className="text-xs" style={{ color: "#6B7280" }}>{Math.round(progress)}%</div>
          </div>
        )}

        {/* Done — results */}
        {phase === "done" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-black text-2xl">Your experiences are ready ✦</h2>
                <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                  {filteredResults.length} outputs generated in {selectedStyle} style
                </p>
              </div>
              <button
                onClick={() => navigate("/stive/universe")}
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "white" }}
              >
                View Universe →
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.slice(0, visibleResults).map((result, i) => (
                <div
                  key={i}
                  style={{
                    background: "#0F0F1A",
                    border: `1px solid ${result.color}44`,
                    borderRadius: 16,
                    overflow: "hidden",
                    animation: "stive-fade-in 0.4s ease forwards",
                  }}
                >
                  {/* Preview area */}
                  <div
                    style={{
                      height: 160,
                      background: `linear-gradient(135deg, ${result.color}18, #1A1A2E)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div style={{ fontSize: 56, animation: "float-gentle 4s ease-in-out infinite" }}>{result.emoji}</div>
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        background: result.color,
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontSize: 9,
                        fontWeight: 800,
                        color: "white",
                        letterSpacing: 1,
                      }}
                    >
                      {result.badge}
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{ padding: 16 }}>
                    <div className="font-bold text-sm mb-1">{result.title}</div>
                    <div className="text-xs mb-3" style={{ color: "#6B7280" }}>{result.desc}</div>
                    <div className="grid grid-cols-3 gap-2 text-center mb-3">
                      {[
                        { label: result.stats.label1, value: result.stats.v1 },
                        { label: result.stats.label2, value: result.stats.v2 },
                        { label: result.stats.label3, value: result.stats.v3 },
                      ].map((stat) => (
                        <div key={stat.label} style={{ background: "#14141F", borderRadius: 8, padding: "6px 4px" }}>
                          <div className="font-bold text-xs">{stat.value}</div>
                          <div style={{ fontSize: 9, color: "#6B7280" }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: result.color, color: "white" }}
                      >
                        {result.type === "Mini Web Game" ? "▶ Play Now" : "↓ Download"}
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: "#1E1E30", color: "#9CA3AF" }}
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {visibleResults >= filteredResults.length && filteredResults.length > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => navigate("/stive/universe")}
                  className="px-8 py-4 rounded-xl font-bold text-base transition-all"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "white" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Publish Universe Page →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
