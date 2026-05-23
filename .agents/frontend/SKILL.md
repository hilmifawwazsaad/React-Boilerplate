name frontend
description Build React components, pages, hooks, and features for this React 19 + Vite + TypeScript + Tailwind CSS v4 project. Use this skill when the user asks to create or modify components, pages, hooks, contexts, utilities, or any frontend feature in the src/ directory.
license MIT

## Project Structure

```
src/
├── api/          # HTTP client instances and raw API call functions
├── assets/       # Images, fonts, SVGs
├── components/   # Reusable UI components
├── constants/    # App-wide constants and enums
├── contexts/     # React context providers and consumers
├── hooks/        # Custom React hooks
├── lib/          # Third-party library wrappers and config
├── pages/        # Route-level page components
├── routes/       # Router config (route definitions)
├── services/     # Business logic that calls api/ functions
├── types/        # Shared TypeScript types and interfaces
├── utils/        # Pure utility functions
├── validations/  # Zod schemas or validation logic
├── App.tsx
└── main.tsx
```

## Conventions

**TypeScript** — explicit param/return types. `interface` for objects, `type` for unions. Shared types in `src/types/`. Never `any`.

**Components** — one per file, PascalCase. Named exports only (except pages + App.tsx). Props interface = `<Name>Props`. Split if >~150 lines.

**Hooks** — prefix `use`, place in `src/hooks/`. Return plain object `{ value, handler }`, not tuple (unless mirroring built-in).

**Styling** — Tailwind classes in JSX. Complex conditionals: `clsx`/`cn`. No inline `style` unless dynamic. v4: `@import "tailwindcss"`, no config file.

**API layer** — `src/api/`: raw fetch, no logic. `src/services/`: orchestrate + transform. `src/hooks/`: loading/error state.

**State** — local first. Context for global (auth, theme, locale). No external lib unless user requests.

**Errors** — try/catch async, surface in UI. Never swallow.

**Quality** — pass `pnpm lint:strict`. Format: `pnpm format`. Conventional Commits.

## Implementation Checklist

1. Types → `src/types/` (or co-locate if component-only)
2. Raw API fn → `src/api/` (if external data needed)
3. Service fn → `src/services/`
4. Data hook → `src/hooks/`
5. Component → `src/components/` or page → `src/pages/`
6. Route → `src/routes/` (if new page)
7. Constants → `src/constants/` (if magic values)
8. Validation schema → `src/validations/` (if user input)
