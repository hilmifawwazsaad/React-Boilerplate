# src/constants/

Folder ini menyimpan nilai-nilai tetap (konstanta) yang digunakan di seluruh aplikasi.

> **Penting:** Jangan menyimpan nilai yang berasal dari environment variable di sini. Gunakan `import.meta.env.VITE_*` langsung, atau buat wrapper di `src/lib/env.ts`.

## Kegunaan

- Menyimpan konstanta global yang tidak berubah (nama aplikasi, versi, dsb.)
- Mendefinisikan enum-like values (status, role, tipe)
- Menyimpan konfigurasi tetap (pagination size, timeout, dsb.)
- Menghindari magic string/number yang tersebar di codebase

## Struktur yang Disarankan

```
src/constants/
├── app.ts          # Konstanta umum aplikasi
├── routes.ts       # Path/URL constants
└── query-keys.ts   # React Query key constants
```

## Contoh Penggunaan

`src/constants/app.ts`

```ts
export const APP_NAME = 'My App';

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
} as const;

export const USER_ROLE = {
  ADMIN: 'admin',
  MEMBER: 'member',
  GUEST: 'guest',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
```

`src/constants/routes.ts`

```ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;
```

Penggunaan:

```tsx
import { ROUTES, USER_ROLE } from '@/constants/app'
import { ROUTES } from '@/constants/routes'

// Navigasi
navigate(ROUTES.DASHBOARD)

// Kondisi role
if (user.role === USER_ROLE.ADMIN) { ... }
```
