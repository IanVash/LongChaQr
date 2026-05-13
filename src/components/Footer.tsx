import { businessInfo } from "@/data/business";

export function Footer() {
  return (
    <footer className="bg-ink py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-bold">{businessInfo.name}</p>
        <p className="text-white/65">
          Menú QR editable, listo para publicar en Vercel.
        </p>
      </div>
    </footer>
  );
}
