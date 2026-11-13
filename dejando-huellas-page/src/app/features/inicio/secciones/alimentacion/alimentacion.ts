import { Component, inject } from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import { Aparecer } from '../../../../shared/ui/aparecer/aparecer';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';
import { TitularAnimado } from '../../../../shared/ui/titular-animado/titular-animado';
import { VideoClip } from '../../../../shared/ui/video-clip/video-clip';

/** Alimentación incluida: los cuatro tiempos, la nutricionista y la cocina. */
@Component({
  selector: 'app-alimentacion',
  imports: [Aparecer, Icono, Retazo, TitularAnimado, VideoClip],
  template: `
    <section class="colcha-seccion" id="alimentacion" aria-labelledby="t-alimentacion">
      <div class="r-cabeza tela t-manta" appRetazo>
        <h2 class="titular" id="t-alimentacion" appTitularAnimado>{{ a.titulo }}</h2>
        <p class="bajada">{{ a.bajada }}</p>
      </div>
      <div class="r-video tela t-manta" appRetazo appAparecer>
        <figure class="foto"><app-video-clip [video]="a.video" /></figure>
      </div>
      <div class="r-tiempos tela t-rayas" appRetazo appAparecer="caer">
        <h3 class="titular-chico">{{ a.tiempos.length }} tiempos de comida</h3>
        <ol class="tiempos">
          @for (t of a.tiempos; track t; let i = $index) {
            <li>
              <span class="tiempos__num" aria-hidden="true">{{ i + 1 }}</span>{{ t }}
            </li>
          }
        </ol>
      </div>
      @for (p of a.puntos; track p.titulo; let i = $index) {
        <div
          class="r-punto tela"
          [class.t-fieltro]="i % 2 === 0"
          [class.t-lavanda]="i % 2 === 1"
          appRetazo
          appAparecer
          [orden]="i"
        >
          <svg [appIcono]="p.icono"></svg>
          <div>
            <h3 class="titular-chico">{{ p.titulo }}</h3>
            <p>{{ p.texto }}</p>
          </div>
        </div>
      }
    </section>
  `,
  styles: `
    .r-video {
      grid-column: span 3;
      padding: var(--costura);
      min-height: 300px;
    }
    .r-tiempos {
      grid-column: span 3;
      padding: 22px 18px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tiempos {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 10px;
    }
    .tiempos li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px 8px 8px;
      background: var(--manta);
      border-radius: 3px;
      box-shadow: 0 1px 0 rgb(13 26 60 / 18%);
      font: 700 1rem/1.15 var(--font-mano);
    }
    .tiempos li:nth-child(odd) {
      rotate: -1deg;
    }
    .tiempos li:nth-child(even) {
      rotate: 0.8deg;
    }
    .tiempos__num {
      flex: none;
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--ink);
      color: var(--manta);
      font: 800 0.95rem/1 var(--font-mano);
    }
    .r-punto {
      padding: 24px 22px 26px;
      display: grid;
      grid-template-columns: 40px 1fr;
      gap: 14px;
      align-items: start;
    }
    .r-punto .icono {
      width: 36px;
      height: 36px;
      stroke-width: 1.7;
    }
    .r-punto p {
      margin-top: 8px;
      max-width: 48ch;
    }
    @media (min-width: 760px) {
      .r-video,
      .r-tiempos,
      .r-punto {
        grid-column: span 6;
      }
    }
    @media (min-width: 1024px) {
      .r-cabeza {
        grid-column: 1 / 6;
        grid-row: 1;
      }
      .r-video {
        grid-column: 6 / 9;
        grid-row: 1;
        min-height: 420px;
      }
      .r-tiempos {
        grid-column: 9 / 13;
        grid-row: 1;
        padding: 30px 28px;
        justify-content: center;
      }
      .r-punto {
        padding: 30px 34px;
      }
    }
  `,
})
export class Alimentacion {
  protected readonly a = inject(Contenido).alimentacion;
}
