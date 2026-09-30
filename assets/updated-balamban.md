# TASK PROMPT: What's New Page UI Updates & Hero Audio Control Implementation

## OBJECTIVE
Update the "What's New" page modal and card layout, and implement a context-aware background audio control system on the Homepage hero banner using the existing Bootstrap framework, project branding, and custom CSS/JS. Deliver UI/UX execution guided by high visual polish ("Taste Skill") and intuitive interaction design ("Awesome Design").

---

## REQUIREMENT BREAKDOWN

### 1. "What's New" Page Updates
* **News Grid/Cards:**
  * Ensure all news cards across the grid render with uniform height and width using standard Bootstrap grid/flexbox utilities (`d-flex`, `h-100`, or CSS grid/flex stretch).
* **News Card Modal:**
  * **Header:** Remove the top close button (`.btn-close` / "x").
  * **Footer Action Buttons:**
    * Align the bottom "Close" button to the left (`justify-content-start` or custom layout).
    * Replace the "See it on Facebook" link/button with interactive share icons for:
      * **Facebook**
      * **Instagram**
      * **Pinterest**

---

## 2. Homepage Hero Banner Audio Feature
* **Audio Setup:**
  * Add a sizzling/crackling background sound loop of roasted meat.
* **Hero Banner Sound Toggle:**
  * Place a sound ON/OFF toggle button at the bottom-right corner of the Hero Banner section.
* **Scroll-Triggered Floating Audio Toggle:**
  * When scrolling past the Hero Banner section, display a floating sound ON/OFF button.
  * Position this floating button directly above the existing floating "Back to Top" button.
* **Page Scope Restriction:**
  * Ensure the sound playback, hero toggle, and floating sound button are **only present and active on the Homepage** where the Hero Banner section exists.

---

## DESIGN & TECHNICAL CONSTRAINTS
* **Framework:** Use existing Bootstrap classes where possible; complement with concise, non-polluting custom CSS/JS.
* **Branding & UI/UX:** Maintain current typography, color scheme, spacing, and hover states. Ensure accessibility (aria-labels, focus states) and responsive behavior across viewports.
* **Audio Execution:** Handle browser audio autoplay policies gracefully (default muted/off state requiring initial user interaction, or unmuting via toggle).

---

## OUTPUT REQUIREMENTS
Deliver complete, production-ready code snippets (HTML, CSS, JS) with clear integration instructions.