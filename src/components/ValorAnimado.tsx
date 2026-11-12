"use client";

import { useEffect, useRef, useState } from "react";
import { useMovimientoReducido } from "@/lib/useMovimientoReducido";

type Props = {
  valor: number;
  formato: (valor: number) => string;
  duracion?: number;
};

// Cuando el valor cambia, lo recorre desde el valor anterior hasta el nuevo.
// Es una transición corta: sirve para ver que el dato cambió, no para entretener.
export function ValorAnimado({ valor, formato, duracion = 350 }: Props) {
  const reducir = useMovimientoReducido();
  const [mostrado, setMostrado] = useState(valor);
  const actual = useRef(valor);

  useEffect(() => {
    if (reducir) return;

    const origen = actual.current;
    if (origen === valor) return;

    const inicio = performance.now();
    let cuadro = 0;

    const paso = (ahora: number) => {
      const progreso = Math.min(1, (ahora - inicio) / duracion);
      // ease-out fuerte: arranca rápido y se asienta al final
      const suavizado = 1 - Math.pow(1 - progreso, 4);
      const siguiente = origen + (valor - origen) * suavizado;
      actual.current = siguiente;
      setMostrado(siguiente);
      if (progreso < 1) cuadro = requestAnimationFrame(paso);
    };

    cuadro = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(cuadro);
  }, [valor, duracion, reducir]);

  return <>{formato(reducir ? valor : mostrado)}</>;
}
