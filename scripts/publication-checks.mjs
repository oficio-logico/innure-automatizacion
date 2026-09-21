import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { sitemapUrls, indexableRoutes } from '../app/indexable-routes.mjs';
import { projectRegistry } from '../app/project-registry.mjs';

export const publicRoutes = [...indexableRoutes, 'aviso-legal/', 'privacidad/'];
const productionBase = process.env.NEXT_PUBLIC_COMMERCIAL_URL || 'https://www.innure.es/automatizacion/';
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const meta = (html, name) => [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => tag).find((tag) => attribute(tag, 'property') === name || attribute(tag, 'name') === name);
const value = (html, name) => attribute(meta(html, name) || '', 'content');

export function checkPage(html, route, baseUrl, published) {
  const legal = route === 'aviso-legal/' || route === 'privacidad/';
  const canonical = new URL(route, (legal && !published ? productionBase : baseUrl).replace(/\/$/, '') + '/').toString();
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).find((tag) => attribute(tag, 'rel') === 'canonical');
  assert.equal(new URL(attribute(canonicalTag || '', 'href')).href, canonical, `${route}: canonical`);
  assert.equal(new URL(value(html, 'og:url')).href, canonical, `${route}: og:url`);
  assert.equal(value(html, 'og:type'), 'website');
  assert.ok(value(html, 'og:title'));
  assert.ok(value(html, 'og:description'));
  const image = value(html, 'og:image');
  assert.ok(image && /^https?:\/\//.test(image));
  assert.equal(new URL(image).origin, new URL(baseUrl).origin);
  assert.equal(value(html, 'robots'), published && !legal ? 'index, follow' : legal ? 'noindex, follow' : 'noindex, nofollow');
  const project = projectRegistry.find(item => route === `proyectos/${item.slug}/`);
  if (project) assert.ok(value(html, 'og:title')?.includes(project.name), `${route}: título propio`);
  if (!route) {
    assert.match(html, /<form\b[^>]*method="post"/);
    assert.match(html, /<fieldset\b[^>]*disabled=""/);
    assert.match(html, /<noscript>/);
    assert.match(html, /<button\b[^>]*type="submit"[^>]*disabled=""/);
  }
}

export function checkNotFound(html) {
  assert.match(html, /Por aquí no era\./);
  assert.match(html, /Volver a (?:innure|Automatización)/);
  assert.match(value(html, 'robots') || '', /noindex/);
  assert.doesNotMatch(html, /<link\b[^>]*rel="canonical"/);
}

export function checkSitemap(xml, baseUrl) {
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(urls, sitemapUrls(baseUrl));
}

export async function checkStaticPublication(directory, baseUrl, published) {
  for (const route of publicRoutes) {
    const html = await readFile(path.join(directory, route, 'index.html'), 'utf8');
    checkPage(html, route, baseUrl, published);
  }
  checkNotFound(await readFile(path.join(directory, '404.html'), 'utf8'));
  if (published) checkSitemap(await readFile(path.join(directory, 'sitemap.xml'), 'utf8'), baseUrl);
  console.log('HTML estático comprobado: formulario inerte sin JS, metadatos, canónicas, robots, 404 y sitemap.');
}
