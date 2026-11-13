import { formatearColones, formatearHora, formatearRango } from './formato';

describe('formatearColones', () => {
  it.each([
    [185000, '₡185.000'],
    [60000, '₡60.000'],
    [1250000, '₡1.250.000'],
    [500, '₡500'],
    [0, '₡0'],
  ])('%i → %s', (monto, esperado) => expect(formatearColones(monto)).toBe(esperado));

  it.each([-1, 10.5, Number.NaN])('rechaza el monto %s', (monto) =>
    expect(() => formatearColones(monto)).toThrow(),
  );
});

describe('formatearHora', () => {
  it.each([
    ['07:00', '7:00 a. m.'],
    ['00:30', '12:30 a. m.'],
    ['12:00', '12:00 m.'],
    ['12:30', '12:30 p. m.'],
    ['13:00', '1:00 p. m.'],
    ['17:00', '5:00 p. m.'],
  ])('%s → %s', (hora, esperado) => expect(formatearHora(hora)).toBe(esperado));

  it.each(['7:00', '24:00', '17:60', '5 pm', ''])('rechaza «%s»', (hora) =>
    expect(() => formatearHora(hora)).toThrow(/inválida/),
  );

  it('arma rangos', () => expect(formatearRango('07:00', '17:00')).toBe('7:00 a. m. a 5:00 p. m.'));
});
