import { describe, expect, it } from "vitest";
import { handleResizeObserverWarning } from "@/lib/resize-observer-warning";

describe("nonfatal resize notifications", () => {
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