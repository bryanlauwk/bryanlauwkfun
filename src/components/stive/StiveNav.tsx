import { useNavigate } from "react-router-dom";

export const StiveNav = () => {
  const navigate = useNavigate();

  return (
    <nav style={{ background: "#08080F", borderBottom: "1px solid #1E1E30" }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/stive")} className="flex items-center gap-2">
            <div
              style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", borderRadius: "8px" }}
              className="w-8 h-8 flex items-center justify-center"
            >
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="text-white font-bold text-lg tracking-wide">STIVE</span>
          </button>
          <div className="hidden md:flex items-center gap-6">
            {["Explore", "Creator Worlds", "Drops", "About"].map((item) => (
              <button
                key={item}
                onClick={() => navigate("/stive")}
                className="text-sm transition-colors"
                style={{ color: "#9CA3AF" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/stive/upload")}
            className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all"
            style={{ background: "#7C3AED" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#8B5CF6")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#7C3AED")}
          >
            Create
          </button>
          <div
            style={{ background: "linear-gradient(135deg, #EC4899, #7C3AED)", borderRadius: "50%" }}
            className="w-9 h-9 flex items-center justify-center text-white text-sm font-bold cursor-pointer"
          >
            J
          </div>
        </div>
      </div>
    </nav>
  );
};
