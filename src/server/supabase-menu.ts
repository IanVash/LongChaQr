import type { SupabaseClient } from "@supabase/supabase-js";
import {
  MENU_CATEGORIES,
  type MenuCategory,
  type MenuProduct,
  type ProductPrices,
  type ProductTag
} from "@/data/menu";
import type { ProductFilters } from "./menu-repository";
import {
  createSupabaseAdminClient,
  getSupabaseConfig,
  isSupabaseConfigured
} from "./supabase";

type ProductRow = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  prices: ProductPrices;
  toppings: string[];
  available: boolean;
  tag: string | null;
  display_order: number | null;
};

function isMenuCategory(value: string): value is MenuCategory {
  return MENU_CATEGORIES.includes(value as MenuCategory);
}

function toMenuProduct(row: ProductRow): MenuProduct {
  return {
    id: row.id,
    name: row.name,
    category: isMenuCategory(row.category) ? row.category : "Milk Tea",
    description: row.description,
    image: row.image,
    prices: row.prices ?? {},
    toppings: row.toppings ?? [],
    available: row.available,
    tag: row.tag ? (row.tag as ProductTag) : undefined
  };
}

function buildProductsQuery(client: SupabaseClient, filters: ProductFilters = {}) {
  let query = client
    .from("products")
    .select(
      "id,name,category,description,image,prices,toppings,available,tag,display_order"
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.available !== undefined) {
    query = query.eq("available", filters.available);
  }

  if (filters.tag) {
    query = query.eq("tag", filters.tag);
  }

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  return query;
}

export async function listSupabaseProducts(filters: ProductFilters = {}) {
  const client = createSupabaseAdminClient();
  const { data, error } = await buildProductsQuery(client, filters);

  if (error) {
    throw new Error(error.message);
  }

  return (data as ProductRow[]).map(toMenuProduct);
}

export async function getSupabaseProductById(id: string) {
  const client = createSupabaseAdminClient();
  const { data, error } = await client
    .from("products")
    .select(
      "id,name,category,description,image,prices,toppings,available,tag,display_order"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? toMenuProduct(data as ProductRow) : null;
}

export async function upsertSupabaseProduct(product: MenuProduct) {
  const client = createSupabaseAdminClient();
  const { data, error } = await client
    .from("products")
    .upsert({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      image: product.image,
      prices: product.prices,
      toppings: product.toppings,
      available: product.available,
      tag: product.tag ?? null
    })
    .select(
      "id,name,category,description,image,prices,toppings,available,tag,display_order"
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return toMenuProduct(data as ProductRow);
}

export async function uploadSupabaseProductImage(productId: string, file: File) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase no está configurado.");
  }

  const config = getSupabaseConfig();
  const client = createSupabaseAdminClient();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeProductId = productId.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const path = `products/${safeProductId}-${Date.now()}.${extension}`;

  const { error } = await client.storage.from(config!.bucket).upload(path, file, {
    contentType: file.type || "image/jpeg",
    upsert: false
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = client.storage.from(config!.bucket).getPublicUrl(path);

  return {
    path,
    url: data.publicUrl
  };
}
