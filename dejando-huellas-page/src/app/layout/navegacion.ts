/** Anclas del sitio. Una sola lista para la barra, el menú del celular y el pie. */
export interface Enlace {
  readonly ancla: string;
  readonly texto: string;
  readonly textoCorto?: string;
}

export const SECCIONES: readonly Enlace[] = [
  { ancla: 'grupos', texto: 'Grupos por edad', textoCorto: 'Grupos' },
  { ancla: 'experiencias', texto: 'Experiencias' },
  { ancla: 'un-dia', texto: 'Un día aquí' },
  { ancla: 'alimentacion', texto: 'Alimentación' },
  { ancla: 'espacios', texto: 'Nuestros espacios' },
  { ancla: 'horarios', texto: 'Horarios y mensualidades', textoCorto: 'Horarios' },
  { ancla: 'matricula', texto: 'Matrícula' },
  { ancla: 'preguntas', texto: 'Preguntas' },
  { ancla: 'visitanos', texto: 'Visítanos · mapa y contacto', textoCorto: 'Visítanos' },
];

/** Las que caben en la barra de escritorio. */
export const SECCIONES_BARRA = SECCIONES.filter((s) =>
  ['grupos', 'experiencias', 'horarios', 'matricula', 'preguntas'].includes(s.ancla),
);
