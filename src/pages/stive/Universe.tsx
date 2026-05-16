import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StiveNav } from "@/components/stive/StiveNav";

const TABS = ["Play", "Shop", "Collect", "Remix"];

const EXPERIENCES = [
  { type: "Mini Game", emoji: "🎮", title: "Escape The Burning Room", plays: "3.2K", likes: "842", color: "#7C3AED", badge: "PLAY NOW" },
  { type: "Virtual Pet", emoji: "🐱", title: "Cinder — Fire Cat", plays: "1.1K", likes: "390", color: "#EC4899", badge: "ADOPT" },
  { type: "Sticker Pack", emoji: "🌸", title: "FF Girl Emotions", plays: "2.8K", likes: "521", color: "#EAB308", badge: "COLLECT" },
  { type: "Figurine", emoji: "🗿", title: "Chibi Firefighter 15cm", plays: "—", likes: "1.2K", color: "#06B6D4", badge: "BUY" },
  { type: "Card Collection", emoji: "🃏", title: "Holo Series Vol.1", plays: "—", likes: "670", color: "#10B981", badge: "TRADE" },
  { type: "New Experience", emoji: "✦", title: "Generate Something New", plays: "—", likes: "—", color: "#2A2A3E", badge: "CREATE", isNew: true },
];

const LATEST_DROP = {
  title: "Artist Fire Extinguisher Series",
  type: "Limited Drop",
  ends: "6d 18h 24m",
  image: "🔥",
  color: "#EC4899",
};

