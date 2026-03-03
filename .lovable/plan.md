

# Day/Night AI-Generated Background

## Overview

Generate two distinct AI backgrounds (day and night) and automatically display the correct one based on the visitor's local time. Day theme shows from 6:00 AM to 5:59 PM, night theme from 6:00 PM to 5:59 AM.

## How It Works

1. On page load, detect the visitor's local hour
2. Check if a cached background already exists in storage for today's date + time period
3. If not, call the edge function to generate one and cache it
4. Display the matching background with a smooth fade-in
5. Fall back to the existing static hero image while loading or on error

## Changes

### 1. Update Edge Function (`supabase/functions/generate-background/index.ts`)

- Accept a `timeOfDay` parameter (`"day"` or `"night"`) in the POST body
- Use the latest image model: `google/gemini-3-pro-image-preview`
- Two distinct prompts:
  - **Day**: Warm sunlit cosmic scene -- golden light, floating lanterns, warm amber tones, sun rays piercing through clouds, a mystical octopus in a bright underwater reef
  - **Night**: Dark mystical deep-sea scene -- moonlit, bioluminescent creatures, deep teal and indigo, starfield, the same octopus in a dark cosmic abyss
- Cache with filenames like `bg-day-2026-03-03.png` and `bg-night-2026-03-03.png` so each day gets fresh art but repeated visits reuse the same image
- Before generating, check if a cached image already exists for today; if so, return its URL immediately (skip AI call)

### 2. New Hook (`src/hooks/useTimeOfDayBackground.ts`)

- Determine `timeOfDay` from `new Date().getHours()` (6-17 = day, 18-5 = night)
- Check storage for a cached image first (direct Supabase storage URL)
- If no cached image, call the edge function to generate one
- Return `{ backgroundUrl, isLoading, timeOfDay }`
- Fall back to the static `dark-fantasy-hero.jpg` during loading or on error

### 3. Update Index Page (`src/pages/Index.tsx`)

- Use the new hook to get the dynamic background URL
- Replace the static `heroImage` src with the dynamic URL
- Add a crossfade transition so the background smoothly appears once loaded
- Show the static image as immediate fallback while AI image loads

## Technical Details

### Edge Function Changes

```text
POST body: { timeOfDay: "day" | "night" }

Flow:
1. Parse timeOfDay from body
2. Build cache key: bg-{timeOfDay}-{YYYY-MM-DD}.png
3. Check if file exists in 'backgrounds' bucket
4. If exists -> return public URL immediately
5. If not -> generate with google/gemini-3-pro-image-preview
6. Upload to storage -> return public URL
```

### Time Detection Logic

```text
const hour = new Date().getHours();
const timeOfDay = (hour >= 6 && hour < 18) ? "day" : "night";
```

### Caching Strategy

- One image per time period per day (max 2 AI generations per day)
- Storage filenames: `bg-day-YYYY-MM-DD.png`, `bg-night-YYYY-MM-DD.png`
- Subsequent visitors within the same period reuse the cached image
- Previous days' images accumulate in storage (can be cleaned up later)

