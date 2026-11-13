// Genera lo que el sitio sirve a partir de media/ (corre antes de cada build, test y serve).
//
// - public/media/<nombre>-<ancho>.webp para cada foto, en los anchos de ANCHOS que no superen el original.
// - public/media/<video>.mp4 (copia de media/videos).
// - public/og-dejando-huella.jpg: imagen de 1200×630 para compartir en WhatsApp, Facebook, etc.
// - src/app/core/media/manifiesto-media.json: medidas y anchos de cada foto. Lo usan el loader de
//   NgOptimizedImage y la prueba que valida el contenido (una foto que no existe rompe la prueba).
//
// Es incremental: solo procesa lo que cambió. Las salidas no se versionan.
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, dirname, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

export const ANCHOS = [480, 800, 1200, 1600];
const FOTO_OG = 'nina-mural-logo';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const fotos = join(raiz, 'media', 'fotos');
const videos = join(raiz, 'media', 'videos');
const salida = join(raiz, 'public', 'media');
const manifiestoRuta = join(raiz, 'src', 'app', 'core', 'media', 'manifiesto-media.json');

mkdirSync(salida, { recursive: true });
mkdirSync(dirname(manifiestoRuta), { recursive: true });

const masNuevo = (fuente, destino) =>
  !existsSync(destino) || statSync(fuente).mtimeMs > statSync(destino).mtimeMs;

const manifiesto = {};
const esperadas = new Set();
let generadas = 0;

for (const archivo of readdirSync(fotos).sort()) {
  const { name: nombre, ext } = parse(archivo);
  if (!['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) continue;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(nombre)) {
    throw new Error(
      `Nombre de foto inválido «${archivo}»: usa minúsculas, números y guiones (ej. huerta-sembrando.jpg).`,
    );
  }
  const fuente = join(fotos, archivo);
  const { width, height } = await sharp(fuente).metadata();
  const anchos = ANCHOS.filter((a) => a < width);
  anchos.push(Math.min(width, ANCHOS.at(-1)));
  const unicos = [...new Set(anchos)].sort((a, b) => a - b);

  for (const ancho of unicos) {
    const destino = join(salida, `${nombre}-${ancho}.webp`);
    esperadas.add(destino);
    if (!masNuevo(fuente, destino)) continue;
    await sharp(fuente).resize({ width: ancho }).webp({ quality: 78, effort: 5 }).toFile(destino);
    generadas++;
  }
  manifiesto[nombre] = { ancho: width, alto: height, anchos: unicos };
}

for (const archivo of readdirSync(videos)) {
  const fuente = join(videos, archivo);
  const destino = join(salida, archivo);
  esperadas.add(destino);
  if (masNuevo(fuente, destino)) copyFileSync(fuente, destino);
}

// Borra variantes de fotos que ya no existen o cambiaron de tamaño.
for (const archivo of readdirSync(salida)) {
  if (!esperadas.has(join(salida, archivo))) rmSync(join(salida, archivo));
}

const og = join(raiz, 'public', 'og-dejando-huella.jpg');
const fuenteOg = join(fotos, `${FOTO_OG}.jpg`);
if (masNuevo(fuenteOg, og)) {
  await sharp(fuenteOg)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(og);
}

writeFileSync(manifiestoRuta, JSON.stringify(manifiesto, null, 2) + '\n');
console.log(`media: ${Object.keys(manifiesto).length} fotos, ${generadas} variantes nuevas`);
