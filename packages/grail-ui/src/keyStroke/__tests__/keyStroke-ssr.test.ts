import { vi } from 'vitest';
import { createKeyStroke } from '../keyStroke';

vi.stubGlobal('document', undefined);
vi.mock('../../util/is', () => ({ isClient: false }));

describe('Key Stroke during SSR', () => {
	it('does not throw error', async () => {
		expect(() => createKeyStroke({ key: 'a', handler: vi.fn() })).not.toThrow();
	});
});
