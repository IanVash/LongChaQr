export const MENU_CATEGORIES = [
  "Milk Tea",
  "Iced Coffee",
  "Refresh Tea",
  "Smoothies",
  "Toppings",
  "Promociones"
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];
export type ProductTag = "Popular" | "Nuevo" | "Promoción" | "Recomendado";

export type ProductPrices = {
  "16oz"?: number;
  "22oz"?: number;
  "24oz"?: number;
};

export type MenuProduct = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  image: string;
  prices: ProductPrices;
  toppings: string[];
  available: boolean;
  tag?: ProductTag;
};

export const menuProducts: MenuProduct[] = [
  {
    id: "milk-tea-taro",
    name: "Milk Tea Taro",
    category: "Milk Tea",
    description:
      "Taro cremoso con notas suaves de vainilla y una textura sedosa de té con leche.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 3.75, "22oz": 4.5 },
    toppings: ["Tapioca Negra", "Jelly de Café"],
    available: true,
    tag: "Popular"
  },
  {
    id: "thai-milk-tea",
    name: "Thai Milk Tea",
    category: "Milk Tea",
    description:
      "Té tailandés aromático, leche cremosa y dulzor profundo con acabado especiado.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 3.75, "22oz": 4.5 },
    toppings: ["Tapioca Negra", "Popping Boba de Lychee"],
    available: true,
    tag: "Recomendado"
  },
  {
    id: "brown-sugar-milk-tea",
    name: "Brown Sugar Milk Tea",
    category: "Milk Tea",
    description:
      "Leche fresca con jarabe de azúcar morena, perlas suaves y notas acarameladas.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 4.25, "22oz": 5 },
    toppings: ["Tapioca Negra"],
    available: true,
    tag: "Popular"
  },
  {
    id: "dirty-chai",
    name: "Dirty Chai",
    category: "Iced Coffee",
    description:
      "Chai especiado con espresso frío, leche aterciopelada y un balance elegante.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 4.25, "22oz": 5 },
    toppings: ["Jelly de Café"],
    available: true,
    tag: "Nuevo"
  },
  {
    id: "iced-cappuccino",
    name: "Iced Cappuccino",
    category: "Iced Coffee",
    description:
      "Espresso frío con leche espumada, cuerpo ligero y final tostado.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 3.75, "22oz": 4.5 },
    toppings: ["Jelly de Café"],
    available: true
  },
  {
    id: "iced-coffee-caramelo",
    name: "Iced Coffee Caramelo",
    category: "Iced Coffee",
    description:
      "Café frío con caramelo suave, leche fresca y un toque dulce persistente.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 3.95, "22oz": 4.75 },
    toppings: ["Tapioca Negra", "Jelly de Café"],
    available: false
  },
  {
    id: "refresh-fresa-maracuya",
    name: "Refresh Fresa Maracuyá",
    category: "Refresh Tea",
    description:
      "Infusión fría, fresa brillante y maracuyá tropical con frescura ligera.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 3.5, "24oz": 4.5 },
    toppings: ["Popping Boba de Lychee"],
    available: true,
    tag: "Recomendado"
  },
  {
    id: "refresh-frutos-rojos",
    name: "Refresh Frutos Rojos",
    category: "Refresh Tea",
    description:
      "Frutos rojos, té frío y acidez delicada para una bebida limpia y vibrante.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 3.5, "24oz": 4.5 },
    toppings: ["Popping Boba de Lychee"],
    available: true
  },
  {
    id: "smoothie-mango",
    name: "Smoothie de Mango",
    category: "Smoothies",
    description:
      "Mango maduro, textura cremosa y dulzor tropical servido bien frío.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 4, "24oz": 5 },
    toppings: ["Popping Boba de Lychee"],
    available: true,
    tag: "Nuevo"
  },
  {
    id: "smoothie-fresa",
    name: "Smoothie de Fresa",
    category: "Smoothies",
    description:
      "Fresa fresca, base cremosa y un perfil frutal suave para cualquier hora.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 4, "24oz": 5 },
    toppings: ["Tapioca Negra", "Popping Boba de Lychee"],
    available: true
  },
  {
    id: "tapioca-negra",
    name: "Tapioca Negra",
    category: "Toppings",
    description:
      "Perlas clásicas de tapioca con mordida suave y dulzor de azúcar morena.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 0.75 },
    toppings: [],
    available: true,
    tag: "Popular"
  },
  {
    id: "popping-boba-lychee",
    name: "Popping Boba de Lychee",
    category: "Toppings",
    description:
      "Perlas explosivas de lychee que agregan frescura frutal a cada sorbo.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 0.85 },
    toppings: [],
    available: true
  },
  {
    id: "jelly-cafe",
    name: "Jelly de Café",
    category: "Toppings",
    description:
      "Cubos suaves de café con amargor delicado y textura refrescante.",
    image: "/images/placeholder-drink.svg",
    prices: { "16oz": 0.85 },
    toppings: [],
    available: true
  },
  {
    id: "promo-duo-long-cha",
    name: "Dúo Long Cha",
    category: "Promociones",
    description:
      "Dos bebidas seleccionadas para compartir una pausa cremosa y refrescante.",
    image: "/images/placeholder-drink.svg",
    prices: { "22oz": 8.5, "24oz": 9.25 },
    toppings: ["Tapioca Negra", "Popping Boba de Lychee"],
    available: true,
    tag: "Promoción"
  }
];
