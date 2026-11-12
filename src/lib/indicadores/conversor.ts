import type { Resumen } from "./schema";

export const MONEDAS = ["CLP", "UF", "USD", "EUR", "UTM"] as const;
export type Moneda = (typeof MONEDAS)[number];

// Cuántos pesos vale una unidad de cada moneda
export type Tasas = Record<Moneda, number>;

export function tasasDesdeResumen(resumen: Resumen): Tasas {
  return {
    CLP: 1,
    UF: resumen.uf.valor,
    USD: resumen.dolar.valor,
    EUR: resumen.euro.valor,
    UTM: resumen.utm.valor,
  };
}

// Convierte pasando siempre por pesos: monto -> pesos -> moneda destino
export function convertir(
  monto: number,
  desde: Moneda,
  hacia: Moneda,
  tasas: Tasas,
): number {
  return (monto * tasas[desde]) / tasas[hacia];
}

export function formatearMonto(valor: number, moneda: Moneda): string {
  const decimales = moneda === "CLP" ? 0 : 2;
  const numero = valor.toLocaleString("es-CL", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
  return `${numero} ${moneda}`;
}