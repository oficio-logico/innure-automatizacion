import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { checkHomePackage } from './home-package.mjs';

const owned = ['index.html', '.htaccess', '404.html', 'aviso-legal/index.html', 'privacidad/index.html', 'automatizacion/contacto.php', 'automatizacion/.htaccess'];
test('el paquete raíz contiene las rutas propias y el receptor en su ubicación existente', () => {
  assert.doesNotThrow(() => checkHomePackage([...owned, '_next/static/main.js', 'images/logo.png', 'automatizacion']));
  assert.throws(() => checkHomePackage(owned.filter(file => file !== 'automatizacion/contacto.php')));
});
test('el paquete raíz rechaza archivos de otras publicaciones y configuración privada', () => {
  for (const file of ['contacto.php', 'rendimiento/index.html', 'assets/logo.png', 'gesticert-avisos/index.html', 'privacidad.html', 'aviso-legal.html', 'config.php', 'automatizacion/mail-config.php', 'images/.env', 'automatizacion/index.html']) assert.throws(() => checkHomePackage([...owned, file]), file);
});
test('la publicación no excluye por nombre el receptor anidado del paquete', () => {
  const workflow = readFileSync(new URL('../.github/workflows/publish-innure.yml', import.meta.url), 'utf8');
  assert.match(workflow, /server-dir: public\//);
  const exclusions = workflow.match(/^\s+exclude:\s*\|\n((?: {12}[^\n]*\n)+)/m)?.[1];
  assert.ok(exclusions, 'No se han encontrado las exclusiones del FTP');
  assert.doesNotMatch(exclusions, /^\s*(?:\*\*\/)?contacto\.php\s*$/m);
  assert.doesNotMatch(exclusions, /^\s*automatizacion\/\*\*\s*$/m);
});
