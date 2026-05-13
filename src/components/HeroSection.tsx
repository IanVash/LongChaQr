import { ArrowDown, AtSign, MessageCircle } from "lucide-react";
import Image from "next/image";
import { businessInfo } from "@/data/business";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-ink/10 bg-paper-texture"
    >
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 px-4 py-10 sm:min-h-[680px] sm:grid-cols-[1.05fr_0.95fr] sm:py-14 lg:gap-14">
        <div className="animate-fade-up">
          <p className="mb-3 text-sm font-semibold uppercase tracking-normal text-leaf">
            Menú QR digital
          </p>
          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-normal text-ink sm:text-6xl">
            LONG CHA
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink/70">
            {businessInfo.welcome} Elige tu bebida favorita y ordena por
            WhatsApp en segundos.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#menu"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-leaf"
            >
              Ver menú
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a
              href={createWhatsAppOrderLink()}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-leaf/30 bg-white px-5 text-sm font-semibold text-leaf shadow-sm transition hover:border-leaf hover:bg-leaf-soft"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Ordenar por WhatsApp
            </a>
            <a
              href={businessInfo.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-plum/25 bg-white px-5 text-sm font-semibold text-plum shadow-sm transition hover:border-plum hover:bg-white"
            >
              <AtSign size={18} aria-hidden="true" />
              {businessInfo.instagramHandle}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-fade-up sm:max-w-md">
          <div className="absolute inset-x-8 bottom-0 h-10 rounded-full bg-ink/12 blur-2xl" />
          <Image
            src="/images/placeholder-drink.svg"
            alt="Bebida premium Long Cha"
            width={360}
            height={450}
            priority
            className="relative mx-auto aspect-[4/5] w-full max-w-[360px] object-contain drop-shadow-2xl"
          />
          <div className="mx-auto mt-4 grid max-w-[360px] grid-cols-3 gap-2 text-center text-xs font-semibold text-ink/70">
            <span className="rounded-md bg-white/85 px-2 py-2 shadow-sm">
              Milk Tea
            </span>
            <span className="rounded-md bg-white/85 px-2 py-2 shadow-sm">
              Coffee
            </span>
            <span className="rounded-md bg-white/85 px-2 py-2 shadow-sm">
              Refresh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
