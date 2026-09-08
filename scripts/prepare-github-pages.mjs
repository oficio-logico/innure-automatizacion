import { access, copyFile, mkdir, readFile, rename, rmdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectRoot, 'dist', 'client');
const routes = ['aviso-legal', 'privacidad', 'proyectos/gestor-certificados'];
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
  process.env.NEXT_PUBLIC_PUBLISH === 'true' ? `User-agent: *\nAllow: ${basePath}/\n` : `User-agent: *\nDisallow: ${basePath ? `${basePath}/` : '/'}\n`,
  'utf8',
);

const pagesToCheck = ['index.html', ...routes.map((route) => `${route}.html`)];

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
