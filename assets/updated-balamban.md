# TASK INSTRUCTION: Delivery Page UI/UX Redesign & Optimization

## ROLE & EXPERTISE
Act as an elite Senior Front-End Developer and UI/UX Architect with **Taste Skill** (impeccable visual aesthetic, typography hierarchy, spatial harmony, visual polish) and **Awesome Design** (interactive elegance, intuitive navigation, responsive micro-interactions, seamless component design).

---

## CONTEXT & OBJECTIVE
Redesign and build/update the **"Delivery" page** for the website by incorporating branded logos for four major delivery partners (Lalamove, Angkas, GrabFood, Foodpanda), framing step-by-step ordering instructions sourced from `https://www.balambanliempo.com/orderfoodapps.html`, eliminating legacy elements, and introducing modern floating navigation features.

---

## MANDATORY CONSTRAINTS & RULES
1. **NO BROWSER / PLAYWRIGHT TOOLS**: Do NOT attempt to run, invoke, or initialize Playwright, Puppeteer, or any headless browser automation tools.
2. **NO TRADITIONAL FOOTER "BACK TO TOP"**: Completely remove the static "Back to Top" link/button from the page footer.
3. **REMOVE SKIP LINK**: Search and remove `<a class="skip-link" href="#main">Skip to content</a>`.

---

## DETAILED TECHNICAL & UI/UX REQUIREMENTS

### 1. Delivery Apps Grid & Brand Integration
- **Partners**: Lalamove, Angkas, GrabFood, Foodpanda.
- **Logos & Imagery**:
  - Integrate official brand logos/assets.
  - Apply CSS enhancement filters (e.g., proper aspect ratio containment, high DPI sharpness, crisp vector SVG rendering, subtle drop-shadows or border containers) for maximum contrast, brand fidelity, and visual clarity against the background.
- **Ordering Instructions (Ref: `https://www.balambanliempo.com/orderfoodapps.html`)**:
  - Provide concise, clean, step-by-step ordering instructions for each delivery service:
    - **GrabFood & Foodpanda**: In-app search, item selection (Liempo, Chicharon, etc.), address validation, checkout/payment.
    - **Lalamove & Angkas**: On-demand pabili/courier setup (Pickup location at Balamban Liempo branch, Drop-off destination, Item details, Courier payment notes).
  - Present instructions in modern, distinct cards or accordion/tab structures for readability. Include CTA buttons (e.g., "Order on GrabFood", "Book Lalamove") linking to app/web deep links.

### 2. Header & Code Cleanup
- Remove `<a class="skip-link" href="#main">Skip to content</a>`.
- Ensure semantic accessibility (`aria-label`, landmarks) remains intact through clean HTML structure.

### 3. Floating "Back to Top" Component ("Awesome Design" Standard)
- Implement a modern, floating "Back to Top" button (e.g., bottom-right fixed positioning).
- **Behavior**:
  - Hidden on initial load.
  - Smooth fade-in / slide-up animation when scrolling down past `300px`.
  - Smooth scroll to top (`window.scrollTo({ top: 0, behavior: 'smooth' })`) on click.
  - Fully mobile-responsive, touch-friendly hit area (minimum 44x44px), with crisp hover and active focus states.

### 4. Visual & Layout Refinements ("Taste Skill" Standard)
- Palette: Cohesive with Balamban Liempo’s brand identity (rich roasted tones, warm accents, high-contrast typography).
- Responsive Layout: CSS Grid/Flexbox with smooth breakpoints (Mobile, Tablet, Desktop).
- Micro-interactions: Subtle hover states on app cards and logo containers.

---

## EXECUTABLE OUTPUT REQUIRED
1. **Complete Clean HTML5 Code** for the Delivery page.
2. **Embedded/Linked Modern CSS (or Tailwind CSS)** for layout, crisp logo styling, card cards, and floating button transitions.
3. **Vanilla JavaScript** snippet for the scroll-triggered Floating "Back to Top" button behavior.