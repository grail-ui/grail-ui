import { clamp, snapValueToStep } from './number';

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

describe('snapValueToStep', () => {
	it('should keep value if already on step', () => {
		expect(snapValueToStep(2, 0, 10, 1)).toBe(2);
		expect(snapValueToStep(-2, -2, 100, 10)).toBe(-2);
		expect(snapValueToStep(94, -1, 100, 5)).toBe(94);
	});

	it('should snap value to nearest step based on min and max', () => {
		expect(snapValueToStep(2, -0.5, 100, 3)).toBe(2.5);
		expect(snapValueToStep(-6.2, -2.5, 100, 3)).toBe(-2.5);
		expect(snapValueToStep(106.2, -2.5, 100, 3)).toBe(99.5);
		expect(snapValueToStep(-0.009999, -0.5, 0.5, 0.01)).toBe(-0.01);
		expect(snapValueToStep(-8, -100, 100, 5)).toBe(-10);
		expect(snapValueToStep(-6, -100, 100, 5)).toBe(-5);
		expect(snapValueToStep(3, -100, 100, 5)).toBe(5);
		expect(snapValueToStep(2, -100, 100, 5)).toBe(0);
		expect(snapValueToStep(-2.3, -2.67, 44, 0.5)).toBe(-2.17);
		expect(snapValueToStep(-22.567, -23.567, 44, 1)).toBe(-22.567);
		expect(snapValueToStep(1.56, -3.567, 10, 1)).toBe(1.433);
		expect(snapValueToStep(1.2, -100, 100, 1)).toBe(1);
	});

	it('should snap value nearest step when min or max are `undefined`', () => {
		expect(snapValueToStep(2, undefined, undefined, 3)).toBe(3);
		expect(snapValueToStep(3, undefined, undefined, 3)).toBe(3);
		expect(snapValueToStep(6, undefined, 5, 3)).toBe(3);
		expect(snapValueToStep(4, undefined, 5, 3)).toBe(3);
		expect(snapValueToStep(1, 3, undefined, 3)).toBe(3);
	});

	it('should snap value nearest step when min or max are `null`', () => {
		expect(snapValueToStep(2, null, null, 3)).toBe(3);
		expect(snapValueToStep(3, null, null, 3)).toBe(3);
		expect(snapValueToStep(6, null, 5, 3)).toBe(3);
		expect(snapValueToStep(4, null, 5, 3)).toBe(3);
		expect(snapValueToStep(1, 3, null, 3)).toBe(3);
	});
});
