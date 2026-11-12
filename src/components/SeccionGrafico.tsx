import { getResumen, getSerie } from "@/lib/indicadores/client";
import { leerParametros } from "@/lib/indicadores/params";
import { GraficoSerie } from "./GraficoSerie";
import { Selector } from "./Selector";

type Props = Pick<PageProps<"/">, "searchParams">;

export async function SeccionGrafico({ searchParams }: Props) {
  // El año actual sale de la fecha que entrega la API, no de la hora del servidor
  const resumen = await getResumen();
  const anioActual = new Date(resumen.fecha).getUTCFullYear();

  const { codigo, anio } = leerParametros(await searchParams, anioActual);
  const serie = await getSerie(codigo, anio);
  const anios = Array.from({ length: 6 }, (_, i) => anioActual - i);

  return (
    <section className="mt-8 space-y-4">
      <Selector codigo={codigo} anio={anio} anios={anios} />
      <h2 className="text-lg font-semibold">
        {serie.nombre} — {anio}
      </h2>
      {serie.serie.length === 0 ? (
        <p className="text-slate-500">No hay datos para este año.</p>
      ) : (
        <GraficoSerie puntos={serie.serie} unidad={serie.unidad_medida} />
      )}
    </section>
  );
}

export function GraficoSkeleton() {
  return (
    <div className="mt-8 h-80 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  );
}