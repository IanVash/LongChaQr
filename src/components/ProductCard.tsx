"use client";

import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { MenuProduct } from "@/data/menu";
import { formatCurrency } from "@/lib/format";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";
import { Badge } from "./Badge";

const PLACEHOLDER_IMAGE = "/images/placeholder-drink.svg";

type ProductCardProps = {
  product: MenuProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const [imageSrc, setImageSrc] = useState(product.image || PLACEHOLDER_IMAGE);
  const prices = Object.entries(product.prices);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-soft transition duration-300 ${
        product.available
          ? "border-ink/10 hover:-translate-y-1 hover:border-leaf/30"
          : "border-zinc-200 opacity-75 grayscale"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-leaf-soft">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          onError={() => setImageSrc(PLACEHOLDER_IMAGE)}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {!product.available ? <Badge label="Agotado" /> : null}
          {product.tag && product.available ? <Badge label={product.tag} /> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-normal text-leaf">
            {product.category}
          </p>
          <h3 className="mt-1 text-xl font-bold leading-snug text-ink">
            {product.name}
          </h3>
          <p className="mt-2 min-h-16 text-sm leading-6 text-ink/65">
            {product.description}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {prices.map(([size, price]) => (
            <div
              key={size}
              className="rounded-md border border-ink/10 bg-cream px-3 py-2"
            >
              <p className="text-xs font-semibold text-ink/50">{size}</p>
              <p className="text-lg font-bold text-ink">
                {formatCurrency(price)}
              </p>
            </div>
          ))}
        </div>

        {product.toppings.length > 0 ? (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-normal text-ink/45">
              Toppings recomendados
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.toppings.map((topping) => (
                <span
                  key={topping}
                  className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-medium text-leaf"
                >
                  {topping}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-auto pt-5">
          {product.available ? (
            <a
              href={createWhatsAppOrderLink(product.name)}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-leaf px-4 text-sm font-semibold text-white transition hover:bg-ink"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Ordenar
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="min-h-11 w-full cursor-not-allowed rounded-md bg-zinc-200 px-4 text-sm font-semibold text-zinc-600"
            >
              Agotado
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
