# About section: minimal rewrite

## What changes
- Portrait caption: "Bryan Lau Wai Kit · Kuala Lumpur" becomes "Bryan Lau Wai Kit". (The footer's single Kuala Lumpur mention stays.)
- Add the line "Creative marketer. Designer. Maker of things." under the heading, in the small mono label style.
- Shorter, sparser text in the 132.studio style: one short heading, one line, one link.

```text
THE PERSON BEHIND THE STUDIO          I make things to see
[portrait]                            what happens.
Bryan Lau Wai Kit
                                      CREATIVE MARKETER. DESIGNER. MAKER OF THINGS.

                                      Mechatronics background. Marketing by trade.
                                      Games, objects, and questions in between.

                                      More about my work ↗
```

## Technical details
- `src/pages/StudioPreview.tsx`: update the about block (caption, heading, add a `.studio-about-roles` line, merge the two paragraphs into one short one).
- `src/styles/studio.css`: add `.studio-about-roles` (mono, uppercase, 12px, ink colour), tighten paragraph width to about 40ch, add more space above the link.
- `index.html` static shell has no about section, so nothing changes there. Run the first-paint check.
