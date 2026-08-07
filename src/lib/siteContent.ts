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

export type ContentFieldType = "text" | "multiline" | "url";

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
      { key: "hero.eyebrow", label: "Eyebrow label", defaultValue: "Season 00 · Prologue" },
      { key: "hero.title", label: "Headline", defaultValue: "The Living Playground" },
      {
        key: "hero.subtitle",
        label: "Sub-line (uppercase)",
        defaultValue: "Interactive art × playful technology × AI experiences",
      },
      {
        key: "hero.description",
        label: "Description",
        type: "multiline",
        defaultValue:
          "An evolving world by Bryan Lau. Everything here is playable, half-finished on purpose, and still growing.",
      },
      { key: "hero.ctaPrimary", label: "Primary button", defaultValue: "Enter the playground" },
      { key: "hero.ctaSecondary", label: "Secondary button", defaultValue: "Browse past seasons" },
      { key: "hero.scrollHint", label: "Scroll hint", defaultValue: "Scroll to enter" },
    ],
  },
  {
    id: "current",
    title: "Current Drop",
    description: "Labels around the featured current drop. The title and description come from the drop itself.",
    fields: [
      { key: "current.label", label: "Status label", defaultValue: "Current Drop · open now" },
      { key: "current.cta", label: "Call to action", defaultValue: "Enter the experience" },
      {
        key: "current.emptyTitle",
        label: "Empty-state title",
        defaultValue: "The season is between breaths",
        help: "Shown when there is no current drop.",
      },
      {
        key: "current.emptyBody",
        label: "Empty-state body",
        type: "multiline",
        defaultValue: "Nothing is open yet. Something is being built in the dark.",
      },
    ],
  },
  {
    id: "artifacts",
    title: "Interactive Artifact",
    description: "The still-life section and its four concept objects.",
    fields: [
      { key: "artifacts.eyebrow", label: "Eyebrow label", defaultValue: "Interactive Artifact" },
      { key: "artifacts.heading", label: "Heading", defaultValue: "Objects from the playground" },
      {
        key: "artifacts.intro",
        label: "Intro paragraph",
        type: "multiline",
        defaultValue:
          "Four concept prototypes made while building the worlds. None of them are manufactured, priced or for sale — they exist to test how a digital world might feel in the hand.",
      },
      {
        key: "artifacts.idlePrompt",
        label: "Idle prompt",
        type: "multiline",
        defaultValue: "Hover or focus a marker on the still life to read the idea behind each object.",
      },
      { key: "artifacts.coin.name", label: "Object 1 · name", defaultValue: "The Topographic Coin" },
      { key: "artifacts.coin.material", label: "Object 1 · material", defaultValue: "Milled brass · patina" },
      {
        key: "artifacts.coin.idea",
        label: "Object 1 · idea",
        type: "multiline",
        defaultValue: "A physical bookmark for a world you finished. Contours are the map you walked.",
      },
      { key: "artifacts.key.name", label: "Object 2 · name", defaultValue: "The First Key" },
      { key: "artifacts.key.material", label: "Object 2 · material", defaultValue: "Cast acrylic · short-range chip" },
      {
        key: "artifacts.key.idea",
        label: "Object 2 · idea",
        type: "multiline",
        defaultValue: "Tap it and a private door opens somewhere in the playground. Prototype only.",
      },
      { key: "artifacts.stone.name", label: "Object 3 · name", defaultValue: "The Light Stone" },
      { key: "artifacts.stone.material", label: "Object 3 · material", defaultValue: "River stone · fibre veins" },
      {
        key: "artifacts.stone.idea",
        label: "Object 3 · idea",
        type: "multiline",
        defaultValue: "It glows when someone else is inside the same world. Studio experiment.",
      },
      { key: "artifacts.paper.name", label: "Object 4 · name", defaultValue: "The Folded Chart" },
      { key: "artifacts.paper.material", label: "Object 4 · material", defaultValue: "Coated paper · gold ink" },
      {
        key: "artifacts.paper.idea",
        label: "Object 4 · idea",
        type: "multiline",
        defaultValue: "One printed constellation of every drop released. Folds down to a pocket.",
      },
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
