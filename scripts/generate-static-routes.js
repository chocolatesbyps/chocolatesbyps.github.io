import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, '..');
const distDirectory = path.join(projectDirectory, 'dist');
const blogDataPath = path.join(projectDirectory, 'public', 'data', 'blog.json');
const appShellPath = path.join(distDirectory, 'index.html');

const posts = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
const appShell = fs.readFileSync(appShellPath, 'utf8');
const postSlugs = posts.map(({ slug }) => slug);

for (const slug of postSlugs) {
    if (!/^[a-z0-9-]+$/.test(slug)) {
        throw new Error(`Invalid blog slug: ${slug}`);
    }
}

for (const route of ['blog', ...postSlugs.map((slug) => `blog/${slug}`)]) {
    const outputPath = path.join(distDirectory, route, 'index.html');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, appShell);
}
