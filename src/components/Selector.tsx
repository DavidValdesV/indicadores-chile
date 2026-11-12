import Link from "next/link";
import { CODIGOS } from "@/lib/indicadores/schema";
import type { Codigo } from "@/lib/indicadores/schema";

const ETIQUETAS: Record<Codigo, string> = {
  uf: "UF",
  dolar: "Dólar",
  euro: "Euro",
  utm: "UTM",
  ipc: "IPC",
  tpm: "TPM",
};

function clase(activo: boolean) {
  const base = "rounded-full border px-3 py-1 text-sm transition-colors";
  return activo
    ? `${base} border-sky-600 bg-sky-600 text-white`
    : `${base} border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800`;
}

type Props = {
  codigo: Codigo;
  anio: number;
  anios: number[];
};

export function Selector({ codigo, anio, anios }: Props) {
  return (
    <div className="space-y-3">
      <nav aria-label="Indicador" className="flex flex-wrap gap-2">
        {CODIGOS.map((c) => (
          <Link
            key={c}
            href={`/?indicador=${c}&anio=${anio}`}
            className={clase(c === codigo)}
            aria-current={c === codigo ? "page" : undefined}
          >
            {ETIQUETAS[c]}
          </Link>
        ))}
      </nav>
      <nav aria-label="Año" className="flex flex-wrap gap-2">
        {anios.map((a) => (
          <Link
            key={a}
            href={`/?indicador=${codigo}&anio=${a}`}
            className={clase(a === anio)}
            aria-current={a === anio ? "page" : undefined}
          >
            {a}
          </Link>
        ))}
      </nav>
    </div>
  );
}