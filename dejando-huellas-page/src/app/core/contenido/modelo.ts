/**
 * Modelo del contenido editable del sitio.
 *
 * Los archivos de `contenido/*.json` se importan con estos tipos: si alguien rompe la estructura
 * de un JSON (desde el CMS o a mano), la compilación falla y el cambio no se publica.
 * Las reglas que TypeScript no puede comprobar (precios positivos, fotos que existen, etc.)
 * las revisa `validar-contenido.spec.ts`.
 */

/** Íconos de trazo disponibles en el sprite (`shared/ui/icono`). */
export const ICONOS = [
  'whatsapp',
  'menu',
  'cerrar',
  'sol',
  'manzana',
  'paleta',
  'brote',
  'cubiertos',
  'luna',
  'casa',
  'escudo',
  'corazon',
  'pin',
  'telefono',
  'correo',
  'reloj',
  'mas',
  'ampliar',
  'musica',
  'instagram',
  'libro',
  'globo',
  'matraz',
  'pelota',
  'mano',
  'sonaja',
  'birrete',
  'documento',
  'pausa',
  'reproducir',
] as const;

export type NombreIcono = (typeof ICONOS)[number];

/**
 * TypeScript infiere los textos de un JSON como `string`, nunca como uniones literales
 * (`'matraz' | 'libro'…`). `DesdeJson<T>` amplía esas uniones a `string` para poder comprobar
 * la ESTRUCTURA del JSON al compilar; los valores permitidos los revisa la prueba de contenido.
 */
export type DesdeJson<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DesdeJson<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DesdeJson<T[K]> }
      : T;

/** Una foto de `media/fotos/`, referida por su nombre de archivo sin extensión. */
export interface Foto {
  readonly nombre: string;
  /** Describe lo que se ve; lo leen los lectores de pantalla y Google. */
  readonly alt: string;
}

/** Un video de `media/videos/`. Su póster es la foto `video-<nombre>`. */
export interface Video {
  readonly nombre: string;
  /** Descripción del video para lectores de pantalla. */
  readonly descripcion: string;
}

export interface Sitio {
  readonly nombre: string;
  readonly nombreCorto: string;
  readonly lema: string;
  readonly frase: string;
  readonly url: string;
  /** Año y mes de apertura, formato AAAA-MM. */
  readonly fundacion: string;
  readonly contacto: {
    /** Número completo con código de país, solo dígitos (ej. 50664781319). */
    readonly whatsapp: string;
    readonly telefonoVisible: string;
    readonly correo: string;
    /** Usuario de Instagram sin @. */
    readonly instagram: string;
    readonly mensajeGeneral: string;
  };
  readonly direccion: {
    readonly barrio: string;
    readonly ciudad: string;
    readonly canton: string;
    readonly provincia: string;
    readonly pais: string;
    readonly senas: string;
    readonly plusCode: string;
    readonly latitud: number;
    readonly longitud: number;
  };
  readonly horario: {
    readonly dias: string;
    /** Días para Google, en inglés de schema.org (Monday, Tuesday…). */
    readonly diasSchema: readonly string[];
    /** Formato 24 h, HH:MM. */
    readonly apertura: string;
    readonly cierre: string;
  };
  readonly seo: {
    readonly titulo: string;
    readonly descripcion: string;
    readonly imagen: string;
  };
}

export interface Portada {
  readonly antetitulo: string;
  readonly titular: string;
  readonly titularAcento: string;
  readonly bajada: string;
  readonly foto: Foto;
  readonly mensajeWhatsapp: string;
}

export interface Nosotros {
  readonly titulo: string;
  readonly parrafos: readonly string[];
  readonly valores: readonly string[];
  readonly foto: Foto;
}

export interface Tranquilidad {
  readonly titulo: string;
  readonly bajada: string;
  readonly foto: Foto;
  readonly seguridad: {
    readonly titulo: string;
    readonly texto: string;
    readonly puntos: readonly string[];
  };
  readonly cifra: { readonly numero: string; readonly titulo: string; readonly texto: string };
  readonly equipo: {
    readonly titulo: string;
    readonly texto: string;
    readonly formaciones: readonly string[];
  };
  readonly ritmo: { readonly titulo: string; readonly texto: string };
}

export interface Grupo {
  /** Identificador estable para anclas y analítica (ej. semillitas). */
  readonly id: string;
  readonly nombre: string;
  readonly edades: string;
  readonly puntos: readonly string[];
  readonly foto: Foto;
  readonly mensajeWhatsapp: string;
}

export interface Grupos {
  readonly titulo: string;
  readonly bajada: string;
  readonly nota: { readonly titulo: string; readonly texto: string };
  readonly grupos: readonly Grupo[];
}

export interface Experiencia {
  readonly nombre: string;
  readonly texto: string;
  readonly icono: NombreIcono;
  readonly foto?: Foto;
  readonly video?: Video;
}

export interface Experiencias {
  readonly titulo: string;
  readonly bajada: string;
  readonly experiencias: readonly Experiencia[];
}

export interface Alimentacion {
  readonly titulo: string;
  readonly bajada: string;
  readonly tiempos: readonly string[];
  readonly puntos: readonly {
    readonly titulo: string;
    readonly texto: string;
    readonly icono: NombreIcono;
  }[];
  readonly video: Video;
}

export interface Momento {
  /** Opcional: solo se muestra si el centro confirmó la hora. */
  readonly hora?: string;
  readonly titulo: string;
  readonly texto: string;
  readonly icono: NombreIcono;
}

export interface UnDia {
  readonly titulo: string;
  readonly bajada: string;
  readonly momentos: readonly Momento[];
  readonly fotos: readonly Foto[];
}

export interface FotoGaleria extends Foto {
  readonly pie: string;
}

export interface Galeria {
  readonly titulo: string;
  readonly bajada: string;
  readonly fotos: readonly FotoGaleria[];
}

export interface Precio {
  readonly dias: number;
  /** Monto mensual en colones, sin puntos ni símbolo. */
  readonly monto: number;
}

export interface Modalidad {
  readonly nombre: string;
  /** Formato 24 h, HH:MM. */
  readonly desde: string;
  readonly hasta: string;
  readonly precios: readonly Precio[];
}

export interface Horarios {
  readonly titulo: string;
  readonly bajada: string;
  readonly modalidades: readonly Modalidad[];
  readonly nota: string;
  readonly descuentos: readonly { readonly titulo: string; readonly texto: string }[];
  readonly matricula: { readonly titulo: string; readonly monto: number; readonly texto: string };
}

export interface Matricula {
  readonly titulo: string;
  readonly pasos: readonly { readonly titulo: string; readonly texto: string }[];
  readonly requisitos: {
    readonly titulo: string;
    readonly intro: string;
    readonly items: readonly string[];
  };
  readonly mensajeWhatsapp: string;
}

export interface Pregunta {
  readonly pregunta: string;
  readonly respuesta: string;
}

export interface Preguntas {
  readonly titulo: string;
  readonly bajada: string;
  readonly preguntas: readonly Pregunta[];
}

export interface Testimonio {
  readonly texto: string;
  readonly autor: string;
  readonly detalle: string;
}

export interface Testimonios {
  /** La sección solo se muestra si está activa y hay al menos un testimonio real. */
  readonly activo: boolean;
  readonly titulo: string;
  readonly testimonios: readonly Testimonio[];
}

export interface Visitanos {
  readonly titulo: string;
  readonly bajada: string;
  readonly cierre: string;
}
