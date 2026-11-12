import { describe, expect, it } from "vitest";
import { indicadorSchema, serieSchema } from "./schema";

describe("indicadorSchema", () => {
  it("acepta un indicador válido", () => {
    const resultado = indicadorSchema.safeParse({
      codigo: "uf",
      nombre: "Unidad de fomento (UF)",
      unidad_medida: "Pesos",
      fecha: "2026-11-11T03:00:00.000Z",
      valor: 41309.19,
    });
    expect(resultado.success).toBe(true);
  });

  it("rechaza un indicador cuyo valor es texto", () => {
    const resultado = indicadorSchema.safeParse({
      codigo: "uf",
      nombre: "Unidad de fomento (UF)",
      unidad_medida: "Pesos",
      fecha: "2026-11-11T03:00:00.000Z",
      valor: "41309.19",
    });
    expect(resultado.success).toBe(false);
  });

  it("rechaza un indicador al que le falta un campo", () => {
    const resultado = indicadorSchema.safeParse({ codigo: "uf", valor: 1 });
    expect(resultado.success).toBe(false);
  });
});

describe("serieSchema", () => {
  it("acepta una serie con varios puntos", () => {
    const resultado = serieSchema.safeParse({
      codigo: "dolar",
      nombre: "Dólar observado",
      unidad_medida: "Pesos",
      serie: [
        { fecha: "2025-12-30T03:00:00.000Z", valor: 911.18 },
        { fecha: "2025-12-29T03:00:00.000Z", valor: 904.54 },
      ],
    });
    expect(resultado.success).toBe(true);
  });

  it("rechaza una serie con un punto inválido", () => {
    const resultado = serieSchema.safeParse({
      codigo: "dolar",
      nombre: "Dólar observado",
      unidad_medida: "Pesos",
      serie: [{ fecha: "2025-12-30T03:00:00.000Z", valor: null }],
    });
    expect(resultado.success).toBe(false);
  });
});