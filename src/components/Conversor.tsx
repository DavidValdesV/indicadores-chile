"use client";

import { useState } from "react";
import {
  convertir,
  formatearMonto,
  MONEDAS,
} from "@/lib/indicadores/conversor";
import type { Moneda, Tasas } from "@/lib/indicadores/conversor";

const campo =
  "mt-1 w-full rounded-md border border-line bg-background px-3 py-2 text-foreground transition-colors duration-150 hover:border-muted focus:border-accent";

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
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="block text-sm text-muted">
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
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 sm:w-[19rem]">
          <label className="block text-sm text-muted">
            De
            <select
              value={desde}
              onChange={(e) => setDesde(e.target.value as Moneda)}
              className={campo}
            >
              {MONEDAS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={intercambiar}
            aria-label="Intercambiar monedas"
            className="self-end rounded-md border border-line bg-background px-3 py-2 transition-[background-color,transform] duration-150 ease-out hover:border-muted active:scale-[0.97]"
          >
            ⇄
          </button>
          <label className="block text-sm text-muted">
            A
            <select
              value={hacia}
              onChange={(e) => setHacia(e.target.value as Moneda)}
              className={campo}
            >
              {MONEDAS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div
        className="mt-5 rounded-md border border-line bg-background p-4"
        aria-live="polite"
      >
        {valido ? (
          <>
            <p className="text-sm text-muted">
              {formatearMonto(numero, desde)} equivalen a
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
              {formatearMonto(convertir(numero, desde, hacia, tasas), hacia)}
            </p>
            <p className="mt-2 text-xs text-muted">
              Tasa del día: 1 {desde} ={" "}
              {formatearMonto(tasas[desde] / tasas[hacia], hacia, 2)}
            </p>
          </>
        ) : (
          <p className="text-muted">Ingresa un monto igual o mayor a 0.</p>
        )}
      </div>
    </div>
  );
}
