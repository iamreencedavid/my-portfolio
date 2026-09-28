# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Personal portfolio site (rnzi.dev), bootstrapped with `create-next-app`. Stack: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4. No test framework is configured.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000 (also regenerates AGENTS.md)
npm run build   # production build — also the type-check gate
npm run start   # serve the production build
npm run lint    # ESLint (flat config: next core-web-vitals + typescript)
npx tsc --noEmit  # type-check without building
```

## Architecture notes

- **App Router only**: all routes live in `app/`. `app/layout.tsx` is the root layout; it loads fonts through `next/font/google` and exposes them as CSS variables on `<html>`.
- **Next.js 16 conventions differ from older versions.** Check `node_modules/next/dist/docs/` before using an API (e.g. the root layout is typed with the global `LayoutProps<"/">` helper rather than a hand-written props type).
- **Tailwind v4 is CSS-first**: there is no `tailwind.config.*`. Tailwind loads through `@import "tailwindcss"` in `app/globals.css`, and design tokens (colors, font families) go in the `@theme inline { ... }` block there, mapped from `:root` CSS variables. PostCSS uses `@tailwindcss/postcss`.
- **Path alias**: `@/*` resolves to the repo root (e.g. `@/app/...`).
