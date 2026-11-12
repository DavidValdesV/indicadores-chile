import { Suspense } from "react";
import { Panel } from "@/components/Panel";
import {
  PrincipalSkeleton,
  SeccionPrincipal,
} from "@/components/SeccionPrincipal";
import {
  ConversorSkeleton,
  SeccionConversor,
} from "@/components/SeccionConversor";
import { ValidadorRut } from "@/components/ValidadorRut";

const enlace = "transition-colors duration-150 hover:text-foreground";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="flex items-center gap-2.5 whitespace-nowrap font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-white">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M15 7h6v6" />
              </svg>
            </span>
            Indicadores Chile
          </span>
          <nav
            aria-label="Enlaces"
            className="flex gap-4 whitespace-nowrap text-sm text-muted sm:gap-5"
          >
            <a
              href="https://mindicador.cl"
              target="_blank"
              rel="noopener noreferrer"
              className={enlace}
            >
              Fuente<span className="hidden sm:inline"> de los datos</span>
            </a>
            <a
              href="https://github.com/DavidValdesV/indicadores-chile"
              target="_blank"
              rel="noopener noreferrer"
              className={enlace}
            >
              Código
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="sr-only">Indicadores económicos de Chile</h1>

        <Suspense fallback={<PrincipalSkeleton />}>
          <SeccionPrincipal searchParams={searchParams} />
        </Suspense>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
          <Panel
            titulo="Conversor"
            descripcion="Convierte entre pesos, UF, dólar, euro y UTM con los valores del día."
          >
            <Suspense fallback={<ConversorSkeleton />}>
              <SeccionConversor />
            </Suspense>
          </Panel>

          <Panel
            titulo="Validador de RUT"
            descripcion="Comprueba el dígito verificador de un RUT chileno con el algoritmo módulo 11."
          >
            <ValidadorRut />
          </Panel>
        </div>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted sm:px-6">
          Los valores vienen de mindicador.cl y se actualizan cada hora.
        </p>
      </footer>
    </>
  );
}
