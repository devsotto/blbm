---
name: Balamban Liempo
description: A Cebu roasthouse rendered as a working ledger — Fraunces display type over cream paper, roasted-charcoal ground, ember amber for action, herb green for freshness.
colors:
  charcoal: "#3A2312"
  charcoal-deep: "#2A180C"
  charcoal-soft: "#4C3119"
  amber: "#D48C28"
  amber-bright: "#E9A63F"
  amber-deep: "#8C5A14"
  herb: "#3E6B34"
  herb-bright: "#5A8C4B"
  banana: "#8C9E5B"
  cream: "#F5EBE0"
  cream-deep: "#EDE0D2"
  cream-warm: "#FBF5EE"
  brand-crimson: "#9A2C2C"
  brand-crimson-soft: "#B13A3A"
  brand-oak: "#78350F"
  brand-amber: "#D97706"
  honey: "#F59E0B"
  error: "#B3341F"
  error-surface: "#FDF3F1"
  paper-white: "#FFFFFF"
typography:
  display-hero:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.7rem, 5.9vw, 4.85rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.032em"
  display-2:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3.6rem)"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  heading-2:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.9rem, 4vw, 2.9rem)"
    fontWeight: 750
    lineHeight: 1.05
    letterSpacing: "-0.026em"
  heading-3:
    fontFamily: "Fraunces, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.3rem, 2vw, 1.7rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.018em"
  lede:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.02rem, 1.5vw, 1.18rem)"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.68
  eyebrow:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.2em"
  nav-link:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.93rem"
    fontWeight: 500
    lineHeight: 1.5
  button:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
  caption:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
  code:
    fontFamily: "SF Mono, ui-monospace, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "0.9em"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
  xs: "4px"
  sm: "6px"
  md: "7px"
  lg: "10px"
  pill: "40px"
  full: "50%"
spacing:
  xs: "0.45rem"
  sm: "0.72rem"
  md: "1.05rem"
  lg: "1.5rem"
  xl: "3rem"
  gutter: "clamp(1.15rem, 4vw, 2.5rem)"
  section: "clamp(4.5rem, 9vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.charcoal-deep}"
    rounded: "{rounded.md}"
    padding: "0.72rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.amber-bright}"
    textColor: "{colors.charcoal-deep}"
    rounded: "{rounded.md}"
    padding: "0.72rem 1.5rem"
  button-dark:
    backgroundColor: "{colors.charcoal-deep}"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "0.72rem 1.5rem"
  button-ghost-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "0.72rem 1.5rem"
  text-link:
    textColor: "{colors.brand-crimson}"
    typography: "{typography.nav-link}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  chip-active:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  field:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.sm}"
    padding: "0.72rem 0.85rem"
  card:
    backgroundColor: "{colors.cream-warm}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.lg}"
    padding: "clamp(2.25rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)"
---

# Design System: Balamban Liempo

## Overview

**Creative North Star: "The Roaster's Ledger"**

This is a working record from a roasthouse that has been doing one thing for a
long time. The page behaves like the ledger such a business would keep: cream
paper, dark ink, entries set in a confident serif, and the occasional amber
stamped in to mark what matters. Nothing floats. Nothing is decorated for its
own sake. Every accent earns its place by carrying meaning — heat, freshness,
status, or an action the visitor can take.

The palette is built from the pit outward. Roasted charcoal (`#3A2312`,
`#2A180C`) is the ground and the ink; it is what the product looks like after
the fire. Ember amber (`#D48C28`, `#E9A63F`) is the heat — it marks buttons,
live status, and the hot edge of a headline, and it is deliberately rationed so
that it still reads as fire rather than as decoration. Herb green (`#3E6B34`,
`#5A8C4B`) and banana-leaf (`#8C9E5B`) are the fresh counterpoint: the stuffing,
the wrapper, the plate. Cream (`#F5EBE0`, `#FBF5EE`) is the paper everything is
written on.

Type does the heavy lifting. Fraunces carries every headline with its variable
`SOFT` and `WONK` axes engaged, giving the display a slight hand-cut wobble that
reads as heritage rather than as a font choice. Archivo handles all UI and body
copy — plain, compact, unsentimental, the handwriting of someone filling in the
ledger. The contrast between the two is the system's whole personality: a
decorated voice for claims, a plain voice for facts.

**Key Characteristics:**

