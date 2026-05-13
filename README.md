# LONG CHA - Menú QR Digital

MVP gratuito y editable para un menú QR de Long Cha, creado con Next.js, TypeScript y Tailwind CSS. Está pensado para publicarse gratis en Vercel y para actualizar productos desde `src/data/menu.ts`.

## Instalar

```bash
npm install
```

## Ejecutar localmente

```bash
npm run dev
```

Abre `http://localhost:3000`.

## Cambiar productos y precios

Edita:

```txt
src/data/menu.ts
```

Para cambiar WhatsApp:

```txt
src/lib/whatsapp.ts
```

## Agregar imágenes

Guarda fotos reales en:

```txt
public/images/products
```

Después cambia la ruta del producto:

```ts
image: "/images/products/milk-tea-taro.jpg"
```

## Backend MVP

Endpoints:

```txt
GET /api/health
GET /api/menu
GET /api/categories
GET /api/products
GET /api/products/[id]
```

Filtros:

```txt
/api/products?category=Milk%20Tea
/api/products?search=taro
/api/products?available=true
/api/products?tag=Popular
```

La capa lista para migrar a Supabase está en:

```txt
src/server/menu-repository.ts
```

## Publicar en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Opcional: agrega `NEXT_PUBLIC_SITE_URL` con tu dominio.
4. Haz deploy.
5. Genera el QR con el enlace publicado usando un generador gratuito.

### Error: Couldn't find any `pages` or `app` directory

Si Vercel muestra ese error, la raíz del proyecto está mal configurada.

Verifica que Vercel esté construyendo la carpeta que contiene estos archivos al mismo nivel:

```txt
package.json
src/app/page.tsx
src/app/layout.tsx
```

En Vercel, entra a:

```txt
Project Settings > General > Root Directory
```

Si subiste una carpeta padre a GitHub, selecciona:

```txt
act-a-como-desarrollador-full-stack
```

Después ejecuta un nuevo deploy.
