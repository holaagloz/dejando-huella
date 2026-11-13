// Sirve el build estático como lo haría GitHub Pages (carpetas con index.html y 404.html).
// Lo usan las pruebas E2E. Uso: node scripts/servir-dist.mjs [puerto]
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(
  fileURLToPath(new URL('../dist/dejando-huellas-page/browser', import.meta.url)),
);
const puerto = Number(process.argv[2] ?? 4300);
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

createServer((req, res) => {
  const ruta = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
  let archivo = normalize(join(raiz, ruta));
  if (!archivo.startsWith(raiz)) return res.writeHead(403).end(); // sin salirse de la carpeta
  if (existsSync(archivo) && statSync(archivo).isDirectory()) {
    if (!ruta.endsWith('/')) return res.writeHead(301, { Location: `${ruta}/` }).end(); // como GitHub Pages
    archivo = join(archivo, 'index.html');
  }
  if (!existsSync(archivo)) {
    res.writeHead(404, { 'Content-Type': TIPOS['.html'] });
    return res.end(readFileSync(join(raiz, '404.html')));
  }
  res.writeHead(200, { 'Content-Type': TIPOS[extname(archivo)] ?? 'application/octet-stream' });
  res.end(readFileSync(archivo));
}).listen(puerto, () => console.log(`Sirviendo ${raiz} en http://localhost:${puerto}`));
