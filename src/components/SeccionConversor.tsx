import { getResumen } from "@/lib/indicadores/client";
import { tasasDesdeResumen } from "@/lib/indicadores/conversor";
import { Conversor } from "./Conversor";

export async function SeccionConversor() {
  const resumen = await getResumen();
  return <Conversor tasas={tasasDesdeResumen(resumen)} />;
}

export function ConversorSkeleton() {
  return <div className="h-48 animate-pulse rounded-md bg-line" />;
}
