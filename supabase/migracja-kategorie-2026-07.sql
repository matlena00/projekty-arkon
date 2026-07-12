-- Migracja 07.2026: nowe kategorie realizacji
-- (usuwamy 'sportowe' -> stają się 'publiczne'; dochodzi 'wnetrza' — Wizualizacje wnętrz)
-- Uruchom w Supabase Dashboard -> SQL Editor, jeżeli baza była utworzona starym schema.sql.

begin;

update public.projekty set kategoria = 'publiczne' where kategoria = 'sportowe';

alter table public.projekty drop constraint if exists projekty_kategoria_check;
alter table public.projekty
  add constraint projekty_kategoria_check
  check (kategoria in ('domy','osiedla','publiczne','uslugowe','wnetrza'));

commit;
