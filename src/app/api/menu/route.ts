import { NextResponse } from "next/server";
import { getMenuRepository } from "@/server/menu-repository";

export async function GET() {
  const repository = getMenuRepository();
  const [business, categories, products] = await Promise.all([
    repository.getBusinessInfo(),
    repository.listCategories(),
    repository.listProducts()
  ]);

  return NextResponse.json({
    business,
    categories,
    products,
    total: products.length
  });
}
