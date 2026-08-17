# E-Commerce Website Specification — Markdown (for Vibe coding tool)

> Purpose: A single-file Markdown spec that a code generator (Vibe) can use to create a React e-commerce website (no backend) for a homemade chocolate business.
> Key constraints: frontend-only React site, blog stored in JSON, cart in `localStorage`, orders emailed via `mailto:` and sent to WhatsApp via `https://wa.me/` link, deploy to Vercel, SEO friendly.

---

# Project Overview

**Name:** Chocolates By PS (example)
**Stack required:** React.js (create-react-app / Vite), Tailwind CSS optional (recommended), React Router, localStorage for cart, no backend.
**Deploy target:** Vercel

---

# Pages & Routes

* `/` — Homepage
* `/category/:slug` — Category page (list of products)
* `/product/:slug` — Product detail page
* `/cart` — Cart page
* `/checkout` — Checkout page (collects buyer info and provides mailto/WhatsApp order send)
* `/blog` — Blog category / list page
* `/blog/:slug` — Blog post page
* `/about` — About us
* `/contact` — Contact page
* `/*` — 404 Not Found

---

# Homepage (requirements)

Elements (order & behavior):

1. **Hero / Banner image**

   * Full width, responsive, `alt` text, lazy loaded.
   * CTA button: `Shop Now` → `/category/chocolates` (or configurable).

2. **Short Introduction**

   * 1–3 short lines about the brand (editable from content JSON).

3. **Featured products**

   * Show 4–8 product cards (image, price, title, quick add to cart).
   * “View all” → `/category/all` or dedicated collection.

4. **Event Highlights**

   * Horizontal card list with date, short text, optional image. Click → event details modal or blog post.

5. **Blog section**

   * Show latest three blog posts (title, date, excerpt, thumbnail).
   * “View More” button → `/blog` (full list).

6. **Testimonials**

   * Horizontal carousel with up to 3 visible elements at most (must support swipe/keyboard).
   * Each: photo (optional), quote, name, location.

7. **Location**

   * Small block with address and Google Maps link.

8. **Social media links**

   * Icons linked to external social pages (open in new tab).

---

# Category Page

* Header: Category title & description.
* Filters: price range, sort (popularity, price asc/desc), tags (e.g., vegan, sugar-free).
* Product grid: image, title, price, quick view button.
* Pagination or infinite scroll.

---

# Product Page (detailed)

Required elements:

* **Photos**

  * One large main image + thumbnails (min 3 images).
  * Thumbnails clickable to change main image (zoom on click or hover).
  * Option to add more images (the UI should allow showing N images from product JSON).
  * Lightbox / modal ± zoom for the main image.

* **Title**

  * Product title (SEO friendly, H1).

* **Price**

  * Display price; support sale price and original (crossed out) price.

* **Variations**

  * Dropdowns or swatches (size, flavor, weight). Variations affect price optionally.
  * Variation selection required before Add to Cart if variation exists.

* **Quantity selector**

  * Numeric stepper (min 1).

* **Add to Cart**

  * Button: adds product with chosen variation + quantity to `localStorage` cart.

* **Product description & images**

  * Tabs or sections: Description, Ingredients, Nutrition, Reviews (if any).

* **SEO**

  * Meta title and description (use product fields).

---

# Cart Page

* List of cart items (image, title, variation, unit price, quantity, line total).
* Option to update quantity or remove item.
* Cart subtotal, shipping estimate (configurable), discount code field (front-end only).
* Checkout button → `/checkout`.

**Cart storage:** use `localStorage` key `chocolates_by_ps_cart` (JSON).

---

# Checkout Page

* Collect buyer information:

  * Name (required), email (required), phone (required), shipping address (line1, line2, city, state, country), notes (optional).

* Show order summary & total.

* Two order-send options:

  1. **Email (mailto)** — open user's email client with prefilled subject + body containing order details.
  2. **WhatsApp** — open `https://wa.me/<phone>?text=<encoded_message>` with order details encoded for WhatsApp.

* **Payment note:** since no backend, show instructions for payment (e.g., bank transfer, COD) or integrate third-party client-side payment if user later configures.

