import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import sharp from 'sharp';
import { projectRegistry } from '../app/project-registry.mjs';
import { indexableRoutes } from '../app/indexable-routes.mjs';

const source = await readFile(new URL('../app/project-catalog.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
const exports = {};
vm.runInNewContext(outputText, { exports, require: () => ({ projectRegistry }) });
const { projectCatalog } = exports;

test('cada proyecto tiene contenido, ruta estática e inclusión en sitemap', async () => {
  assert.equal(new Set(projectRegistry.map(p => p.slug)).size, projectRegistry.length);
  for (const project of projectCatalog) {
    assert.ok(project.summary && project.problem && project.solution && project.boundary);
    assert.ok(indexableRoutes.includes(`proyectos/${project.slug}/`));
    await access(new URL(`../app/proyectos/${project.slug}/page.tsx`, import.meta.url));
  }
});

test('las capturas existen y declaran sus proporciones reales', async () => {
  for (const project of projectCatalog) {
    if (project.slug !== 'automatizacion-musical') assert.ok(project.images.length);
    for (const image of project.images) {
      const metadata = await sharp(fileURLToPath(new URL('../public' + image.src, import.meta.url))).metadata();
      assert.ok(image.alt && image.caption);
      assert.ok(Math.abs(metadata.width / metadata.height - image.width / image.height) < 0.01, image.src);
    }
  }
});
