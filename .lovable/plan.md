## MOTD for friends-only GMod server

A single, scroll-friendly MOTD page styled in Material 3 Expressive (Purple) — the kind of thing you'd load up via `motd_url` in your server config. No backend needed.

### Visual direction (Material 3 Expressive — Purple)
- Color tokens in `src/styles.css` (oklch):
  - primary `#6750A4`, on-primary `#FFFFFF`, primary-container `#EADDFF`, on-primary-container `#21005D`
  - surface `#FEF7FF`, surface-container `#F3EDF7`, surface-container-high `#ECE6F0`, outline `#79747E`
  - Dark scheme as default (it's a MOTD, dark reads better in-game): surface `#141218`, surface-container `#211F26`, primary `#D0BCFF`, on-primary `#381E72`, primary-container `#4F378B`
- Typography: Google Fonts — **Roboto Flex** (display/body) + **Roboto Mono** (small labels), loaded via `<link>` in `__root.tsx`.
- Shape: M3 corner scale (sm 8 / md 12 / lg 16 / xl 28). Big rounded "expressive" hero card, pill chips, filled & tonal buttons.
- Motion: subtle Material emphasized easing on hero entrance + chip hover (Framer Motion, already idiomatic).

### Page structure (`src/routes/index.tsx`)
1. **Top app bar** — server name, small "Friends only" assist chip.
2. **Hero card** (primary-container background, large display type)
   - Title: server name (placeholder "The Sandbox" — easy to edit)
   - Tagline: **"Have fun — PAC3 is allowed"**
   - Filled button: "Join via Steam" (placeholder `steam://` link), Tonal button: "Copy IP" (placeholder)
3. **The Cat card** — round/squircle framed image from `https://i.imgur.com/2daR3cv.jpeg` with caption "Meet the MOTD creator's cat" (M3 outlined card, on-surface text). Image lazy-loaded with alt text.
4. **Addons section** — grid of M3 outlined cards, one per workshop item from the collection https://steamcommunity.com/sharedfiles/filedetails/?id=3730123254
   - Each card: thumbnail, title, author, "View on Workshop" text button.
   - Data fetched **once at build time** via a small Node script that scrapes the collection page and writes `src/data/addons.json`. No runtime API key, no server function. (Fallback placeholders if scrape returns 0.)
5. **Footer** — small mono text: "MOTD · v1 · Material 3 Expressive".

### Technical notes
- New file: `scripts/fetch-addons.ts` — fetches the Steam collection HTML, parses `sharedfile_*` blocks for id/title/thumbnail, then for each item hits `/sharedfiles/filedetails/?id=<id>` to grab the author. Writes `src/data/addons.json`. Run once now during build; not wired into `package.json` scripts (so future builds don't depend on Steam being reachable).
- `src/routes/index.tsx` replaces the placeholder; imports `addons.json` statically.
- `src/styles.css` gets the M3 token block under `@theme inline` mapped from `:root` / `.dark` CSS vars, plus M3 elevation shadow tokens. No custom Tailwind utilities required beyond tokens.
- `src/routes/__root.tsx` head: title "MOTD — Friends Server", meta description, Google Fonts `<link>` for Roboto Flex + Roboto Mono, sets `<html class="dark">` so the MOTD opens dark by default.
- SEO/sharing kept minimal — this isn't really public, but title/description are set cleanly.

### What I'm assuming (easy to tweak after)
- Server name placeholder: **"The Sandbox"** — tell me the real one and I'll swap.
- No rules section (you didn't list any beyond "have fun, PAC3 allowed" which lives in the hero).
- No Discord/Steam group links — leave the buttons as placeholders for now.

```text
┌─────────────────────────────────────────┐
│  ◆ The Sandbox        [friends only]    │
├─────────────────────────────────────────┤
│                                         │
│   THE SANDBOX                           │
│   Have fun — PAC3 is allowed            │
│   [ Join via Steam ] [ Copy IP ]        │
│                                         │
├─────────────────────────────────────────┤
│   🐱  [cat photo]                       │
│       MOTD creator's cat                │
├─────────────────────────────────────────┤
│   Installed addons                      │
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐                  │
│   │  │ │  │ │  │ │  │  ... grid        │
│   └──┘ └──┘ └──┘ └──┘                  │
└─────────────────────────────────────────┘
```
