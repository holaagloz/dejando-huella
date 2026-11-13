import { Component, inject } from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import { Retazo } from '../../../../shared/ui/retazo/retazo';

/**
 * Testimonios de familias. Solo se muestra con testimonios reales y activados en el contenido:
 * nunca se inventan (ver PRODUCT.md · Evidence on Hand).
 */
@Component({
  selector: 'app-testimonios',
  imports: [Retazo],
  template: `
    @if (t.activo && t.testimonios.length) {
      <section class="colcha-seccion" id="familias" aria-labelledby="t-familias">
        <div class="r-cabeza tela t-manta" appRetazo>
          <h2 class="titular" id="t-familias">{{ t.titulo }}</h2>
        </div>
        @for (testimonio of t.testimonios; track $index; let i = $index) {
          <figure
            class="r-testimonio tela"
            [class.t-lavanda]="i % 2 === 0"
            [class.t-mostaza-suave]="i % 2 === 1"
            appRetazo
          >
            <blockquote>
              <p>«{{ testimonio.texto }}»</p>
            </blockquote>
            <figcaption>{{ testimonio.autor }} · {{ testimonio.detalle }}</figcaption>
          </figure>
        }
      </section>
    }
  `,
  styles: `
    .r-testimonio {
      margin: 0;
      padding: 28px 22px 30px;
      display: grid;
      gap: 14px;
      align-content: start;
    }
    .r-testimonio p {
      font: 600 clamp(1.25rem, 4.4vw, 1.75rem) / 1.25 var(--font-mano);
      font-variation-settings:
        'INFM' 100,
        'BNCE' 40;
      text-wrap: balance;
    }
    .r-testimonio figcaption {
      font-size: 0.9375rem;
    }
    @media (min-width: 760px) {
      .r-testimonio {
        grid-column: span 6;
      }
    }
  `,
})
export class Testimonios {
  protected readonly t = inject(Contenido).testimonios;
}
