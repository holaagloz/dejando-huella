import { Directive, inject, input } from '@angular/core';

import { Analitica, EventoAnalitica } from './analitica';

/**
 * Registra un evento de analítica al hacer clic en el elemento.
 * Uso: `<a href="tel:…" appRegistrarEvento="clic_telefono" ubicacion="visitanos">`.
 */
@Directive({
  selector: '[appRegistrarEvento]',
  host: { '(click)': 'registrar()' },
})
export class RegistrarEvento {
  private readonly analitica = inject(Analitica);

  readonly appRegistrarEvento = input.required<EventoAnalitica>();
  readonly ubicacion = input.required<string>();

  protected registrar(): void {
    this.analitica.registrar(this.appRegistrarEvento(), this.ubicacion());
  }
}
