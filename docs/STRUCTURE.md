# Struktur Project

## Overview
Project ini menggunakan Next.js App Router dengan TypeScript dan Tailwind CSS. Struktur dirancang untuk memisahkan concern dan memudahkan maintenance.

## Directory Structure

### `/src/app`
Berisi semua halaman dan route menggunakan Next.js App Router.

- `page.tsx` - Halaman utama dengan card login
- `layout.tsx` - Root layout dengan font dan metadata
- `globals.css` - Global styles dan CSS variables
- `admin/panel/page.tsx` - Panel admin untuk kelola jadwal
- `login/admin/page.tsx` - Halaman login admin
- `login/user/page.tsx` - Halaman login user
- `user/dashboard/page.tsx` - Dashboard user untuk lihat jadwal

### `/src/components`
Reusable UI components yang dapat digunakan di berbagai halaman.

- `Button.tsx` - Button component dengan berbagai variant (primary, secondary, danger, gradient)
- `Card.tsx` - Card container dengan backdrop blur effect dan CardHeader
- `InputField.tsx` - Input field dengan label dan error state
- `TextAreaField.tsx` - Textarea field dengan label dan error state
- `Modal.tsx` - Modal dialog component
- `Toast.tsx` - Toast notification component
- `index.ts` - Barrel export untuk semua components

**Cara pakai:**
```tsx
import { Button, Card, InputField } from "@/components";
```

### `/src/lib`
Utility functions dan helper functions.

- `formatters.ts` - Formatting functions untuk tanggal, waktu, bulan-tahun
  - `formatTanggal(value: string)` - Format ke "dd MMMM yyyy"
  - `formatMonthYear(value: string)` - Format ke "MMMM yyyy"
  - `formatDay(date: Date)` - Format dengan hari (Senin, 13 Februari 2026)
  - `getMonthKey(value: string)` - Get month key "yyyy-MM"

- `storage.ts` - localStorage management
  - `getJadwalList()` - Get semua jadwal
  - `saveJadwalList(list)` - Save jadwal list
  - `addJadwal(jadwal)` - Tambah jadwal baru
  - `updateJadwal(id, jadwal)` - Update jadwal
  - `deleteJadwal(id)` - Hapus jadwal
  - `getJadwalDraft()` - Get draft form
  - `saveJadwalDraft(draft)` - Save draft form
  - `generateJadwalId()` - Generate unique ID

- `excel.ts` - Excel export functionality
  - `exportToExcel(jadwalList, monthKey?)` - Export ke Excel file

- `constants.ts` - Constants dan configuration
  - `COLOR_PALETTE` - Array warna untuk kalender
  - `getColorForItem(index)` - Get color berdasarkan index

- `index.ts` - Barrel export

**Cara pakai:**
```tsx
import { formatTanggal, getJadwalList, exportToExcel } from "@/lib";
```

### `/src/types`
TypeScript type definitions.

- `jadwal.ts` - Types untuk jadwal kegiatan
  - `JadwalKegiatan` - Interface untuk jadwal lengkap dengan id
  - `JadwalFormData` - Type untuk form (tanpa id)
  - `ColorPalette` - Interface untuk color palette

- `index.ts` - Barrel export

**Cara pakai:**
```tsx
import type { JadwalKegiatan, JadwalFormData } from "@/types";
```

## Data Flow

### Admin Panel
1. Admin input data di form ([admin/panel/page.tsx](../app/admin/panel/page.tsx))
2. Form data auto-save ke localStorage sebagai draft
3. Saat submit, data disimpan ke `jadwalWalikotaList` via `addJadwal()`
4. Preview otomatis ter-update dengan data terbaru

### User Dashboard
1. User membuka dashboard ([user/dashboard/page.tsx](../app/user/dashboard/page.tsx))
2. Component load data dari localStorage via `getJadwalList()`
3. Data ditampilkan di kalender dengan color-coding
4. Listen untuk storage events untuk real-time update

## localStorage Keys

| Key | Deskripsi | Data Type |
|-----|-----------|-----------|
| `jadwalWalikotaList` | Array semua jadwal | `JadwalKegiatan[]` |
| `jadwalWalikotaDraft` | Draft form admin | `JadwalFormData` |

## Design Patterns

### Component Pattern
- Semua components functional dengan React hooks
- Props menggunakan TypeScript interfaces
- Reusable dan composable

### State Management
- useState untuk local state
- useEffect untuk side effects
- useMemo untuk calculated values
- localStorage untuk persistence

### File Organization
- Barrel exports (`index.ts`) untuk clean imports
- Separation of concerns (types, utils, components)
- Co-location of related code

## Best Practices

1. **Import dengan alias**
   ```tsx
   import { Button } from "@/components";
   import { formatTanggal } from "@/lib";
   import type { JadwalKegiatan } from "@/types";
   ```

2. **Type safety**
   - Gunakan TypeScript types untuk semua data
   - Avoid `any` type
   - Use interfaces untuk objects

3. **Component composition**
   - Pisahkan UI components yang reusable
   - Use props untuk customization
   - Keep components focused (single responsibility)

4. **Code style**
   - Use ESLint untuk consistency
   - Format dengan Prettier (if configured)
   - Meaningful variable names

## Future Improvements

Potential enhancements:
- [ ] Backend API integration
- [ ] Authentication system
- [ ] Database persistence (PostgreSQL, MongoDB)
- [ ] Real-time sync (WebSocket)
- [ ] File upload untuk dokumen
- [ ] Email notifications
- [ ] Role-based access control
- [ ] Unit tests
- [ ] E2E tests
