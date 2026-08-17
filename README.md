# PlantO

PlantO is a React/Vite storefront with Supabase for authentication, catalog data, image storage, and WhatsApp-first order capture. There are no online payments in V1.

## What changed from the AI Studio prototype

- Catalog, categories, settings and orders live in Supabase; browser storage is used only for a temporary cart.
- Admin sign-in uses Supabase Auth, not a credential embedded in JavaScript.
- Admin uploads use the `product-images` Supabase Storage bucket, not base64/browser data or third-party product URLs.
- Checkout saves a database order and generated `PLN-...` ID before it opens WhatsApp.
- Row Level Security permits visitors to read the active catalog and create an order, while only `profiles.is_admin = true` users can change catalog data, settings, images or see orders.

## One-time Supabase setup

1. Create a free Supabase project, then open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql).
2. In **Authentication > Users**, create the admin user (email/password). Copy its UUID and run:
   ```sql
   update public.profiles set is_admin = true where id = 'ADMIN_USER_UUID';
   ```
3. Copy Project URL and the **anon/publishable** API key to `.env.local` using `.env.example` as the template. Do not use a service-role key in a frontend.
4. Seed categories/products/settings through the admin dashboard. The initial browser preview data is deliberately not imported into the production database.

## Local development

```bash
npm install
npm run dev
```

## Cloudflare Pages deployment

Push this folder to GitHub, then create a Cloudflare Pages project with:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

In Supabase Auth URL Configuration, add both the Pages URL and any custom domain as redirect URLs. The free Pages and Supabase tiers are enough for a small V1; a custom domain is optional and paid separately.

## V1 boundaries

WhatsApp is the order confirmation channel. Payment collection, customer accounts, delivery tracking and analytics are intentionally future phases.
