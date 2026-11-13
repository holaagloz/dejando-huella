import { IMAGE_CONFIG, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { Provider } from '@angular/core';

import manifiesto from './manifiesto-media.json';

/** Medidas de una foto procesada por `scripts/procesar-media.mjs`. */
export interface MedidasFoto {
  readonly ancho: number;
  readonly alto: number;
  /** Anchos disponibles como `media/<nombre>-<ancho>.webp`, de menor a mayor. */
  readonly anchos: readonly number[];
}

const fotos: Readonly<Record<string, MedidasFoto>> = manifiesto;

/** Mismos anchos que genera el script: NgOptimizedImage arma el `srcset` con ellos. */
export const ANCHOS_IMAGEN = [480, 800, 1200, 1600];

export function medidasFoto(nombre: string): MedidasFoto {
  const medidas = fotos[nombre];
  if (!medidas) throw new Error(`La foto «${nombre}» no existe en media/fotos/.`);
  return medidas;
}

export function existeFoto(nombre: string): boolean {
  return nombre in fotos;
}

/** El ancho disponible más chico que cubre el pedido; si ninguno alcanza, el más grande. */
export function anchoDisponible(medidas: MedidasFoto, pedido: number): number {
  return medidas.anchos.find((a) => a >= pedido) ?? medidas.anchos[medidas.anchos.length - 1];
}

/** Ruta pública de una variante WebP. Sin barra inicial para respetar el `<base href>`. */
export function rutaFoto(nombre: string, ancho: number): string {
  return `media/${nombre}-${anchoDisponible(medidasFoto(nombre), ancho)}.webp`;
}

export function cargadorMedia(config: ImageLoaderConfig): string {
  return rutaFoto(config.src, config.width ?? ANCHOS_IMAGEN[ANCHOS_IMAGEN.length - 1]);
}

export function provideMedia(): Provider[] {
  return [
    { provide: IMAGE_LOADER, useValue: cargadorMedia },
    { provide: IMAGE_CONFIG, useValue: { breakpoints: ANCHOS_IMAGEN } },
  ];
}
