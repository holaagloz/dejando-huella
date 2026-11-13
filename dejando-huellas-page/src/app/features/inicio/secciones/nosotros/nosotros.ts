import { Component, inject } from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import type { NombreIcono } from '../../../../core/contenido/modelo';
import { Aparecer } from '../../../../shared/ui/aparecer/aparecer';
import { Foto } from '../../../../shared/ui/foto/foto';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';
import { TitularAnimado } from '../../../../shared/ui/titular-animado/titular-animado';

const ICONOS_PARRAFOS: readonly NombreIcono[] = ['brote', 'corazon', 'sol'];

/** Quiénes somos: la frase del mural como cita grande y la filosofía del centro. */
@Component({
  selector: 'app-nosotros',
  imports: [Aparecer, Foto, Icono, Retazo, TitularAnimado],
  template: `
    <section class="colcha-seccion" id="nosotros" aria-labelledby="t-nosotros">
      <div class="r-cita tela t-lavanda" appRetazo>
        <h2 class="sello" id="t-nosotros">Nosotros · {{ c.sitio.nombreCorto }}</h2>
        <blockquote>
          <p class="cita" appTitularAnimado>«{{ c.sitio.frase }}»</p>
        </blockquote>
        <ul class="principios">
          @for (parrafo of n.parrafos; track $index) {
            <li appAparecer [orden]="$index">
              <svg [appIcono]="iconos[$index % iconos.length]"></svg>
              <span>{{ parrafo }}</span>
            </li>
          }
        </ul>
        <ul class="valores">
          @for (v of n.valores; track v) {
            <li class="etiqueta">{{ v }}</li>
          }
        </ul>
      </div>
      <div class="r-foto-sola tela t-manta" appRetazo appAparecer>
        <figure class="foto">
          <app-foto [foto]="n.foto" sizes="(min-width: 1024px) 42vw, 100vw" />
        </figure>
      </div>
    </section>
  `,
  styles: `
    .r-cita {
      padding: 30px 22px 32px;
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .cita {
      font: 800 clamp(1.8rem, 7vw, 3.1rem) / 1.04 var(--font-mano);
      font-variation-settings:
        'INFM' 100,
        'BNCE' 30;
      letter-spacing: -0.015em;
      text-wrap: balance;
    }
    .principios {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 14px;
    }
    .principios li {
      display: grid;
      grid-template-columns: 34px 1fr;
      gap: 12px;
      align-items: start;
      line-height: 1.5;
    }
    .principios .icono {
      width: 30px;
      height: 30px;
      stroke-width: 1.8;
    }
    .valores {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .valores .etiqueta:nth-child(2) {
      rotate: -1.5deg;
    }
    .r-foto-sola {
      min-height: 320px;
    }
    @media (min-width: 1024px) {
      .r-cita {
        grid-column: 1 / 8;
        padding: clamp(40px, 4vw, 64px) clamp(30px, 3.4vw, 52px);
      }
      .r-foto-sola {
        grid-column: 8 / 13;
      }
    }
  `,
})
export class Nosotros {
  protected readonly c = inject(Contenido);
  protected readonly n = this.c.nosotros;
  protected readonly iconos = ICONOS_PARRAFOS;
}
