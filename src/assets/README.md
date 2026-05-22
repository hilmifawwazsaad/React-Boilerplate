# src/assets/

Folder ini menyimpan file statis yang digunakan di dalam aplikasi seperti gambar, ikon, font, dan file SVG.

> **Penting:** File di sini di-bundle oleh Vite saat build. Untuk file publik yang tidak perlu di-bundle (misal: `favicon.ico`, `robots.txt`), letakkan di folder `public/` di root project.

## Perbedaan `src/assets/` vs `public/`

|                            | `src/assets/`                 | `public/`                             |
| -------------------------- | ----------------------------- | ------------------------------------- |
| **Cara akses**             | Diimport di kode              | Langsung via URL                      |
| **Diproses Vite**          | Ya (optimize, hash, compress) | Tidak (disalin apa adanya)            |
| **Filename setelah build** | Berubah: `logo.a3f92b.png`    | Tetap: `logo.png`                     |
| **Jika tidak diimport**    | Tidak masuk ke build          | Selalu ikut build                     |
| **Cocok untuk**            | Gambar/ikon di dalam komponen | `favicon.ico`, `robots.txt`, OG image |

```tsx
// src/assets/ — harus diimport
import logo from '@/assets/images/logo.png'
<img src={logo} />

// public/ — langsung pakai URL, tanpa import
<img src='/logo.png' />
```

## Kegunaan

- Menyimpan gambar (`.png`, `.jpg`, `.webp`, `.gif`)
- Menyimpan ikon SVG yang digunakan sebagai komponen
- Menyimpan font custom jika tidak menggunakan CDN
- Mengelompokkan aset berdasarkan jenisnya

## Struktur yang Disarankan

```
src/assets/
├── images/
│   ├── logo.png
│   └── hero-banner.webp
├── icons/
│   ├── arrow-right.svg
│   └── close.svg
└── fonts/
    └── inter.woff2
```

## Contoh Penggunaan

Import gambar:

```tsx
import logo from '@/assets/images/logo.png';

export default function Navbar() {
  return <img src={logo} alt='Logo' className='h-8 w-auto' />;
}
```

Import SVG sebagai komponen (dengan plugin `vite-plugin-svgr`):

```tsx
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow-right.svg';

export default function Button() {
  return (
    <button>
      Lanjut <ArrowIcon className='ml-2 h-4 w-4' />
    </button>
  );
}
```
