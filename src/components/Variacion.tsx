import type { Variacion as DatosVariacion } from "@/lib/indicadores/estadisticas";
import { formatearVariacion } from "@/lib/indicadores/formato";

type Props = {
  variacion: DatosVariacion;
  className?: string;
};

// Muestra una variación con signo, flecha y color (verde sube, rojo baja).
// El signo y la flecha también la distinguen, así que el color no es la única pista.
export function Variacion({ variacion, className = "" }: Props) {
  const { valor, tipo } = variacion;
  // Se redondea igual que el texto mostrado para decidir el color
  const redondeado = Math.round(valor * 100) / 100;
  const color =
    redondeado > 0 ? "text-up" : redondeado < 0 ? "text-down" : "text-muted";

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium tabular-nums ${color} ${className}`}
    >
      {redondeado !== 0 && (
        <svg
          aria-hidden="true"
          viewBox="0 0 8 8"
          className={`h-2 w-2 ${redondeado < 0 ? "rotate-180" : ""}`}
          fill="currentColor"
        >
          <path d="M4 1 7.5 7h-7z" />
        </svg>
      )}
      {formatearVariacion(valor, tipo)}
    </span>
  );
}
