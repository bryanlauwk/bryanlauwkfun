import { describe, expect, it } from "vitest";
import { livePreviewUrl, previewSrcFor } from "@/lib/preview";

describe("uncropped project previews", () => {
  it("captures a full 8:5 desktop frame before downsizing to a card", () => {
    const url = livePreviewUrl("https://example.com", { width: 640, height: 400 });
    expect(url).toContain("/width/640/crop/750/");
    expect(url).not.toContain("/crop/400/");
  });
  it("keeps the default desktop aspect ratio", () => {
    expect(livePreviewUrl("https://example.com")).toContain("/width/1200/crop/750/");
  });
  it("preserves social-preview dimensions", () => {
    expect(livePreviewUrl("https://example.com", { width: 1200, height: 630 })).toContain("/width/1200/crop/630/");
  });
  it("preserves uploaded artwork instead of recapturing it", () => {
    expect(previewSrcFor({ image_url: "https://example.com/art.png", href: "https://example.com" }, { width: 640, height: 400 })).toBe("https://example.com/art.png");
  });
  it("uses the corrected frame for projects without uploaded previews", () => {
    expect(previewSrcFor({ image_url: null, href: "https://example.com" }, { width: 640, height: 400 })).toContain("/width/640/crop/750/");
  });
});
