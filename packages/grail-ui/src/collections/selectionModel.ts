import type { SelectionModelConfig, SelectionModelReturn, SelectionChange } from './selectionModel.types';
import { writable } from 'svelte/store';

export function selectionModel<T>(options?: SelectionModelConfig<T>): SelectionModelReturn<T> {
  /** Currently-selected values. */
  const _selection = new Set<T>();

  /** Event emitted when the value has changed. */
  const changed = writable<SelectionChange<T>>();

  /** Keeps track of the deselected options that haven't been emitted by the change event. */
  let _deselectedToEmit: T[] = [];

  /** Keeps track of the selected options that haven't been emitted by the change event. */
  let _selectedToEmit: T[] = [];

  /** Cache for the array value of the selected items. */
  let _selected: T[] | null = null;

  const { initiallySelectedValues, multiple } = { multiple: false, ...options };

  if (initiallySelectedValues && initiallySelectedValues.length) {
    if (multiple) {
      initiallySelectedValues.forEach((value) => _markSelected(value));
    } else {
      _markSelected(initiallySelectedValues[0]);
    }
  }

  _emitChangeEvent(true);

  /** Selected values. */
  function selected(): T[] {
    if (!_selected) {
      _selected = Array.from(_selection.values());
    }

    return _selected;
  }

  /** Selects a value or an array of values. */
  function select(...values: T[]): void {
    _verifyValueAssignment(values);
    values.forEach((value) => _markSelected(value));
    _emitChangeEvent();
  }

  /** Deselects a value or an array of values. */
  function deselect(...values: T[]): void {
    _verifyValueAssignment(values);
    values.forEach((value) => _unmarkSelected(value));
    _emitChangeEvent();
  }

  /** Toggles a value between selected and deselected. */
  function toggle(value: T): void {
    isSelected(value) ? deselect(value) : select(value);
  }

  /** Clears all of the selected values. */
  function clear(): void {
    _unmarkAll();
    _emitChangeEvent();
  }

  /** Determines whether a value is selected. */
  function isSelected(value: T): boolean {
    return _selection.has(value);
  }

  /** Determines whether the model does not have a value. */
  function isEmpty(): boolean {
    return _selection.size === 0;
  }

  /** Determines whether the model has a value. */
  function hasValue(): boolean {
    return !isEmpty();
  }

  /** Sorts the selected values based on a predicate function. */
  function sort(predicate?: (a: T, b: T) => number): void {
    if (multiple && selected()) {
      _selected?.sort(predicate);
    }
  }

  /** Gets whether multiple values can be selected. */
  function isMultipleSelection(): boolean {
    return multiple;
  }

  /** Emits a change event and clears the records of selected and deselected values. */
  function _emitChangeEvent(init = false) {
    // Clear the selected values so they can be re-cached.
    _selected = null;

    if (init || _selectedToEmit.length || _deselectedToEmit.length) {
      changed.set({
        selection: _selection,
        added: _selectedToEmit,
        removed: _deselectedToEmit,
      });

      _deselectedToEmit = [];
      _selectedToEmit = [];
    }
  }

  /** Selects a value. */
  function _markSelected(value: T) {
    if (!isSelected(value)) {
      if (!multiple) {
        _unmarkAll();
      }

      _selection.add(value);

      _selectedToEmit.push(value);
    }
  }

  /** Deselects a value. */
  function _unmarkSelected(value: T) {
    if (isSelected(value)) {
      _selection.delete(value);

      _deselectedToEmit.push(value);
    }
  }

  /** Clears out the selected values. */
  function _unmarkAll() {
    if (!isEmpty()) {
      _selection.forEach((value) => _unmarkSelected(value));
    }
  }

  /**
   * Verifies the value assignment and throws an error if the specified value array is
   * including multiple values while the selection model is not supporting multiple values.
   */
  function _verifyValueAssignment(values: T[]) {
    if (values.length > 1 && !multiple) {
      throw getMultipleValuesInSingleSelectionError();
    }
  }

  return {
    changed,
    toggle,
    select,
    deselect,
    clear,
    hasValue,
    sort,
    get selected() {
      return selected();
    },
    isEmpty,
    isSelected,
    isMultipleSelection,
  };
}

/**
 * Returns an error that reports that multiple values are passed into a selection model
 * with a single value.
 */
export function getMultipleValuesInSingleSelectionError() {
  return Error('Cannot pass multiple values into SelectionModel with single-value mode.');
}
