import { getResumen, getSerie } from "@/lib/indicadores/client";
import { GraficoSerie } from "./GraficoSerie";

export async function SeccionGrafico() {
  // Sacamos el año de la fecha que entrega la API, no de la hora actual
  const resumen = await getResumen();
  const anio = new Date(resumen.fecha).getUTCFullYear();
  const serie = await getSerie("uf", anio);

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-lg font-semibold">
        {serie.nombre} — {anio}
      </h2>
      <GraficoSerie puntos={serie.serie} unidad={serie.unidad_medida} />
    </section>
  );
}

export function GraficoSkeleton() {
  return (
    <div className="mt-8 h-80 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  );
}