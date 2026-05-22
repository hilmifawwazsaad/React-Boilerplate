# src/services/

Folder ini menyimpan logika bisnis aplikasi yang mengorkestrasikan pemanggilan API, transformasi data, dan operasi lain yang tidak terkait langsung dengan tampilan.

> **Penting:** Services **tidak memanggil API secara langsung** — itu tugas `src/api/`. Services menggunakan hasil dari `src/api/` dan menambahkan logika di atasnya (transformasi, validasi, side effects seperti menyimpan token).

## Kegunaan

- Mengolah dan mentransformasi data dari API sebelum dipakai komponen
- Menggabungkan beberapa API call menjadi satu operasi
- Menangani side effects bisnis (simpan token, update cache, dsb.)
- Memisahkan logika bisnis dari komponen dan hooks

## Struktur yang Disarankan

```
src/services/
├── auth.service.ts     # Logika bisnis autentikasi
├── user.service.ts     # Logika bisnis data user
└── product.service.ts  # Logika bisnis produk
```

## Contoh Penggunaan

`src/services/auth.service.ts`

```ts
import { authApi } from '@/api/auth.api';

export const authService = {
  login: async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    // logika bisnis: simpan token setelah login berhasil
    localStorage.setItem('token', res.data.token);
    return res.data.user;
  },

  logout: async () => {
    await authApi.logout();
    // logika bisnis: bersihkan semua data sesi
    localStorage.removeItem('token');
  },
};
```

Penggunaan di hook:

```ts
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
  });
}
```
