import { NextRequest, NextResponse } from "next/server";
import { getAdminAuthError } from "@/server/admin-auth";
import { parseProductPayload } from "@/server/product-validation";
import { getSupabaseProductById, upsertSupabaseProduct } from "@/server/supabase-menu";
import { isSupabaseConfigured } from "@/server/supabase";

type ProductRouteParams = {
  params: Promise<{
    id: string;
  }>;
};

function getSupabaseSetupError() {
  if (isSupabaseConfigured()) {
    return null;
  }

  return NextResponse.json(
    {
      error:
        "Supabase no está configurado. Agrega SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY."
    },
    { status: 503 }
  );
}

export async function GET(request: NextRequest, { params }: ProductRouteParams) {
  const authError = getAdminAuthError(request);

  if (authError) {
    return authError;
  }

  const setupError = getSupabaseSetupError();

  if (setupError) {
    return setupError;
  }

  const { id } = await params;
  const product = await getSupabaseProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(request: NextRequest, { params }: ProductRouteParams) {
  const authError = getAdminAuthError(request);

  if (authError) {
    return authError;
  }

  const setupError = getSupabaseSetupError();

  if (setupError) {
    return setupError;
  }

  try {
    const { id } = await params;
    const product = parseProductPayload(await request.json(), id);
    const savedProduct = await upsertSupabaseProduct(product);

    return NextResponse.json({
      product: savedProduct
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "No se pudo guardar el producto."
      },
      { status: 400 }
    );
  }
}
