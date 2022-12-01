import type { Action } from 'svelte/action';
import type { Readable } from 'svelte/store';

export type AccordionItemState = 'open' | 'closed';

export type AccordionType = 'single' | 'multiple';

interface AccordionBaseConfig {
  /**
   * Whether clicking any useAccordionTrigger element should toggle the respective accordion item.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;
}

export interface AccordionSingleConfig extends AccordionBaseConfig {
  /**
   * Allow a single item to be opened at the same time.
   */
  type?: 'single';

  /**
   * Initial value (controls expanded state of accordion items).
   */
  defaultValue?: string;

  /**
   * Event handler called when the expanded state of the accordion changes.
   */
  onValueChange?: (value: string) => void;
}

export interface AccordionMultipleConfig extends AccordionBaseConfig {
  /**
   * Allow multiple items to be opened at the same time.
   */
  type?: 'multiple';

  /**
   * Initial value (controls expanded state of accordion items).
   */
  defaultValue?: string[];

  /**
   * Event handler called when the expanded state of the accordion changes.
   */
  onValueChange?: (value: string[]) => void;
}

export type AccordionConfig = AccordionSingleConfig | AccordionMultipleConfig;

export interface AccordionItemParams {
  /**
   * Unique identifier. Used to control accordion item's expanded state.
   */
  value: string;

  /**
   * Whether clicking the useAccordionTrigger element should toggle the accordion item.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;
}

export interface AccordionParams {
  /**
   * Whether clicking any useAccordionTrigger element should toggle the respective accordion item.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;
}

export interface AccordionReturn {
  /**
   * Toggles a value between expanded and collapsed.
   */
  toggle: (value: string) => void;

  /**
   * Expands a value or an array of values.
   */
  expand: (...values: string[]) => void;

  /**
   * Collapses a value or an array of values.
   */
  collapse: (...values: string[]) => void;

  /**
   * Expands all the values.
   */
  expandAll: () => void;

  /**
   * Collapses all the values.
   */
  collapseAll: () => void;

  /**
   * The expanded state of the accordion.
   */
  expanded: Readable<Set<string>>;

  /**
   * Action for the accordion root element.
   */
  useAccordion: Action<HTMLElement, AccordionParams>;

  /**
   * HTML attributes for the accordion item element.
   */
  itemAttrs: Readable<(params: AccordionItemParams | string) => Record<string, string>>;

  /**
   * HTML attributes for the trigger element.
   */
  triggerAttrs: Readable<(params: AccordionItemParams | string) => Record<string, string>>;

  /**
   * HTML attributes for the content element.
   */
  contentAttrs: Readable<(params: AccordionItemParams | string) => Record<string, string>>;
}
