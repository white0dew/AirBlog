# Repository Guidelines

## Project Structure & Module Organization
- `app/` holds Next.js App Router routes and shared layouts; keep route-level metadata and loading states here.
- `components/` and `layouts/` contain reusable UI built with Tailwind; prefer extending existing atoms before adding new ones.
- `lib/`, `constants/`, and `types/` store utilities, configuration objects, and shared TypeScript contracts.
- `docs/doc/` is generated Markdown synced from Yuque via ELog; avoid manual edits and regenerate with the sync commands.
- `public/` serves static assets; `assets/` stores design tokens/media used at build time. `contentlayer.config.ts` defines how MD/MDX sources are ingested.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies (pnpm is the expected package manager).
- `pnpm dev` — start the dev server at `http://localhost:3000`.
- `pnpm build` — run the production Next.js build (includes type checks/contentlayer generation).
- `pnpm start` — serve the production build locally.
- `pnpm elog:sync` — pull Yuque content into `docs/doc/` using `.env.local` credentials; `pnpm sync-s` uses the short-link config (`elog.config.shorturl.js`).

## Coding Style & Naming Conventions
- TypeScript-first; keep props and helpers typed even though `strict` is off in `tsconfig.json`.
- Tailwind for styling; prefer composition over custom CSS. Co-locate component-specific styles; keep gradients/animation tokens in `constants/` or `assets/` when reusable.
- Imports are auto-sorted by Prettier + sort-imports plugin; run your editor’s formatter before committing (2-space indentation, trailing commas on multiline).
- File naming: PascalCase for React components, camelCase for utilities/hooks (`useSomething`), and kebab-case for route segments or MDX slugs.

## Testing Guidelines
- No dedicated automated test suite yet; rely on `pnpm build` for type/build validation.
- Smoke-test key flows before merging: home feed, article detail, search, theme toggle, and any form submissions.
- When adding tests, align with React Testing Library patterns and place files next to the code under test or in a `__tests__` sibling folder.

## Commit & Pull Request Guidelines
- Write concise, present-tense commit subjects (e.g., `Refine article layout gradients`); include scope if helpful.
- Use PRs with a short summary, testing notes, and screenshots/gifs for UI changes; link related issues or docs when available.
- Avoid committing secrets; use `.env.local` based on `.env.example` for Yuque and R2 credentials.