- Cream paper ground with roasted-charcoal ink; no pure grey anywhere.
- Fraunces display (variable, `SOFT` 24–30, `WONK` 1) against Archivo UI.
- Ember amber rationed to action, heat and live status — never as a wash.
- Flat surfaces at rest; a three-step tinted shadow ladder for lift only.
- A grain overlay across the whole viewport that breaks digital flatness.
- Signature stamps, ribbon stripes and a single asymmetric "leaf" corner.
- Uppercase tracked eyebrows (`.2em`) as the only permitted all-caps text.

## Colors

The palette reads as three warm families — roast, ember, leaf — sitting on one
paper family, with a separate crimson reserved strictly for text links.

### Primary

- **Roast Charcoal** (`#3A2312`): the default ink. Body copy, top-bar text,
  chip labels, popup content. Everywhere words are meant to be read.
- **Deep Charcoal** (`#2A180C`): the darkest roast. Page headings on light
  ground, dark button fills, the top-bar strip, and the ground of dark sections.
- **Soft Charcoal** (`#4C3119`): field labels and the hover fill of dark
  buttons — one step lifted so secondary text recedes without going grey.

### Secondary

- **Ember Amber** (`#D48C28`): the action colour. Primary button fill, focus
  rings, active map pins, selection highlight. This is the colour of "do it".
- **Bright Amber** (`#E9A63F`): the same heat read against dark ground —
  eyebrows and emphasised words in charcoal sections, plus button hover.
- **Deep Amber** (`#8C5A14`): amber pulled down for legibility on cream.
  Eyebrows on light, italic emphasis in headings, inline text links on
  sub-pages.

### Tertiary

- **Herb Green** (`#3E6B34`): freshness and availability. "Now open" status,
  the map pin at rest, the stuffed-herb cue. Used in small doses only.
- **Herb Bright** (`#5A8C4B`): the lifted variant for status chips and badges
  where the darker green would sink into a surface.
- **Banana Leaf** (`#8C9E5B`): the wrapper colour. It appears almost entirely
  as the first thread of the ribbon stripe and as tiny separators — never as a
  field of colour.

### Neutral

- **Cream** (`#F5EBE0`): the page itself. Body background on every route.
- **Cream Deep** (`#EDE0D2`): the second paper — alternating sections,
  secondary cards, tertiary backgrounds.
- **Cream Warm** (`#FBF5EE`): card and panel stock, one shade brighter than
  the page so a card reads as a fresh sheet laid on top.
- **Paper White** (`#FFFFFF`): form fields and search inputs only. White is a
  control affordance here, never a page surface.

### Text Links

- **Brand Crimson** (`#9A2C2C`): the site-wide anchor colour. Set by
  `brand-system.css`, which loads last on every page, so every `<a>` resolves
  to crimson first — 7.6:1 on white, 6.4:1 on cream.
- **Brand Oak** (`#78350F`): link hover and active. Warmer and darker, never
  a resting colour.
- **Brand Amber** (`#D97706`) and **Honey** (`#F59E0B`): surfaces, borders,
  glow and large text only — both fall below 4.5:1 as body copy on paper.

### States

- **Error** (`#B3341F`) on **Error Surface** (`#FDF3F1`): invalid form fields
  only.

### Named Rules

**The Ember Ration Rule.** Ember amber appears on ≤10% of any viewport. Its
scarcity is what makes it read as heat. If a screen starts looking golden, the
accent has become a background and the rule is broken.

**The No-Grey Rule.** There is no neutral grey in this system. Every neutral is
warmed: text steps down through `#3A2312 → #4C3119 → rgb(92,74,58)`,
surfaces step through `#F5EBE0 → #EDE0D2 → #FBF5EE`. A cool grey next to cream
reads as a rendering error.

**The Muted-Alpha Floor.** Warm muted text is `rgba(58,35,18,α)` where
**α ≥ .72**. Below that it drops under 4.5:1 on cream-deep, the darkest surface
the system ships. Bootstrap's `.text-secondary` resolves `--bs-secondary-rgb`,
not `--bs-secondary-color` — override both, or the stock `#6c757d` leaks
through on cream.

**The Crimson-Is-For-Words Rule.** `#9A2C2C` is a text colour, not a fill. It
never becomes a button background, a card, or a section wash — links are the
only place it lives.

## Typography

