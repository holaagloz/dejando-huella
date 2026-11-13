import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Contenido } from '../../core/contenido/contenido';
import { Seo } from '../../core/seo/seo';
import { Retazo } from '../../shared/ui/retazo/retazo';

/** Aviso de privacidad en lenguaje simple: qué se mide y qué no se guarda. */
@Component({
  selector: 'app-privacidad',
  imports: [RouterLink, Retazo],
  template: `
    <article class="colcha-seccion" aria-labelledby="t-privacidad">
      <div class="r-cabeza tela t-manta" appRetazo>
        <h1 class="titular" id="t-privacidad">Privacidad</h1>
        <p class="bajada">
          Cómo tratamos la información de quienes visitan la página de {{ c.sitio.nombre }}.
        </p>
      </div>
      <div class="r-texto tela t-manta" appRetazo>
        <h2 class="titular-chico">El formulario no guarda tus datos</h2>
        <p>
          El formulario «Agenda tu visita» solo arma un mensaje y abre WhatsApp en tu teléfono o
          computadora. Nada se envía ni se guarda en esta página: tú decides si mandas el mensaje, y
          desde ese momento la conversación es entre tú y el centro por WhatsApp.
        </p>
        <h2 class="titular-chico">Medimos visitas sin cookies</h2>
        <p>
          Usamos una herramienta de estadísticas que no usa cookies ni identifica a las personas.
          Cuenta, de forma anónima y agregada, cuántas visitas recibe la página y cuántas veces se
          tocan los botones de contacto (WhatsApp, teléfono, correo, Instagram y mapa), para saber
          qué partes de la página son útiles.
        </p>
        <h2 class="titular-chico">El mapa de Google se carga solo si lo pides</h2>
        <p>
          El mapa dibujado no se conecta con nadie. El mapa interactivo de Google Maps se carga
          únicamente si tocas «Ver mapa interactivo»; desde ese momento aplica la política de
          privacidad de Google.
        </p>
        <h2 class="titular-chico">Contacto</h2>
        <p>
          Si tienes preguntas sobre esta información, escríbenos a
          <a [href]="'mailto:' + c.sitio.contacto.correo">{{ c.sitio.contacto.correo }}</a>.
        </p>
        <p><a class="enlace-mano" routerLink="/">Volver al inicio</a></p>
      </div>
    </article>
  `,
  styles: `
    .r-texto {
      padding: 26px 22px 32px;
      display: grid;
      gap: 14px;
      max-width: 100%;
    }
    .r-texto p {
      max-width: 68ch;
    }
    .r-texto h2 {
      margin-top: 10px;
    }
    @media (min-width: 1024px) {
      .r-texto {
        padding: 44px clamp(28px, 6vw, 96px) 52px;
      }
    }
  `,
})
export class Privacidad {
  protected readonly c = inject(Contenido);

  constructor() {
    inject(Seo).aplicar({
      titulo: `Privacidad · ${this.c.sitio.nombre}`,
      descripcion: `Cómo trata la información de sus visitantes la página de ${this.c.sitio.nombre}: sin cookies y sin guardar datos del formulario.`,
      ruta: '/privacidad/',
      urlBase: this.c.sitio.url,
      imagen: this.c.sitio.seo.imagen,
      nombreSitio: this.c.sitio.nombre,
    });
  }
}
