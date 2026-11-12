import { describe, expect, it } from "vitest";
import {
  formatearFecha,
  formatearFechaCorta,
  formatearValor,
  formatearVariacion,
} from "./formato";

describe("formatearValor", () => {
  it("formatea porcentajes", () => {
    expect(formatearValor(4.5, "Porcentaje")).toBe("4,5%");
  });

  it("formatea pesos sin decimales cuando el valor es entero", () => {
    expect(formatearValor(72440, "Pesos")).toContain("72.440");
  });

  it("formatea pesos con decimales cuando corresponde", () => {
    expect(formatearValor(41309.19, "Pesos")).toContain("41.309,19");
  });
});

describe("formatearFecha", () => {
  it("formatea una fecha ISO sin cambiar el día", () => {
    expect(formatearFecha("2026-11-11T03:00:00.000Z")).toBe("11-11-2026");
  });
});

describe("formatearFechaCorta", () => {
  it("muestra día y mes abreviado sin cambiar el día", () => {
    expect(formatearFechaCorta("2026-01-15T03:00:00.000Z")).toBe("15 ene");
  });
});

describe("formatearVariacion", () => {
  it("formatea variaciones porcentuales con signo", () => {
    expect(formatearVariacion(4.213, "porcentaje")).toBe("+4,21%");
    expect(formatearVariacion(-10, "porcentaje")).toBe("-10,00%");
  });

  it("formatea puntos porcentuales", () => {
    expect(formatearVariacion(-0.8, "puntos")).toBe("-0,80 pp");
  });

  it("no pone signo cuando no hay variación", () => {
    expect(formatearVariacion(0, "porcentaje")).toBe("0,00%");
  });
});
