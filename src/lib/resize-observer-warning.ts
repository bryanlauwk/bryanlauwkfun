// Browsers defer these observer notifications to the next frame; they are
// not application exceptions. Keep them out of fatal preview error overlays
// without hiding errors thrown by an observer callback or any other code.
const deferredNotifications = new Set([
  "ResizeObserver loop completed with undelivered notifications.",
  "ResizeObserver loop limit exceeded",
]);

export function handleResizeObserverWarning(event: ErrorEvent): void {
  if (event.error != null || !deferredNotifications.has(event.message)) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}

/** Deliver layout-changing callbacks outside the browser's resize pass. */
export function installFrameScheduledResizeObserver(): void {
  const NativeObserver = window.ResizeObserver;
  if (!NativeObserver) return;

  window.ResizeObserver = class extends NativeObserver {
    private frame: number | undefined;
    private pending = new Map<Element, ResizeObserverEntry>();

    constructor(callback: ResizeObserverCallback) {
      super((entries) => {
        for (const entry of entries) this.pending.set(entry.target, entry);
        if (this.frame !== undefined) return;
        this.frame = window.requestAnimationFrame(() => {
          this.frame = undefined;
          const batch = [...this.pending.values()];
          this.pending.clear();
          if (batch.length) callback(batch, this);
        });
      });
    }

    override unobserve(target: Element): void {
      this.pending.delete(target);
      super.unobserve(target);
    }

    override disconnect(): void {
      if (this.frame !== undefined) window.cancelAnimationFrame(this.frame);
      this.frame = undefined;
      this.pending.clear();
      super.disconnect();
    }
  };
}