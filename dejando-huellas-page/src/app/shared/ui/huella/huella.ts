import { Component, booleanAttribute, input } from '@angular/core';

/**
 * La huella del logo (con o sin corazón) en cualquier color de la paleta:
 * `<svg appHuella color="#C96F62"></svg>`. Decorativa.
 */
@Component({
  selector: 'svg[appHuella]',
  host: { viewBox: '0 0 100 104', 'aria-hidden': 'true', focusable: 'false' },
  template: `
    <svg:use href="#huella" [attr.fill]="color()" />
    @if (corazon()) {
      <svg:use href="#corazon" [attr.stroke]="colorCorazon()" />
    }
  `,
})
export class Huella {
  readonly color = input('#0D1A3C');
  readonly corazon = input(false, { transform: booleanAttribute });
  readonly colorCorazon = input('#FBF7EF');
}
