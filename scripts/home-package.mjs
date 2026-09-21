import assert from 'node:assert/strict';

export function checkHomePackage(files) {
  for (const file of files) {
    assert.ok(!/^(?:assets|rendimiento|gesticert-avisos)(?:\/|$)/.test(file), `Ruta reservada: ${file}`);
    assert.ok(!/^(?:contacto|config|mail-config)\.php$|^(?:aviso-legal|privacidad|cookies)\.html$/.test(file), `Archivo reservado: ${file}`);
    assert.ok(!/(?:^|\/)(?:config\.php|mail-config\.php|\.env[^/]*|\.git)(?:\/|$)/.test(file), `Archivo privado: ${file}`);
    if (file.startsWith('automatizacion/')) assert.ok(['automatizacion/.htaccess', 'automatizacion/contacto.php'].includes(file), `Archivo antiguo ajeno al paquete: ${file}`);
    if (file.endsWith('.php')) assert.equal(file, 'automatizacion/contacto.php');
  }
  for (const file of ['index.html', '.htaccess', '404.html', 'aviso-legal/index.html', 'privacidad/index.html', 'automatizacion/contacto.php', 'automatizacion/.htaccess']) assert.ok(files.includes(file), `Falta ${file}`);
}
