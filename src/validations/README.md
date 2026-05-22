# src/validations/

Folder ini menyimpan skema validasi form menggunakan library seperti Zod atau Yup, dikelompokkan berdasarkan domain/fitur.

> **Penting:** Simpan di sini hanya skema yang digunakan di lebih dari satu form. Skema validasi yang hanya dipakai di satu form boleh didefinisikan langsung di file form tersebut.

## Kegunaan

- Mendefinisikan aturan validasi input form secara terpusat
- Menghasilkan TypeScript type dari skema validasi (type inference)
- Memudahkan penggunaan ulang validasi yang sama di banyak form

## Struktur yang Disarankan

```
src/validations/
├── auth.validation.ts      # Skema validasi login, register
└── user.validation.ts      # Skema validasi profil user
```

## Contoh Penggunaan

`src/validations/auth.validation.ts`

```ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
```

Penggunaan dengan React Hook Form:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/validations/auth.validation';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type='password' {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type='submit'>Login</button>
    </form>
  );
}
```
