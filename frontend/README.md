# Portfolio frontend

Next.js App Router frontend for the Frontend AI Engineering capstone. The streaming portfolio guide is at `/chat`; its route handler is at `/api/chat`.

## Run locally

Requires Node.js 20.9 or newer and an Anthropic API key. Copy `.env.example` to `.env.local`, then set `ANTHROPIC_API_KEY` to your key. The key is read only by the server route. Do not use a `NEXT_PUBLIC_` prefix.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000/chat`. The health page uses a public sample JSON endpoint by default; `HEALTH_CHECK_URL` can override it. `.env.local` is ignored by Git.

The guide streams Claude text and typed tool parts through the AI SDK, keeps partial replies after Stop, and saves completed tool cards with the conversation in this browser's local storage. The route validates text-only conversation context sent to Claude; client-supplied tool parts are never trusted as tool results.

## FE-07 tool contract

[`getPortfolioSection`](lib/ai/portfolio-tools.ts) runs on the server in `/api/chat`. Its Zod input schema is `{ section: string }` with a trimmed, 1–40 character section name. The tool searches the portfolio's [published route data](lib/portfolio-sections.ts), accepting simple aliases such as `work` for Projects. It returns `{ title, href, summary, status }`, where `status` is `Published` or `In progress`. An unknown section throws a lookup error; the chat renders the resulting `output-error` part with a recovery suggestion.

The UI renders `input-streaming` as a skeleton, `input-available` as an active route lookup, `output-available` as a linked section card, and `output-error` as an error panel. Ask **“Where can I find the projects section?”** for a success example or **“Is there a services page?”** for the failure example. The route allows one tool step and one follow-up response step.

## FE-08 failure handling

The chat keeps the submitted question when a request fails. Its retry button calls `regenerate({ messageId })` for that last user question and is guarded against double clicks. An interrupted partial reply stays visible until a retry replaces it. Expected API and network failures appear inside the transcript; unexpected page-rendering failures use the `/chat` and app-level `error.tsx` boundaries with a reload action.

| Case | Designed response | Local check |
| --- | --- | --- |
| Network unavailable before send | Connection panel with the failed question and retry | Stop the local app after the page loads, then send a question |
| Provider error during a stream | Keep partial text; show a retry panel | With the mock, send `Test midstream failure` |
| Connection drops during a stream | Keep partial text; show connection guidance | With the mock, send `Test connection drop` |
| Rate limit or overload | Busy message and retry | With the mock, send `Test rate limit` |
| Empty or whitespace-only input | Send remains disabled | Type spaces into the composer |
| No matching section | Tool error card links to Projects | Ask `Is there a services page?` |
| First visit, no conversation | Suggested questions start the chat | Select **New chat** |
| Slow reply | Result-sized skeleton, then a still-working hint | With the mock, send `Test slow response` |
| Unexpected route render error | Route error boundary offers reload and Home | Temporarily throw from `app/chat/page.tsx`, then remove the throw |

The composer uses the dynamic viewport height, safe-area padding, and `visualViewport` resize handling to keep it in view when a phone keyboard opens. The transcript has contained touch scrolling. See [Checkpoint 1 evidence](CHECKPOINT_1.md) for local screenshots and verification limits.

## Verify

```bash
npm run lint
npm run build
```

Check `/chat` at 375px and 1280px. During a response, scroll up to verify that new tokens do not pull the transcript down, then use **Jump to latest**. Stop a response mid-stream and send another message. Refresh to verify that both complete and partial messages persist.

For local UI testing without an Anthropic key, run `node tests/mock-anthropic.mjs` in one terminal. In another PowerShell terminal, set `ANTHROPIC_API_KEY=local-test-key` and `ANTHROPIC_BASE_URL=http://127.0.0.1:4010/v1` as process environment variables, then run `npm run dev`. The mock emits delayed SSE text and tool calls for the two prompts above. It is never used unless that base URL is explicitly set.

## Deploy to Vercel

1. Push a feature branch to GitHub.
2. Import `pjcb-a/capstone` into Vercel and set the **Root Directory** to `frontend`.
3. Select the **Next.js** framework preset and use the existing `npm run build` command.
4. Add `ANTHROPIC_API_KEY` in Vercel Project Settings → Environment Variables for the Preview environment. Leave `ANTHROPIC_BASE_URL` unset. Do not put credentials in the repository.
5. Open `/chat` on the Preview URL and verify a real Claude conversation, Stop, a follow-up, and phone width.
6. Submit that working Preview URL with links to [the route handler](app/api/chat/route.ts) and [chat component](components/chat/PortfolioChat.tsx).

Vercel's Preview deployments are built from non-production branches.
