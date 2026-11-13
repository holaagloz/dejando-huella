// Importa el material original del cliente a media/ (se ejecuta a mano, solo cuando llega material nuevo).
//
// - Fotos: aplica la rotación EXIF, reduce a 2400 px por el lado largo, borra TODOS los metadatos
//   (incluido el GPS de los celulares) y les da un nombre descriptivo (sirve para SEO y para editar).
// - Videos: recorta un tramo sin texto incrustado, sin audio, H.264 con faststart, y saca su póster.
//
// Los originales (63 MB) no se versionan: viven en ../materiales/cliente/media-original/.
// Uso: node scripts/importar-media.mjs
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, '..', 'materiales', 'cliente');
const originales = join(origen, 'media-original');
const destinoFotos = join(raiz, 'media', 'fotos');
const destinoVideos = join(raiz, 'media', 'videos');
const LADO_MAXIMO = 2400;

// Prefijo del archivo original → nombre descriptivo. Las fotos sin uso se dejan fuera a propósito.
const FOTOS = {
  '02a28f33': 'nina-juego-patio',
  '0fb8e92e': 'pintura-caballetes',
  '11f15921': 'nina-mural-logo',
  '14462d60': 'manualidad-personas-que-amo',
  '24527f22': 'agricultura-sembrando',
  '28ca24b0': 'nino-rana-cesped',
  '2a16e739': 'bebe-con-maestra',
  '2abd4011': 'dibujo-arbol-familia',
  '39baa585': 'nina-estimulacion-sensorial',
  '4278ed6d': 'lectoescritura-trazos',
  '49cce255': 'patio-domo-mural',
  '5ba10676': 'agricultura-regando',
  '6abfc386': 'steam-microscopio',
  '6e719816': 'steam-tubo-ensayo',
  '74ed9d02': 'manualidad-clima',
  '83a8ddfc': 'steam-pipeta',
  '87b8f744': 'dibujo-al-aire-libre',
  '98f96d45': 'navidad',
  '9e1944bb': 'agricultura-amigas',
  a96b1309: 'musica-ukelele',
  c6404faa: 'pintura-paleta',
  c88b9dda: 'musica-xilofono',
  c8cbca81: 'musica-teclado',
  ca948f5a: 'traje-tipico',
  cf64632e: 'nina-sonriente-salon',
  e723a233: 'nino-sonriente',
  eebd5f42: 'pintura-cesped',
  f0f3b4c8: 'juego-vasos',
  f2e9f88c: 'maestra-abrazo',
  f3ab50bf: 'sensorial-neon',
  f5dfe1f4: 'nino-sonriente-mesa',
  // Llegó con el feedback v1: la foto que el centro eligió para Semillitas.
  'feedback-v1-semillitas': 'semillitas-pintando',
};
// Captura de pantalla con franjas negras: se recortan.
const RECORTAR_BORDES = new Set(['f2e9f88c']);

// Fotos que se publican recortadas: el original completo no sale del disco.
// Pasitos: el centro pidió mostrar solo los pies de la niña (feedback v1).
const RECORTES = {
  '4e753b90': { nombre: 'pasitos-pies', zona: { left: 0, top: 848, width: 1086, height: 600 } },
};

// Fotos de instalaciones y logo, que ya estaban en el sitio actual.
const SUELTAS = {
  'aula_espacio.jpeg': 'aula-cohete',
  'comedor.jpeg': 'comedor-mural',
  'entrada.jpeg': 'pasillo-jirafa',
};

// Tramos sin el texto que el video trae incrustado; `poster` = segundo del tramo usado como portada.
// Los `feedback-v1-*` llegaron con el feedback del 13-11-2026: más resolución que los primeros envíos.
const VIDEOS = [
  { archivo: 'feedback-v1-cocina.mov', nombre: 'cocina', desde: 15, duracion: 9, poster: 3 },
  {
    archivo: 'feedback-v1-clase-cientifica.mov',
    nombre: 'clase-cientifica',
    desde: 6,
    duracion: 9,
    poster: 4,
  },
  {
    archivo: 'feedback-v1-estimulacion-sensorial.mov',
    nombre: 'estimulacion-sensorial',
    desde: 7.5,
    duracion: 9,
    poster: 4,
  },
  {
    archivo: 'feedback-v1-estimulacion-temprana.mp4',
    nombre: 'estimulacion-temprana',
    desde: 0,
    duracion: 7.5,
    poster: 1,
  },
];
// Lado largo máximo del video: basta para el retazo más grande en una pantalla 2x.
const LADO_MAXIMO_VIDEO = 1280;

mkdirSync(destinoFotos, { recursive: true });
mkdirSync(destinoVideos, { recursive: true });

const archivos = readdirSync(originales);
const buscar = (prefijo, ext) => {
  const f = archivos.find(
    (a) => a.startsWith(prefijo) && a.toLowerCase().endsWith(ext) && !a.includes('(1)'),
  );
  if (!f) throw new Error(`No se encontró el original ${prefijo}*${ext}`);
  return join(originales, f);
};

async function importarFoto(ruta, nombre, { recortar = false, zona } = {}) {
  let img = sharp(ruta).rotate(); // aplica la orientación EXIF; la salida no lleva metadatos
  if (recortar) img = sharp(await img.toBuffer()).trim({ background: '#000000', threshold: 24 });
  if (zona) img = sharp(await img.toBuffer()).extract(zona);
  await img
    .resize({ width: LADO_MAXIMO, height: LADO_MAXIMO, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(destinoFotos, `${nombre}.jpg`));
  console.log('foto ', nombre);
}

for (const [prefijo, nombre] of Object.entries(FOTOS)) {
  await importarFoto(buscar(prefijo, '.jpg'), nombre, { recortar: RECORTAR_BORDES.has(prefijo) });
}
for (const [prefijo, { nombre, zona }] of Object.entries(RECORTES)) {
  await importarFoto(buscar(prefijo, '.jpg'), nombre, { zona });
}
for (const [archivo, nombre] of Object.entries(SUELTAS)) {
  await importarFoto(join(origen, archivo), nombre);
}
// El logo.png del cliente tiene fondo blanco; se usa la versión recortada con transparencia de la propuesta.
await sharp(join(raiz, '..', 'propuesta', 'img', 'logo-dejando-huella.png'))
  .png({ compressionLevel: 9 })
  .toFile(join(destinoFotos, 'logo-dejando-huella.png'));
console.log('foto  logo-dejando-huella');

for (const v of VIDEOS) {
  const entrada = join(originales, v.archivo);
  if (!existsSync(entrada)) throw new Error(`No se encontró el video original ${v.archivo}`);
  const salida = join(destinoVideos, `${v.nombre}.mp4`);
  const poster = join(destinoFotos, `video-${v.nombre}.jpg`);
  execFileSync(ffmpeg, [
    '-loglevel',
    'error',
    '-y',
    '-ss',
    String(v.desde),
    '-t',
    String(v.duracion),
    '-i',
    entrada,
    '-an',
    '-vf',
    `scale=w='min(iw,${LADO_MAXIMO_VIDEO})':h='min(ih,${LADO_MAXIMO_VIDEO})':force_original_aspect_ratio=decrease:force_divisible_by=2`,
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '29',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-map_metadata',
    '-1',
    salida,
  ]);
  execFileSync(ffmpeg, [
    '-loglevel',
    'error',
    '-y',
    '-ss',
    String(v.poster),
    '-i',
    salida,
    '-frames:v',
    '1',
    '-q:v',
    '3',
    poster,
  ]);
  console.log('video', v.nombre, existsSync(salida) ? 'ok' : 'FALLÓ');
}
