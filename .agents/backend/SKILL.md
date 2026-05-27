---
name: backend
description: 'Design and generate external backend API code (any language/framework — Go, Rust, Python, PHP, JavaScript, Ruby, etc.) that serves a React Vite frontend. Use for API endpoints, auth, validation, and data modeling on a separate backend server.'
license: MIT
---

> Read `.agents/software-principles/SKILL.md` first.

## Pre-Code Checklist

1. Resource + HTTP method + action
2. Request → response contract (input shape, output shape, errors)
3. Auth requirement (public / authenticated / role-gated)
4. Failure scenarios + validation rules

## Response Envelope

Follow existing convention if one exists. If starting fresh, pick one shape and apply it consistently — never mix shapes across endpoints.

Required regardless of shape:

- Success and error responses must be distinguishable
- Validation errors must include field-level detail
- Error responses must never expose stack traces, query strings, or internal paths
- Type the envelope — never return untyped `any` or raw ORM objects

## Design Rules

- **Versioning** — prefix all routes `/api/v1/`.
- **Query params** — `page`, `limit`, `sort`, `filter[key]=value`.
- **Auth** — `Authorization: Bearer <token>` or HTTP-only cookie.
- **Pagination** — all list endpoints: `{ items: T[], pagination: { page, limit, totalItems, totalPages } }`.
- **CORS** — exact origin only. Never `*` with credentials.
- **Naming** — pick camelCase or snake_case; consistent throughout.
- **Docs** — expose OpenAPI spec at `/api/docs` when feasible.

## Architecture

- Route handlers thin — business logic in service/use-case layer.
- Global error handler → catches all unhandled errors → safe 500.

## Security (non-negotiable)

- Secrets via env vars only — never hardcoded.
- Parameterized queries/ORM — no string-concatenated SQL.
- Hash passwords (bcrypt/argon2).
- Rate-limit auth endpoints.
- Limit request body size.
- Security headers in production.
- Validate all input at boundary before processing.

## Never Do

- Trust unvalidated client input or hardcode secrets.
- Business logic directly in route handlers.
