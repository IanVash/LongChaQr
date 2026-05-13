import type { MenuProduct } from "@/data/menu";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: MenuProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-ink/20 bg-white px-4 py-12 text-center">
        <h3 className="text-lg font-bold text-ink">
          No encontramos productos
        </h3>
        <p className="mt-2 text-sm text-ink/60">
          Prueba con otra categoría o busca por nombre.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
