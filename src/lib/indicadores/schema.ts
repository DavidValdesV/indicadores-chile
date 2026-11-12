import { z } from "zod";

// Un indicador individual (por ejemplo, el valor de hoy de la UF)
export const indicadorSchema = z.object({
  codigo: z.string(),
  nombre: z.string(),
  unidad_medida: z.string(),
  fecha: z.string(),
  valor: z.number(),
});

// Respuesta de https://mindicador.cl/api (resumen de todos los indicadores)
// Solo declaramos los que vamos a usar: Zod ignora el resto.
export const resumenSchema = z.object({
  fecha: z.string(),
  uf: indicadorSchema,
  dolar: indicadorSchema,
  euro: indicadorSchema,
  utm: indicadorSchema,
  ipc: indicadorSchema,
  tpm: indicadorSchema,
});

// Un punto del historial: una fecha y su valor
export const puntoSerieSchema = z.object({
  fecha: z.string(),
  valor: z.number(),
});

// Respuesta de https://mindicador.cl/api/uf (historial de un indicador)
export const serieSchema = z.object({
  codigo: z.string(),
  nombre: z.string(),
  unidad_medida: z.string(),
  serie: z.array(puntoSerieSchema),
});

// Tipos de TypeScript generados automáticamente desde los esquemas
export type Indicador = z.infer<typeof indicadorSchema>;
export type Resumen = z.infer<typeof resumenSchema>;
export type PuntoSerie = z.infer<typeof puntoSerieSchema>;
export type Serie = z.infer<typeof serieSchema>;