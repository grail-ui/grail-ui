import type { Readable } from 'svelte/store';

export interface ListKeyManagerConfig<T> {
  /**
   * Stream of all the managed items.
   */
  items: Readable<T[]>;

  /**
   * Whether the list should wrap when reaching the end.
   *
   * @defaultValue `false`
   */
  wrap?: boolean;

  /**
   * Whether vertical selection should be enabled.
   *
   *  @defaultValue `true`
   */
  vertical?: boolean;

  /**
   * Direction in which the selection can be moved.
   */
  horizontal?: 'ltr' | 'rtl' | null;

  /**
   * Activate the first and last items respectively when the `Home` or `End` key is pressed.
   *
   * @defaultValue `false`
   */
  homeAndEnd?: boolean;

  /**
   * Whether to turns on typeahead mode which allows users to set the active item by typing.
   *
   * @defaultValue `false`
   */
  typeahead?: boolean;

  /**
   * Function that determines whether the given item should be skipped.
   */
  skipPredicate?: (item: T) => boolean;

  /**
   * Function that is called any time the `TAB` key is pressed, so components can react when focus is shifted off of the list.
   */
  tabOut?: () => void;

  /**
   * Function that is called any time the `TAB` key is pressed, so components can react when focus is shifted off of the list.
   */
  onActivate?: (item: T) => void;
}

export interface ListKeyManagerReturn<T> {
  /**
   * Stream that emits whenever the active index of the list manager changes.
   */
  activeItemIndex: Readable<number>;

  /**
   * Stream that emits whenever the active index of the list manager changes.
   */
  activeItem: Readable<T | null>;

  /**
   * Index of the currently active item.
   */
  currentActiveItemIndex: number;

  /**
   * The active item.
   */
  currentActiveItem: T | null;

  /**
   * Sets the active item to the first enabled item in the list.
   */
  setFirstItemActive(): void;

  /**
   * Sets the active item to the last enabled item in the list.
   */
  setLastItemActive(): void;

  /**
   * Sets the active item to the next enabled item in the list.
   */
  setNextItemActive(): void;

  /**
   * Sets the active item to a previous enabled item in the list.
   */
  setPreviousItemActive(): void;

  /**
   * Index of the item or the item to be set as active.
   */
  setActiveItem(item: T | number): void;

  /**
   * Sets the active item depending on the key event passed in.
   */
  onKeydown(event: KeyboardEvent): void;

  /**
   * Cleanup method.
   */
  destroy(): void;
}
