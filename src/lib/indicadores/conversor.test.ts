import { describe, expect, it } from "vitest";
import { convertir, formatearMonto } from "./conversor";
import type { Tasas } from "./conversor";

const tasas: Tasas = { CLP: 1, UF: 40000, USD: 1000, EUR: 1100, UTM: 70000 };

describe("convertir", () => {
  it("convierte de una moneda a pesos", () => {
    expect(convertir(2, "UF", "CLP", tasas)).toBe(80000);
  });

  it("convierte de pesos a otra moneda", () => {
    expect(convertir(50000, "CLP", "USD", tasas)).toBe(50);
  });

  it("convierte entre dos monedas que no son pesos", () => {
    expect(convertir(1, "UF", "USD", tasas)).toBe(40);
  });

  it("devuelve el mismo monto si la moneda es la misma", () => {
    expect(convertir(123, "EUR", "EUR", tasas)).toBe(123);
  });
});

describe("formatearMonto", () => {
  it("muestra pesos sin decimales", () => {
    expect(formatearMonto(80000, "CLP")).toBe("80.000 CLP");
  });

  it("muestra otras monedas con dos decimales", () => {
    expect(formatearMonto(40.5, "USD")).toBe("40,50 USD");
  });

  it("permite elegir la cantidad de decimales", () => {
    expect(formatearMonto(41309.19, "CLP", 2)).toBe("41.309,19 CLP");
  });
});