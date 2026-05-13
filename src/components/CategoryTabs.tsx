import type { MenuCategory } from "@/data/menu";

type CategoryTabsProps = {
  categories: readonly MenuCategory[];
  selectedCategory: MenuCategory | "Todos";
  onSelectCategory: (category: MenuCategory | "Todos") => void;
};

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryTabsProps) {
  const allCategories = ["Todos", ...categories] as const;

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2"
      role="tablist"
      aria-label="Categorías del menú"
    >
      {allCategories.map((category) => {
        const active = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelectCategory(category)}
            className={`focus-ring min-h-10 shrink-0 rounded-md border px-4 text-sm font-semibold transition ${
              active
                ? "border-ink bg-ink text-white"
                : "border-ink/10 bg-white text-ink/70 hover:border-leaf/50 hover:text-ink"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
