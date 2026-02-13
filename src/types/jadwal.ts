/**
 * Interface untuk data jadwal kegiatan Walikota
 */
export interface JadwalKegiatan {
  id: string;
  namaKegiatan: string;
  tanggalKegiatan: string;
  jamKegiatan: string;
  tempatKegiatan: string;
  penanggungJawab: string;
  nomorTelepon: string;
  keterangan: string;
}

/**
 * Type untuk form input jadwal (tanpa id)
 */
export type JadwalFormData = Omit<JadwalKegiatan, "id">;

/**
 * Interface untuk color palette kalender
 */
export interface ColorPalette {
  bg: string;
  border: string;
  text: string;
}
