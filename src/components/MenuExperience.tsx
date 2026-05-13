"use client";

import { useMemo, useState } from "react";
import type { MenuCategory, MenuProduct } from "@/data/menu";
import { CategoryTabs } from "./CategoryTabs";
import { ProductGrid } from "./ProductGrid";
import { SearchBar } from "./SearchBar";

type MenuExperienceProps = {
  categories: readonly MenuCategory[];
  products: MenuProduct[];
};

export function MenuExperience({ categories, products }: MenuExperienceProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "Todos">(
    "Todos"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <section id="menu" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-leaf">
              Menú
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal text-ink sm:text-4xl">
              Bebidas y toppings
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink/60">
            Filtra por categoría o busca tu bebida favorita antes de ordenar.
          </p>
        </div>

        <div className="mb-5 grid gap-3 lg:grid-cols-[360px_1fr] lg:items-start">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  );
}
