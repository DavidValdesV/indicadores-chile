import { getResumen, getSerie, getUltimos } from "@/lib/indicadores/client";
import { hastaFecha } from "@/lib/indicadores/estadisticas";
import { leerParametros } from "@/lib/indicadores/params";
import { CODIGOS } from "@/lib/indicadores/schema";
import type { Codigo, PuntoSerie } from "@/lib/indicadores/schema";
import { PanelGrafico } from "./PanelGrafico";
import { Pizarra } from "./Pizarra";

type Props = Pick<PageProps<"/">, "searchParams">;

export async function SeccionPrincipal({ searchParams }: Props) {
  // El año actual sale de la fecha que entrega la API, no de la hora del servidor
  const resumen = await getResumen();
  const anioActual = new Date(resumen.fecha).getUTCFullYear();

  const { codigo, anio } = leerParametros(await searchParams, anioActual);

  // Se piden en paralelo. Si falla la tendencia de un indicador, la fila se
  // muestra igual, sin su mini gráfico.
  const [serie, listaUltimos] = await Promise.all([
    getSerie(codigo, anio),
    Promise.all(
      CODIGOS.map((c) =>
        getUltimos(c)
          .then((s) => hastaFecha(s.serie, resumen.fecha))
          .catch(() => null),
      ),
    ),
  ]);

  const ultimos = Object.fromEntries(
    CODIGOS.map((c, i) => [c, listaUltimos[i]]),
  ) as Record<Codigo, PuntoSerie[] | null>;

  // La UF se publica con anticipación: no mostramos fechas posteriores a hoy
  const periodo = { ...serie, serie: hastaFecha(serie.serie, resumen.fecha) };
  const anios = Array.from({ length: 6 }, (_, i) => anioActual - i);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <Pizarra
        resumen={resumen}
        codigo={codigo}
        anio={anio}
        ultimos={ultimos}
      />
      <PanelGrafico
        serie={periodo}
        codigo={codigo}
        anio={anio}
        anios={anios}
      />
    </div>
  );
}

export function PrincipalSkeleton() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="h-[28rem] animate-pulse rounded-lg bg-line" />
      <div className="h-[28rem] animate-pulse rounded-lg bg-line" />
    </div>
  );
}
