# Jadwal Kegiatan Walikota Balikpapan

Website untuk mengelola dan melihat jadwal kegiatan Walikota Balikpapan. Aplikasi ini memiliki dua jalur akses: panel admin untuk mengelola jadwal dan dashboard pengguna untuk melihat jadwal.

## 🚀 Fitur

### Panel Admin
- ✅ Input jadwal kegiatan (nama, tanggal, jam, tempat, penanggung jawab, dll)
- ✅ Edit dan hapus jadwal
- ✅ Preview jadwal berdasarkan bulan
- ✅ Export jadwal ke Excel
- ✅ Auto-save draft form

### Dashboard Pengguna
- ✅ Kalender interaktif dengan warna per kegiatan
- ✅ Filter dan pencarian jadwal
- ✅ Detail kegiatan
- ✅ Tampilan responsif mobile
- ✅ Real-time update dari localStorage

## 📦 Teknologi

- **Next.js 16.1.6** - React framework dengan App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **XLSX** - Export Excel
- **@iconify/react** - Icons
- **localStorage** - Data persistence

## 🏗️ Struktur Project

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Halaman utama
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── admin/
│   │   └── panel/
│   │       └── page.tsx   # Panel admin
│   ├── login/
│   │   ├── admin/
│   │   │   └── page.tsx   # Login admin
│   │   └── user/
│   │       └── page.tsx   # Login user
│   └── user/
│       └── dashboard/
│           └── page.tsx   # Dashboard user
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── InputField.tsx
│   ├── TextAreaField.tsx
│   ├── Toast.tsx
│   ├── Modal.tsx
│   └── index.ts
├── lib/                   # Utility functions
│   ├── formatters.ts      # Date/time formatters
│   ├── storage.ts         # localStorage helpers
│   ├── excel.ts           # Excel export
│   ├── constants.ts       # Color palette, etc
│   └── index.ts
└── types/                 # TypeScript types
    ├── jadwal.ts
    └── index.ts
```

## 🛠️ Instalasi

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📱 Halaman

| Route | Deskripsi |
|-------|-----------|
| `/` | Halaman utama dengan pilihan login |
| `/login/admin` | Halaman login admin |
| `/login/user` | Halaman login user |
| `/admin/panel` | Panel admin untuk kelola jadwal |
| `/user/dashboard` | Dashboard user untuk lihat jadwal |

## 💾 Data Storage

Aplikasi menggunakan **localStorage** untuk menyimpan data:
- `jadwalWalikotaList` - Array semua jadwal
- `jadwalWalikotaDraft` - Draft form admin (auto-save)

Data structure:
```typescript
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
```

## 🎨 Customization

### CSS Variables
Edit di [src/app/globals.css](src/app/globals.css):
```css
:root {
  --ink: #1e293b;      /* Text color */
  --paper: #f8fafc;    /* Background */
  --sea: #0284c7;      /* Primary color */
  --brass: #f59e0b;    /* Accent color */
  --muted: #64748b;    /* Muted text */
}
```

### Color Palette (Kalender)
Edit di [src/lib/constants.ts](src/lib/constants.ts)

## 📝 Component Usage

```tsx
// Button
import { Button } from "@/components";
<Button variant="primary">Click me</Button>

// Input Field
import { InputField } from "@/components";
<InputField label="Nama" type="text" />

// Card
import { Card, CardHeader } from "@/components";
<Card>
  <CardHeader title="Title" icon="mdi:calendar" />
  Content...
</Card>
```

## 🔧 Utility Functions

```tsx
// Formatters
import { formatTanggal, formatMonthYear } from "@/lib";
const formatted = formatTanggal("2026-02-13"); // "13 Februari 2026"

// Storage
import { getJadwalList, addJadwal, updateJadwal } from "@/lib";
const jadwalList = getJadwalList();
addJadwal(newJadwal);
updateJadwal(id, updatedData);

// Excel Export
import { exportToExcel } from "@/lib";
exportToExcel(jadwalList);
```

## 🌐 Deployment

Project ini menggunakan **Vercel** untuk deployment otomatis dari GitHub.

```bash
# Build production
npm run build

# Run production server
npm start
```

## 📄 License

[Your License Here]

## 👥 Contact

[Your Contact Information]
