import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkHomePackage } from './home-package.mjs';
import { resolveMeasurementConfiguration } from './measurement-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = process.env.INNURE_TARGET || 'automation';
if (!['home', 'automation'].includes(target)) throw new Error('Destino de publicación no válido.');
const home = target === 'home';
const measurement = resolveMeasurementConfiguration({
  target,
  environment: process.env.INNURE_MEASUREMENT_ENV,
  conversionDestination: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION,
});
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
  NEXT_PUBLIC_GOOGLE_ADS_CONVERSION: measurement.conversionDestination,
  NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN: home && measurement.enabled ? 'ea1ad38be76f430f82c06a72158f29d8' : '',
  NEXT_PUBLIC_MEASUREMENT_VERSION: createHash('sha256').update(await readFile(path.join(root,'public/lead-measurement.js'))).digest('hex').slice(0,12),
};
const build = spawn('npm', ['run', 'build:pages'], { cwd: root, env, stdio:'inherit' });
const code = await new Promise((resolve,reject) => { build.on('error',reject); build.on('close',resolve); });
if (code !== 0) throw new Error('La compilación no terminó correctamente.');
const output = path.join(root, 'dist/client');
const receiverDir = home ? path.join(output, 'automatizacion') : output;
await mkdir(receiverDir, { recursive: true });
await copyFile(path.join(root,'server/contacto.php'),path.join(receiverDir,'contacto.php'));
await copyFile(path.join(root,'server/automatizacion.htaccess'),path.join(receiverDir,'.htaccess'));
if (home) {
  await copyFile(path.join(root,'server/home.htaccess'),path.join(output,'.htaccess'));
  // El exportador duplica estas rutas en archivos planos. La web antigua
  // conserva sus avisos .html; la portada solo publica las rutas de directorio.
  for (const file of ['aviso-legal.html', 'privacidad.html']) await rm(path.join(output, file));
}
const publicFiles = await readdir(path.join(root, 'dist/client'), { recursive: true });
const generatedHidden = new Set(['.htaccess', '.nojekyll', '.assetsignore', '.vite', path.join('.vite', 'manifest.json'), path.join('automatizacion', '.htaccess')]);
const unexpectedHidden = publicFiles.filter((file) => file.split(path.sep).some((part) => part.startsWith('.')) && !generatedHidden.has(file));
if (unexpectedHidden.length) throw new Error('El paquete incluye archivos ocultos no autorizados.');
const html = await readFile(path.join(root,'dist/client/index.html'),'utf8');
if (!html.includes(baseUrl.replace(/\/$/, '')) || !html.includes('index, follow')) throw new Error('No se ha generado la página comercial con su URL definitiva.');
if (home) {
  checkHomePackage(publicFiles);
}
for (const file of publicFiles.filter((file) => file.endsWith('.html'))) {
  const page = file === 'index.html' ? html : await readFile(path.join(output, file), 'utf8');
  const destinations = [...page.matchAll(/\bdata-conversion="([^"]*)"/g)].map((match) => match[1]);
  if (!measurement.enabled && destinations.length) {
    throw new Error(`El paquete sin medición incluye una conversión en ${file}.`);
  }
  if (measurement.enabled && (destinations.length !== 1 || destinations[0] !== measurement.conversionDestination)) {
    throw new Error(`La configuración de medición de ${file} no es la autorizada.`);
  }
  const cloudflareBeacons = [...page.matchAll(/<script\b[^>]*src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js"/g)];
  if (cloudflareBeacons.length !== (home && measurement.enabled ? 1 : 0)) {
    throw new Error(`El número de beacons de Cloudflare no es válido en ${file}.`);
  }
  if (home && measurement.enabled && !page.includes('ea1ad38be76f430f82c06a72158f29d8')) {
    throw new Error(`El token público de Cloudflare no es el esperado en ${file}.`);
  }
}
await writeFile(path.join(root,'dist/client/release.json'),JSON.stringify({
  service:home ? 'innure' : 'automatizacion-ia', commit:process.env.INNURE_SOURCE_SHA || null,
  form:'/automatizacion/contacto.php', advertising: measurement.enabled,
  conversionDestination: measurement.conversionDestination || null,
  builtAt:new Date().toISOString(),
})+'\n');
console.log(`Paquete de ${basePath || '/'} listo. No incluye configuración privada ni archivos de rendimiento.`);
