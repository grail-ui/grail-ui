import { vi } from 'vitest';
import { addEventListener } from './eventListener';

describe('addEventListener', () => {
  const handler = vi.fn();

  let target: Element;

  beforeEach(() => {
    vi.clearAllMocks();
    target = document.createElement('div');
    vi.spyOn(target, 'addEventListener');
    vi.spyOn(target, 'removeEventListener');
  });

  it('attaches event listeners to a specific target', () => {
    expect(target.addEventListener).not.toHaveBeenCalled();
    addEventListener(target, 'click', handler);
    expect(target.addEventListener).toHaveBeenCalledWith('click', handler, undefined);
  });

  it('returns a function to remove event listeners', () => {
    const removeFn = addEventListener(target, 'click', handler);

    expect(target.removeEventListener).not.toHaveBeenCalled();
    removeFn();
    expect(target.removeEventListener).toHaveBeenCalledWith('click', handler, undefined);
  });

  it('supports multiple event listeners', () => {
    expect(target.addEventListener).not.toHaveBeenCalled();

    const removeFn = addEventListener(target, ['focus', 'blur'], handler);
    expect(target.addEventListener).toHaveBeenCalledWith('focus', handler, undefined);
    expect(target.addEventListener).toHaveBeenCalledWith('blur', handler, undefined);

    expect(target.removeEventListener).not.toHaveBeenCalled();
    removeFn();
    expect(target.removeEventListener).toHaveBeenCalledWith('focus', handler, undefined);
    expect(target.removeEventListener).toHaveBeenCalledWith('blur', handler, undefined);
  });
});
