name backend
description API integration layer — HTTP client, service functions, data-fetching patterns, error handling, integration with external REST or GraphQL APIs. Use this skill when the user asks to add API calls, configure an HTTP client, or build src/api/ and src/services/ logic.
license MIT

## Scope

API integration only. No server code in this repo. All backend logic lives in an external service.

## Layer Responsibilities

| Layer          | Location                          | Rule                                                                               |
| -------------- | --------------------------------- | ---------------------------------------------------------------------------------- |
| HTTP client    | `src/lib/apiClient.ts`            | Single Axios/fetch instance. `baseURL` from `VITE_API_URL`. Auth via interceptors. |
| Raw calls      | `src/api/<domain>.ts`             | 1 fn per endpoint. No business logic. Return typed data from `src/types/`.         |
| Business logic | `src/services/<domain>Service.ts` | Orchestrate api/ calls, transform/filter data, domain errors.                      |
| Data hook      | `src/hooks/use<Domain>.ts`        | Call service, manage loading/error state, expose to components.                    |

## Code Patterns

```ts
// src/lib/apiClient.ts
import axios from 'axios';
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

```ts
// src/api/users.ts
import { apiClient } from '@/lib/apiClient';
import type { User } from '@/types/user';
export const fetchUser = async (id: string): Promise<User> => {
  const res = await apiClient.get(`/users/${id}`);
  return res.data;
};
```

```ts
// src/types/error.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

## Rules

- `VITE_` prefix on all env vars. Store `VITE_API_URL` in `.env`, document in `.env.example`. Never commit `.env`.
- Catch at service layer, re-throw with context. Never swallow errors.
- 401/403 → handle globally in response interceptor.

## Checklist

- [ ] `src/lib/apiClient.ts` configured
- [ ] `VITE_API_URL` in `.env` + `.env.example`
- [ ] `src/api/<domain>.ts` — raw fns
- [ ] `src/services/<domain>Service.ts` — business logic
- [ ] `src/types/<domain>.ts` — types
- [ ] `src/hooks/use<Domain>.ts` — data hook
- [ ] Errors surfaced in UI, not swallowed
