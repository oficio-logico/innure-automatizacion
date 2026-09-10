import assert from 'node:assert/strict';
import { checkPage, checkNotFound, checkSitemap } from './publication-checks.mjs';

const base = 'https://www.innure.es/automatizacion/';
async function get(url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(20000) });
  return response;
}
const version = await get(base+'release.json');
assert.equal(version.status,200);
const release = await version.json();
assert.equal(release.service,'automatizacion-ia');
if (process.env.SOURCE_SHA) assert.equal(release.commit,process.env.SOURCE_SHA);
assert.equal(release.form,'/automatizacion/contacto.php');
const assets = new Set();
for (const route of ['', 'aviso-legal/', 'privacidad/', 'proyectos/gestor-certificados/']) {
  const response = await get(base+route);
  assert.equal(response.status,200,route);
  assert.match(response.headers.get('content-type') || '',/text\/html/);
  const html = await response.text();
  checkPage(html, route, base, true);
  assert.match(html,/innure/i);
  if (!route) {
    assert.match(html,/name="robots" content="index, follow"/);
    assert.match(html,/https:\/\/www\.innure\.es\/automatizacion\//);
    assert.match(html,/Sergio Herencias Redondo/);
  }
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url = new URL(match[1],base+route);
    if (url.origin === new URL(base).origin && url.pathname.startsWith('/automatizacion/') && /\.(js|css|png|jpg|webp|woff2|svg)$/.test(url.pathname)) assets.add(url.toString());
  }
}
const sitemap = await get(base+'sitemap.xml');
assert.equal(sitemap.status,200);
checkSitemap(await sitemap.text(),base);
const missing = await get(base+'revision-ruta-inexistente-publicacion/',{redirect:'manual'});
assert.equal(missing.status,404);
checkNotFound(await missing.text());
for (const url of assets) {
  const response = await get(url,{method:'HEAD'});
  assert.equal(response.status,200,url);
  assert.doesNotMatch(response.headers.get('content-type') || '',/text\/html/,url);
}
const method = await get(base+'contacto.php');
assert.equal(method.status,405);
assert.equal((await method.json()).success,false);
const denied = await get(base+'contacto.php',{method:'POST',headers:{Origin:'https://example.invalid','Content-Type':'application/x-www-form-urlencoded'},body:'service=automatizacion-ia'});
assert.equal(denied.status,403);
assert.equal((await denied.json()).success,false);
console.log(JSON.stringify({version:release,routes:4,assets:assets.size,sitemap:true,branded404:true,metadata:true,methodRejected:true,foreignOriginRejected:true,realEmailTest:'pending'},null,2));
