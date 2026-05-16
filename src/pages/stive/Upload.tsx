import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { StiveNav } from "@/components/stive/StiveNav";

const EXAMPLE_ARTWORKS = [
  { emoji: "🌸", label: "Sakura Witch", color: "#EC4899" },
  { emoji: "🐱", label: "Noir Cat", color: "#6B7280" },
  { emoji: "🔥", label: "Fire Girl", color: "#F97316" },
  { emoji: "⚡", label: "Zone Runner", color: "#EAB308" },
];

export default function Upload() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.match(/^image\//)) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      localStorage.setItem("stive_artwork", result);
      localStorage.setItem("stive_filename", file.name);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const handleNext = () => {
    if (preview) navigate("/stive/analyze");
  };

  const handleExample = (emoji: string, label: string) => {
    // Simulate selecting an example
    localStorage.setItem("stive_artwork", "example");
    localStorage.setItem("stive_filename", label);
    localStorage.setItem("stive_example_emoji", emoji);
    navigate("/stive/analyze");
  };

  return (
    <div style={{ background: "#08080F", minHeight: "100vh", color: "#F9FAFB" }}>
      <StiveNav />

      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: step === 1 ? "#7C3AED" : "#1E1E30",
                  color: step === 1 ? "white" : "#6B7280",
                }}
              >
                {step}
              </div>
              {step < 4 && <div style={{ width: 32, height: 2, background: step < 1 ? "#7C3AED" : "#1E1E30" }} />}
            </div>
          ))}
          <span className="ml-2 text-sm font-medium" style={{ color: "#9CA3AF" }}>Upload Artwork</span>
        </div>

        <h1 className="font-black text-3xl md:text-4xl mb-3">Upload Your Artwork</h1>
        <p className="text-base mb-8" style={{ color: "#6B7280" }}>
          Upload a character, illustration, or key visual.
        </p>

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className="relative cursor-pointer transition-all"
          style={{
            border: `2px dashed ${dragging ? "#A855F7" : preview ? "#7C3AED" : "#2A2A3E"}`,
            borderRadius: 20,
            background: dragging ? "rgba(124,58,237,0.08)" : preview ? "rgba(124,58,237,0.05)" : "#0F0F1A",
            minHeight: 280,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            marginBottom: 24,
            transition: "all 0.2s",
          }}
        >
          {preview && preview !== "example" ? (
            <div className="text-center">
              <img
                src={preview}
                alt="uploaded"
                style={{ maxHeight: 200, maxWidth: "100%", borderRadius: 12, marginBottom: 12, objectFit: "contain" }}
              />
              <div className="font-medium text-sm" style={{ color: "#A855F7" }}>✓ {fileName}</div>
              <div className="text-xs mt-1" style={{ color: "#6B7280" }}>Click to change</div>
            </div>
          ) : (
            <div className="text-center">
              <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>☁️</div>
              <div className="font-semibold text-lg mb-2">Drag and drop your image here</div>
              <div className="text-sm mb-4" style={{ color: "#6B7280" }}>or</div>
              <div
                className="px-6 py-2 rounded-lg font-semibold text-sm"
                style={{ background: "#7C3AED", color: "white", display: "inline-block" }}
              >
                Choose File
              </div>
              <div className="mt-4 text-xs" style={{ color: "#4B4B6B" }}>
                Supported formats: PNG, JPG, PSD (Max 20MB)
              </div>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>

        {/* Proceed button */}
        {preview && (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-xl font-bold text-base transition-all mb-8"
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Analyse My Art ✦
          </button>
        )}

        {/* Examples */}
        <div>
          <div className="text-sm font-medium mb-4" style={{ color: "#6B7280" }}>
            Examples — click to try
          </div>
          <div className="grid grid-cols-4 gap-3">
            {EXAMPLE_ARTWORKS.map((art) => (
              <button
                key={art.label}
                onClick={() => handleExample(art.emoji, art.label)}
                className="rounded-xl overflow-hidden transition-all text-center"
                style={{
                  background: `linear-gradient(135deg, ${art.color}22, #1A1A2E)`,
                  border: `1px solid ${art.color}33`,
                  padding: "16px 8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div style={{ fontSize: 32, marginBottom: 6 }}>{art.emoji}</div>
                <div className="text-xs font-medium" style={{ color: art.color }}>{art.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
