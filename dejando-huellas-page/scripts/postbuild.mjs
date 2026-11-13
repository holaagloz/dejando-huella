// Prepara la carpeta del build para GitHub Pages (corre después de `ng build`).
//
// - 404.html: GitHub Pages lo sirve para cualquier ruta inexistente (sale de la ruta prerenderizada /404).
// - sitemap.xml: las páginas indexables, con la fecha del build.
// - .nojekyll: evita que GitHub Pages ignore archivos o carpetas que empiezan con «_».
import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const salida = join(raiz, 'dist', 'dejando-huellas-page', 'browser');
const sitio = JSON.parse(readFileSync(join(raiz, 'contenido', 'sitio.json'), 'utf8'));

/** Páginas indexables (la 404 no va). Mantener en sincronía con app.routes.server.ts. */
const PAGINAS = [
  { ruta: '/', prioridad: '1.0' },
  { ruta: '/privacidad/', prioridad: '0.3' },
];

if (!existsSync(join(salida, 'index.html'))) {
  throw new Error(`No hay build en ${salida}. Corre primero «ng build».`);
}

const pagina404 = join(salida, '404', 'index.html');
if (!existsSync(pagina404)) throw new Error('Falta la ruta prerenderizada /404.');
copyFileSync(pagina404, join(salida, '404.html'));
rmSync(join(salida, '404'), { recursive: true }); // que /404/ no exista como página propia

const hoy = new Date().toISOString().slice(0, 10);
const urls = PAGINAS.map(
  (p) =>
    `  <url>\n    <loc>${sitio.url}${p.ruta}</loc>\n    <lastmod>${hoy}</lastmod>\n    <priority>${p.prioridad}</priority>\n  </url>`,
).join('\n');
writeFileSync(
  join(salida, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(join(salida, '.nojekyll'), '');
// Solo sirve con un servidor que reescribe rutas; en GitHub Pages lo reemplaza 404.html.
rmSync(join(salida, 'index.csr.html'), { force: true });
console.log('postbuild: 404.html, sitemap.xml y .nojekyll listos en', salida);
