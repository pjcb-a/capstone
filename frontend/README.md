# Portfolio frontend

Next.js App Router frontend for the Frontend AI Engineering capstone. The streaming portfolio guide is at `/chat`; its route handler is at `/api/chat`.

## Run locally

Requires Node.js 20.9 or newer and an Anthropic API key. Copy `.env.example` to `.env.local`, then set `ANTHROPIC_API_KEY` to your key. The key is read only by the server route. Do not use a `NEXT_PUBLIC_` prefix.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000/chat`. The health page uses a public sample JSON endpoint by default; `HEALTH_CHECK_URL` can override it. `.env.local` is ignored by Git.

The guide streams Claude text through the AI SDK, keeps partial replies after Stop, and saves the conversation in this browser's local storage. The route validates text-only conversation content and limits the context sent to Claude.

## Verify

```bash
npm run lint
npm run build
```

Check `/chat` at 375px and 1280px. During a response, scroll up to verify that new tokens do not pull the transcript down, then use **Jump to latest**. Stop a response mid-stream and send another message. Refresh to verify that both complete and partial messages persist.

For local UI testing without an Anthropic key, run `node tests/mock-anthropic.mjs` in one terminal. In another PowerShell terminal, set `ANTHROPIC_API_KEY=local-test-key` and `ANTHROPIC_BASE_URL=http://127.0.0.1:4010/v1` as process environment variables, then run `npm run dev`. The mock emits delayed SSE text and is never used unless that base URL is explicitly set.

## Deploy to Vercel

1. Push a feature branch to GitHub.
2. Import `pjcb-a/capstone` into Vercel and set the **Root Directory** to `frontend`.
3. Select the **Next.js** framework preset and use the existing `npm run build` command.
4. Add `ANTHROPIC_API_KEY` in Vercel Project Settings → Environment Variables for the Preview environment. Leave `ANTHROPIC_BASE_URL` unset. Do not put credentials in the repository.
5. Open `/chat` on the Preview URL and verify a real Claude conversation, Stop, a follow-up, and phone width.
6. Submit that working Preview URL with links to [the route handler](app/api/chat/route.ts) and [chat component](components/chat/PortfolioChat.tsx).

Vercel's Preview deployments are built from non-production branches.
