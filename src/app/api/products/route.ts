import { NextRequest, NextResponse } from "next/server";
import { getMenuRepository } from "@/server/menu-repository";
import { parseProductFilters } from "@/server/menu-query";

export async function GET(request: NextRequest) {
  const parsed = parseProductFilters(request.nextUrl.searchParams);

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.message }, { status: 400 });
  }

  const repository = getMenuRepository();
  const products = await repository.listProducts(parsed.filters);

  return NextResponse.json({
    products,
    total: products.length,
    filters: parsed.filters
  });
}
