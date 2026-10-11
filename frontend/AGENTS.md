<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Rules

## 1. Follow the Next.js App Router Structure

Use the Next.js App Router conventions for this project. Routes should be organized through the `app/` directory, with `page.tsx` files representing routed screens and `layout.tsx` used for shared application structure. Do not introduce a separate routing system unless explicitly required.

## 2. Use Server Components by Default

Treat Server Components as the default for pages and components. Only use `"use client"` when client-side interactivity, browser APIs, or React client hooks are actually required. Do not add `"use client"` unnecessarily.

## 3. Keep Components Focused

Components should have one clear responsibility. Do not combine unrelated layout, data-fetching, validation, or interactive behavior into a single component. Create dedicated components or modules when responsibilities are distinct.

## 4. Use the Established Design System

Use Tailwind CSS and the project's defined design tokens for styling. Reuse existing typography, spacing, colors, borders, and other design decisions rather than introducing arbitrary one-off values without a clear reason.

## 5. Build Responsive Foundations

All pages and shared components must remain usable at the required viewport sizes of 375px and 1280px. Avoid fixed layouts that cause horizontal overflow, clipping, or unusable navigation. Verify responsive behavior before considering the skeleton complete.

## 6. Keep Secrets Out of the Repository

Never hardcode API keys, credentials, or other secrets in source files. Use environment variables for configuration and keep local secret files such as `.env.local` out of version control. Provide `.env.example` with placeholder variable names when environment configuration is required.

## 7. Verify Data Fetching

The health-check page must fetch real data and render the result. Handle unsuccessful requests appropriately instead of assuming that a fetch always succeeds. Verify that the page works both locally and in the deployed environment.

## 8. Keep Placeholder Screens Intentional

Every screen required by the project specification must have a valid route, even if its implementation is only a placeholder. Do not build unnecessary features during the skeleton phase. Focus on establishing the route, layout, navigation, and structure needed for later development.

## 9. Verify Before Declaring the Skeleton Complete

Before considering FE-04 complete, run the project's lint and production build checks and resolve failures. Test every required route, verify the health-check page, inspect the layout at 375px and 1280px, and confirm that no secrets are committed.

## 10. Review AI-Generated Changes

Review generated code against the assignment requirements before accepting it. Do not assume that generated routes, responsive behavior, accessibility decisions, data fetching, or build configuration are correct without verification.
