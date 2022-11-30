import type { Action } from 'svelte/action';
import type { Writable } from 'svelte/store';

export type PortalConfig = {
  /**
   * DOM element or CSS selector to be appended to.
   */
  target?: string | HTMLElement;
};

export type PortalReturn = {
  /**
   * Action on the element that need to be "portalled".
   */
  usePortal: Action<HTMLElement, PortalConfig>;

  /**
   * Controlled DOM element or CSS selector to be appended to.
   */
  target: Writable<string | HTMLElement | undefined>;
};