export default function Universe() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Play");
  const [copied, setCopied] = useState(false);

  const filename = localStorage.getItem("stive_filename") || "Fire Fighter Girl";
  const artwork = localStorage.getItem("stive_artwork");
  const exampleEmoji = localStorage.getItem("stive_example_emoji") || "🔥";

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "#08080F", minHeight: "100vh", color: "#F9FAFB" }}>
      <StiveNav />

      {/* Universe header */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(124,58,237,0.2) 0%, #08080F 100%)",
          borderBottom: "1px solid #1E1E30",
          paddingBottom: 0,
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-10 flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Avatar */}
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 20,
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                border: "3px solid #A855F7",
                boxShadow: "0 0 30px rgba(168,85,247,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                flexShrink: 0,
              }}
            >
              {artwork && artwork !== "example" ? (
                <img src={artwork} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 18 }} />
              ) : (
                exampleEmoji
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-black text-2xl md:text-3xl uppercase tracking-wide">JAYGYII UNIVERSE</h1>
                <span style={{ color: "#06B6D4", fontSize: 18 }}>✓</span>
              </div>
              <div className="flex flex-wrap gap-6 mb-4">
                {[
                  { label: "Followers", value: "12.4K" },
                  { label: "Drops", value: "8" },
                  { label: "Playable Toys", value: "3" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-black text-xl">{stat.value}</div>
                    <div className="text-xs" style={{ color: "#6B7280" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#1E1E30", color: "#9CA3AF", border: "1px solid #2A2A3E" }}
                >
                  {copied ? "✓ Copied!" : "⎘ Share Universe"}
                </button>
                <button
                  onClick={() => navigate("/stive/upload")}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#7C3AED", color: "white" }}
                >
                  + New Drop
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-3 text-sm font-semibold transition-all relative"
                style={{ color: activeTab === tab ? "#A855F7" : "#6B7280" }}
              >
                {tab}
                {activeTab === tab && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "#A855F7",
                      borderRadius: "2px 2px 0 0",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main content */}
          <div>
            {/* Featured character */}
            <div className="mb-8">
              <div className="text-xs font-medium mb-3" style={{ color: "#6B7280" }}>FEATURED CHARACTER</div>
              <div
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{ background: "#0F0F1A", border: "1px solid #1E1E30" }}
              >
                <div
                  style={{
                    width: 80,
                    height: 100,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #2D1B69, #1A1A2E)",
                    border: "1px solid rgba(168,85,247,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    flexShrink: 0,
                    animation: "float-gentle 5s ease-in-out infinite",
                  }}
                >
                  {artwork && artwork !== "example" ? (
                    <img src={artwork} alt="character" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
                  ) : (
                    exampleEmoji
                  )}
                </div>
                <div>
                  <div className="font-bold text-base mb-1">{filename}</div>
                  <div className="text-sm mb-2" style={{ color: "#6B7280" }}>
                    Cyberpunk firefighter who rescues cats from burning buildings. Wields a neon fire extinguisher.
                  </div>
                  <div className="flex gap-2">
                    {["Cyberpunk", "Anime", "Action"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(168,85,247,0.15)", color: "#A855F7", border: "1px solid rgba(168,85,247,0.3)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Experiences */}
            <div>
              <div className="text-xs font-medium mb-4" style={{ color: "#6B7280" }}>GENERATED EXPERIENCES</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {EXPERIENCES.map((exp, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden cursor-pointer transition-all group"
                    style={{
                      background: exp.isNew ? "transparent" : "#0F0F1A",
                      border: `1px solid ${exp.isNew ? "#1E1E30" : exp.color + "33"}`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "translateY(-3px)";
                      if (!exp.isNew) el.style.borderColor = exp.color + "77";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "translateY(0)";
                      el.style.borderColor = exp.isNew ? "#1E1E30" : exp.color + "33";
                    }}
                    onClick={() => exp.isNew && navigate("/stive/upload")}
                  >
                    <div
                      style={{
                        height: 100,
                        background: exp.isNew
                          ? "repeating-linear-gradient(45deg, #0F0F1A, #0F0F1A 10px, #14141F 10px, #14141F 20px)"
                          : `linear-gradient(135deg, ${exp.color}18, #1A1A2E)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: exp.isNew ? 28 : 40,
                        color: exp.isNew ? "#2A2A3E" : undefined,
                      }}
                    >
                      {exp.emoji}
                    </div>
                    <div style={{ padding: 12 }}>
                      <div className="font-semibold text-xs mb-0.5" style={{ color: exp.isNew ? "#4B4B6B" : "#F9FAFB" }}>
                        {exp.title}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: "#6B7280" }}>{exp.type}</span>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: exp.isNew ? "#1E1E30" : exp.color + "22", color: exp.isNew ? "#4B4B6B" : exp.color }}
                        >
                          {exp.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Latest drop */}
            <div
              style={{
                background: "#0F0F1A",
                border: "1px solid #1E1E30",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${LATEST_DROP.color}22, #1A1A2E)`,
                  padding: 16,
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${LATEST_DROP.color}44, #2D1B69)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    flexShrink: 0,
                  }}
                >
                  {LATEST_DROP.image}
                </div>
                <div>
                  <div className="text-xs font-medium mb-0.5" style={{ color: "#6B7280" }}>LATEST DROP</div>
                  <div className="font-bold text-sm">{LATEST_DROP.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: LATEST_DROP.color }}>
                    Ends in {LATEST_DROP.ends}
                  </div>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <button
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "white" }}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Stats card */}
            <div style={{ background: "#0F0F1A", border: "1px solid #1E1E30", borderRadius: 16, padding: 16 }}>
              <div className="text-xs font-medium mb-3" style={{ color: "#6B7280" }}>UNIVERSE STATS</div>
              <div className="space-y-3">
                {[
                  { label: "Total Plays", value: "7.1K", icon: "🎮" },
                  { label: "Collectors", value: "312", icon: "🏆" },
                  { label: "Remixes", value: "48", icon: "🔀" },
                  { label: "Revenue", value: "RM 4,280", icon: "💰" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#9CA3AF" }}>
                      <span>{s.icon}</span> {s.label}
                    </div>
                    <div className="font-bold text-sm">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create new */}
            <button
              onClick={() => navigate("/stive/upload")}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ border: "1px dashed #2A2A3E", color: "#6B7280", background: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#7C3AED";
                (e.currentTarget as HTMLButtonElement).style.color = "#A855F7";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A3E";
                (e.currentTarget as HTMLButtonElement).style.color = "#6B7280";
              }}
            >
              + Add New Artwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