* After clicking send, optionally clear cart and show a success toast (but do not auto-send emails without user action — the mailto opens user's mail client).

---

# Blog Pages

**Blog JSON** (see Technical section) will store posts.

* `/blog` (Blog category/list)

  * Show posts paginated or infinite scroll.
  * Filter by tag.
  * Search box.

* `/blog/:slug` (Post)

  * Banner image, date, author, full content (HTML or markdown parsed client-side), images section.
  * Related posts section (3 posts).
  * Social share buttons.
  * Comments: Not provided (no backend). Optionally link to external comments (Disqus) or hide.

---

# About & Contact

* **About**: banner, mission, team cards, story timeline, sustainability practices.
* **Contact**: contact form (client-side only — since no backend, the form uses `mailto:` or opens mail client), business email, phone, address, map, social links.

---

# Technical Requirements & Implementation Details

## 1. Frontend

* Implement as React application (Vite recommended for speed).
* Use React Router for routing.
* Use functional components and hooks (e.g., `useState`, `useEffect`, `useContext`).
* State:

  * Use a Cart Context (React Context) that reads/writes `localStorage` key `chocolates_by_ps_cart`.
  * Blog & products read from local JSON files (import or fetch from `/public/data/`).

## 2. SEO Friendly

* Use `react-helmet` (or `@builder.io/partytown`/`vite-plugin-ssr` if SSR considered) to set meta tags.
* Provide server-side rendering? Not required by spec; Vercel can host a statically generated site. But for best SEO:

  * Pre-render static pages for products & blog using SSG (vite + static export or Next.js). If generator must be React only, advise using Next.js for better SEO. If strictly React SPA, include meta tags and an XML sitemap generated at build time.
* Include Open Graph meta tags, Twitter card meta tags, and structured data (JSON-LD) for products and organization.
* Add `robots.txt` and `sitemap.xml` at `/public`.

Example JSON-LD (product):

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Hazelnut Truffle Box",
  "image": ["https://example.com/images/p1-1.jpg"],
  "description": "Handmade hazelnut truffles",
  "sku": "HB-001",
  "offers": {
    "@type": "Offer",
    "url": "https://yourdomain.com/product/hazelnut-truffle-box",
    "priceCurrency": "USD",
    "price": "12.99",
    "availability": "https://schema.org/InStock"
  }
}
```

## 3. Deploy to Vercel

* Add `vercel.json` with build commands.
* Use `npm run build` (Vite or CRA build) and set project root to repo root.
* Ensure `/public` static assets are included.
* Environment variables not required (no backend). For any external client keys (e.g., analytics), add to Vercel env.

## 4. Blog contents maintained in JSON

* Place blog JSON in `/public/data/blog.json` or `/src/data/blog.json`. Example structure below.

## 5. Cart in browser localStorage

* Use key `chocolates_by_ps_cart`. Structure example below. Cart updated on add/remove/change quantity. Persist across sessions.

## 6. Order details sent via Email and WhatsApp

* **Email (mailto)**: format subject and body using `encodeURIComponent`.

  * Example mailto:

    ```
    mailto:owner@example.com?subject=New%20order%20from%20{NAME}&body={BODY}
    ```
  * Body should include buyer details + line items + totals.

* **WhatsApp**: use encoded message:

  ```
  https://wa.me/<COUNTRY_PHONE>?text={ENCODED_ORDER_TEXT}
  ```

  * If the business WhatsApp number is `+9779810000000`, use `https://wa.me/9779810000000?text=...` (Nepal country code 977 example).

* **Note**: These open external apps/clients and require user action to confirm send.

## 7. No backend

* All logic runs in browser. Sensitive operations (payments, order storage) are not implemented. The site is informational + order initiation via client apps.

---

# File & Component Structure (recommended)

```
/public
  /images
  /data
    products.json
    blog.json
    testimonials.json
/src
  /components
    Header.jsx
    Footer.jsx
    ProductCard.jsx
    ProductGrid.jsx
    Hero.jsx
    FeaturedProducts.jsx
    TestimonialsCarousel.jsx
    BlogPreview.jsx
    CartDrawer.jsx
    QuantityStepper.jsx
    ImageGallery.jsx
  /pages
    Home.jsx
    Category.jsx
    Product.jsx
    Cart.jsx
    Checkout.jsx
    BlogList.jsx
    BlogPost.jsx
    About.jsx
    Contact.jsx
  /context
    CartContext.jsx
  /utils
    storage.js
    format.js
    seo.js
  /styles
    tailwind.css
  main.jsx
  App.jsx
  routes.jsx
package.json
vercel.json
README.md
```

---

# Data Schemas (examples)

## Product JSON (`/public/data/products.json`)

