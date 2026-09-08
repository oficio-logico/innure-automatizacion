import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = {
  ...process.env,
  GITHUB_PAGES: 'true',
  NEXT_PUBLIC_BASE_PATH: '/automatizacion',
  NEXT_PUBLIC_SITE_URL: 'https://www.innure.es/automatizacion',
  NEXT_PUBLIC_CONTACT_ENDPOINT: '/automatizacion/contacto.php',
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: '0x4AAAAAAD646Hdkx1pPBB7A',
  NEXT_PUBLIC_PUBLISH: 'true',
  NEXT_PUBLIC_MEASUREMENT_VERSION: createHash('sha256').update(await readFile(path.join(root,'public/lead-measurement.js'))).digest('hex').slice(0,12),
};
if (env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION && !/^AW-\d+\/[A-Za-z0-9_-]+$/.test(env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION)) throw new Error('Conversión de Ads no válida.');
const build = spawn('npm', ['run', 'build:pages'], { cwd: root, env, stdio:'inherit' });
const code = await new Promise((resolve,reject) => { build.on('error',reject); build.on('close',resolve); });
if (code !== 0) throw new Error('La compilación no terminó correctamente.');
await copyFile(path.join(root,'server/contacto.php'),path.join(root,'dist/client/contacto.php'));
const html = await readFile(path.join(root,'dist/client/index.html'),'utf8');
if (!html.includes('https://www.innure.es/automatizacion/') || !html.includes('index, follow')) throw new Error('No se ha generado la página comercial con su URL definitiva.');
await writeFile(path.join(root,'dist/client/release.json'),JSON.stringify({
  service:'automatizacion-ia', commit:process.env.INNURE_SOURCE_SHA || null,
  form:'/automatizacion/contacto.php', advertising: Boolean(env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION),
  builtAt:new Date().toISOString(),
})+'\n');
console.log('Paquete de /automatizacion/ listo. No incluye configuración privada ni archivos de la raíz.');
