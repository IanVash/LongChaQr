import { NextRequest, NextResponse } from "next/server";

export function getAdminAuthError(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      {
        error:
          "ADMIN_PASSWORD no está configurado. Agrégalo en Vercel Environment Variables."
      },
      { status: 503 }
    );
  }

  const providedPassword = request.headers.get("x-admin-password");

  if (providedPassword !== adminPassword) {
    return NextResponse.json(
      {
        error: "Contraseña de administrador inválida."
      },
      { status: 401 }
    );
  }

  return null;
}
