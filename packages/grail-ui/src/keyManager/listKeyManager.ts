import type { ListKeyManagerConfig, ListKeyManagerReturn } from './listKeyManager.types';
import { get, writable, type Unsubscriber } from 'svelte/store';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '../util/keyboard';
import typeaheadStore from './typeahead';

export function listKeyManager<T>(options: ListKeyManagerConfig<T>): ListKeyManagerReturn<T> {
  const {
    items: items$,
    skipPredicate = () => false,
    wrap = false,
    vertical = true,
    horizontal = null,
    homeAndEnd = false,
    typeahead = false,
    tabOut,
    onActivate,
  } = options;

  const activeItemIndex$ = writable<number>(-1);
  const activeItem$ = writable<T | null>(null);

  function currentActiveItem() {
    return get(activeItem$);
  }

  const unsubscribe = items$.subscribe((newItems) => {
    const activeItem = currentActiveItem();
    if (activeItem) {
      const itemArray = newItems;
      const newIndex = itemArray.indexOf(activeItem);

      if (newIndex === -1) {
        activeItem$.set(null);
        activeItemIndex$.set(-1);
      } else if (newIndex !== get(activeItemIndex$)) {
        activeItemIndex$.set(newIndex);
      }
    }
  });

  // Buffer for the letters that the user has pressed when the typeahead option is turned on.
  let unsubscribeTypeahead: Unsubscriber;
  const typeahead$ = typeaheadStore();
  if (typeahead) {
    unsubscribeTypeahead = typeahead$.subscribe((input) => {
      if (!input) return;

      const items = get(items$);

      // Start at 1 because we want to start searching at the item immediately
      // following the current active item.
      for (let i = 1; i < items.length + 1; i++) {
        const index = (get(activeItemIndex$) + i) % items.length;
        const item = items[index];

        if (
          !skipPredicate(item) &&
          (item as unknown as HTMLElement).dataset.label?.toUpperCase().trim().indexOf(input) === 0
        ) {
          setActiveItem(index);
          break;
        }
      }
    });
  }

  /**
   * Sets the active item to the first enabled item starting at the index specified. If the
   * item is disabled, it will move in the fallbackDelta direction until it either
   * finds an enabled item or encounters the end of the list.
   */
  function setActiveItemByIndex(index: number, fallbackDelta: -1 | 1): void {
    const items = get(items$);
    if (!items[index]) {
      return;
    }

    while (skipPredicate(items[index])) {
      index += fallbackDelta;

      if (!items[index]) {
        return;
      }
    }
    setActiveItem(index);
  }

  /**
   * Sets the active item to the actual item or the item at the index specified.
   */
  function setActiveItem(item: T | number): void {
    const previousActiveItem = get(activeItem$);
    const previousActiveItemIndex = get(activeItemIndex$);

    const itemArray = get(items$);
    const index = typeof item === 'number' ? item : itemArray.indexOf(item);
    // Explicitly check for `null` and `undefined` because other falsy values are valid.
    const activeItem = itemArray[index] == null ? null : itemArray[index];

    if (previousActiveItem !== activeItem) {
      activeItem$.set(activeItem);
      if (activeItem) {
        onActivate?.(activeItem);
      }
    }
    if (previousActiveItemIndex !== index) {
      activeItemIndex$.set(index);
    }
  }

  /**
   * Sets the active item depending on the key event passed in.
   */
  function onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case TAB:
        tabOut?.();
        return;

      case DOWN_ARROW:
        if (vertical) {
          setNextItemActive();
          break;
        } else {
          return;
        }

      case UP_ARROW:
        if (vertical) {
          setPreviousItemActive();
          break;
        } else {
          return;
        }

      case RIGHT_ARROW:
        if (horizontal) {
          horizontal === 'rtl' ? setPreviousItemActive() : setNextItemActive();
          break;
        } else {
          return;
        }

      case LEFT_ARROW:
        if (horizontal) {
          horizontal === 'rtl' ? setNextItemActive() : setPreviousItemActive();
          break;
        } else {
          return;
        }

      case HOME:
        if (homeAndEnd) {
          setFirstItemActive();
          break;
        } else {
          return;
        }

      case END:
        if (homeAndEnd) {
          setLastItemActive();
          break;
        } else {
          return;
        }

      default:
        if (typeahead && event.key && event.key.length === 1) {
          typeahead$.add(event.key.toLocaleUpperCase());
        }

        // Note that we return here, in order to avoid preventing
        // the default action of non-navigational keys.
        return;
    }

    typeahead$.reset();
    event.preventDefault();
  }

  /** Sets the active item to the first enabled item in the list. */
  function setFirstItemActive(): void {
    setActiveItemByIndex(0, 1);
  }

  /** Sets the active item to the last enabled item in the list. */
  function setLastItemActive(): void {
    setActiveItemByIndex(get(items$).length - 1, -1);
  }

  /** Sets the active item to the next enabled item in the list. */
  function setNextItemActive(): void {
    get(activeItemIndex$) < 0 ? setFirstItemActive() : setActiveItemByDelta(1);
  }

  /** Sets the active item to a previous enabled item in the list. */
  function setPreviousItemActive(): void {
    get(activeItemIndex$) < 0 && wrap ? setLastItemActive() : setActiveItemByDelta(-1);
  }

  /**
   * This method sets the active item, given a list of items and the delta between the
   * currently active item and the new active item. It will calculate differently
   * depending on whether wrap mode is turned on.
   */
  function setActiveItemByDelta(delta: -1 | 1): void {
    if (wrap) {
      /*
       * Sets the active item properly given "wrap" mode. In other words, it will continue to move
       * down the list until it finds an item that is not disabled, and it will wrap if it
       * encounters either end of the list.
       */
      const items: T[] = get(items$);
      const activeItemIndex = get(activeItemIndex$);
      for (let i = 1; i <= items.length; i++) {
        const index = (activeItemIndex + delta * i + items.length) % items.length;
        const item = items[index];

        if (!skipPredicate || !skipPredicate(item)) {
          setActiveItem(index);
          return;
        }
      }
    } else {
      /*
       * Sets the active item properly given the default mode. In other words, it will
       * continue to move down the list until it finds an item that is not disabled. If
       * it encounters either end of the list, it will stop and not wrap.
       */
      setActiveItemByIndex(get(activeItemIndex$) + delta, delta);
    }
  }

  return {
    setActiveItem,
    setFirstItemActive,
    setLastItemActive,
    setPreviousItemActive,
    setNextItemActive,
    activeItem: { subscribe: activeItem$.subscribe },
    /** Index of the currently active item. */
    get currentActiveItemIndex(): number {
      return get(activeItemIndex$);
    },
    activeItemIndex: {
      subscribe: activeItemIndex$.subscribe,
    },
    /** The active item. */
    get currentActiveItem(): T | null {
      return currentActiveItem();
    },
    onKeydown,
    destroy() {
      unsubscribeTypeahead?.();
      unsubscribe();
    },
  };
}
