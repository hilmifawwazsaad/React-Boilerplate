# src/pages/

Folder ini menyimpan komponen halaman yang merepresentasikan setiap route dalam aplikasi.

> **Penting:** Setiap halaman sebaiknya hanya bertugas sebagai "orchestrator" — mengambil data dan menyusun layout, bukan mengandung banyak logika UI. Komponen UI yang spesifik untuk satu halaman diletakkan di subfolder `_components/` di dalam folder halaman tersebut.

## Kegunaan

- Merepresentasikan satu URL/route sebagai satu komponen halaman
- Mengatur komposisi layout dan komponen untuk setiap halaman
- Mengelompokkan komponen privat per halaman di `_components/`

## Struktur yang Disarankan

```
src/pages/
├── Home/
│   ├── index.tsx               # Komponen utama halaman Home
│   └── _components/
│       └── HeroBanner.tsx      # Komponen khusus halaman Home
├── Dashboard/
│   ├── index.tsx
│   └── _components/
│       └── StatCard.tsx
└── NotFound/
    └── index.tsx               # Halaman 404
```

## Contoh Penggunaan

`src/pages/Home/index.tsx`

```tsx
import HeroBanner from './_components/HeroBanner';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <section className='py-12'>
        <Button variant='primary'>Mulai Sekarang</Button>
      </section>
    </main>
  );
}
```

Penggunaan di routes:

```tsx
import HomePage from '@/pages/Home';
import { Route } from 'react-router-dom';

<Route path='/' element={<HomePage />} />;
```
