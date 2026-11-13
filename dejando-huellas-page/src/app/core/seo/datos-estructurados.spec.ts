import { Contenido } from '../contenido/contenido';
import { construirDatosEstructurados, serializarJsonLd } from './datos-estructurados';

describe('construirDatosEstructurados', () => {
  const c = new Contenido();
  const datos = construirDatosEstructurados({
    sitio: c.sitio,
    horarios: c.horarios,
    preguntas: c.preguntas,
    rutaLogo: 'media/logo.webp',
  });
  const [centro, sitioWeb, faq] = datos['@graph'];

  it('describe el centro como ChildCare con datos del contenido', () => {
    expect(centro['@type']).toBe('ChildCare');
    expect(centro).toMatchObject({
      name: 'Centro Infantil Dejando Huella',
      telephone: '+50664781319',
      url: 'https://dejandohuellacr.com/',
      logo: 'https://dejandohuellacr.com/media/logo.webp',
      address: { addressLocality: 'Ciudad Quesada', addressCountry: 'CR' },
      openingHoursSpecification: [{ opens: '07:00', closes: '17:00' }],
      sameAs: ['https://www.instagram.com/dejandohuella.centroinfantil/'],
    });
  });

  it('calcula el rango de precios desde las modalidades', () => {
    expect(centro).toMatchObject({ priceRange: '₡60.000 – ₡185.000' });
  });

  it('enlaza el sitio web con el centro y publica todas las preguntas', () => {
    expect(sitioWeb).toMatchObject({
      '@type': 'WebSite',
      publisher: { '@id': 'https://dejandohuellacr.com/#centro' },
    });
    expect(faq).toMatchObject({ '@type': 'FAQPage' });
    expect('mainEntity' in faq && faq.mainEntity).toHaveLength(c.preguntas.preguntas.length);
  });
});

describe('serializarJsonLd', () => {
  it('no permite cerrar la etiqueta script desde el contenido', () => {
    const json = serializarJsonLd({ texto: '</script><script>alert(1)</script>' });
    expect(json).not.toContain('</script>');
    expect(JSON.parse(json)).toEqual({ texto: '</script><script>alert(1)</script>' });
  });
});
