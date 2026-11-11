// Genera un solo archivo HTML autocontenido para enviar la propuesta (WhatsApp, correo, USB).
// Mete dentro las fuentes, las imágenes, el CSS y el JS. No necesita instalar nada.
// Uso (desde la carpeta propuesta):  node construir-archivo-unico.mjs
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = dirname(fileURLToPath(import.meta.url));
const salidaDir = join(raiz, 'dist');
const salida = join(salidaDir, 'Dejando-Huella-Propuesta-Gloz.html');

const tipos = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const dataUri = (ruta) => {
  const tipo = tipos[extname(ruta).toLowerCase()];
  if (!tipo) throw new Error(`Tipo no soportado: ${ruta}`);
  return `data:${tipo};base64,${readFileSync(ruta).toString('base64')}`;
};
const sinVersion = (s) => s.replace(/\?v=[^"')]+/, '');

let html = readFileSync(join(raiz, 'index.html'), 'utf8');

// 1. CSS en línea, con las fuentes dentro
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/, (_, href) => {
  const cssPath = join(raiz, sinVersion(href));
  const css = readFileSync(cssPath, 'utf8').replace(/url\((\.\.\/fonts\/[^)]+)\)/g, (_m, f) => `url(${dataUri(join(dirname(cssPath), f))})`);
  return `<style>\n${css}\n</style>`;
});
// Las precargas de fuentes ya no hacen falta
html = html.replace(/<link rel="preload"[^>]*>\n?/g, '');

// 2. Imágenes (src y el visor de fotos)
html = html.replace(/(src|data-ampliar)="(img\/[^"]+)"/g, (_, attr, ruta) => `${attr}="${dataUri(join(raiz, ruta))}"`);

// 3. Scripts en línea, en el mismo orden (al final del body el DOM ya está listo)
html = html.replace(/<script src="([^"]+)" defer><\/script>/g, (_, src) => {
  const js = readFileSync(join(raiz, sinVersion(src)), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script>\n${js}\n</script>`;
});

mkdirSync(salidaDir, { recursive: true });
writeFileSync(salida, html);
const mb = (statSync(salida).size / 1024 / 1024).toFixed(2);
const pendientes = (html.match(/(src|href)="(img|css|js|vendor|fonts)\//g) || []).length;
console.log(`Listo: ${salida} (${mb} MB). Rutas locales sin incrustar: ${pendientes}`);
