/**
 * Debounce module. Handy functions to debounce synchronous and asynchronous functions.
 * @module Debounce
 * @since 1.0.0
 */

/**
 * Creates a debounced function that delays invoking the provided function until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @since 1.0.0
 * @function debounce
 * @param {Function} fn The original function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @example
 *
 * import { debounce } from '@wetransfer/concorde-debounce';
 *
 * let counter = 0;
 * const debounced = debounce(() => counter++);
 *
 * debounced();
 * debounced();
 * debounced();
 *
 * console.log(counter);
 * // => 1
 */
export function debounce (fn, wait = 0) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}
