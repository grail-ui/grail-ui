import type { ModalConfig, ModalReturn } from './modal.types';
import { derived, readable } from 'svelte/store';
import { tick } from 'svelte';
import { uniqueId } from '../util/id';
import { createFocusTrap } from '../focusTrap';
import { usePortal } from '../portal';
import { ESCAPE } from '../util/keyboard';
import { useClickOutside } from '../clickOutside';
import { writableEffect } from '../util/store';
import { addEventListener } from '../eventListener/eventListener';

export const createModal = ({
  open = true,
  portal = 'body',
  onOpenChange,
  isDismissible,
  isKeyboardDismissible = true,
  onInteractOutside,
  initialFocus,
}: ModalConfig = {}): ModalReturn => {
  const id = uniqueId('modal');
  const titleId = uniqueId('modal-title');

  const open$ = writableEffect(open, onOpenChange);

  const modalAttrs = readable({
    id,
    role: 'dialog',
    tabindex: '-1',
    'aria-modal': 'true',
    'aria-labelledby': titleId,
  });

  const useModal = (node: HTMLElement) => {
    const contentEl = node.id === id ? node : (node.querySelector(`#${id}`) as HTMLElement);

    const removeEvent = addEventListener(contentEl, `keydown`, (e: KeyboardEvent) => {
      if (isKeyboardDismissible && e.key === ESCAPE) {
        e.preventDefault();
        open$.set(false);
      }
    });

    const portalAction = portal ? usePortal(node, { target: portal }) : undefined;

    const clickOutsideAction = useClickOutside(contentEl, {
      enabled: open$,
      handler: (e: PointerEvent) => {
        if (!isDismissible) return;

        onInteractOutside?.(e);
        if (!e.defaultPrevented) {
          open$.set(false);
        }
      },
    });

    const { activate, deactivate, useFocusTrap } = createFocusTrap({
      immediate: false,
      escapeDeactivates: false,
      fallbackFocus: contentEl,
      ...(initialFocus ? { initialFocus } : null),
    });
    const focusTrapAction = useFocusTrap(contentEl);

    const unsubscribe = open$.subscribe(async (value) => {
      if (value) {
        await tick();
        activate();
      } else {
        deactivate();
      }
    });

    let destroyed = false;
    return {
      destroy() {
        // Make sure that destroy is not called twice
        if (destroyed) {
          return;
        }
        destroyed = true;

        focusTrapAction?.destroy?.();
        portalAction?.destroy?.();
        clickOutsideAction?.destroy?.();
        removeEvent();
        unsubscribe();
      },
    };
  };

  const titleAttrs = readable({
    id: titleId,
  });

  const triggerAttrs = derived(open$, (open) => ({
    'aria-haspopup': 'dialog',
    'aria-controls': id,
    'aria-expanded': `${open}`,
  }));

  return {
    useModal,
    modalAttrs,
    titleAttrs,
    triggerAttrs,
    open: open$,
  };
};
