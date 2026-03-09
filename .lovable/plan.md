

# Why Your Drops Are Invisible

Your project data is loading fine -- the API returns all 6 projects. The problem is a **race condition in the scroll-triggered reveal** introduced during the Airbnb polish.

## Root Cause

In `ProjectGrid.tsx`, cards start with `opacity-0 translate-y-8` and only become visible when `hasBeenInView` flips to `true`. But `useIntersection` has a bug: when `triggerOnce` is `true`, the effect re-runs every time `hasBeenInView` changes (it's in the dependency array). On the first intersection, `hasBeenInView` becomes `true`, which re-creates the observer, and depending on timing the new observer may not fire again -- leaving cards invisible.

Additionally, the `ref` is typed as `RefObject<HTMLDivElement>` (created via `useRef<HTMLDivElement>(null)`) which in React 18 is read-only and may not attach properly when passed as a `ref` prop.

## Fix

**`src/hooks/useIntersection.ts`**:
- Remove `hasBeenInView` from the `useEffect` dependency array to prevent the observer from being re-created
- When `triggerOnce` is true and element enters view, immediately set both states and disconnect the observer
- Use a callback ref pattern or cast to `LegacyRef` to ensure the ref attaches correctly

**`src/components/ProjectGrid.tsx`**:
- No changes needed -- once the hook works correctly, `hasBeenInView` will flip to `true` and cards will animate in

## Technical Detail

```typescript
// useIntersection.ts fix - stable observer that doesn't re-create
useEffect(() => {
  const element = ref.current;
  if (!element) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHasBeenInView(true);
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      });
    },
    { threshold, rootMargin }
  );

  observer.observe(element);
  return () => observer.disconnect();
}, [threshold, rootMargin, triggerOnce]);
// ↑ removed hasBeenInView from deps
```

Single file change, ~10 lines modified.

