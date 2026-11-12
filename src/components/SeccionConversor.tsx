import { getResumen } from "@/lib/indicadores/client";
import { tasasDesdeResumen } from "@/lib/indicadores/conversor";
import { Conversor } from "./Conversor";

export async function SeccionConversor() {
  const resumen = await getResumen();
  return <Conversor tasas={tasasDesdeResumen(resumen)} />;
}

export function ConversorSkeleton() {
  return (
    <div className="h-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
  );
}