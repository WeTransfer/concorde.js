/**
 * Debounce async function lets you debounce asynchronous function executions.
 * @module Debounce
 * @since 1.0.0
 */

/**
 * Creates a debounced function that delays invoking the provided function until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @since 1.0.0
 * @function debounceAsync
 * @param {Function} fn The original function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options = { cancelObj = { name: 'debounceAsync', message: 'cancelled debounce' } }] Optional cancel object that will be passed as rejection argument.
 * @example
 *
 * import { debounceAsync } from '@wetransfer/concorde-debounce';
 *
 * let counter = 0;
 * const debounced = debounceAsync(async (increment = 1) => {
 *   counter += increment;
 *   return Promise.resolve(counter);
 * });
 *
 * debounced(1).catch(() => console.error('rejected 1'));
 * debounced(2).catch(() => console.error('rejected 2'));
 * debounced(3).then(() => console.log(counter));  // => 3
 */
export function debounceAsync(
  func,
  wait = 0,
  { cancelObj = { name: 'debounceAsync', message: 'cancelled debounce' } } = {}
) {
  let timer, latestResolve, shouldCancel;

  return (...args) => {
    if (latestResolve) {
      shouldCancel = true;
    }

    return new Promise((resolve, reject) => {
      latestResolve = resolve;
      timer = setTimeout(() => exec(resolve, reject, ...args), wait);
    });
  };

  function exec(resolve, reject, ...args) {
    if (shouldCancel && resolve !== latestResolve) {
      return reject(cancelObj);
    }

    shouldCancel = false;
    clearTimeout(timer);
    timer = latestResolve = null;

    func(...args)
      .then(resolve)
      .catch(reject);
  }
}
