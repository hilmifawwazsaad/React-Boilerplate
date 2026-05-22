# src/api/

Folder ini menyimpan konfigurasi HTTP client dan definisi endpoint API yang digunakan di seluruh aplikasi.

> **Penting:** Folder ini berisi **dua hal**: setup axios instance dan pemanggilan endpoint per domain. Logika bisnis yang mengolah hasil API diletakkan di `src/services/`.

## Kegunaan

- Membuat instance axios dengan base URL dan default headers
- Menambahkan request interceptor (misal: menyisipkan token autentikasi)
- Menambahkan response interceptor (misal: handle error 401, refresh token)
- Mendefinisikan semua endpoint API dikelompokkan per domain/resource

## Struktur yang Disarankan

```
src/api/
├── index.ts        # Axios instance & interceptors
├── auth.api.ts     # Endpoint autentikasi (login, logout, register)
├── user.api.ts     # Endpoint data user
└── product.api.ts  # Endpoint data produk
```

## Contoh Penggunaan

`src/api/index.ts`

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

`src/api/auth.api.ts`

```ts
import api from '@/api';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: { id: string; name: string; role: string };
};

export const authApi = {
  login: (payload: LoginPayload) =>
    api.post<LoginResponse>('/auth/login', payload),

  logout: () => api.post('/auth/logout'),

  me: () => api.get('/auth/me'),
};
```

Penggunaan di `src/services/`:

```ts
import { authApi } from '@/api/auth.api';

// services menggunakan api, lalu menambahkan logika bisnis di atasnya
export const loginUser = async (email: string, password: string) => {
  const res = await authApi.login({ email, password });
  localStorage.setItem('token', res.data.token);
  return res.data.user;
};
```
