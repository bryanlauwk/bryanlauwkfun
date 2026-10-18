import { describe, expect, it, vi } from "vitest";
import { handleResizeObserverWarning, installFrameScheduledResizeObserver } from "@/lib/resize-observer-warning";

describe("nonfatal resize notifications", () => {
  it("coalesces notifications into one frame and cancels disconnected deliveries", () => {
    let deliver: ResizeObserverCallback | undefined;
    let frame: FrameRequestCallback | undefined;
    class NativeObserver {
      constructor(callback: ResizeObserverCallback) { deliver = callback; }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal("ResizeObserver", NativeObserver);
    const request = vi.fn((callback: FrameRequestCallback) => { frame = callback; return 17; });
    const cancel = vi.fn();
    vi.stubGlobal("requestAnimationFrame", request);
    vi.stubGlobal("cancelAnimationFrame", cancel);
    try {
      installFrameScheduledResizeObserver();
      const callback = vi.fn();
      const observer = new window.ResizeObserver(callback);
      const target = document.createElement("div");
      const entry: ResizeObserverEntry = {
        target,
        contentRect: target.getBoundingClientRect(),
        borderBoxSize: [],
        contentBoxSize: [],
        devicePixelContentBoxSize: [],
      };
      deliver?.([entry], observer);
      deliver?.([entry], observer);
      expect(callback).not.toHaveBeenCalled();
      expect(request).toHaveBeenCalledTimes(1);
      frame?.(0);
      expect(callback).toHaveBeenCalledWith([entry], observer);
      deliver?.([entry], observer);
      observer.disconnect();
      expect(cancel).toHaveBeenCalledWith(17);
      frame?.(1);
      expect(callback).toHaveBeenCalledTimes(1);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it.each([
    "ResizeObserver loop completed with undelivered notifications.",
    "ResizeObserver loop limit exceeded",
  ])("handles the browser's deferred notification: %s", (message) => {
    const event = new ErrorEvent("error", { message, cancelable: true });
    handleResizeObserverWarning(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("keeps genuine callback exceptions visible", () => {
    const event = new ErrorEvent("error", {
      message: "ResizeObserver loop completed with undelivered notifications.",
      error: new Error("Callback failed"),
      cancelable: true,
    });
    handleResizeObserverWarning(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it("keeps unrelated runtime failures visible", () => {
    const event = new ErrorEvent("error", { message: "Cannot read properties of undefined", cancelable: true });
    handleResizeObserverWarning(event);
    expect(event.defaultPrevented).toBe(false);
  });
});