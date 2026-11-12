import { describe, expect, it } from "vitest";
import { formatearFecha, formatearValor } from "./formato";

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