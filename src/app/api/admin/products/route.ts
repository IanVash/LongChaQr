import { NextRequest, NextResponse } from "next/server";
import { getAdminAuthError } from "@/server/admin-auth";
import { parseProductPayload } from "@/server/product-validation";
import {
  listSupabaseProducts,
  upsertSupabaseProduct
} from "@/server/supabase-menu";
import { isSupabaseConfigured } from "@/server/supabase";

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

export async function GET(request: NextRequest) {
  const authError = getAdminAuthError(request);

  if (authError) {
    return authError;
  }

  const setupError = getSupabaseSetupError();

  if (setupError) {
    return setupError;
  }

  const products = await listSupabaseProducts();

  return NextResponse.json({
    products,
    total: products.length
  });
}

export async function POST(request: NextRequest) {
  const authError = getAdminAuthError(request);

  if (authError) {
    return authError;
  }

  const setupError = getSupabaseSetupError();

  if (setupError) {
    return setupError;
  }

  try {
    const product = parseProductPayload(await request.json());
    const savedProduct = await upsertSupabaseProduct(product);

    return NextResponse.json(
      {
        product: savedProduct
      },
      { status: 201 }
    );
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
