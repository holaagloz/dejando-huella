import { Analitica, EventoAnalitica } from './analitica';

interface Umami {
  track(evento: string, datos?: Record<string, string>): void;
}

/**
 * Adaptador de Umami Cloud: analítica sin cookies (no requiere banner de consentimiento).
 * Carga el script después del primer render, para no competir con el contenido.
 */
export class AnaliticaUmami extends Analitica {
  private pendientes: [EventoAnalitica, string][] = [];

  constructor(
    private readonly documento: Document,
    private readonly idSitio: string,
    private readonly dominio: string,
  ) {
    super();
  }

  /** Inserta el script de Umami. Solo cuenta visitas en el dominio de producción. */
  cargar(): void {
    const script = this.documento.createElement('script');
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.dataset['websiteId'] = this.idSitio;
    script.dataset['domains'] = this.dominio;
    script.addEventListener('load', () => this.vaciarPendientes());
    this.documento.head.appendChild(script);
  }

  override registrar(evento: EventoAnalitica, ubicacion: string): void {
    const umami = this.umami();
    if (umami) umami.track(evento, { ubicacion });
    else this.pendientes.push([evento, ubicacion]);
  }

  private vaciarPendientes(): void {
    const umami = this.umami();
    if (!umami) return;
    this.pendientes.forEach(([evento, ubicacion]) => umami.track(evento, { ubicacion }));
    this.pendientes = [];
  }

  private umami(): Umami | undefined {
    return (this.documento.defaultView as (Window & { umami?: Umami }) | null)?.umami;
  }
}
