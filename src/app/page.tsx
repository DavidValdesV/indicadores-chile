import { Suspense } from "react";
import { getResumen } from "@/lib/indicadores/client";

async function Valores() {
  const resumen = await getResumen();
  return (
    <ul>
      <li>UF: {resumen.uf.valor}</li>
      <li>Dólar: {resumen.dolar.valor}</li>
      <li>UTM: {resumen.utm.valor}</li>
    </ul>
  );
}

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Indicadores Chile</h1>
      <Suspense fallback={<p>Cargando...</p>}>
        <Valores />
      </Suspense>
    </main>
  );
}