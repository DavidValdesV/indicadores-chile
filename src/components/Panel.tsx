import type { ReactNode } from "react";

type Props = {
  titulo: string;
  descripcion?: string;
  children: ReactNode;
};

export function Panel({ titulo, descripcion, children }: Props) {
  return (
    <section className="rounded-lg border border-line bg-surface p-4 sm:p-6">
      <h2 className="font-semibold">{titulo}</h2>
      {descripcion && (
        <p className="mt-1 max-w-prose text-sm text-muted">{descripcion}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}
