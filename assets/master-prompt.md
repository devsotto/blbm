# MASTER PROMPT — Balamban Liempo Static Website

> Merged and structured from all 41 project prompts (2026-09-27 → 2026-10-02).
> Source: `assets/log.txt` · Plan driver: `assets/updated-balamban.md` · Backlog: `assets/addfeatures.txt`

---

## 1. PROJECT CONTEXT

- **Type:** Static website (HTML/CSS/JS) — no bundler, no framework build step.
- **Worktree:** `/home/victor/dev-apps/static-webapp/balamban`
- **Reference site:** https://www.balambanliempo.com/
- **Main files:** `index.html`, `whatsnew.html`, `delivery.html`, `balamban-liempo.html`, `bl-spicy.html`, `balambanok.html`, `franchise/`
- **Structure:** Currently single-page navigation styling, being expanded into dedicated pages.
- **Run locally:** serve the folder with any static server (e.g. `python3 -m http.server`) and open `index.html` in the browser.

**Role:** Act as a UI/UX expert and senior frontend engineer for this project.

---

## 2. GOAL (MERGED INTENT)

Evolve the Balamban Liempo static site into a complete, multi-page, production-ready website that mirrors the structure and content of the original balambanliempo.com, while:

1. Extending navigation into dedicated pages.
2. Implementing the queued feature backlog (modal, audio, product pages, buttons).
3. Keeping a uniform, branded, Bootstrap-based look and feel across every page.
4. Maintaining a continuous **execute → verify → continue** workflow driven by `assets/updated-balamban.md`.

---

## 3. STRUCTURAL / IA DECISIONS

