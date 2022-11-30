import type { Action } from 'svelte/action';
import type { PortalConfig, PortalReturn } from './portal.types';
import { tick } from 'svelte';
import { writable } from 'svelte/store';

export const usePortal = (node: HTMLElement, config: PortalConfig) => {
  async function move() {
    const { target } = config;

    let targetEl: HTMLElement | null;

    if (!target) {
      targetEl = document.body;
    } else if (typeof target === 'string') {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching CSS selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(
        `Unknown portal target type: ${
          target === null ? 'null' : typeof target
        }. Allowed types: string (CSS selector) or HTMLElement.`
      );
    }
    targetEl.appendChild(node);
  }

  move();

  return {
    update(newConfig: Partial<PortalConfig>) {
      config = { ...newConfig };
      move();
    },
    destroy() {
      node.remove();
    },
  };
};

export const createPortal = (config: PortalConfig = {}): PortalReturn => {
  const target = writable<PortalConfig['target']>(config.target);

  const _usePortal = (node: HTMLElement, _config: PortalConfig) => {
    const action = usePortal(node, {});

    const unsubscribe = target.subscribe(($target) => {
      action.update({ ...config, target: $target, ..._config });
    });

    return {
      ...action,
      destroy() {
        unsubscribe();
        action.destroy();
      },
    };
  };

  return {
    target,
    usePortal: _usePortal as Action<HTMLElement, PortalConfig>,
  };
};
