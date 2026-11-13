/** Lo que medimos: intenciones de contacto. Un clic a WhatsApp no garantiza que el mensaje se envió. */
export type EventoAnalitica =
  | 'clic_whatsapp'
  | 'clic_telefono'
  | 'clic_correo'
  | 'clic_instagram'
  | 'clic_mapa'
  | 'formulario_enviado';

/**
 * Puerto de analítica. Los componentes dependen de este contrato y no del proveedor,
 * así se puede cambiar Umami por otro servicio tocando un solo archivo (provide-analitica.ts).
 */
export abstract class Analitica {
  /** `ubicacion` dice desde dónde ocurrió (portada, barra, grupo-semillitas…). */
  abstract registrar(evento: EventoAnalitica, ubicacion: string): void;
}

/** Para el prerender, las pruebas o cuando no hay proveedor configurado. */
export class AnaliticaInactiva extends Analitica {
  override registrar(): void {
    // Sin proveedor: no se registra nada.
  }
}
