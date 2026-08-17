import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const BASE_URL = 'https://chocolatesbyps.com'; // Replace with actual domain

const generateSitemap = () => {
    try {
        // Read data
        const products = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'products.json'), 'utf-8'));
        const blogPosts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'blog.json'), 'utf-8'));

        // Static routes
        const routes = [
            '/',
            '/category/all',
            '/blog',
            '/about',
            '/contact',
            '/cart',
            '/checkout'
        ];

        // Dynamic routes
        products.forEach(p => routes.push(`/product/${p.slug}`));
        blogPosts.forEach(p => routes.push(`/blog/${p.slug}`));

        // Unique categories
        const categories = [...new Set(products.map(p => p.category))];
        categories.forEach(c => routes.push(`/category/${c}`));

        // Generate XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

        // Write file
        fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
        console.log('sitemap.xml generated successfully!');

    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
};

generateSitemap();
