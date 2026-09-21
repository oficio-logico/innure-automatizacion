import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = process.env.INNURE_TARGET || 'automation';
if (!['home', 'automation'].includes(target)) throw new Error('Destino de publicación no válido.');
const home = target === 'home';
const basePath = home ? '' : '/automatizacion';
const baseUrl = `https://www.innure.es${basePath}/`;
const env = {
  ...process.env,
  GITHUB_PAGES: 'true',
  NEXT_PUBLIC_BASE_PATH: basePath,
  NEXT_PUBLIC_SITE_URL: baseUrl,
  NEXT_PUBLIC_COMMERCIAL_URL: baseUrl,
  NEXT_PUBLIC_CONTACT_ENDPOINT: '/automatizacion/contacto.php',
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: '0x4AAAAAAD646Hdkx1pPBB7A',
  NEXT_PUBLIC_PUBLISH: 'true',
  // La portada general no hereda la conversión específica de automatización.
  NEXT_PUBLIC_GOOGLE_ADS_CONVERSION: home ? '' : (process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION || ''),
  NEXT_PUBLIC_MEASUREMENT_VERSION: createHash('sha256').update(await readFile(path.join(root,'public/lead-measurement.js'))).digest('hex').slice(0,12),
};
if (env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION && !/^AW-\d+\/[A-Za-z0-9_-]+$/.test(env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION)) throw new Error('Conversión de Ads no válida.');
const build = spawn('npm', ['run', 'build:pages'], { cwd: root, env, stdio:'inherit' });
const code = await new Promise((resolve,reject) => { build.on('error',reject); build.on('close',resolve); });
if (code !== 0) throw new Error('La compilación no terminó correctamente.');
const output = path.join(root, 'dist/client');
const receiverDir = home ? path.join(output, 'automatizacion') : output;
await mkdir(receiverDir, { recursive: true });
await copyFile(path.join(root,'server/contacto.php'),path.join(receiverDir,'contacto.php'));
await copyFile(path.join(root,'server/automatizacion.htaccess'),path.join(receiverDir,'.htaccess'));
if (home) await copyFile(path.join(root,'server/home.htaccess'),path.join(output,'.htaccess'));
const publicFiles = await readdir(path.join(root, 'dist/client'), { recursive: true });
const generatedHidden = new Set(['.htaccess', '.nojekyll', '.assetsignore', '.vite', path.join('.vite', 'manifest.json'), path.join('automatizacion', '.htaccess')]);
const unexpectedHidden = publicFiles.filter((file) => file.split(path.sep).some((part) => part.startsWith('.')) && !generatedHidden.has(file));
if (unexpectedHidden.length) throw new Error('El paquete incluye archivos ocultos no autorizados.');
const html = await readFile(path.join(root,'dist/client/index.html'),'utf8');
if (!html.includes(baseUrl.replace(/\/$/, '')) || !html.includes('index, follow')) throw new Error('No se ha generado la página comercial con su URL definitiva.');
if (home) {
  if (publicFiles.some(file => /^(?:assets|rendimiento|gesticert-avisos)(?:\/|$)/.test(file) || /^(?:contacto|config|mail-config)\.php$/.test(file))) throw new Error('El paquete invade archivos de otra publicación.');
  if (html.includes('data-conversion=')) throw new Error('La portada no debe activar una conversión publicitaria.');
}
await writeFile(path.join(root,'dist/client/release.json'),JSON.stringify({
  service:home ? 'innure' : 'automatizacion-ia', commit:process.env.INNURE_SOURCE_SHA || null,
  form:'/automatizacion/contacto.php', advertising: Boolean(env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION),
  builtAt:new Date().toISOString(),
})+'\n');
console.log(`Paquete de ${basePath || '/'} listo. No incluye configuración privada ni archivos de rendimiento.`);
