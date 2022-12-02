import { uniqueId } from './id';

describe('`uniqueId`', () => {
	it('generates unique identifiers', () => {
		expect(uniqueId('test')).toMatch(/test_\d/);
		expect(uniqueId('test')).not.toEqual(uniqueId('test'));
		expect(uniqueId('my_unique_test_id')).toEqual('my_unique_test_id_1');
	});
});
