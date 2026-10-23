import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import DropDetail from "@/pages/DropDetail";
import { projectDestination } from "@/lib/project-destination";
import type { Project } from "@/hooks/useProjects";

const state = vi.hoisted(() => ({ data: [] as Project[], isLoading: false, isError: false, isFetching: false, refetch: vi.fn() }));
vi.mock("@/hooks/useProjects", () => ({ usePublicProjects: () => state }));
vi.mock("@/hooks/useVisitorCounter", () => ({ useVisitorCounter: vi.fn() }));
vi.mock("@/hooks/useSEO", () => ({ useSEO: vi.fn() }));
// Public catalogue snapshot checked on 2026-09-22.
const catalogue = [
  ["Badminton Clash", "https://www.yuqiuren.fun/", "Badminton Lovers"],
  ["Elemental Block Blast", "https://elemental-block-blast.lovable.app", "Casual Gamers"],
  ["Infinite Kitchen", "https://infinitekitchen.bryanlauwk.fun/", "Foodies"],
  ["马年新年歌排行榜", "https://cny2026.bryanlauwk.fun/", "Trend Watcher"],
  ["Inflation Chart", "https://inflationchart.bryanlauwk.fun/", "Data Nerds"],
  ["Cafe Rush", "https://zusrush.bryanlauwk.fun/", "Coffee lovers"],
  ["Cartridge", "https://cartridge-pod.lovable.app", "Merchandise"],
  ["Artoy", "https://artoy.bryanlauwk.fun", "Art"],
  ["画啦猜啦", "https://chineseskribbl.bryanlauwk.fun", "Drawing game"],
  ["Farm-direct platform", "https://secai-marche.bryanlauwk.fun", ""],
  ["Boringg", "https://clickerlab.bryanlauwk.fun", ""],
  ["Giant Durian Run", "https://kldex.bryanlauwk.fun", "Gamers"],
];
beforeEach(() => {
  Object.assign(state, { isLoading: false, isError: false, isFetching: false });
  state.refetch.mockClear();
  state.data = catalogue.map(([title, href, tag], index) => ({
    id: String(index), title, href, tag, description: "A strange little experiment.",
    image_url: null, color: "#ff0000", display_order: index, is_visible: true,
    show_text_overlay: false, created_at: "2026-01-01", updated_at: "2026-01-01",
  }));
});
afterEach(cleanup);

it.each(["", "javascript:alert(1)", "data:text/html,hi", "broken URL"])("rejects invalid destination %s", value => {
  expect(projectDestination(value)).toBeNull();
});

function renderNotes() {
  render(<HelmetProvider><MemoryRouter initialEntries={["/drops/badminton-clash"]}><Routes><Route path="/drops/:slug" element={<DropDetail />} /></Routes></MemoryRouter></HelmetProvider>);
}
it("does not crash an existing notes page when its project URL is invalid", () => {
  state.data[0].href = "not a URL";
  renderNotes();
  expect(screen.getByText("This project isn’t available to open yet.")).toBeInTheDocument();
});
