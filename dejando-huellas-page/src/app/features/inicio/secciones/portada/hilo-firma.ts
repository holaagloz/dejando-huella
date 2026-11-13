/** Rectángulo mínimo (compatible con DOMRect) para que el trazado se pueda probar sin DOM. */
export interface Caja {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

const PASO = 26;
const AMPLITUD = 5;

/** Puntada que entra y sale de la costura entre `desde` y `hasta`, sobre la línea `fijo`. */
function onda(desde: number, hasta: number, fijo: number, horizontal: boolean): string {
  const dir = hasta > desde ? 1 : -1;
  const n = Math.max(1, Math.round(Math.abs(hasta - desde) / PASO));
  const largo = (hasta - desde) / n;
  let d = '';
  for (let i = 0; i < n; i++) {
    const medio = (desde + largo * (i + 0.5)).toFixed(1);
    const fin = (desde + largo * (i + 1)).toFixed(1);
    const o = (i % 2 ? AMPLITUD : -AMPLITUD) * dir;
    d += horizontal
      ? ` Q${medio},${fijo + o} ${fin},${fijo}`
      : ` Q${fijo + o},${medio} ${fijo},${fin}`;
  }
  return d;
}

/**
 * El hilo firma de la portada: entra y sale de la costura que separa la foto de los datos, sube por
 * la costura de la huella y termina en el botón de WhatsApp. Coordenadas relativas a la portada.
 * Devuelve `null` si no hay datos visibles para seguir.
 */
export function trazarHiloFirma(
  portada: Caja,
  huella: Caja,
  boton: Caja,
  datos: readonly Caja[],
): string | null {
  if (!datos.length) return null;
  const X = (v: number) => +(v - portada.left).toFixed(1);
  const Y = (v: number) => +(v - portada.top).toFixed(1);
  const costuraY = Y(Math.min(...datos.map((c) => c.top)));
  const x2 = X(boton.left + boton.width) + 2;
  const y2 = Y(boton.top + boton.height / 2);
  const conector = (px: number, py: number) =>
    ` C${px},${(py - (py - y2) * 0.5).toFixed(1)} ${x2 + 60},${y2 + 30} ${x2},${y2}`;

  if (Y(huella.top) >= costuraY - 2) {
    // Escritorio: la huella está en la fila de datos. Desde el borde derecho, por la costura, hasta la huella.
    const inicio = X(portada.left + portada.width) - 16;
    const hx = X(huella.left + huella.width / 2);
    return `M${inicio},${costuraY}` + onda(inicio, hx, costuraY, true) + conector(hx, costuraY);
  }
  // Celular: la huella está junto a la foto. Costura horizontal desde la izquierda y sube por la costura foto-huella.
  const inicio = X(portada.left) + 16;
  const vx = X(huella.left);
  return (
    `M${inicio},${costuraY}` +
    onda(inicio, vx, costuraY, true) +
    onda(costuraY, Y(huella.top), vx, false) +
    conector(vx, Y(huella.top))
  );
}
