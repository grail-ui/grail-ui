import { get } from 'svelte/store';
import { vi } from 'vitest';
import { activeElement } from '../activeElement';

describe('`activeElement` during SSR', () => {
	vi.stubGlobal('document', undefined);
	vi.mock('../../util/is', () => ({ isClient: false }));

	it('does not throw error', async () => {
		expect(() => get(activeElement)).not.toThrow();
	});
});
