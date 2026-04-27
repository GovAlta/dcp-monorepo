/**
 * Search utility functions for filtering and sorting data
 */

/**
 * Filter data by search chips (terms)
 * Matches any field that contains any of the search terms
 *
 * @param chips - Array of search terms
 * @param data - Array of objects to filter
 * @returns Filtered array
 */
export function filterData<T extends Record<string, unknown>>(
  chips: string[],
  data: T[]
): T[] {
  if (chips.length === 0) return data;

  return data.filter(item =>
    chips.some(chip => {
      const lowerChip = chip.toLowerCase();
      return Object.values(item).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerChip);
        }
        return false;
      });
    })
  );
}

/**
 * Sort data by a specific key
 * Handles strings, numbers, and date strings
 *
 * @param data - Array of objects to sort
 * @param key - Property key to sort by
 * @param direction - Sort direction ('asc', 'desc', or 'none')
 * @returns Sorted array (new array, does not mutate input)
 */
export function sortData<T extends Record<string, unknown>>(
  data: T[],
  key: keyof T | '',
  direction: 'asc' | 'desc' | 'none'
): T[] {
  if (!key || direction === 'none') return data;

  return [...data].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    // Handle date strings
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const aDate = Date.parse(aVal);
      const bDate = Date.parse(bVal);
      if (!isNaN(aDate) && !isNaN(bDate)) {
        return direction === 'asc' ? aDate - bDate : bDate - aDate;
      }
      return direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    return direction === 'asc' ? 1 : -1;
  });
}
