import { clamp } from './number';

describe('clamp', () => {
  it('restrict between two min and max', () => {
    expect(clamp(0, 10, 20)).toEqual(10);
    expect(clamp(0, -10, 20)).toEqual(0);
    expect(clamp(0, 100, 20)).toEqual(20);
  });

  it('ignore if min or max are `undefined`', () => {
    expect(clamp(-10, undefined, 20)).toEqual(-10);
    expect(clamp(100, -10, undefined)).toEqual(100);
    expect(clamp(20, undefined, undefined)).toEqual(20);
  });

  it('ignore if min or max are `null`', () => {
    expect(clamp(-10, null, 20)).toEqual(-10);
    expect(clamp(100, -10, null)).toEqual(100);
    expect(clamp(20, null, null)).toEqual(20);
  });
});
