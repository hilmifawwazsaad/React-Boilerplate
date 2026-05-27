# AGENTS.md

Read the relevant skill file before writing any code.
Check `package.json` for available libraries — never import what isn't installed.

**Stack:** React 19 · Vite 8 · TypeScript 6 (strict) · Tailwind CSS 4 · ESLint 10 · Prettier · Husky · commitlint — no router or data-fetching library installed.

**Always read first (every-task):** `.agents/software-principles/SKILL.md` — naming, function design, and engineering principles.

| Task domain     | When to use                                                         | Skill file                             |
| --------------- | ------------------------------------------------------------------- | -------------------------------------- |
| All tasks       | Always — principles, naming, function design                        | `.agents/software-principles/SKILL.md` |
| Frontend        | Components, pages, layouts, styling                                 | `.agents/frontend/SKILL.md`            |
| Frontend Design | UI with visual/aesthetic emphasis — use alongside frontend skill    | `.agents/frontend-design/SKILL.md`     |
| Backend         | External API server (Go, Python, PHP, etc.) separate from this repo | `.agents/backend/SKILL.md`             |

Task spans multiple domains → pick dominant, note overlap.
Convention missing from skill file → ask before inventing.
