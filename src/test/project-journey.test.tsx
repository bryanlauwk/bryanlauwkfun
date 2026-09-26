import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "@/pages/Index";
import DropDetail from "@/pages/DropDetail";
import { ProjectGrid } from "@/components/ProjectGrid";
import { CinematicHeader } from "@/components/CinematicHeader";
import { projectDestination } from "@/lib/project-destination";
import type { Project } from "@/hooks/useProjects";

const state = vi.hoisted(() => ({ data: [] as Project[], isLoading: false, isError: false, isFetching: false, refetch: vi.fn() }));
vi.mock("@/hooks/useProjects", () => ({ usePublicProjects: () => state }));
vi.mock("@/hooks/useVisitorCounter", () => ({ useVisitorCounter: vi.fn() }));
vi.mock("@/components/SoundToggle", () => ({ SoundToggle: () => <button>Sound</button> }));
vi.mock("@/hooks/useSEO", () => ({ useSEO: vi.fn() }));
vi.mock("@/components/RedactionReveal", () => ({ MarkerUnderline: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }));
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

describe("one-click project journey", () => {
  it.each(catalogue)("launches %s directly", (title, href) => {
    render(<ProjectGrid />);
    const link = screen.getByRole("link", { name: `Try ${title} (opens in a new tab)` });
    expect(link).toHaveAttribute("href", new URL(href).href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.getAttribute("href")).not.toContain("/drops/");
  });
  it("searches the collection and clears without a separate page", () => {
    render(<ProjectGrid />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "boringg" } });
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("status")).toHaveTextContent("1 experiment found");
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getAllByRole("link")).toHaveLength(12);
  });
  it("does not turn one-off audience labels into a crowded filter row", () => {
    render(<ProjectGrid />);
    expect(screen.queryByRole("group", { name: "Filter experiments" })).not.toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });
  it("fits the complete preview without cover-cropping or hover zoom", () => {
    const { container } = render(<ProjectGrid />);
    const preview = container.querySelector("img");
    expect(preview).toHaveClass("object-contain");
    expect(preview).not.toHaveClass("object-cover");
    expect(preview?.className).not.toContain("scale-");
  });
  it("supports useful shared categories with pressed-button semantics", () => {
    state.data.forEach((p, i) => { p.tag = i < 6 ? (i % 2 ? "games" : "game") : "art"; });
    render(<ProjectGrid />);
    fireEvent.click(screen.getByRole("button", { name: "games" }));
    expect(screen.getAllByRole("link")).toHaveLength(6);
    expect(screen.getByRole("button", { name: "games" })).toHaveAttribute("aria-pressed", "true");
  });
  it("offers a recovery for no matches", () => {
    render(<ProjectGrid />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "xyz-does-not-exist" } });
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    fireEvent.click(screen.getAllByRole("button", { name: "Show everything" })[0]);
    expect(screen.getAllByRole("link")).toHaveLength(12);
  });
  it("distinguishes a failed catalogue from an empty one and allows retry", () => {
    state.isError = true;
    render(<ProjectGrid />);
    expect(screen.getByRole("alert")).toHaveTextContent("technical gremlin");
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(state.refetch).toHaveBeenCalledOnce();
  });
  it("does not capture page arrows or Space outside project links", () => {
    render(<ProjectGrid />);
    expect(fireEvent.keyDown(window, { key: "ArrowDown" })).toBe(true);
    expect(fireEvent.keyDown(window, { key: " " })).toBe(true);
  });
  it("falls back to notes for a missing destination without unsafe navigation", () => {
    state.data[0].href = "javascript:alert(1)";
    render(<ProjectGrid />);
    const link = screen.getByRole("link", { name: "Read about Badminton Clash" });
    expect(link.getAttribute("href")).toMatch(/^\/drops\//);
    expect(link).not.toHaveAttribute("target");
  });
});

