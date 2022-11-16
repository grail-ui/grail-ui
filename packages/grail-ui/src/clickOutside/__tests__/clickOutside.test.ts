import { describe } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { writable } from 'svelte/store';
import ClickOutsideTest from './ClickOutsideTest.svelte';

describe('clickOutside', () => {
  const user = userEvent.setup();

  it('calls handler only when clicking outside', async () => {
    const api = { handler: vi.fn() };
    render(ClickOutsideTest, { api });

    const insideEl = screen.getByTestId('inside');
    const outsideEl = screen.getByTestId('outside');
    await user.click(insideEl);
    expect(api.handler).not.toHaveBeenCalled();
    await user.click(outsideEl);
    expect(api.handler).toHaveBeenCalled();
  });

  it('calls handler only when clicking outside & enabled', async () => {
    const api = { handler: vi.fn(), enabled: false };
    const { component } = render(ClickOutsideTest, { api });

    async function clickOutsideEl() {
      await user.click(screen.getByTestId('outside'));
    }

    component.$set({ api: { ...api, enabled: true } });
    expect(api.handler).not.toHaveBeenCalled();
    await clickOutsideEl();
    expect(api.handler).toHaveBeenCalled();

    component.$set({ api: { ...api, enabled: false } });
    api.handler.mockClear();
    await clickOutsideEl();
    expect(api.handler).not.toHaveBeenCalled();

    component.$set({ api: { ...api, enabled: writable(true) } });
    api.handler.mockClear();
    await clickOutsideEl();
    expect(api.handler).toHaveBeenCalled();

    component.$set({ api: { ...api, enabled: writable(false) } });
    api.handler.mockClear();
    await clickOutsideEl();
    expect(api.handler).not.toHaveBeenCalled();
  });

  it('supports ignored elements', async () => {
    const ignoreEl = document.createElement('div');
    const api = { handler: vi.fn(), ignore: [ignoreEl] };
    render(ClickOutsideTest, { api });

    document.body.appendChild(ignoreEl);

    await user.click(ignoreEl);
    expect(api.handler).not.toHaveBeenCalled();

    const outsideEl = screen.getByTestId('outside');
    await user.click(outsideEl);
    expect(api.handler).toHaveBeenCalled();
  });
});
