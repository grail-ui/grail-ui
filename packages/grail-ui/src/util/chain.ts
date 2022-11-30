/**
 * Calls all functions in the order they were chained with the same arguments.
 */
export function chain<T extends unknown[]>(
  ...callbacks: (void | ((...args: T) => void) | (() => void))[]
): (...args: T) => void {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...args);
      }
    }
  };
}
