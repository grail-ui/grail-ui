import { writable, type Readable, type Updater, type Writable } from 'svelte/store';

export function toReadable<T>(store: Writable<T>): Readable<T> {
  return { subscribe: store.subscribe };
}

export function writableEffect<T>(current: T, fn: undefined | ((value: T) => unknown)): Writable<T> {
  const store = writable(current);
  const { subscribe, set } = store;

  const _set = (value: T) => {
    if (value === current) return;

    current = value;
    set(value);
    fn?.(value);
  };

  const _update = (updater: Updater<T>) => {
    _set(updater(current));
  };

  return { subscribe, set: _set, update: _update };
}
