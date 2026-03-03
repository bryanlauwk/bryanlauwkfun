

# Improve Hero Headline and Subtitles

## Problem

The current hero area stacks four text elements tightly:
1. "Late Nights, Wild Ideas" (big serif headline)
2. "Experiments, games, and things that crawled out of late nights." (mono subtitle in a box)
3. TypewriterMotto pill ("Good luck, have fun, don't die")
4. CrypticWhisper (tiny faded text)

This creates a cramped, repetitive block -- "late nights" appears twice, and three distinct text treatments compete for attention.

## Proposed Changes

### A. New Headline Copy

Replace "Late Nights, Wild Ideas" with something punchier that captures the spirit without repeating "late nights":

```
I make things
  for fun
```

Line 1 ("I make things") in foreground color, Line 2 ("for fun") in the shimmer/primary accent. Short, personal, memorable -- and directly ties to the domain name (bryan.fun).

### B. Simplify to One Subtitle

Remove the boxed paragraph subtitle entirely. Replace it with a single clean line below the headline:

```
games · experiments · rabbit holes
```

Styled as a spaced-out mono line with interpunct separators -- no background box, no border. This is scannable at a glance and covers the three pillars of the site.

### C. More Breathing Room

- Increase margin between headline and subtitle (from `mb-6` to `mb-8`)
- Increase margin between subtitle and the TypewriterMotto (from `mb-6` to `mb-10`)
- Keep the TypewriterMotto and CrypticWhisper as they are -- they work well as a secondary "transmission" element lower down

### D. File Changes

**`src/pages/Index.tsx`** (hero section, ~lines 48-65):
- Replace the `h1` content with the new two-line headline
- Replace the `div.max-w-xl` subtitle block with the clean interpunct line
- Adjust spacing classes

No other files need changes.

## Technical Details

### Index.tsx Hero Section (before)
```jsx
<h1>
  <span>Late Nights,</span>
  <span>Wild Ideas</span>
</h1>
<div className="max-w-xl mx-auto mb-6">
  <p className="... font-mono ... bg-background/60 backdrop-blur-sm ...">
    Experiments, games, and things that crawled out of late nights.
  </p>
</div>
```

### Index.tsx Hero Section (after)
```jsx
<h1>
  <span>I make things</span>
  <span>for fun</span>
</h1>
<p className="font-mono text-sm md:text-base text-foreground/70 tracking-widest uppercase mb-10">
  games · experiments · rabbit holes
</p>
```

The TypewriterMotto and CrypticWhisper remain unchanged below, providing the secondary atmospheric layer.
