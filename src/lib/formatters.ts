/**
 * Format tanggal ke format Indonesia (dd MMMM yyyy)
 */
export function formatTanggal(value: string): string {
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
}

/**
 * Get month key dari tanggal (format: yyyy-MM)
 */
export function getMonthKey(value: string): string {
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
}

/**
 * Format month-year ke format Indonesia (MMMM yyyy)
 */
export function formatMonthYear(value: string): string {
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
}

/**
 * Format tanggal lengkap dengan hari
 */
export function formatDay(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Format waktu dari string jam (HH:mm)
 */
export function formatWaktu(value: string): string {
  if (!value) {
    return "-";
  }
  return value;
}
