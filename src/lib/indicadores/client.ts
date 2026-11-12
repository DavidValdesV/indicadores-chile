import { cacheLife } from "next/cache";
import { resumenSchema, serieSchema } from "./schema";
import type { Codigo, Resumen, Serie } from "./schema";

const BASE_URL = "https://mindicador.cl/api";

// La API entrega lo más nuevo primero; ordenamos de antiguo a nuevo para graficar
function ordenarPorFecha(serie: Serie): Serie {
  return {
    ...serie,
    serie: [...serie.serie].sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
    ),
  };
}

// Resumen con el valor actual de todos los indicadores
export async function getResumen(): Promise<Resumen> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`mindicador.cl respondió con estado ${res.status}`);
  }
  // parse() valida la forma de los datos y lanza error si no coinciden
  return resumenSchema.parse(await res.json());
}

// Historial de un indicador durante un año
export async function getSerie(codigo: Codigo, anio: number): Promise<Serie> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${BASE_URL}/${codigo}/${anio}`);
  if (!res.ok) {
    throw new Error(`mindicador.cl respondió con estado ${res.status}`);
  }
  return ordenarPorFecha(serieSchema.parse(await res.json()));
}

// Últimos datos de un indicador (la API entrega aprox. los últimos 30 días)
export async function getUltimos(codigo: Codigo): Promise<Serie> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${BASE_URL}/${codigo}`);
  if (!res.ok) {
    throw new Error(`mindicador.cl respondió con estado ${res.status}`);
  }
  return ordenarPorFecha(serieSchema.parse(await res.json()));
}
