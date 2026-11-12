"use client";

import { useState } from "react";
import { evaluarRut, formatearRut } from "@/lib/rut";

export function ValidadorRut() {
  const [texto, setTexto] = useState("");
  const estado = evaluarRut(texto);

  return (
    <div>
      <label className="block text-sm text-muted">
        RUT
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="12.345.678-5"
          autoComplete="off"
          className="mt-1 w-full rounded-md border border-line bg-background px-3 py-2 text-foreground transition-colors duration-150 hover:border-muted focus:border-accent"
        />
      </label>

      <div
        aria-live="polite"
        className="mt-5 flex min-h-[5.75rem] items-center rounded-md border border-line bg-background p-4"
      >
        <p
          className={
            estado === "valido"
              ? "font-medium text-up"
              : estado === "verificador"
                ? "font-medium text-down"
                : "text-muted"
          }
        >
          {estado === "vacio" && "Puedes escribirlo con o sin puntos y guion."}
          {estado === "formato" &&
            "Un RUT tiene 7 u 8 dígitos y un dígito verificador."}
          {estado === "verificador" &&
            "El dígito verificador no coincide con el número."}
          {estado === "valido" && (
            <>
              RUT válido:{" "}
              <span className="tabular-nums">{formatearRut(texto)}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
