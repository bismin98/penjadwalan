# Jadwal Kegiatan Walikota Balikpapan - Copilot Instructions

## Project Overview
Website untuk mengelola dan melihat jadwal kegiatan Walikota Balikpapan dengan dua jalur akses:
- Panel Admin: Input, edit, hapus, dan export jadwal
- Dashboard User: Lihat kalender dan detail jadwal

## Tech Stack
- Next.js 16.1.6 (App Router, Turbopack)
- React + TypeScript
- Tailwind CSS
- localStorage untuk persistence
- XLSX untuk export Excel
- @iconify/react untuk icons

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx           # Homepage dengan card login
│   ├── admin/panel/       # Admin panel
│   ├── login/             # Login pages
│   └── user/dashboard/    # User dashboard
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── InputField.tsx
│   ├── TextAreaField.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   └── index.ts
├── lib/                   # Utility functions
│   ├── formatters.ts      # Date/time formatting
│   ├── storage.ts         # localStorage helpers
│   ├── excel.ts           # Excel export
│   ├── constants.ts       # Color palette
│   └── index.ts
└── types/                 # TypeScript types
    ├── jadwal.ts
    └── index.ts
```

## Coding Guidelines

### Import Pattern
```tsx
// Always use path aliases
import { Button, Card, InputField } from "@/components";
import { formatTanggal, getJadwalList, exportToExcel } from "@/lib";
import type { JadwalKegiatan, JadwalFormData } from "@/types";
```

### Component Structure
- Use functional components with hooks
- TypeScript interfaces untuk props
- Export named, bukan default
- Props naming: `ComponentNameProps`

Example:
```tsx
interface ButtonProps {
  variant: "primary" | "secondary";
  onClick: () => void;
}

export function Button({ variant, onClick }: ButtonProps) {
  // implementation
}
```

### Data Management
- localStorage keys: `jadwalWalikotaList`, `jadwalWalikotaDraft`
- Gunakan functions dari `@/lib/storage` untuk manipulasi data
- Normalize data dengan default values

### Styling
- Tailwind CSS untuk styling
- CSS variables di `globals.css`: `--ink`, `--paper`, `--sea`, `--brass`, `--muted`
- Safari compatibility: `-webkit-backdrop-filter`, `-webkit-appearance`
- Mobile-first responsive design

### Type Safety
```tsx
interface JadwalKegiatan {
  id: string;
  namaKegiatan: string;
  tanggalKegiatan: string;
  jamKegiatan: string;
  tempatKegiatan: string;
  penanggungJawab: string;
  nomorTelepon: string;
  keterangan: string;
}

type JadwalFormData = Omit<JadwalKegiatan, "id">;
```

## Best Practices

1. **Reusability**: Gunakan components dari `/components` folder
2. **Type Safety**: Selalu gunakan TypeScript types, hindari `any`
3. **Clean Imports**: Gunakan barrel exports (`index.ts`)
4. **Separation of Concerns**: 
   - UI components di `/components`
   - Business logic di `/lib`
   - Types di `/types`
5. **Error Handling**: Try-catch untuk localStorage operations
6. **Performance**: useMemo untuk calculated values
7. **Accessibility**: Proper labels, keyboard navigation

## Common Tasks

### Menambah Component Baru
1. Buat file di `src/components/ComponentName.tsx`
2. Export di `src/components/index.ts`
3. Import dengan `import { ComponentName } from "@/components"`

### Menambah Utility Function
1. Buat/update file di `src/lib/`
2. Export di `src/lib/index.ts`
3. Import dengan `import { functionName } from "@/lib"`

### Menambah Type
1. Buat/update file di `src/types/`
2. Export di `src/types/index.ts`
3. Import dengan `import type { TypeName } from "@/types"`

## Development Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Production server
npm run lint         # Lint check
```

## Git Workflow

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `style:` - Styling changes
- `docs:` - Documentation
- `chore:` - Build/config

## Documentation

- [README.md](../README.md) - Main documentation
- [docs/STRUCTURE.md](../docs/STRUCTURE.md) - Project structure details
- [docs/CONTRIBUTING.md](../docs/CONTRIBUTING.md) - Contributing guide

## Checklist Progress

- [x] Verify copilot-instructions.md created
- [x] Clarify Project Requirements
- [x] Scaffold the Project
- [x] Customize the Project
- [x] Install Required Extensions
- [x] Compile the Project
- [x] Refactor Project Structure
- [x] Add Components Library
- [x] Add Utility Functions
- [x] Add TypeScript Types
- [x] Ensure Documentation is Complete
- [ ] Create and Run Task
- [ ] Launch the Project
