"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calcularVariacion } from "@/lib/indicadores/estadisticas";
import {
  formatearFecha,
  formatearFechaCorta,
  formatearValor,
} from "@/lib/indicadores/formato";
import type { PuntoSerie } from "@/lib/indicadores/schema";
import { useMovimientoReducido } from "@/lib/useMovimientoReducido";
import { ValorAnimado } from "./ValorAnimado";
import { Variacion } from "./Variacion";

type Props = {
  nombre: string;
  unidad: string;
  puntos: PuntoSerie[];
  // Selector de año, que se arma en el servidor
  acciones: ReactNode;
  // Mínimo, máximo y promedio, que se arman en el servidor
  estadisticas: ReactNode;
};

const textoEje = { fill: "var(--muted)", fontSize: 12 };

// Muestra el valor de la fecha sobre la que está el cursor, o el último del período
export function GraficoInteractivo({
  nombre,
  unidad,
  puntos,
  acciones,
  estadisticas,
}: Props) {
  const [indice, setIndice] = useState<number | null>(null);
  const reducir = useMovimientoReducido();
  const idRelleno = useId().replace(/:/g, "");

  const primero = puntos[0];
  const ultimo = puntos[puntos.length - 1];
  const activo = indice !== null ? (puntos[indice] ?? null) : null;
  const mostrado = activo ?? ultimo;
  const variacion = calcularVariacion(primero.valor, mostrado.valor, unidad);

  const alMover = (estado: {
    isTooltipActive: boolean;
    activeTooltipIndex: number | string | null | undefined;
  }) => {
    const nuevo =
      estado.isTooltipActive && estado.activeTooltipIndex != null
        ? Number(estado.activeTooltipIndex)
        : null;
    setIndice(nuevo);
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{nombre}</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
            {activo ? (
              formatearValor(activo.valor, unidad)
            ) : (
              <ValorAnimado
                valor={ultimo.valor}
                formato={(v) => formatearValor(v, unidad)}
              />
            )}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm">
            <Variacion variacion={variacion} />
            <span className="text-muted">
              desde el {formatearFechaCorta(primero.fecha)}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-muted">
            {activo ? "Valor al" : "Último valor al"}{" "}
            {formatearFecha(mostrado.fecha)}
          </p>
        </div>
        {acciones}
      </div>

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={puntos}
            margin={{ top: 8, right: 4, bottom: 0, left: 0 }}
            onMouseMove={alMover}
            onMouseLeave={() => setIndice(null)}
            onTouchMove={alMover}
            onTouchEnd={() => setIndice(null)}
          >
            <defs>
              <linearGradient id={idRelleno} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.22} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--line)" vertical={false} />
            <XAxis
              dataKey="fecha"
              tickFormatter={formatearFechaCorta}
              minTickGap={64}
              tickLine={false}
              axisLine={{ stroke: "var(--line)" }}
              tick={textoEje}
            />
            <YAxis
              domain={["auto", "auto"]}
              width={72}
              tickLine={false}
              axisLine={false}
              tick={textoEje}
              tickFormatter={(v: number) => formatearValor(v, unidad)}
            />
            {/* El valor se muestra arriba, no en una burbuja: aquí solo queda la guía */}
            <Tooltip
              content={() => null}
              cursor={{ stroke: "var(--muted)", strokeDasharray: "3 3" }}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="var(--accent)"
              strokeWidth={2}
              fill={`url(#${idRelleno})`}
              baseValue="dataMin"
              dot={false}
              activeDot={{
                r: 4.5,
                fill: "var(--accent)",
                stroke: "var(--surface)",
                strokeWidth: 2,
              }}
              isAnimationActive={!reducir}
              animationDuration={700}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 border-t border-line pt-4">{estadisticas}</div>
    </div>
  );
}
