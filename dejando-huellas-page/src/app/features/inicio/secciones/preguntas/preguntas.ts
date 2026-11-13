import { Component, inject } from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import { BotonWhatsapp } from '../../../../shared/ui/boton-whatsapp/boton-whatsapp';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';

/** Preguntas frecuentes con `<details>` nativo: funciona sin JS y con teclado. También van al JSON-LD. */
@Component({
  selector: 'app-preguntas',
  imports: [BotonWhatsapp, Icono, Retazo],
  template: `
    <section class="colcha-seccion" id="preguntas" aria-labelledby="t-preguntas">
      <div class="r-cabeza tela t-lavanda" appRetazo>
        <h2 class="titular" id="t-preguntas">{{ p.titulo }}</h2>
        <p class="bajada">{{ p.bajada }}</p>
        <app-boton-whatsapp
          variante="manta-chico"
          ubicacion="preguntas"
          texto="Hacer una pregunta"
          mensaje="Hola, tengo una duda sobre el Centro Infantil Dejando Huella."
        />
      </div>
      <div class="preguntas tela t-manta" appRetazo>
        @for (item of p.preguntas; track item.pregunta) {
          <details class="pregunta">
            <summary>
              <h3>{{ item.pregunta }}</h3>
              <span class="mas" aria-hidden="true"><svg appIcono="mas"></svg></span>
            </summary>
            <p class="respuesta">{{ item.respuesta }}</p>
          </details>
        }
      </div>
    </section>
  `,
  styles: `
    .preguntas {
      padding: 12px 18px 14px;
    }
    .pregunta {
      border-bottom: 2px dashed rgb(201 111 98 / 55%);
    }
    .pregunta:last-child {
      border-bottom: 0;
    }
    summary {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 64px;
      padding: 14px 4px;
      cursor: pointer;
    }
    summary::-webkit-details-marker {
      display: none;
    }
    summary h3 {
      font: 700 1.125rem/1.25 var(--font-mano);
      font-variation-settings: 'INFM' 70;
    }
    .mas {
      flex: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--coral-soft);
      transition:
        transform var(--t-hover) var(--ease),
        background-color var(--t-hover);
    }
    .mas .icono {
      width: 18px;
      height: 18px;
    }
    .pregunta[open] .mas {
      transform: rotate(45deg);
      background: var(--coral);
    }
    summary:hover .mas {
      background: var(--coral);
    }
    .respuesta {
      padding: 0 4px 18px;
      max-width: 62ch;
      color: var(--ink-soft);
    }
    @media (min-width: 1024px) {
      .r-cabeza {
        grid-column: 1 / 5;
        position: sticky;
        top: 100px;
        align-self: start;
      }
      .preguntas {
        grid-column: 5 / 13;
        padding: 16px 28px 18px;
      }
    }
  `,
})
export class Preguntas {
  protected readonly p = inject(Contenido).preguntas;
}
