// Reduce las fuentes de la propuesta a los caracteres que usa un sitio en español y conserva sus ejes
// variables (peso, INFM y BNCE de Shantell Sans). Se corre una sola vez; el resultado se versiona.
// Uso: node scripts/subset-fuentes.mjs
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, '..', 'propuesta', 'fonts');
const destino = join(raiz, 'public', 'fonts');
mkdirSync(destino, { recursive: true });

const rango = (desde, hasta) =>
  Array.from({ length: hasta - desde + 1 }, (_, i) => String.fromCodePoint(desde + i)).join('');
// ASCII imprimible + Latin-1 (á, é, ñ, ü, ¿, ¡, «, », ·) + puntuación tipográfica + colón (₡).
const TEXTO = rango(0x20, 0x7e) + rango(0xa0, 0xff) + '–—‘’“”…•₡€№™→←';

// Shantell: el diseño usa pesos 500–800. Fijar INFM/BNCE ahorraría más, pero cambiaría el diseño aprobado.
const FUENTES = {
  'shantell-sans-var.woff2': { wght: { min: 500, max: 800 } },
  'nunito-var.woff2': undefined,
  'big-shoulders-display-var.woff2': undefined,
};

for (const [f, variationAxes] of Object.entries(FUENTES)) {
  const entrada = readFileSync(join(origen, f));
  const salida = await subsetFont(entrada, TEXTO, { targetFormat: 'woff2', variationAxes });
  writeFileSync(join(destino, f), salida);
  console.log(
    `${f}: ${(entrada.length / 1024).toFixed(0)} KB → ${(statSync(join(destino, f)).size / 1024).toFixed(0)} KB`,
  );
}
