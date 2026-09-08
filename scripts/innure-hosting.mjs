import { readFile, access, readdir, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Una sola carpeta de destino. No cambia DNS, raíz, correo ni la web de rendimiento.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2];
if (!['inspect', 'preview', 'publish'].includes(mode)) throw new Error('Uso: node scripts/innure-hosting.mjs inspect|preview|publish');
const credentialsFile = process.env.INNURE_DEPLOY_ENV;
if (!credentialsFile || !path.isAbsolute(credentialsFile)) throw new Error('INNURE_DEPLOY_ENV debe señalar el archivo privado existente mediante ruta absoluta.');
const config = {};
for (const line of (await readFile(credentialsFile, 'utf8')).split(/\r?\n/)) {
  const match = line.match(/^\s*(FTP_HOST|FTP_USER|FTP_PASS|REMOTE_DIR)\s*=\s*(.*?)\s*$/);
  if (!match) continue;
  let value = match[2];
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
  if (/[\r\n\0]/.test(value)) throw new Error('Configuración no válida.');
  config[match[1]] = value;
}
if (!config.FTP_USER || !config.FTP_PASS) throw new Error('Faltan credenciales privadas.');
if (!['ftp.dondominio.com', 'ftp-server-00.dondominio.net', 'hostingsrv131.dondominio.com'].includes(config.FTP_HOST?.replace(/^ftps?:\/\//,''))) {
  throw new Error('El host FTP no coincide con el alojamiento de Innure validado.');
}
// El archivo local antiguo menciona el servidor web. La acción de despliegue
// vigente de innure-web usa el servicio FTP dedicado de este mismo proveedor.
const ftpHost = 'ftp.dondominio.com';
if (config.REMOTE_DIR?.replace(/^\/+|\/+$/g,'') !== 'public') throw new Error('La raíz privada debe ser public.');
const quote = (value) => '"' + value.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\$/g,'\\$').replace(/`/g,'\\`') + '"';
const output = path.join(root, 'dist', 'client');
const target = 'public/automatizacion';
if (mode !== 'inspect') {
  for (const file of ['index.html', 'contacto.php', 'aviso-legal/index.html', 'privacidad/index.html']) await access(path.join(output,file));
  const checkFiles = async (directory) => {
    for (const entry of await readdir(directory, { withFileTypes:true })) {
      if (entry.isSymbolicLink() || /^(?:config\.php|mail-config\.php|\.env.*|\.git|node_modules)$/.test(entry.name)) throw new Error('El paquete contiene un archivo no publicable.');
      const location = path.join(directory,entry.name);
      if (entry.isDirectory()) await checkFiles(location);
      else if (!(await stat(location)).isFile()) throw new Error('Paquete no válido.');
    }
  };
  await checkFiles(output);
  const html = await readFile(path.join(output,'index.html'),'utf8');
  if (!html.includes('https://www.innure.es/automatizacion/') || !html.includes('/automatizacion/_next/')) throw new Error('La compilación no corresponde a la ruta aprobada.');
}
const commands = [
  'set cmd:fail-exit true', 'set ftp:ssl-force true', 'set ftp:ssl-protect-data true',
  'set ssl:verify-certificate true', 'set net:timeout 20', 'set net:max-retries 1',
  `open ${quote(ftpHost)}`, `user ${quote(config.FTP_USER)} ${quote(config.FTP_PASS)}`,
];
if (mode === 'inspect') commands.push('cls -ld public/index.html public/config.php public/mail-config.php');
else {
  // mirror -R no borra archivos: no se usa --delete ni se toca fuera del destino.
  if (mode === 'publish') commands.push(`mkdir -p ${target}`);
  commands.push(`mirror -R --parallel=3 --only-newer ${mode === 'preview' ? '--dry-run ' : ''}${quote(output + '/')} ${quote(target + '/')}`);
}
commands.push('bye');
const child = spawn('lftp', [], { stdio:['pipe','pipe','pipe'] });
let logs = '';
child.stdout.on('data', chunk => { logs += chunk; });
child.stderr.on('data', chunk => { logs += chunk; });
child.stdin.end(commands.join('\n')+'\n');
const code = await new Promise((resolve,reject) => { child.on('error',reject); child.on('close',resolve); });
for (const secret of [config.FTP_USER,config.FTP_PASS]) logs = logs.split(secret).join('[redacted]');
process.stdout.write(logs);
if (code !== 0) throw new Error(`No se completó ${mode}; no se informa de una publicación correcta.`);
console.log(mode === 'publish' ? 'Carga completada. Falta verificar la respuesta pública y la recepción real.' : 'Comprobación completada.');
