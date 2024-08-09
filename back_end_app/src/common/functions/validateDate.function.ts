/**
 * Checks if the provided date is in the past.
 *
 * @remarks
 * This function takes a date string as input and compares it to the current date.
 * It returns `true` if the input date is before the current date, and `false` otherwise.
 *
 * @param date - The date to check. The date string should be in a format that can be parsed by the `Date` constructor.
 * @returns `true` if the input date is in the past, `false` otherwise.
 *
 * @example
 * ```typescript
 * const isPast = isDateInThePast('2022-01-01'); // Returns true if today is after 2022-01-01
 * console.log(isPast);
 * ```
 */
export function isDateInThePast(date: string): boolean {
    const inputDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return inputDate < today;
}