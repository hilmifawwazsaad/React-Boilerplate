# src/hooks/

Folder ini menyimpan custom React hooks yang dapat digunakan kembali di seluruh aplikasi.

> **Penting:** Hooks di sini bersifat umum dan tidak terikat pada satu fitur atau halaman. Hook yang spesifik untuk satu halaman sebaiknya diletakkan di dekat komponen yang menggunakannya.

## Kegunaan

- Mengekstrak logika stateful yang dipakai di banyak komponen
- Membungkus API browser (localStorage, media query, event listener)
- Menyederhanakan penggunaan library pihak ketiga

## Struktur yang Disarankan

```
src/hooks/
├── useDebounce.ts       # Menunda eksekusi hingga delay terlewati
├── useLocalStorage.ts   # Sinkronisasi state dengan localStorage
└── useMediaQuery.ts     # Deteksi breakpoint/ukuran layar
```

## Contoh Penggunaan

`src/hooks/useDebounce.ts`

```ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

`src/hooks/useLocalStorage.ts`

```ts
import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  const set = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, set] as const;
}
```

Penggunaan di komponen:

```tsx
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    // fetch hanya dipanggil setelah user berhenti mengetik 300ms
    fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```
