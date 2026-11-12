import { z } from "zod";
import { CODIGOS } from "./schema";
import type { Codigo } from "./schema";

type ParamCrudo = string | string[] | undefined;

// Si el parámetro viene repetido (?anio=1&anio=2), usamos el primero
const primero = (valor: ParamCrudo) =>
  Array.isArray(valor) ? valor[0] : valor;

const codigoSchema = z.enum(CODIGOS).catch("uf");
const anioSchema = z.coerce.number().int().min(1990).max(2100);

export function leerParametros(
  crudo: { indicador?: ParamCrudo; anio?: ParamCrudo },
  anioPorDefecto: number,
): { codigo: Codigo; anio: number } {
  const codigo = codigoSchema.parse(primero(crudo.indicador));
  const anio = anioSchema.safeParse(primero(crudo.anio));
  return { codigo, anio: anio.success ? anio.data : anioPorDefecto };
}