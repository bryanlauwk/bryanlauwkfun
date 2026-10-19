import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import StudioPreview from "@/pages/StudioPreview";
import DropDetail from "@/pages/DropDetail";
import { bundledPublicProjects } from "@/data/public-projects";
import { projectPresentation } from "@/lib/studio-projects";

const state = vi.hoisted(() => ({ data: undefined as unknown, isLoading: false, isError: false, isFetching: false, refetch: vi.fn() }));
vi.mock("@/hooks/useProjects", () => ({ usePublicProjects: () => state }));
vi.mock("@/hooks/useSEO", () => ({ useSEO: vi.fn() }));
const redirect = vi.hoisted(() => vi.fn());
vi.mock("@/lib/redirect-project", () => ({ redirectProject: redirect }));
beforeEach(() => {
  state.data = bundledPublicProjects.map(p => ({ ...p }));
  Object.assign(state, { isLoading: false, isError: false, isFetching: false });
  redirect.mockClear();
  state.refetch.mockClear();
  Element.prototype.scrollIntoView = vi.fn();
  vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { callback(0); return 0; });
});
afterEach(cleanup);
function Location() { const l = useLocation(); return <div data-testid="location">{l.search}{l.hash}</div>; }
function renderStudio(entry = "/") {
  return render(<MemoryRouter initialEntries={[entry]}><StudioPreview /><Location /></MemoryRouter>);
}
function renderDrop(slug: string) {
  return render(<MemoryRouter initialEntries={["/drops/" + slug]}><Routes><Route path="/drops/:slug" element={<DropDetail />} /></Routes></MemoryRouter>);
}
describe("current studio visitor journey", () => {
  it("shows the studio still life first and Bryan only after the complete work collection", () => {
    renderStudio();
    const hero = screen.getByRole("img", { name: /clear glowing robot, durian character and cat toy/i });
    const portrait = screen.getByRole("img", { name: /Bryan Lau Wai Kit, the person behind/i });
    const work = document.getElementById("work");
    expect(hero.closest(".studio-hero")).not.toBeNull();
    expect(screen.getByText(/881230.studio turns curious ideas/)).toBeInTheDocument();
    expect(work).not.toBeNull();
    expect(work!.compareDocumentPosition(portrait) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(portrait.closest("#about")).not.toBeNull();
  });
  it("launches every available project directly in a new tab", () => {
    renderStudio();
    for (const p of bundledPublicProjects) {
      const { action } = projectPresentation(p);
      const link = screen.getByRole("link", { name: `${action} ${p.title} (opens in a new tab)` });
      expect(link).toHaveAttribute("href", new URL(p.href).href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(document.querySelector('a[href^="/drops/"]')).toBeNull();
  });
  it("restores the filter from a shared URL and updates the URL on selection", () => {
    renderStudio("/?category=objects#work");
    expect(screen.getByRole("button", { name: "Objects" })).toHaveAttribute("aria-pressed", "true");
    expect(document.querySelectorAll("#project-grid a")).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: "Games" }));
    expect(screen.getByTestId("location")).toHaveTextContent("category=games");
    expect(document.querySelectorAll("#project-grid a")).toHaveLength(5);
  });
  it("does not resurrect projects when the live catalogue is empty", () => {
    state.data = [];
    renderStudio();
    expect(document.querySelectorAll("#project-grid a")).toHaveLength(0);
    expect(screen.getByText("New work is on the way.")).toBeInTheDocument();
  });
  it("shows loading without displaying stale game descriptions", () => {
    state.data = undefined; state.isLoading = true;
    renderStudio();
    expect(screen.getByRole("status")).toHaveTextContent("Loading projects");
    expect(document.getElementById("project-grid")).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText(/fast browser badminton/)).not.toBeInTheDocument();
  });
  it("explains saved-mode recovery and lets visitors retry", () => {
    state.isError = true;
    renderStudio();
    expect(screen.getByText(/Showing the saved collection/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(state.refetch).toHaveBeenCalledOnce();
  });
  it("keeps unsafe destinations unclickable", () => {
    state.data = [{ ...bundledPublicProjects[0], href: "javascript:alert(1)" }];
    renderStudio();
    expect(document.querySelector("#project-grid a")).toBeNull();
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });
  it("offers working contact routes and correct section navigation", () => {
    renderStudio();
    const nav = within(screen.getByRole("navigation", { name: "Main navigation" }));
    expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /Chat on WhatsApp/ })).toHaveAttribute("href", expect.stringContaining("https://wa.me/60149303546"));
    expect(screen.getByRole("link", { name: "Email Bryan ↗" })).toHaveAttribute("href", "mailto:bryanlauwk@gmail.com");
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main-content");
  });
  it("keeps legacy homepage anchors useful", () => {
    renderStudio("/#browser-work");
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
  it("redirects shared project URLs without a legacy page", () => {
    renderDrop("badminton-clash");
    expect(redirect).toHaveBeenCalledWith("https://www.yuqiuren.fun/");
    expect(screen.queryByText("Exhibit file · Drop")).not.toBeInTheDocument();
  });
  it("does not declare a pending deep link missing", () => {
    state.data = undefined; state.isLoading = true;
    renderDrop("little-originals");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Finding your project");
    expect(redirect).not.toHaveBeenCalled();
  });
  it("rejects a self-referencing shared link", () => {
    state.data = [{ ...bundledPublicProjects[0], href: window.location.origin + "/drops/badminton-clash" }];
    renderDrop("badminton-clash");
    expect(redirect).not.toHaveBeenCalled();
    expect(screen.getByText("This project isn’t available to open yet.")).toBeInTheDocument();
  });
});
