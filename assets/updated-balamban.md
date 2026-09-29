# Task Prompt: Embed YouTube Video in Franchise Copy Section

**Role:** Expert Front-End WordPress Developer & UI/UX Specialist  

**Task:** Embed the YouTube video (`https://www.youtube.com/watch?v=LUlTs-6W7HI`) into the `.franchise-copy` column, positioned directly before/above the `.franchise-perks` element. The player wrapper must match existing site branding and design patterns (typography, borders, shadow elevation, border-radius, and aspect ratio).

---

### Constraints & Instructions

1. **No Browser Automation:** Do **NOT** use, invoke, or initialize Playwright, Puppeteer, Selenium, or any automated browser testing tools.
2. **Placement:** The embedded media element/wrapper must strictly live inside the `.franchise-copy` container and precede `.franchise-perks` in DOM order.
3. **Responsive Media Wrapper:** Use a standard fluid responsive container (`aspect-ratio: 16 / 9` or dynamic padding trick) to prevent Cumulative Layout Shifts (CLS) across mobile, tablet, and desktop breakpoints.
4. **Branding & UI/UX Guidelines:**
   - **Styling:** Apply design tokens matching site branding (brand-accent borders, subtle drop shadows, rounded corners matching existing cards/containers).
   - **Embed Parameters:** Use standard privacy-enhanced YouTube embed URLs (`https://www.youtube-nocookie.com/embed/LUlTs-6W7HI?rel=0`) with `loading="lazy"`, proper `iframe` `title`, and `allowfullscreen`.

---

### Verification Loop Strategy

Execute the following steps iteratively until all acceptance criteria are met:

#### Phase 1: DOM & Structure Injection
* Locate the target template file or layout component rendering `.franchise-copy` and `.franchise-perks`.
* Construct the HTML markup for the responsive embed wrapper:
  ```html
  <div class="franchise-video-wrapper">
    <iframe 
      src="https://www.youtube-nocookie.com/embed/LUlTs-6W7HI?rel=0" 
      title="Franchise Overview Video" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen 
      loading="lazy">
    </iframe>
  </div>
  ```
* Place `.franchise-video-wrapper` directly above `.franchise-perks` within `.franchise-copy`.

#### Phase 2: Styling & Brand Integration
* Implement CSS variables and style rules for `.franchise-video-wrapper`:
  - **Aspect Ratio:** Ensure full-width responsiveness (`width: 100%`, `aspect-ratio: 16 / 9`).
  - **Design Details:** Apply brand-compliant `border-radius`, margin spacing (`margin-bottom` consistent with layout vertical rhythm), and subtle box shadows.
  - **Iframe Rules:** Style child `iframe` with `width: 100%`, `height: 100%`, and `border: none`.

#### Phase 3: Sanity Check & Self-Correction
* [ ] Verify that DOM placement inside `.franchise-copy` precedes `.franchise-perks`.
* [ ] Confirm no inline CSS hacks or hardcoded pixel widths cause overflow on smaller viewports (< 480px).
* [ ] Verify clean CSS variable adoption matching theme defaults without breaking existing column layout grids.

---

### Completion / Exit Condition

Stop the loop and present the final code diff/snippets once:
1. The video embed markup is cleanly integrated directly above `.franchise-perks` inside `.franchise-copy`.
2. Clean, brand-consistent CSS for fluid responsiveness is fully implemented.
3. No browser automation or CLI test runner dependencies were executed during the task.