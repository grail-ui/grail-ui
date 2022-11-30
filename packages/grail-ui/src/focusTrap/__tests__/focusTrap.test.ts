import { render, screen } from '@testing-library/svelte';
import { get } from 'svelte/store';
import { describe } from 'vitest';
import { createFocusTrap } from '../focusTrap';
import FocusTrapTest from './FocusTrapTest.svelte';

describe('focusTrap', () => {
  it('updates `hasFocus` correctly', async () => {
    render(FocusTrapTest);
    const div = screen.getByTestId('container');
    const { activate, deactivate, useFocusTrap, hasFocus } = createFocusTrap({ fallbackFocus: div });
    useFocusTrap(div);

    activate();
    expect(get(hasFocus)).toBe(true);

    deactivate();
    expect(get(hasFocus)).toBe(false);
  });

  it('activates immediately', async () => {
    render(FocusTrapTest);
    const div = screen.getByTestId('container');
    const { useFocusTrap, hasFocus } = createFocusTrap({ immediate: true, fallbackFocus: div });
    useFocusTrap(div);

    expect(get(hasFocus)).toBe(true);
  });

  it('can pause & unpause', async () => {
    render(FocusTrapTest);
    const div = screen.getByTestId('container');
    const { useFocusTrap, isPaused, pause, unpause } = createFocusTrap({ immediate: true, fallbackFocus: div });
    useFocusTrap(div);

    expect(get(isPaused)).toBe(false);

    pause();
    expect(get(isPaused)).toBe(true);

    unpause();
    expect(get(isPaused)).toBe(false);
  });
});
