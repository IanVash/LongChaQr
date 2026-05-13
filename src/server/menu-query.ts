import { MENU_CATEGORIES, type MenuCategory, type ProductTag } from "@/data/menu";
import type { ProductFilters } from "./menu-repository";

const PRODUCT_TAGS = [
  "Popular",
  "Nuevo",
  "Promoción",
  "Recomendado"
] as const satisfies readonly ProductTag[];

type ParseResult =
  | {
      ok: true;
      filters: ProductFilters;
    }
  | {
      ok: false;
      message: string;
    };

function isMenuCategory(value: string): value is MenuCategory {
  return MENU_CATEGORIES.includes(value as MenuCategory);
}

function isProductTag(value: string): value is ProductTag {
  return PRODUCT_TAGS.includes(value as ProductTag);
}

function parseAvailability(value: string | null) {
  if (value === null) {
    return undefined;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return null;
}

export function parseProductFilters(searchParams: URLSearchParams): ParseResult {
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const available = parseAvailability(searchParams.get("available"));
  let parsedCategory: MenuCategory | undefined;
  let parsedTag: ProductTag | undefined;

  if (category) {
    if (!isMenuCategory(category)) {
      return { ok: false, message: `Categoría inválida: ${category}` };
    }

    parsedCategory = category;
  }

  if (tag) {
    if (!isProductTag(tag)) {
      return { ok: false, message: `Etiqueta inválida: ${tag}` };
    }

    parsedTag = tag;
  }

  if (available === null) {
    return { ok: false, message: "El filtro available debe ser true o false" };
  }

  return {
    ok: true,
    filters: {
      category: parsedCategory,
      search: searchParams.get("search") || undefined,
      available,
      tag: parsedTag
    }
  };
}
