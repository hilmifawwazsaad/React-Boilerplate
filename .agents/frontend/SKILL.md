---
name: frontend
description: Generate production-grade React 19 + Vite TSX/TS code. Use for components, pages, layouts, and utilities — pure client-side UI, no server logic.
license: MIT
---

> Read `.agents/software-principles/SKILL.md` first.

## Pre-Code Checklist

1. All four states: loading · error · empty · ideal
2. Existing conventions in `pages/`, `components/`, `hooks/`, `services/`, `api/`, `lib/`
3. Only use libraries in `package.json`

## Architecture

| Need                         | Solution                                                              |
| ---------------------------- | --------------------------------------------------------------------- |
| Fetch + render data          | Custom hook in `hooks/` calling `api/` function                       |
| State / events / browser API | Component with local state — keep state as close to usage as possible |
| Reusable UI                  | `components/` — pure rendering, no data fetching inside               |
| Business logic               | `hooks/*.ts` (stateful) · `utils/*.ts` or `lib/*.ts` (pure functions) |
| API calls                    | `api/*.ts` — typed fetch wrappers, no business logic                  |
| Context / global state       | `contexts/` — only when prop drilling exceeds 2 levels                |
| Shared types                 | `types/` or co-located `*.types.ts`                                   |
| Constants                    | `constants/`                                                          |
| Validation schemas           | `validations/`                                                        |

Extensions: `.tsx` for JSX · `.ts` for hooks, utilities, and types.
Imports: use `@/` alias for all internal imports (e.g. `@/components/UserCard`).

## TypeScript

- Props → explicit `interface Props` or `type Props`. Never implicit.
- Prefer `function Foo({ id }: Props): React.JSX.Element` over `React.FC`.
- Children → `React.PropsWithChildren<Props>`.
- Extend HTML elements → `React.ComponentProps<'button'>`, not manual re-typing.
- Type all event handlers explicitly — never infer from `any`.

## Four States (all required)

| State   | Implementation                                    |
| ------- | ------------------------------------------------- |
| Loading | `isLoading` state + skeleton or spinner component |
| Error   | `error` state + user-friendly error message       |
| Empty   | Inline message — helpful, not just "No data"      |
| Ideal   | Normal render                                     |

## Data Fetching

- All fetches live in `api/*.ts` as typed async functions.
- Wrap in custom hooks (`hooks/`) that expose `{ data, isLoading, error }`.
- Never fetch inside component body or JSX — always via a hook.
- Cleanup `useEffect` subscriptions and timers on unmount.
- `useEffect` deps array must be exhaustive — no suppression comments. Extract stable refs with `useCallback`/`useMemo` if needed.

## Styling

- Tailwind: existing tokens only. No `[]` arbitrary values unless truly one-off.
- CSS Modules: follow existing class naming pattern.
- Never invent design tokens, colors, or custom fonts.

## Forms & Quality

- Validate with `zod` if installed; otherwise type-guard inputs manually at the boundary.
- Semantic HTML + ARIA. All interactive elements keyboard-accessible.
- Stable `key` props — never array index for dynamic lists.
- Env vars: prefix with `VITE_` to expose to the client; keep secrets server-side only.

## Never Do

- `any` type · `.jsx` / `.js` extensions
- Libraries not in `package.json`
- Fetch data directly inside a component — use a hook
- Skip any of the four states
- `key={index}` on dynamic lists
- Suppress `useEffect` exhaustive-deps lint rule
- Business logic inside JSX or component body
