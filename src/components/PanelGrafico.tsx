import Link from "next/link";
import { calcularEstadisticas } from "@/lib/indicadores/estadisticas";
import { formatearValor } from "@/lib/indicadores/formato";
import type { Codigo, Serie } from "@/lib/indicadores/schema";
import { GraficoInteractivo } from "./GraficoInteractivo";

type Props = {
  serie: Serie;
  codigo: Codigo;
  anio: number;
  anios: number[];
};

export function PanelGrafico({ serie, codigo, anio, anios }: Props) {
  const stats = calcularEstadisticas(serie.serie, serie.unidad_medida);
  const datos = stats
    ? [
        {
          etiqueta: "Mínimo",
          valor: formatearValor(stats.minimo, serie.unidad_medida),
        },
        {
          etiqueta: "Máximo",
          valor: formatearValor(stats.maximo, serie.unidad_medida),
        },
        {
          etiqueta: "Promedio",
          valor: formatearValor(stats.promedio, serie.unidad_medida),
        },
      ]
    : [];

  const selectorAnio = (
    <nav
      aria-label="Año"
      className="inline-flex max-w-full gap-0.5 overflow-x-auto rounded-md border border-line bg-background p-0.5 [scrollbar-width:none]"
    >
      {anios.map((a) => (
        <Link
          key={a}
          href={`/?indicador=${codigo}&anio=${a}`}
          scroll={false}
          aria-current={a === anio ? "true" : undefined}
          className={`rounded px-1.5 py-1 text-sm tabular-nums sm:px-2.5 transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] ${
            a === anio
              ? "bg-accent/15 font-medium text-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          {a}
        </Link>
      ))}
    </nav>
  );

  return (
    <section
      aria-label={`Historial de ${serie.nombre}`}
      className="aparece rounded-lg border border-line bg-surface p-4 sm:p-6"
      style={{ animationDelay: "80ms" }}
    >
      {stats ? (
        <GraficoInteractivo
          nombre={serie.nombre}
          unidad={serie.unidad_medida}
          puntos={serie.serie}
          acciones={selectorAnio}
          estadisticas={
            <dl className="grid grid-cols-3 gap-4">
              {datos.map((d) => (
                <Dato key={d.etiqueta} etiqueta={d.etiqueta} valor={d.valor} />
              ))}
            </dl>
          }
        />
      ) : (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-semibold">{serie.nombre}</h2>
            {selectorAnio}
          </div>
          <p className="mt-6 text-muted">
            No hay datos de {serie.nombre} para {anio}. Prueba con otro año.
          </p>
        </div>
      )}
    </section>
  );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{etiqueta}</dt>
      <dd className="mt-0.5 text-base font-semibold tabular-nums">{valor}</dd>
    </div>
  );
}
