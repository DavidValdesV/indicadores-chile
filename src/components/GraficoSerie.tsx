"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatearFecha, formatearValor } from "@/lib/indicadores/formato";
import type { PuntoSerie } from "@/lib/indicadores/schema";

type Props = {
  puntos: PuntoSerie[];
  unidad: string;
};

export function GraficoSerie({ puntos, unidad }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={puntos}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="fecha"
          tickFormatter={formatearFecha}
          minTickGap={48}
        />
        <YAxis
          domain={["auto", "auto"]}
          width={80}
          tickFormatter={(v: number) => formatearValor(v, unidad)}
        />
        <Tooltip
          labelFormatter={(fecha) => formatearFecha(String(fecha))}
          formatter={(valor) => formatearValor(Number(valor), unidad)}
        />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#0284c7"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}