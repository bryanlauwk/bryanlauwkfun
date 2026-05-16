import { useNavigate } from "react-router-dom";
import { StiveNav } from "@/components/stive/StiveNav";

const CREATOR_WORLDS = [
  {
    name: "JayGyii",
    handle: "@jaygyii",
    followers: "12.4K",
    verified: true,
    color: "#EC4899",
    emoji: "🔥",
    tags: ["Cyberpunk", "Anime"],
  },
  {
    name: "MochiLab",
    handle: "@mochilab",
    followers: "87K",
    verified: true,
    color: "#A855F7",
    emoji: "🐰",
    tags: ["Cute", "Blind Box"],
  },
  {
    name: "CyberToys",
    handle: "@cybertoys",
    followers: "109K",
    verified: true,
    color: "#06B6D4",
    emoji: "🤖",
    tags: ["Mech", "Pixel"],
  },
];

const STEPS = [
  { num: "01", label: "Upload", desc: "Drop any artwork — PNG, JPG, or illustration" },
  { num: "02", label: "AI Reads It", desc: "Style, mood, and collectible potential analysed instantly" },
  { num: "03", label: "Generate", desc: "Pick your outputs — toys, games, figurines, cards" },
  { num: "04", label: "Drop It", desc: "Share your universe page and launch your merch" },
];

const AVATARS = ["🧑‍🎨", "👩‍💻", "🎨", "🖌️"];

