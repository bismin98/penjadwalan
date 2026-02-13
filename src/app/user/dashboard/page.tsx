"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";

export default function UserDashboard() {
  const today = new Date(2026, 1, 13); // 13 Februari 2026

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const [jadwalList, setJadwalList] = useState<
    Array<{
      id: string;
      namaKegiatan: string;
      tanggalKegiatan: string;
      tempatKegiatan: string;
      penanggungJawab: string;
      nomorTelepon: string;
      keterangan: string;
    }>
  >([]);

  const [selectedDetail, setSelectedDetail] = useState<(typeof jadwalList)[0] | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [dayEventsDialog, setDayEventsDialog] = useState<{
    day: number;
    events: typeof jadwalList;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  useEffect(() => {
    const storedList = window.localStorage.getItem("jadwalWalikotaList");
    if (!storedList) {
      return;
    }
    try {
      const parsed = JSON.parse(storedList) as typeof jadwalList;
      setJadwalList(parsed);
    } catch (error) {
      console.error("Failed to parse saved list", error);
    }

    // Listen for real-time updates from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "jadwalWalikotaList" && event.newValue) {
        try {
          const updated = JSON.parse(event.newValue) as typeof jadwalList;
          setJadwalList(updated);
        } catch (error) {
          console.error("Failed to parse updated list", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const colorPalette = [
    { bg: "bg-[#FEE2E2]", border: "border-[#FECACA]", text: "text-[#991B1B]" },
    { bg: "bg-[#FEF08A]", border: "border-[#FCD34D]", text: "text-[#713F12]" },
    { bg: "bg-[#DBEAFE]", border: "border-[#BFDBFE]", text: "text-[#1E40AF]" },
    { bg: "bg-[#D1FAE5]", border: "border-[#A7F3D0]", text: "text-[#065F46]" },
    { bg: "bg-[#E9D5FF]", border: "border-[#D8B4FE]", text: "text-[#5B21B6]" },
    { bg: "bg-[#FBCFE8]", border: "border-[#F8A5D6]", text: "text-[#831843]" },
    { bg: "bg-[#CFFAFE]", border: "border-[#A5F3FC]", text: "text-[#084E89]" },
  ];

  const getColorForItem = (id: string) => {
    const index = jadwalList.findIndex((item) => item.id === id) % colorPalette.length;
    return colorPalette[index];
  };

  const formatDay = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
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

  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth + 1, 0).getDate();
  }, [viewMonth, viewYear]);

  const firstDayOfMonth = useMemo(() => {
    return new Date(viewYear, viewMonth, 1).getDay();
  }, [viewMonth, viewYear]);

  const monthName = useMemo(() => {
    return new Intl.DateTimeFormat("id-ID", {
      month: "long",
      year: "numeric",
    }).format(new Date(viewYear, viewMonth));
  }, [viewMonth, viewYear]);

  const filteredJadwal = useMemo(() => {
    if (!searchQuery.trim()) {
      return jadwalList;
    }
    const query = searchQuery.toLowerCase();
    return jadwalList.filter(
      (item) =>
        item.namaKegiatan.toLowerCase().includes(query) ||
        item.tempatKegiatan.toLowerCase().includes(query) ||
        item.penanggungJawab.toLowerCase().includes(query) ||
        item.keterangan.toLowerCase().includes(query)
    );
  }, [jadwalList, searchQuery]);

  const jadwalByDate = useMemo(() => {
    const map = new Map<number, typeof jadwalList>();
    filteredJadwal.forEach((item) => {
      const date = new Date(item.tanggalKegiatan);
      if (date.getMonth() === viewMonth && date.getFullYear() === viewYear) {
        const day = date.getDate();
        if (!map.has(day)) {
          map.set(day, []);
        }
        map.get(day)!.push(item);
      }
    });
    return map;
  }, [filteredJadwal, viewMonth, viewYear]);

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  }, [firstDayOfMonth, daysInMonth]);

  const dayLabels = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  return (
    <div className="min-h-screen px-3 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 space-y-4 sm:mb-10 sm:space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <img
                src="/assets/logo-walikota.png"
                alt="Logo Jadwal Walikota"
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
              />
              <div className="space-y-1 text-center sm:space-y-2 sm:text-left">
                <h1 className="font-display text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-linear-to-r from-[#22C55E] via-[#EAB308] to-[#F97316] sm:text-5xl">
                  JADWAL WALI KOTA
                </h1>
                <p className="text-xs text-(--muted) sm:text-lg">
                  Tanggal aktif: <span className="font-semibold">{formatDay(today)}</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-4 sm:gap-8 lg:grid lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 p-3 sm:p-6 order-1 lg:order-0">
              <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2 sm:gap-4">
                <button
                  className="rounded-full border border-black/15 p-1.5 sm:p-2 text-base sm:text-lg transition hover:border-black/40"
                  type="button"
                  onClick={() => {
                    setViewMonth(viewMonth === 0 ? 11 : viewMonth - 1);
                    setViewYear(viewMonth === 0 ? viewYear - 1 : viewYear);
                    setSelectedDate(null);
                  }}
                >
                  <Icon icon="mdi:chevron-left" />
                </button>
                <h2 className="font-display flex-1 text-center text-lg sm:text-2xl">{monthName}</h2>
                <button
                  className="rounded-full border border-black/15 p-1.5 sm:p-2 text-base sm:text-lg transition hover:border-black/40"
                  type="button"
                  onClick={() => {
                    setViewMonth(viewMonth === 11 ? 0 : viewMonth + 1);
                    setViewYear(viewMonth === 11 ? viewYear + 1 : viewYear);
                    setSelectedDate(null);
                  }}
                >
                  <Icon icon="mdi:chevron-right" />
                </button>
              </div>
              <div className="mb-3 sm:mb-4 grid grid-cols-7 gap-1 sm:gap-2">
                {dayLabels.map((label) => (
                  <div
                    key={label}
                    className="flex items-center justify-center py-1 sm:py-2 text-xs font-semibold uppercase text-(--muted)"
                  >
                    {label}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const hasEvent = day && jadwalByDate.has(day);
                  const isToday = day === today.getDate();
                  const dayEvents = day ? jadwalByDate.get(day) : [];
                  const eventColors = dayEvents && dayEvents.length > 0 ? getColorForItem(dayEvents[0].id) : null;
                  
                  return (
                    <button
                      key={index}
                      className={`aspect-square rounded-xl border text-sm font-semibold transition ${
                        day === null
                          ? "border-white/0 bg-white/0"
                          : isToday
                            ? "border-(--sea)/50 bg-(--sea)/15 text-(--sea)"
                            : hasEvent && eventColors
                              ? `${eventColors.bg} ${eventColors.border} ${eventColors.text}`
                              : "border-black/10 bg-white/60 text-foreground hover:border-black/30"
                      }`}
                      type="button"
                      onClick={() => {
                        if (day) {
                          setSelectedDate(day);
                        }
                      }}
                      disabled={!day}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

          <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 p-1.5 sm:p-3 w-full flex flex-col order-3 lg:order-0">
            <div>
              <h3 className="font-display mb-1.5 sm:mb-2 text-sm sm:text-base">Legenda</h3>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded bg-(--sea)/15" />
                  <span className="text-xs sm:text-sm text-(--muted)">Hari ini</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded bg-(--brass)/10" />
                  <span className="text-xs sm:text-sm text-(--muted)">Ada kegiatan</span>
                </div>
              </div>
            </div>
            <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-black/10">
              <Link
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 border border-red-600 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-red-700 hover:border-red-700"
                href="/login/user"
              >
                <Icon icon="mdi:logout" className="text-base sm:text-lg" />
                <span className="hidden sm:inline">Keluar</span>
              </Link>
            </div>
          </div>

          <section className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 p-3 sm:p-6 order-2 lg:order-0 lg:col-start-2 lg:row-start-1">
            <h2 className="font-display mb-2 text-lg sm:text-2xl">Kegiatan Bulan Ini</h2>
            {selectedDate && (
              <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-(--muted)">
                Kegiatan pada tanggal <span className="font-semibold">{selectedDate} {monthName}</span>
              </p>
            )}
            {!selectedDate && (
              <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-(--muted)">Pilih tanggal di kalender untuk melihat kegiatan</p>
            )}
            <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
              <input
                className="field w-full rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm"
                placeholder="Cari kegiatan..."
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {searchQuery && (
                <p className="text-xs text-(--muted)">
                  Hasil: <span className="font-semibold">{filteredJadwal.length}</span> kegiatan
                </p>
              )}
            </div>
            <div className="space-y-2 sm:space-y-4">
              {selectedDate ? (
                (() => {
                  const selectedDateEvents = jadwalByDate.get(selectedDate) || [];
                  const filteredDateEvents = selectedDateEvents.filter((item) => {
                    if (!searchQuery.trim()) return true;
                    const query = searchQuery.toLowerCase();
                    return (
                      item.namaKegiatan.toLowerCase().includes(query) ||
                      item.tempatKegiatan.toLowerCase().includes(query) ||
                      item.penanggungJawab.toLowerCase().includes(query) ||
                      item.keterangan.toLowerCase().includes(query)
                    );
                  });

                  if (filteredDateEvents.length === 0) {
                    return (
                      <p className="text-sm text-(--muted)">
                        {searchQuery
                          ? "Tidak ada hasil pencarian yang sesuai."
                          : "Kegiatan kosong pada tanggal ini."}
                      </p>
                    );
                  }

                  return filteredDateEvents.map((item) => {
                    const itemColor = getColorForItem(item.id);
                    return (
                      <button
                        key={item.id}
                        className={`w-full rounded-2xl border p-4 text-left transition ${itemColor.bg} ${itemColor.border} hover:opacity-80`}
                        type="button"
                        onClick={() => {
                          setSelectedDetail(item);
                          setIsDetailOpen(true);
                        }}
                      >
                        <p className={`text-xs uppercase tracking-[0.25em] ${itemColor.text}`}>
                          {formatTanggal(item.tanggalKegiatan)}
                        </p>
                        <p className={`mt-2 font-semibold ${itemColor.text}`}>
                          {item.namaKegiatan}
                        </p>
                        <p
                          className={`mt-1 inline-flex items-center gap-1.5 text-xs ${itemColor.text} opacity-75`}
                        >
                          <Icon icon="mdi:map-marker-outline" className="text-sm" />
                          {item.tempatKegiatan}
                        </p>
                      </button>
                    );
                  });
                })()
              ) : (
                <>
                  {filteredJadwal.length === 0 ? (
                    <p className="text-sm text-(--muted)">
                      {searchQuery
                        ? "Tidak ada hasil pencarian yang sesuai."
                        : "Belum ada kegiatan yang dijadwalkan."}
                    </p>
                  ) : (
                    filteredJadwal.map((item) => {
                      const isThisMonth =
                        new Date(item.tanggalKegiatan).getMonth() === viewMonth &&
                        new Date(item.tanggalKegiatan).getFullYear() === viewYear;
                      if (!isThisMonth) return null;
                      
                      const itemColor = getColorForItem(item.id);
                      
                      return (
                        <button
                          key={item.id}
                          className={`w-full rounded-2xl border p-4 text-left transition ${itemColor.bg} ${itemColor.border} hover:opacity-80`}
                          type="button"
                          onClick={() => {
                            setSelectedDetail(item);
                            setIsDetailOpen(true);
                          }}
                        >
                          <p className={`text-xs uppercase tracking-[0.25em] ${itemColor.text}`}>
                            {formatTanggal(item.tanggalKegiatan)}
                          </p>
                          <p className={`mt-2 font-semibold ${itemColor.text}`}>
                            {item.namaKegiatan}
                          </p>
                          <p
                            className={`mt-1 inline-flex items-center gap-1.5 text-xs ${itemColor.text} opacity-75`}
                          >
                            <Icon icon="mdi:map-marker-outline" className="text-sm" />
                            {item.tempatKegiatan}
                          </p>
                        </button>
                      );
                    })
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </div>

      {dayEventsDialog ? (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setDayEventsDialog(null)}
        >
          <div
            className="modal-panel surface w-full max-w-md rounded-4xl border border-black/10 bg-white/95 p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-(--sea)">
                  Pilih Kegiatan
                </p>
                <h3 className="font-display text-2xl">
                  {dayEventsDialog.events.length} Kegiatan
                </h3>
              </div>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-foreground transition hover:border-black/30"
                type="button"
                aria-label="Tutup dialog"
                onClick={() => setDayEventsDialog(null)}
              >
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>
            <div className="mt-6 space-y-3">
              {dayEventsDialog.events.map((event) => {
                const eventColor = getColorForItem(event.id);
                return (
                  <button
                    key={event.id}
                    className={`w-full rounded-2xl border p-4 text-left transition ${eventColor.bg} ${eventColor.border} hover:opacity-80`}
                    type="button"
                    onClick={() => {
                      setSelectedDetail(event);
                      setIsDetailOpen(true);
                      setDayEventsDialog(null);
                    }}
                  >
                    <p className={`text-xs uppercase tracking-[0.25em] ${eventColor.text} font-semibold`}>
                      {event.namaKegiatan}
                    </p>
                    <p className={`mt-2 text-sm ${eventColor.text} opacity-75`}>
                      {event.tempatKegiatan}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      {isDetailOpen && selectedDetail ? (
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
                <div
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${getColorForItem(
                    selectedDetail.id
                  ).bg} ${getColorForItem(selectedDetail.id).text}`}
                >
                  Kegiatan
                </div>
                <h3 className="font-display text-sm sm:text-2xl font-bold">
                  {selectedDetail.namaKegiatan}
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
                  {formatTanggal(selectedDetail.tanggalKegiatan)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Tempat kegiatan
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedDetail.tempatKegiatan}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Penanggung jawab
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedDetail.penanggungJawab}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Nomor telepon
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedDetail.nomorTelepon}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Keterangan
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {selectedDetail.keterangan}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
