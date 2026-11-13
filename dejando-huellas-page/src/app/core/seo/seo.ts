import { DOCUMENT, Service, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { serializarJsonLd } from './datos-estructurados';

export interface PaginaSeo {
  readonly titulo: string;
  readonly descripcion: string;
  /** Ruta de la página con barra final (ej. «/» o «/privacidad/»). */
  readonly ruta: string;
  /** URL base del sitio, sin barra final. */
  readonly urlBase: string;
  /** Imagen para compartir, relativa al sitio. */
  readonly imagen: string;
  readonly nombreSitio: string;
  readonly indexar?: boolean;
  readonly datosEstructurados?: unknown;
}

const ID_JSON_LD = 'datos-estructurados';

/**
 * Metadatos de cada página: título, descripción, canonical, Open Graph, Twitter y JSON-LD.
 * Corre durante el prerender, así que todo queda escrito en el HTML que lee Google.
 */
@Service()
export class Seo {
  private readonly titulo = inject(Title);
  private readonly meta = inject(Meta);
  private readonly documento = inject(DOCUMENT);

  aplicar(pagina: PaginaSeo): void {
    const url = `${pagina.urlBase}${pagina.ruta}`;
    const imagen = `${pagina.urlBase}/${pagina.imagen}`;

    this.titulo.setTitle(pagina.titulo);
    const etiquetas: [atributo: 'name' | 'property', clave: string, valor: string][] = [
      ['name', 'description', pagina.descripcion],
      [
        'name',
        'robots',
        pagina.indexar === false ? 'noindex, follow' : 'index, follow, max-image-preview:large',
      ],
      ['property', 'og:type', 'website'],
      ['property', 'og:locale', 'es_CR'],
      ['property', 'og:site_name', pagina.nombreSitio],
      ['property', 'og:title', pagina.titulo],
      ['property', 'og:description', pagina.descripcion],
      ['property', 'og:url', url],
      ['property', 'og:image', imagen],
      ['property', 'og:image:width', '1200'],
      ['property', 'og:image:height', '630'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', pagina.titulo],
      ['name', 'twitter:description', pagina.descripcion],
      ['name', 'twitter:image', imagen],
    ];
    for (const [atributo, clave, valor] of etiquetas) {
      this.meta.updateTag({ [atributo]: clave, content: valor }, `${atributo}="${clave}"`);
    }

    this.ponerCanonical(url);
    this.ponerJsonLd(pagina.datosEstructurados);
  }

  private ponerCanonical(url: string): void {
    let link = this.documento.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.documento.createElement('link');
      link.rel = 'canonical';
      this.documento.head.appendChild(link);
    }
    link.href = url;
  }

  private ponerJsonLd(datos: unknown): void {
    const existente = this.documento.getElementById(ID_JSON_LD);
    if (datos === undefined) {
      existente?.remove();
      return;
    }
    const script = existente ?? this.documento.createElement('script');
    script.id = ID_JSON_LD;
    script.setAttribute('type', 'application/ld+json');
    script.textContent = serializarJsonLd(datos);
    if (!existente) this.documento.head.appendChild(script);
  }
}
