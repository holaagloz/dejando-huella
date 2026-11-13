/** Reglas para abrir WhatsApp con un mensaje ya escrito. Funciones puras: sin DOM ni Angular. */

const SOLO_DIGITOS = /^\d{8,15}$/;

/**
 * Enlace `wa.me` con el mensaje codificado. `numero` va con código de país y solo dígitos
 * (ej. 50664781319); un número mal formado es un error de contenido, no algo que ocultar.
 */
export function enlaceWhatsapp(numero: string, mensaje?: string): string {
  if (!SOLO_DIGITOS.test(numero)) {
    throw new Error(
      `Número de WhatsApp inválido: «${numero}». Usa el código de país y solo dígitos.`,
    );
  }
  const texto = mensaje?.trim();
  return texto
    ? `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
    : `https://wa.me/${numero}`;
}

export interface SolicitudVisita {
  readonly nombre: string;
  readonly edad: string;
  readonly horario: string;
  readonly mensaje: string;
}

/** Arma el mensaje del formulario «Agenda tu visita». Las líneas vacías u opcionales se omiten. */
export function mensajeSolicitudVisita(solicitud: SolicitudVisita, nombreCentro: string): string {
  const lineas = [`Hola, quisiera agendar una visita al ${nombreCentro}.`, ''];
  const agregar = (etiqueta: string, valor: string) => {
    const limpio = valor.trim();
    if (limpio) lineas.push(`${etiqueta}: ${limpio}`);
  };
  agregar('Nombre', solicitud.nombre);
  agregar('Edad de mi hijo o hija', solicitud.edad);
  agregar('Horario preferido para la visita', solicitud.horario);
  agregar('Comentario', solicitud.mensaje);
  return lineas.join('\n');
}
