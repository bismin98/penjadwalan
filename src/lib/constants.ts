import type { ColorPalette } from "@/types/jadwal";

/**
 * Color palette untuk kalender
 */
export const COLOR_PALETTE: ColorPalette[] = [
  { bg: "bg-[#FEE2E2]", border: "border-[#FECACA]", text: "text-[#991B1B]" },
  { bg: "bg-[#FEF08A]", border: "border-[#FCD34D]", text: "text-[#713F12]" },
  { bg: "bg-[#DBEAFE]", border: "border-[#BFDBFE]", text: "text-[#1E40AF]" },
  { bg: "bg-[#D1FAE5]", border: "border-[#A7F3D0]", text: "text-[#065F46]" },
  { bg: "bg-[#E9D5FF]", border: "border-[#D8B4FE]", text: "text-[#5B21B6]" },
  { bg: "bg-[#FBCFE8]", border: "border-[#F8A5D6]", text: "text-[#831843]" },
  { bg: "bg-[#CFFAFE]", border: "border-[#A5F3FC]", text: "text-[#084E89]" },
];

/**
 * Get color untuk item tertentu berdasarkan index
 */
export function getColorForItem(index: number): ColorPalette {
  return COLOR_PALETTE[index % COLOR_PALETTE.length];
}
