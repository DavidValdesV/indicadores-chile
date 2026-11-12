import { describe, expect, it } from "vitest";
import { leerParametros } from "./params";

describe("leerParametros", () => {
  it("usa UF y el año por defecto cuando no hay parámetros", () => {
    expect(leerParametros({}, 2026)).toEqual({ codigo: "uf", anio: 2026 });
  });

  it("lee un indicador y un año válidos", () => {
    expect(leerParametros({ indicador: "dolar", anio: "2024" }, 2026)).toEqual({
      codigo: "dolar",
      anio: 2024,
    });
  });

  it("vuelve a UF si el indicador no existe", () => {
    expect(leerParametros({ indicador: "bitcoin" }, 2026).codigo).toBe("uf");
  });

  it("usa el año por defecto si el año no es válido", () => {
    expect(leerParametros({ anio: "abc" }, 2026).anio).toBe(2026);
    expect(leerParametros({ anio: "1800" }, 2026).anio).toBe(2026);
    expect(leerParametros({ anio: "" }, 2026).anio).toBe(2026);
  });

  it("toma el primer valor si el parámetro viene repetido", () => {
    expect(
      leerParametros({ indicador: ["euro", "utm"], anio: ["2023", "2020"] }, 2026),
    ).toEqual({ codigo: "euro", anio: 2023 });
  });
});