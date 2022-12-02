import type { Writable } from 'svelte/store';

/**
 * Event emitted when the value of a SelectionModel has changed.
 */
export interface SelectionChange<T> {
	/** The current SelectionModel state. */
	selection: Set<T>;
	/** Options that were added to the model. */
	added: T[];
	/** Options that were removed from the model. */
	removed: T[];
}

export interface SelectionModelConfig<T> {
	/** Whether multiple values can be selected. */
	multiple: boolean;
	/** Initially selected values. */
	initiallySelectedValues?: T[];
}

export interface SelectionModelReturn<T> {
	changed: Writable<SelectionChange<T>>;
	/** Selected values. */
	selected: T[];
	/** Toggles a value between selected and deselected. */
	toggle: (value: T) => void;
	/** Selects a value or an array of values. */
	select: (...values: T[]) => void;
	/** Deselects a value or an array of values. */
	deselect: (...values: T[]) => void;
	/** Clears all of the selected values. */
	clear: () => void;
	/** Determines whether the model has a value. */
	hasValue: () => boolean;
	/** Sorts the selected values based on a predicate function. */
	sort: (predicate?: (a: T, b: T) => number) => void;
	/** Determines whether the model does not have a value. */
	isEmpty: () => boolean;
	/** Determines whether a value is selected. */
	isSelected: (value: T) => boolean;
	/** Gets whether multiple values can be selected. */
	isMultipleSelection: () => boolean;
}
