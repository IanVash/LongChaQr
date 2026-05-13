import { AtSign, Clock, MapPin, MessageCircle } from "lucide-react";
import { businessInfo } from "@/data/business";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";

export function ContactSection() {
  return (
    <section id="contacto" className="border-y border-ink/10 bg-cream py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-normal text-leaf">
            Contacto
          </p>
          <h2 className="mt-2 text-3xl font-bold text-ink">
            Estamos listos para tu orden
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={createWhatsAppOrderLink()}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-lg border border-ink/10 bg-white p-4 shadow-sm transition hover:border-leaf/40"
          >
            <MessageCircle className="mb-3 text-leaf" size={22} />
            <p className="font-bold text-ink">WhatsApp</p>
            <p className="mt-1 text-sm text-ink/60">
              {businessInfo.whatsappLabel}
            </p>
          </a>

          <a
            href={businessInfo.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-lg border border-ink/10 bg-white p-4 shadow-sm transition hover:border-plum/40"
          >
            <AtSign className="mb-3 text-plum" size={22} />
            <p className="font-bold text-ink">Instagram</p>
            <p className="mt-1 text-sm text-ink/60">
              {businessInfo.instagramHandle}
            </p>
          </a>

          <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-sm">
            <Clock className="mb-3 text-leaf" size={22} />
            <p className="font-bold text-ink">Horario</p>
            <p className="mt-1 text-sm leading-6 text-ink/60">
              {businessInfo.hours}
            </p>
          </div>

          <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-sm">
            <MapPin className="mb-3 text-plum" size={22} />
            <p className="font-bold text-ink">Ubicación</p>
            <p className="mt-1 text-sm leading-6 text-ink/60">
              {businessInfo.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