**Display Font:** Fraunces (with `"Iowan Old Style", Georgia, serif` fallback)
**Body Font:** Archivo (with `system-ui, -apple-system, "Segoe UI", sans-serif` fallback)
**Code Font:** "SF Mono" (with `ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace`
fallback): file paths, selectors, code and measurement readouts in technical
artifacts such as audit reports. Never for prose or UI copy.

**Character:** A decorated voice answering to a plain one. Fraunces is an
optical-size serif pushed into its variable axes — `SOFT` 24–30 softens the
terminals, `WONK` 1 lets the wonky alternates out — so headlines look cut
rather than drawn. Archivo is a workhorse grotesque that stays out of the way
and keeps dense UI copy legible at small sizes.

### Hierarchy

- **Display Hero** (800, `clamp(2.7rem, 5.9vw, 4.85rem)`, 0.98, `-0.032em`):
  the opening headline of a page. Fraunces, `SOFT` 30 / `WONK` 1,
  `text-wrap: balance`. Reserved for the single h1.
- **Display 2** (750, `clamp(2.1rem, 4.6vw, 3.6rem)`, 1.02, `-0.028em`):
  section-opening statements. Fraunces, `SOFT` 24 / `WONK` 1. Emphasis
  inside it takes italic + Ember Amber.
- **Heading 2** (750, `clamp(1.9rem, 4vw, 2.9rem)`, 1.05, `-0.026em`): the
  sub-page equivalent of Display 2, used where a route opens on a section
  rather than a hero.
- **Heading 3** (700, `clamp(1.3rem, 2vw, 1.7rem)`, 1.15, `-0.018em`): card and
  panel titles. Sub-pages tighten this to `clamp(1.2rem, 2vw, 1.42rem)`.
- **Lede** (400, `clamp(1.02rem, 1.5vw, 1.18rem)`, 1.7, max 62ch): the
  supporting paragraph under a headline, always constrained to a readable
  measure.
- **Body** (400, `1.0625rem`, 1.68): default copy. Sub-pages run `line-height`
  1.62 through the Bootstrap reskin.
- **Eyebrow** (700, `0.72rem`, letter-spacing `0.2em`, uppercase): the section
  kicker. Ember Amber on light, Bright Amber on dark. This is the only
  uppercase text the system permits.

### Named Rules

**The Two-Voice Rule.** Fraunces makes claims; Archivo states facts. No body
paragraph is ever set in Fraunces, and no headline is ever set in Archivo.

**The One-Case Rule.** Uppercase belongs to `.eyebrow` and to short stamped
labels inside the seal badge — nothing else. Running prose, button labels and
card titles stay in sentence case.

**The Measure Rule.** Any paragraph meant to be read for more than two lines
caps at 62ch (`.section-lede`, `.lede`). Full-bleed text on a 1280px shell is
a bug, not a layout.

## Layout

A centered 1280px shell (`--shell`) with a fluid gutter of
`clamp(1.15rem, 4vw, 2.5rem)` (`--gutter`). Sections breathe on a vertical
rhythm of `clamp(4.5rem, 9vw, 8rem)` (`--section-y`) — the single spacing
value that most determines whether a page feels like this brand.

Index composes on an asymmetric two-column grid at ≥992px
(`minmax(0, .9fr) / minmax(0, 1.1fr)`), collapsing to one column below.
Sub-pages inherit Bootstrap 5's container/row/grid for structure and add only
what Bootstrap cannot express.

Breakpoints are Bootstrap's three (`575.98px`, `767.98px`, `991.98px`) plus
route-specific mid-steps at `620px` (form two-up), `760px`, `860px`, `900px`
and `1100px`. The layout is fluid between them rather than stepped.

Two fixed layers ride above content: the top bar at `z-index: 700`, the
frosted nav at `800`, and the grain overlay at `900`. Scroll anchoring is
`6.5rem` on index, `5.25rem` on sub-pages — so deep links clear the nav.

## Elevation & Depth

The system is **tonal, not lifted**. Surfaces are flat at rest and separate by
paper value: a card is `#FBF5EE` on a `#F5EBE0` page, not a shadow. Where
depth appears it is a response to state, and it is always tinted brown — never
a neutral black — so shadows read as warmth rather than as a UI layer.

### Shadow Vocabulary

- **Lift SM** (`0 2px 6px rgba(58, 35, 18, .07)`): resting separation for
  small controls and popups.
- **Lift MD** (`0 10px 30px -14px rgba(58, 35, 18, .35)`): the default card
  elevation, and the hover target for `.card-hover`.
