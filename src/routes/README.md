# src/routes/

Folder ini menyimpan definisi routing aplikasi menggunakan React Router.

> **Penting:** Folder ini hanya berisi **konfigurasi route**, bukan komponen halaman. Komponen halaman tetap di `src/pages/`. Pisahkan route berdasarkan akses (public, protected) untuk kemudahan pengelolaan.

## Kegunaan

- Mendefinisikan semua route aplikasi di satu tempat
- Memisahkan route publik dan route yang memerlukan autentikasi
- Menyediakan komponen guard untuk proteksi route

## Struktur yang Disarankan

```
src/routes/
├── index.tsx           # Root router, menggabungkan semua route
├── PublicRoutes.tsx    # Route yang bisa diakses tanpa login
└── ProtectedRoutes.tsx # Route yang memerlukan autentikasi
```

## Contoh Penggunaan

`src/routes/ProtectedRoutes.tsx`

```tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoutes() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to='/login' replace />;
}
```

`src/routes/index.tsx`

```tsx
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import DashboardPage from '@/pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/dashboard', element: <DashboardPage /> },
    ],
  },
]);
```

Penggunaan di `main.tsx`:

```tsx
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';

<RouterProvider router={router} />;
```
