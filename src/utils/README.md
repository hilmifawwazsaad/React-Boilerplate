# src/utils/

Folder ini menyimpan fungsi-fungsi utilitas murni (pure functions) yang membantu operasi umum di seluruh aplikasi.

> **Penting:** Fungsi di sini harus bersifat **pure** — tidak memiliki side effects, tidak bergantung pada state React, dan tidak memanggil API. Jika membutuhkan state, gunakan `src/hooks/`. Jika berkaitan dengan konfigurasi library, gunakan `src/lib/`.

## Kegunaan

- Memformat data (tanggal, angka, mata uang, teks)
- Operasi umum pada string, array, atau objek
- Helper yang dipakai di banyak tempat

## Struktur yang Disarankan

```
src/utils/
├── format.ts       # Format tanggal, angka, mata uang
├── string.ts       # Manipulasi string (truncate, capitalize, dsb.)
└── cn.ts           # Utility untuk menggabungkan class Tailwind
```

## Contoh Penggunaan

`src/utils/format.ts`

```ts
export function formatCurrency(amount: number, currency = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date, locale = 'id-ID'): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}
```

`src/utils/cn.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Penggunaan:

```tsx
import { formatCurrency, formatDate } from '@/utils/format'
import { cn } from '@/utils/cn'

<p>{formatCurrency(150000)}</p>        // Rp 150.000
<p>{formatDate('2024-01-15')}</p>      // 15 Januari 2024

<div className={cn('p-4', isActive && 'bg-blue-500')} />
```
