import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../app/site-content.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const exports = {};
vm.runInNewContext(outputText, { exports, process: { env: {} } });
const { founders, publishing, experience } = exports.siteContent;

test('la franja de experiencia no incluye Agencia Tributaria', async () => {
  const names = experience.groups.flatMap((group) => group.items.map((item) => item.name));
  assert.ok(!names.includes('Agencia Tributaria'));
  await assert.rejects(access(new URL('../public/images/experiencia/agencia-tributaria.webp', import.meta.url)));
});

test('la franja reúne las marcas solicitadas y no muestra las retiradas', async () => {
  const items = experience.groups.flatMap((group) => group.items);
  const names = items.map((item) => item.name);
  for (const name of ['SHARK', 'Bresh', 'La Riviera', 'Oh My Club', 'Reggaeton Beach Festival', 'WAH', 'Copérnico', 'Autocine Madrid']) {
    assert.ok(names.includes(name), `Falta ${name}`);
  }
  assert.ok(!names.includes('elrow'));
  assert.ok(!names.includes('Love the Twenties'));
  assert.equal(new Set(names).size, names.length);
  for (const item of items) {
    if (item.logo) await access(new URL('../public' + item.logo, import.meta.url));
  }
});

test('los dos perfiles del equipo tienen nombre y función configurados', () => {
  assert.equal(founders.filter((founder) => founder.listo).length, 2);
  for (const founder of founders) {
    assert.ok(founder.name.trim().length > 2);
    assert.ok(founder.role.trim().length > 2);
    assert.doesNotMatch(founder.name + founder.role, /PENDING/);
    assert.ok(founder.initials.length > 0);
  }
});

test('los datos opcionales pueden completarse sin publicar marcadores o enlaces rotos', async () => {
  for (const founder of founders) {
    if (founder.biography !== null) {
      assert.ok(founder.biography.trim().length > 0);
      assert.doesNotMatch(founder.biography, /PENDING/);
    }
    if (founder.photo !== null) {
      assert.match(founder.photo, /^\/images\/[A-Za-z0-9/_-]+\.(?:jpg|jpeg|png|webp)$/);
      await access(new URL('../public' + founder.photo, import.meta.url));
      assert.ok(Number.isFinite(founder.photoScale) && founder.photoScale >= 1 && founder.photoScale <= 2);
    }
    if (founder.linkedin !== null) {
      const url = new URL(founder.linkedin);
      assert.equal(url.protocol, 'https:');
      assert.ok(['www.linkedin.com', 'linkedin.com'].includes(url.hostname));
      assert.ok(url.pathname.startsWith('/in/'));
    }
  }
});

test('añadir un perfil mínimo no publica por sí solo la vista de revisión', () => {
  assert.equal(publishing.ready, false);
});

test('ambos aparecen como fundadores con trayectoria resumida y pruebas de su trabajo', async () => {
  for (const founder of founders) {
    assert.match(founder.role, /^Cofundador · /);
    assert.ok(founder.biography.length < 200);
    assert.ok(founder.career.trim().length > founder.biography.length);
    assert.doesNotMatch(founder.career, /PENDING/);
    assert.equal(founder.highlights.length, 4);
    assert.equal(founder.skills.length, 4);
    assert.equal(new Set(founder.skills).size, founder.skills.length);
    for (const skill of founder.skills) assert.ok(skill.length > 3 && skill.length < 40);
    for (const item of founder.highlights) assert.ok(item.titulo && item.texto);
    assert.match(founder.project.href, /^\/proyectos\/[a-z-]+\/$/);
    await access(new URL('../app' + founder.project.href + 'page.tsx', import.meta.url));
  }
});

test('el perfil de Sergio conserva la evidencia técnica y delimita la experiencia de gestión', () => {
  const sergio = founders.find((founder) => founder.name === 'Sergio Herencias Redondo');
  assert.ok(sergio);
  assert.match(sergio.role, /Tecnología y operaciones/i);
  assert.ok(!sergio.skills.includes('Gestión fiscal interna'));
  assert.ok(sergio.skills.includes('Control de gestión'));
  const evidence = sergio.highlights.map((item) => item.texto).join(' ');
  assert.match(evidence, /full stack/);
  assert.match(evidence, /gestión interna de innure/);
  assert.match(evidence, /ISTQB CTFL/);
  assert.equal(sergio.photo, '/images/sergio-herencias-frontal.webp');
  assert.equal(sergio.photoScale, 1);
});
