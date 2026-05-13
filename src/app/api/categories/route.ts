import { NextResponse } from "next/server";
import { getMenuRepository } from "@/server/menu-repository";

export async function GET() {
  const repository = getMenuRepository();
  const categories = await repository.listCategories();

  return NextResponse.json({
    categories,
    total: categories.length
  });
}
