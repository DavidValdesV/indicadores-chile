import { Suspense } from "react";
import {
  TarjetasIndicadores,
  TarjetasSkeleton,
} from "@/components/TarjetasIndicadores";
import {
  GraficoSkeleton,
  SeccionGrafico,
} from "@/components/SeccionGrafico";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Indicadores Chile</h1>
      <Suspense fallback={<TarjetasSkeleton />}>
        <TarjetasIndicadores />
      </Suspense>
      <Suspense fallback={<GraficoSkeleton />}>
        <SeccionGrafico searchParams={searchParams} />
      </Suspense>
    </main>
  );
}