it("keeps navigation useful on existing detail pages", () => {
  render(<MemoryRouter initialEntries={["/drops/boringg"]}><CinematicHeader /></MemoryRouter>);
  const nav = within(screen.getByRole("navigation", { name: "Primary navigation" }));
  expect(nav.getByRole("link", { name: "Play" })).toHaveAttribute("href", "/#browser-work");
  expect(nav.getByRole("link", { name: "Collaborate" })).toHaveAttribute("href", "/#contact");
  expect(nav.queryByRole("link", { name: "Brewing" })).not.toBeInTheDocument();
});

it.each(["", "javascript:alert(1)", "data:text/html,hi", "broken URL"])("rejects invalid destination %s", value => {
  expect(projectDestination(value)).toBeNull();
});

it("gives the hero a clear route to the playable projects", () => {
  render(<MemoryRouter><Index /></MemoryRouter>);
  expect(screen.getByRole("link", { name: "Play something" })).toHaveAttribute("href", "#browser-work");
  expect(document.getElementById("browser-work")).toBeInTheDocument();
  expect(document.getElementById("physical-work")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("don’t die");
});

it("features Giant Durian Run and removes the old Durian Dash feature", () => {
  render(<MemoryRouter><Index /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "GIANT DURIAN RUN" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Run the course/ })).toHaveAttribute("href", "https://kldex.bryanlauwk.fun/");
  expect(screen.getByTitle("Interactive mobile and desktop preview of Giant Durian Run")).toHaveAttribute("src", "https://kldex.bryanlauwk.fun/");
  expect(document.querySelector(".feature-preview-caption")).toHaveTextContent("LIVE PREVIEW · KLDEX");
  expect(document.querySelector(".feature-story > .feature-preview")).toBeInTheDocument();
  expect(document.querySelector(".feature-story > .feature-copy")).toBeInTheDocument();
  expect(document.querySelector(".feature-durian")).not.toBeInTheDocument();
  expect(screen.queryByText(/Durian Dash/i)).not.toBeInTheDocument();
});

it("keeps the hero portrait uncropped inside its playful editorial frame", () => {
  render(<MemoryRouter><Index /></MemoryRouter>);
  const portraits = screen.getAllByRole("img", { name: /Bryan Lau playing the/ });
  expect(portraits).toHaveLength(2);
  portraits.forEach(portrait => {
    expect(portrait).toHaveClass("hero-portrait-image");
    expect(portrait).not.toHaveClass("object-cover");
  });
  expect(screen.getByText("THE BRYAN-ON-BRYAN SHOW")).toBeInTheDocument();
  expect(screen.getByText("MAKE?", { exact: true })).toBeInTheDocument();
});

it("introduces the maker with a readable, alternating section rhythm and useful FAQs", () => {
  render(<MemoryRouter><Index /></MemoryRouter>);
  expect(document.getElementById("featured")).toHaveClass("section-band-even");
  expect(document.getElementById("about")).toHaveClass("section-band-odd");
  expect(document.getElementById("browser-work")).toHaveClass("section-band-even");
  expect(screen.getByText("Who’s behind the playground?")).toBeInTheDocument();
  expect(screen.getByText("Can we make something together?")).toBeInTheDocument();
  expect(document.querySelectorAll(".about-faq")).toHaveLength(5);
  expect(document.querySelector(".about-faq[open]")).not.toBeInTheDocument();
});

function renderNotes() {
  render(<HelmetProvider><MemoryRouter initialEntries={["/drops/badminton-clash"]}><Routes><Route path="/drops/:slug" element={<DropDetail />} /></Routes></MemoryRouter></HelmetProvider>);
}
it("keeps existing project-note URLs and a return path to the collection", () => {
  renderNotes();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Badminton Clash");
  expect(screen.getByRole("link", { name: "Try it" })).toHaveAttribute("href", "https://www.yuqiuren.fun/");
  expect(screen.getByRole("link", { name: "All experiments" })).toHaveAttribute("href", "/#browser-work");
});
it("does not crash an existing notes page when its project URL is invalid", () => {
  state.data[0].href = "not a URL";
  renderNotes();
  expect(screen.getByText("This project isn’t available to open yet.")).toBeInTheDocument();
});
