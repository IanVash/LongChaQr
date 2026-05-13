"use client";

/* eslint-disable @next/next/no-img-element */

import {
  AlertCircle,
  CheckCircle2,
  ImageIcon,
  LockKeyhole,
  Plus,
  RefreshCw,
  Save,
  Upload
} from "lucide-react";
import { FormEvent, useState } from "react";
import {
  MENU_CATEGORIES,
  type MenuCategory,
  type MenuProduct,
  type ProductTag
} from "@/data/menu";

const PRODUCT_TAGS: Array<ProductTag | ""> = [
  "",
  "Popular",
  "Nuevo",
  "Promoción",
  "Recomendado"
];

const PRODUCT_SIZES = ["16oz", "22oz", "24oz"] as const;
const SESSION_PASSWORD_KEY = "long-cha-admin-password";

type ProductSize = (typeof PRODUCT_SIZES)[number];

type ProductDraft = Omit<MenuProduct, "prices" | "tag"> & {
  prices: Record<ProductSize, string>;
  tag: ProductTag | "";
};

function createEmptyDraft(): ProductDraft {
  return {
    id: "",
    name: "",
    category: "Milk Tea",
    description: "",
    image: "/images/placeholder-drink.svg",
    prices: {
      "16oz": "",
      "22oz": "",
      "24oz": ""
    },
    toppings: [],
    available: true,
    tag: ""
  };
}

function toDraft(product: MenuProduct): ProductDraft {
  return {
    ...product,
    prices: {
      "16oz": product.prices["16oz"]?.toString() ?? "",
      "22oz": product.prices["22oz"]?.toString() ?? "",
      "24oz": product.prices["24oz"]?.toString() ?? ""
    },
    tag: product.tag ?? ""
  };
}

