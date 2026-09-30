# MASTER PROMPT: Balamban Liempo Web UI/UX Update & Product Detail Pages Integration

## TASK SUMMARY
You are tasked with updating an existing website for Balamban Liempo using Bootstrap and custom CSS/JS. You will refine the main product list and construct three (3) distinct, uniformly styled product detail pages based on explicit content and imagery from target URLs.

---

## CONSTRAINTS & EXECUTION RULES (STRICT)
1. DO NOT touch, modify, or delete any existing pages, global layout components, header/footer elements, or unrelated CSS/JS, EXCEPT for the exact instructions specified below.
2. DO NOT use, invoke, or initialize Playwright, Puppeteer, Selenium, or any automated browser/scraping execution tools. Use static URL resource fetching/content analysis only.
3. ADHERE STRICTLY to current branding, color scheme, typography, and visual assets.
4. APPLY UI/UX DESIGN CRITERIA: Integrate "Taste Skill" (refined culinary aesthetic, appetite appeal, elegant micro-interactions) and "Awesome Design" (clean layout grid, accessible contrast, responsive spacing, responsive image handling) across all newly created/updated elements.

---

## STEP-BY-STEP IMPLEMENTATION INSTRUCTIONS

### STEP 1: Main Product List Update
- Locate the container element with the class/ID `product-list` (or `.product-list`).
- Find all direct or child `<article>` elements within `.product-list`.
- REMOVE the **last** `<article>` element from `.product-list`.
- Update the remaining product items in `.product-list` so that their respective "Read more" buttons/links route directly to the newly created product pages detailed in Step 2.

---

### STEP 2: Create Uniform Product Detail Pages
Create three (3) new HTML pages following a strictly **uniform, high-converting layout and design system** (using Bootstrap grid/components and complementary custom CSS/JS).

#### Page Specifications & Content References:
1. **Balamban Liempo Page**
   - File Path/Name: `balamban-liempo.html` (or project equivalent routing)
   - Reference URL: `https://www.balambanliempo.com/BalambanLiempo.html`
   - Content: Extract original product descriptions, taste profile notes, serving sizes, and product images from the reference URL.
   - Action: Link the "Balamban Liempo" item’s "Read more" in `.product-list` to this page.

2. **BL Spicy Page**
   - File Path/Name: `bl-spicy.html` (or project equivalent routing)
   - Reference URL: `https://www.balambanliempo.com/BLSpicy.html`
   - Content: Extract original product descriptions, spice rating/notes, product images, and featured callouts from the reference URL.
   - Action: Link the "BL Spicy" item’s "Read more" in `.product-list` to this page.

3. **Balambanok Page**
   - File Path/Name: `balambanok.html` (or project equivalent routing)
   - Reference URL: `https://www.balambanok.html` / `https://www.balambanliempo.com/balambanok.html`
   - Content: Extract original roasted chicken details, flavor profile, product images, and pricing/specifications from the reference URL.
   - Action: Link the "Balambanok" item’s "Read more" in `.product-list` to this page.

---

### STEP 3: Uniform Layout & Design System Architecture
Ensure all 3 new pages share the exact same structural template (`.hero-product-header`, `.product-spec-grid`, `.flavor-profile-card`, `.gallery-lightbox-section`, `.cta-order-bar`):

```html
<!-- UNIFORM TEMPLATE SCHEMA -->
<main class="product-detail-wrapper container my-5">
  <!-- Breadcrumb Navigation -->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="index.html">Home</a></li>
      <li class="breadcrumb-item"><a href="index.html#product-list">Products</a></li>
      <li class="breadcrumb-item active" aria-current="page">{{PRODUCT_TITLE}}</li>
    </ol>
  </nav>

  <!-- Hero Section -->
  <div class="row align-items-center g-4 my-3">
    <div class="col-lg-6">
      <div class="product-gallery-main rounded shadow-sm overflow-hidden">
        <img src="{{PRODUCT_IMAGE_URL}}" class="img-fluid w-100 alt="{{PRODUCT_TITLE}}" loading="lazy">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="product-info-panel ps-lg-4">
        <span class="badge bg-danger mb-2 text-uppercase tracking-wide">Signature Specialty</span>
        <h1 class="display-5 fw-bold text-dark">{{PRODUCT_TITLE}}</h1>
        <p class="lead text-secondary mt-3">{{PRODUCT_SHORT_TAGLINE}}</p>
        <div class="product-description my-4">
          {{PRODUCT_FULL_DESCRIPTION_FROM_REF}}
        </div>
        <div class="d-flex align-items-center gap-3 mt-4">
          <a href="#order" class="btn btn-primary btn-lg px-4 shadow-sm">Order Now</a>
          <a href="index.html#product-list" class="btn btn-outline-secondary btn-lg px-4">Back to Menu</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Flavor & Key Features Section ("Taste Skill" & "Awesome Design") -->
  <div class="row g-4 my-5">
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm p-3 text-center">
        <div class="card-body">
          <i class="bi bi-fire display-6 text-danger mb-3"></i>
          <h3 class="h5 card-title">Authentic Herbs & Spices</h3>
          <p class="card-text text-muted">Stuffed with Balamban’s native lemongrass and secret aromatic herb blend.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm p-3 text-center">
        <div class="card-body">
          <i class="bi bi-award display-6 text-warning mb-3"></i>
          <h3 class="h5 card-title">Crispy & Juicy</h3>
          <p class="card-text text-muted">Slow-roasted to golden perfection with signature crackling skin and succulent meat.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 border-0 shadow-sm p-3 text-center">
        <div class="card-body">
          <i class="bi bi-heart-fill display-6 text-danger mb-3"></i>
          <h3 class="h5 card-title">No Sauce Needed</h3>
          <p class="card-text text-muted">Tastes best on its own—flavorful down to the bone ("Tops in Taste!").</p>
        </div>
      </div>
    </div>
  </div>
</main>