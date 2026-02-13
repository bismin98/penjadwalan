import type { JadwalKegiatan, JadwalFormData } from "@/types/jadwal";

const JADWAL_LIST_KEY = "jadwalWalikotaList";
const JADWAL_DRAFT_KEY = "jadwalWalikotaDraft";

/**
 * Normalize jadwal data untuk memastikan semua field ada
 */
function normalizeJadwal(item: Partial<JadwalKegiatan>): JadwalKegiatan {
  return {
    id: item.id ?? "",
    namaKegiatan: item.namaKegiatan ?? "",
    tanggalKegiatan: item.tanggalKegiatan ?? "",
    jamKegiatan: item.jamKegiatan ?? "",
    tempatKegiatan: item.tempatKegiatan ?? "",
    penanggungJawab: item.penanggungJawab ?? "",
    nomorTelepon: item.nomorTelepon ?? "",
    keterangan: item.keterangan ?? "",
  };
}

/**
 * Get semua jadwal dari localStorage
 */
export function getJadwalList(): JadwalKegiatan[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(JADWAL_LIST_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as Partial<JadwalKegiatan>[];
    return parsed.map(normalizeJadwal);
  } catch (error) {
    console.error("Failed to parse jadwal list", error);
    return [];
  }
}

/**
 * Save jadwal list ke localStorage
 */
export function saveJadwalList(list: JadwalKegiatan[]): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(JADWAL_LIST_KEY, JSON.stringify(list));
}

/**
 * Get draft jadwal dari localStorage
 */
export function getJadwalDraft(): Partial<JadwalFormData> | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(JADWAL_DRAFT_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as Partial<JadwalFormData>;
  } catch (error) {
    console.error("Failed to parse jadwal draft", error);
    return null;
  }
}

/**
 * Save draft jadwal ke localStorage
 */
export function saveJadwalDraft(draft: JadwalFormData): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(JADWAL_DRAFT_KEY, JSON.stringify(draft));
}

/**
 * Clear draft jadwal dari localStorage
 */
export function clearJadwalDraft(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(JADWAL_DRAFT_KEY);
}

/**
 * Add jadwal baru ke list
 */
export function addJadwal(jadwal: JadwalKegiatan): void {
  const list = getJadwalList();
  list.push(jadwal);
  saveJadwalList(list);
}

/**
 * Update jadwal yang sudah ada
 */
export function updateJadwal(id: string, jadwal: JadwalFormData): void {
  const list = getJadwalList();
  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index] = { ...jadwal, id };
    saveJadwalList(list);
  }
}

/**
 * Delete jadwal berdasarkan id
 */
export function deleteJadwal(id: string): void {
  const list = getJadwalList();
  const filtered = list.filter((item) => item.id !== id);
  saveJadwalList(filtered);
}

/**
 * Generate ID unik untuk jadwal baru
 */
export function generateJadwalId(): string {
  return `jadwal-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
