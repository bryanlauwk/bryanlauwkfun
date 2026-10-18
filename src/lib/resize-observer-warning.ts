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