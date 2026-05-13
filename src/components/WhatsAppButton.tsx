import { MessageCircle } from "lucide-react";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={createWhatsAppOrderLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Ordenar por WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-leaf text-white shadow-lg shadow-leaf/25 transition hover:bg-ink"
    >
      <MessageCircle size={24} aria-hidden="true" />
    </a>
  );
}
