/**
 * Date utility functions for formatting and calculating dates
 */

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date like "Dec 10, 2024"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Format a date relative to now (e.g., "2 days ago", "Tomorrow")
 * @param dateString - ISO date string
 * @returns Relative date string
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `${Math.abs(diffDays)} days ago`;
  } else if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays <= 7) {
    return `In ${diffDays} days`;
  } else {
    return formatDate(dateString);
  }
}

/**
 * Check if a date is in the past
 * @param dateString - ISO date string
 * @returns true if date is before now
 */
export function isOverdue(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

/**
 * Check if a date is within the given threshold
 * @param dateString - ISO date string
 * @param thresholdDays - Number of days to check (default 7)
 * @returns true if date is within threshold and in the future
 */
export function isDueSoon(dateString: string, thresholdDays = 7): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= thresholdDays;
}