const Sparkle = ({ style }: { style: React.CSSProperties }) => (
  <div style={{ position: "absolute", color: "#A855F7", fontSize: 20, animation: "float-gentle 4s ease-in-out infinite", ...style }}>
    ✦
  </div>
);

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#08080F", minHeight: "100vh", color: "#F9FAFB" }}>
      <StiveNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 80, paddingBottom: 100 }}>
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 600,
            background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Sparkle style={{ top: 60, left: "10%" }} />
        <Sparkle style={{ top: 120, right: "12%", animationDelay: "1.5s", fontSize: 14 }} />
        <Sparkle style={{ top: 200, left: "22%", animationDelay: "0.8s", fontSize: 12, color: "#EC4899" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.4)", color: "#A855F7" }}
              >
                ✦ AI Creator Platform
              </div>
              <h1 className="font-black leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05 }}>
                Turn Your Art Into{" "}
                <span style={{ color: "#A855F7" }}>Playable</span>{" "}
                <span style={{ color: "#EC4899" }}>Merch</span>
                <span style={{ color: "#A855F7" }}>✦</span>
              </h1>
              <p className="text-lg mb-8" style={{ color: "#9CA3AF", maxWidth: 480 }}>
                Upload your art. AI transforms it into games, collectibles and real-world toys. Your art shouldn't stay flat.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => navigate("/stive/upload")}
                  className="px-6 py-3 rounded-xl text-white font-semibold text-base transition-all"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  Upload Your Art
                </button>
                <button
                  className="px-6 py-3 rounded-xl font-semibold text-base transition-all"
                  style={{ border: "1px solid #2A2A3E", color: "#F9FAFB", background: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7C3AED")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2A2A3E")}
                >
                  Explore Worlds
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {AVATARS.map((a, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{ background: `hsl(${260 + i * 20}, 60%, 40%)`, border: "2px solid #08080F", zIndex: 4 - i }}
                    >
                      {a}
                    </div>
                  ))}
                </div>
                <span className="text-sm" style={{ color: "#9CA3AF" }}>
                  Trusted by <span style={{ color: "#A855F7", fontWeight: 700 }}>+2.4K</span> amazing creators
                </span>
              </div>
            </div>

            {/* Right art preview */}
            <div className="relative flex items-center justify-center">
              {/* Main character card */}
              <div
                className="relative"
                style={{
                  width: 260,
                  height: 340,
                  background: "linear-gradient(160deg, #1A1A2E 0%, #2D1B69 100%)",
                  borderRadius: 20,
                  border: "1px solid rgba(168,85,247,0.4)",
                  boxShadow: "0 0 60px rgba(124,58,237,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "float-gentle 5s ease-in-out infinite",
                }}
              >
                <div style={{ fontSize: 120, filter: "drop-shadow(0 0 20px rgba(236,72,153,0.6))" }}>🔥</div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 10,
                    padding: "8px 12px",
                  }}
                >
                  <div className="font-bold text-sm text-white">Fire Fighter Girl</div>
                  <div className="text-xs" style={{ color: "#A855F7" }}>by JayGyii</div>
                </div>
              </div>

              {/* Floating mini cards */}
              {[
                { top: 20, right: -20, emoji: "🐰", label: "Blind Box", color: "#A855F7" },
                { bottom: 60, right: -30, emoji: "🎮", label: "Mini Game", color: "#06B6D4" },
                { bottom: 20, left: -30, emoji: "🃏", label: "Card", color: "#EC4899" },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: card.top,
                    bottom: card.bottom,
                    left: card.left,
                    right: card.right,
                    background: "#14141F",
                    border: `1px solid ${card.color}44`,
                    borderRadius: 12,
                    padding: "8px 12px",
                    animation: `float-gentle ${4 + i * 0.7}s ease-in-out infinite`,
                    animationDelay: `${i * 0.6}s`,
                  }}
                >
                  <div style={{ fontSize: 24 }}>{card.emoji}</div>
                  <div className="text-xs font-medium mt-1" style={{ color: card.color }}>
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ borderTop: "1px solid #1E1E30", paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-black text-3xl md:text-4xl mb-3">How it works</h2>
            <p style={{ color: "#6B7280" }}>Four steps from flat art to playable universe</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  background: "#0F0F1A",
                  border: "1px solid #1E1E30",
                  borderRadius: 16,
                  padding: 24,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#7C3AED")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#1E1E30")}
              >
                <div className="font-black text-4xl mb-3" style={{ color: "#2A2A3E" }}>
                  {step.num}
                </div>
                <div className="font-bold text-lg mb-2">{step.label}</div>
                <div className="text-sm" style={{ color: "#6B7280" }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creator Worlds */}
      <section style={{ paddingBottom: 100 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-black text-2xl md:text-3xl">Featured Creator Worlds</h2>
            <button className="text-sm font-medium" style={{ color: "#A855F7" }}>
              View all →
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {CREATOR_WORLDS.map((creator, i) => (
              <div
                key={i}
                onClick={() => navigate("/stive/universe")}
                className="cursor-pointer group"
                style={{
                  background: "#0F0F1A",
                  border: "1px solid #1E1E30",
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = creator.color + "66";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "#1E1E30";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Banner */}
                <div
                  style={{
                    height: 120,
                    background: `linear-gradient(135deg, ${creator.color}33, #1A1A2E)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                  }}
                >
                  {creator.emoji}
                </div>
                <div style={{ padding: 16 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{creator.name}</span>
                    <span style={{ color: "#06B6D4", fontSize: 14 }}>✓</span>
                  </div>
                  <div className="text-sm mb-3" style={{ color: "#6B7280" }}>
                    {creator.followers} followers
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {creator.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: creator.color + "22", color: creator.color, border: `1px solid ${creator.color}44` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ paddingBottom: 100 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="text-center rounded-2xl py-16 px-8"
            style={{ background: "linear-gradient(135deg, #1A1A2E, #2D1B69)", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            <h2 className="font-black text-3xl md:text-4xl mb-4">
              Your art shouldn't stay flat.
            </h2>
            <p className="text-lg mb-8" style={{ color: "#9CA3AF" }}>
              Upload once. Get games, figurines, collectibles, and drops.
            </p>
            <button
              onClick={() => navigate("/stive/upload")}
              className="px-8 py-4 rounded-xl text-white font-bold text-lg transition-all"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Start Creating →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