function toPayload(draft: ProductDraft) {
  return {
    ...draft,
    prices: draft.prices,
    toppings: draft.toppings.map((topping) => topping.trim()).filter(Boolean),
    tag: draft.tag || undefined
  };
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminMenuManager() {
  const [password, setPassword] = useState(() =>
    typeof window === "undefined"
      ? ""
      : sessionStorage.getItem(SESSION_PASSWORD_KEY) ?? ""
  );
  const [unlocked, setUnlocked] = useState(false);
  const [products, setProducts] = useState<MenuProduct[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProductDraft>(createEmptyDraft);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadProducts(nextPassword = password) {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/products", {
        headers: {
          "x-admin-password": nextPassword
        }
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "No se pudo cargar el menú.");
      }

      setProducts(payload.products);
      setUnlocked(true);
      setPassword(nextPassword);
      sessionStorage.setItem(SESSION_PASSWORD_KEY, nextPassword);

      if (payload.products.length > 0) {
        setSelectedId((currentSelectedId) => {
          const nextSelectedProduct =
            payload.products.find(
              (product: MenuProduct) => product.id === currentSelectedId
            ) ?? payload.products[0];

          setDraft(toDraft(nextSelectedProduct));

          return nextSelectedProduct.id;
        });
        setIsNewProduct(false);
      }
    } catch (requestError) {
      setUnlocked(false);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo cargar el menú."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadProducts(password);
  }

  function updateDraft<TKey extends keyof ProductDraft>(
    key: TKey,
    value: ProductDraft[TKey]
  ) {
    setDraft((current) => ({
      ...current,
      [key]: value
    }));
  }

  function updatePrice(size: ProductSize, value: string) {
    setDraft((current) => ({
      ...current,
      prices: {
        ...current.prices,
        [size]: value
      }
    }));
  }

  function startNewProduct() {
    setSelectedId(null);
    setDraft(createEmptyDraft());
    setIsNewProduct(true);
    setMessage("");
    setError("");
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const id = isNewProduct ? draft.id || slugify(draft.name) : draft.id;
      const endpoint = isNewProduct
        ? "/api/admin/products"
        : `/api/admin/products/${encodeURIComponent(id)}`;
      const method = isNewProduct ? "POST" : "PUT";
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({
          ...toPayload(draft),
          id
        })
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "No se pudo guardar el producto.");
      }

      setMessage("Producto guardado.");
      setIsNewProduct(false);
      setSelectedId(payload.product.id);
      await loadProducts(password);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo guardar el producto."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(file: File | undefined) {
    if (!file) {
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", draft.id || slugify(draft.name) || "product");

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "x-admin-password": password
        },
        body: formData
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "No se pudo subir la imagen.");
      }

      updateDraft("image", payload.url);
      setMessage("Imagen subida. Guarda el producto para publicar el cambio.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo subir la imagen."
      );
    } finally {
      setUploading(false);
    }
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-cream px-4 py-10 text-ink">
        <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
          <form
            onSubmit={handleUnlock}
            className="w-full rounded-lg border border-ink/10 bg-white p-5 shadow-soft"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-leaf-soft text-leaf">
              <LockKeyhole size={24} aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold">Admin LONG CHA</h1>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              Ingresa la contraseña configurada en Vercel para administrar el
              menú.
            </p>
            <label className="mt-5 block">
              <span className="text-sm font-semibold">Contraseña</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="focus-ring mt-2 min-h-12 w-full rounded-md border border-ink/10 px-4"
              />
            </label>
            {error ? (
              <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-leaf disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-leaf">
              Panel administrativo
            </p>
            <h1 className="text-3xl font-bold">LONG CHA</h1>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void loadProducts(password)}
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/10 bg-white px-4 text-sm font-semibold"
            >
              <RefreshCw size={17} aria-hidden="true" />
              Actualizar
            </button>
            <button
              type="button"
              onClick={startNewProduct}
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white"
            >
              <Plus size={17} aria-hidden="true" />
              Nuevo
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-5 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-lg border border-ink/10 bg-white p-3 shadow-sm">
          <div className="mb-3 px-2 text-sm font-semibold text-ink/60">
            Productos ({products.length})
          </div>
          <div className="max-h-[calc(100vh-190px)] space-y-2 overflow-y-auto pr-1">
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => {
                  setSelectedId(product.id);
                  setDraft(toDraft(product));
                  setIsNewProduct(false);
                  setError("");
                  setMessage("");
                }}
                className={`focus-ring w-full rounded-md border px-3 py-3 text-left transition ${
                  selectedId === product.id && !isNewProduct
                    ? "border-leaf bg-leaf-soft"
                    : "border-ink/10 bg-white hover:border-leaf/40"
                }`}
              >
                <span className="block text-sm font-bold">{product.name}</span>
                <span className="mt-1 block text-xs text-ink/55">
                  {product.category} · {product.available ? "Disponible" : "Agotado"}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {isNewProduct ? "Nuevo producto" : draft.name || "Producto"}
              </h2>
              <p className="mt-1 text-sm text-ink/55">
                {draft.id || "El ID se genera desde el nombre"}
              </p>
            </div>
            <button
              type="button"
              disabled={saving}
              onClick={() => void handleSave()}
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-leaf px-5 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-70"
            >
              <Save size={17} aria-hidden="true" />
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>

          {message ? (
            <div className="mb-4 flex items-start gap-2 rounded-md bg-leaf-soft px-3 py-2 text-sm font-medium text-leaf">
              <CheckCircle2 className="mt-0.5 shrink-0" size={17} />
              <span>{message}</span>
            </div>
          ) : null}

          {error ? (
            <div className="mb-4 flex items-start gap-2 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              <AlertCircle className="mt-0.5 shrink-0" size={17} />
              <span>{error}</span>
            </div>
          ) : null}

          <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
            <div className="grid gap-4 sm:grid-cols-2">
              {isNewProduct ? (
                <label className="block">
                  <span className="text-sm font-semibold">ID</span>
                  <input
                    value={draft.id}
                    onChange={(event) => updateDraft("id", slugify(event.target.value))}
                    placeholder="milk-tea-taro"
                    className="focus-ring mt-2 min-h-11 w-full rounded-md border border-ink/10 px-3"
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="text-sm font-semibold">Nombre</span>
                <input
                  value={draft.name}
                  onChange={(event) => updateDraft("name", event.target.value)}
                  className="focus-ring mt-2 min-h-11 w-full rounded-md border border-ink/10 px-3"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Categoría</span>
                <select
                  value={draft.category}
                  onChange={(event) =>
                    updateDraft("category", event.target.value as MenuCategory)
                  }
                  className="focus-ring mt-2 min-h-11 w-full rounded-md border border-ink/10 px-3"
                >
                  {MENU_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Etiqueta</span>
                <select
                  value={draft.tag}
                  onChange={(event) =>
                    updateDraft("tag", event.target.value as ProductDraft["tag"])
                  }
                  className="focus-ring mt-2 min-h-11 w-full rounded-md border border-ink/10 px-3"
                >
                  {PRODUCT_TAGS.map((tag) => (
                    <option key={tag || "none"} value={tag}>
                      {tag || "Sin etiqueta"}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex min-h-11 items-center gap-3 rounded-md border border-ink/10 px-3 sm:mt-7">
                <input
                  checked={draft.available}
                  onChange={(event) => updateDraft("available", event.target.checked)}
                  type="checkbox"
                  className="h-4 w-4 accent-leaf"
                />
                <span className="text-sm font-semibold">Disponible</span>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">Descripción</span>
                <textarea
                  value={draft.description}
                  onChange={(event) => updateDraft("description", event.target.value)}
                  rows={4}
                  className="focus-ring mt-2 w-full rounded-md border border-ink/10 px-3 py-3"
                />
              </label>

              <div className="sm:col-span-2">
                <span className="text-sm font-semibold">Precios</span>
                <div className="mt-2 grid gap-3 sm:grid-cols-3">
                  {PRODUCT_SIZES.map((size) => (
                    <label
                      key={size}
                      className="rounded-md border border-ink/10 bg-cream px-3 py-2"
                    >
                      <span className="text-xs font-semibold text-ink/55">
                        {size}
                      </span>
                      <input
                        value={draft.prices[size]}
                        onChange={(event) => updatePrice(size, event.target.value)}
                        type="number"
                        step="0.01"
                        min="0"
                        className="focus-ring mt-1 min-h-10 w-full rounded-md border border-ink/10 bg-white px-3 text-lg font-bold"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">Toppings recomendados</span>
                <input
                  value={draft.toppings.join(", ")}
                  onChange={(event) =>
                    updateDraft(
                      "toppings",
                      event.target.value.split(",").map((item) => item.trim())
                    )
                  }
                  className="focus-ring mt-2 min-h-11 w-full rounded-md border border-ink/10 px-3"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">URL de imagen</span>
                <input
                  value={draft.image}
                  onChange={(event) => updateDraft("image", event.target.value)}
                  className="focus-ring mt-2 min-h-11 w-full rounded-md border border-ink/10 px-3"
                />
              </label>
            </div>

            <aside>
              <div className="overflow-hidden rounded-lg border border-ink/10 bg-cream">
                <div className="relative aspect-[4/3] bg-leaf-soft">
                  {draft.image ? (
                    <img
                      src={draft.image}
                      alt={draft.name || "Producto Long Cha"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-leaf">
                      <ImageIcon size={42} aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <label className="focus-ring flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-leaf">
                    <Upload size={17} aria-hidden="true" />
                    {uploading ? "Subiendo..." : "Subir imagen"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      disabled={uploading}
                      onChange={(event) => void handleUpload(event.target.files?.[0])}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </section>
    </main>
  );
}
