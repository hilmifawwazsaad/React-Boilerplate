<div align="center">

<h1>React Vite TypeScript Boilerplate</h1>

Boilerplate React siap produksi dengan TypeScript, Tailwind CSS, dan berbagai alat quality code yang telah dikonfigurasi sejak awal.

</div>

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitlint (Conventional Commits)
- **CI/CD**: GitHub Actions

## Memulai

### 1. Clone atau Unduh Repository

```bash
# Clone repository
git clone https://github.com/hilmifawwazsaad/React-Boilerplate.git
cd React-Boilerplate

# Atau unduh ZIP dan ekstrak
```

### 2. Install Dependensi

```bash
pnpm install
```

### 3. Jalankan Development Server

```bash
pnpm dev
```

Buka [http://localhost:5173](http://localhost:5173) untuk melihat hasilnya.

### 4. Script yang Tersedia

```bash
# Development
pnpm dev              # Jalankan dev server
pnpm build            # Build untuk produksi
pnpm preview          # Preview hasil build produksi

# Code Quality
pnpm lint             # Jalankan ESLint
pnpm lint:strict      # ESLint dengan maksimal 0 warning
pnpm lint:fix         # Perbaiki error ESLint secara otomatis
pnpm format:write     # Format dengan Prettier
pnpm format:check     # Periksa formatting
pnpm format           # Format + Lint + Strict check (semua sekaligus)
```

## Struktur Folder

```
src/
├── api/          # HTTP client dan raw API call functions
├── assets/       # Gambar, font, SVG
├── components/   # Komponen UI yang dapat digunakan ulang
├── constants/    # Konstanta dan enum global
├── contexts/     # React context providers
├── hooks/        # Custom React hooks
├── lib/          # Konfigurasi library pihak ketiga
├── pages/        # Komponen halaman (route-level)
├── routes/       # Konfigurasi routing
├── services/     # Business logic yang memanggil api/
├── types/        # TypeScript types dan interfaces
├── utils/        # Pure utility functions
└── validations/  # Skema validasi (Zod, dll)
```

## Konvensi Penamaan File

- `.tsx` — Komponen React yang mengembalikan JSX
- `.ts` — File TypeScript (utils, services, types, hooks)
- `.css` — Stylesheet

## Fitur

### Konfigurasi TypeScript

- Strict mode diaktifkan untuk keamanan tipe yang lebih baik
- Path alias terkonfigurasi: `@/*` mengarah ke `./src/*`
- Contoh: `import Button from '@/components/Button'`

### Auto-formatting saat Menyimpan

Project ini menggunakan Prettier + ESLint dengan auto-formatting:

- **Saat Simpan**: VSCode otomatis memformat (dikonfigurasi di `.vscode/settings.json`)
- **Saat Commit**: Husky + lint-staged otomatis memformat file yang di-stage
- **Manual**: Jalankan `pnpm format`

### Git Hooks (Husky)

Git hooks yang telah dikonfigurasi untuk menjaga kualitas kode:

- **pre-commit**: Menjalankan lint-staged (format + lint file yang di-stage)
- **commit-msg**: Memvalidasi format pesan commit
- **pre-push**: Menjalankan strict lint check sebelum push
- **post-merge**: Otomatis install dependensi setelah merge

### Konvensi Pesan Commit

Project ini menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: tambah fitur baru
fix: perbaiki bug
docs: perbarui dokumentasi
style: format kode
refactor: restrukturisasi kode
test: tambah pengujian
chore: perbarui dependensi
ci: perbarui CI/CD
perf: peningkatan performa
revert: kembalikan perubahan
```

Commitlint akan menolak commit yang tidak mengikuti format ini.

### CI/CD (GitHub Actions)

- **CI** (`ci.yml`): Format check + strict lint + build — berjalan pada setiap push dan pull request ke `main`
- **CD** (`cd.yml`): Deploy otomatis setelah CI sukses — tersedia opsi Vercel, VPS via SSH, dan Docker

Lihat [`.github/workflows/README.md`](.github/workflows/README.md) untuk panduan konfigurasi secrets.

### AI Agent Skill Routing

Project ini menyertakan `AGENTS.md` dan folder `.agents/` untuk memandu AI coding assistant (Claude Code, Codex, Gemini, dll) bekerja sesuai konvensi project.

## Pengaturan Code Quality

### Integrasi ESLint + Prettier

- ESLint memvalidasi kualitas kode dan mendeteksi error
- Prettier memformat kode secara konsisten
- Keduanya bekerja bersama tanpa konflik
- File TypeScript otomatis di-lint dan diformat

### Integrasi VSCode

`.vscode/settings.json` telah dikonfigurasi dengan:

- Auto-format saat menyimpan
- ESLint auto-fix saat menyimpan
- TypeScript workspace SDK
- Tailwind CSS autocomplete + dukungan `cva` / `cx`

## Pelajari Lebih Lanjut

- [Dokumentasi React](https://react.dev/)
- [Dokumentasi Vite](https://vite.dev/)
- [Dokumentasi TypeScript](https://www.typescriptlang.org/docs/)
- [Dokumentasi Tailwind CSS](https://tailwindcss.com/docs)
- [Dokumentasi pnpm](https://pnpm.io/)
