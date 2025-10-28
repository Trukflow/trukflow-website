import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts Firebase UID (28 chars, no hyphens) → valid UUID format
 * Required for Supabase `uuid` columns
 * Example: nMDexbBjeCVtNxb7jETjYOLrGW32 → nMDexbBj-eCVt-Nxb7-jETj-YOLrGW32
 */
// utils.ts
export const normalizeFirebaseUID = (uid: string): string => {
  if (uid.length !== 28) return uid;
  return `${uid.slice(0,8)}-${uid.slice(8,12)}-${uid.slice(12,16)}-${uid.slice(16,20)}-${uid.slice(20)}`;
};