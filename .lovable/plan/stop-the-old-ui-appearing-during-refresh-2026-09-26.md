# Stop the old UI appearing during refresh

## Outcome
A reload should show the current homepage immediately, not flash the older “I BUILD THINGS PEOPLE WANT TO PLAY WITH” screen before the new interface arrives. If the interactive page cannot load, visitors should still see a current, useful fallback.

## Plan
1. Update the initial page’s lightweight fallback to match the current “good luck / have fun / don’t die” homepage, including its supporting copy and visual direction. Keep the instant first paint and no-JavaScript accessibility.
2. Ensure the fallback is removed only when the new page has actually rendered; keep a clear retry path for genuine loading failures. Remove obsolete fallback copy rather than clearing visitor storage or saved exhibit screenshots.
3. Refresh the first-paint checks so both the initial view and loaded page reject the old headline, then compare reloads with JavaScript on and off on desktop and mobile. Confirm the normal page remains intact.

## Technical notes
The local page currently serves the old headline directly in its initial HTML fallback; with JavaScript disabled, that old screen remains visible, while the normal page renders the newer headline and removes the fallback. The initial page response is already marked `no-cache`, and the checked browser has no registered service worker, so clearing all browser data would not address this verified mismatch. The published domain also serves the old fallback in its HTML; production changes will need a publish after the fix.
