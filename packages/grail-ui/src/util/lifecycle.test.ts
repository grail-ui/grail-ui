import * as svelte from 'svelte';
import { vi } from 'vitest';
import * as svelteInternal from 'svelte/internal';
import { tryOnDestroy, tryOnMount } from './lifecycle';

describe('tryOnDestroy', () => {
	it(`attaches function on component's destroy lifecycle`, () => {
		const spy = vi.spyOn(svelte, 'onDestroy');
		const fn = () => {
			/* empty */
		};
		tryOnDestroy(fn);

		expect(spy).toHaveBeenCalledWith(fn);
	});
});

describe('tryOnMount', () => {
	it(`attaches function on component's mount lifecycle`, () => {
		vi.spyOn(svelteInternal, 'get_current_component').mockReturnValue(true);
		const spy = vi.spyOn(svelte, 'onMount');
		const fn = () => {
			/* empty */
		};
		tryOnMount(fn);

		expect(spy).toHaveBeenCalledWith(fn);
	});

	it(`calls function if not inside component`, () => {
		vi.spyOn(svelteInternal, 'get_current_component').mockImplementation(() => {
			throw Error();
		});
		const spy = vi.spyOn(svelte, 'onMount');
		const fn = vi.fn();
		tryOnMount(fn);

		expect(spy).not.toHaveBeenCalled();
		expect(fn).toHaveBeenCalledTimes(1);
	});
});
