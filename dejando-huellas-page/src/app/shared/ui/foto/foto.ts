import { Component, booleanAttribute, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import type { Foto as DatosFoto } from '../../../core/contenido/modelo';

/**
 * Foto que llena su retazo (`object-fit: cover`). NgOptimizedImage arma el `srcset` con las
 * variantes WebP de `media/` y carga diferida, salvo la foto principal de la portada (`prioridad`).
 * Va dentro de un contenedor posicionado (`.foto`).
 */
@Component({
  selector: 'app-foto',
  imports: [NgOptimizedImage],
  host: { style: 'display:contents' },
  template: `<img
    [ngSrc]="foto().nombre"
    [alt]="foto().alt"
    fill
    [sizes]="sizes()"
    [priority]="prioridad()"
  />`,
})
export class Foto {
  readonly foto = input.required<DatosFoto>();
  /** Ancho que ocupa en pantalla, para que el navegador elija la variante justa. */
  readonly sizes = input('100vw');
  readonly prioridad = input(false, { transform: booleanAttribute });
}
