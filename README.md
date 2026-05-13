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

## Panel administrativo

El panel está en:

```txt
/admin
```

Sirve para:

- Editar nombres, categorías, descripciones y disponibilidad.
- Cambiar precios de 16oz, 22oz y 24oz.
- Cambiar toppings recomendados.
- Subir imágenes de productos a Supabase Storage.

Para producción en Vercel necesitas configurar Supabase, porque Vercel no guarda archivos subidos dentro del proyecto.

### 1. Crear Supabase

1. Crea un proyecto en Supabase.
2. Abre el SQL Editor.
3. Ejecuta el contenido de:

```txt
supabase/schema.sql
```

4. Luego ejecuta el contenido de:

```txt
supabase/seed.sql
```

Esto crea la tabla `products`, el bucket público `menu-images` y carga los productos iniciales.

### 2. Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo local:

```bash
cp .env.example .env.local
```

Configura:

```txt
ADMIN_PASSWORD
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_STORAGE_BUCKET
```

En Vercel agrega esas mismas variables en:

```txt
Project Settings > Environment Variables
```

Importante: `SUPABASE_SERVICE_ROLE_KEY` es privada. No la compartas ni la pongas con prefijo `NEXT_PUBLIC`.

### 3. Editar productos

1. Entra a `/admin`.
2. Ingresa la contraseña definida en `ADMIN_PASSWORD`.
3. Selecciona un producto.
4. Cambia precios o sube imagen.
5. Haz clic en `Guardar`.

El menú público empezará a leer desde Supabase cuando las variables estén configuradas. Si no hay variables de Supabase, seguirá usando `src/data/menu.ts`.

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
