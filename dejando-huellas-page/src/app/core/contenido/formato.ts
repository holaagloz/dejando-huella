/** Formatos de presentación en español de Costa Rica. Funciones puras. */

/** 185000 → «₡185.000», con punto de miles como en los documentos del centro. */
export function formatearColones(monto: number): string {
  if (!Number.isInteger(monto) || monto < 0) throw new Error(`Monto inválido: ${monto}`);
  return `₡${String(monto).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

const HORA = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** «07:00» → «7:00 a. m.», «12:00» → «12:00 m.», «17:00» → «5:00 p. m.» */
export function formatearHora(hora24: string): string {
  const partes = HORA.exec(hora24);
  if (!partes) throw new Error(`Hora inválida: «${hora24}». Usa el formato HH:MM de 24 horas.`);
  const h = Number(partes[1]);
  const m = partes[2];
  if (h === 12 && m === '00') return '12:00 m.';
  const sufijo = h < 12 ? 'a. m.' : 'p. m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${sufijo}`;
}

/** «07:00», «17:00» → «7:00 a. m. a 5:00 p. m.» */
export function formatearRango(desde: string, hasta: string): string {
  return `${formatearHora(desde)} a ${formatearHora(hasta)}`;
}
