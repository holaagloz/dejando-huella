import { anchoDisponible, cargadorMedia, medidasFoto, rutaFoto } from './media';

describe('media', () => {
  const medidas = { ancho: 1086, alto: 1448, anchos: [480, 800, 1086] };

  it('elige el ancho disponible más chico que cubre el pedido', () => {
    expect(anchoDisponible(medidas, 300)).toBe(480);
    expect(anchoDisponible(medidas, 800)).toBe(800);
    expect(anchoDisponible(medidas, 900)).toBe(1086);
  });

  it('si ningún ancho alcanza, usa el más grande (nunca agranda)', () => {
    expect(anchoDisponible(medidas, 3000)).toBe(1086);
  });

  it('arma rutas relativas a variantes reales del manifiesto', () => {
    const { anchos } = medidasFoto('nina-mural-logo');
    expect(rutaFoto('nina-mural-logo', 10)).toBe(`media/nina-mural-logo-${anchos[0]}.webp`);
    expect(cargadorMedia({ src: 'nina-mural-logo', width: 99999 })).toBe(
      `media/nina-mural-logo-${anchos.at(-1)}.webp`,
    );
  });

  it('una foto inexistente es un error explícito', () => {
    expect(() => rutaFoto('no-existe', 800)).toThrow(/no existe/);
  });
});
