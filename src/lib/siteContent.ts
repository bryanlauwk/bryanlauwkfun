/**
 * Editable site copy — the CMS audit.
 *
 * Every piece of front-end copy that an admin should be able to change lives
 * here as a keyed field with its current text as the default. Components read
 * their copy through `useSiteContent()`, which overlays any values saved in the
 * `site_settings` table on top of these defaults. If nothing is saved (or the
 * fetch fails), the site renders exactly this default copy — so the homepage
 * can never break because of the CMS layer.
 *
 * To make a new string editable: add a field to the relevant group below and
 * read it in the component via `content("group.key")`.
 */

export type ContentFieldType = "text" | "multiline" | "url" | "toggle" | "image";

export interface ContentField {
  key: string;
  label: string;
  defaultValue: string;
  type?: ContentFieldType;
  help?: string;
}

export interface ContentGroup {
  id: string;
  title: string;
  description?: string;
  fields: ContentField[];
}

export const CONTENT_GROUPS: ContentGroup[] = [
  {
    id: "nav",
    title: "Navigation & Footer",
    description: "The top bar brand and the footer lines.",
    fields: [
      { key: "nav.brand", label: "Brand / wordmark", defaultValue: "bryanlauwk.fun" },
      { key: "footer.tagline", label: "Footer tagline", defaultValue: "Good luck, have fun, don't die." },
      { key: "footer.signature", label: "Footer signature", defaultValue: "you were here", help: "Appears after “© {year} bryanlauwk ·”." },
    ],
  },
  {
    id: "hero",
    title: "Arrival (Hero)",
    description: "The full-screen opening section.",
    fields: [
      { key: "hero.eyebrow", label: "Eyebrow label", defaultValue: "Ongoing exhibition · Room 01" },
      { key: "hero.title", label: "Headline", defaultValue: "Playable Experiments" },
      {
        key: "hero.subtitle",
        label: "Sub-line (uppercase)",
        defaultValue: "For the curious. A stranger kind of internet.",
      },
      {
        key: "hero.description",
        label: "Description",
        type: "multiline",
        defaultValue:
          "Browser-born experiments by Bryan Lau, shaped by curiosity, perception and play — and built so a world can grow into a space, and then into an object you can hold.",
      },
      { key: "hero.ctaPrimary", label: "Primary button", defaultValue: "Enter Room 01" },
      { key: "hero.ctaSecondary", label: "Secondary link", defaultValue: "See how a world travels: Browser → Space → Object" },
      { key: "hero.scrollHint", label: "Scroll hint", defaultValue: "Scroll to enter" },
    ],
  },
  {
    id: "room",
    title: "Room 01 (Playable Experiments)",
    description: "The homepage lead magnet — the grid of real, playable drops.",
    fields: [
      { key: "room.eyebrow", label: "Eyebrow label", defaultValue: "Room 01 · Permanent collection" },
      { key: "room.heading", label: "Heading", defaultValue: "Things you can actually play" },
      {
        key: "room.intro",
        label: "Intro paragraph",
        type: "multiline",
        defaultValue:
          "Every experiment below opens in the browser. Some are finished, some are still moving. Pick one and go in.",
      },
      { key: "room.currentLabel", label: "Featured status label", defaultValue: "Open now" },
      { key: "room.cta", label: "Card call to action", defaultValue: "Play" },
      { key: "room.emptyBody", label: "Empty state", defaultValue: "The room is being re-hung. New experiments are on the way." },
    ],
  },
  {
    id: "notes",
    title: "Field Notes (Science of Play)",
    description: "Research directions behind future experiments — concepts, not finished work.",
    fields: [
      { key: "notes.eyebrow", label: "Eyebrow label", defaultValue: "Field notes · Research directions" },
      { key: "notes.heading", label: "Heading", defaultValue: "The science of play" },
      {
        key: "notes.intro",
        label: "Intro paragraph",
        type: "multiline",
        defaultValue:
          "Reading notes that feed the next experiments. These are concepts and directions — not finished pieces.",
      },
      { key: "notes.one.title", label: "Note 1 · title", defaultValue: "Perception & attention" },
      { key: "notes.one.science", label: "Note 1 · idea", defaultValue: "Change blindness" },
      {
        key: "notes.one.premise",
        label: "Note 1 · premise",
        type: "multiline",
        defaultValue: "A world that quietly alters itself while you look away — and dares you to notice what moved.",
      },
      { key: "notes.two.title", label: "Note 2 · title", defaultValue: "Emergence & collective behavior" },
      { key: "notes.two.science", label: "Note 2 · idea", defaultValue: "Swarms & simple local rules" },
      {
        key: "notes.two.premise",
        label: "Note 2 · premise",
        type: "multiline",
        defaultValue: "Many visitors, each making one small move, collectively growing a system nobody designed alone.",
      },
      { key: "notes.three.title", label: "Note 3 · title", defaultValue: "Memory, prediction & choice" },
      { key: "notes.three.science", label: "Note 3 · idea", defaultValue: "Prediction error" },
      {
        key: "notes.three.premise",
        label: "Note 3 · premise",
        type: "multiline",
        defaultValue: "An object that learns your habit, then breaks it — so the surprise becomes the interface.",
      },
    ],
  },
  {
    id: "travel",
    title: "Browser → Space → Object",
    description: "The architecture: one idea changing medium.",
    fields: [
      { key: "travel.eyebrow", label: "Eyebrow label", defaultValue: "The architecture" },
      { key: "travel.heading", label: "Heading", defaultValue: "One signal, three mediums" },
      {
        key: "travel.intro",
        label: "Intro paragraph",
        type: "multiline",
        defaultValue:
          "A world starts as something you can play in a tab. If it holds, it grows a room. If it still holds, it leaves something behind you can hold.",
      },
      { key: "travel.browser.title", label: "Stage 1 · title", defaultValue: "Browser" },
      {
        key: "travel.browser.body",
        label: "Stage 1 · body",
        type: "multiline",
        defaultValue: "A playable prototype — a shareable world that needs nothing but a link.",
      },
      { key: "travel.space.title", label: "Stage 2 · title", defaultValue: "Space" },
      {
        key: "travel.space.body",
        label: "Stage 2 · body",
        type: "multiline",
        defaultValue: "The same world given a room: a responsive space, a pop-up, an installation you walk into.",
      },
      { key: "travel.object.title", label: "Stage 3 · title", defaultValue: "Object" },
      {
        key: "travel.object.body",
        label: "Stage 3 · body",
        type: "multiline",
        defaultValue: "A tactile artifact, token or edition that carries the world beyond the screen.",
      },
    ],
  },
  {
    id: "commission",
    title: "Quiet collaboration",
    description: "The restrained invitation near the end of the page.",
    fields: [
      { key: "commission.eyebrow", label: "Eyebrow label", defaultValue: "For unusual briefs" },
      { key: "commission.heading", label: "Heading", defaultValue: "A world can be commissioned." },
      {
        key: "commission.body",
        label: "Body",
        type: "multiline",
        defaultValue:
          "Selected experiments can be adapted for a brand, a place or a story — kept playable, kept strange. If you have an unusual brief, the studio door is open.",
      },
      { key: "commission.cta", label: "Link label", defaultValue: "Open the studio" },
    ],
  },

  {
    id: "current",
    title: "Current Drop",
    description:
      "The featured slot at the top of the page. In Brewing mode it shows a mysterious teaser and every drop moves to Past Seasons; switch it Live to feature the newest drop.",
    fields: [
      {
        key: "current.mode",
        label: "Feature the newest drop (off = Brewing / mysterious)",
        type: "toggle",
        defaultValue: "brewing",
        help: "Off keeps the slot mysterious and lists every drop under Past Seasons. On features the most recent drop here.",
      },
      // Brewing (mysterious) state
      { key: "current.brewingLabel", label: "Brewing · label", defaultValue: "Next drop · brewing" },
      { key: "current.brewingTitle", label: "Brewing · title", defaultValue: "Something is brewing" },
      {
        key: "current.brewingBody",
        label: "Brewing · body",
        type: "multiline",
        defaultValue:
          "The next world is still taking shape beneath the surface. No doors yet — only the sound of something waking up.",
      },
      // Live state (when a drop is featured)
      { key: "current.label", label: "Live · status label", defaultValue: "Current Drop · open now" },
      { key: "current.cta", label: "Live · call to action", defaultValue: "Enter the experience" },
    ],
  },
  {
    id: "artifacts",
    title: "Objects Catalogue",
    description:
      "The three-object concept catalogue. These are exploratory physical studies, not products or available editions.",
    fields: [
      { key: "artifacts.eyebrow", label: "Eyebrow label", defaultValue: "Object studies · concept catalogue" },
      { key: "artifacts.heading", label: "Heading", defaultValue: "Objects from the playground" },
      {
        key: "artifacts.intro",
        label: "Intro paragraph",
        type: "multiline",
        defaultValue:
          "Three speculative physical studies for exploring how a browser-born world might carry touch, presence and memory beyond the screen. These are exploratory concepts — not products, client work or currently available editions.",
      },
      {
        key: "artifacts.closing",
        label: "Closing line",
        type: "multiline",
        defaultValue:
          "All three are thought experiments — starting points for objects, not finished pieces or commissioned work.",
      },
      // 1 — Coin
      { key: "artifacts.coin.name", label: "Object 1 · name", defaultValue: "The Topographic Coin" },
      { key: "artifacts.coin.material", label: "Object 1 · format", defaultValue: "Milled brass · patina" },
      {
        key: "artifacts.coin.idea",
        label: "Object 1 · concept",
        type: "multiline",
        defaultValue:
          "A tactile save-point a world might carry. Its contours could be re-mapped into a collectible token, a wayfinding key, or a proof-of-visit for whatever world it joins.",
      },
      { key: "artifacts.coin.image", label: "Object 1 · image", type: "image", defaultValue: "" },
      // 2 — Key
      { key: "artifacts.key.name", label: "Object 2 · name", defaultValue: "The Threshold Key" },
      { key: "artifacts.key.material", label: "Object 2 · format", defaultValue: "Cast acrylic · NFC core" },
      {
        key: "artifacts.key.idea",
        label: "Object 2 · concept",
        type: "multiline",
        defaultValue:
          "A bridge between a browser game and the room you're standing in. Tapped, it could open a door between a digital interface and a physical threshold — one key imagined for any threshold.",
      },
      { key: "artifacts.key.image", label: "Object 2 · image", type: "image", defaultValue: "" },
      // 3 — Stone
      { key: "artifacts.stone.name", label: "Object 3 · name", defaultValue: "The Light Stone" },
      { key: "artifacts.stone.material", label: "Object 3 · format", defaultValue: "River stone · fibre veins" },
      {
        key: "artifacts.stone.idea",
        label: "Object 3 · concept",
        type: "multiline",
        defaultValue:
          "A presence study. It might warm when someone else steps into the same world, turning a booth, table or pavilion into a place where remote company could feel physically near.",
      },
      { key: "artifacts.stone.image", label: "Object 3 · image", type: "image", defaultValue: "" },
      // 4 — Chart / Atlas

      { key: "artifacts.paper.name", label: "Object 4 · name", defaultValue: "The Folded Atlas" },
      { key: "artifacts.paper.material", label: "Object 4 · format", defaultValue: "Coated paper · gold ink" },
      {
        key: "artifacts.paper.idea",
        label: "Object 4 · concept",
        type: "multiline",
        defaultValue:
          "A pocket index of every world, folded flat. Reprints as a map, a program, or a treasure key for any curation.",
      },
      { key: "artifacts.paper.image", label: "Object 4 · image", type: "image", defaultValue: "" },
      // 5 — Pulse Ring (Expo 2025 — Grand Ring / Connecting Lives)
      { key: "artifacts.ring.name", label: "Object 5 · name", defaultValue: "The Pulse Ring" },
      { key: "artifacts.ring.material", label: "Object 5 · format", defaultValue: "Anodised alloy · haptic core" },
      {
        key: "artifacts.ring.idea",
        label: "Object 5 · concept",
        type: "multiline",
        defaultValue:
          "A handheld ring that beats in time with a world — or with everyone inside it. One connective loop binding many at once; drop it into a crowd to make a shared moment you can feel in your palm.",
      },
      { key: "artifacts.ring.image", label: "Object 5 · image", type: "image", defaultValue: "" },
      // 6 — Mirror Tile (Expo 2025 — mirror pavilion)
      { key: "artifacts.mirror.name", label: "Object 6 · name", defaultValue: "The Mirror Tile" },
      { key: "artifacts.mirror.material", label: "Object 6 · format", defaultValue: "Optical glass · edge-lit" },
      {
        key: "artifacts.mirror.idea",
        label: "Object 6 · concept",
        type: "multiline",
        defaultValue:
          "A reflective module that turns any wall or table into a responsive surface. Tessellate a few into a mirror room, or set one as a portal — the world reflects and reacts to whoever leans in.",
      },
      { key: "artifacts.mirror.image", label: "Object 6 · image", type: "image", defaultValue: "" },
      // 7 — Living Seed (Expo 2025 — Saving / Empowering Lives, sustainability)
      { key: "artifacts.seed.name", label: "Object 7 · name", defaultValue: "The Living Seed" },
      { key: "artifacts.seed.material", label: "Object 7 · format", defaultValue: "Bio-resin · sensor node" },
      {
        key: "artifacts.seed.idea",
        label: "Object 7 · concept",
        type: "multiline",
        defaultValue:
          "A palm-sized token that carries a world's state into a space and quietly senses it back. Plant it in a room to let an installation grow, remember and respond over time.",
      },
      { key: "artifacts.seed.image", label: "Object 7 · image", type: "image", defaultValue: "" },
    ],
  },
  {
    id: "next",
    title: "Next Transmission",
    description: "The forming-season interlude.",
    fields: [
      { key: "next.label", label: "Status label", defaultValue: "Next transmission · forming" },
      { key: "next.heading", label: "Heading", defaultValue: "Something is learning how to notice you." },
      {
        key: "next.body",
        label: "Body",
        type: "multiline",
        defaultValue:
          "Fragments are still arriving. When enough of them agree on a shape, the next season opens.",
      },
      { key: "next.opens", label: "Opens line", defaultValue: "Opens · Date unknown." },
    ],
  },
  {
    id: "about",
    title: "Bryan's Mind & About",
    description: "The closing section, guide copy and social links.",
    fields: [
      { key: "about.mindLabel", label: "Guide label", defaultValue: "Bryan's Mind" },
      {
        key: "about.mindBody",
        label: "Guide description",
        type: "multiline",
        defaultValue:
          "A quiet guide that lives at the edge of the water. It does not answer questions — it points.",
      },
      { key: "about.mindCta", label: "Guide button", defaultValue: "Ask for a hint" },
      {
        key: "about.whispers",
        label: "Whispers (one per line)",
        type: "multiline",
        defaultValue: [
          "The older worlds are still awake.",
          "Some objects remember being touched.",
          "There is more below the surface.",
          "Nothing here is finished.",
          "Scroll slower.",
        ].join("\n"),
      },
      {
        key: "about.heading",
        label: "Closing heading (line break with ⏎)",
        type: "multiline",
        defaultValue: "Nothing here is permanent.\nSee you next season.",
      },
      {
        key: "about.body",
        label: "Closing paragraph",
        type: "multiline",
        defaultValue:
          "Built by Bryan Lau — a creative growth marketer making things people want to play with. Creativity is the interface. Growth is the outcome.",
      },
      { key: "about.studioLabel", label: "Studio button", defaultValue: "The Studio" },
      { key: "about.studioUrl", label: "Studio URL", type: "url", defaultValue: "https://ideas.bryanlauwk.fun" },
      { key: "about.guestbookLabel", label: "Guest book label", defaultValue: "Leave a message in the sky" },
      { key: "about.githubUrl", label: "GitHub URL", type: "url", defaultValue: "https://github.com/bryanlauwk" },
      { key: "about.twitterUrl", label: "Twitter URL", type: "url", defaultValue: "https://twitter.com/bryanlauwk" },
      { key: "about.linkedinUrl", label: "LinkedIn URL", type: "url", defaultValue: "https://linkedin.com/in/bryanlauwk" },
    ],
  },
  {
    id: "archive",
    title: "Past Seasons",
    description: "The archive section header.",
    fields: [
      { key: "archive.eyebrow", label: "Eyebrow label", defaultValue: "Past Seasons" },
      { key: "archive.heading", label: "Heading", defaultValue: "The archive of finished worlds" },
      {
        key: "archive.intro",
        label: "Intro paragraph",
        type: "multiline",
        defaultValue: "Every world that has already opened, sealed in glass. They all still run.",
      },
    ],
  },
];

/** Flat map of every content key to its default value. */
export const CONTENT_DEFAULTS: Record<string, string> = Object.fromEntries(
  CONTENT_GROUPS.flatMap((g) => g.fields.map((f) => [f.key, f.defaultValue])),
);

/** All editable keys, in registry order. */
export const CONTENT_KEYS: string[] = Object.keys(CONTENT_DEFAULTS);
