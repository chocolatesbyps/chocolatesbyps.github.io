# Chocolates By PS - E-commerce Website

A frontend-only React e-commerce website for a homemade chocolate business.

## Features

*   **Product Catalog**: Browse chocolates by category, filter by price, and sort.
*   **Product Details**: View product images, select variations (size/weight), and manage quantity.
*   **Cart System**: Add items to cart, update quantities, and remove items (persisted in `localStorage`).
*   **Checkout**: Simple checkout form that generates a pre-filled order message for Email or WhatsApp.
*   **Blog**: Read stories and tips about chocolate.
*   **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop.
*   **SEO Friendly**: Meta tags, sitemap, and JSON-LD structured data.

## Tech Stack

*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS v4
*   **Routing**: React Router v7
*   **Icons**: Lucide React
*   **SEO**: React Helmet Async

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

Build the application for production:

```bash
npm run build
```

The output will be in the `dist` directory.

### Sitemap Generation

To generate the `sitemap.xml` based on the current JSON data:

```bash
node scripts/generate-sitemap.js
```

## Content Management

The content is managed via JSON files in `public/data/`:

*   `products.json`: Product details, prices, variations, and images.
*   `blog.json`: Blog posts.
*   `testimonials.json`: Customer testimonials.

To add or update content, simply edit these JSON files. Images should be placed in `public/images/`.

## Deployment

This project is ready for deployment on Vercel. A `vercel.json` file is included to handle client-side routing.

1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Deploy.

## License

[MIT](LICENSE)
