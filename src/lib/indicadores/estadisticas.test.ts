import { describe, expect, it } from "vitest";
import {
  calcularEstadisticas,
  calcularVariacion,
  hastaFecha,
  variacionUltima,
} from "./estadisticas";

const puntos = (valores: number[]) =>
  valores.map((valor, i) => ({
    fecha: `2026-01-0${i + 1}T03:00:00.000Z`,
    valor,
  }));

describe("calcularVariacion", () => {
  it("calcula la variación porcentual entre dos valores", () => {
    const v = calcularVariacion(100, 120, "Pesos");
    expect(v.tipo).toBe("porcentaje");
    expect(v.valor).toBeCloseTo(20);
  });

  it("mide en puntos cuando el indicador ya es un porcentaje", () => {
    const v = calcularVariacion(1.0, 0.2, "Porcentaje");
    expect(v.tipo).toBe("puntos");
    expect(v.valor).toBeCloseTo(-0.8);
  });

  it("no divide por cero", () => {
    expect(calcularVariacion(0, 5, "Pesos").valor).toBe(0);
  });
});

describe("calcularEstadisticas", () => {
  it("calcula mínimo, máximo, promedio y variación del período", () => {
    const e = calcularEstadisticas(puntos([100, 110, 90, 120]), "Pesos");
    expect(e?.minimo).toBe(90);
    expect(e?.maximo).toBe(120);
    expect(e?.promedio).toBe(105);
    expect(e?.variacion.tipo).toBe("porcentaje");
    expect(e?.variacion.valor).toBeCloseTo(20);
  });

  it("devuelve null si no hay datos", () => {
    expect(calcularEstadisticas([], "Pesos")).toBeNull();
  });
});

describe("variacionUltima", () => {
  it("compara el último dato con el anterior", () => {
    const v = variacionUltima(puntos([100, 200, 210]), "Pesos");
    expect(v?.valor).toBeCloseTo(5);
  });

  it("devuelve null si hay menos de dos datos", () => {
    expect(variacionUltima(puntos([100]), "Pesos")).toBeNull();
    expect(variacionUltima([], "Pesos")).toBeNull();
  });
});

describe("hastaFecha", () => {
  it("descarta los puntos posteriores a la fecha", () => {
    const resultado = hastaFecha(
      puntos([1, 2, 3, 4]),
      "2026-01-02T12:00:00.000Z",
    );
    expect(resultado.map((p) => p.valor)).toEqual([1, 2]);
  });

  it("conserva todo si la fecha es posterior a los datos", () => {
    expect(hastaFecha(puntos([1, 2]), "2030-01-01T00:00:00.000Z")).toHaveLength(2);
  });
});
