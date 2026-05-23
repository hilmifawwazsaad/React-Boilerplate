# AGENTS.md

Read the relevant skill file before writing any code.
Check `package.json` for available libraries — never import what isn't installed.

**Stack:** React 19 · Vite 8 · TypeScript 6 (strict) · Tailwind CSS 4 · ESLint 10 · Prettier · Husky · commitlint · pnpm

| Task domain     | When to use                                                                                   | Skill file                         |
| --------------- | --------------------------------------------------------------------------------------------- | ---------------------------------- |
| Frontend        | Components, pages, hooks, contexts, utilities — pure React/Vite work                          | `.agents/frontend/SKILL.md`        |
| Backend         | API integration only — HTTP client, `src/api/`, `src/services/` (no server code in this repo) | `.agents/backend/SKILL.md`         |
| Frontend Design | Visual design, aesthetics, animations, creative layouts                                       | `.agents/frontend-design/SKILL.md` |

Task spans multiple domains → pick dominant, note overlap.
Convention missing from skill file → ask before inventing.
Adding a real backend or monorepo → add a new row and a new skill file.
