import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://long-cha.vercel.app"
  ),
  title: "LONG CHA | Menú QR Digital",
  description:
    "Menú QR digital de Long Cha: milk tea, iced coffee, refresh tea, smoothies, toppings y promociones.",
  keywords: [
    "Long Cha",
    "bubble tea",
    "milk tea",
    "iced coffee",
    "menu digital",
    "menu QR"
  ],
  openGraph: {
    title: "LONG CHA | Menú QR Digital",
    description: "Explora bebidas premium, toppings y promociones de Long Cha.",
    type: "website",
    images: ["/images/placeholder-drink.svg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF7EF"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
