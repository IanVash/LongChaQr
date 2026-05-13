import {
  MENU_CATEGORIES,
  type MenuCategory,
  type MenuProduct,
  type ProductPrices,
  type ProductTag
} from "@/data/menu";

const PRODUCT_TAGS = [
  "Popular",
  "Nuevo",
  "Promoción",
  "Recomendado"
] as const satisfies readonly ProductTag[];

const PRODUCT_SIZES = ["16oz", "22oz", "24oz"] as const;

type ProductPayload = Partial<Omit<MenuProduct, "prices">> & {
  prices?: Partial<Record<(typeof PRODUCT_SIZES)[number], unknown>>;
};

export function slugifyProductName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isMenuCategory(value: unknown): value is MenuCategory {
  return (
    typeof value === "string" && MENU_CATEGORIES.includes(value as MenuCategory)
  );
}

function isProductTag(value: unknown): value is ProductTag {
  return typeof value === "string" && PRODUCT_TAGS.includes(value as ProductTag);
}

function parsePrices(value: ProductPayload["prices"]): ProductPrices {
  const prices: ProductPrices = {};

  for (const size of PRODUCT_SIZES) {
    const rawPrice = value?.[size];

    if (rawPrice === undefined || rawPrice === null || rawPrice === "") {
      continue;
    }

    const price = Number(rawPrice);

    if (!Number.isFinite(price) || price < 0) {
      throw new Error(`Precio inválido para ${size}.`);
    }

    prices[size] = price;
  }

  return prices;
}

function parseToppings(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseProductPayload(payload: unknown, fallbackId?: string) {
  const value = payload as ProductPayload;

  if (!value || typeof value !== "object") {
    throw new Error("El producto enviado no es válido.");
  }

  if (!value.name || typeof value.name !== "string") {
    throw new Error("El nombre del producto es obligatorio.");
  }

  if (!isMenuCategory(value.category)) {
    throw new Error("La categoría del producto no es válida.");
  }

  const prices = parsePrices(value.prices);

  if (Object.keys(prices).length === 0) {
    throw new Error("Agrega al menos un precio.");
  }

  const id =
    fallbackId ||
    (typeof value.id === "string" && value.id.trim()
      ? slugifyProductName(value.id)
      : slugifyProductName(value.name));

  if (!id) {
    throw new Error("No se pudo generar un ID válido para el producto.");
  }

  return {
    id,
    name: value.name.trim(),
    category: value.category,
    description:
      typeof value.description === "string" ? value.description.trim() : "",
    image:
      typeof value.image === "string" && value.image.trim()
        ? value.image.trim()
        : "/images/placeholder-drink.svg",
    prices,
    toppings: parseToppings(value.toppings),
    available:
      typeof value.available === "boolean" ? value.available : Boolean(value.available),
    tag: isProductTag(value.tag) ? value.tag : undefined
  } satisfies MenuProduct;
}
