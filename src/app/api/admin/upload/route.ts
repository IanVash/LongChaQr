import { NextRequest, NextResponse } from "next/server";
import { getAdminAuthError } from "@/server/admin-auth";
import { uploadSupabaseProductImage } from "@/server/supabase-menu";
import { isSupabaseConfigured } from "@/server/supabase";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
];

export async function POST(request: NextRequest) {
  const authError = getAdminAuthError(request);

  if (authError) {
    return authError;
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Supabase no está configurado. Agrega SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY."
      },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const productId = String(formData.get("productId") || "product");
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Selecciona una imagen válida."
        },
        { status: 400 }
      );
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Formato no permitido. Usa JPG, PNG, WebP o GIF."
        },
        { status: 400 }
      );
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: "La imagen debe pesar menos de 4 MB."
        },
        { status: 400 }
      );
    }

    const uploadedImage = await uploadSupabaseProductImage(productId, file);

    return NextResponse.json(uploadedImage);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "No se pudo subir la imagen."
      },
      { status: 400 }
    );
  }
}
