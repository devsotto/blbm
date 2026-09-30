# TASK INSTRUCTION: FIX DELIVERY PARTNER APP BUTTON ALIGNMENT & ELEVATE UI/UX

## CONTEXT & OBJECTIVE
You are an elite UI/UX Engineer and Front-End Developer with superior design intuition ("Taste Skill" + "Awesome Design"). 

In the current Delivery Partner App, action buttons are suffering from text layout defects—specifically, the button text is **not perfectly centered horizontally and vertically**. Your objective is to resolve this issue across all button components, adhering strictly to the Bootstrap framework while applying world-class micro-interactions, mobile-first touch ergonomics, and brand-consistent design decisions.

---

## CONSTRAINTS & REQUIREMENTS

1. **Perfect Centering & Alignment Mechanics:**
   - Text, icons, and indicators inside the button MUST be **mathematically and visually centered horizontally and vertically**.
   - Utilize Bootstrap 5 Flexbox utilities (`d-inline-flex`, `d-flex`, `align-items-center`, `justify-content-center`) or CSS Grid layout.
   - Eliminate line-height inconsistencies, default browser padding offsets, or improper inline block alignments causing vertical drift.

2. **Delivery Partner App Ergonomics & UI/UX ("Taste Skill" + "Awesome Design"):**
   - **Touch Target Optimization:** Ensure minimum physical touch area (minimum 48px height) for drivers on mobile devices.
   - **Visual Hierarchy & State Feedback:** Implement distinct hover, active, pressed, disabled, and loading/spinner states appropriate for high-frequency delivery workflows (e.g., "Accept Order", "Swipe to Complete", "Navigate").
   - **Branding Harmonization:** Utilize standard Bootstrap theme color overrides (`var(--bs-primary)`, custom brand tokens) and consistent border-radius (rounded-pill or standard subtle radius).
   - **Icon-Text Spacing:** If buttons contain icons (e.g., navigation arrows, delivery boxes, checkmarks), ensure clean, proportional inline spacing (`gap-2` or `me-2`) without throwing off vertical alignment.

3. **Framework Strictness:**
   - Build cleanly using standard Bootstrap 5 CSS utility classes.
   - Custom CSS/SCSS must be minimal, clean, modular, and scoped to avoid breaking global button utilities.

4. **Tool Restrictions:**
   - **CRITICAL:** Do NOT use, invoke, or initialize Playwright, Puppeteer, or any browser automation tools for this task.

---

## REQUIRED DELIVERABLES

Please provide a clean, production-ready implementation package containing:

1. **Refactored HTML / Component Markup:** Standard delivery app action buttons (Primary Action, Full-Width Bottom Bar Button, Icon + Text Button, Disabled/Loading State Button) using correct Bootstrap alignment classes.
2. **CSS / SCSS Fixes:** Precise CSS rules addressing padding normalization, line-height overrides, CSS flexbox alignment, and active state elevation.
3. **UI/UX Audit & Explanation:** Brief breakdown detailing *why* the text was misaligned originally (e.g., `line-height`, `display: inline-block` margin shifts, font baseline issues) and how the new design improves partner usability.

---

## QUALITY REFINEMENT LOOP (INTERNAL EVALUATION)
Before outputting, evaluate your solution against these checks:
- [ ] Is the button text and any accompanying icon strictly centered both vertically and horizontally across all viewports?
- [ ] Do full-width mobile sticky bottom buttons maintain comfortable touch targets (48px+) and proper vertical balance?
- [ ] Is the solution completely reliant on Bootstrap-native utilities and clean CSS variable usage?
- [ ] Are focus rings, tap highlights (`-webkit-tap-highlight-color`), and accessible contrast ratios preserved for drivers in sunlight?