```json
[
  {
    "id": "p001",
    "slug": "hazelnut-truffle-box",
    "title": "Hazelnut Truffle Box",
    "description": "Handmade hazelnut truffles with dark chocolate coating.",
    "images": [
      "/images/p001-1.jpg",
      "/images/p001-2.jpg",
      "/images/p001-3.jpg"
    ],
    "price": 12.99,
    "compareAtPrice": 15.99,
    "currency": "USD",
    "sku": "HB001",
    "category": "truffles",
    "tags": ["hazelnut","handmade"],
    "variations": [
      {
        "name": "Size",
        "options": [
          {"label": "6 pcs", "priceModifier": 0, "sku": "HB001-6"},
          {"label": "12 pcs", "priceModifier": 8.0, "sku": "HB001-12"}
        ]
      }
    ],
    "seo": {
      "title": "Hazelnut Truffle Box - Chocolates By PS",
      "description": "Buy hazelnut truffles..."
    },
    "inStock": true
  }
]
```

## Blog JSON (`/public/data/blog.json`)

```json
[
  {
    "id": "b001",
    "slug": "how-to-store-chocolates",
    "title": "How to Store Handcrafted Chocolates",
    "author": "Pramit Shrestha",
    "date": "2025-10-01",
    "excerpt": "Tips to keep your chocolates fresh...",
    "banner": "/images/blog-store-hero.jpg",
    "content": "<p>Full HTML or markdown content here...</p>",
    "tags": ["storage","tips"],
    "related": ["b002", "b003"]
  }
]
```

## Testimonials (`/public/data/testimonials.json`)

```json
[
  {
    "id": "t1",
    "quote": "Best chocolate I've had in Kathmandu!",
    "name": "Sita Rai",
    "location": "Kathmandu, Nepal",
    "photo": "/images/testimonial-1.jpg"
  }
]
```

## Cart localStorage structure

Key: `chocolates_by_ps_cart`
Value (JSON):

```json
{
  "items": [
    {
      "productId": "p001",
      "slug": "hazelnut-truffle-box",
      "title": "Hazelnut Truffle Box",
      "image": "/images/p001-1.jpg",
      "price": 12.99,
      "quantity": 2,
      "variation": {"name":"Size","option":"12 pcs","sku":"HB001-12"}
    }
  ],
  "currency": "USD",
  "updatedAt": "2025-11-30T08:00:00+05:45"
}
```

---

# UI / Accessibility / Performance Notes

* Use semantic HTML (`<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`).
* Images must include `alt` text; use `loading="lazy"` for non-critical images.
* Keyboard focus for carousel and modal; ARIA attributes where applicable.
* Minimize JavaScript where possible; code-split product pages and blog pages for performance.
* Lighthouse targets: Performance >= 80, Accessibility >= 90, Best Practices >= 90, SEO >= 90.

---

# SEO Metadata & Sitemap

* Each page should set:

  * `<title>` (unique)
  * `<meta name="description">`
  * Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
  * Twitter card: `twitter:card`, `twitter:site`
* Generate `sitemap.xml` at build time using product/blog JSON.
* `robots.txt`:

  ```
  User-agent: *
  Allow: /
  Sitemap: https://yourdomain.com/sitemap.xml
  ```

---

# Vercel & Build Config

`package.json` scripts (example):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

`vercel.json` (example):

```json
{
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build", "config": { "distDir": "dist" } }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/" }
  ]
}
```

If using Next.js, set default Next build configuration.

---

# Order Email & WhatsApp Message Templates

**Email body (plain text example) — use `encodeURIComponent`:**

```
New order from {name}

Contact:
Name: {name}
Email: {email}
Phone: {phone}
Address: {address}

Order items:
- {qty} x {productTitle} (Variation: {variation}) - {unitPrice} each - line total {lineTotal}
...

Subtotal: {subtotal}
Shipping: {shipping}
Total: {total}

Notes: {notes}
```

**WhatsApp message:** same content but URL-encoded into `https://wa.me/<phone>?text={encoded}`

**Important**: Show the content in a review screen so the user can edit contact details before sending.

---

# Sample Implementation Snippets

### CartContext (pseudo)

```jsx
// CartContext.jsx (concept)
const CartContext = createContext();
function CartProvider({children}) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('chocolates_by_ps_cart');
    return saved ? JSON.parse(saved) : {items: [], currency:'USD'};
  });
  useEffect(() => {
    localStorage.setItem('chocolates_by_ps_cart', JSON.stringify(cart));
  }, [cart]);
  const addToCart = (item) => { /* merge & setCart */ };
  const updateQty = (id, qty) => { /* update & setCart */ };
  return <CartContext.Provider value={{cart, addToCart, updateQty}}>{children}</CartContext.Provider>;
}
```

### Generate `mailto` and `wa.me` links (concept)

