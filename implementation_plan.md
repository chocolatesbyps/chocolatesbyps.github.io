# Step-by-Step Implementation Plan — Chocolates By PS (frontend-only React)

Below is a practical, actionable implementation plan that your Vibe coding tool or developer team can follow. I’ve broken it into clear phases and steps with concrete tasks, commands/files, and acceptance criteria—no timeline estimates included.

---

# Phase 0 — Prep & Repo

1. Create repository and branch structure

   * Create git repo: `chocolates-by-ps`
   * Branches: `main`, `dev`, feature branches like `feature/products-json`, `feature/cart`
2. Create project scaffold

   * Choose starter: **Vite** (React) or **Next.js** (if you later want SSG/SSR).
   * Example init: `npm create vite@latest chocolates-by-ps --template react`
   * Commit initial scaffold.
3. Add tooling & config

   * Install dependencies: `react-router-dom`, `react-helmet-async` (or `next/head`), `tailwindcss` (optional), `classnames`, `@heroicons/react`.
   * Add ESLint / Prettier, Husky (optional).
   * Add `vercel.json` and `.vercelignore` placeholders.
4. Create top-level folders & placeholder files

   * `/public/data` with `products.json`, `blog.json`, `testimonials.json` (sample content).
   * `/public/images/` placeholder images.
   * `README.md` with run & deploy instructions.
5. Acceptance criteria

   * `npm run dev` starts successfully.
   * Repo has `public/data/*.json` and `src` folders committed.

---

# Phase 1 — Data Model & Storage

1. Finalize JSON schemas

   * Create `public/data/products.json`, `blog.json`, `testimonials.json` following spec structures.
2. Implement storage utils

   * `src/utils/storage.js` exposing `getCart()`, `saveCart()`, `clearCart()`.
   * Use localStorage key: `chocolates_by_ps_cart`.
3. Create sample data (2+ products, 3 blog posts, 3 testimonials).
4. Acceptance criteria

   * Importing `products.json` renders valid JSON in console.
   * `getCart()` returns `null` or default object; `saveCart()` persists to localStorage.

---

# Phase 2 — Routing & Page Shells

1. Install and configure React Router.
2. Create page components with basic layout:

   * `src/pages/Home.jsx`
   * `src/pages/Category.jsx`
   * `src/pages/Product.jsx`
   * `src/pages/Cart.jsx`
   * `src/pages/Checkout.jsx`
   * `src/pages/BlogList.jsx`
   * `src/pages/BlogPost.jsx`
   * `src/pages/About.jsx`
   * `src/pages/Contact.jsx`
   * `src/pages/NotFound.jsx`
3. Create global components:

   * `Header.jsx` (logo, nav, cart icon)
   * `Footer.jsx` (social links, address)
   * `SEO.jsx` wrapper for meta tags using `react-helmet-async`
4. Acceptance criteria

   * Navigation links route to correct shells; page shells render placeholder content; SEO component sets `<title>`.

---

# Phase 3 — Cart Context & Core Cart Functionality

1. Implement `CartContext` in `src/context/CartContext.jsx`

   * Methods: `addToCart(item)`, `updateQuantity(itemId, qty)`, `removeFromCart(itemId)`, `clearCart()`.
   * Initialize state from `localStorage` via `storage.js`.
2. Wire `Header` cart icon to open `CartDrawer` or link to `/cart`.
3. Acceptance criteria

   * Adding an item persists to localStorage.
   * Updating quantity modifies storage and UI reflects changes.

---

# Phase 4 — Product Data & Product Page Features

1. Build `ProductCard` and `ProductGrid` components.
2. Implement `Product` page features:

   * Load product using `slug` from `products.json`.
   * Image gallery: main image + thumbnails (min 3).
   * Lightbox/zoom modal for images.
   * Variations UI (dropdown/swatches), price changes when variation selected.
   * Quantity stepper and `Add to Cart` button.
3. Ensure `Add to Cart` sends full item (id, slug, title, image, price, variation, qty) to `CartContext`.
4. Acceptance criteria

   * Product gallery switches main image on thumbnail click.
   * Variation selection required if product has options.
   * Add to cart adds correct item to cart JSON in localStorage.

---

# Phase 5 — Category Page & Search/Filters

1. Implement `Category` page

   * Read `products.json` and filter by `category` or `tag`.
2. Add sorting & filtering:

   * Sort by `price`, `popularity`.
   * Filter by `tags` and price range (client-side).
3. Add pagination or load-more (client-side).
4. Acceptance criteria

   * Filter and sort update displayed products correctly.
   * Category URL (`/category/truffles`) shows relevant items.

---

# Phase 6 — Homepage & Components

1. Implement `Hero` component (banner image with CTA).
2. Implement `FeaturedProducts` component (select 4 products flagged as featured in JSON).
3. Implement `EventHighlights` component (use blog posts or an `events.json` if desired).
4. Implement `BlogPreview` showing latest 3 posts with `View More` button linking to `/blog`.
5. Implement `TestimonialsCarousel`

   * Horizontal, accessible carousel with up to 3 visible items.
   * Keyboard navigation, swipe support for touch.
