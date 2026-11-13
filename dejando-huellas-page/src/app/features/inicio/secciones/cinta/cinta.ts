import { Component, inject } from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import { Huella } from '../../../../shared/ui/huella/huella';
import { Retazo } from '../../../../shared/ui/retazo/retazo';

const COLORES = ['#C96F62', '#6C86AF', '#7D8E7D', '#B9862E', '#0D1A3C'];

/** Cinta de experiencias entre bloques. Decorativa (las experiencias tienen su propia sección). */
@Component({
  selector: 'app-cinta',
  imports: [Huella, Retazo],
  template: `
    <div class="cinta tela t-mostaza-suave" appRetazo aria-hidden="true">
      <div class="cinta__pista">
        @for (copia of [0, 1]; track copia) {
          <span class="cinta__tramo">
            @for (e of experiencias; track e.nombre; let i = $index) {
              {{ e.nombre }}
              <svg appHuella [color]="colores[i % colores.length]" class="cinta__huella"></svg>
            }
          </span>
        }
      </div>
    </div>
  `,
  styles: `
    .cinta {
      max-width: var(--maxw);
      margin: 0 auto var(--costura);
      overflow: hidden;
      padding: 14px 0;
    }
    .cinta__pista {
      display: flex;
      width: max-content;
      animation: avanzar 46s linear infinite;
      font: 600 1.0625rem/1 var(--font-mano);
      font-variation-settings:
        'INFM' 100,
        'BNCE' 60;
      white-space: nowrap;
    }
    .cinta__tramo {
      display: inline-flex;
      align-items: center;
      gap: 28px;
      padding-left: 28px;
    }
    .cinta__huella {
      width: 22px;
      height: 22px;
    }
    @keyframes avanzar {
      to {
        transform: translateX(-50%);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .cinta__pista {
        animation: none;
        flex-wrap: wrap;
        width: auto;
      }
      .cinta__tramo {
        flex-wrap: wrap;
        row-gap: 10px;
      }
      .cinta__tramo + .cinta__tramo {
        display: none;
      }
    }
  `,
})
export class Cinta {
  protected readonly experiencias = inject(Contenido).experiencias.experiencias;
  protected readonly colores = COLORES;
}
