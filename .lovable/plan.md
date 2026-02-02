
# Copy Review & Improvement Suggestions

## Current Copy Inventory

| Location | Current Copy | Notes |
|----------|--------------|-------|
| **Hero Headline** | "Something Strange Is Happening" | Very Stranger Things |
| **Hero Subtitle** | "You've entered the void. These are the experiments, the games, the things that crawled out of late nights and questionable decisions." | Slightly edgy, good |
| **Typewriter Motto** | "Good luck, have fun, don't die" | Brand signature - keep |
| **Section Header** | "Drops" | Already updated - good |
| **Card Label** | "Drop #01" | Already updated - good |
| **Card CTA** | "Enter the void" | Stranger Things-esque |
| **Header Counter** | "Souls Lost" | Very Stranger Things |
| **Footer Left** | "Broadcast from the Upside Down" | Direct ST reference |
| **Footer Right** | "Don't die out there" | Matches motto - keep |
| **Loading Text** | "Signal Detected" → "Tuning..." | TV metaphor - fits |
| **Guest Book Header** | "FEEDBACK & IDEAS" | Generic |
| **Guest Book Form** | "Leave a public transmission" | Transmission language |
| **Guest Book Button** | "Send Transmission" | Transmission language |
| **Contact Tab** | "Direct Line" | Good, different |
| **Toast Messages** | "Transmission received/failed" | Transmission language |
| **404 Page** | "Oops! Page not found" | Generic, off-brand |

---

## Recommended Changes

### Priority 1: Remove Obvious Stranger Things References

| File | Current | Suggested | Reason |
|------|---------|-----------|--------|
| `CinematicHeader.tsx` | "Souls Lost" | "Lurkers" | Less ominous, more playful |
| `CinematicFooter.tsx` | "Broadcast from the Upside Down" | "Made somewhere in the void" | Remove direct ST reference |
| `StrangerThingsCard.tsx` | "Enter the void" | "Check it out" or "Go" | Simpler, less dramatic |

### Priority 2: Update "Transmission" Language to Match "Drop"

Since you changed "Transmission" → "Drop", the related language should align:

| File | Current | Suggested |
|------|---------|-----------|
| `GuestBook.tsx` | "Leave a public transmission" | "Drop a message" |
| `GuestBook.tsx` | "Send Transmission" (button) | "Send" |
| `GuestBook.tsx` | "Transmitting..." | "Sending..." |
| `GuestBook.tsx` | Toast: "Transmission received" | "Message received" |
| `GuestBook.tsx` | Toast: "Transmission failed" | "Failed to send" |
| `GuestBook.tsx` | "Receiving transmissions..." | "Loading messages..." |
| `GuestBook.tsx` | "No transmissions yet" | "No messages yet" |
| `GuestBook.tsx` | "Direct transmission to Bryan" | "Private message to Bryan" |

### Priority 3: Refresh Section Headers

| File | Current | Suggested |
|------|---------|-----------|
| `GuestBook.tsx` | "FEEDBACK & IDEAS" | "Say Something" or "Leave a Note" |

### Priority 4: Theme the 404 Page

| Current | Suggested |
|---------|-----------|
| "Oops! Page not found" | "You've wandered too far" |
| "Return to Home" | "Head back" |
| Generic styling | Match dark theme with fog effects |

---

## Summary of Files to Modify

| File | Changes |
|------|---------|
| `src/components/CinematicHeader.tsx` | "Souls Lost" → "Lurkers" |
| `src/components/CinematicFooter.tsx` | "Broadcast from the Upside Down" → "Made somewhere in the void" |
| `src/components/StrangerThingsCard.tsx` | "Enter the void" → "Check it out" |
| `src/components/GuestBook.tsx` | Update all "transmission" language to simpler terms |
| `src/pages/NotFound.tsx` | Restyle and update copy to match brand |

---

## What to Keep (Already Strong)

- "Good luck, have fun, don't die" - Brand signature
- "Drops" section header - Already updated
- "Drop #01" card labels - Already updated
- "Direct Line" for contact tab - Good differentiation
- Loading screen "Tuning..." - Fits the TV metaphor
- Visual effects (film grain, fog, lights) - Keep the aesthetic

---

## Copy Tone Shift

```text
Before: Mysterious, ominous, dramatic (full Stranger Things)
After:  Slightly irreverent, self-aware, but still dark aesthetic
```

The visual identity stays moody and cinematic, but the voice becomes more casual and less "role-playing as a Hawkins resident."
