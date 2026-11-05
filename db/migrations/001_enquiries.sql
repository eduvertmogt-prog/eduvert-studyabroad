create table if not exists enquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  mobile text not null,
  destination text,
  message text,
  created_at timestamptz not null default now()
);
