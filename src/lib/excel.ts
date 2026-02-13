import * as XLSX from "xlsx";
import type { JadwalKegiatan } from "@/types/jadwal";
import { formatTanggal } from "./formatters";

/**
 * Export jadwal list ke file Excel
 */
export function exportToExcel(
  jadwalList: JadwalKegiatan[],
  monthKey?: string
): void {
  let dataToExport = jadwalList;
  let filename = "Jadwal_Walikota_Balikpapan.xlsx";

  if (monthKey && monthKey !== "Tanpa tanggal") {
    dataToExport = jadwalList.filter(
      (item) => item.tanggalKegiatan.startsWith(monthKey)
    );
    filename = `Jadwal_Walikota_${monthKey}.xlsx`;
  }

  const exportData = dataToExport.map((item, index) => ({
    No: index + 1,
    "Nama Kegiatan": item.namaKegiatan || "-",
    "Tanggal Kegiatan": formatTanggal(item.tanggalKegiatan),
    "Jam Kegiatan": item.jamKegiatan || "-",
    "Tempat Kegiatan": item.tempatKegiatan || "-",
    "Penanggung Jawab": item.penanggungJawab || "-",
    "Nomor Telepon": item.nomorTelepon || "-",
    Keterangan: item.keterangan || "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Jadwal");

  // Set column widths
  worksheet["!cols"] = [
    { wch: 5 },  // No
    { wch: 30 }, // Nama Kegiatan
    { wch: 20 }, // Tanggal Kegiatan
    { wch: 15 }, // Jam Kegiatan
    { wch: 25 }, // Tempat Kegiatan
    { wch: 25 }, // Penanggung Jawab
    { wch: 15 }, // Nomor Telepon
    { wch: 30 }, // Keterangan
  ];

  XLSX.writeFile(workbook, filename);
}
