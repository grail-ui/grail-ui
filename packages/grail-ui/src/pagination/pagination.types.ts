import type { Readable, Writable } from 'svelte/store';

export type PaginationConfig = {
  /**
   * Number of always visible pages at the beginning and end.
   *
   * @defaultValue `1`
   */
  boundaryCount?: number;

  /**
   * 	The total number of items in all pages.
   *
   * @defaultValue `0`
   */
  total?: number;

  /**
   * 	Maximum number of items per page.
   *
   * @defaultValue `10`
   */
  perPage?: number;

  /**
   * Whether hide the next-page button.
   *
   * @defaultValue `false`
   */
  hideNextButton?: boolean;

  /**
   * Whether to hide the previous-page button.
   *
   * @defaultValue `false`
   */
  hidePrevButton?: boolean;

  /**
   * Callback fired when the page is changed.
   */
  onChange?: (page?: number) => void;

  /**
   * A unique accessible name.
   *
   * @defaultValue "Pagination Navigation"
   */
  ariaLabel?: string;

  /**
   * Function which returns a value that provides an accessible name for the current page.
   *
   * @defaultValue `(page) => "Goto Page ${page}"`
   */
  getPageAriaLabel?: (page: number, selected?: boolean) => string;

  /**
   * Initial current page.
   *
   * @defaultValue `1`
   */
  page?: number;

  /**
   * Whether to hide the first-page button.
   *
   * @defaultValue `true`
   */
  hideFirstButton?: boolean;

  /**
   * Whether to hide the last-page button.
   *
   * @defaultValue `true`
   */
  hideLastButton?: boolean;

  /**
   * Number of always visible pages before and after the current page.
   *
   * @defaultValue `1`
   */
  siblingCount?: number;
};

export type PaginationReturn = {
  /**
   * HTML attributes for the wrapper navigation element.
   */

  navAttrs: Readable<Record<string, string>>;

  /**
   * HTML attributes for the wrapper navigation element.
   */
  pageAttrs: Readable<(params: PaginationItem) => Record<string, string>>;

  /**
   * Action for the trigger element.
   */
  items: Readable<PaginationItem[]>;

  /**
   * Current page.
   */
  page: Writable<number>;

  /**
   * Starting row index of current page.
   */
  start: Readable<number>;

  /**
   * Last row index of current page.
   */
  end: Readable<number>;

  /**
   * 	The total number of items in all pages.
   *
   */
  total: Writable<number>;

  /**
   * 	Maximum number of items per page.
   *
   */
  perPage: Writable<number>;
};

export type PaginationItem = {
  /**
   * The type of pagination item.
   */
  type: 'ellipsis-end' | 'first' | 'last' | 'next' | 'page' | 'previous' | 'ellipsis-start';

  /**
   * The current page number.
   */
  page: number | null;

  /**
   * Whether the pagination item is selected.
   */
  selected?: boolean;

  /**
   * Whether the pagination item is selected.
   */
  disabled?: boolean;
};
