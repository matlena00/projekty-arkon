-- =============================================================
--  ArKon CMS — schema dla Supabase
--  Jak użyć:
--   1. Supabase Dashboard → SQL Editor → New query → wklej całość → Run
--   2. Authentication → Users → Add user → utwórz konto admina (e-mail + hasło)
--      (publiczna rejestracja jest wyłączona — admina dodaje się tylko tutaj)
--   3. Project Settings → API → skopiuj "Project URL" i "anon public" key
--      i prześlij je deweloperowi (trafią do .env.local). NIE wysyłaj service_role.
-- =============================================================

-- =============================================================
-- 1. TABELE
-- =============================================================

-- Realizacje (projekty w galerii)
create table if not exists public.projekty (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  tytul       text not null,
  kategoria   text not null check (kategoria in ('domy','osiedla','publiczne','uslugowe','wnetrza')),
  opis        text,
  sort_order  int  not null default 0,
  published   boolean not null default true
);

-- Zdjęcia przypisane do realizacji (relacja 1:wiele)
create table if not exists public.projekt_zdjecia (
  id          uuid primary key default gen_random_uuid(),
  projekt_id  uuid not null references public.projekty(id) on delete cascade,
  url         text not null,
  alt         text,
  sort_order  int  not null default 0,
  is_cover    boolean not null default false
);
create index if not exists projekt_zdjecia_projekt_id_idx on public.projekt_zdjecia(projekt_id);

-- Wpisy bloga
create table if not exists public.wpisy (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  slug             text not null unique,
  tytul            text not null,
  excerpt          text,
  autor            text not null default 'Łukasz Matlęga',
  data_publikacji  date not null default current_date,
  tag              text,
  tagi             text[] not null default '{}',
  cover_url        text,
  tresc            text,            -- akapity rozdzielone pustą linią
  published        boolean not null default true
);

-- =============================================================
-- 2. RLS — Row Level Security
-- =============================================================
alter table public.projekty        enable row level security;
alter table public.projekt_zdjecia enable row level security;
alter table public.wpisy           enable row level security;

-- Publiczny odczyt TYLKO opublikowanych
create policy "public read published projekty"
  on public.projekty for select using (published = true);

create policy "public read zdjecia of published projekty"
  on public.projekt_zdjecia for select using (
    exists (select 1 from public.projekty p where p.id = projekt_id and p.published = true)
  );

create policy "public read published wpisy"
  on public.wpisy for select using (published = true);

-- Zalogowani (admini) — pełny dostęp (odczyt także nieopublikowanych + zapis)
create policy "auth full access projekty"
  on public.projekty for all to authenticated using (true) with check (true);

create policy "auth full access zdjecia"
  on public.projekt_zdjecia for all to authenticated using (true) with check (true);

create policy "auth full access wpisy"
  on public.wpisy for all to authenticated using (true) with check (true);

-- =============================================================
-- 3. STORAGE — zdjęcia (publiczne buckety)
-- =============================================================
insert into storage.buckets (id, name, public)
values ('realizacje','realizacje', true), ('blog','blog', true)
on conflict (id) do nothing;

-- Upload / edycja / usuwanie plików tylko dla zalogowanych
create policy "auth upload cms files"
  on storage.objects for insert to authenticated
  with check (bucket_id in ('realizacje','blog'));

create policy "auth update cms files"
  on storage.objects for update to authenticated
  using (bucket_id in ('realizacje','blog'));

create policy "auth delete cms files"
  on storage.objects for delete to authenticated
  using (bucket_id in ('realizacje','blog'));
