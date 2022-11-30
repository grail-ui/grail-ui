import type { ActivateOptions, DeactivateOptions, FocusTrap } from 'focus-trap';
import type { FocusTrapConfig, FocusTrapReturn } from './focusTrap.types';
import { writable } from 'svelte/store';
import { createFocusTrap as _createFocusTrap } from 'focus-trap';
import { toReadable } from '../util/store';

export const createFocusTrap = (config: FocusTrapConfig = {}): FocusTrapReturn => {
  let trap: undefined | FocusTrap;

  const { immediate, ...focusTrapOptions } = config;
  const hasFocus = writable<boolean>(false);
  const isPaused = writable<boolean>(false);

  const activate = (opts?: ActivateOptions) => trap?.activate(opts);
  const deactivate = (opts?: DeactivateOptions) => trap?.deactivate(opts);

  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.set(true);
    }
  };

  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.set(false);
    }
  };

  const useFocusTrap = (node: HTMLElement) => {
    trap = _createFocusTrap(node, {
      ...focusTrapOptions,
      onActivate() {
        hasFocus.set(true);
        config.onActivate?.();
      },
      onDeactivate() {
        hasFocus.set(false);
        config.onDeactivate?.();
      },
    });

    if (immediate) {
      activate();
    }

    return {
      destroy() {
        deactivate();
        trap = undefined;
      },
    };
  };

  return {
    useFocusTrap,
    hasFocus: toReadable(hasFocus),
    isPaused: toReadable(isPaused),
    activate,
    deactivate,
    pause,
    unpause,
  };
};
