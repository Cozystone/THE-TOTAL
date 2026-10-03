-- THE TOTAL — ENTRY NOTICE (Supabase 로 연결할 때만)
-- 이메일 하나 · 시즌 하나 · 중복 없음. 서버(서비스 키)만 쓴다 — 공개 정책 없음.
create table if not exists public.entry_notices (
  id bigint generated always as identity primary key,
  email text not null check (char_length(email) <= 254),
  season text not null,
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (season, email)
);
alter table public.entry_notices enable row level security;
-- 시즌 종료 후 삭제: delete from public.entry_notices where season = '2027';
