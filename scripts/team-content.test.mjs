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
const { founders, publishing } = exports.siteContent;

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
