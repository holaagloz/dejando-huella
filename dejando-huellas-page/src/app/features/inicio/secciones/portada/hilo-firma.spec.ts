import { trazarHiloFirma } from './hilo-firma';

describe('trazarHiloFirma', () => {
  const portada = { left: 100, top: 50, width: 1000, height: 800 };
  const boton = { left: 140, top: 400, width: 220, height: 56 };

  it('sin datos visibles no hay hilo', () => {
    expect(
      trazarHiloFirma(portada, { left: 0, top: 0, width: 10, height: 10 }, boton, []),
    ).toBeNull();
  });

  it('en escritorio arranca en el borde derecho de la costura de datos y termina en el botón', () => {
    const huella = { left: 100, top: 650, width: 160, height: 150 };
    const datos = [{ left: 260, top: 650, width: 300, height: 150 }];
    const d = trazarHiloFirma(portada, huella, boton, datos) ?? '';
    expect(d.startsWith('M984,600')).toBe(true); // 1000 - 16, costura en y = 650 - 50
    expect(d.endsWith(' 262,378')).toBe(true); // borde derecho del botón + 2, centro vertical
  });

  it('en celular sube por la costura de la huella', () => {
    const huella = { left: 700, top: 300, width: 300, height: 200 };
    const datos = [{ left: 100, top: 520, width: 500, height: 130 }];
    const d = trazarHiloFirma(portada, huella, boton, datos) ?? '';
    expect(d.startsWith('M16,470')).toBe(true);
    expect(d).toContain(' Q'); // puntadas
  });
});
