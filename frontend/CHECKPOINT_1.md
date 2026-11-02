# Checkpoint 1 — FE-08

Public site supplied by the user: https://capstone-eight-nu.vercel.app/chat

FE-08 source revision: `3fbac30` on `codex/fe-08-error-states`. Vercel completed its branch deployment at https://capstone-jdb6e3v8e-pjcb-as-projects.vercel.app/chat, but the URL currently redirects visitors to Vercel sign-in. The public site still serves the earlier FE-07 UI, and its `/api/chat` endpoint returns HTTP 503 because `ANTHROPIC_API_KEY` is not configured. Neither URL is ready as public FE-08 Checkpoint 1 proof until the FE-08 revision is publicly reachable and its server key is configured.

The FE-08 changes were verified locally with a mock Anthropic stream.

## Local screenshot evidence

- [Happy path with a linked Projects result](checkpoint-evidence/local-happy-path.png)
- [Mid-stream provider error with a retry action](checkpoint-evidence/local-midstream-failure.png)
- [Rate-limit error with a retry action](checkpoint-evidence/local-rate-limit.png)
- [No matching section with a next action](checkpoint-evidence/local-no-results.png)
- [First-run empty state](checkpoint-evidence/local-empty-state.png)
- [Retry card at phone width](checkpoint-evidence/local-midstream-mobile.png)

These screenshots use the local mock, not a live Claude response. The mock is only active when `ANTHROPIC_BASE_URL` is explicitly pointed at it. The browser checks also confirmed a double-click on Retry made one replacement request, a dropped stream retained partial text, a request sent with the local server offline showed connection guidance, and the chat route boundary recovered after its temporary error was removed.

At 375px and 1280px, the browser showed no horizontal document overflow. During a separate clean happy-path run, the browser console's error count did not increase. A real mobile Safari device was not available for keyboard testing.

## Remaining submission checks

1. Make this FE-08 revision publicly reachable with `ANTHROPIC_API_KEY` configured for its environment.
2. On that deployed `/chat` route, confirm a real tool call, a normal chat response, and no console errors during that happy path.
3. Test the keyboard and transcript scroll on a real mobile Safari device. Responsive browser checks at 375px and 1280px cannot prove real-device behavior.
4. Submit the preview URL and the screenshots or a recording in the Checkpoint 1 Portal.
