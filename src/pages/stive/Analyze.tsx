import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StiveNav } from "@/components/stive/StiveNav";

const STYLE_TAGS = [
  { label: "Anime Style", icon: "✦", color: "#A855F7" },
  { label: "Cyberpunk Mood", icon: "⚡", color: "#06B6D4" },
  { label: "Mascot Potential", icon: "🌟", color: "#EAB308" },
  { label: "Collectible-Friendly", icon: "🎁", color: "#EC4899" },
  { label: "Strong Story Potential", icon: "📖", color: "#10B981" },
];

const SUGGESTED_OUTPUTS = [
  { label: "Mini Game", emoji: "🎮", color: "#A855F7", selected: true },
  { label: "3D Figurine", emoji: "🗿", color: "#06B6D4", selected: false },
  { label: "Blind Box", emoji: "📦", color: "#EC4899", selected: false },
  { label: "Acrylic Stand", emoji: "🪟", color: "#10B981", selected: false },
  { label: "Pixel Pet", emoji: "🐾", color: "#EAB308", selected: false },
];

export default function Analyze() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"scanning" | "done">("scanning");
  const [visibleTags, setVisibleTags] = useState<number>(0);
  const [selectedOutputs, setSelectedOutputs] = useState<Set<string>>(new Set(["Mini Game"]));

  const artwork = localStorage.getItem("stive_artwork");
  const filename = localStorage.getItem("stive_filename") || "Your Artwork";
  const exampleEmoji = localStorage.getItem("stive_example_emoji") || "🔥";

  useEffect(() => {
    const scanTimer = setTimeout(() => setPhase("done"), 2800);
    return () => clearTimeout(scanTimer);
  }, []);

  useEffect(() => {
    if (phase !== "done") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleTags(i);
      if (i >= STYLE_TAGS.length) clearInterval(interval);
    }, 220);
    return () => clearInterval(interval);
  }, [phase]);

  const toggleOutput = (label: string) => {
    setSelectedOutputs((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const handleGenerate = () => {
    localStorage.setItem("stive_selected_outputs", JSON.stringify([...selectedOutputs]));
    navigate("/stive/generate");
  };

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
                  background: step <= 2 ? "#7C3AED" : "#1E1E30",
                  color: step <= 2 ? "white" : "#6B7280",
                }}
              >
                {step <= 1 ? "✓" : step}
              </div>
              {step < 4 && <div style={{ width: 32, height: 2, background: step < 2 ? "#7C3AED" : "#1E1E30" }} />}
            </div>
          ))}
          <span className="ml-2 text-sm font-medium" style={{ color: "#9CA3AF" }}>
            {phase === "scanning" ? "Analysing..." : "Analysis Complete"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Artwork + scan overlay */}
          <div>
            <h1 className="font-black text-2xl md:text-3xl mb-2">
              {phase === "scanning" ? "AI is building your merch universe... ✦" : "Analysis Complete! ✦"}
            </h1>
            <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
              {phase === "scanning" ? "Reading your art's style, mood, and collectible potential..." : "Here's what AI found in your artwork."}
            </p>

            {/* Artwork with scan effect */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1A1A2E, #2D1B69)",
                border: "1px solid rgba(168,85,247,0.4)",
                height: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {artwork && artwork !== "example" ? (
                <img src={artwork} alt="artwork" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", borderRadius: 8 }} />
              ) : (
                <div style={{ fontSize: 96, filter: "drop-shadow(0 0 20px rgba(236,72,153,0.6))" }}>{exampleEmoji}</div>
              )}

              {/* Scan sweep */}
              {phase === "scanning" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(168,85,247,0.3) 50%, transparent 100%)",
                    animation: "stive-scan 1.4s linear infinite",
                    pointerEvents: "none",
                  }}
                />
              )}
              {/* Scan grid lines */}
              {phase === "scanning" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "linear-gradient(rgba(168,85,247,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.08) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                    pointerEvents: "none",
                  }}
                />
              )}
              {/* Done checkmark overlay */}
              {phase === "done" && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "rgba(16,185,129,0.2)",
                    border: "1px solid #10B981",
                    borderRadius: 8,
                    padding: "4px 8px",
                    fontSize: 12,
                    color: "#10B981",
                    fontWeight: 700,
                  }}
                >
                  ✓ Analysis Complete!
                </div>
              )}
            </div>

            {/* Tags */}
            {phase === "done" && (
              <div className="mt-4 space-y-2">
                {STYLE_TAGS.slice(0, visibleTags).map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                    style={{ animation: "stive-fade-in 0.4s ease forwards" }}
                  >
                    <span style={{ color: tag.color, fontSize: 16 }}>✓</span>
                    <span className="text-sm font-medium">{tag.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Suggested outputs */}
          <div>
            <h2 className="font-black text-xl mb-2">Suggested Outputs</h2>
            <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
              Select what to generate for your universe.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {SUGGESTED_OUTPUTS.map((output) => {
                const isSelected = selectedOutputs.has(output.label);
                return (
                  <button
                    key={output.label}
                    onClick={() => toggleOutput(output.label)}
                    className="relative rounded-xl p-4 text-left transition-all"
                    style={{
                      background: isSelected ? `${output.color}18` : "#0F0F1A",
                      border: `2px solid ${isSelected ? output.color : "#1E1E30"}`,
                    }}
                    onMouseEnter={(e) => !isSelected && ((e.currentTarget as HTMLButtonElement).style.borderColor = output.color + "55")}
                    onMouseLeave={(e) => !isSelected && ((e.currentTarget as HTMLButtonElement).style.borderColor = "#1E1E30")}
                  >
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{output.emoji}</div>
                    <div className="font-semibold text-sm">{output.label}</div>
                    {isSelected && (
                      <div
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          background: output.color,
                          borderRadius: "50%",
                          width: 18,
                          height: 18,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          color: "white",
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleGenerate}
              disabled={selectedOutputs.size === 0 || phase === "scanning"}
              className="w-full py-4 rounded-xl font-bold text-base transition-all"
              style={{
                background: selectedOutputs.size > 0 && phase === "done"
                  ? "linear-gradient(135deg, #7C3AED, #A855F7)"
                  : "#1E1E30",
                color: selectedOutputs.size > 0 && phase === "done" ? "white" : "#4B4B6B",
                cursor: selectedOutputs.size > 0 && phase === "done" ? "pointer" : "not-allowed",
              }}
            >
              {phase === "scanning" ? "Analysing..." : `✦ Generate All (${selectedOutputs.size} selected)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
