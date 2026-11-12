import { describe, expect, it } from "vitest";
import { calcularDv, formatearRut, limpiarRut, validarRut } from "./rut";

describe("limpiarRut", () => {
  it("quita puntos, guiones y espacios, y pasa la K a mayúscula", () => {
    expect(limpiarRut("12.345.678-5")).toBe("123456785");
    expect(limpiarRut(" 10.000.013-k ")).toBe("10000013K");
  });
});

describe("calcularDv", () => {
  it("calcula dígitos numéricos", () => {
    expect(calcularDv("12345678")).toBe("5");
    expect(calcularDv("11111111")).toBe("1");
  });

  it("calcula el dígito 0", () => {
    expect(calcularDv("10000004")).toBe("0");
  });

  it("calcula el dígito K", () => {
    expect(calcularDv("10000013")).toBe("K");
  });
});

describe("validarRut", () => {
  it("acepta RUT válidos con y sin formato", () => {
    expect(validarRut("12.345.678-5")).toBe(true);
    expect(validarRut("123456785")).toBe(true);
    expect(validarRut("10.000.013-K")).toBe(true);
    expect(validarRut("10.000.013-k")).toBe(true);
    expect(validarRut("10.000.004-0")).toBe(true);
  });

  it("rechaza un dígito verificador incorrecto", () => {
    expect(validarRut("12.345.678-9")).toBe(false);
  });

  it("rechaza textos que no tienen forma de RUT", () => {
    expect(validarRut("")).toBe(false);
    expect(validarRut("abc")).toBe(false);
    expect(validarRut("1-9")).toBe(false);
    expect(validarRut("123456789012")).toBe(false);
  });
});

describe("formatearRut", () => {
  it("agrega puntos y guion", () => {
    expect(formatearRut("123456785")).toBe("12.345.678-5");
    expect(formatearRut("10000013k")).toBe("10.000.013-K");
  });

  it("devuelve el texto tal cual si es muy corto", () => {
    expect(formatearRut("1")).toBe("1");
  });
});