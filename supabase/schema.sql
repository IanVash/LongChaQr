create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null check (
    category in (
      'Milk Tea',
      'Iced Coffee',
      'Refresh Tea',
      'Smoothies',
      'Toppings',
      'Promociones'
    )
  ),
  description text not null default '',
  image text not null default '/images/placeholder-drink.svg',
  prices jsonb not null default '{}'::jsonb,
  toppings text[] not null default '{}'::text[],
  available boolean not null default true,
  tag text check (
    tag is null
    or tag in ('Popular', 'Nuevo', 'Promoción', 'Recomendado')
  ),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "Allow public product reads" on public.products;
create policy "Allow public product reads"
on public.products
for select
using (true);

insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do update set public = excluded.public;
