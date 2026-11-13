import { Component, computed, input } from '@angular/core';

import type { NombreIcono } from '../../../core/contenido/modelo';

/**
 * Ícono de trazo del sprite: `<svg appIcono="escudo"></svg>`. Va sobre el propio `<svg>` para que
 * los estilos de cada sección lo alcancen. Siempre decorativo: el texto vecino da el significado.
 */
@Component({
  selector: 'svg[appIcono]',
  host: { class: 'icono', 'aria-hidden': 'true', focusable: 'false' },
  template: `<svg:use [attr.href]="href()" />`,
})
export class Icono {
  readonly appIcono = input.required<NombreIcono>();
  protected readonly href = computed(() => `#i-${this.appIcono()}`);
}
