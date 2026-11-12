import { Suspense } from "react";
import {
  TarjetasIndicadores,
  TarjetasSkeleton,
} from "@/components/TarjetasIndicadores";
import {
  GraficoSkeleton,
  SeccionGrafico,
} from "@/components/SeccionGrafico";
import {
  ConversorSkeleton,
  SeccionConversor,
} from "@/components/SeccionConversor";
import { ValidadorRut } from "@/components/ValidadorRut";

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

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">Conversor</h2>
        <Suspense fallback={<ConversorSkeleton />}>
          <SeccionConversor />
        </Suspense>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">Validador de RUT</h2>
        <ValidadorRut />
      </section>
    </main>
  );
}