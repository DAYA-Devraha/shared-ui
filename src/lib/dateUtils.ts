// src/lib/dateUtils.ts
// Centralized date utilities for consistent date handling across all frontends
// See: thoughts/shared/credentials/2026-01-21-developer-workflow.md

/**
 * Format a Date as YYYY-MM-DD using LOCAL date parts (not UTC).
 * Use this when sending dates to the backend for DATE_ONLY fields.
 * This ensures the user's selected date is preserved regardless of timezone.
 *
 * @example
 * // User in IST selects Jan 10 -> sends "2026-01-10" (not "2026-01-09" from UTC conversion)
 * formatLocalDateOnly(new Date()) // "2026-01-10"
 *
 * @param date - Date object (from DatePicker or other source)
 * @returns YYYY-MM-DD string using local date parts, or empty string if no date
 */
export function formatLocalDateOnly(date: Date | undefined | null): string {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse YYYY-MM-DD string to Date at UTC midnight.
 * Use this for filter values and DatePicker initialization.
 *
 * @param dateStr - "2026-01-10"
 * @returns Date at 2026-01-10T00:00:00.000Z or undefined
 */
export function parseDateStringUTC(dateStr: string | undefined | null): Date | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr + 'T00:00:00.000Z');
  return isNaN(d.getTime()) ? undefined : d;
}

/**
 * Get today's date as YYYY-MM-DD in local timezone.
 *
 * @returns "2026-01-10" (local date)
 */
export function getTodayLocalDateString(): string {
  return formatLocalDateOnly(new Date());
}

/**
 * Format an ISO date string for display using UTC date components.
 * Use this for DATE_ONLY fields (scheduledDate, preferredDate, dateOfBirth)
 * to ensure the displayed date matches how it's stored and filtered on backend.
 *
 * Without this, a UTC midnight date like "2026-01-10T00:00:00.000Z"
 * might display as Jan 9 or Jan 11 depending on local timezone.
 *
 * @param isoString - ISO date string from API (e.g., "2026-01-10T00:00:00.000Z")
 * @param format - 'short' = "10 Jan 2026", 'long' = "10 January 2026", 'numeric' = "10/01/2026"
 * @param locale - 'en' | 'ru' for numeric format separator (/ vs .)
 * @returns Formatted date string using UTC components
 */
export function formatDateOnlyDisplay(
  isoString: string | Date | undefined | null,
  format: 'short' | 'long' | 'numeric' = 'short',
  locale: 'en' | 'ru' = 'en',
): string {
  if (!isoString) return '';

  const date = typeof isoString === 'string' ? new Date(isoString) : isoString;
  if (isNaN(date.getTime())) return '';

  const day = date.getUTCDate();
  const dayPadded = String(day).padStart(2, '0');
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();

  if (format === 'numeric') {
    const monthPadded = String(monthIndex + 1).padStart(2, '0');
    return locale === 'ru'
      ? `${dayPadded}.${monthPadded}.${year}`
      : `${dayPadded}/${monthPadded}/${year}`;
  }

  const monthsShort = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const monthsLong = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const months = format === 'long' ? monthsLong : monthsShort;
  return `${day} ${months[monthIndex]} ${year}`;
}
