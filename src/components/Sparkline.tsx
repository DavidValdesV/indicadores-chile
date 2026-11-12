import type { CSSProperties } from "react";

const ANCHO = 80;
const ALTO = 24;
const MARGEN = 2;

type Props = {
  valores: number[];
  // Clase de color del texto (la línea usa currentColor)
  className?: string;
  // Posición en la lista, para escalonar la animación de dibujo
  indice?: number;
};

// Mini gráfico de línea, sin ejes: solo muestra la forma de la tendencia
export function Sparkline({ valores, className = "", indice = 0 }: Props) {
  if (valores.length < 2) return null;

  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const rango = max - min || 1;

  const trazo = valores
    .map((v, i) => {
      const x = (i / (valores.length - 1)) * ANCHO;
      const y = MARGEN + (1 - (v - min) / rango) * (ALTO - MARGEN * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      preserveAspectRatio="none"
      className={`h-6 w-20 ${className}`}
    >
      <path
        d={trazo}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="linea-dibujo"
        style={{ "--i": indice } as CSSProperties}
      />
    </svg>
  );
}
