import { access, copyFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectRoot, 'dist', 'client');
const routes = ['aviso-legal', 'privacidad'];

await access(path.join(outputDir, 'index.html'));

for (const route of routes) {
  const source = path.join(outputDir, `${route}.html`);
  const destinationDir = path.join(outputDir, route);
  await access(source);
  await mkdir(destinationDir, { recursive: true });
  await copyFile(source, path.join(destinationDir, 'index.html'));
}

await writeFile(
  path.join(outputDir, 'robots.txt'),
  'User-agent: *\nDisallow: /oficio-logico/\n',
  'utf8',
);
