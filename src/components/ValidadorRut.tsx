"use client";

import { useState } from "react";
import { formatearRut, validarRut } from "@/lib/rut";

export function ValidadorRut() {
  const [texto, setTexto] = useState("");
  const hayTexto = texto.trim() !== "";
  const valido = validarRut(texto);

  return (
    <div className="space-y-2">
      <label className="block text-sm">
        RUT
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="12.345.678-5"
          className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-600"
        />
      </label>
      {hayTexto && (
        <p
          aria-live="polite"
          className={valido ? "text-green-500" : "text-red-500"}
        >
          {valido ? `RUT válido: ${formatearRut(texto)}` : "RUT inválido"}
        </p>
      )}
    </div>
  );
}