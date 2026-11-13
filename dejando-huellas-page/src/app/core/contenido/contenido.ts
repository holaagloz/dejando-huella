import { Service } from '@angular/core';

import alimentacionJson from '../../../../contenido/alimentacion.json';
import experienciasJson from '../../../../contenido/experiencias.json';
import galeriaJson from '../../../../contenido/galeria.json';
import gruposJson from '../../../../contenido/grupos.json';
import horariosJson from '../../../../contenido/horarios.json';
import matriculaJson from '../../../../contenido/matricula.json';
import nosotrosJson from '../../../../contenido/nosotros.json';
import portadaJson from '../../../../contenido/portada.json';
import preguntasJson from '../../../../contenido/preguntas.json';
import sitioJson from '../../../../contenido/sitio.json';
import testimoniosJson from '../../../../contenido/testimonios.json';
import tranquilidadJson from '../../../../contenido/tranquilidad.json';
import unDiaJson from '../../../../contenido/un-dia.json';
import visitanosJson from '../../../../contenido/visitanos.json';
import type {
  Alimentacion,
  DesdeJson,
  Experiencias,
  Galeria,
  Grupos,
  Horarios,
  Matricula,
  Nosotros,
  Portada,
  Preguntas,
  Sitio,
  Testimonios,
  Tranquilidad,
  UnDia,
  Visitanos,
} from './modelo';

/**
 * El editor (Pages CMS) guarda las fotos como ruta («media/fotos/agricultura.jpg»); el sitio las
 * identifica por nombre («agricultura»). Acepta las dos formas.
 */
export function normalizarNombreMedia(valor: string): string {
  return valor.replace(/^.*\//, '').replace(/\.(jpe?g|png|webp|mp4)$/i, '');
}

function normalizarMedia(nodo: unknown): unknown {
  if (Array.isArray(nodo)) return nodo.map(normalizarMedia);
  if (!nodo || typeof nodo !== 'object') return nodo;
  const obj = Object.fromEntries(Object.entries(nodo).map(([k, v]) => [k, normalizarMedia(v)]));
  const esMedia = typeof obj['nombre'] === 'string' && ('alt' in obj || 'descripcion' in obj);
  return esMedia ? { ...obj, nombre: normalizarNombreMedia(obj['nombre'] as string) } : obj;
}

/**
 * Comprueba al compilar que el JSON tiene la estructura de `T`. Los valores de las uniones
 * literales (íconos) los valida `validar-contenido.spec.ts`, por eso aquí basta el cast final.
 */
const leer = <T>(json: DesdeJson<T>): T => normalizarMedia(json) as T;

/** Contenido editable del sitio (carpeta `contenido/`). Única fuente de verdad de textos y datos. */
@Service()
export class Contenido {
  readonly sitio = leer<Sitio>(sitioJson);
  readonly portada = leer<Portada>(portadaJson);
  readonly nosotros = leer<Nosotros>(nosotrosJson);
  readonly tranquilidad = leer<Tranquilidad>(tranquilidadJson);
  readonly grupos = leer<Grupos>(gruposJson);
  readonly experiencias = leer<Experiencias>(experienciasJson);
  readonly alimentacion = leer<Alimentacion>(alimentacionJson);
  readonly unDia = leer<UnDia>(unDiaJson);
  readonly galeria = leer<Galeria>(galeriaJson);
  readonly horarios = leer<Horarios>(horariosJson);
  readonly matricula = leer<Matricula>(matriculaJson);
  readonly preguntas = leer<Preguntas>(preguntasJson);
  readonly testimonios = leer<Testimonios>(testimoniosJson);
  readonly visitanos = leer<Visitanos>(visitanosJson);
}
