import { enlaceWhatsapp, mensajeSolicitudVisita } from './whatsapp';

describe('enlaceWhatsapp', () => {
  it('codifica acentos, signos y saltos de línea del mensaje', () => {
    const url = enlaceWhatsapp('50664781319', '¿Hay espacio?\nGracias, señora');
    expect(url).toBe(
      'https://wa.me/50664781319?text=%C2%BFHay%20espacio%3F%0AGracias%2C%20se%C3%B1ora',
    );
    expect(decodeURIComponent(new URL(url).searchParams.get('text') ?? '')).toBe(
      '¿Hay espacio?\nGracias, señora',
    );
  });

  it('sin mensaje (o solo espacios) devuelve el enlace simple', () => {
    expect(enlaceWhatsapp('50664781319')).toBe('https://wa.me/50664781319');
    expect(enlaceWhatsapp('50664781319', '   ')).toBe('https://wa.me/50664781319');
  });

  it.each(['6478-1319', '+50664781319', '506 6478 1319', '123', ''])(
    'rechaza el número mal formado «%s»',
    (numero) => {
      expect(() => enlaceWhatsapp(numero, 'Hola')).toThrow(/inválido/);
    },
  );
});

describe('mensajeSolicitudVisita', () => {
  const centro = 'Centro Infantil Dejando Huella';

  it('incluye todos los datos completos, uno por línea', () => {
    const mensaje = mensajeSolicitudVisita(
      {
        nombre: ' Ana Rodríguez ',
        edad: '2 a 3 años',
        horario: 'Entre semana en la mañana',
        mensaje: 'Buscamos tiempo completo',
      },
      centro,
    );
    expect(mensaje).toBe(
      [
        'Hola, quisiera agendar una visita al Centro Infantil Dejando Huella.',
        '',
        'Nombre: Ana Rodríguez',
        'Edad de mi hijo o hija: 2 a 3 años',
        'Horario preferido para la visita: Entre semana en la mañana',
        'Comentario: Buscamos tiempo completo',
      ].join('\n'),
    );
  });

  it('omite los campos opcionales vacíos', () => {
    const mensaje = mensajeSolicitudVisita(
      { nombre: 'Ana', edad: '3 a 4 años', horario: '', mensaje: '  ' },
      centro,
    );
    expect(mensaje).not.toContain('Horario preferido');
    expect(mensaje).not.toContain('Comentario');
    expect(mensaje.split('\n')).toHaveLength(4);
  });
});
