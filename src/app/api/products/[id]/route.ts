import { NextRequest, NextResponse } from "next/server";
import { getMenuRepository } from "@/server/menu-repository";

type ProductRouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: ProductRouteParams) {
  const { id } = await params;
  const repository = getMenuRepository();
  const product = await repository.getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
