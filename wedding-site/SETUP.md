# Wedding site — backend setup

## 1. Environment

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

Passwords (defaults match the invite codes you requested):

| Password   | Access                                      |
|------------|---------------------------------------------|
| `bing bong`| RSVP for Sangeet + Wedding Ceremony         |
| `bing`     | RSVP for Wedding Ceremony only              |
| `admin`    | Spreadsheet dashboard of all RSVPs          |

## 2. Supabase (free tier)

1. Create a project at https://supabase.com
2. Open **SQL Editor** and run [`supabase/schema.sql`](./supabase/schema.sql)
3. Copy **Project URL**, **anon key**, and **service_role key** into `.env.local`

## 3. Resend (free tier)

1. Create an account at https://resend.com
2. Create an API key
3. While testing, use `onboarding@resend.dev` as the from address
4. Put `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in `.env.local`

## 4. Run locally

```bash
npm install
npm run dev
```

On first load the site is locked until a password is entered.
