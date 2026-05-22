# src/contexts/

Folder ini menyimpan React Context yang digunakan untuk berbagi state antar komponen tanpa prop drilling.

> **Penting:** Gunakan Context untuk state yang bersifat global dan jarang berubah (auth, tema, bahasa). Untuk state yang sering berubah atau kompleks, pertimbangkan menggunakan state management di `src/store/`.

## Kegunaan

- Menyimpan dan mendistribusikan state global seperti data user yang sedang login
- Mengelola tema (dark/light mode)
- Menyediakan custom hook untuk mengakses context dengan mudah

## Struktur yang Disarankan

```
src/contexts/
├── AuthContext.tsx      # Context untuk autentikasi user
└── ThemeContext.tsx     # Context untuk tema aplikasi
```

## Contoh Penggunaan

`src/contexts/AuthContext.tsx`

```tsx
import { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

Penggunaan di komponen:

```tsx
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <span>Halo, {user?.name}</span>
      <button onClick={logout}>Keluar</button>
    </nav>
  );
}
```
