# src/components/

Folder ini menyimpan komponen React yang dapat digunakan kembali di seluruh aplikasi.

> **Penting:** Komponen di sini bersifat umum dan tidak terikat pada halaman tertentu. Komponen yang hanya digunakan di satu halaman sebaiknya diletakkan langsung di dalam folder halaman tersebut (`src/pages/(route)/_components/`).

## Kegunaan

- Menyimpan UI komponen yang digunakan di banyak tempat (Button, Modal, Input, dsb.)
- Mengelompokkan komponen berdasarkan kategori (`ui`, `layout`, `form`, dsb.)
- Memisahkan tampilan dari logika bisnis

## Struktur yang Disarankan

```
src/components/
├── ui/
│   ├── Button.tsx          # Komponen tombol
│   ├── Modal.tsx           # Komponen modal/dialog
│   └── Badge.tsx           # Komponen badge/label
├── layout/
│   ├── Navbar.tsx          # Navigasi utama
│   ├── Sidebar.tsx         # Sidebar navigasi
│   └── Footer.tsx          # Footer halaman
└── form/
    ├── InputField.tsx      # Input teks dengan label dan error
    └── SelectField.tsx     # Dropdown select dengan label
```

## Contoh Penggunaan

`src/components/ui/Button.tsx`

```tsx
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled,
}: ButtonProps) {
  const base = 'px-4 py-2 rounded font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
```

Penggunaan di halaman:

```tsx
import Button from '@/components/ui/Button';

export default function Page() {
  return (
    <div>
      <Button variant='primary' onClick={() => console.log('clicked')}>
        Simpan
      </Button>
      <Button variant='danger'>Hapus</Button>
    </div>
  );
}
```
