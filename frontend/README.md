# Portfolio frontend

Next.js App Router skeleton for the Frontend AI Engineering capstone. Pages are Server Components by default. The screen list is in [`SCREEN_SPEC.md`](../SCREEN_SPEC.md).

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. The health page uses a public sample JSON endpoint by default. To use another endpoint with the same `userId`, `id`, `title`, and `completed` fields, copy `.env.example` to `.env.local` and change `HEALTH_CHECK_URL`. `.env.local` is ignored by Git.

## Verify

```bash
npm run lint
npm run build
```

Check `/`, `/projects`, `/projects/sample-project`, `/experience`, `/about`, `/contact`, and `/health` at 375px and 1280px.

## Deploy to Vercel

1. Push `fe04-skeleton` to GitHub.
2. Import `pjcb-a/capstone` into Vercel and set the **Root Directory** to `frontend`.
3. Select the **Next.js** framework preset and use the existing `npm run build` command.
4. Leave `HEALTH_CHECK_URL` unset to use the public sample endpoint, or add it in Vercel Project Settings → Environment Variables for Preview and Production. Do not put tokens or credentials in the repository.
5. Push another commit to a non-production branch and confirm that Vercel creates a new Preview deployment. Open every route, including `/health`, on that URL.
6. Submit the working Preview URL together with the [repository link](https://github.com/pjcb-a/capstone).

Vercel's Preview deployments are built from non-production branches. If `fe04-skeleton` is selected as the production branch, use a separate branch for the preview check.
