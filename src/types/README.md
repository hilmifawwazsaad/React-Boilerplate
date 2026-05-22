# src/types/

Folder ini menyimpan definisi TypeScript types dan interfaces yang digunakan di seluruh aplikasi.

> **Penting:** Simpan di sini hanya types yang digunakan di **lebih dari satu tempat**. Types yang hanya dipakai dalam satu file lebih baik didefinisikan langsung di file tersebut.

## Kegunaan

- Mendefinisikan tipe data untuk response API
- Mendefinisikan tipe untuk entitas domain (User, Product, dsb.)
- Menyimpan tipe utilitas yang digunakan di banyak tempat

## Struktur yang Disarankan

```
src/types/
├── api.ts          # Tipe untuk struktur response API
├── user.ts         # Tipe untuk entitas User
└── common.ts       # Tipe utilitas umum (Pagination, Option, dsb.)
```

## Contoh Penggunaan

`src/types/api.ts`

```ts
export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
```

`src/types/user.ts`

```ts
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  createdAt: string;
};

export type UserProfile = Pick<User, 'id' | 'name' | 'email'>;
```

Penggunaan:

```ts
import type { ApiResponse } from '@/types/api';
import type { User } from '@/types/user';

const getUser = async (id: string): Promise<ApiResponse<User>> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
```
