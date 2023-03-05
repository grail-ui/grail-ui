import { vi } from 'vitest';
import { createResizeObserver } from '../resizeObserver';

const ResizeObserverMock = {
	observe: vi.fn(),
	disconnect: vi.fn(),
};
vi.stubGlobal('ResizeObserver', function () {
	return ResizeObserverMock;
});

describe('ResizeObserver', () => {
	it('is supported', async () => {
		const { isSupported } = createResizeObserver();

		expect(isSupported).toBe(true);
	});

	it('observes the element as long as it exists', async () => {
		const el = document.createElement('div');
		const { useResizeObserver } = createResizeObserver();

		expect(ResizeObserverMock.observe).not.toHaveBeenCalled();
		const action = useResizeObserver(el);
		expect(ResizeObserverMock.observe).toHaveBeenCalledWith(el, {});

		expect(ResizeObserverMock.disconnect).not.toHaveBeenCalled();
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		action!.destroy!();
		expect(ResizeObserverMock.disconnect).toHaveBeenCalledTimes(1);
	});
});
