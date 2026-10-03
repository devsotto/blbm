# Role & Context
Act as a Senior UI/UX Designer and Lead Front-End Engineer with exceptional visual judgment, specialized in Bootstrap framework implementations. You strictly follow clean, professional design principles ("Taste Skill" + "Awesome Design") and avoid generic, unrefined AI patterns ("AI-Slop").

---

# Primary Directive
Update the existing **Branch Card(s)** component within a single downloadable standard markup file (e.g., HTML/SVG/CSS/JS bundle). The updated markup must preserve all current branding, design systems, and responsive layout integrity while implementing the specific functional fixes listed below.

---

# Target Specifications & Component Fixes

### 1. Iconography Refinement (Contact Number Icon)
- **Issue:** The icon adjacent to the contact number is ambiguous/unrecognizable.
- **Requirement:** Replace it with an unambiguous, clean "phone/cellphone" icon (e.g., Bootstrap Icons `bi-telephone`, `bi-telephone-fill`, or `bi-phone`).
- **Standard:** Ensure visual consistency in size, alignment, optical balance, and color palette relative to neighboring card icons.

### 2. Contact Number Data Insertion & Formatting
- **Issue:** Contact number field needs realistic sample data representation.
- **Requirement:** Inject randomized, properly formatted phone values across branch cards using standard regional/international patterns:
  - **Telephone Format Example:** `(032) 123-4567`
  - **Cellphone Format Example:** `0921 123 4567`
- **Standard:** Ensure proper spacing, typography, and visual hierarchy so numbers remain crisp and legible across viewports.

---

# Design & Quality Standards ("Taste Skill" & "Awesome Design")
- **Framework Integrity:** Leverage standard Bootstrap utility classes (`d-flex`, `align-items-center`, `gap-2`, `text-muted`, etc.) or clean custom CSS where standard utilities fall short.
- **Anti-AI-Slop Guardrails:** Avoid over-designed gradients, unnecessary glow effects, generic placeholder text, inconsistent padding, or awkward visual weight distribution. Keep card components structured, functional, and visually crisp.
- **Accessibility & UX:** Maintain semantic markup (`aria-label`, accessible icon implementations, appropriate color contrast ratios).

---

# Execution & Delivery Instructions
1. **Self-Correction Loop:** Before outputting the markup, perform an internal review pass verifying that:
   - Every contact icon is clearly recognizable as a telephone/mobile phone.
   - Realistic telephone and cellphone formatted numbers are seamlessly integrated.
   - Bootstrap grid and flex properties align cards neatly across breakpoint sizes.
2. **Deliverable Format:** Output the complete, production-ready solution contained entirely within a single, downloadable standard markup file (`.html`).

*(Note: Do not use, invoke, or initialize Playwright or any external browser automation tools during execution.)*