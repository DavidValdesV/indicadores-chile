// Quita puntos, guiones y espacios, y pasa la K a mayúscula: "12.345.678-5" -> "123456785"
export function limpiarRut(texto: string): string {
  return texto.replace(/[.\-\s]/g, "").toUpperCase();
}

// Calcula el dígito verificador con el algoritmo módulo 11.
// Se multiplica cada dígito, de derecha a izquierda, por 2,3,4,5,6,7,2,3...
export function calcularDv(cuerpo: string): string {
  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resultado = 11 - (suma % 11);
  if (resultado === 11) return "0";
  if (resultado === 10) return "K";
  return String(resultado);
}

export type EstadoRut = "vacio" | "formato" | "verificador" | "valido";

// Distingue por qué un RUT no es válido, para dar un mensaje útil
export function evaluarRut(texto: string): EstadoRut {
  const limpio = limpiarRut(texto);
  if (limpio === "") return "vacio";
  if (!/^\d{7,8}[\dK]$/.test(limpio)) return "formato";
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  return calcularDv(cuerpo) === dv ? "valido" : "verificador";
}

// Un RUT es válido si tiene 7 u 8 dígitos más el verificador, y este coincide
export function validarRut(texto: string): boolean {
  return evaluarRut(texto) === "valido";
}

// Da formato al RUT: "123456785" -> "12.345.678-5"
export function formatearRut(texto: string): string {
  const limpio = limpiarRut(texto);
  if (limpio.length < 2) return limpio;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  return `${cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${dv}`;
}