Create dedicated pages (matching the original site's structure) rather than keeping everything in single-page navigation:

- **Company Mission**
- **A Taste of History**
- **What's New (News and Updates)** — already exists as `whatsnew.html`
- **Delivery (Online Delivery)** — already exists as `delivery.html`
- **Franchise** — investigate whether "Franchise application form", "Investment & ROI guide", and "ROI guide — read online" exist on the original site; replicate if present.

---

## 4. FEATURE REQUIREMENTS

### 4.1 "What's New" page (`whatsnew.html`)
- News cards in the grid: uniform height/width (Bootstrap grid/flexbox — `d-flex`, `h-100`).
- News card **modal**:
  - Remove the top "x" close button from the header.
  - Align the bottom "Close" button to the **left**.
  - Replace "See it on Facebook" with share icons: **Facebook, Instagram, Pinterest**.

### 4.2 Homepage hero audio
- Sizzling/crackling background sound loop of roasted meat.
- Sound ON/OFF toggle at the **bottom-right of the Hero Banner**.
- On scroll past the hero: show a **floating sound toggle positioned directly above the existing "Back to Top" button**.
- Audio + both toggles active **only on the Homepage** (where the hero exists).
- Respect browser autoplay policy — default muted, enable on user interaction.

### 4.3 Product pages
- Remove the last "article" in the `product-list`.
- Build/lay out three product pages with uniform, identical styling:
  - `balamban-liempo.html` — ref: https://www.balambanliempo.com/BalambanLiempo.html
  - `bl-spicy.html` — ref: https://www.balambanliempo.com/BLSpicy.html
  - `balambanok.html` — ref: https://www.balambanliempo.com/balambanok.html
- Use content (including images where necessary) from those reference URLs.
- "Read more" links in the product list must point to their respective page.
- **Add only these pages — do not modify other pages or elements.**

### 4.4 UI consistency items
- **"Back to Top" floating button:** uniform site-wide styling; text horizontally + vertically centered; follow current branding.
- **"Skip to Content" element:** verify it works.
- **"About Us" dropdown:** fix the auto-scroll bug triggered on hover/tap (investigate nav dropdown event listeners, scroll code, and mobile menu paths — report file:line before changing).

### 4.5 Audit
- List **all externally-linked links across all pages** (audit output).

---

## 5. DESIGN & TECHNICAL CONSTRAINTS (NON-NEGOTIABLE)

- **Framework:** Bootstrap (CSS/JS) first. Convert elements/divs/sections to Bootstrap components for consistency. Custom CSS/JS only where Bootstrap cannot handle it.
- **Branding:** Preserve current typography, colors, spacing, hover states, and branding everywhere.
- **Design assistance:** Use **"Taste Skill"** and **"Awesome Design"** to guide UI/UX and layout decisions.
- **Accessibility & responsive:** aria-labels, focus states, correct behavior across viewports.
- **Scope discipline:** Don't touch pages/elements outside the stated task.
- **Playwright ban:** Do **NOT** use, invoke, or initialize Playwright or any browser tools for any task.
- **Deliverables:** Complete, production-ready HTML/CSS/JS with clear integration instructions.

---

## 6. WORKFLOW

1. **Primary driver:** `assets/updated-balamban.md` — analyze and execute; re-execute whenever it gains new instructions.
2. **Backlog:** `assets/addfeatures.txt` — pull next feature from here.
3. **Progress files:** `PROMPT: balambanliempo.md` task list — check status, close finished items, flag unfinished ones.
4. **Session pattern:** on resume, "continue where we left off"; if no clear next step, stop and ask for clarification rather than guessing.
5. **Research first:** use explore subagents for codebase mapping (report exact file paths + line numbers); never modify files during research passes.
6. **Verify after each execution:** confirm implemented elements (e.g. "Skip to Content") actually work before moving on.

---

## 7. OUT OF SCOPE / ONE-OFFS

- Installing `open-design` (nexu-io) as a standalone desktop app — environment setup, not site work.
- Git remote identification, local-server how-to — operational Q&A.

---

## 8. READY-TO-USE SINGLE PROMPT

> Copy-paste version of everything above.

```
You are a UI/UX expert and senior frontend engineer working on a static
HTML/CSS/JS website at /home/victor/dev-apps/static-webapp/balamban
(reference: https://www.balambanliempo.com/).

GOAL: Evolve the Balamban Liempo site from single-page navigation into a
complete, multi-page, production-ready site that mirrors the original,
keeping a uniform, branded, Bootstrap-based look across every page.

TASKS:
1. Create dedicated pages matching the original site structure: Company
   Mission, A Taste of History, What's New (news/updates), Delivery
   (online delivery), and Franchise (check the original site for a
   Franchise application form, Investment & ROI guide, and ROI guide).
2. whatsnew.html: uniform news-card heights; in the news modal remove the
   top "x" button, align bottom "Close" to the left, and replace "See it
   on Facebook" with Facebook / Instagram / Pinterest share icons.
3. Homepage hero: add a looping sizzling-meat audio with an ON/OFF toggle
   at the hero's bottom-right, plus a floating toggle that appears on
   scroll positioned directly above the "Back to Top" button. Homepage
   only. Respect browser autoplay policy (default muted).
4. Product pages: remove the last article from the product list; build
   balamban-liempo.html, bl-spicy.html, and balambanok.html with uniform
   styling, content and images from their respective reference URLs on
   balambanliempo.com, and wire the product-list "Read more" links to
   them. Add only these pages — do not touch anything else.
5. Make the floating "Back to Top" button uniform site-wide with centered
   text; verify the "Skip to Content" element; fix the "About Us" dropdown
   auto-scroll bug; audit and list all external links across all pages.

CONSTRAINTS:
- Use Bootstrap (CSS/JS) wherever possible; custom code only when
  Bootstrap can't do it. Preserve existing branding, typography, spacing,
  and hover states. Use "Taste Skill" and "Awesome Design" for UI/UX
  decisions. Keep accessibility (aria-labels, focus states) and
  responsiveness. Never use, invoke, or initialize Playwright or any
  browser tools. Stay strictly within the stated scope of each task.

WORKFLOW:
- Treat assets/updated-balamban.md as the executable plan: analyze it,
  execute it, and re-execute whenever it is updated.
- Pull the next feature from assets/addfeatures.txt when the plan is done.
- Track progress in PROMPT: balambanliempo.md; close finished tasks.
- Research with explore subagents first (file paths + line numbers, no
  edits), verify each change after implementation, and if the next step
  is unclear, stop and ask instead of guessing.

OUTPUT: complete, production-ready HTML/CSS/JS with integration
instructions.
```
