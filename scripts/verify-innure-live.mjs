import assert from 'node:assert/strict';
import { checkPage, checkNotFound, checkSitemap, publicRoutes } from './publication-checks.mjs';

const base = 'https://www.innure.es/';
async function get(url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(20000) });
  return response;
}
async function checkAsset(url) {
  let response = await get(url,{method:'HEAD'});
  // Algunos recursos de Cloudflare solo se sirven con GET. Un HEAD 404/405
  // no demuestra que fallen en el navegador; comprobar la descarga real.
  if (response.status === 404 || response.status === 405) response = await get(url);
  assert.equal(response.status,200,url);
  assert.doesNotMatch(response.headers.get('content-type') || '',/text\/html/,url);
  await response.arrayBuffer();
}
const version = await get(base+'release.json');
assert.equal(version.status,200);
const release = await version.json();
assert.equal(release.service,'innure');
assert.equal(release.advertising,false);
if (process.env.SOURCE_SHA) assert.equal(release.commit,process.env.SOURCE_SHA);
assert.equal(release.form,'/automatizacion/contacto.php');
const assets = new Set();
for (const route of publicRoutes) {
  const response = await get(base+route);
  assert.equal(response.status,200,route);
  assert.match(response.headers.get('content-type') || '',/text\/html/);
  const html = await response.text();
  checkPage(html, route, base, true);
  assert.match(html,/innure/i);
  if (!route) {
    assert.match(html,/name="robots" content="index, follow"/);
    assert.match(html,/Sergio Herencias Redondo/);
    assert.match(html,/Tecnología, producto y negocio/);
    assert.doesNotMatch(html,/data-conversion=/);
  }
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url = new URL(match[1],base+route);
    if (url.origin === new URL(base).origin && /\.(js|css|png|jpg|webp|woff2|svg)$/.test(url.pathname)) assets.add(url.toString());
  }
}
const sitemap = await get(base+'sitemap.xml');
assert.equal(sitemap.status,200);
checkSitemap(await sitemap.text(),base);
const missing = await get(base+'revision-ruta-inexistente-publicacion/',{redirect:'manual'});
assert.equal(missing.status,404);
checkNotFound(await missing.text());
for (const url of assets) {
  await checkAsset(url);
}
const robots = await get(base+'robots.txt');
assert.equal(robots.status,200);
assert.match(await robots.text(), /Sitemap: https:\/\/www\.innure\.es\/sitemap\.xml/);
for (const route of ['', 'proyectos/', 'privacidad/']) {
  const moved = await get(base+'automatizacion/'+route,{redirect:'manual'});
  assert.equal(moved.status,301);
  assert.equal(new URL(moved.headers.get('location'),base).href,base+route);
}
const performance = await get(base+'rendimiento/');
assert.equal(performance.status,200);
const performanceHtml = await performance.text();
assert.match(performanceHtml, /rel="canonical" href="https:\/\/www\.innure\.es\/rendimiento\/"/);
for (const match of performanceHtml.matchAll(/(?:src|href)="(\/assets\/[^"#]+)"/g)) {
  await checkAsset(new URL(match[1],base));
}
const receiver = new URL(release.form,base);
const method = await get(receiver);
assert.equal(method.status,405);
assert.equal((await method.json()).success,false);
const denied = await get(receiver,{method:'POST',headers:{Origin:'https://example.invalid','Content-Type':'application/x-www-form-urlencoded'},body:'service=automatizacion-ia'});
assert.equal(denied.status,403);
assert.equal((await denied.json()).success,false);
console.log(JSON.stringify({version:release,routes:publicRoutes.length,assets:assets.size,sitemap:true,branded404:true,metadata:true,legacyRedirects:true,performance:true,methodRejected:true,foreignOriginRejected:true,realEmailTest:'not_sent'},null,2));
