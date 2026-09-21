# UX audit — 22 September 2026

## The new journey

Home → Play something → choose a project → actual project.

Cards open the destination in a new tab, keeping the collection available. Native links preserve Tab/Enter, modifier-click, context menus, and copy-link behaviour. Existing /drops/ URLs remain as optional project notes and search/share destinations.

## Findings and changes

| Friction | Change |
| --- | --- |
| Every card and the custom keyboard shortcut sent visitors through an exhibit page. | Cards link directly to the stored project URL. Removed the global keyboard handler, which intercepted scrolling and could activate a stale selection. |
| The main hero CTA and first section promoted an unavailable physical prototype. | One clear Play CTA; playable collection first; MELT becomes a compact, clearly labelled prototype below it. |
| Navigation was hidden below desktop size; detail-page section links pointed to missing local anchors. | Play / Brewing / Collaborate remain visible on mobile and point home from detail pages. |
| Each card repeated its category, exhibit number, year, border rules and an Enter button. Screenshots were labelled Live. | One thumbnail, title, tag, brief description and Try it affordance. Removed redundant plaques, misleading Live labels and full-card colour flashing. |
| Most live filter labels each described a different audience, rather than grouping projects. | Search for this 12-project collection; category controls appear only when at least two categories have multiple projects. |
| Failed catalogue requests looked like an empty collection. | Separate loading, error/retry, empty and no-match states. |
| Content visibility depended on scroll observers and staggered animation. | Collection and hero render visibly without reveal gates. Marker underline and the existing easter egg remain. |
| Footer repeated large branding and equally prominent actions. | One collaboration CTA, smaller social links, and “Thanks for not dying.” |
| Small sound/theme/search targets made touch use fiddly. | Minimum 44px controls and clearer labels. |
| An invalid project URL could crash an old detail page. | Validated web destinations and a readable unavailable state. |

## Personality retained

“Good luck / have fun / don’t die,” the red/ink/paper palette, portrait collage, evidence tape, handwritten aside, dark/light modes, opt-in sound, and Konami easter egg. The design-critique framework guided the reduction of competing actions and repeated labels.

## Destination audit

All 12 visible projects responded with HTTP 200 on 22 September 2026 (Malaysia time). Cafe Rush and Farm-direct required a retry using curl after Node fetch failed. HTTP success does not prove that an experiment renders or works.

| Project | Final destination |
| --- | --- |
| Badminton Clash | https://www.yuqiuren.fun/ |
| Elemental Block Blast | https://elementalblockblast.bryanlauwk.fun/ |
| Infinite Kitchen | https://infinitekitchen.bryanlauwk.fun/ |
| 马年新年歌排行榜 | https://cny2026.bryanlauwk.fun/ |
| Inflation Chart | https://inflationchart.bryanlauwk.fun/ |
| Cafe Rush | https://zusrush.bryanlauwk.fun/ |
| Cartridge | https://cartridge.bryanlauwk.fun/ |
| Artoy | https://artoy.bryanlauwk.fun/ |
| 画啦猜啦 | https://chineseskribbl.bryanlauwk.fun/ |
| Farm-direct platform | https://secai-marche.bryanlauwk.fun/ |
| Boringg | https://clickerlab.bryanlauwk.fun/ |
| Giant Durian Run | https://kldex.bryanlauwk.fun/ |

Two saved Lovable URLs redirect to custom domains; these are automatic redirects, not extra visitor clicks. Public database records were not edited. Run `node scripts/audit-project-links.mjs` to repeat the read-only check.

## Verification and limits

- 28 tests passed: 12 direct destinations, search, reset, filtering, error recovery, native keyboard non-interference, unsafe URL fallback, navigation from detail pages, collection order, and legacy notes.
- App TypeScript and lint on changed UI files passed.
- Repository-wide lint still reports existing issues in untouched admin/auth, UI helpers, generated server code, and Tailwind configuration. Those are not represented as passing.
- Full production build passed, including sitemap and 12 per-project share-preview documents.
- npm lockfile repaired: the original failed npm ci because it did not match package.json. Compatible audit fixes removed reported high/critical advisories; four moderate advisory entries remain in React Router and Vitest-related packages and require major upgrades. Bun lockfiles were not migrated.
- Browser automation is blocked by an unavailable security-policy check. No claim of verified desktop/mobile screenshots, first-paint parity, or full interaction testing inside external projects. The existing first-paint browser script was not run around that restriction.

## Follow-up, outside this change

Compress the 1.3 MB portrait and split the admin code from the public bundle. Review major Router/test-tool upgrades separately. Visually check both themes and phone layouts before publishing.
