"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

export default function AdminPanel() {
  const initialFormData = {
    namaKegiatan: "",
    tanggalKegiatan: "",
    tempatKegiatan: "",
    penanggungJawab: "",
    nomorTelepon: "",
    keterangan: "",
  };

  const formatTanggal = (value: string) => {
    if (!value) {
      return "-";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "-";
    }
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(parsed);
  };

  const getMonthKey = (value: string) => {
    if (!value) {
      return "Tanpa tanggal";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "Tanpa tanggal";
    }
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const formatMonthYear = (value: string) => {
    if (value === "Tanpa tanggal") {
      return "Tanpa tanggal";
    }
    const [year, month] = value.split("-");
    const parsed = new Date(Number(year), Number(month) - 1, 1);
    if (Number.isNaN(parsed.getTime())) {
      return "Tanpa tanggal";
    }
    return new Intl.DateTimeFormat("id-ID", {
      month: "long",
      year: "numeric",
    }).format(parsed);
  };

  const [formData, setFormData] = useState(initialFormData);
  const [jadwalList, setJadwalList] = useState<
    Array<typeof initialFormData & { id: string }>
  >([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("jadwalWalikotaDraft");
    if (!stored) {
      return;
    }
    try {
      const parsed = JSON.parse(stored) as Partial<typeof formData>;
      setFormData((prev) => ({
        ...prev,
        ...parsed,
      }));
    } catch (error) {
      console.error("Failed to parse saved draft", error);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "jadwalWalikotaDraft",
      JSON.stringify(formData)
    );
  }, [formData]);

  useEffect(() => {
    const storedList = window.localStorage.getItem("jadwalWalikotaList");
    if (!storedList) {
      return;
    }
    try {
      const parsed = JSON.parse(storedList) as Array<
        typeof initialFormData & { id: string }
      >;
      setJadwalList(parsed);
      if (parsed.length > 0) {
        setSelectedId(parsed[0].id);
      }
    } catch (error) {
      console.error("Failed to parse saved list", error);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "jadwalWalikotaList",
      JSON.stringify(jadwalList)
    );
  }, [jadwalList]);

  useEffect(() => {
    const storedCollapsed = window.localStorage.getItem(
      "jadwalWalikotaCollapsed"
    );
    if (!storedCollapsed) {
      return;
    }
    try {
      const parsed = JSON.parse(storedCollapsed) as Record<string, boolean>;
      setCollapsedGroups(parsed);
    } catch (error) {
      console.error("Failed to parse collapsed groups", error);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "jadwalWalikotaCollapsed",
      JSON.stringify(collapsedGroups)
    );
  }, [collapsedGroups]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    const timer = window.setTimeout(() => setToastMessage(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const selectedJadwal = useMemo(() => {
    if (!selectedId) {
      return null;
    }
    return jadwalList.find((item) => item.id === selectedId) ?? null;
  }, [jadwalList, selectedId]);

  const groupedJadwal = useMemo(() => {
    return jadwalList.reduce<Record<string, typeof jadwalList>>((acc, item) => {
      const key = getMonthKey(item.tanggalKegiatan);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  }, [jadwalList]);

  const sortedGroupedJadwal = useMemo(() => {
    const entries = Object.entries(groupedJadwal);
    return entries.map(([key, items]) => {
      const sortedItems = [...items].sort((a, b) =>
        a.tanggalKegiatan.localeCompare(b.tanggalKegiatan)
      );
      return [key, sortedItems] as const;
    });
  }, [groupedJadwal]);

  const sortedGroupKeys = useMemo(() => {
    const keys = Object.keys(groupedJadwal);
    return keys.sort((a, b) => {
      if (a === "Tanpa tanggal") return 1;
      if (b === "Tanpa tanggal") return -1;
      return b.localeCompare(a);
    });
  }, [groupedJadwal]);

  const currentMonthKey = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }, []);

  const downloadMonthlyReport = () => {
    const data: (string | number)[][] = [
      [
        "REKAPAN KEGIATAN WALIKOTA BALIKPAPAN - PER BULAN",
      ],
      [],
      ["No", "Nama Kegiatan", "Tanggal", "Tempat", "Penanggung Jawab", "Nomor Telepon", "Keterangan"],
    ];

    let rowNum = 4;
    let itemNum = 1;

    sortedGroupKeys.forEach((key) => {
      const monthName =
        key === "Tanpa tanggal"
          ? key
          : formatMonthYear(key);
      data.push([monthName, "", "", "", "", "", ""]);
      rowNum++;

      groupedJadwal[key].forEach((item) => {
        data.push([
          itemNum.toString(),
          item.namaKegiatan,
          formatTanggal(item.tanggalKegiatan),
          item.tempatKegiatan,
          item.penanggungJawab,
          item.nomorTelepon,
          item.keterangan,
        ]);
        itemNum++;
        rowNum++;
      });
      data.push([]);
      rowNum++;
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = [
      { wch: 5 },
      { wch: 25 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 30 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekapan Bulanan");
    
    const now = new Date();
    const filename = `Rekapan_Kegiatan_Bulanan_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  const downloadYearlyReport = () => {
    const yearMap: Record<string, typeof jadwalList> = {};
    
    jadwalList.forEach((item) => {
      const year = item.tanggalKegiatan
        ? new Date(item.tanggalKegiatan).getFullYear().toString()
        : "Tanpa tanggal";
      
      if (!yearMap[year]) {
        yearMap[year] = [];
      }
      yearMap[year].push(item);
    });

    const data: (string | number)[][] = [
      ["REKAPAN KEGIATAN WALIKOTA BALIKPAPAN - PER TAHUN"],
      [],
      ["No", "Nama Kegiatan", "Tanggal", "Tempat", "Penanggung Jawab", "Nomor Telepon", "Keterangan"],
    ];

    let itemNum = 1;

    Object.keys(yearMap)
      .sort((a, b) => {
        if (a === "Tanpa tanggal") return 1;
        if (b === "Tanpa tanggal") return -1;
        return Number(b) - Number(a);
      })
      .forEach((year) => {
        data.push([year === "Tanpa tanggal" ? year : `Tahun ${year}`, "", "", "", "", "", ""]);

        yearMap[year].forEach((item) => {
          data.push([
            itemNum.toString(),
            item.namaKegiatan,
            formatTanggal(item.tanggalKegiatan),
            item.tempatKegiatan,
            item.penanggungJawab,
            item.nomorTelepon,
            item.keterangan,
          ]);
          itemNum++;
        });
        data.push([]);
      });

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = [
      { wch: 5 },
      { wch: 25 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 30 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekapan Tahunan");
    
    const now = new Date();
    const filename = `Rekapan_Kegiatan_Tahunan_${now.getFullYear()}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-3 py-8 sm:px-6 sm:py-16">
      <main className="surface w-full max-w-6xl rounded-2xl sm:rounded-4xl border border-black/5 px-4 py-8 sm:px-12 sm:py-12">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-center font-display text-2xl font-extrabold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-linear-to-r from-[#F97316] via-[#EC4899] to-[#6366F1] sm:text-4xl">
              Panel Admin
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <img
                src="/assets/logo-walikota.png"
                alt="Logo Jadwal Walikota"
                className="h-14 w-14 object-contain sm:h-17 sm:w-17"
              />
              <div className="space-y-1 text-center sm:text-left">
                <h1 className="font-display text-xl font-extrabold uppercase leading-tight text-transparent bg-clip-text bg-linear-to-r from-[#22C55E] via-[#EAB308] to-[#F97316] sm:text-3xl">
                  Input Jadwal Kegiatan Walikota
                </h1>
                <p className="text-xs leading-5 sm:text-sm sm:leading-6 text-(--muted)">
                  Lengkapi data agenda agar tersampaikan secara jelas kepada warga.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <form
              className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white/80 p-3 sm:p-6 lg:h-fit lg:self-start"
              onSubmit={(event) => {
                event.preventDefault();
                if (editingId) {
                  setJadwalList((prev) =>
                    prev.map((item) =>
                      item.id === editingId ? { ...item, ...formData } : item
                    )
                  );
                  setSelectedId(editingId);
                  setEditingId(null);
                  setToastMessage("Jadwal diperbarui.");
                } else {
                  const newItem = {
                    ...formData,
                    id: `${Date.now()}`,
                  };
                  setJadwalList((prev) => [newItem, ...prev]);
                  setSelectedId(newItem.id);
                  setToastMessage("Jadwal disimpan.");
                }
                setFormData(initialFormData);
                window.localStorage.removeItem("jadwalWalikotaDraft");
              }}
            >
              <div className="space-y-3 sm:space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Input jadwal
                </p>
                {editingId ? (
                  <p className="text-[10px] sm:text-xs text-(--brass)">
                    Mode edit aktif. Simpan untuk memperbarui jadwal.
                  </p>
                ) : null}
                <div className="grid gap-2.5 sm:gap-3 md:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                      Nama kegiatan
                    </label>
                    <input
                      className="field w-full rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-4 sm:py-3 text-sm"
                      placeholder="Masukkan nama kegiatan"
                      required
                      type="text"
                      value={formData.namaKegiatan}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          namaKegiatan: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                      Tanggal kegiatan
                    </label>
                    <input
                      className="field w-full rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm"
                      required
                      type="date"
                      value={formData.tanggalKegiatan}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          tanggalKegiatan: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                      Tempat kegiatan
                    </label>
                    <input
                      className="field w-full rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm"
                      placeholder="Masukkan tempat kegiatan"
                      required
                      type="text"
                      value={formData.tempatKegiatan}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          tempatKegiatan: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                      Penanggung jawab kegiatan
                    </label>
                    <input
                      className="field w-full rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm"
                      placeholder="Nama penanggung jawab"
                      required
                      type="text"
                      value={formData.penanggungJawab}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          penanggungJawab: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                      Nomor telepon
                    </label>
                    <input
                      className="field w-full rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm"
                      placeholder="Contoh: 08xxxxxxxxxx"
                      required
                      type="tel"
                      value={formData.nomorTelepon}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          nomorTelepon: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                      Keterangan
                    </label>
                    <textarea
                      className="field min-h-24 sm:min-h-30 w-full resize-none rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm"
                      placeholder="Tambahkan keterangan kegiatan"
                      required
                      value={formData.keterangan}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          keterangan: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <button
                    className="flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-(--sea) px-3 py-2 sm:px-5 sm:py-3 text-[10px] sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white transition hover:-translate-y-px"
                    type="submit"
                  >
                    {editingId ? (
                      <Icon icon="mdi:content-save-edit" className="text-lg" />
                    ) : (
                      <Icon icon="mdi:content-save-outline" className="text-lg" />
                    )}
                    {editingId ? "Simpan Perubahan" : "Simpan Jadwal"}
                  </button>
                  <div className="grid gap-2 sm:gap-3 grid-cols-2">
                    <button
                      className="w-full rounded-full border border-black/15 px-2.5 py-1.5 sm:px-5 sm:py-3 text-[10px] sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground transition hover:border-black/40"
                      type="button"
                      onClick={() => {
                        setFormData(initialFormData);
                        setEditingId(null);
                        window.localStorage.removeItem("jadwalWalikotaDraft");
                      }}
                    >
                      Reset Form
                    </button>
                    <button
                      className="flex w-full items-center justify-center gap-1 sm:gap-2 rounded-full border border-black/15 px-2.5 py-1.5 sm:px-5 sm:py-3 text-[10px] sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground transition hover:border-black/40 disabled:opacity-50"
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setFormData(initialFormData);
                        window.localStorage.removeItem("jadwalWalikotaDraft");
                        setToastMessage("Mode edit dibatalkan.");
                      }}
                      disabled={!editingId}
                    >
                      <Icon icon="mdi:close-circle-outline" className="text-lg" />
                      Batal Edit
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <section className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 p-3 sm:p-6">
              <div className="flex h-full flex-col gap-0">
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                    Hasil input jadwal
                  </p>
                  <h2 className="font-display text-lg sm:text-2xl">Preview Jadwal</h2>
                  <p className="text-xs sm:text-sm text-(--muted)">
                    Pilih salah satu jadwal untuk melihat detailnya.
                  </p>
                </div>
                <div className="flex flex-col flex-1 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="space-y-3 sm:space-y-4 rounded-xl sm:rounded-2xl border border-black/10 bg-white/80 p-3 sm:p-5 flex-1">
                  {jadwalList.length === 0 ? (
                    <p className="text-xs sm:text-sm text-(--muted)">
                      Belum ada jadwal tersimpan.
                    </p>
                  ) : (
                    <div className="space-y-3 sm:space-y-5">
                      {sortedGroupKeys.map((groupKey) => (
                        <div key={groupKey} className="space-y-2 sm:space-y-3">
                          <div
                            className={`flex items-center justify-between rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-4 sm:py-3 ${
                              groupKey === currentMonthKey
                                ? "border-(--sea)/50 bg-(--sea)/10"
                                : "border-black/10 bg-white/70"
                            }`}
                          >
                            <div>
                              <p className="text-xs uppercase tracking-[0.3em] text-(--muted)">
                                {formatMonthYear(groupKey)}
                              </p>
                              <span className="text-xs text-(--muted)">
                                {groupedJadwal[groupKey].length} agenda
                              </span>
                            </div>
                            <button
                              className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-foreground"
                              type="button"
                              onClick={() =>
                                setCollapsedGroups((prev) => ({
                                  ...prev,
                                  [groupKey]: !prev[groupKey],
                                }))
                              }
                            >
                              {collapsedGroups[groupKey] ? "Tampilkan" : "Sembunyikan"}
                              <Icon
                                icon={
                                  collapsedGroups[groupKey]
                                    ? "mdi:chevron-down"
                                    : "mdi:chevron-up"
                                }
                                className="text-lg"
                              />
                            </button>
                          </div>
                          {!collapsedGroups[groupKey] ? (
                            <div className="space-y-2 sm:space-y-3">
                              {(sortedGroupedJadwal.find(
                                ([key]) => key === groupKey
                              )?.[1] ?? []).map((item) => (
                              <div
                                key={item.id}
                                className={`flex items-center justify-between gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm transition ${
                                  selectedId === item.id
                                    ? "border-black/30 bg-white"
                                    : "border-black/10 bg-white/60 hover:border-black/30"
                                }`}
                              >
                                <button
                                  className="flex-1 text-left min-w-0"
                                  type="button"
                                  onClick={() => {
                                    setSelectedId(item.id);
                                    setIsDetailOpen(true);
                                  }}
                                >
                                  <p className="font-semibold text-foreground truncate">
                                    {item.namaKegiatan || "(Tanpa judul)"}
                                  </p>
                                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-(--muted)">
                                    {formatTanggal(item.tanggalKegiatan)}
                                  </p>
                                </button>
                                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                  <button
                                    className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-black/10 text-(--sea) transition hover:border-black/30"
                                    type="button"
                                    aria-label="Edit jadwal"
                                    onClick={() => {
                                      setFormData({
                                        namaKegiatan: item.namaKegiatan,
                                        tanggalKegiatan: item.tanggalKegiatan,
                                        tempatKegiatan: item.tempatKegiatan,
                                        penanggungJawab: item.penanggungJawab,
                                        nomorTelepon: item.nomorTelepon,
                                        keterangan: item.keterangan,
                                      });
                                      setEditingId(item.id);
                                      setSelectedId(item.id);
                                    }}
                                  >
                                    <Icon icon="mdi:pencil" className="text-sm sm:text-lg" />
                                  </button>
                                  <button
                                    className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-black/10 text-(--brass) transition hover:border-black/30"
                                    type="button"
                                    aria-label="Hapus jadwal"
                                    onClick={() => {
                                      const confirmed = window.confirm(
                                        "Hapus jadwal ini dari daftar?"
                                      );
                                      if (!confirmed) {
                                        return;
                                      }
                                      const remaining = jadwalList.filter(
                                        (entry) => entry.id !== item.id
                                      );
                                      setJadwalList(remaining);
                                      if (selectedId === item.id) {
                                        setSelectedId(
                                          remaining.length > 0
                                            ? remaining[0].id
                                            : null
                                        );
                                      }
                                      if (editingId === item.id) {
                                        setEditingId(null);
                                        setFormData(initialFormData);
                                        window.localStorage.removeItem(
                                          "jadwalWalikotaDraft"
                                        );
                                      }
                                      setToastMessage("Jadwal dihapus.");
                                    }}
                                  >
                                    <Icon
                                      icon="mdi:trash-can-outline"
                                      className="text-sm sm:text-lg"
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-auto pt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                    Rekapan kegiatan
                  </p>
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-2">
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-(--sea) border border-(--sea) px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:shadow-lg hover:scale-105 shadow-md flex-1"
                      type="button"
                      onClick={downloadMonthlyReport}
                      title="Download rekapan kegiatan per bulan"
                    >
                      <Icon icon="mdi:download" className="text-base sm:text-lg" />
                      <span>Bulanan</span>
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-(--brass) border border-(--brass) px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:shadow-lg hover:scale-105 shadow-md flex-1"
                      type="button"
                      onClick={downloadYearlyReport}
                      title="Download rekapan kegiatan per tahun"
                    >
                      <Icon icon="mdi:download" className="text-base sm:text-lg" />
                      <span>Tahunan</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link className="text-foreground underline" href="/">
              Kembali ke halaman awal
            </Link>
            <Link className="text-(--muted) underline" href="/login/admin">
              Keluar dari panel
            </Link>
          </div>
        </div>
      </main>

      {toastMessage ? (
        <div className="fixed bottom-6 right-6 z-50 rounded-full border border-black/10 bg-white/90 px-5 py-3 text-sm text-foreground shadow-lg">
          {toastMessage}
        </div>
      ) : null}
      {isDetailOpen && selectedJadwal ? (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsDetailOpen(false)}
        >
          <div
            className="modal-panel surface w-full max-w-2xl rounded-4xl border border-black/10 bg-white/95 p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-(--sea)">
                  Detail Jadwal
                </p>
                <h3 className="font-display text-2xl">
                  {selectedJadwal.namaKegiatan || "(Tanpa judul)"}
                </h3>
              </div>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-foreground transition hover:border-black/30"
                type="button"
                aria-label="Tutup detail"
                onClick={() => setIsDetailOpen(false)}
              >
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>
            <div className="mt-6 space-y-4 rounded-2xl border border-black/10 bg-white/80 p-5">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Tanggal kegiatan
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {formatTanggal(selectedJadwal.tanggalKegiatan)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Tempat kegiatan
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedJadwal.tempatKegiatan || "-"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Penanggung jawab
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedJadwal.penanggungJawab || "-"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Nomor telepon
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedJadwal.nomorTelepon || "-"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Keterangan
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedJadwal.keterangan || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
