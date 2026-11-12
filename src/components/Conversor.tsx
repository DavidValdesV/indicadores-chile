"use client";

import { useState } from "react";
import {
  convertir,
  formatearMonto,
  MONEDAS,
} from "@/lib/indicadores/conversor";
import type { Moneda, Tasas } from "@/lib/indicadores/conversor";

const campo =
  "w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600";

export function Conversor({ tasas }: { tasas: Tasas }) {
  const [monto, setMonto] = useState("1");
  const [desde, setDesde] = useState<Moneda>("UF");
  const [hacia, setHacia] = useState<Moneda>("CLP");

  const numero = Number(monto);
  const valido = monto.trim() !== "" && Number.isFinite(numero) && numero >= 0;

  function intercambiar() {
    setDesde(hacia);
    setHacia(desde);
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
        <label className="block text-sm">
          Monto
          <input
            type="number"
            min="0"
            step="any"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className={campo}
          />
        </label>
        <label className="block text-sm">
          De
          <select
            value={desde}
            onChange={(e) => setDesde(e.target.value as Moneda)}
            className={campo}
          >
            {MONEDAS.map((m) => (
              <option key={m} value={m} className="text-black">
                {m}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={intercambiar}
          aria-label="Intercambiar monedas"
          className="self-end rounded-md border border-slate-300 px-3 py-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          ⇄
        </button>
        <label className="block text-sm">
          A
          <select
            value={hacia}
            onChange={(e) => setHacia(e.target.value as Moneda)}
            className={campo}
          >
            {MONEDAS.map((m) => (
              <option key={m} value={m} className="text-black">
                {m}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-2xl font-semibold" aria-live="polite">
        {valido
          ? `${formatearMonto(numero, desde)} = ${formatearMonto(
              convertir(numero, desde, hacia, tasas),
              hacia,
            )}`
          : "Ingresa un monto válido"}
      </p>
    </div>
  );
}