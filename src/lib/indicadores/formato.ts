// Formatea un valor según su unidad: "$41.309,19", "-0,2%" o "6,38"
export function formatearValor(valor: number, unidad: string): string {
  if (unidad === "Porcentaje") {
    return `${valor.toLocaleString("es-CL")}%`;
  }
  if (unidad === "Pesos") {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: Number.isInteger(valor) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }
  return valor.toLocaleString("es-CL");
}

// Formatea una fecha ISO como "11-11-2026". Usamos UTC para que no cambie el día.
export function formatearFecha(fechaISO: string): string {
  return new Date(fechaISO).toLocaleDateString("es-CL", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}