# Portfolio capstone

This repository contains the Frontend AI Engineering capstone. The Next.js app lives in [`frontend`](frontend), including the streaming portfolio guide at `/chat`, its FE-07 section lookup tool, and FE-08 failure handling.

- [Screen spec](SCREEN_SPEC.md)
- [Frontend setup and deployment](frontend/README.md)
- [Checkpoint 1 evidence and status](frontend/CHECKPOINT_1.md)

The frontend uses Next.js App Router, React, TypeScript, and Tailwind CSS. The guide streams Claude responses and typed tool results through an AI SDK route handler. Other portfolio pages remain in progress; `/health` demonstrates a server-rendered fetch.
