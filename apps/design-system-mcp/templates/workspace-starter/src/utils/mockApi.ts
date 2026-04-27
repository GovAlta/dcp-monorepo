/**
 * Mock API utility for simulating network requests
 *
 * Use this during development to simulate async data fetching.
 * Replace with real API calls in production.
 */

/**
 * Simulate a network request with optional delay
 *
 * @param data - Data to return after delay
 * @param delay - Delay in milliseconds (default 500ms)
 * @returns Promise that resolves with the data
 *
 * @example
 * // Simulate fetching items
 * const items = await mockFetch(mockItems);
 *
 * // With custom delay
 * const items = await mockFetch(mockItems, 1000);
 */
export function mockFetch<T>(data: T, delay = 500): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
}
