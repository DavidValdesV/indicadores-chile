import { getResumen } from "@/lib/indicadores/client";
import { formatearFecha, formatearValor } from "@/lib/indicadores/formato";

export async function TarjetasIndicadores() {
  const resumen = await getResumen();
  const indicadores = [
    resumen.uf,
    resumen.dolar,
    resumen.euro,
    resumen.utm,
    resumen.ipc,
    resumen.tpm,
  ];

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {indicadores.map((ind) => (
        <li
          key={ind.codigo}
          className="rounded-lg border border-slate-200 p-4 shadow-sm dark:border-slate-700"
        >
          <p className="text-sm text-slate-500">{ind.nombre}</p>
          <p className="mt-1 text-2xl font-semibold">
            {formatearValor(ind.valor, ind.unidad_medida)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {formatearFecha(ind.fecha)}
          </p>
        </li>
      ))}
    </ul>
  );
}

// Esqueleto que se muestra mientras llegan los datos
export function TarjetasSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="h-28 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
        />
      ))}
    </ul>
  );
}