import Link from "next/link";
import type { CSSProperties } from "react";
import {
  calcularVariacion,
  variacionUltima,
} from "@/lib/indicadores/estadisticas";
import { formatearValor } from "@/lib/indicadores/formato";
import { CODIGOS } from "@/lib/indicadores/schema";
import type { Codigo, PuntoSerie, Resumen } from "@/lib/indicadores/schema";
import { Sparkline } from "./Sparkline";
import { Variacion } from "./Variacion";

const ETIQUETAS: Record<Codigo, string> = {
  uf: "UF",
  dolar: "Dólar",
  euro: "Euro",
  utm: "UTM",
  ipc: "IPC",
  tpm: "TPM",
};

const DESCRIPCIONES: Record<Codigo, string> = {
  uf: "Unidad de fomento",
  dolar: "Dólar observado",
  euro: "Euro",
  utm: "Unidad tributaria mensual",
  ipc: "Inflación mensual",
  tpm: "Tasa de política monetaria",
};

type Props = {
  resumen: Resumen;
  codigo: Codigo;
  anio: number;
  // Últimos datos de cada indicador, o null si no se pudieron obtener
  ultimos: Record<Codigo, PuntoSerie[] | null>;
};

export function Pizarra({ resumen, codigo, anio, ultimos }: Props) {
  return (
    <nav
      aria-label="Indicadores"
      className="aparece overflow-hidden rounded-lg border border-line bg-surface"
    >
      <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-line px-4 py-2.5 text-xs text-muted sm:grid-cols-[1fr_auto_auto]">
        <span>Indicador</span>
        <span className="hidden w-20 sm:block">Tendencia</span>
        <span className="min-w-24 text-right">Valor</span>
      </div>

      <ul className="divide-y divide-line">
        {CODIGOS.map((c, i) => {
          const ind = resumen[c];
          const activo = c === codigo;
          const puntos = ultimos[c];
          const cambio = puntos ? variacionUltima(puntos, ind.unidad_medida) : null;
          const tendencia =
            puntos && puntos.length > 1
              ? calcularVariacion(
                  puntos[0].valor,
                  puntos[puntos.length - 1].valor,
                  ind.unidad_medida,
                ).valor
              : 0;
          const colorLinea =
            tendencia > 0 ? "text-up" : tendencia < 0 ? "text-down" : "text-muted";

          return (
            <li key={c}>
              <Link
                href={`/?indicador=${c}&anio=${anio}`}
                scroll={false}
                aria-current={activo ? "true" : undefined}
                className={`grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 transition-colors sm:grid-cols-[1fr_auto_auto] duration-150 hover:bg-accent/5 active:bg-accent/10 ${
                  activo ? "bg-accent/10 shadow-[inset_3px_0_0_var(--accent)]" : ""
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-semibold">{ETIQUETAS[c]}</span>
                  <span className="block truncate text-xs text-muted">
                    {DESCRIPCIONES[c]}
                  </span>
                </span>

                <span className="hidden w-20 sm:block">
                  {puntos && (
                    <Sparkline
                      valores={puntos.map((p) => p.valor)}
                      className={colorLinea}
                      indice={i}
                    />
                  )}
                </span>

                <span className="min-w-24 text-right">
                  <span className="block font-semibold tabular-nums">
                    {formatearValor(ind.valor, ind.unidad_medida)}
                  </span>
                  <span
                    className="block text-xs"
                    title="Variación respecto del dato anterior"
                    style={{ "--i": i } as CSSProperties}
                  >
                    {cambio ? (
                      <Variacion variacion={cambio} />
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
