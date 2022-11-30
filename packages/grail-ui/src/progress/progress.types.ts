import type { Readable, Writable } from 'svelte/store';

export type ProgressConfig = {
  /**
   * The minimum allowed value.
   *
   * @defaultValue `0`
   */
  minValue?: number;

  /**
   * The maximum allowed value.
   *
   * @defaultValue `100`
   */
  maxValue?: number;

  /**
   * The initial value of the progress.
   *
   * @defaultValue `0`
   */
  value?: number | null;

  /**
   * The formatter to display the value's label.
   */
  formatValueLabel?: (data: { value: number; percentage: number; minValue: number; maxValue: number }) => string;
};

export type ProgressReturn = {
  /**
   * The controlled value of the progress.
   */
  value: Writable<number | null>;

  /**
   * The controlled value of the progress.
   */
  percentage: Readable<number>;

  /**
   * The content to display as the value's label (e.g. 30% or 1 of 4).
   */
  valueLabel: Readable<string>;

  /**
   * HTML attributes for the progress bar container element.
   */
  progressAttrs: Readable<Record<string, string>>;
};
