# src/lib/

Folder ini menyimpan konfigurasi dan setup untuk library pihak ketiga yang digunakan di aplikasi.

> **Penting:** Folder ini bukan untuk utility function umum (letakkan di `src/utils/`). Fokus folder ini adalah **mengkonfigurasi library eksternal** agar siap digunakan di seluruh aplikasi.

## Kegunaan

- Menyimpan konfigurasi library (React Query, i18n, Axios, dsb.)
- Membuat wrapper atau instance yang sudah dikonfigurasi
- Menjadi satu titik setup agar konfigurasi tidak tersebar

## Struktur yang Disarankan

```
src/lib/
├── query-client.ts     # Konfigurasi React Query client
├── env.ts              # Wrapper & validasi environment variables
└── i18n.ts             # Konfigurasi internationalization
```

## Contoh Penggunaan

`src/lib/query-client.ts`

```ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 menit
      retry: 1,
    },
  },
});
```

`src/lib/env.ts`

```ts
export const env = {
  appName: import.meta.env.VITE_APP_NAME,
  apiUrl: import.meta.env.VITE_API_URL,
} as const;
```

Penggunaan:

```tsx
import { queryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>{/* ... */}</QueryClientProvider>
  );
}
```
