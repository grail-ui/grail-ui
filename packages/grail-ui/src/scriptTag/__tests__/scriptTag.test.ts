/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { vi } from 'vitest';
import { get } from 'svelte/store';
import { fireEvent } from '@testing-library/svelte';
import { createScriptTag } from '../scriptTag';

describe('inject script tag', () => {
	const url = 'https://code.example.com/test.min.js';

	const scriptTagElement = (): HTMLScriptElement | null =>
		document.head.querySelector(`script[src="${url}"]`);

	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('should add script tag', async () => {
		const appendChildListener = vi.spyOn(document.head, 'appendChild');

		expect(appendChildListener).not.toHaveBeenCalled();
		expect(scriptTagElement()).toBeNull();

		const { unload } = createScriptTag({ url });

		expect(appendChildListener).toHaveBeenCalled();
		expect(scriptTagElement()).toBeInstanceOf(HTMLScriptElement);
		expect(scriptTagElement()).toHaveAttribute('src', url);

		unload();
	});

	it('option to manually load script', async () => {
		const { scriptTag, load, unload } = createScriptTag({ url, immediate: false });

		expect(scriptTagElement()).toBe(null);
		expect(get(scriptTag)).toBeNull();

		await load(false);

		expect(scriptTagElement()).toBeInstanceOf(HTMLScriptElement);
		expect(scriptTagElement()).toHaveAttribute('src', url);
		expect(get(scriptTag)).not.toBeNull();

		unload();
	});

	it('removes script tag using unload', async () => {
		const { unload } = createScriptTag({ url, immediate: true });

		expect(scriptTagElement()).toBeInstanceOf(HTMLScriptElement);

		unload();
		expect(scriptTagElement()).toBe(null);
	});

	it('should re-use the same src for multiple loads', async () => {
		const addChildListener = vi.spyOn(document.head, 'appendChild');

		expect(addChildListener).not.toHaveBeenCalled();
		expect(scriptTagElement()).toBeNull();

		const script1 = createScriptTag({ url, immediate: false });
		const script2 = createScriptTag({ url, immediate: false });

		await script1.load(false);
		await script2.load(false);

		expect(get(script1.scriptTag)).not.toBeNull();
		expect(get(script2.scriptTag)).not.toBeNull();

		expect(addChildListener).toHaveBeenCalledTimes(1);
		expect(scriptTagElement()).toBeInstanceOf(HTMLScriptElement);

		script1.unload();
		script2.unload();
	});

	it('should support custom attributes', async () => {
		const { unload } = createScriptTag({
			url,
			defer: true,
			crossOrigin: 'use-credentials',
			noModule: true,
			referrerPolicy: 'same-origin',
			attrs: { id: 'id-value', 'data-test': 'data-test-value' },
		});

		const element = scriptTagElement();
		expect(element).toBeInstanceOf(HTMLScriptElement);
		expect(element).toHaveAttribute('id', 'id-value');
		expect(element).toHaveAttribute('data-test', 'data-test-value');
		expect(element).toHaveAttribute('defer');
		expect(element).toHaveAttribute('crossorigin', 'use-credentials');
		expect(element).toHaveProperty('noModule');
		expect(element).toHaveProperty('referrerPolicy', 'same-origin');

		unload();
	});

	it('should remove script tag on unload call after multiple loads', async () => {
		const removeChildListener = vi.spyOn(document.head, 'removeChild');

		expect(removeChildListener).not.toHaveBeenCalled();
		expect(scriptTagElement()).toBeNull();

		const script1 = createScriptTag({ url, immediate: false });
		const script2 = createScriptTag({ url, immediate: false });

		// Multiple Loads
		await script1.load(false);
		await script2.load(false);

		expect(scriptTagElement()).toBeInstanceOf(HTMLScriptElement);

		script1.unload();
		script2.unload();

		expect(get(script1.scriptTag)).toBeNull();
		expect(get(script2.scriptTag)).toBeNull();
		expect(removeChildListener).toHaveBeenCalledTimes(1);
		expect(scriptTagElement()).toBeNull();
	});

	it('undefined document', async () => {
		const doc = document;
		vi.stubGlobal('document', undefined);

		const { scriptTag, load, unload } = createScriptTag({ url, immediate: false });
		await expect(load(false)).resolves.toEqual(false);
		expect(get(scriptTag)).toBeNull();

		expect(() => unload()).not.toThrow();

		vi.stubGlobal('document', doc);
	});

	it('onLoaded should work correctly when script loads or is already loaded', async () => {
		const spy = vi.fn();

		const script1 = createScriptTag({ url, immediate: false, onLoaded: spy });
		await script1.load(false);

		await fireEvent(scriptTagElement()!, new Event('load'));
		expect(scriptTagElement()).toHaveAttribute('data-loaded', 'true');
		expect(spy).toHaveBeenCalledTimes(1);

		const script2 = createScriptTag({ url, immediate: false, onLoaded: spy });
		await script2.load(false);
		expect(spy).toHaveBeenCalledTimes(2);

		script1.unload();
		script2.unload();
	});

	it('onError should work correctly', async () => {
		const spy = vi.fn();

		const script1 = createScriptTag({ url, immediate: false, onError: spy });
		await script1.load(false);

		await fireEvent(scriptTagElement()!, new Event('error'));
		expect(scriptTagElement()).toHaveAttribute('data-loaded', 'false');
		expect(spy).toHaveBeenCalledTimes(1);

		const script2 = createScriptTag({ url, immediate: false, onError: spy });
		await expect(script2.load(false)).rejects.toThrow();
		expect(spy).toHaveBeenCalledTimes(2);

		script1.unload();
		script2.unload();
	});
});
