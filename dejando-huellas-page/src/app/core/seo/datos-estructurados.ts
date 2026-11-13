import type { Horarios, Preguntas, Sitio } from '../contenido/modelo';
import { formatearColones } from '../contenido/formato';

/** Datos que necesita el JSON-LD. Recibe contenido, no el servicio: es una función pura y fácil de probar. */
export interface FuenteDatosEstructurados {
  readonly sitio: Sitio;
  readonly horarios: Horarios;
  readonly preguntas: Preguntas;
  /** Ruta pública (relativa al sitio) del logo. */
  readonly rutaLogo: string;
}

/**
 * JSON-LD para Google: ficha del centro (`ChildCare`), sitio web y preguntas frecuentes.
 * Todo sale del mismo contenido que pinta la página, así que nunca se contradicen.
 */
export function construirDatosEstructurados({
  sitio,
  horarios,
  preguntas,
  rutaLogo,
}: FuenteDatosEstructurados) {
  const base = sitio.url.replace(/\/+$/, '');
  const idCentro = `${base}/#centro`;
  const montos = horarios.modalidades.flatMap((m) => m.precios.map((p) => p.monto));
  const { direccion: d, contacto: c } = sitio;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ChildCare',
        '@id': idCentro,
        name: sitio.nombre,
        alternateName: sitio.nombreCorto,
        slogan: sitio.lema,
        description: sitio.seo.descripcion,
        url: `${base}/`,
        telephone: `+${c.whatsapp}`,
        email: c.correo,
        image: `${base}/${sitio.seo.imagen}`,
        logo: `${base}/${rutaLogo}`,
        foundingDate: sitio.fundacion,
        currenciesAccepted: 'CRC',
        priceRange: `${formatearColones(Math.min(...montos))} – ${formatearColones(Math.max(...montos))}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${d.senas}, ${d.barrio}`,
          addressLocality: d.ciudad,
          addressRegion: d.provincia,
          addressCountry: d.pais,
        },
        geo: { '@type': 'GeoCoordinates', latitude: d.latitud, longitude: d.longitud },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${d.latitud},${d.longitud}`,
        areaServed: `${d.canton}, ${d.provincia}`,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: sitio.horario.diasSchema,
            opens: sitio.horario.apertura,
            closes: sitio.horario.cierre,
          },
        ],
        sameAs: [`https://www.instagram.com/${c.instagram}/`],
      },
      {
        '@type': 'WebSite',
        '@id': `${base}/#sitio`,
        url: `${base}/`,
        name: sitio.nombre,
        inLanguage: 'es-CR',
        publisher: { '@id': idCentro },
      },
      {
        '@type': 'FAQPage',
        '@id': `${base}/#preguntas`,
        mainEntity: preguntas.preguntas.map((p) => ({
          '@type': 'Question',
          name: p.pregunta,
          acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
        })),
      },
    ],
  };
}

/**
 * Serializa para un `<script type="application/ld+json">`. Escapa `<` para que un texto del
 * contenido con «</script>» no pueda cerrar la etiqueta e inyectar HTML.
 */
export function serializarJsonLd(datos: unknown): string {
  return JSON.stringify(datos).replace(/</g, '\\u003c');
}
