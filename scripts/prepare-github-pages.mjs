import { access, copyFile, mkdir, readFile, rename, rmdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { sitemapUrls, indexableRoutes } from '../app/indexable-routes.mjs';
import { checkStaticPublication } from './publication-checks.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectRoot, 'dist', 'client');
const routes = ['aviso-legal', 'privacidad', ...indexableRoutes.filter(Boolean).map(route => route.replace(/\/$/, ''))];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

await access(path.join(outputDir, 'index.html'));

if (basePath) {
  if (!/^\/[a-zA-Z0-9._-]+$/.test(basePath)) {
    throw new Error(`NEXT_PUBLIC_BASE_PATH no es una ruta de proyecto válida: ${basePath}`);
  }

  const nestedProjectDir = path.join(outputDir, basePath.slice(1));
  const nestedNextDir = path.join(nestedProjectDir, '_next');
  const publishedNextDir = path.join(outputDir, '_next');

  await access(nestedNextDir);
  await rename(nestedNextDir, publishedNextDir);
  await rmdir(nestedProjectDir);
}

for (const route of routes) {
  const source = path.join(outputDir, `${route}.html`);
  const destinationDir = path.join(outputDir, route);
  await access(source);
  await mkdir(destinationDir, { recursive: true });
  await copyFile(source, path.join(destinationDir, 'index.html'));
}

await writeFile(
  path.join(outputDir, 'robots.txt'),
  `User-agent: *\nAllow: ${basePath}/\n` + (process.env.NEXT_PUBLIC_PUBLISH === 'true' ? `Sitemap: ${new URL('sitemap.xml', process.env.NEXT_PUBLIC_SITE_URL).href}\n` : ''),
  'utf8',
);

// Metadata routes are not emitted by the current static exporter.
// Only production gets indexable URLs; previews keep their existing noindex.
if (process.env.NEXT_PUBLIC_PUBLISH === 'true') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!baseUrl) throw new Error('Falta la URL pública para generar el sitemap.');
  const escapeXml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
  const urls = sitemapUrls(baseUrl).map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n');
  await writeFile(path.join(outputDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}

const pagesToCheck = ['index.html', '404.html', ...routes.map((route) => `${route}.html`)];

for (const page of pagesToCheck) {
  const html = await readFile(path.join(outputDir, page), 'utf8');
  const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  const nextAssets = references.filter((reference) => reference.includes('/_next/'));

  if (nextAssets.length === 0) {
    throw new Error(`${page} no contiene referencias a los recursos de la aplicación.`);
  }

  for (const reference of nextAssets) {
    const pathname = new URL(reference, 'https://example.invalid').pathname;
    const outputPathname = basePath && pathname.startsWith(`${basePath}/`)
      ? pathname.slice(basePath.length)
      : pathname;
    const assetPath = path.resolve(outputDir, outputPathname.slice(1));

    if (!assetPath.startsWith(`${outputDir}${path.sep}`)) {
      throw new Error(`La referencia ${reference} sale del directorio publicado.`);
    }

    await access(assetPath);
  }
}

await checkStaticPublication(outputDir, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000', process.env.NEXT_PUBLIC_PUBLISH === 'true');
