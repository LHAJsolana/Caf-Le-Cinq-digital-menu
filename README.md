# Café Le Cinq — Digital Menu

A premium, mobile-first menu for Café Le Cinq in Rabat. Built with Next.js App Router, TypeScript, Prisma, Framer Motion, and a local-first admin experience.

## Run locally

```bash
npm install
copy .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`. Routes: `/menu`, `/admin` (demo PIN `5555`), and `/qr`.

## Environment variables

- `DATABASE_URL`: `file:./dev.db` for local SQLite.
- `NEXT_PUBLIC_SITE_URL`: canonical deployed URL used by metadata and QR codes.
- `ADMIN_PIN`: server-side PIN for the production authentication implementation.
- `NEXT_PUBLIC_ADMIN_PIN`: optional prototype override; never expose a real secret this way.

The included admin is an MVP/local prototype: edits persist in browser storage so the complete management flow can be evaluated without infrastructure. Before public deployment, connect these actions to authenticated route handlers backed by Prisma and store an Argon2 PIN hash.

## Prisma and PostgreSQL

Development uses `prisma/schema.prisma` with SQLite. For production, change the datasource provider in that file from `sqlite` to `postgresql`, set `DATABASE_URL` to the PostgreSQL connection string, then run:

```bash
npx prisma generate
npx prisma migrate deploy
```

Commit a generated migration before deploying. Vercel Postgres, Neon, and Supabase all work with the PostgreSQL datasource.

## Deploy to Vercel

Push the repository, import it in Vercel, add the environment variables, and deploy. The standard build command is `npm run build`. For a database-backed release, run migrations as part of the release workflow.

## Content architecture

`lib/menu-data.ts` is the seeded experience source. Every category and product uses `{ fr, en, ar }` fields; adding another language means extending `Locale`, adding translations, and exposing it in the selector. Prisma models normalize production translations.