```js
function buildOrderText(order, customer) {
  // build plain text including each line item
  return encodeURIComponent(text);
}
const mailto = `mailto:owner@example.com?subject=${encodeURIComponent('New order from ' + customer.name)}&body=${buildOrderText(order, customer)}`;
const waLink = `https://wa.me/9779810000000?text=${buildOrderText(order, customer)}`;
```

---

# Testing Checklist

* [ ] Site renders on desktop and mobile (responsive).
* [ ] Product page image gallery works (thumbnails → main image → lightbox).
* [ ] Add to cart & quantity updates persist in `localStorage`.
* [ ] Cart page shows accurate totals and updates.
* [ ] Checkout builds the mailto and wa.me links correctly and data is encoded.
* [ ] Blog list shows latest 3 posts on homepage and "View More" links work.
* [ ] Testimonials carousel shows up to 3 elements and respects accessibility (keyboard).
* [ ] SEO meta tags present for product/blog pages; `sitemap.xml` generated.
* [ ] Vercel build passes.

---

# Example Content (short, for generator)

**Homepage short intro**

> "Chocolates By PS — handcrafted premium chocolates made in Nepal using local ingredients. Perfect for gifting, events, and daily delight."

**Business contact**

* Email: [owner@example.com](mailto:owner@example.com)
* WhatsApp: +9779810000000
* Address: Kupondole, Lalitpur, Nepal

---

# Assets & Image Guidelines

* Provide product images at multiple sizes: large (1600×1200), medium (800×600), thumb (400×300).
* Use WebP if possible; fallback to JPEG.
* All images should be placed in `/public/images/` and referenced in product and blog JSON.

---

# Prompt for Vibe coding tool (copy/paste for generator)

> **Start here — Vibe prompt**
> Build a single-page React e-commerce website (or static React site built with Vite) for a homemade chocolate store. Use the file & component structure and data schemas provided. The app must:
>
> * Implement pages and routes listed in the spec.
> * Use React Router, React Context for cart state stored in `localStorage` under key `chocolates_by_ps_cart`.
> * Read products and blog posts from JSON files in `/public/data/`.
> * Product page: main image + min 3 thumbnails, variations, price, add-to-cart & quantity selector, zoom/lightbox on main image.
> * Homepage shows hero, featured products, event highlights, latest 3 blog posts, testimonials carousel (max 3 shown), location and social links.
> * Cart page allows quantity update & removal, shows subtotal; Checkout builds `mailto:` and WhatsApp `wa.me` links with order summary.
> * Include SEO meta handling (react-helmet or equivalent) and generate `sitemap.xml` at build time.
> * Ensure accessibility (semantic HTML, keyboard nav) and lazy-load images.
> * Provide `package.json`, `vercel.json`, build scripts and README with Vercel deploy instructions.
> * Include sample `products.json`, `blog.json`, and `testimonials.json` with at least 2 products and 3 blog posts.
> * Style with Tailwind CSS (or plain CSS if Tailwind not available) and ensure responsive layout.
> * Do not implement any backend. All external interactions must open user apps (mailto/WhatsApp) for order sending.
>
> Output deliverables:
>
> 1. Complete project tree with files.
> 2. `src` code for components/pages, `public/data/*.json` sample data.
> 3. `README.md` with deploy, run, and content editing instructions.
>
> Use the spec in this Markdown to implement features and sample data.

---

# README (short version to include in project root)

```
# Chocolates By PS — Frontend-only E-commerce

## Run locally
1. npm install
2. npm run dev
3. Open http://localhost:5173

## Build
npm run build
npm run preview

## Deploy
- Connect repo to Vercel and use `npm run build`.
- Ensure `/public` is included.

## Edit content
- Products: /public/data/products.json
- Blog posts: /public/data/blog.json
- Testimonials: /public/data/testimonials.json

## Notes
- Cart stored in localStorage key: `chocolates_by_ps_cart`.
- Order sending: uses `mailto:` and WhatsApp `https://wa.me/` links — user must confirm sending.
```

---

# Final notes & assumptions (do not ask unless changes required)

* I assumed you are happy with a static frontend app (Vite or CRA). If you need server-side rendering for SEO, use Next.js — I can adapt the spec.
* Default currency and phone are placeholders; replace with real business info.
* Payment collection is outside scope (no backend). If you want client-side payment (Stripe Checkout), you'll need a backend or use hosted checkout links.

---

use the Template from WIX: https://www.wix.com/website-template/view/html/1800?originUrl=https%3A%2F%2Fwww.wix.com%2Fwebsite%2Ftemplates%3Fcriteria%3Dchocolate&tpClick=view_button&esi=7becc44b-428a-4d57-bac0-dbbd035f5a53
