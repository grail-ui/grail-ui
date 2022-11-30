import { get } from 'svelte/store';
import { createProgress } from '../progress';

describe('Progress', function () {
  it('with default values', () => {
    const { progressAttrs } = createProgress();
    const attrs = get(progressAttrs);
    expect(attrs.role).toBe('progressbar');
    expect(attrs['aria-valuemin']).toBe('0');
    expect(attrs['aria-valuemax']).toBe('100');
    expect(attrs['aria-valuenow']).toBe('0');
    expect(attrs['aria-valuetext']).toBe('0%');
  });

  it('with value of 25%', () => {
    const { progressAttrs } = createProgress({ value: 25 });
    const attrs = get(progressAttrs);

    expect(attrs['aria-valuenow']).toBe('25');
    expect(attrs['aria-valuetext']).toBe('25%');
  });

  it('with custom text value', () => {
    const { progressAttrs } = createProgress({
      value: 25,
      formatValueLabel: ({ value, maxValue }) => `${value} of ${maxValue}`,
    });
    const attrs = get(progressAttrs);

    expect(attrs['aria-valuenow']).toBe('25');
    expect(attrs['aria-valuetext']).toBe('25 of 100');
  });

  it('with clamped value', () => {
    const { progressAttrs, value } = createProgress({ value: 200 });
    let attrs = get(progressAttrs);

    expect(attrs['aria-valuenow']).toBe('100');
    expect(attrs['aria-valuetext']).toBe('100%');

    value.set(-100);
    attrs = get(progressAttrs);
    expect(attrs['aria-valuenow']).toBe('0');
    expect(attrs['aria-valuetext']).toBe('0%');
  });

  it('with indeterminate (`null`) value', () => {
    const { progressAttrs } = createProgress({ value: null });
    const attrs = get(progressAttrs);

    expect(attrs.role).toBe('progressbar');
    expect(attrs['aria-valuemin']).toBe('0');
    expect(attrs['aria-valuemax']).toBe('100');
    expect(attrs['aria-valuenow']).toBeUndefined();
    expect(attrs['aria-valuetext']).toBeUndefined();
  });
});
