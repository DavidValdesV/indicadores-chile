import type { PuntoSerie } from "./schema";

export type Variacion = {
  tipo: "porcentaje" | "puntos";
  valor: number;
};

export type Estadisticas = {
  minimo: number;
  maximo: number;
  promedio: number;
  variacion: Variacion;
};

// Variación entre dos valores. Si el indicador ya es un porcentaje, se mide en puntos
export function calcularVariacion(
  desde: number,
  hasta: number,
  unidad: string,
): Variacion {
  if (unidad === "Porcentaje") {
    return { tipo: "puntos", valor: hasta - desde };
  }
  return {
    tipo: "porcentaje",
    valor: desde === 0 ? 0 : ((hasta - desde) / desde) * 100,
  };
}

// Espera los puntos ordenados de más antiguo a más nuevo
export function calcularEstadisticas(
  puntos: PuntoSerie[],
  unidad: string,
): Estadisticas | null {
  if (puntos.length === 0) return null;

  const valores = puntos.map((p) => p.valor);
  const suma = valores.reduce((acc, v) => acc + v, 0);

  return {
    minimo: Math.min(...valores),
    maximo: Math.max(...valores),
    promedio: suma / valores.length,
    variacion: calcularVariacion(valores[0], valores[valores.length - 1], unidad),
  };
}

// Variación del último dato respecto del anterior (puntos de antiguo a nuevo)
export function variacionUltima(
  puntos: PuntoSerie[],
  unidad: string,
): Variacion | null {
  if (puntos.length < 2) return null;
  return calcularVariacion(
    puntos[puntos.length - 2].valor,
    puntos[puntos.length - 1].valor,
    unidad,
  );
}

// Deja solo los puntos hasta una fecha (inclusive).
// Las fechas ISO tienen el mismo formato, así que se pueden comparar como texto.
export function hastaFecha(
  puntos: PuntoSerie[],
  fechaISO: string,
): PuntoSerie[] {
  return puntos.filter((p) => p.fecha <= fechaISO);
}