- **Lift LG** (`0 28px 60px -30px rgba(58, 35, 18, .5)`): overlays and
  modals only.
- **Ember Glow** (`0 14px 34px -14px rgba(212, 140, 40, .65)`): the one
  non-neutral shadow. Bound exclusively to amber buttons — it is heat
  radiating, not elevation.

All four are defined with a top-left light source and must stay consistent
with it.

### Named Rules

**The Flat-At-Rest Rule.** Nothing casts a shadow in its resting state unless
it is an amber button. Hover, focus, active and overlay are the only states
that earn depth.

**The Single-Light Rule.** Every shadow in the ladder is tinted
`rgba(58, 35, 18, …)` and offset from the top-left. Introducing a cool grey
shadow or a bottom-right light source breaks the material.

## Shapes

Softly squared, never pill-shaped except where the shape itself is the
message. The working radius scale is `4px` (tight inner details), `6px` (the
dominant value — inputs, popups, nav links, list rows), `7px` (buttons, search
fields, captcha panel), and `10px` (cards and panels). Bootstrap's reskin adds
`.375rem / .5rem / .75rem / 1rem` for its own components.

Full pills (`40px`, or Bootstrap's `50rem`) are reserved for filter chips and
badges — elements whose roundness signals "toggleable". Circles (`50%`) are
reserved for the seal badge, icon plates and status dots.

The signature is the **leaf corner**: a single corner blown out while the
other three stay square — `4px 88px 4px 4px`, `4px 4px 96px 4px`,
`88px 4px 4px 4px`. It appears on illustrated plates and photo frames to evoke
a banana leaf's fold. It is a decorative accent and must never be applied to
interactive controls.

Borders are hairline and warm: `1px solid rgba(58, 35, 18, .14)` for cards,
`rgba(58, 35, 18, .18)` for fields, `1.5px` for buttons and chips where the
border is carrying the affordance.

### Named Rules

**The Leaf-Corner Rule.** Exactly one corner per composed element may take the
`88–96px` blowout, and only on non-interactive illustration frames. Two leaf
corners on one element read as a mistake.

## Components

### Buttons

- **Shape:** gently squared (`7px`), padding `0.72rem 1.5rem`, weight 600,
  Archivo.
- **Primary (Amber):** Ember Amber `#D48C28` fill with Deep Charcoal `#2A180C`
  label, Ember Glow underneath. Hover lifts to Bright Amber `#E9A63F`,
  `translateY(-2px)`, glow deepens; active presses to `translateY(1px)
  scale(.985)`.
- **Dark:** Deep Charcoal `#2A180C` fill with Cream label; hover steps to Soft
  Charcoal `#4C3119`. No glow — glow is amber-only.
- **Ghost (on dark):** transparent with a `1.5px rgba(245,235,224,.42)` stroke
  and Cream label; hover fills to `rgba(245,235,224,.1)` and solidifies the
  stroke.
- **Focus:** buttons swap the global outline for a `0 0 0 .25rem
  rgba(212,140,40,.4)` ring so the glow and the focus ring never stack.

### Text Links

Inline links are Brand Crimson `#9A2C2C`, turning Brand Oak `#78350F` with an
underline on hover. The `.text-link` pattern — a `600`/`.95rem` label with a
`1.5px` amber underline and an arrow — widens its `gap` from `.45rem` to
`.8rem` on hover: the arrow walks right rather than the whole control moving.

### Chips

- **Style:** transparent fill, `1.5px rgba(58,35,18,.2)` stroke, charcoal
  label, `40px` pill, padding `0.5rem 1rem`.
- **State:** hover solidifies the stroke to charcoal and lifts `-1.5px`;
  active inverts to Charcoal fill with Cream label. Counts ride inside at
  `.74rem`, tabular-nums, 60% opacity.

### Cards / Containers

- **Corner Style:** `10px`.
- **Background:** Cream Warm `#FBF5EE` on a Cream `#F5EBE0` page.
- **Border:** `1px solid rgba(58,35,18,.14)`.
- **Shadow Strategy:** Lift MD at rest on index; flat at rest and Lift MD on
  hover for `.card-hover`, which also warms its border to `rgba(212,140,40,.5)`
  and lifts `-4px`.
- **Internal Padding:** `clamp(2.25rem, 5vw, 3.5rem)` vertical by
  `clamp(1.5rem, 4vw, 3rem)` horizontal.

The `.mission-card` is the composed variant: a `7px` ribbon stripe across the
top edge and an inset hairline frame at `9px`.

### Inputs / Fields

- **Style:** Paper White `#FFFFFF` fill, `1.5px rgba(58,35,18,.18)` stroke,
  `6px` radius, padding `0.72rem 0.85rem`, Archivo `.98rem`.
- **Focus:** the stroke turns Ember Amber and a `0 0 0 3px
  rgba(212,140,40,.22)` ring appears; the default outline is removed so the
  two never double up.
- **Error:** stroke becomes Error `#B3341F` on Error Surface `#FDF3F1`, with a
  `.78rem` message beneath.
- **Labels:** `.82rem` / 600 / `0.04em` in Soft Charcoal, `.4rem` above the
  control; required markers take Deep Amber.

### Navigation

A two-tier header: a Deep Charcoal top bar (`.82rem`, Bright Amber emphasis,
Banana-Leaf dot separators) over a frosted nav — `rgba(245,235,224,.86)` with
`backdrop-filter: blur(14px) saturate(1.4)` and a `rgba(58,35,18,.09)` bottom
rule. Links are `.93rem`/500 in `rgba(58,35,18,.74)` at `6px` radius, picking
up a tinted background on hover. The brand mark rotates `-2deg` and scales
`1.03` on hover.

Sub-pages swap this for a single sticky bar with a `rgba(245,235,224,.9)`
fill, a breadcrumb-style eyebrow in the centre, and a `btn-sm` "Back to main
website" escape hatch on the right.

### Signature Components

- **The Seal Badge (`.stamp`):** a circular charcoal medallion,
  `clamp(180px, 15vw, 230px)` × 1.25, holding tracked Bright Amber caps above
  and below a Fraunces medallion line. It is the system's stamp of authority
  and appears once per page at most.
- **The Ribbon Stripe:** two `45deg` repeating gradients — Banana Leaf and
  Ember Amber at `7px` intervals — layered as a `7px` band. It marks card
  tops and section seams and is the only place banana and amber touch.
- **The Grain Overlay (`.grain`):** a fixed, full-viewport fractal-noise SVG at
  `opacity .32` in `mix-blend-mode: multiply`, `z-index 900`. It sits over
  everything, pointer-events off, and exists purely to stop the cream from
  reading as flat digital white.

## Do's and Don'ts

### Do:

- **Do** ground every page on Cream `#F5EBE0` with Charcoal `#3A2312` ink, and
  step down through `#EDE0D2` / `#FBF5EE` for secondary and card surfaces.
- **Do** reserve Ember Amber `#D48C28` for buttons, focus rings, live status
  and hot headline emphasis — and keep it under 10% of any viewport.
- **Do** set headlines in Fraunces with `font-variation-settings: "SOFT" 24–30,
  "WONK" 1`, and tighten tracking as size grows (`-0.018em` at Heading 3
  through `-0.032em` at Display Hero).
- **Do** use the `--lift-sm / --lift-md / --lift-lg` ladder and keep every
  shadow tinted `rgba(58, 35, 18, …)` from a top-left light source.
- **Do** cap reading paragraphs at 62ch and hold the section rhythm to
  `clamp(4.5rem, 9vw, 8rem)`.
- **Do** apply the grain overlay to any new full-page surface so it matches
  the existing paper character.
- **Do** keep focus visible: the global `3px` Ember Amber outline at `3px`
  offset, or the matching ring on buttons and fields.

### Don't:

- **Don't** introduce cool grey, pure black, or pure white as a page surface.
  White is for form controls only.
- **Don't** set body copy in Fraunces or headlines in Archivo — the two voices
  do not swap.
- **Don't** use uppercase outside `.eyebrow` and the seal badge's stamped
  lines.
- **Don't** put a shadow on a resting card; use paper value to separate it.
- **Don't** apply the leaf corner to interactive controls, or to more than one
  corner of a single element.
- **Don't** use Brand Crimson `#9A2C2C` as a fill — it is a text colour.
- **Don't** pair an accent border with a rounded corner on the same element
  (e.g. `border-top: 4px` on a `10px` radius); the stroke fights the curve.
  Either inset it as a hairline frame or run it edge-to-edge square.
- **Don't** animate `padding`, `padding-left` or `width` — transition colour,
  transform, border-color and box-shadow only.
