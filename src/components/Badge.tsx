import type { ProductTag } from "@/data/menu";

const tagStyles: Record<ProductTag | "Agotado", string> = {
  Popular: "bg-plum text-white",
  Nuevo: "bg-leaf text-white",
  Promoción: "bg-ink text-white",
  Recomendado: "bg-tea text-ink",
  Agotado: "bg-zinc-200 text-zinc-700"
};

type BadgeProps = {
  label: ProductTag | "Agotado";
};

export function Badge({ label }: BadgeProps) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full px-3 py-1 text-xs font-semibold ${tagStyles[label]}`}
    >
      {label}
    </span>
  );
}