6. Implement `Location` block (address + Google Maps link).
7. Acceptance criteria

   * Homepage shows hero, intro, featured products, events, blog preview, testimonials (up to 3), social links.

---

# Phase 7 — Cart Page & Checkout Flow (mailto + WhatsApp)

1. Cart page:

   * List items, update qty inline, remove item, show subtotal and currency.
   * Discount code input (front-end stub).
2. Checkout page:

   * Form fields: name, email, phone, shipping address, notes.
   * Preview order summary (editable).
   * Build `mailto:` link and `wa.me` link using `encodeURIComponent()` and order template.
   * `Send via Email` button opens user's default mail client with prefilled body.
   * `Send via WhatsApp` button opens `https://wa.me/<phone>?text=...`.
   * After user clicks send and returns, optionally clear cart if user confirms.
3. Acceptance criteria

   * `mailto:` and `wa.me` links populated with full order info and open respective apps.
   * Cart persists unless user clears it.

---

# Phase 8 — Blog Pages & Content Management

1. Create `BlogList` — reads `blog.json`, shows list, supports tag filters and search.
2. Create `BlogPost` — renders banner, date, author, content (HTML or markdown viewer).

   * If content stored as markdown, use `react-markdown`.
3. On homepage, ensure latest 3 blog posts displayed.
4. Acceptance criteria

   * Blog posts load from JSON and display full content with images.
   * `View More` navigates to blog list.

---

# Phase 9 — SEO, Sitemap, & Performance

1. Add `SEO` component usage across pages to set `title`, `description`, `og:*` tags.
2. Generate `sitemap.xml` at build time:

   * Add small script `scripts/generate-sitemap.js` that reads `products.json` and `blog.json` and writes `/public/sitemap.xml`.
3. Add `robots.txt`.
4. Add JSON-LD structured data for product pages.
5. Optimize images:

   * Use `srcset` / responsive images, WebP preferred.
   * Add `loading="lazy"` to non-critical images.
6. Acceptance criteria

   * Each page has unique `<title>` and `<meta>` description.
   * `sitemap.xml` contains product and blog URLs.

---

# Phase 10 — Accessibility & Testing

1. Accessibility checks

   * Keyboard navigation, ARIA attributes on carousel and modals, color contrast checks.
2. Unit & integration testing (optional)

   * Add tests with React Testing Library for core features: add to cart, cart update, checkout mailto link generation.
3. Manual QA checklist

   * Image gallery behavior; cart updates; mailto/wa links; homepage blog preview; responsiveness.
4. Acceptance criteria

   * Manual QA checklist passes; keyboard navigation works for key UI components.

---

# Phase 11 — Build & Vercel Deployment

1. Add build scripts to `package.json`:

   * `"build": "vite build"`, `"preview": "vite preview"`.
2. Prepare `vercel.json` (as spec earlier).
3. Test production locally: `npm run build` then `npm run preview`.
4. Push repo to Git provider and connect to Vercel:

   * Configure build command and output directory.
   * Add Environment variables if needed (none required by spec).
5. Acceptance criteria

   * Vercel deploy completes successfully and site loads with production assets.

---

# Phase 12 — Documentation & Handoff

1. Finalize `README.md`

   * Run/build/deploy instructions
   * Editing content: where products/blog/testimonials live
   * Cart localStorage key and mailto/wa phone placeholders to update
2. Create a short developer guide:

   * Where to add new product images (naming conventions).
   * How to add blog posts (JSON fields).
   * How to change recipient email/WhatsApp phone number.
3. Acceptance criteria

   * README contains clear steps for non-technical users to update content files.

---

# Phase 13 — Optional Enhancements (post-MVP)

* Switch to Next.js for SSG/SSR for improved SEO (migrate routes).
* Integrate client-side analytics (Google Analytics or Plausible) — add Vercel env keys.
* Add third-party hosted payments (Stripe Checkout links) — note: will require backend for secure keys unless using Stripe hosted links.
* Add localized currency and i18n (Nepali support).
* Add progressive web app (PWA) support for offline caching.

---

# Acceptance Criteria Summary (high-level)

* Functional product pages with image gallery, variations, prices, and add-to-cart.
* Cart persisted in `localStorage` and editable.
* Checkout builds `mailto:` and `wa.me` messages that contain full order details.
* Homepage shows hero, featured products, latest 3 blog posts, testimonials carousel (≤3).
* Blog content driven from `public/data/blog.json`.
* Site builds and deploys to Vercel with sitemap and SEO meta tags.

---

# Deliverables per Phase (what to commit)

* Phase 0: repo scaffold, `public/data` sample files.
* Phase 1: JSON schemas + storage util.
* Phase 2: page shells + routing.
* Phase 3: CartContext + basic cart UI.
* Phase 4–6: product, category, homepage components.
* Phase 7: checkout/mailto/wa feature.
* Phase 8: blog pages.
* Phase 9–11: SEO, sitemap, tests, production build, Vercel config.
* Phase 12: README, developer guide.

---