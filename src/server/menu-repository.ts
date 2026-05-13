import { businessInfo } from "@/data/business";
import {
  MENU_CATEGORIES,
  menuProducts,
  type MenuCategory,
  type MenuProduct,
  type ProductTag
} from "@/data/menu";

export type ProductFilters = {
  category?: MenuCategory;
  search?: string;
  available?: boolean;
  tag?: ProductTag;
};

export type MenuRepository = {
  getBusinessInfo: () => Promise<typeof businessInfo>;
  listCategories: () => Promise<readonly MenuCategory[]>;
  listProducts: (filters?: ProductFilters) => Promise<MenuProduct[]>;
  getProductById: (id: string) => Promise<MenuProduct | null>;
};

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("es-SV");
}

function applyProductFilters(products: MenuProduct[], filters: ProductFilters) {
  const search = filters.search ? normalize(filters.search) : "";

  return products.filter((product) => {
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesAvailability =
      filters.available === undefined || product.available === filters.available;
    const matchesTag = !filters.tag || product.tag === filters.tag;
    const matchesSearch = !search || normalize(product.name).includes(search);

    return matchesCategory && matchesAvailability && matchesTag && matchesSearch;
  });
}

const localMenuRepository: MenuRepository = {
  async getBusinessInfo() {
    return businessInfo;
  },
  async listCategories() {
    return MENU_CATEGORIES;
  },
  async listProducts(filters = {}) {
    return applyProductFilters(menuProducts, filters);
  },
  async getProductById(id) {
    return menuProducts.find((product) => product.id === id) ?? null;
  }
};

export function getMenuRepository() {
  return localMenuRepository;
}
