import { AtSign, MessageCircle } from "lucide-react";
import { businessInfo } from "@/data/business";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#inicio" className="focus-ring rounded-md">
          <span className="block text-lg font-bold tracking-normal text-ink">
            {businessInfo.name}
          </span>
          <span className="block text-xs font-medium text-leaf">QR Menu</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 sm:flex">
          <a className="focus-ring rounded-md hover:text-ink" href="#menu">
            Menú
          </a>
          <a className="focus-ring rounded-md hover:text-ink" href="#contacto">
            Contacto
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={businessInfo.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir Instagram de Long Cha"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink/10 bg-white text-ink shadow-sm transition hover:border-plum/40 hover:text-plum"
          >
            <AtSign size={18} aria-hidden="true" />
          </a>
          <a
            href={createWhatsAppOrderLink()}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-md bg-leaf px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ink"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Ordenar</span>
          </a>
        </div>
      </div>
    </header>
  );
}
